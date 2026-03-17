<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockEventManagerPanel' }
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  CalendarDays, FileText, Zap, ExternalLink,
  Loader2, Trash2, X, Info,
} from 'lucide-vue-next'
import { callApi } from '@/composables/useApi'
import { __ } from '@/composables/useTranslate'
import type { DockEvent } from '@/types/dock'

interface Props {
  event: DockEvent
}

interface Tab {
  id: string
  label: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'deleted', name: string): void
}>()

const TABS: Tab[] = [
  { id: 'details', label: __('Details') },
  { id: 'actions', label: __('Actions') },
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
    :aria-label="__('Close panel')"
    @click="emit('close')"
  />

  <aside
    class="fixed inset-y-0 right-0 w-full max-w-sm z-50
           lg:relative lg:z-auto lg:w-80 lg:max-w-none lg:inset-y-auto lg:right-auto
           bg-[var(--dock-bg)] border-l border-[var(--dock-border)]
           flex flex-col flex-shrink-0 overflow-hidden transition-all"
    role="dialog"
    :aria-label="event.title"
  >

    <!-- ── Zone 1: Header ────────────────────────────────────────────────── -->
    <div class="p-4 border-b border-[var(--dock-border)]
                flex items-center justify-between shrink-0">
      <h3 class="font-semibold text-[var(--dock-text)] m-0
                 flex items-center gap-2 min-w-0">
        <CalendarDays class="w-4 h-4 shrink-0 text-[var(--dock-icon)]" />
        <span class="truncate">{{ event.title }}</span>
        <span class="text-xs font-normal text-[var(--dock-icon)] shrink-0">
          {{ sourceLabel }}
        </span>
      </h3>
      <button
        class="p-1.5 text-[var(--dock-icon)] hover:text-[var(--dock-text)]
               rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
        :title="__('Close')"
        :aria-label="__('Close')"
        @click="emit('close')"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <!-- ── Zone 2: Tab Bar ───────────────────────────────────────────────── -->
    <div class="border-b border-[var(--dock-border)] shrink-0">
      <div class="px-4 pt-2 pb-1">
        <span class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">
          {{ __('Event') }}
        </span>
      </div>
      <div class="flex px-4" role="tablist">
        <button
          v-for="tab in TABS"
          :key="tab.id"
          role="tab"
          :aria-selected="activeTab === tab.id"
          :title="tab.label"
          class="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium relative group transition-colors"
          :class="activeTab === tab.id
            ? 'text-[var(--dock-icon)]'
            : 'text-[var(--dock-icon)] opacity-50 hover:opacity-80'"
          @click="selectTab(tab.id)"
        >
          <FileText v-if="tab.id === 'details'" class="w-3.5 h-3.5" />
          <Zap v-else class="w-3.5 h-3.5" />
          {{ tab.label }}
          <!-- Active underline -->
          <div
            v-if="activeTab === tab.id"
            class="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[var(--dock-icon)]"
          />
        </button>
      </div>
    </div>

    <!-- ── Zone 3: Tab Content ───────────────────────────────────────────── -->
    <div class="flex-1 overflow-auto" role="tabpanel">
      <div class="p-4">

        <!-- Details tab ───────────────────────────────────────────────── -->
        <div v-show="activeTab === 'details'" class="space-y-4">

          <!-- Title -->
          <div>
            <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">
              {{ __('Title') }}
            </label>
            <p class="mt-1 text-sm text-[var(--dock-text)]">{{ event.title }}</p>
          </div>

          <!-- Type -->
          <div>
            <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">
              {{ __('Type') }}
            </label>
            <p class="mt-1 text-sm text-[var(--dock-text)]">{{ eventTypeLabel }}</p>
          </div>

          <!-- Date & Time -->
          <div>
            <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">
              {{ __('When') }}
            </label>
            <template v-if="event.all_day">
              <p class="mt-1 text-sm text-[var(--dock-text)]">
                {{ fmtDate(event.start_datetime) }}
                <span v-if="event.end_datetime"> → {{ fmtDate(event.end_datetime) }}</span>
                <span class="ml-2 text-xs text-[var(--dock-icon)]">({{ __('All day') }})</span>
              </p>
            </template>
            <template v-else>
              <p class="mt-1 text-sm text-[var(--dock-text)]">
                {{ fmtDatetime(event.start_datetime) }}
              </p>
              <p v-if="event.end_datetime" class="text-sm text-[var(--dock-icon)]">
                → {{ fmtDatetime(event.end_datetime) }}
              </p>
            </template>
          </div>

          <!-- Description -->
          <div v-if="event.description">
            <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">
              {{ __('Description') }}
            </label>
            <p class="mt-1 text-sm text-[var(--dock-text)] whitespace-pre-wrap">{{ event.description }}</p>
          </div>

          <!-- Source app badge -->
          <div>
            <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">
              {{ __('Source') }}
            </label>
            <div class="mt-1 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full shrink-0 bg-[var(--dock-icon)]" />
              <span class="text-sm text-[var(--dock-text)]">{{ sourceLabel }}</span>
            </div>
          </div>

        </div><!-- /details -->

        <!-- Actions tab ───────────────────────────────────────────────── -->
        <div v-show="activeTab === 'actions'" class="space-y-2">

          <!-- Open in source app -->
          <a
            v-if="event.url"
            :href="event.url"
            class="w-full flex items-center gap-3 p-3 text-left
                   bg-black/5 dark:bg-white/5 rounded-lg
                   hover:bg-black/10 dark:hover:bg-white/10
                   transition-colors no-underline"
          >
            <ExternalLink class="w-4 h-4 text-[var(--dock-icon)] shrink-0" />
            <div>
              <p class="text-sm font-medium text-[var(--dock-text)] m-0">
                {{ __('Open in') }} {{ sourceLabel }}
              </p>
              <p class="text-xs text-[var(--dock-icon)] m-0">
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
              <Loader2 v-if="deleting" class="w-4 h-4 text-red-500 animate-spin shrink-0" />
              <Trash2 v-else class="w-4 h-4 text-red-500 shrink-0" />
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
            <Info class="w-8 h-8 text-[var(--dock-border)] mx-auto mb-3" />
            <p class="text-sm text-[var(--dock-icon)] m-0">
              {{ __('No actions available') }}
            </p>
            <p class="text-xs text-[var(--dock-icon)] opacity-60 mt-1">
              {{ __('Manage this event in') }} {{ sourceLabel }}
            </p>
          </div>

        </div><!-- /actions -->

      </div>
    </div><!-- /zone 3 -->

  </aside>
</template>
