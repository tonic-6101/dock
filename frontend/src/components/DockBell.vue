<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Bell + badge + realtime listener.
  Realtime listener is always mounted here so the badge updates even when the
  notifications panel is closed. Clicking the bell toggles the DockNotificationsPanel
  via useDockPanels.
-->
<script lang="ts">
export default { name: 'DockBell' }
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Bell } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useDockPanels } from '@/composables/useDockPanels'

interface RealtimeNotification {
  name: string
  from_app: string
  notification_type: string
  title: string
  message?: string
  action_url?: string
  creation: string
  read: 0
}

const { togglePanel, isPanelOpen } = useDockPanels()

// Unread count — seeded from boot to avoid extra API call on mount
const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot
const unread = ref<number>(boot?.unread_notifications ?? 0)

const badgeLabel = computed(() => (unread.value > 99 ? '99+' : String(unread.value)))

// Realtime listener — always mounted, updates badge live
function onRealtimeNotification(data: Partial<RealtimeNotification>) {
  unread.value += 1
}

// Listen for panel mark-read events (custom DOM events from DockNotificationsPanel)
function onNotificationRead(e: Event) {
  const count = (e as CustomEvent).detail?.count ?? 1
  unread.value = Math.max(0, unread.value - count)
}
function onNotificationAllRead() {
  unread.value = 0
}

onMounted(() => {
  const rt = (window as any).frappe?.realtime
  if (rt?.on) rt.on('dock_notification', onRealtimeNotification)
  document.addEventListener('dock:notification-read', onNotificationRead)
  document.addEventListener('dock:notification-all-read', onNotificationAllRead)
})

onUnmounted(() => {
  const rt = (window as any).frappe?.realtime
  if (rt?.off) rt.off('dock_notification', onRealtimeNotification)
  document.removeEventListener('dock:notification-read', onNotificationRead)
  document.removeEventListener('dock:notification-all-read', onNotificationAllRead)
})
</script>

<template>
  <div id="dock-bell-root" class="dock-bell relative">
    <button
      class="relative flex items-center justify-center w-8 h-8 rounded-md
             text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      :aria-expanded="isPanelOpen('notifications')"
      :aria-label="unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'"
      :title="__('Notifications')"
      @click.stop="togglePanel('notifications')"
    >
      <Bell class="w-4 h-4" />
      <span
        v-if="unread > 0"
        class="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1
               bg-red-500 rounded-full text-[10px] font-bold text-white
               flex items-center justify-center leading-none"
      >{{ badgeLabel }}</span>
    </button>
  </div>
</template>
