<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Semantic status badge for search results.
  Color-coded by status group — consistent across all apps.
  See ecosystem spec: search.md §8
-->
<script lang="ts">
export default { name: 'DockStatusBadge' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { __ } from '@/composables/useTranslate'

const props = defineProps<{
  status: string
  category?: string
}>()

type BadgeColor = { light: string; dark: string }

const STATUS_GROUPS: Record<string, BadgeColor> = {
  active:       { light: 'bg-emerald-50 text-emerald-700', dark: 'dark:bg-emerald-900/30 dark:text-emerald-400' },
  completed:    { light: 'bg-emerald-50 text-emerald-700', dark: 'dark:bg-emerald-900/30 dark:text-emerald-400' },
  open:         { light: 'bg-emerald-50 text-emerald-700', dark: 'dark:bg-emerald-900/30 dark:text-emerald-400' },
  confirmed:    { light: 'bg-emerald-50 text-emerald-700', dark: 'dark:bg-emerald-900/30 dark:text-emerald-400' },
  accepted:     { light: 'bg-emerald-50 text-emerald-700', dark: 'dark:bg-emerald-900/30 dark:text-emerald-400' },

  'in progress': { light: 'bg-blue-50 text-blue-700', dark: 'dark:bg-blue-900/30 dark:text-blue-400' },
  working:       { light: 'bg-blue-50 text-blue-700', dark: 'dark:bg-blue-900/30 dark:text-blue-400' },
  ongoing:       { light: 'bg-blue-50 text-blue-700', dark: 'dark:bg-blue-900/30 dark:text-blue-400' },
  pending:       { light: 'bg-blue-50 text-blue-700', dark: 'dark:bg-blue-900/30 dark:text-blue-400' },

  planning:   { light: 'bg-violet-50 text-violet-700', dark: 'dark:bg-violet-900/30 dark:text-violet-400' },
  draft:      { light: 'bg-violet-50 text-violet-700', dark: 'dark:bg-violet-900/30 dark:text-violet-400' },
  tentative:  { light: 'bg-violet-50 text-violet-700', dark: 'dark:bg-violet-900/30 dark:text-violet-400' },
  scheduled:  { light: 'bg-violet-50 text-violet-700', dark: 'dark:bg-violet-900/30 dark:text-violet-400' },

  'on hold':  { light: 'bg-amber-50 text-amber-700', dark: 'dark:bg-amber-900/30 dark:text-amber-400' },
  paused:     { light: 'bg-amber-50 text-amber-700', dark: 'dark:bg-amber-900/30 dark:text-amber-400' },
  overdue:    { light: 'bg-amber-50 text-amber-700', dark: 'dark:bg-amber-900/30 dark:text-amber-400' },
  'at risk':  { light: 'bg-amber-50 text-amber-700', dark: 'dark:bg-amber-900/30 dark:text-amber-400' },

  cancelled: { light: 'bg-red-50 text-red-700', dark: 'dark:bg-red-900/30 dark:text-red-400' },
  closed:    { light: 'bg-red-50 text-red-700', dark: 'dark:bg-red-900/30 dark:text-red-400' },
  declined:  { light: 'bg-red-50 text-red-700', dark: 'dark:bg-red-900/30 dark:text-red-400' },
  rejected:  { light: 'bg-red-50 text-red-700', dark: 'dark:bg-red-900/30 dark:text-red-400' },
}

const PRIORITY_COLORS: Record<string, BadgeColor> = {
  urgent: { light: 'bg-red-50 text-red-700', dark: 'dark:bg-red-900/30 dark:text-red-400' },
  high:   { light: 'bg-orange-50 text-orange-700', dark: 'dark:bg-orange-900/30 dark:text-orange-400' },
  medium: { light: 'bg-yellow-50 text-yellow-700', dark: 'dark:bg-yellow-900/30 dark:text-yellow-400' },
  low:    { light: 'bg-gray-100 text-gray-600', dark: 'dark:bg-gray-800 dark:text-gray-400' },
}

const NEUTRAL: BadgeColor = {
  light: 'bg-gray-100 text-gray-600',
  dark: 'dark:bg-gray-800 dark:text-gray-400',
}

const badgeClasses = computed(() => {
  const key = props.status.toLowerCase()

  // Priority badges for task categories
  if (props.category === 'task' && PRIORITY_COLORS[key]) {
    const c = PRIORITY_COLORS[key]
    return `${c.light} ${c.dark}`
  }

  const c = STATUS_GROUPS[key] ?? NEUTRAL
  return `${c.light} ${c.dark}`
})
</script>

<template>
  <span
    class="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium
           rounded-full leading-none whitespace-nowrap"
    :class="badgeClasses"
  >{{ __(status) }}</span>
</template>
