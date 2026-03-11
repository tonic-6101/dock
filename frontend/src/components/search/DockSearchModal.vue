<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockSearchModal' }
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { Search, X } from 'lucide-vue-next'
import { Teleport } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'
import DockSearchResultRow from './DockSearchResultRow.vue'
import DockSearchLoading from './DockSearchLoading.vue'
import DockSearchEmpty from './DockSearchEmpty.vue'
import DockSearchError from './DockSearchError.vue'
import DockSearchRecent from './DockSearchRecent.vue'

interface SearchResult {
  label: string; route: string; app: string; section: string; doctype: string; name: string
}

const emit = defineEmits<{ close: [] }>()

const { registeredApps } = useDockBoot()
const appColorMap = computed(() => {
  const map: Record<string, string> = {}
  for (const a of (registeredApps.value as Array<{ app: string; color?: string }>) ?? []) {
    if (a.color) map[a.app] = a.color
  }
  return map
})

const query        = ref('')
const scopedApp    = ref<string | null>(null)
const results      = ref<SearchResult[]>([])
const loading      = ref(false)
const hasError     = ref(false)
const focusedIdx   = ref(-1)
const inputRef     = ref<HTMLInputElement | null>(null)

// Groups results by app for visual separation
const groupedResults = computed(() => {
  const groups: Record<string, SearchResult[]> = {}
  for (const r of results.value) {
    if (!groups[r.app]) groups[r.app] = []
    groups[r.app].push(r)
  }
  return groups
})

const flatResults = computed(() => results.value)

// Debounce
let debounceTimer: ReturnType<typeof setTimeout> | null = null
watch(query, (val) => {
  hasError.value = false
  focusedIdx.value = -1
  if (debounceTimer) clearTimeout(debounceTimer)
  if (val.length < 2) { results.value = []; loading.value = false; return }
  loading.value = true
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

// Keyboard navigation
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { emit('close'); return }
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

function navigate(r: SearchResult) {
  window.location.href = r.route
  emit('close')
}

function navigateRecent(route: string) {
  window.location.href = route
  emit('close')
}

// Backdrop click
function onBackdropClick(e: MouseEvent) {
  if ((e.target as HTMLElement).id === 'dock-search-backdrop') emit('close')
}

onMounted(() => nextTick(() => inputRef.value?.focus()))
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div
      id="dock-search-backdrop"
      class="fixed inset-0 z-40 bg-black/40 flex items-start justify-center pt-[10vh] px-4"
      @mousedown="onBackdropClick"
    >
      <!-- Modal -->
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Global search"
        class="w-full max-w-lg bg-[var(--dock-bg)] border border-[var(--dock-border)]
               rounded-xl shadow-2xl overflow-hidden"
      >
        <!-- Input -->
        <div class="flex items-center gap-2 px-4 py-3 border-b border-[var(--dock-border)]">
          <Search class="w-4 h-4 text-[var(--dock-icon)] shrink-0" />
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            class="flex-1 bg-transparent text-[var(--dock-text)] text-sm outline-none placeholder-[var(--dock-icon)]"
            :placeholder="__('Search...')"
          />
          <button
            v-if="query"
            class="text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
            @click="query = ''"
          ><X class="w-4 h-4" /></button>
          <kbd class="text-xs text-[var(--dock-icon)] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">Esc</kbd>
        </div>

        <!-- Scope tabs -->
        <div class="flex gap-1 px-3 pt-2 pb-1 overflow-x-auto">
          <button
            class="px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0"
            :class="!scopedApp
              ? 'bg-[var(--dock-accent)] text-white'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click="scopedApp = null; doSearch()"
          >{{ __('All') }}</button>
          <button
            v-for="app in (registeredApps as Array<{ app: string; label: string }>)"
            :key="app.app"
            class="px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0"
            :class="scopedApp === app.app
              ? 'bg-[var(--dock-accent)] text-white'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click="scopedApp = app.app; doSearch()"
          >{{ app.label }}</button>
        </div>

        <!-- Results -->
        <div
          role="listbox"
          class="max-h-[60vh] overflow-y-auto"
        >
          <DockSearchLoading v-if="loading" />
          <DockSearchError v-else-if="hasError" @retry="doSearch" />
          <template v-else-if="query.length >= 2">
            <DockSearchEmpty
              v-if="!results.length"
              :query="query"
              :scoped-app="scopedApp"
              @clear-scope="scopedApp = null; doSearch()"
            />
            <template v-else>
              <template v-for="(group, app) in groupedResults" :key="app">
                <DockSearchResultRow
                  v-for="(r, idx) in group"
                  :key="r.name"
                  :result="r"
                  :app-color="appColorMap[r.app]"
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
    </div>
  </Teleport>
</template>
