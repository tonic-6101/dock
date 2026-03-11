<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockTimerActiveView' }
</script>

<script setup lang="ts">
import { __ } from '@/composables/useTranslate'

interface TimerState {
  state: 'running' | 'paused'
  elapsed_seconds: number
  context_label?: string
  context_doctype?: string
  context_name?: string
}

const props = defineProps<{ state: TimerState; display: string; loading?: boolean }>()
const emit  = defineEmits<{ pause: []; resume: []; stop: []; edit: [] }>()
</script>

<template>
  <div class="p-3 space-y-2">
    <!-- Elapsed -->
    <div class="flex items-center gap-2">
      <span
        class="w-2 h-2 rounded-full shrink-0"
        :class="state.state === 'running' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'"
      />
      <span
        aria-live="polite"
        class="text-sm font-mono font-semibold"
        :class="state.state === 'running' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'"
      >{{ display }}</span>
      <span v-if="state.state === 'paused'" class="text-xs text-[var(--dock-icon)]">({{ __('paused') }})</span>
    </div>

    <!-- Context -->
    <div v-if="state.context_label" class="text-xs text-[var(--dock-text)] truncate">
      {{ state.context_label }}
      <span v-if="state.context_doctype" class="text-[var(--dock-icon)]"> · {{ state.context_doctype }}</span>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2 pt-1">
      <button
        v-if="state.state === 'running'"
        class="flex-1 px-3 py-1.5 rounded-md bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50"
        :disabled="loading"
        @click="emit('pause')"
      >⏸ {{ __('Pause') }}</button>
      <button
        v-else
        class="flex-1 px-3 py-1.5 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
        :disabled="loading"
        @click="emit('resume')"
      >▶ {{ __('Resume') }}</button>
      <button
        class="px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
        :disabled="loading"
        @click="emit('stop')"
      >⏹ {{ __('Stop') }}</button>
      <button
        class="px-2 py-1.5 rounded-md text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10"
        @click="emit('edit')"
      >✎</button>
    </div>
  </div>
</template>
