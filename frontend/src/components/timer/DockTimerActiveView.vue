<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockTimerActiveView' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { __ } from '@/composables/useTranslate'
import type { TimerState } from '@/composables/useDockTimer'

const props = defineProps<{ state: TimerState; display: string; loading?: boolean }>()
const emit  = defineEmits<{ pause: []; resume: []; stop: []; edit: [] }>()

const contextLine = computed(() => {
  const parts: string[] = []
  if (props.state.contact_name) parts.push(props.state.contact_name)
  if (props.state.context_display) parts.push(props.state.context_display)
  return parts.join(' · ')
})
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

    <!-- Description -->
    <div v-if="state.context_label" class="text-xs text-[var(--dock-text)] truncate">
      {{ state.context_label }}
    </div>

    <!-- Contact · Context -->
    <div v-if="contextLine" class="text-xs text-[var(--dock-icon)] truncate">
      {{ contextLine }}
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2 pt-1">
      <button
        v-if="state.state === 'running'"
        class="dock-timer-btn flex-1"
        :disabled="loading"
        @click="emit('pause')"
      >⏸ {{ __('Pause') }}</button>
      <button
        v-else
        class="dock-timer-btn dock-timer-btn--accent flex-1"
        :disabled="loading"
        @click="emit('resume')"
      >▶ {{ __('Resume') }}</button>
      <button
        class="dock-timer-btn"
        :disabled="loading"
        @click="emit('stop')"
      >⏹ {{ __('Stop') }}</button>
      <button
        class="dock-timer-btn dock-timer-btn--icon"
        @click="emit('edit')"
      >✎</button>
    </div>
  </div>
</template>

<style scoped>
.dock-timer-btn {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid var(--dock-border);
  color: var(--dock-text);
  background: transparent;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.dock-timer-btn:hover {
  background: color-mix(in srgb, var(--dock-text) 8%, transparent);
}
.dock-timer-btn:disabled {
  opacity: 0.5;
  cursor: default;
}
.dock-timer-btn--accent {
  border-color: var(--dock-accent);
  color: var(--dock-accent);
}
.dock-timer-btn--accent:hover {
  background: color-mix(in srgb, var(--dock-accent) 10%, transparent);
}
.dock-timer-btn--icon {
  border: none;
  padding: 0.375rem 0.5rem;
  color: var(--dock-icon);
}
.dock-timer-btn--icon:hover {
  color: var(--dock-text);
}
</style>
