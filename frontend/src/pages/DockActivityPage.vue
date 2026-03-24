<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockActivityPage' }
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useActivityFeed } from '@/composables/useActivityFeed'
import DockActivityFeed from '@/components/activity/DockActivityFeed.vue'

// --- Boot data ---
const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot
const currentUser = (window as any).frappe?.session?.user ?? boot?.session?.user ?? ''

// --- Activity sources from boot ---
interface ActivitySource {
  app: string
  doctype: string
  label: string
  icon?: string
}
const allSources: ActivitySource[] = boot?.activity_sources ?? []

const availableApps = computed(() => {
  const apps = new Map<string, string>()
  for (const s of allSources) {
    if (!apps.has(s.app)) apps.set(s.app, s.app)
  }
  return Array.from(apps.keys())
})

const availableTypes = computed(() => {
  const types = new Map<string, { doctype: string; label: string }>()
  for (const s of allSources) {
    if (!types.has(s.doctype)) types.set(s.doctype, { doctype: s.doctype, label: s.label })
  }
  return Array.from(types.values())
})

// --- Filter state ---
const filterApps = ref<Set<string>>(new Set())  // empty = all apps
const filterUser = ref<'all' | 'mine'>('all')
const filterTypes = ref<Set<string>>(new Set()) // empty = all types
const filterDateRange = ref<string>('last_7')

// Activity type (action) filter
type ActionType = 'create' | 'update'
const filterAction = ref<ActionType | null>(null)

// App checkbox helpers
function toggleApp(app: string) {
  const s = new Set(filterApps.value)
  if (s.has(app)) s.delete(app)
  else s.add(app)
  filterApps.value = s
}
function selectAllApps() {
  filterApps.value = new Set()
}
const appFilterLabel = computed(() => {
  if (filterApps.value.size === 0) return __('All apps')
  if (filterApps.value.size === 1) return Array.from(filterApps.value)[0]
  return `${filterApps.value.size} ${__('apps')}`
})

// Type (record type) checkbox helpers
function toggleType(doctype: string) {
  const s = new Set(filterTypes.value)
  if (s.has(doctype)) s.delete(doctype)
  else s.add(doctype)
  filterTypes.value = s
}
function selectAllTypes() {
  filterTypes.value = new Set()
}
const typeFilterLabel = computed(() => {
  if (filterTypes.value.size === 0) return __('All types')
  if (filterTypes.value.size === 1) {
    const dt = Array.from(filterTypes.value)[0]
    return availableTypes.value.find(t => t.doctype === dt)?.label || dt
  }
  return `${filterTypes.value.size} ${__('types')}`
})

// --- Date presets ---
interface DatePreset {
  key: string
  label: string
  from: () => string
  to: () => string
}

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function startOfWeek(d: Date): Date {
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Monday start
  return new Date(d.getFullYear(), d.getMonth(), diff)
}

const datePresets: DatePreset[] = [
  {
    key: 'today',
    label: 'Today',
    from: () => toISO(new Date()),
    to: () => toISO(new Date()),
  },
  {
    key: 'yesterday',
    label: 'Yesterday',
    from: () => { const d = new Date(); d.setDate(d.getDate() - 1); return toISO(d) },
    to: () => { const d = new Date(); d.setDate(d.getDate() - 1); return toISO(d) },
  },
  {
    key: 'this_week',
    label: 'This week',
    from: () => toISO(startOfWeek(new Date())),
    to: () => toISO(new Date()),
  },
  {
    key: 'last_7',
    label: 'Last 7 days',
    from: () => { const d = new Date(); d.setDate(d.getDate() - 7); return toISO(d) },
    to: () => toISO(new Date()),
  },
  {
    key: 'this_month',
    label: 'This month',
    from: () => { const d = new Date(); return toISO(new Date(d.getFullYear(), d.getMonth(), 1)) },
    to: () => toISO(new Date()),
  },
  {
    key: 'all',
    label: 'All time',
    from: () => '',
    to: () => '',
  },
]

// Custom date range
const customDateFrom = ref('')
const customDateTo = ref('')
const showCustomDate = computed(() => filterDateRange.value === 'custom')

