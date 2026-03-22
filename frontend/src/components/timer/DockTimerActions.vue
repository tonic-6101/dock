<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Pause/Resume + Stop buttons for the timer panel.
-->
<script lang="ts">
export default { name: 'DockTimerActions' }
</script>

<script setup lang="ts">
import { __ } from '@/composables/useTranslate'
import { useDockTimer } from '@/composables/useDockTimer'

const { isRunning, isPaused, loading, pause, resume } = useDockTimer()

const emit = defineEmits<{ stop: [] }>()
</script>

<template>
  <div class="dock-timer-actions">
    <button
      v-if="isRunning"
      class="dock-timer-btn"
      :disabled="loading"
      @click="pause()"
    >⏸ {{ __('Pause') }}</button>
    <button
      v-else-if="isPaused"
      class="dock-timer-btn dock-timer-btn--accent"
      :disabled="loading"
      @click="resume()"
    >▶ {{ __('Resume') }}</button>
    <button
      class="dock-timer-btn dock-timer-btn--stop"
      :disabled="loading"
      @click="emit('stop')"
    >⏹ {{ __('Stop') }}</button>
  </div>
</template>

<style scoped>
.dock-timer-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--dock-border);
}

.dock-timer-btn {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid var(--dock-border);
  color: var(--dock-text);
  background: transparent;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  text-align: center;
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
.dock-timer-btn--stop {
  border-color: #ef4444;
  color: #ef4444;
}
.dock-timer-btn--stop:hover {
  background: color-mix(in srgb, #ef4444 8%, transparent);
}
</style>
