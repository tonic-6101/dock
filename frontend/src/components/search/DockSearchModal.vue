<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Global search command palette — opens via Cmd/Ctrl+K or clicking the ghost pill.
  Desktop: centered modal overlay (§4). Mobile: full-screen slide-up (§10).
  See ecosystem spec: search.md §4, §5, §9, §10, §12, §13
-->
<script lang="ts">
export default { name: 'DockSearchModal' }
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { Teleport, Transition } from 'vue'
import { Search, X, ChevronLeft } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'
import DockSearchResultRow from './DockSearchResultRow.vue'
import DockSearchSectionHeader from './DockSearchSectionHeader.vue'
import DockSearchLoading from './DockSearchLoading.vue'
import DockSearchEmpty from './DockSearchEmpty.vue'
import DockSearchError from './DockSearchError.vue'
import DockSearchRecent from './DockSearchRecent.vue'
import type { SearchResult } from './DockSearchResultRow.vue'

interface SectionMeta { label: string; doctype: string }

const props = defineProps<{ returnFocusEl?: HTMLElement | null }>()
const emit  = defineEmits<{ close: [] }>()

const { registeredApps } = useDockBoot()

// ── Boot data ────────────────────────────────────────────────────────────────
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

const appLabelMap = computed(() => {
  const map: Record<string, string> = {}
  for (const a of (registeredApps.value as Array<{ app: string; label?: string }>) ?? []) {
    if (a.label) map[a.app] = a.label
  }
  return map
})

// ── Scope state ──────────────────────────────────────────────────────────────
const scopedApp     = ref<string | null>(null)
const scopedSection = ref<string | null>(null)

// Auto-scope to current app based on URL
const currentPath = window.location.pathname
const matchedApp = (registeredApps.value as Array<{ app: string; route?: string }>)
  .find(a => a.route && currentPath.startsWith(a.route))
if (matchedApp) scopedApp.value = matchedApp.app

const sectionTabs = computed<SectionMeta[]>(() =>
  scopedApp.value ? (searchSectionsByApp[scopedApp.value] ?? []) : [],
)

// Show app badge when results come from multiple apps (All scope)
const showAppBadge = computed(() => !scopedApp.value)

function setApp(app: string | null) {
  scopedApp.value     = app
  scopedSection.value = null
  if (query.value.length >= minQueryLen.value) doSearch()
}

function setSection(label: string | null) {
  scopedSection.value = label
  if (query.value.length >= minQueryLen.value) doSearch()
}

// §3.3: min 2 chars cross-category, 1 char with scope
const minQueryLen = computed(() => scopedSection.value ? 1 : 2)

// ── Query + results ──────────────────────────────────────────────────────────
const query       = ref('')
const results     = ref<SearchResult[]>([])
const prevResults = ref<SearchResult[]>([])
const loading     = ref(false)
const showLoader  = ref(false)
const hasError    = ref(false)
const hasSearched = ref(false)
const focusedIdx  = ref(-1)
const mouseMoved  = ref(true)

// §7: Group results by section with ordering
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

const flatResults = computed(() => results.value)

const totalResults = computed(() => results.value.length)

// §3.3: 300ms debounce
let debounceTimer: ReturnType<typeof setTimeout> | null = null
let loaderTimer: ReturnType<typeof setTimeout> | null = null

watch(query, (val) => {
  hasError.value = false
  focusedIdx.value = -1
  if (debounceTimer) clearTimeout(debounceTimer)
  if (loaderTimer) { clearTimeout(loaderTimer); showLoader.value = false }

  if (val.length < minQueryLen.value) {
    results.value = []
    prevResults.value = []
    loading.value = false
    hasSearched.value = false
    return
  }

  loading.value = true
  // §9.2: Show loading only after 150ms to avoid flicker
  loaderTimer = setTimeout(() => { showLoader.value = true }, 150)
  debounceTimer = setTimeout(doSearch, 300)
})