// --- Computed filters for API ---
const apiFilters = computed(() => {
  const f: Record<string, unknown> = {}

  // App (comma-separated for multi-select)
  if (filterApps.value.size > 0) f.app = Array.from(filterApps.value).join(',')

  // User
  if (filterUser.value === 'mine' && currentUser) f.user = currentUser

  // DocType (record type filter, comma-separated for multi-select)
  if (filterTypes.value.size > 0) f.doctype = Array.from(filterTypes.value).join(',')

  // Activity action type
  if (filterAction.value) f.activity_type = filterAction.value

  // Date range
  if (filterDateRange.value === 'custom') {
    if (customDateFrom.value) f.date_from = customDateFrom.value
    if (customDateTo.value) f.date_to = customDateTo.value
  } else {
    const preset = datePresets.find(p => p.key === filterDateRange.value)
    if (preset) {
      const from = preset.from()
      const to = preset.to()
      if (from) f.date_from = from
      if (to) f.date_to = to
    }
  }

  return f
})

// --- Active filter chips ---
interface ActiveChip {
  key: string
  label: string
  clear: () => void
}

const activeChips = computed<ActiveChip[]>(() => {
  const chips: ActiveChip[] = []
  for (const app of filterApps.value) {
    chips.push({ key: `app-${app}`, label: app, clear: () => { const s = new Set(filterApps.value); s.delete(app); filterApps.value = s } })
  }
  if (filterUser.value === 'mine') {
    chips.push({ key: 'user', label: __('My activity'), clear: () => { filterUser.value = 'all' } })
  }
  for (const dt of filterTypes.value) {
    const src = allSources.find(s => s.doctype === dt)
    chips.push({ key: `type-${dt}`, label: src?.label || dt, clear: () => { const s = new Set(filterTypes.value); s.delete(dt); filterTypes.value = s } })
  }
  if (filterAction.value) {
    const labels: Record<string, string> = { create: __('Created'), update: __('Updated') }
    chips.push({ key: 'action', label: labels[filterAction.value] || filterAction.value, clear: () => { filterAction.value = null } })
  }
  if (filterDateRange.value !== 'last_7') {
    const preset = datePresets.find(p => p.key === filterDateRange.value)
    const label = filterDateRange.value === 'custom'
      ? `${customDateFrom.value || '...'} — ${customDateTo.value || '...'}`
      : preset?.label || filterDateRange.value
    chips.push({ key: 'date', label, clear: () => { filterDateRange.value = 'last_7' } })
  }
  return chips
})

function clearAllFilters() {
  filterApps.value = new Set()
  filterUser.value = 'all'
  filterTypes.value = new Set()
  filterAction.value = null
  filterDateRange.value = 'last_7'
  customDateFrom.value = ''
  customDateTo.value = ''
}

// --- Dropdown visibility ---
const openDropdown = ref<string | null>(null)

function toggleDropdown(name: string) {
  openDropdown.value = openDropdown.value === name ? null : name
}

function closeDropdowns() {
  openDropdown.value = null
}

// --- Feed data ---
const { items, total, hasMore, loading, load, loadMore } = useActivityFeed()

// Reload when filters change
watch(apiFilters, () => {
  load(apiFilters.value)
}, { deep: true })

