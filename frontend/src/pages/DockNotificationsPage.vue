<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockNotificationsPage' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'
import DockNotificationRow from '@/components/notifications/DockNotificationRow.vue'
import DockNotificationLoading from '@/components/notifications/DockNotificationLoading.vue'
import DockNotificationEmpty from '@/components/notifications/DockNotificationEmpty.vue'
import DockNotificationError from '@/components/notifications/DockNotificationError.vue'

interface Notification {
  name: string; from_app: string; notification_type: string
  title: string; message?: string; action_url?: string; read: 0 | 1; creation: string
}

const { registeredApps } = useDockBoot()
const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot

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

// Filters
const filterApp    = ref<string | null>(null)
const filterUnread = ref(false)

// Pagination
const PAGE_SIZE = 50
const items     = ref<Notification[]>([])
const total     = ref(0)
const offset    = ref(0)
const loading   = ref(false)
const hasError  = ref(false)

// Bulk select
const selected  = ref<Set<string>>(new Set())
const allSelected = computed(() =>
  items.value.length > 0 && items.value.every(n => selected.value.has(n.name))
)
function toggleAll() {
  if (allSelected.value) selected.value = new Set()
  else selected.value = new Set(items.value.map(n => n.name))
}

async function load(reset = false) {
  if (reset) { offset.value = 0; items.value = [] }
  loading.value = true; hasError.value = false
  try {
    const res = await callApi<{ items: Notification[]; total: number }>(
      'dock.api.notifications.get_list',
      {
        limit: PAGE_SIZE,
        offset: offset.value,
        ...(filterApp.value ? { app: filterApp.value } : {}),
        ...(filterUnread.value ? { unread_only: true } : {}),
      }
    )
    items.value = reset ? res.items : [...items.value, ...res.items]
    total.value = res.total
    offset.value += res.items.length
  } catch { hasError.value = true }
  finally { loading.value = false }
}

onMounted(() => load(true))

async function markRead(name: string) {
  await callApi('dock.api.notifications.mark_read', { notification_names: [name] })
  const item = items.value.find(n => n.name === name)
  if (item) item.read = 1
}

async function markReadBulk() {
  const names = Array.from(selected.value)
  await callApi('dock.api.notifications.mark_read', { notification_names: names })
  names.forEach(name => {
    const item = items.value.find(n => n.name === name)
    if (item) item.read = 1
  })
  selected.value = new Set()
}

async function deleteBulk() {
  const names = Array.from(selected.value)
  await callApi('dock.api.notifications.delete', { notification_names: names })
  items.value = items.value.filter(n => !names.includes(n.name))
  total.value -= names.length
  selected.value = new Set()
}

function navigate(n: Notification) {
  markRead(n.name)
  if (n.action_url) window.location.href = n.action_url
}

const apps = computed(() => {
  const seen = new Set<string>()
  return items.value.filter(n => { if (seen.has(n.from_app)) return false; seen.add(n.from_app); return true })
    .map(n => n.from_app)
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-6 py-8">
    <h1 class="text-xl font-semibold text-[var(--dock-text)] mb-6">{{ __('Notifications') }}</h1>

    <!-- Filters -->
    <div class="flex flex-wrap gap-2 mb-4">
      <button
        class="px-3 py-1 rounded-full text-xs font-medium transition-colors"
        :class="!filterApp && !filterUnread
          ? 'bg-[var(--dock-accent)] text-white'
          : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 border border-[var(--dock-border)]'"
        @click="filterApp = null; filterUnread = false; load(true)"
      >{{ __('All') }}</button>

      <button
        class="px-3 py-1 rounded-full text-xs font-medium transition-colors"
        :class="filterUnread
          ? 'bg-[var(--dock-accent)] text-white'
          : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 border border-[var(--dock-border)]'"
        @click="filterUnread = !filterUnread; filterApp = null; load(true)"
      >{{ __('Unread') }}</button>

      <button
        v-for="app in apps"
        :key="app"
        class="px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors"
        :class="filterApp === app
          ? 'bg-[var(--dock-accent)] text-white'
          : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 border border-[var(--dock-border)]'"
        @click="filterApp = filterApp === app ? null : app; filterUnread = false; load(true)"
      >{{ app }}</button>
    </div>

    <!-- Bulk actions -->
    <div v-if="selected.size > 0" class="flex items-center gap-3 mb-3 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5">
      <span class="text-sm text-[var(--dock-text)]">{{ selected.size }} {{ __('selected') }}</span>
      <button class="text-xs text-[var(--dock-accent)] hover:underline" @click="markReadBulk">{{ __('Mark read') }}</button>
      <button class="text-xs text-red-600 dark:text-red-400 hover:underline" @click="deleteBulk">{{ __('Delete') }}</button>
    </div>

    <!-- List -->
    <div class="border border-[var(--dock-border)] rounded-lg overflow-hidden">
      <!-- Header row -->
      <div class="flex items-center gap-3 px-3 py-2 border-b border-[var(--dock-border)] bg-black/[0.02] dark:bg-white/[0.02]">
        <input type="checkbox" :checked="allSelected" class="w-3.5 h-3.5 accent-[var(--dock-accent)]" @change="toggleAll" />
        <span class="text-xs text-[var(--dock-icon)]">{{ total }} {{ __('total') }}</span>
      </div>

      <DockNotificationLoading v-if="loading && !items.length" />
      <DockNotificationError v-else-if="hasError" @retry="load(true)" />
      <DockNotificationEmpty v-else-if="!items.length" />

      <div v-else class="divide-y divide-[var(--dock-border)]">
        <div v-for="n in items" :key="n.name" class="flex items-start gap-2 group">
          <div class="flex items-center px-3 pt-3">
            <input
              type="checkbox"
              :checked="selected.has(n.name)"
              class="w-3.5 h-3.5 accent-[var(--dock-accent)]"
              @change="selected.has(n.name) ? selected.delete(n.name) : selected.add(n.name)"
            />
          </div>
          <div class="flex-1 min-w-0">
            <DockNotificationRow
              :notification="n"
              :type-info="notificationTypes[n.notification_type]"
              :app-color="appColorMap[n.from_app]"
              @mark-read="markRead"
              @navigate="navigate"
            />
          </div>
        </div>
      </div>

      <!-- Load more -->
      <div v-if="items.length < total" class="border-t border-[var(--dock-border)] px-3 py-2 text-center">
        <button
          class="text-xs text-[var(--dock-accent)] hover:underline disabled:opacity-50"
          :disabled="loading"
          @click="load(false)"
        >{{ __('Load more') }}</button>
      </div>
    </div>
  </div>
</template>
