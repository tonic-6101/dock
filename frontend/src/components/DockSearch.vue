<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Inline search bar (desktop) — [All ▾] | [Search...] | [🔍]
  Mobile (< md): icon button that opens the command-palette modal.
  Cmd/Ctrl+K focuses the inline input on desktop.
-->
<script lang="ts">
export default { name: 'DockSearch' }
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick, defineAsyncComponent } from 'vue'
import { Search } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'
import DockSearchResultRow from './search/DockSearchResultRow.vue'
import DockSearchLoading from './search/DockSearchLoading.vue'
import DockSearchEmpty from './search/DockSearchEmpty.vue'
import DockSearchError from './search/DockSearchError.vue'
import DockSearchRecent from './search/DockSearchRecent.vue'

const DockSearchModal = defineAsyncComponent(() => import('./search/DockSearchModal.vue'))

interface SearchResult {
  label: string; route: string; app: string; section: string; doctype: string; name: string
}

const { registeredApps } = useDockBoot()

const query        = ref('')
const scopedApp    = ref('')
const results      = ref<SearchResult[]>([])
const loading      = ref(false)
const hasError     = ref(false)
const isOpen       = ref(false)
const mobileOpen   = ref(false)
const focusedIdx   = ref(-1)
const inputRef     = ref<HTMLInputElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const flatResults = computed(() => results.value)

const groupedResults = computed(() => {
  const groups: Record<string, SearchResult[]> = {}
  for (const r of results.value) {
    if (!groups[r.app]) groups[r.app] = []
    groups[r.app].push(r)
  }
  return groups
})

const appColorMap = computed(() => {
  const map: Record<string, string> = {}
  for (const a of (registeredApps.value as Array<{ app: string; color?: string }>) ?? []) {
    if (a.color) map[a.app] = a.color
  }
  return map
})

// Debounced search on query change
let debounceTimer: ReturnType<typeof setTimeout> | null = null
watch(query, (val) => {
  hasError.value = false
  focusedIdx.value = -1
  if (debounceTimer) clearTimeout(debounceTimer)
  if (val.length < 2) { results.value = []; loading.value = false; return }
  loading.value = true
  isOpen.value = true
  debounceTimer = setTimeout(doSearch, 200)
})

async function doSearch() {
  if (query.value.length < 2) return
  loading.value = true; hasError.value = false
  try {
    results.value = await callApi<SearchResult[]>('dock.api.search.global_search', {
      query: query.value,
      ...(scopedApp.value ? { app: scopedApp.value } : {}),
    })
  } catch { hasError.value = true }
  finally { loading.value = false }
}

// Input keyboard: arrows + enter + escape
function onInputKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { close(); (e.target as HTMLElement).blur(); return }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    focusedIdx.value = Math.min(focusedIdx.value + 1, flatResults.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    focusedIdx.value = Math.max(focusedIdx.value - 1, 0)
  } else if (e.key === 'Enter' && focusedIdx.value >= 0) {
    navigate(flatResults.value[focusedIdx.value])
  }
}

// Global Cmd/Ctrl+K — focus inline input
function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    nextTick(() => inputRef.value?.focus())
    isOpen.value = true
  }
}

function navigate(r: SearchResult) {
  window.location.href = r.route
  close()
}

function navigateRecent(route: string) {
  window.location.href = route
  close()
}

function close() {
  isOpen.value = false
  focusedIdx.value = -1
}

function onClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onGlobalKeydown)
  document.addEventListener('click', onClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onGlobalKeydown)
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <!-- Desktop: inline bar -->
  <div
    ref="containerRef"
    class="dock-search hidden md:flex items-center flex-1 max-w-lg mx-4 relative"
  >
    <div
      class="flex items-center w-full h-9 rounded-lg border border-[var(--dock-border)]
             bg-[var(--dock-bg)] overflow-hidden transition-all
             focus-within:ring-2 focus-within:ring-[var(--dock-accent)]/30
             focus-within:border-[var(--dock-accent)]"
    >
      <!-- Scope select -->
      <select
        v-model="scopedApp"
        class="h-full px-3 text-sm text-[var(--dock-icon)] bg-black/5 dark:bg-white/5
               border-r border-[var(--dock-border)] outline-none cursor-pointer shrink-0"
        @change="query.length >= 2 && doSearch()"
      >
        <option value="">{{ __('All') }}</option>
        <option
          v-for="app in (registeredApps as Array<{ app: string; label: string }>)"
          :key="app.app"
          :value="app.app"
        >{{ app.label }}</option>
      </select>

      <!-- Text input -->
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        :placeholder="__('Search...')"
        class="flex-1 h-full px-3 text-sm bg-transparent text-[var(--dock-text)]
               placeholder-[var(--dock-icon)] outline-none min-w-0"
        @focus="isOpen = true"
        @keydown="onInputKeydown"
      />

      <!-- Search icon -->
      <button
        class="h-full px-3 text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
        :aria-label="__('Search')"
        @click="query.length >= 2 ? doSearch() : inputRef?.focus()"
      >
        <Search class="w-4 h-4" />
      </button>
    </div>

    <!-- Inline results dropdown -->
    <div
      v-if="isOpen"
      class="absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg border border-[var(--dock-border)]
             bg-[var(--dock-bg)] max-h-96 overflow-y-auto z-20"
      role="listbox"
    >
      <DockSearchLoading v-if="loading" />
      <DockSearchError v-else-if="hasError" @retry="doSearch" />
      <template v-else-if="query.length >= 2">
        <DockSearchEmpty
          v-if="!results.length"
          :query="query"
          :scoped-app="scopedApp || null"
          @clear-scope="scopedApp = ''; doSearch()"
        />
        <template v-else>
          <template v-for="(group, app) in groupedResults" :key="app">
            <DockSearchResultRow
              v-for="r in group"
              :key="r.name"
              :result="r"
              :app-color="appColorMap[String(app)]"
              :focused="flatResults.indexOf(r) === focusedIdx"
              @navigate="navigate"
            />
            <div class="mx-4 border-b border-[var(--dock-border)]" />
          </template>
        </template>
      </template>
      <DockSearchRecent v-else @navigate="navigateRecent" />
    </div>
  </div>

  <!-- Mobile: icon button → modal -->
  <button
    class="dock-search md:hidden flex items-center justify-center w-8 h-8 rounded-md
           text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    :aria-label="__('Search')"
    :title="__('Search')"
    @click="mobileOpen = true"
  >
    <Search class="w-4 h-4" />
  </button>

  <DockSearchModal v-if="mobileOpen" @close="mobileOpen = false" />
</template>