onMounted(() => {
  load(apiFilters.value)
  document.addEventListener('click', closeDropdowns)
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-xl font-semibold text-[var(--dock-text,theme(colors.gray.900))]">
        {{ __('Activity') }}
      </h1>
      <span v-if="total > 0" class="text-xs text-[var(--dock-icon,theme(colors.gray.400))]">
        {{ total }} {{ __('events') }}
      </span>
    </div>

    <!-- Filter bar -->
    <div class="flex flex-wrap items-center gap-2 mb-3" @click.stop>
      <!-- App filter (multi-select checkboxes) -->
      <div class="relative">
        <button
          class="dock-filter-btn"
          :class="{ 'dock-filter-btn--active': filterApps.size > 0 }"
          @click.stop="toggleDropdown('app')"
        >
          {{ appFilterLabel }}
          <svg class="w-3 h-3 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div v-if="openDropdown === 'app'" class="dock-filter-dropdown" @click.stop>
          <label
            class="dock-filter-option flex items-center gap-2 cursor-pointer"
            :class="{ 'dock-filter-option--active': filterApps.size === 0 }"
          >
            <input
              type="checkbox"
              :checked="filterApps.size === 0"
              class="w-3.5 h-3.5 accent-accent-600"
              @change="selectAllApps()"
            />
            {{ __('All apps') }}
          </label>
          <div class="border-t border-[var(--dock-border,theme(colors.gray.200))]" />
          <label
            v-for="a in availableApps" :key="a"
            class="dock-filter-option flex items-center gap-2 capitalize cursor-pointer"
            :class="{ 'dock-filter-option--active': filterApps.has(a) }"
          >
            <input
              type="checkbox"
              :checked="filterApps.has(a)"
              class="w-3.5 h-3.5 accent-accent-600"
              @change="toggleApp(a)"
            />
            {{ a }}
          </label>
        </div>
      </div>

      <!-- Date range filter -->
      <div class="relative">
        <button
          class="dock-filter-btn"
          :class="{ 'dock-filter-btn--active': filterDateRange !== 'last_7' }"
          @click.stop="toggleDropdown('date')"
        >
          {{ datePresets.find(p => p.key === filterDateRange)?.label || __('Custom') }}
          <svg class="w-3 h-3 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div v-if="openDropdown === 'date'" class="dock-filter-dropdown w-48">
          <button
            v-for="p in datePresets" :key="p.key"
            class="dock-filter-option"
            :class="{ 'dock-filter-option--active': filterDateRange === p.key }"
            @click="filterDateRange = p.key; if (p.key !== 'custom') closeDropdowns()"
          >{{ __(p.label) }}</button>
          <div class="border-t border-[var(--dock-border,theme(colors.gray.200))]">
            <button
              class="dock-filter-option"
              :class="{ 'dock-filter-option--active': filterDateRange === 'custom' }"
              @click="filterDateRange = 'custom'"
            >{{ __('Custom range') }}</button>
          </div>
          <div v-if="filterDateRange === 'custom'" class="px-2 pb-2 space-y-1.5">
            <input
              v-model="customDateFrom" type="date"
              class="w-full text-xs border border-[var(--dock-border,theme(colors.gray.200))] rounded px-2 py-1 bg-transparent text-[var(--dock-text,theme(colors.gray.900))]"
              :placeholder="__('From')"
            />
            <input
              v-model="customDateTo" type="date"
              class="w-full text-xs border border-[var(--dock-border,theme(colors.gray.200))] rounded px-2 py-1 bg-transparent text-[var(--dock-text,theme(colors.gray.900))]"
              :placeholder="__('To')"
            />
            <button class="w-full text-xs text-[var(--dock-accent,theme(colors.blue.600))] py-1" @click="closeDropdowns()">
              {{ __('Apply') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Action type filter -->
      <div class="relative">
        <button
          class="dock-filter-btn"
          :class="{ 'dock-filter-btn--active': filterAction }"
          @click.stop="toggleDropdown('action')"
        >
          {{ filterAction ? { create: __('Created'), update: __('Updated') }[filterAction] : __('All actions') }}
          <svg class="w-3 h-3 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div v-if="openDropdown === 'action'" class="dock-filter-dropdown">
          <button class="dock-filter-option" :class="{ 'dock-filter-option--active': !filterAction }" @click="filterAction = null; closeDropdowns()">
            {{ __('All actions') }}
          </button>
          <button class="dock-filter-option" :class="{ 'dock-filter-option--active': filterAction === 'create' }" @click="filterAction = 'create'; closeDropdowns()">
            {{ __('Created') }}
          </button>
          <button class="dock-filter-option" :class="{ 'dock-filter-option--active': filterAction === 'update' }" @click="filterAction = 'update'; closeDropdowns()">
            {{ __('Updated') }}
          </button>
        </div>
      </div>

      <!-- User scope filter -->
      <div class="relative">
        <button
          class="dock-filter-btn"
          :class="{ 'dock-filter-btn--active': filterUser === 'mine' }"
          @click.stop="toggleDropdown('user')"
        >
          {{ filterUser === 'mine' ? __('My activity') : __('Everyone') }}
          <svg class="w-3 h-3 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div v-if="openDropdown === 'user'" class="dock-filter-dropdown">
          <button class="dock-filter-option" :class="{ 'dock-filter-option--active': filterUser === 'all' }" @click="filterUser = 'all'; closeDropdowns()">
            {{ __('Everyone') }}
          </button>
          <button class="dock-filter-option" :class="{ 'dock-filter-option--active': filterUser === 'mine' }" @click="filterUser = 'mine'; closeDropdowns()">
            {{ __('My activity') }}
          </button>
        </div>
      </div>

      <!-- Record type filter (multi-select checkboxes) -->
      <div v-if="availableTypes.length > 1" class="relative">
        <button
          class="dock-filter-btn"
          :class="{ 'dock-filter-btn--active': filterTypes.size > 0 }"
          @click.stop="toggleDropdown('recordType')"
        >
          {{ typeFilterLabel }}
          <svg class="w-3 h-3 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div v-if="openDropdown === 'recordType'" class="dock-filter-dropdown" @click.stop>
          <label
            class="dock-filter-option flex items-center gap-2 cursor-pointer"
            :class="{ 'dock-filter-option--active': filterTypes.size === 0 }"
          >
            <input
              type="checkbox"
              :checked="filterTypes.size === 0"
              class="w-3.5 h-3.5 accent-accent-600"
              @change="selectAllTypes()"
            />
            {{ __('All types') }}
          </label>
          <div class="border-t border-[var(--dock-border,theme(colors.gray.200))]" />
          <label
            v-for="t in availableTypes" :key="t.doctype"
            class="dock-filter-option flex items-center gap-2 cursor-pointer"
            :class="{ 'dock-filter-option--active': filterTypes.has(t.doctype) }"
          >
            <input
              type="checkbox"
              :checked="filterTypes.has(t.doctype)"
              class="w-3.5 h-3.5 accent-accent-600"
              @change="toggleType(t.doctype)"
            />
            {{ __(t.label) }}
          </label>
        </div>
      </div>
    </div>

    <!-- Active filter chips -->
    <div v-if="activeChips.length" class="flex flex-wrap items-center gap-1.5 mb-4">
      <span
        v-for="chip in activeChips" :key="chip.key"
        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--dock-accent,theme(colors.blue.600))]/10 text-[var(--dock-accent,theme(colors.blue.600))]"
      >
        {{ chip.label }}
        <button class="hover:opacity-70" @click="chip.clear()">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </span>
      <button
        class="text-xs text-[var(--dock-icon,theme(colors.gray.400))] hover:text-[var(--dock-text,theme(colors.gray.900))]"
        @click="clearAllFilters"
      >{{ __('Clear all') }}</button>
    </div>

    <!-- Feed -->
    <DockActivityFeed
      :filters="apiFilters"
      :items="items"
      :total="total"
      :has-more="hasMore"
      :loading="loading"
      @load-more="loadMore(apiFilters)"
    />
  </div>
</template>

<style scoped>
.dock-filter-btn {
  @apply inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer;
  color: var(--dock-text, theme(colors.gray.700));
  border: 1px solid var(--dock-border, theme(colors.gray.200));
  background: transparent;
}
.dock-filter-btn:hover {
  background: rgb(0 0 0 / 0.04);
}
:is(.dark) .dock-filter-btn:hover {
  background: rgb(255 255 255 / 0.06);
}
.dock-filter-btn--active {
  background: var(--dock-accent, theme(colors.blue.600)) !important;
  color: white !important;
  border-color: var(--dock-accent, theme(colors.blue.600)) !important;
}

.dock-filter-dropdown {
  @apply absolute left-0 top-full mt-1 z-50 min-w-[10rem] rounded-lg shadow-lg overflow-hidden py-1;
  background: var(--dock-bg, theme(colors.white));
  border: 1px solid var(--dock-border, theme(colors.gray.200));
}

.dock-filter-option {
  @apply w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer;
  color: var(--dock-text, theme(colors.gray.700));
}
.dock-filter-option:hover {
  background: rgb(0 0 0 / 0.04);
}
:is(.dark) .dock-filter-option:hover {
  background: rgb(255 255 255 / 0.06);
}
.dock-filter-option--active {
  color: var(--dock-accent, theme(colors.blue.600));
  font-weight: 600;
}
</style>