async function doSearch() {
  if (query.value.length < minQueryLen.value) return
  loading.value = true
  hasError.value = false

  try {
    const res = await callApi<SearchResult[]>('dock.api.search.global_search', {
      query:       query.value,
      per_section: 5,
      ...(scopedApp.value     ? { app:     scopedApp.value }     : {}),
      ...(scopedSection.value ? { section: scopedSection.value } : {}),
    })
    prevResults.value = results.value
    results.value = res
    hasSearched.value = true
  } catch {
    hasError.value = true
  } finally {
    loading.value = false
    showLoader.value = false
    if (loaderTimer) { clearTimeout(loaderTimer); loaderTimer = null }
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
  emit('close')
  nextTick(() => props.returnFocusEl?.focus())
}

// ── Focus trap + keyboard navigation (§12, §13) ─────────────────────────────

const modalRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const FOCUSABLE_SEL = 'input, button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'

function getFocusable(): HTMLElement[] {
  if (!modalRef.value) return []
  return Array.from(
    modalRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SEL),
  ).filter(el => el.offsetParent !== null)
}

// §12.4: scroll active result into view
function scrollActiveIntoView() {
  const item = flatResults.value[focusedIdx.value]
  if (!item) return
  const el = document.getElementById(`search-item-${item.name}`)
  el?.scrollIntoView({ block: 'nearest' })
}

function onKeydown(e: KeyboardEvent) {
  // Any key press resets mouse tracking for §12.4
  mouseMoved.value = false

  if (e.key === 'Escape') {
    // §12.1: If has query, clear first. If empty, close.
    if (query.value) {
      query.value = ''
      results.value = []
      hasSearched.value = false
    } else {
      close()
    }
    return
  }

  // Focus trap (§13.2)
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

  // Scope tab navigation with arrow keys
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const tabs = Array.from(
      modalRef.value?.querySelectorAll<HTMLElement>('[data-scope-tab]') ?? [],
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

  // §12.2: Arrow navigation with WRAPPING
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (flatResults.value.length === 0) return
    focusedIdx.value = (focusedIdx.value + 1) % flatResults.value.length
    scrollActiveIntoView()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (flatResults.value.length === 0) return
    focusedIdx.value = focusedIdx.value <= 0
      ? flatResults.value.length - 1
      : focusedIdx.value - 1
    scrollActiveIntoView()
  } else if (e.key === 'Enter') {
    if (focusedIdx.value >= 0 && flatResults.value[focusedIdx.value]) {
      // §12.1: Ctrl+Enter opens in new tab
      if (e.ctrlKey || e.metaKey) {
        window.open(flatResults.value[focusedIdx.value].route, '_blank')
      } else {
        navigate(flatResults.value[focusedIdx.value])
      }
    }
  }
}

// §12.4: Mouse coexistence — track mouse movement
function onMouseMove() {
  mouseMoved.value = true
}

function onMouseActivate(idx: number) {
  if (mouseMoved.value) {
    focusedIdx.value = idx
  }
}

function onBackdropClick(e: MouseEvent) {
  if ((e.target as HTMLElement).id === 'dock-search-backdrop') close()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('mousemove', onMouseMove)
  nextTick(() => inputRef.value?.focus())
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('mousemove', onMouseMove)
})

// Detect mobile for template branching
const isMobile = ref(window.innerWidth < 768)
function onResize() { isMobile.value = window.innerWidth < 768 }
onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => window.removeEventListener('resize', onResize))

const isMac = navigator.platform.toUpperCase().includes('MAC')
</script>

