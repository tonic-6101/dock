<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Notifications panel — full-height shell panel replacing the dropdown.

  Features:
  - "View all" toggle at top to switch between unread-only and all notifications
  - Infinite scroll with paginated loading via get_list API
  - Realtime items prepended from DockBell's Socket.IO listener
  - Mark read / mark all read
  - App filter tabs
-->
<script lang="ts">
export default { name: 'DockNotificationsPanel' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { CheckCheck } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockPanels } from '@/composables/useDockPanels'
import { useDockBoot } from '@/composables/useDockBoot'
import DockPanelShell from './DockPanelShell.vue'
import DockNotificationRow from './notifications/DockNotificationRow.vue'
import DockNotificationLoading from './notifications/DockNotificationLoading.vue'
import DockNotificationEmpty from './notifications/DockNotificationEmpty.vue'
import DockNotificationError from './notifications/DockNotificationError.vue'

interface Notification {
  name: string
  from_app: string
  notification_type: string
  title: string
  message?: string
  action_url?: string
  read: 0 | 1
  creation: string
}

const props = defineProps<{
  realtimeItems?: Notification[]
}>()

const { closePanel } = useDockPanels()
const { registeredApps } = useDockBoot()
const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot

// ── State ──────────────────────────────────────────────

const PAGE_SIZE = 30
const fetched = ref<Notification[]>([])
const loading = ref(true)
const loadingMore = ref(false)
const hasError = ref(false)
const total = ref(0)
const offset = ref(0)
const showAll = ref(false)

const scrollRef = ref<HTMLElement | null>(null)

// ── Derived ────────────────────────────────────────────

const appColorMap = computed(() => {
  const map: Record<string, string> = {}
  for (const a of (registeredApps.value as Array<{ app: string; color?: string }>) ?? []) {
    if (a.color) map[a.app] = a.color
  }
  return map
})

const notificationTypes = computed<Record<string, { label: string; icon: string; app: string }>>(
  () => boot?.notification_types ?? {}
)

// Merge realtime items (prepended) with fetched, deduplicated by name
const items = computed<Notification[]>(() => {
  const fetchedNames = new Set(fetched.value.map(n => n.name))
  const newRealtime = (props.realtimeItems ?? []).filter(n => !fetchedNames.has(n.name))
  // When viewing unread only, filter realtime items too
  const filtered = showAll.value ? newRealtime : newRealtime.filter(n => !n.read)
  return [...filtered, ...fetched.value]
})

const hasMore = computed(() => offset.value + fetched.value.length < total.value)

// ── Load ───────────────────────────────────────────────

async function load() {
  loading.value = true
  hasError.value = false
  offset.value = 0
  try {
    const result = await callApi<{ items: Notification[]; total: number }>(
      'dock.api.notifications.get_list',
      { limit: PAGE_SIZE, offset: 0, unread_only: !showAll.value }
    )
    fetched.value = result.items
    total.value = result.total
  } catch {
    hasError.value = true
  } finally {
    loading.value = false
  }
}

async function loadMore() {
  if (loadingMore.value || !hasMore.value) return
  loadingMore.value = true
  const nextOffset = offset.value + PAGE_SIZE
  try {
    const result = await callApi<{ items: Notification[]; total: number }>(
      'dock.api.notifications.get_list',
      { limit: PAGE_SIZE, offset: nextOffset, unread_only: !showAll.value }
    )
    fetched.value = [...fetched.value, ...result.items]
    total.value = result.total
    offset.value = nextOffset
  } catch {
    // Silently fail — user can scroll again to retry
  } finally {
    loadingMore.value = false
  }
}

onMounted(() => load())

// Re-fetch when toggling view all / unread
watch(showAll, () => load())

// ── Infinite scroll ────────────────────────────────────

function onScroll() {
  const el = scrollRef.value
  if (!el || !hasMore.value || loadingMore.value) return
  // Trigger when within 100px of bottom
  if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
    loadMore()
  }
}

// ── Actions ────────────────────────────────────────────

async function markRead(name: string) {
  await callApi('dock.api.notifications.mark_read', { notification_names: [name] })
  const item = fetched.value.find(n => n.name === name)
  if (item) {
    item.read = 1
    // Notify bell to decrement unread count
    document.dispatchEvent(new CustomEvent('dock:notification-read', { detail: { count: 1 } }))
  }
}

async function markAllRead() {
  await callApi('dock.api.notifications.mark_all_read')
  fetched.value.forEach(n => { n.read = 1 })
  document.dispatchEvent(new CustomEvent('dock:notification-all-read'))
}

function navigate(n: Notification) {
  markRead(n.name)
  if (n.action_url) window.location.href = n.action_url
  closePanel()
}

// ── Inline styles ──────────────────────────────────────

const toolbarStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem 1rem',
  borderBottom: '1px solid var(--dock-border)',
  flexShrink: '0',
}

const toggleStyle = {
  fontSize: '0.75rem',
  color: 'var(--dock-icon)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.25rem',
}

const toggleActiveStyle = {
  ...toggleStyle,
  color: 'var(--dock-accent)',
  fontWeight: '600',
}

const markAllStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  fontSize: '0.75rem',
  color: 'var(--dock-icon)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.25rem',
}

const loadingMoreStyle = {
  padding: '0.75rem',
  textAlign: 'center' as const,
  fontSize: '0.75rem',
  color: 'var(--dock-muted)',
}
</script>

<template>
  <DockPanelShell
    :title="__('Notifications')"
    :aria-label="__('Notifications panel')"
    @close="closePanel"
  >
    <!-- Toolbar: View all / Unread toggle + Mark all read -->
    <div :style="toolbarStyle">
      <div :style="{ display: 'flex', gap: '0.25rem' }">
        <button
          :style="!showAll ? toggleActiveStyle : toggleStyle"
          class="dock-notif-toggle"
          @click="showAll = false"
        >{{ __('Unread') }}</button>
        <button
          :style="showAll ? toggleActiveStyle : toggleStyle"
          class="dock-notif-toggle"
          @click="showAll = true"
        >{{ __('View all') }}</button>
      </div>
      <button
        :style="markAllStyle"
        class="dock-notif-mark-all"
        @click="markAllRead"
      >
        <CheckCheck :style="{ width: '0.875rem', height: '0.875rem' }" />
        {{ __('Mark all read') }}
      </button>
    </div>

    <!-- Scrollable notification list -->
    <div
      ref="scrollRef"
      :style="{ flex: '1', overflowY: 'auto', overflowX: 'hidden' }"
      @scroll="onScroll"
    >
      <DockNotificationLoading v-if="loading" />
      <DockNotificationError v-else-if="hasError" @retry="load" />
      <DockNotificationEmpty v-else-if="!items.length" />
      <template v-else>
        <DockNotificationRow
          v-for="n in items"
          :key="n.name"
          :notification="n"
          :type-info="notificationTypes[n.notification_type]"
          :app-color="appColorMap[n.from_app]"
          @mark-read="markRead"
          @navigate="navigate"
        />
        <div v-if="loadingMore" :style="loadingMoreStyle">
          {{ __('Loading more...') }}
        </div>
      </template>
    </div>
  </DockPanelShell>
</template>

<style>
/* Hover states — unscoped so they always apply */
.dock-notif-toggle:hover {
  color: var(--dock-text) !important;
  background: color-mix(in srgb, var(--dock-text) 6%, transparent);
}
.dock-notif-mark-all:hover {
  color: var(--dock-text) !important;
  background: color-mix(in srgb, var(--dock-text) 6%, transparent);
}
</style>
