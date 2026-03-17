<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Loading skeleton for search results.
  See ecosystem spec: search.md §9.2
-->
<script lang="ts">
export default { name: 'DockSearchLoading' }
</script>

<script setup lang="ts">
import { __ } from '@/composables/useTranslate'
</script>

<template>
  <div class="py-4 px-4">
    <div class="flex items-center justify-center gap-2 mb-3">
      <div class="w-4 h-4 border-2 border-[var(--dock-icon)]/30 border-t-[var(--dock-accent)]
                  rounded-full animate-spin" />
      <span class="text-sm text-[var(--dock-icon)]">{{ __('Searching...') }}</span>
    </div>
    <div class="space-y-2">
      <div v-for="i in 4" :key="i" class="flex gap-3 items-center animate-pulse">
        <div class="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10 shrink-0" />
        <div class="flex-1 h-3 rounded bg-black/10 dark:bg-white/10" :style="{ width: `${60 + i * 8}%` }" />
        <div class="w-12 h-2.5 rounded bg-black/10 dark:bg-white/10 shrink-0" />
      </div>
    </div>
  </div>
</template>
