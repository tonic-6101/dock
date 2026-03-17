<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Empty state when search returns no results.
  See ecosystem spec: search.md §9.3
-->
<script lang="ts">
export default { name: 'DockSearchEmpty' }
</script>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'

const props = defineProps<{ query: string; scopedApp?: string | null }>()
const emit  = defineEmits<{ clearScope: [] }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-8 px-4 text-center">
    <Search class="w-8 h-8 text-[var(--dock-icon)]/40 mb-3" aria-hidden="true" />
    <p class="text-sm font-medium text-[var(--dock-icon)]">
      {{ __('No results found') }}
    </p>
    <p class="text-xs text-[var(--dock-icon)]/70 mt-1">
      {{ __('Try a different search term') }}
    </p>
    <button
      v-if="scopedApp"
      class="mt-3 text-sm text-[var(--dock-accent)] hover:underline"
      @click="emit('clearScope')"
    >{{ __('Search in All apps') }}</button>
  </div>
</template>
