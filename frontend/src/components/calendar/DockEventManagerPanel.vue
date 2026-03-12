<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockEventManagerPanel' }
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { callApi } from '@/composables/useApi'
import { __ } from '@/composables/useTranslate'
import type { DockEvent } from '@/types/dock'

interface Props {
  event: DockEvent
}

interface Tab {
  id: string
  icon: string
  label: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'deleted', name: string): void
}>()

const TABS: Tab[] = [
  { id: 'details', icon: 'fa-file-alt',  label: __('Details') },
  { id: 'actions', icon: 'fa-bolt',       label: __('Actions') },
]

const STORAGE_KEY = 'manager_tab_dock-event'

function savedTab(): string {
  const v = localStorage.getItem(STORAGE_KEY)
  return v && TABS.some(t => t.id === v) ? v : TABS[0].id
}

const activeTab = ref(savedTab())
const deleting  = ref(false)
const deleteErr = ref<string | null>(null)

function selectTab(id: string) {
  activeTab.value = id
  localStorage.setItem(STORAGE_KEY, id)
}

// Reset to details when a new event is selected
watch(() => props.event?.name, () => {
  activeTab.value = 'details'
  deleteErr.value = null
})

// ── helpers ──────────────────────────────────────────────────────────────────

function fmtDatetime(dt: string | null | undefined): string {
  if (!dt) return '—'
  return new Date(dt).toLocaleString([], {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function fmtDate(dt: string | null | undefined): string {
  if (!dt) return '—'
  return new Date(dt).toLocaleDateString([], {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

const isNativeEvent = computed(() => props.event?.source_app === 'dock')

const sourceLabel = computed(() => {
  const a = props.event?.source_app ?? ''
  return a.charAt(0).toUpperCase() + a.slice(1)
})

const eventTypeLabel = computed(() => props.event?.event_type?.split('.').pop() ?? '—')

// ── actions ───────────────────────────────────────────────────────────────────

async function handleDelete() {
  if (!confirm(__('Delete this event? This cannot be undone.'))) return
  deleting.value = true
  deleteErr.value = null
  try {
    await callApi('dock.api.calendar.delete_event', { name: props.event.name })
    emit('deleted', props.event.name)
    emit('close')
  } catch (e) {
    deleteErr.value = (e as Error).message || __('Failed to delete event')
  } finally {
    deleting.value = false
  }
}
</script>

<template>
  <!-- Mobile backdrop -->
  <div
    class="fixed inset-0 bg-black/50 z-30 lg:hidden"
    aria-label="Close panel"
    @click="emit('close')"
  />

  <aside
    class="fixed inset-y-0 right-0 w-full max-w-sm z-50
           lg:relative lg:z-auto lg:w-80 lg:max-w-none lg:inset-y-auto lg:right-auto
           bg-white dark:bg-gray-900
           border-l border-gray-200 dark:border-gray-700
           flex flex-col flex-shrink-0 overflow-hidden
           transition-all"
    role="complementary"
    :aria-label="event.title"
  >

    <!-- ── Zone 1: Header ────────────────────────────────────────────────── -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700
                flex items-center justify-between shrink-0">
      <h3 class="font-semibold text-gray-800 dark:text-gray-100 m-0
                 flex items-center gap-2 min-w-0">
        <i class="fa-solid fa-calendar-day shrink-0" style="color: var(--dock-icon)" />
        <span class="truncate">{{ event.title }}</span>
        <span class="text-xs font-normal text-gray-400 dark:text-gray-500 shrink-0">
          {{ sourceLabel }}
        </span>
      </h3>
      <button
        class="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
               rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
        :title="__('Close')"
        :aria-label="__('Close')"
        @click="emit('close')"
      >
        <i class="fa-solid fa-xmark" />
      </button>
    </div>

    <!-- ── Zone 2: Tab Bar ───────────────────────────────────────────────── -->
    <div class="manager-tabs border-b border-gray-200 dark:border-gray-700 shrink-0">
      <!-- Section label -->
      <div class="px-4 pt-2 pb-1">
        <span class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          {{ __('Event') }}
        </span>
      </div>
      <!-- Tabs -->
      <div class="flex px-4" role="tablist">
        <button
          v-for="tab in TABS"
          :key="tab.id"
          role="tab"
          :aria-selected="activeTab === tab.id"
          :title="tab.label"
          class="flex-1 flex items-center justify-center py-2 relative group transition-colors"
          :class="activeTab === tab.id
            ? 'text-[var(--dock-icon)]'
            : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'"
          @click="selectTab(tab.id)"
        >
          <i :class="['fa-solid', tab.icon, 'text-base']" />
          <!-- Active underline -->
          <div
            v-if="activeTab === tab.id"
            class="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
            style="background-color: var(--dock-icon)"
          />
          <!-- Tooltip -->
          <div class="absolute -bottom-8 left-1/2 -translate-x-1/2
                      px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap
                      opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            {{ tab.label }}
          </div>
        </button>
      </div>
    </div>

    <!-- ── Zone 3: Tab Content ───────────────────────────────────────────── -->
    <div
      class="flex-1 overflow-auto bg-white dark:bg-gray-900 transition-colors"
      role="tabpanel"
    >
      <div class="p-4">

        <!-- Details tab ───────────────────────────────────────────────── -->
        <div v-show="activeTab === 'details'" class="space-y-4">

          <!-- Title -->
          <div>
            <label class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {{ __('Title') }}
            </label>
            <p class="mt-1 text-sm text-gray-800 dark:text-gray-200">{{ event.title }}</p>
          </div>

          <!-- Type -->
          <div>
            <label class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {{ __('Type') }}
            </label>
            <p class="mt-1 text-sm text-gray-800 dark:text-gray-200">{{ eventTypeLabel }}</p>
          </div>

          <!-- Date & Time -->
          <div>
            <label class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {{ __('When') }}
            </label>
            <template v-if="event.all_day">
              <p class="mt-1 text-sm text-gray-800 dark:text-gray-200">
                {{ fmtDate(event.start_datetime) }}
                <span v-if="event.end_datetime"> → {{ fmtDate(event.end_datetime) }}</span>
                <span class="ml-2 text-xs text-gray-400 dark:text-gray-500">({{ __('All day') }})</span>
              </p>
            </template>
            <template v-else>
              <p class="mt-1 text-sm text-gray-800 dark:text-gray-200">
                {{ fmtDatetime(event.start_datetime) }}
              </p>
              <p v-if="event.end_datetime" class="text-sm text-gray-500 dark:text-gray-400">
                → {{ fmtDatetime(event.end_datetime) }}
              </p>
            </template>
          </div>

          <!-- Description -->
          <div v-if="event.description">
            <label class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {{ __('Description') }}
            </label>
            <p class="mt-1 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ event.description }}</p>
          </div>

          <!-- Source app badge -->
          <div>
            <label class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {{ __('Source') }}
            </label>
            <div class="mt-1 flex items-center gap-1.5">
              <span
                class="w-2 h-2 rounded-full shrink-0"
                style="background-color: var(--dock-icon)"
              />
              <span class="text-sm text-gray-800 dark:text-gray-200">{{ sourceLabel }}</span>
            </div>
          </div>

        </div><!-- /details -->

        <!-- Actions tab ───────────────────────────────────────────────── -->
        <div v-show="activeTab === 'actions'" class="space-y-2">

          <!-- Open in source app (non-dock events or dock events with a URL) -->
          <a
            v-if="event.url"
            :href="event.url"
            class="w-full flex items-center gap-3 p-3 text-left
                   bg-gray-50 dark:bg-gray-800 rounded-lg
                   hover:bg-gray-100 dark:hover:bg-gray-700
                   transition-colors no-underline"
          >
            <i class="fa-solid fa-arrow-up-right-from-square text-gray-400 dark:text-gray-500" />
            <div>
              <p class="text-sm font-medium text-gray-800 dark:text-gray-200 m-0">
                {{ __('Open in') }} {{ sourceLabel }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 m-0">
                {{ __('View full details in the source app') }}
              </p>
            </div>
          </a>

          <!-- Delete (dock-native events only) -->
          <template v-if="isNativeEvent">
            <div
              v-if="deleteErr"
              class="px-3 py-2 rounded-lg text-sm
                     bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800
                     text-red-700 dark:text-red-300"
            >
              {{ deleteErr }}
            </div>
            <button
              :disabled="deleting"
              class="w-full flex items-center gap-3 p-3 text-left
                     bg-red-50 dark:bg-red-900/20 rounded-lg
                     hover:bg-red-100 dark:hover:bg-red-900/30
                     transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              @click="handleDelete"
            >
              <i
                :class="deleting ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-trash'"
                class="text-red-500"
              />
              <div>
                <p class="text-sm font-medium text-red-700 dark:text-red-400 m-0">
                  {{ deleting ? __('Deleting…') : __('Delete Event') }}
                </p>
                <p class="text-xs text-red-500 dark:text-red-400 m-0">
                  {{ __('Permanently remove this event') }}
                </p>
              </div>
            </button>
          </template>

          <!-- No actions for read-only source events without a URL -->
          <div
            v-if="!event.url && !isNativeEvent"
            class="text-center py-8"
          >
            <i class="fa-solid fa-circle-info fa-2x text-gray-300 dark:text-gray-600 mb-3 block" />
            <p class="text-sm text-gray-400 dark:text-gray-500 m-0">
              {{ __('No actions available') }}
            </p>
            <p class="text-xs text-gray-300 dark:text-gray-600 mt-1">
              {{ __('Manage this event in') }} {{ sourceLabel }}
            </p>
          </div>

        </div><!-- /actions -->

      </div>
    </div><!-- /zone 3 -->

  </aside>
</template>

<style scoped>
.manager-tabs {
  background: linear-gradient(to bottom, white, #fafafa);
}
:root.dark .manager-tabs {
  background: linear-gradient(to bottom, rgb(17 24 39), rgb(31 41 55));
}
</style>
