<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
  Trash2, RotateCcw, Search, ChevronLeft, ChevronRight,
  AlertTriangle, Inbox,
} from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'

// ── Types ────────────────────────────────────────────────────────────
interface BinItem {
  name: string
  doctype: string
  app: string
  label: string
  icon: string
  deleted_by: string
  deleted_on: string
  deletion_reason?: string
  days_until_purge: number
}

// ── State ────────────────────────────────────────────────────────────
const items = ref<BinItem[]>([])
const total = ref(0)
const countsByApp = ref<Record<string, number>>({})
const loading = ref(true)
const activeApp = ref<string | null>(null)
const searchQuery = ref('')
const sortBy = ref<'deleted_on' | 'label'>('deleted_on')
const sortOrder = ref<'desc' | 'asc'>('desc')
const selected = ref<Set<string>>(new Set())
const page = ref(1)
const perPage = 20
const showEmptyConfirm = ref(false)
const showDeleteConfirm = ref(false)

// ── API helper ──────────────────────────────────────────────────────
function getCsrf(): string {
  return (window as any).csrf_token
    || (window as any).frappe?.csrf_token
    || ''
}

async function api(method: string, args: Record<string, unknown> = {}, postMethod = false): Promise<any> {
  const resp = await fetch('/api/method/' + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Frappe-CSRF-Token': getCsrf(),
    },
    body: JSON.stringify(args),
  })
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ message: resp.statusText }))
    throw new Error(err.message || 'API call failed')
  }
  return (await resp.json()).message
}

// ── Data fetching ───────────────────────────────────────────────────
async function fetchItems() {
  loading.value = true
  try {
    const data = await api('dock.dock.api.bin.get_items', {
      app: activeApp.value || undefined,
      search: searchQuery.value || undefined,
      sort_by: sortBy.value,
      sort_order: sortOrder.value,
      limit: perPage,
      offset: (page.value - 1) * perPage,
    })
    items.value = data.items || []
    total.value = data.total || 0
    countsByApp.value = data.counts_by_app || {}
  } catch (e) {
    console.error('Failed to fetch bin items:', e)
  } finally {
    loading.value = false
  }
}

// ── Computed ─────────────────────────────────────────────────────────
const totalCount = computed(() => {
  return Object.values(countsByApp.value).reduce((a: number, b: number) => a + b, 0)
})

const appPills = computed(() => {
  const pills: Array<{ key: string | null; label: string; count: number }> = [
    { key: null, label: __('All'), count: totalCount.value },
  ]
  for (const [app, count] of Object.entries(countsByApp.value)) {
    if (count > 0) {
      pills.push({ key: app, label: app.charAt(0).toUpperCase() + app.slice(1), count })
    }
  }
  return pills
})

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / perPage)))
const allSelected = computed(() => items.value.length > 0 && selected.value.size === items.value.length)
const someSelected = computed(() => selected.value.size > 0)

// ── Actions ─────────────────────────────────────────────────────────
function toggleSelectAll() {
  if (allSelected.value) {
    selected.value = new Set()
  } else {
    selected.value = new Set(items.value.map(i => `${i.doctype}::${i.name}`))
  }
}

function toggleSelect(item: BinItem) {
  const key = `${item.doctype}::${item.name}`
  const next = new Set(selected.value)
  if (next.has(key)) {
    next.delete(key)
  } else {
    next.add(key)
  }
  selected.value = next
}

function isSelected(item: BinItem): boolean {
  return selected.value.has(`${item.doctype}::${item.name}`)
}

function selectedByDoctype(): Record<string, string[]> {
  const grouped: Record<string, string[]> = {}
  for (const key of selected.value) {
    const [dt, name] = key.split('::')
    if (!grouped[dt]) grouped[dt] = []
    grouped[dt].push(name)
  }
  return grouped
}

async function restoreSelected() {
  const grouped = selectedByDoctype()
  for (const [doctype, names] of Object.entries(grouped)) {
    await api('dock.dock.api.bin.restore', { doctype, names }, true)
  }
  selected.value = new Set()
  await fetchItems()
}

