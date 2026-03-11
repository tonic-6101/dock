<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Bell + badge + notification dropdown + realtime listener.
  Realtime listener is always mounted here (not inside dropdown) so the badge updates
  even when the dropdown is closed.
-->
<script lang="ts">
export default { name: 'DockBell' }
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Bell } from 'lucide-vue-next'
import DockNotificationDropdown from './notifications/DockNotificationDropdown.vue'

const open = ref(false)

// Unread count — seeded from boot to avoid extra API call on mount
const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot
const unread = ref<number>(boot?.unread_notifications ?? 0)

const badgeLabel = computed(() => (unread.value > 99 ? '99+' : String(unread.value)))

// Realtime: prepend notification + increment badge
function onRealtimeNotification(data: { title?: string }) {
  unread.value += 1
}

onMounted(() => {
  const rt = (window as any).frappe?.realtime
  if (rt?.on) rt.on('dock_notification', onRealtimeNotification)
})

onUnmounted(() => {
  const rt = (window as any).frappe?.realtime
  if (rt?.off) rt.off('dock_notification', onRealtimeNotification)
})

// Outside-click close
function onOutsideClick(e: MouseEvent) {
  const el = document.getElementById('dock-bell-root')
  if (el && !el.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('mousedown', onOutsideClick))
onUnmounted(() => document.removeEventListener('mousedown', onOutsideClick))

// Esc close
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) open.value = false
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

function handleMarkRead(names: string[]) {
  unread.value = Math.max(0, unread.value - names.length)
}
function handleMarkAllRead() {
  unread.value = 0
}
</script>

<template>
  <div id="dock-bell-root" class="dock-bell relative">
    <button
      class="relative flex items-center justify-center w-8 h-8 rounded-md
             text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      :aria-expanded="open"
      :aria-label="unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'"
      title="Notifications"
      @click="open = !open"
    >
      <Bell class="w-4 h-4" />
      <span
        v-if="unread > 0"
        class="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1
               bg-red-500 rounded-full text-[10px] font-bold text-white
               flex items-center justify-center leading-none"
      >{{ badgeLabel }}</span>
    </button>

    <DockNotificationDropdown
      v-if="open"
      @mark-read="handleMarkRead"
      @mark-all-read="handleMarkAllRead"
      @close="open = false"
    />
  </div>
</template>
