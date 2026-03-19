<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Inline search dropdown — appears below the navbar search input.
  Matches the Orga SearchDropdown pattern: grouped sections with icons,
  keyboard navigation, status-colored text.
  Desktop only — mobile uses the full DockSearchModal.
-->
<script lang="ts">
export default { name: 'DockSearchDropdown' }
</script>

<script setup lang="ts">
import { __ } from '@/composables/useTranslate'
import { highlightMatch } from '@/utils/highlightMatch'
import type { SearchResult } from './DockSearchResultRow.vue'

const props = defineProps<{
  results: SearchResult[]
  loading: boolean
  activeIndex: number
  groupedResults: { label: string; app: string; items: SearchResult[] }[]
  showAppBadge: boolean
  appColorMap: Record<string, string>
  appLabelMap: Record<string, string>
  query: string
  hasSearched: boolean
}>()

const emit = defineEmits<{
  (e: 'select', item: SearchResult): void
}>()

// SVG path icons keyed by common section labels
const sectionIcons: Record<string, string> = {
  Projects:   'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
  Tasks:      'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  People:     'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  Contacts:   'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  Milestones: 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9',
  Events:     'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  Calendar:   'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  Files:      'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  Notes:      'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  Invoices:   'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z',
  Timers:     'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
}

const defaultIcon = 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'

function getIconPath(label: string): string {
  return sectionIcons[label] ?? defaultIcon
}

function getFlatIndex(sectionLabel: string, app: string, itemIndex: number): number {
  let offset = 0
  for (const section of props.groupedResults) {
    if (section.label === sectionLabel && section.app === app) return offset + itemIndex
    offset += section.items.length
  }
  return -1
}

function statusColor(status: string): string {
  const s = status?.toLowerCase() || ''
  if (['active', 'completed', 'accepted', 'open', 'confirmed'].includes(s))
    return 'text-green-600 dark:text-green-400'
  if (['planning', 'upcoming', 'pending', 'working', 'in progress', 'ongoing'].includes(s))
    return 'text-blue-600 dark:text-blue-400'
  if (['on hold', 'tentative', 'missed', 'paused', 'overdue', 'at risk'].includes(s))
    return 'text-yellow-600 dark:text-yellow-400'
  if (['cancelled', 'inactive', 'declined', 'closed', 'rejected'].includes(s))
    return 'text-red-600 dark:text-red-400'
  return 'text-gray-500 dark:text-gray-400'
}
</script>

<template>
  <div
    class="absolute top-full left-0 right-0 mt-1
           bg-white dark:bg-gray-800
           border border-gray-200 dark:border-gray-600
           rounded-lg shadow-lg max-h-96 overflow-y-auto z-50"
  >
    <!-- Loading -->
    <div
      v-if="loading && !results.length"
      class="flex items-center justify-center py-6 text-sm text-gray-500 dark:text-gray-400"
    >
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      {{ __('Searching...') }}
    </div>

    <!-- No results -->
    <div
      v-else-if="hasSearched && results.length === 0 && !loading"
      class="py-6 text-center text-sm text-gray-500 dark:text-gray-400"
    >
      {{ __('No results found') }}
    </div>

    <!-- Grouped results -->
    <template v-else>
      <template v-for="section in groupedResults" :key="`${section.app}:${section.label}`">
        <div v-if="section.items.length > 0">
          <!-- Section header (sticky, with icon) -->
          <div
            class="px-3 py-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500
                   uppercase tracking-wider
                   bg-gray-50 dark:bg-gray-700/50 sticky top-0"
          >
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="getIconPath(section.label)"
                />
              </svg>
              {{ __(section.label) }}
              <span
                v-if="showAppBadge"
                class="ml-1 text-[10px] font-normal normal-case text-gray-400/60 dark:text-gray-500/60"
              >{{ appLabelMap[section.app] || section.app }}</span>
            </div>
          </div>

          <!-- Items -->
          <button
            v-for="(item, idx) in section.items"
            :key="item.name"
            :id="`search-dd-item-${item.name}`"
            class="w-full px-3 py-2 flex items-center gap-3 text-left text-sm transition-colors"
            :class="getFlatIndex(section.label, section.app, idx) === activeIndex
              ? 'bg-[var(--dock-accent)]/5 text-[var(--dock-accent)] dark:text-[var(--dock-accent)]'
              : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'"
            @click="emit('select', item)"
          >
            <div class="flex-1 min-w-0">
              <div class="truncate font-medium" v-html="highlightMatch(item.label, query)" />
              <div
                v-if="item.description"
                class="truncate text-xs text-gray-400 dark:text-gray-500"
              >{{ item.description }}</div>
            </div>

            <span
              v-if="item.status"
              class="text-xs font-medium shrink-0"
              :class="statusColor(item.status)"
            >{{ item.status }}</span>
          </button>
        </div>
      </template>
    </template>
  </div>
</template>