async function deleteSelected() {
  const grouped = selectedByDoctype()
  for (const [doctype, names] of Object.entries(grouped)) {
    await api('dock.dock.api.bin.delete_permanently', { doctype, names }, true)
  }
  selected.value = new Set()
  showDeleteConfirm.value = false
  await fetchItems()
}

async function emptyBin() {
  await api('dock.dock.api.bin.empty_bin', {}, true)
  showEmptyConfirm.value = false
  selected.value = new Set()
  await fetchItems()
}

function relativeTime(dateStr: string): string {
  if (!dateStr) return ''
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return __('today')
  if (diffDays === 1) return __('yesterday')
  if (diffDays < 30) return __(`{0} days ago`).replace('{0}', String(diffDays))
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths === 1) return __('1 month ago')
  return __(`{0} months ago`).replace('{0}', String(diffMonths))
}

// ── Watchers ────────────────────────────────────────────────────────
watch([activeApp, searchQuery, sortBy, sortOrder], () => {
  page.value = 1
  selected.value = new Set()
  fetchItems()
})

watch(page, () => {
  selected.value = new Set()
  fetchItems()
})

// ── Init from URL params ────────────────────────────────────────────
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.get('app')) {
    activeApp.value = params.get('app')
  }
  fetchItems()
})
</script>

