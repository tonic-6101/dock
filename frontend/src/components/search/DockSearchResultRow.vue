<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockSearchResultRow' }
</script>

<script setup lang="ts">
interface SearchResult {
  label: string; route: string; app: string; section: string; doctype: string; name: string
}

defineProps<{
  result: SearchResult
  appColor?: string
  focused: boolean
}>()
defineEmits<{ navigate: [result: SearchResult] }>()
</script>

<template>
  <div
    role="option"
    :aria-selected="focused"
    class="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors"
    :class="focused ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'"
    @click="$emit('navigate', result)"
  >
    <div
      class="w-2 h-2 rounded-full shrink-0"
      :style="{ backgroundColor: appColor ?? 'var(--dock-icon)' }"
    />
    <span class="flex-1 text-sm text-[var(--dock-text)] truncate">{{ result.label }}</span>
    <span class="text-xs text-[var(--dock-icon)] shrink-0">{{ result.section }}</span>
  </div>
</template>
