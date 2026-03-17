<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockSearchModal' }
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { Teleport } from 'vue'
import { Search, X } from 'lucide-vue-next'
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
interface SectionMeta { label: string; doctype: string }

const props = defineProps<{ returnFocusEl?: HTMLElement | null }>()
const emit  = defineEmits<{ close: [] }>()

const { registeredApps } = useDockBoot()

// Boot data — search_sections keyed by app
const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot ?? {}
const searchSectionsByApp: Record<string, SectionMeta[]> = boot?.search_sections ?? {}
const recentItemsEnabled = (boot?.settings?.enable_recent_items as boolean) ?? true

const appColorMap = computed(() => {
  const map: Record<string, string> = {}
  for (const a of (registeredApps.value as Array<{ app: string; color?: string }>) ?? []) {
    if (a.color) map[a.app] = a.color
  }
  return map
})

// Scope state — defaults to current app based on URL path
const scopedApp     = ref<string | null>(null)
const scopedSection = ref<string | null>(null)

const currentPath = window.location.pathname
const matchedApp = (registeredApps.value as Array<{ app: string; route?: string }>)
  .find(a => a.route && currentPath.startsWith(a.route))
if (matchedApp) scopedApp.value = matchedApp.app

const sectionTabs = computed<SectionMeta[]>(() =>
  scopedApp.value ? (searchSectionsByApp[scopedApp.value] ?? []) : []
)

function setApp(app: string | null) {
  scopedApp.value     = app
  scopedSection.value = null
  if (query.value.length >= 2) doSearch()
}

function setSection(label: string | null) {
  scopedSection.value = label
  if (query.value.length >= 2) doSearch()
}

// Query + results
const query      = ref('')
const results    = ref<SearchResult[]>([])
const loading    = ref(false)
const hasError   = ref(false)
const focusedIdx = ref(-1)

const groupedResults = computed(() => {
  const groups: Record<string, SearchResult[]> = {}
  for (const r of results.value) {
    if (!groups[r.app]) groups[r.app] = []
    groups[r.app].push(r)
  }
  return groups
})
const flatResults = computed(() => results.value)

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
      query:       query.value,
      per_section: 5,
      ...(scopedApp.value     ? { app:     scopedApp.value }     : {}),
      ...(scopedSection.value ? { section: scopedSection.value } : {}),
    })
  } catch { hasError.value = true }
  finally { loading.value = false }
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
  emit('close')
  nextTick(() => props.returnFocusEl?.focus())
}

// ── Focus trap + keyboard navigation ──────────────────────────────────────

const modalRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const FOCUSABLE_SEL = 'input, button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'

function getFocusable(): HTMLElement[] {
  if (!modalRef.value) return []
  return Array.from(
    modalRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SEL)
  ).filter(el => (el as HTMLButtonElement).disabled === false || !(el as HTMLButtonElement).disabled)
    .filter(el => el.offsetParent !== null)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { close(); return }

  // Focus trap
  if (e.key === 'Tab') {
    const focusable = getFocusable()
    if (!focusable.length) return
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    return
  }

  // ← / → navigate scope tabs when focus is on a scope tab button
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const tabs = Array.from(
      modalRef.value?.querySelectorAll<HTMLElement>('[data-scope-tab]') ?? []
    )
    const idx = tabs.indexOf(document.activeElement as HTMLElement)
    if (idx >= 0) {
      e.preventDefault()
      const next = e.key === 'ArrowRight'
        ? (idx + 1) % tabs.length
        : (idx - 1 + tabs.length) % tabs.length
      tabs[next].focus()
    }
    return
  }

  // Result list keyboard navigation
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

function onBackdropClick(e: MouseEvent) {
  if ((e.target as HTMLElement).id === 'dock-search-backdrop') close()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  nextTick(() => inputRef.value?.focus())
})
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div
      id="dock-search-backdrop"
      class="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-[10vh] px-4
             sm:pt-[12vh]"
      @mousedown="onBackdropClick"
    >
      <!-- Modal panel -->
      <div
        ref="modalRef"
        role="dialog"
        aria-modal="true"
        aria-label="Global search"
        class="w-full max-w-lg bg-[var(--dock-bg)] border border-[var(--dock-border)]
               rounded-xl shadow-2xl overflow-hidden
               max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-14
               max-sm:rounded-b-none max-sm:max-w-none"
        @mousedown.stop
      >
        <!-- Input row -->
        <div class="flex items-center gap-2 px-4 py-3 border-b border-[var(--dock-border)]">
          <Search class="w-4 h-4 text-[var(--dock-icon)] shrink-0" />
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            class="flex-1 bg-transparent text-[var(--dock-text)] text-sm outline-none
                   placeholder:text-[var(--dock-icon)]"
            :placeholder="__('Search...')"
          />
          <button
            v-if="query"
            class="text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
            :aria-label="__('Clear')"
            @click="query = ''; inputRef?.focus()"
          >
            <X class="w-4 h-4" />
          </button>
          <kbd class="text-xs text-[var(--dock-icon)] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">
            Esc
          </kbd>
        </div>

        <!-- Level 1: app scope tabs -->
        <div class="flex gap-1 px-3 pt-2 pb-1 overflow-x-auto">
          <button
            data-scope-tab
            class="px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0"
            :class="!scopedApp
              ? 'bg-[var(--dock-accent)] text-white'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click="setApp(null)"
          >{{ __('All') }}</button>
          <button
            v-for="app in (registeredApps as Array<{ app: string; label: string }>)"
            :key="app.app"
            data-scope-tab
            class="px-2.5 py-1 rounded-full text-xs font-medium transition-colors shrink-0"
            :class="scopedApp === app.app
              ? 'bg-[var(--dock-accent)] text-white'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click="setApp(app.app)"
          >{{ app.label }}</button>
        </div>

        <!-- Level 2: section tabs (only when an app is selected and has multiple sections) -->
        <div v-if="sectionTabs.length > 1" class="flex gap-1 px-3 pb-2 overflow-x-auto">
          <button
            data-scope-tab
            class="px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors shrink-0"
            :class="!scopedSection
              ? 'bg-[var(--dock-accent)]/15 text-[var(--dock-accent)]'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click="setSection(null)"
          >{{ __('All') }}</button>
          <button
            v-for="s in sectionTabs"
            :key="s.label"
            data-scope-tab
            class="px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors shrink-0"
            :class="scopedSection === s.label
              ? 'bg-[var(--dock-accent)]/15 text-[var(--dock-accent)]'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click="setSection(s.label)"
          >{{ s.label }}</button>
        </div>

        <!-- Results area -->
        <div role="listbox" class="max-h-[60vh] overflow-y-auto">
          <DockSearchLoading v-if="loading" />
          <DockSearchError v-else-if="hasError" @retry="doSearch" />
          <template v-else-if="query.length >= 2">
            <DockSearchEmpty
              v-if="!results.length"
              :query="query"
              :scoped-app="scopedApp"
              @clear-scope="setApp(null)"
            />
            <template v-else>
              <template v-for="(group, app) in groupedResults" :key="app">
                <DockSearchResultRow
                  v-for="r in group"
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
          <DockSearchRecent v-else-if="recentItemsEnabled" @navigate="navigateRecent" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
