<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Single search result item with consistent anatomy:
  [Icon]  Label (highlighted)  [App Badge]  [Meta]  [StatusBadge]
          Description (secondary)
  See ecosystem spec: search.md §6
-->
<script lang="ts">
export default { name: 'DockSearchResultRow' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { highlightMatch } from '@/utils/highlightMatch'
import DockStatusBadge from './DockStatusBadge.vue'

export interface SearchResult {
  name: string
  label: string
  route: string
  app: string
  section: string
  doctype: string
  description?: string
  status?: string
  meta?: string
  category?: string
}

const props = defineProps<{
  result: SearchResult
  query: string
  appColor?: string
  appLabel?: string
  focused: boolean
  showAppBadge?: boolean
}>()

defineEmits<{
  navigate: [result: SearchResult]
  activate: [index: number]
}>()

const highlightedLabel = computed(() =>
  highlightMatch(props.result.label, props.query),
)
</script>

<template>
  <div
    :id="`search-item-${result.name}`"
    role="option"
    :aria-selected="focused"
    class="flex items-start gap-3 px-4 py-2.5 cursor-pointer transition-colors"
    :class="focused
      ? 'bg-[var(--dock-accent)]/10'
      : 'hover:bg-black/5 dark:hover:bg-white/5'"
    @click="$emit('navigate', result)"
    @mouseenter="$emit('activate', 0)"
  >
    <!-- Category color dot -->
    <div
      class="w-2 h-2 mt-1.5 rounded-full shrink-0"
      :style="{ backgroundColor: appColor ?? 'var(--dock-icon)' }"
    />

    <!-- Text content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <!-- Label with match highlighting -->
        <span
          class="text-sm font-medium truncate"
          :class="focused
            ? 'text-[var(--dock-text)]'
            : 'text-[var(--dock-text)]'"
          v-html="highlightedLabel"
        />
        <!-- App badge (cross-app mode) -->
        <span
          v-if="showAppBadge && appLabel"
          class="shrink-0 px-1.5 py-0.5 text-[10px] font-medium rounded-full
                 bg-black/5 dark:bg-white/10 text-[var(--dock-icon)]"
        >{{ appLabel }}</span>
      </div>
      <!-- Description (secondary line) -->
      <span
        v-if="result.description"
        class="text-xs text-[var(--dock-icon)] truncate block"
      >{{ result.description }}</span>
    </div>

    <!-- Meta (tertiary) -->
    <span
      v-if="result.meta"
      class="shrink-0 text-xs text-[var(--dock-icon)] mt-0.5"
    >{{ result.meta }}</span>

    <!-- Status badge -->
    <DockStatusBadge
      v-if="result.status"
      :status="result.status"
      :category="result.category"
      class="shrink-0 mt-0.5"
    />

    <!-- Section label (fallback when no status/meta) -->
    <span
      v-if="!result.status && !result.meta"
      class="text-xs text-[var(--dock-icon)] shrink-0"
    >{{ result.section }}</span>
  </div>
</template>
