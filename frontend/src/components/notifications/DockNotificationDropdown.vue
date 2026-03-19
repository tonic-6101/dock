<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockNotificationDropdown' }
</script>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'
import DockNotificationRow from './DockNotificationRow.vue'
import DockNotificationLoading from './DockNotificationLoading.vue'
import DockNotificationEmpty from './DockNotificationEmpty.vue'
import DockNotificationError from './DockNotificationError.vue'

interface Notification {
  name: string; from_app: string; notification_type: string
  title: string; message?: string; action_url?: string; read: 0 | 1; creation: string
}

const props = defineProps<{
  realtimeItems?: Notification[]
}>()

const emit = defineEmits<{
  markRead: [names: string[]]
  markAllRead: []
  close: []
}>()

const { registeredApps } = useDockBoot()
const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot

// Context-aware "View all" link — navigates within the current app
const notificationsUrl = computed(() => {
  const path = window.location.pathname
  type App = { route: string }
  const active = (registeredApps.value as App[]).find(a =>
    a.route !== '/dock' && path.startsWith(a.route)
  )
  return active ? `${active.route}/notifications` : '/dock/notifications'
})

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

const fetched   = ref<Notification[]>([])
const loading   = ref(true)
const hasError  = ref(false)
const markAllBtn = ref<HTMLButtonElement>()

// Merge realtime items (prepended) with fetched, deduplicated by name
const items = computed<Notification[]>(() => {
  const fetchedNames = new Set(fetched.value.map(n => n.name))
  const newRealtime  = (props.realtimeItems ?? []).filter(n => !fetchedNames.has(n.name))
  return [...newRealtime, ...fetched.value]
})

async function load() {
  loading.value  = true
  hasError.value = false
  try {
    fetched.value = await callApi<Notification[]>('dock.api.notifications.get_recent', { limit: 20 })
  } catch {
    hasError.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  load()
  // Focus the first interactive element when dropdown opens
  setTimeout(() => markAllBtn.value?.focus(), 50)
})

async function markRead(name: string) {
  await callApi('dock.api.notifications.mark_read', { notification_names: [name] })
  const item = fetched.value.find(n => n.name === name)
  if (item) item.read = 1
  emit('markRead', [name])
}

async function markAllRead() {
  await callApi('dock.api.notifications.mark_all_read')
  fetched.value.forEach(n => { n.read = 1 })
  emit('markAllRead')
}

function navigate(n: Notification) {
  markRead(n.name)
  if (n.action_url) window.location.href = n.action_url
  emit('close')
}
</script>

<template>
  <div
    class="bg-[var(--dock-bg)] border border-[var(--dock-border)]
           rounded-lg shadow-lg overflow-hidden"
    :style="{
      position: 'absolute',
      right: '0',
      top: '100%',
      marginTop: '0.5rem',
      width: '20rem',
      zIndex: 9999,
    }"
    role="menu"
    aria-label="Notifications"
  >
    <!-- Header -->
    <div class="flex items-center justify-between px-3 py-2 border-b border-[var(--dock-border)]">
      <span class="text-sm font-medium text-[var(--dock-text)]">{{ __('Notifications') }}</span>
      <button
        ref="markAllBtn"
        class="text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
        @click="markAllRead"
      >{{ __('Mark all read') }}</button>
    </div>

    <!-- Body -->
    <div class="max-h-96 overflow-y-auto">
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
      </template>
    </div>

    <!-- Footer -->
    <div class="border-t border-[var(--dock-border)] px-3 py-2 text-center">
      <a
        :href="notificationsUrl"
        class="text-xs text-[var(--dock-accent)] hover:underline"
        @click="$emit('close')"
      >{{ __('View all notifications') }} →</a>
    </div>
  </div>
</template>