<template>
  <Teleport to="body">
    <!-- §10: Mobile full-screen slide-up -->
    <Transition v-if="isMobile" name="slide-up">
      <div
        ref="modalRef"
        class="fixed inset-0 z-[60] flex flex-col bg-[var(--dock-bg)]"
        role="dialog"
        aria-modal="true"
        :aria-label="__('Search')"
        @mousedown.stop
      >
        <!-- Mobile header -->
        <div class="flex items-center gap-2 px-4 h-14 border-b border-[var(--dock-border)]">
          <button
            class="p-1 -ml-1 text-[var(--dock-icon)]"
            :aria-label="__('Close search')"
            @click="close"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            class="flex-1 text-base bg-transparent outline-none
                   text-[var(--dock-text)] placeholder:text-[var(--dock-icon)]"
            :placeholder="__('Search...')"
            role="combobox"
            aria-autocomplete="list"
            :aria-expanded="hasSearched && totalResults > 0"
            aria-controls="dock-search-results"
            :aria-activedescendant="focusedIdx >= 0 ? `search-item-${flatResults[focusedIdx]?.name}` : undefined"
            autofocus
          />
          <button
            v-if="query"
            class="p-1 text-[var(--dock-icon)]"
            :aria-label="__('Clear')"
            @click="query = ''; inputRef?.focus()"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Mobile scope tabs (horizontal scroll) -->
        <div
          class="flex gap-1 px-4 py-2 overflow-x-auto border-b border-[var(--dock-border)]/50
                 scrollbar-hide"
        >
          <button
            data-scope-tab
            class="px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors shrink-0"
            :class="!scopedApp
              ? 'bg-[var(--dock-accent)] text-white'
              : 'bg-black/5 dark:bg-white/10 text-[var(--dock-icon)]'"
            @click="setApp(null)"
          >{{ __('All') }}</button>
          <button
            v-for="app in (registeredApps as Array<{ app: string; label: string }>)"
            :key="app.app"
            data-scope-tab
            class="px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors shrink-0"
            :class="scopedApp === app.app
              ? 'bg-[var(--dock-accent)] text-white'
              : 'bg-black/5 dark:bg-white/10 text-[var(--dock-icon)]'"
            @click="setApp(app.app)"
          >{{ app.label }}</button>
        </div>

        <!-- Mobile results (min 44px touch targets per §15.1) -->
        <div
          id="dock-search-results"
          class="flex-1 overflow-y-auto overscroll-contain"
          role="listbox"
          :aria-label="__('Search results')"
        >
          <DockSearchLoading v-if="showLoader && !results.length" />
          <DockSearchError v-else-if="hasError" @retry="doSearch" />
          <template v-else-if="query.length >= minQueryLen">
            <!-- Too short hint (single char, no scope) -->
            <div
              v-if="query.length === 1 && !scopedSection"
              class="px-4 py-3 text-xs text-[var(--dock-icon)] text-center"
            >{{ __('Type at least 2 characters to search') }}</div>
            <DockSearchEmpty
              v-else-if="hasSearched && !results.length && !loading"
              :query="query"
              :scoped-app="scopedApp"
              @clear-scope="setApp(null)"
            />
            <template v-else-if="results.length">
              <template v-for="section in groupedResults" :key="`${section.app}:${section.label}`">
                <DockSearchSectionHeader
                  :label="section.label"
                  :count="section.items.length"
                />
                <DockSearchResultRow
                  v-for="r in section.items"
                  :key="r.name"
                  :result="r"
                  :query="query"
                  :app-color="appColorMap[r.app]"
                  :app-label="appLabelMap[r.app]"
                  :focused="flatResults.indexOf(r) === focusedIdx"
                  :show-app-badge="showAppBadge"
                  class="min-h-[44px]"
                  @navigate="navigate"
                  @activate="onMouseActivate(flatResults.indexOf(r))"
                />
              </template>
            </template>
          </template>
          <DockSearchRecent v-else-if="recentItemsEnabled" @navigate="navigateRecent" />
        </div>
      </div>
    </Transition>

    <!-- Desktop: centered palette overlay (§4) -->
    <Transition v-else name="palette">
      <div
        id="dock-search-backdrop"
        class="fixed inset-0 z-[60] flex justify-center items-start pt-[15vh] px-4"
        @mousedown="onBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 dark:bg-black/70" aria-hidden="true" />

        <!-- Palette panel -->
        <div
          ref="modalRef"
          role="dialog"
          aria-modal="true"
          :aria-label="__('Search')"
          class="relative w-full max-w-xl rounded-xl shadow-2xl overflow-hidden
                 bg-[var(--dock-bg)] border border-[var(--dock-border)]"
          @mousedown.stop
        >
          <!-- Input row -->
          <div class="flex items-center gap-2 px-4 border-b border-[var(--dock-border)]">
            <Search class="w-5 h-5 text-[var(--dock-icon)] shrink-0" aria-hidden="true" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              class="flex-1 h-12 px-3 text-base bg-transparent
                     text-[var(--dock-text)] placeholder:text-[var(--dock-icon)]
                     outline-none"
              :placeholder="__('Search...')"
              role="combobox"
              aria-autocomplete="list"
              :aria-expanded="hasSearched && totalResults > 0"
              aria-controls="dock-search-results"
              :aria-activedescendant="focusedIdx >= 0 ? `search-item-${flatResults[focusedIdx]?.name}` : undefined"
            />
            <button
              v-if="query"
              class="text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
              :aria-label="__('Clear')"
              @click="query = ''; inputRef?.focus()"
            >
              <X class="w-4 h-4" />
            </button>
            <kbd class="px-1.5 py-0.5 text-[10px] font-medium rounded
                        bg-black/5 dark:bg-white/10 text-[var(--dock-icon)]
                        border border-[var(--dock-border)]">
              ESC
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
          <div
            id="dock-search-results"
            role="listbox"
            :aria-label="__('Search results')"
            class="max-h-[60vh] overflow-y-auto overscroll-contain"
          >
            <!-- §9.2: Loading — keep previous results visible, show spinner in header -->
            <template v-if="loading && results.length">
              <template v-for="section in groupedResults" :key="`${section.app}:${section.label}`">
                <DockSearchSectionHeader
                  :label="section.label"
                  :count="section.items.length"
                />
                <DockSearchResultRow
                  v-for="r in section.items"
                  :key="r.name"
                  :result="r"
                  :query="query"
                  :app-color="appColorMap[r.app]"
                  :app-label="appLabelMap[r.app]"
                  :focused="flatResults.indexOf(r) === focusedIdx"
                  :show-app-badge="showAppBadge"
                  @navigate="navigate"
                  @activate="onMouseActivate(flatResults.indexOf(r))"
                />
              </template>
            </template>

            <!-- §9.2: Show skeleton only when no prior results exist -->
            <DockSearchLoading v-else-if="showLoader && !results.length" />
            <DockSearchError v-else-if="hasError" @retry="doSearch" />
            <template v-else-if="query.length >= minQueryLen">
              <!-- §9.5: Too-short query hint -->
              <div
                v-if="query.length === 1 && !scopedSection"
                class="px-4 py-3 text-xs text-[var(--dock-icon)] text-center"
              >{{ __('Type at least 2 characters to search') }}</div>
              <DockSearchEmpty
                v-else-if="hasSearched && !results.length && !loading"
                :query="query"
                :scoped-app="scopedApp"
                @clear-scope="setApp(null)"
              />
              <template v-else-if="results.length">
                <template v-for="section in groupedResults" :key="`${section.app}:${section.label}`">
                  <DockSearchSectionHeader
                    :label="section.label"
                    :count="section.items.length"
                  />
                  <DockSearchResultRow
                    v-for="r in section.items"
                    :key="r.name"
                    :result="r"
                    :query="query"
                    :app-color="appColorMap[r.app]"
                    :app-label="appLabelMap[r.app]"
                    :focused="flatResults.indexOf(r) === focusedIdx"
                    :show-app-badge="showAppBadge"
                    @navigate="navigate"
                    @activate="onMouseActivate(flatResults.indexOf(r))"
                  />
                </template>
              </template>
            </template>
            <DockSearchRecent v-else-if="recentItemsEnabled" @navigate="navigateRecent" />
          </div>

          <!-- §4.3: Footer with keyboard hints -->
          <div
            v-if="results.length"
            class="px-4 py-2 border-t border-[var(--dock-border)]
                   text-xs text-[var(--dock-icon)]
                   flex items-center justify-between"
          >
            <span>
              <kbd class="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[10px]">&uarr;&darr;</kbd>
              {{ __('navigate') }}
              <kbd class="ml-2 px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[10px]">&crarr;</kbd>
              {{ __('open') }}
              <kbd class="ml-2 px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[10px]">{{ isMac ? '⌘' : 'Ctrl' }}+&crarr;</kbd>
              {{ __('new tab') }}
            </span>
          </div>

          <!-- §13.3: Screen reader live region -->
          <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
            <template v-if="loading">{{ __('Searching...') }}</template>
            <template v-else-if="hasSearched && totalResults > 0">
              {{ __('{0} results found').replace('{0}', String(totalResults)) }}
            </template>
            <template v-else-if="hasSearched && totalResults === 0">
              {{ __('No results found') }}
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* §4.4: Palette transitions — fade + subtle slide */
.palette-enter-active {
  transition: opacity 150ms ease-out;
}
.palette-leave-active {
  transition: opacity 100ms ease-in;
}
.palette-enter-from,
.palette-leave-to {
  opacity: 0;
}
.palette-enter-active .relative {
  transition: transform 150ms ease-out, opacity 150ms ease-out;
}
.palette-enter-from .relative {
  transform: translateY(-8px);
  opacity: 0;
}

/* §10.4: Mobile slide-up transition */
.slide-up-enter-active {
  transition: transform 200ms ease-out;
}
.slide-up-leave-active {
  transition: transform 150ms ease-in;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

/* Hide scrollbar on scope tabs */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* §15.1: Mobile touch targets */
@media (max-width: 767px) {
  [role="option"] {
    min-height: 44px;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
}
</style>
