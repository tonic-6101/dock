<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Error state when search API fails.
  See ecosystem spec: search.md §9.4
-->
<script lang="ts">
export default { name: 'DockSearchError' }
</script>

<script setup lang="ts">
import { TriangleAlert } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'

defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="flex items-center gap-2 px-4 py-3
              text-sm text-amber-600 dark:text-amber-400
              bg-amber-50 dark:bg-amber-900/20">
    <TriangleAlert class="w-4 h-4 shrink-0" aria-hidden="true" />
    <span>{{ __('Search is temporarily unavailable') }}</span>
    <button
      class="ml-auto text-amber-700 dark:text-amber-300 underline hover:no-underline"
      @click="$emit('retry')"
    >{{ __('Try again') }}</button>
  </div>
</template>
