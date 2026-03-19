<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Global search bar for the Dock navbar.

  Desktop: always-visible input with scope dropdown (left) + search button (right).
           Typing shows an inline dropdown with grouped results.
           Cmd/Ctrl+K also opens the full DockSearchModal (advanced: section tabs).

  Mobile (< md): icon button — taps open DockSearchModal (full-screen slide-up).
-->
<script lang="ts">
export default { name: 'DockSearch' }
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick, defineAsyncComponent } from 'vue'
import { Search, X } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'
import DockSearchDropdown from './search/DockSearchDropdown.vue'
import type { SearchResult } from './search/DockSearchResultRow.vue'

const DockSearchModal = defineAsyncComponent(() => import('./search/DockSearchModal.vue'))

const { registeredApps } = useDockBoot()

// ── Refs ──────────────────────────────────────────────────────────────────────
const pillRef      = ref<HTMLButtonElement | null>(null)
const inputRef     = ref<HTMLInputElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

const isModalOpen  = ref(false)
const query        = ref('')
const scopedApp    = ref('')
const results      = ref<SearchResult[]>([])
const loading      = ref(false)
const hasSearched  = ref(false)
const activeIndex  = ref(-1)
const isInputFocused = ref(false)

const isMac = navigator.platform.toUpperCase().includes('MAC')

// ── App maps ──────────────────────────────────────────────────────────────────
const appColorMap = computed(() => {
  const map: Record<string, string> = {}
  for (const a of (registeredApps.value as Array<{ app: string; color?: string }>) ?? []) {
    if (a.color) map[a.app] = a.color
  }
  return map
})

const appLabelMap = computed(() => {
  const map: Record<string, string> = {}
  for (const a of (registeredApps.value as Array<{ app: string; label?: string }>) ?? []) {
    if (a.label) map[a.app] = a.label
  }
  return map
})

const appOptions = computed(() =>
  (registeredApps.value as Array<{ app: string; label: string }>) ?? [],
)

// ── Grouped results ───────────────────────────────────────────────────────────
const groupedResults = computed(() => {
  const sections: { label: string; app: string; items: SearchResult[] }[] = []
  const sectionMap = new Map<string, { label: string; app: string; items: SearchResult[] }>()

  for (const r of results.value) {
    const key = `${r.app}:${r.section}`
    if (!sectionMap.has(key)) {
      const section = { label: r.section, app: r.app, items: [] as SearchResult[] }
      sectionMap.set(key, section)
      sections.push(section)
    }
    sectionMap.get(key)!.items.push(r)
  }
  return sections
})

const showDropdown = computed(() =>
  query.value.length >= 2 && (loading.value || hasSearched.value) && isInputFocused.value,
)

// ── Debounced search ──────────────────────────────────────────────────────────
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(query, (val) => {
  activeIndex.value = -1
  if (debounceTimer) clearTimeout(debounceTimer)

  if (!val || val.length < 2) {
    results.value = []
    loading.value = false
    hasSearched.value = false
    return
  }

  loading.value = true
  debounceTimer = setTimeout(doSearch, 300)
})

watch(scopedApp, () => {
  if (query.value.length >= 2) {
    activeIndex.value = -1
    loading.value = true
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(doSearch, 100)
  }
})

async function doSearch() {
  if (!query.value || query.value.length < 2) return
  loading.value = true
  try {
    const res = await callApi<SearchResult[]>('dock.api.search.global_search', {
      query: query.value,
      per_section: 5,
      ...(scopedApp.value ? { app: scopedApp.value } : {}),
    })
    results.value = res
    hasSearched.value = true
  } catch {
    results.value = []
  } finally {
    loading.value = false
  }
}

// ── Navigation ────────────────────────────────────────────────────────────────
function navigate(r: SearchResult) {
  window.location.href = r.route
  closeDropdown()
}

function closeDropdown() {
  query.value = ''
  results.value = []
  hasSearched.value = false
  activeIndex.value = -1
  isInputFocused.value = false
  inputRef.value?.blur()
}

function openModal() {
  isModalOpen.value = true
  closeDropdown()
}

function closeModal() {
  isModalOpen.value = false
}

