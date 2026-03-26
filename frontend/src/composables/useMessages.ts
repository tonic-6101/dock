// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDockBoot } from './useDockBoot'

export interface MessageChannel {
  key: string
  label: string
  icon: string
  app: string
  route: string
  panel_component?: string
  page_component?: string
  badge_method: string
  sort_order: number
}

interface UnreadCounts {
  total: number
  channels: Record<string, number>
}

// Singleton state — shared across all consumers
const unreadCounts = ref<UnreadCounts>({ total: 0, channels: {} })
let _realtimeRegistered = false

function _initFromBoot() {
  const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot
  if (boot?.unread_counts) {
    unreadCounts.value = boot.unread_counts
  }
}

function _onUnreadUpdate(data: { channel: string; count: number }) {
  if (!data?.channel) return
  const prev = unreadCounts.value.channels[data.channel] ?? 0
  unreadCounts.value.channels[data.channel] = data.count
  unreadCounts.value.total += (data.count - prev)
}

export function useMessages() {
  const { dock, registeredApps } = useDockBoot()

  const channels = computed<MessageChannel[]>(() =>
    dock.value?.message_channels ?? []
  )

  const totalUnread = computed(() => unreadCounts.value.total)

  const isSingleChannel = computed(() => channels.value.length === 1)

  const channelUnread = (key: string) =>
    unreadCounts.value.channels[key] ?? 0

  /** Resolve the messages URL for the current app context. */
  const messagesUrl = computed(() => {
    const path = window.location.pathname
    type App = { route: string }
    const active = (registeredApps.value as App[]).find(a =>
      a.route !== '/dock' && path.startsWith(a.route)
    )
    return active ? `${active.route}/messages` : '/dock/messages'
  })

  async function refreshCounts() {
    try {
      const res = await fetch('/api/method/dock.api.messages.get_unread_counts', {
        method: 'GET',
        headers: { 'X-Frappe-CSRF-Token': (window as any).csrf_token ?? '' },
      })
      const data = await res.json()
      if (data.message) {
        unreadCounts.value = data.message
      }
    } catch {
      // Silently ignore — badge will show stale count
    }
  }

  // Init from boot data on first use
  if (unreadCounts.value.total === 0 && Object.keys(unreadCounts.value.channels).length === 0) {
    _initFromBoot()
  }

  // Register realtime listener once (singleton)
  onMounted(() => {
    if (!_realtimeRegistered) {
      const frappe = (window as any).frappe
      if (frappe?.realtime?.on) {
        frappe.realtime.on('dock_unread_update', _onUnreadUpdate)
        _realtimeRegistered = true
      }
    }
  })

  return {
    channels,
    totalUnread,
    isSingleChannel,
    channelUnread,
    messagesUrl,
    refreshCounts,
    unreadCounts,
  }
}