<template>
  <div class="p-6 min-h-full">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 m-0">
        {{ __('Bin') }}
      </h1>
      <button
        v-if="totalCount > 0"
        class="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400
               border border-red-200 dark:border-red-800 rounded-lg
               hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        @click="showEmptyConfirm = true"
      >
        {{ __('Empty Bin') }}
      </button>
    </div>

    <!-- App filter pills -->
    <div class="flex gap-2 overflow-x-auto pb-2 mb-4" role="tablist">
      <button
        v-for="pill in appPills"
        :key="pill.key ?? 'all'"
        role="tab"
        :aria-selected="activeApp === pill.key"
        class="flex-shrink-0 px-3 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap"
        :class="activeApp === pill.key
          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'"
        @click="activeApp = pill.key"
      >
        {{ pill.label }} ({{ pill.count }})
      </button>
    </div>

    <!-- Search + Sort -->
    <div class="flex items-center gap-3 mb-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="__('Search deleted items...')"
          class="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700
                 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
        />
      </div>
      <select
        v-model="sortBy"
        class="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700
               rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300
               focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
      >
        <option value="deleted_on">{{ __('Newest first') }}</option>
        <option value="label">{{ __('Name A\u2013Z') }}</option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="py-12 text-center text-gray-400">
      <div class="inline-block w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
    </div>

    <!-- Empty state -->
    <div v-else-if="items.length === 0 && !searchQuery" class="py-16 text-center">
      <Inbox class="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
      <p class="text-gray-500 dark:text-gray-400 font-medium">{{ __('Your bin is empty.') }}</p>
      <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">{{ __('Deleted items from all apps appear here.') }}</p>
    </div>

    <!-- No results -->
    <div v-else-if="items.length === 0 && searchQuery" class="py-12 text-center">
      <p class="text-gray-500 dark:text-gray-400">{{ __('No items matching your search.') }}</p>
    </div>

    <!-- Item list -->
    <div v-else>
      <!-- Select all header -->
      <div class="flex items-center gap-3 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
        <input
          type="checkbox"
          :checked="allSelected"
          :indeterminate="someSelected && !allSelected"
          class="w-4 h-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
          :aria-label="__('Select all')"
          @change="toggleSelectAll"
        />
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {{ someSelected ? __(`{0} selected`).replace('{0}', String(selected.size)) : __('Select all') }}
        </span>
      </div>

      <!-- Items -->
      <div
        v-for="item in items"
        :key="`${item.doctype}::${item.name}`"
        class="flex items-center gap-3 px-3 py-3 border-b border-gray-100 dark:border-gray-800
               hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
      >
        <input
          type="checkbox"
          :checked="isSelected(item)"
          class="w-4 h-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
          :aria-label="__('Select {0}').replace('{0}', item.label)"
          @change="toggleSelect(item)"
        />

        <!-- Icon placeholder -->
        <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
          <component :is="Trash2" class="w-4 h-4 text-gray-400" />
        </div>

        <!-- Label + meta -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{{ item.label }}</p>
          <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-medium capitalize">
              {{ item.app }}
            </span>
            <span>{{ relativeTime(item.deleted_on) }}</span>
          </div>
        </div>

        <!-- Near-purge warning -->
        <div
          v-if="item.days_until_purge <= 3"
          class="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 flex-shrink-0"
          :aria-label="__('Permanently deleted in {0} days').replace('{0}', String(item.days_until_purge))"
        >
          <AlertTriangle class="w-3.5 h-3.5" />
          <span>{{ item.days_until_purge }}d</span>
        </div>

        <!-- Row actions (visible on hover) -->
        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            class="p-1.5 rounded hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-400 hover:text-green-600 transition-colors"
            :title="__('Restore')"
            @click.stop="async () => {
              await api('dock.dock.api.bin.restore', { doctype: item.doctype, names: [item.name] }, true)
              await fetchItems()
            }"
          >
            <RotateCcw class="w-4 h-4" />
          </button>
          <button
            class="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600 transition-colors"
            :title="__('Delete forever')"
            @click.stop="async () => {
              await api('dock.dock.api.bin.delete_permanently', { doctype: item.doctype, names: [item.name] }, true)
              await fetchItems()
            }"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between px-3 py-3">
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ __('Page {0} of {1}').replace('{0}', String(page)).replace('{1}', String(totalPages)) }}
        </span>
        <div class="flex items-center gap-1">
          <button
            class="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-30"
            :disabled="page <= 1"
            @click="page--"
          >
            <ChevronLeft class="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            class="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-30"
            :disabled="page >= totalPages"
            @click="page++"
          >
            <ChevronRight class="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>

    <!-- Batch action bar -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="someSelected"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2.5
               bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900
               rounded-xl shadow-xl z-50"
        role="toolbar"
        :aria-label="__('Batch actions for {0} selected items').replace('{0}', String(selected.size))"
      >
        <span class="text-sm font-medium">
          {{ selected.size }} {{ __('selected') }}
        </span>
        <button
          class="px-3 py-1.5 text-sm font-medium rounded-lg bg-white/20 dark:bg-black/10
                 hover:bg-white/30 dark:hover:bg-black/20 transition-colors"
          @click="restoreSelected"
        >
          {{ __('Restore') }}
        </button>
        <button
          class="px-3 py-1.5 text-sm font-medium rounded-lg bg-red-500/80
                 hover:bg-red-500 text-white transition-colors"
          @click="showDeleteConfirm = true"
        >
          {{ __('Delete Forever') }}
        </button>
        <button
          class="px-2 py-1.5 text-sm text-white/60 dark:text-black/40 hover:text-white dark:hover:text-black transition-colors"
          @click="selected = new Set()"
        >
          {{ __('Cancel') }}
        </button>
      </div>
    </Transition>

    <!-- Retention notice -->
    <div v-if="totalCount > 0 && !loading" class="mt-4 text-xs text-gray-400 dark:text-gray-500 text-center">
      {{ __('Items are permanently deleted after {0} days.').replace('{0}', '30') }}
    </div>

    <!-- Delete confirmation dialog -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showDeleteConfirm" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50" @click.self="showDeleteConfirm = false">
          <div class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {{ __('Delete Forever') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {{ __('Permanently delete {0} items?').replace('{0}', String(selected.size)) }}
              {{ __('This cannot be undone.') }}
            </p>
            <div class="flex justify-end gap-2">
              <button
                class="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                @click="showDeleteConfirm = false"
              >
                {{ __('Cancel') }}
              </button>
              <button
                class="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium"
                @click="deleteSelected"
              >
                {{ __('Delete Forever') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Empty bin confirmation dialog -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showEmptyConfirm" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50" @click.self="showEmptyConfirm = false">
          <div class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {{ __('Empty Bin') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {{ __('This will permanently delete all {0} items. This cannot be undone.').replace('{0}', String(totalCount)) }}
            </p>
            <div class="flex justify-end gap-2">
              <button
                class="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                @click="showEmptyConfirm = false"
              >
                {{ __('Cancel') }}
              </button>
              <button
                class="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium"
                @click="emptyBin"
              >
                {{ __('Empty Bin') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