// ── Keyboard (inline dropdown) ────────────────────────────────────────────────
function scrollActiveIntoView() {
  const item = results.value[activeIndex.value]
  if (!item) return
  const el = document.getElementById(`search-dd-item-${item.name}`)
  el?.scrollIntoView({ block: 'nearest' })
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (query.value) {
      query.value = ''
      results.value = []
      hasSearched.value = false
    } else {
      isInputFocused.value = false
      inputRef.value?.blur()
    }
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (!results.value.length) return
    activeIndex.value = (activeIndex.value + 1) % results.value.length
    scrollActiveIntoView()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (!results.value.length) return
    activeIndex.value = activeIndex.value <= 0
      ? results.value.length - 1
      : activeIndex.value - 1
    scrollActiveIntoView()
  } else if (e.key === 'Enter') {
    if (activeIndex.value >= 0 && results.value[activeIndex.value]) {
      e.preventDefault()
      if (e.ctrlKey || e.metaKey) {
        window.open(results.value[activeIndex.value].route, '_blank')
      } else {
        navigate(results.value[activeIndex.value])
      }
    }
  }
}

// ── Click outside ─────────────────────────────────────────────────────────────
function onClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isInputFocused.value = false
  }
}

// ── Global Cmd/Ctrl+K ─────────────────────────────────────────────────────────
function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    openModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onGlobalKeydown)
  document.addEventListener('mousedown', onClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onGlobalKeydown)
  document.removeEventListener('mousedown', onClickOutside)
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>

<template>
  <div ref="containerRef" class="dock-search relative">
    <!-- ═══ Desktop: always-visible search bar ═══ -->
    <div class="!hidden md:!flex items-center flex-1 max-w-lg relative">
      <div
        class="dock-search-bar flex items-center w-full h-9 rounded-lg border
               bg-white dark:bg-gray-800 overflow-hidden transition-all"
        :class="isInputFocused
          ? 'border-[var(--dock-accent)] ring-2 ring-[var(--dock-accent)]/30'
          : 'border-gray-200 dark:border-gray-600'"
      >
        <!-- Scope dropdown -->
        <select
          v-model="scopedApp"
          class="h-full pl-3 pr-1 text-xs font-medium bg-gray-50 dark:bg-gray-700
                 text-[var(--dock-text)] border-r border-gray-200 dark:border-gray-600
                 outline-none cursor-pointer appearance-none
                 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          :aria-label="__('Search scope')"
        >
          <option value="">{{ __('All') }}</option>
          <option
            v-for="app in appOptions"
            :key="app.app"
            :value="app.app"
          >{{ app.label }}</option>
        </select>

        <!-- Search input -->
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          class="flex-1 h-full px-3 text-sm bg-transparent outline-none
                 text-[var(--dock-text)] placeholder:text-gray-400 dark:placeholder:text-gray-500"
          :placeholder="__('Search...')"
          role="combobox"
          aria-autocomplete="list"
          :aria-expanded="showDropdown"
          @focus="isInputFocused = true"
          @keydown="onKeydown"
        />

        <!-- Clear button -->
        <button
          v-if="query"
          class="px-2 text-gray-400 hover:text-[var(--dock-text)] transition-colors"
          :aria-label="__('Clear')"
          @click="query = ''; inputRef?.focus()"
        >
          <X class="w-3.5 h-3.5" />
        </button>

        <!-- Search icon button -->
        <button
          class="flex items-center justify-center h-full px-3
                 text-gray-400 hover:text-[var(--dock-text)]
                 border-l border-gray-200 dark:border-gray-600
                 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          :aria-label="__('Search')"
          @click="inputRef?.focus()"
        >
          <Search class="w-4 h-4" />
        </button>
      </div>

      <!-- Inline dropdown results -->
      <DockSearchDropdown
        v-if="showDropdown"
        :results="results"
        :loading="loading"
        :active-index="activeIndex"
        :grouped-results="groupedResults"
        :show-app-badge="!scopedApp"
        :app-color-map="appColorMap"
        :app-label-map="appLabelMap"
        :query="query"
        :has-searched="hasSearched"
        @select="navigate"
      />
    </div>

    <!-- ═══ Mobile: icon button → full modal (hidden on md+ via !important to survive cross-file CSS) ═══ -->
    <button
      ref="pillRef"
      class="dock-search-mobile flex md:!hidden items-center justify-center w-8 h-8 rounded-md
             text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      :aria-label="__('Search')"
      @click="openModal"
    >
      <Search class="w-4 h-4" />
    </button>

    <!-- ═══ Full modal (Cmd+K or mobile) ═══ -->
    <DockSearchModal v-if="isModalOpen" :return-focus-el="pillRef" @close="closeModal" />
  </div>
</template>

<style scoped>
/* Native select arrow override */
.dock-search-bar select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 6px center;
  padding-right: 22px;
}
</style>
