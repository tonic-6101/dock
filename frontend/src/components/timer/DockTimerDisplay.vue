<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Large centered elapsed time display with status dot.
  Used in the timer panel for running/paused states.
-->
<script lang="ts">
export default { name: 'DockTimerDisplay' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useDockTimer } from '@/composables/useDockTimer'
import { __ } from '@/composables/useTranslate'

const { displayTime, displaySeconds, timerState, isRunning, isPaused, appColor } = useDockTimer()

// Focus countdown: show remaining time in work phase
const focusCountdown = computed(() => {
  if (!timerState.value.focus_mode || timerState.value.focus_phase !== 'work') return null
  const workSeconds = (timerState.value.focus_work_minutes ?? 25) * 60
  const remaining = Math.max(0, workSeconds - displaySeconds.value)
  const m = Math.floor(remaining / 60)
  const s = remaining % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

const isFocusMode = computed(() => timerState.value.focus_mode === true)
</script>

<template>
  <div class="dock-timer-display">
    <!-- Status indicator -->
    <span
      v-if="isRunning"
      class="dock-timer-dot dock-timer-dot--running"
      :style="{ backgroundColor: isFocusMode ? '#ef4444' : (appColor ?? '#22c55e') }"
    />
    <span v-else-if="isPaused" class="dock-timer-dot dock-timer-dot--paused" />
    <span v-else class="dock-timer-dot dock-timer-dot--stopped" />

    <!-- Elapsed time (or countdown in focus mode) -->
    <span
      aria-live="polite"
      class="dock-timer-time"
      :class="{
        'dock-timer-time--running': isRunning && !isFocusMode,
        'dock-timer-time--focus': isRunning && isFocusMode,
        'dock-timer-time--paused': isPaused,
        'dock-timer-time--stopped': !isRunning && !isPaused,
      }"
    >{{ focusCountdown ?? displayTime }}</span>

    <span v-if="isPaused" class="dock-timer-paused-label">({{ __('paused') }})</span>
  </div>
</template>

<style scoped>
.dock-timer-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.25rem 1rem;
}

.dock-timer-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  flex-shrink: 0;
}

.dock-timer-dot--running {
  background-color: #22c55e;
  animation: dock-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.dock-timer-dot--paused {
  background-color: #f59e0b;
}

.dock-timer-dot--stopped {
  background-color: var(--dock-icon);
  opacity: 0.4;
}

@keyframes dock-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.dock-timer-time {
  font-size: 1.5rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: 0.025em;
}

.dock-timer-time--running {
  color: #16a34a;
}
:root.dark .dock-timer-time--running {
  color: #4ade80;
}

.dock-timer-time--focus {
  color: #dc2626;
}
:root.dark .dock-timer-time--focus {
  color: #f87171;
}

.dock-timer-time--paused {
  color: #d97706;
}
:root.dark .dock-timer-time--paused {
  color: #fbbf24;
}

.dock-timer-time--stopped {
  color: var(--dock-icon);
}

.dock-timer-paused-label {
  font-size: 0.75rem;
  color: var(--dock-icon);
}

@media (prefers-reduced-motion: reduce) {
  .dock-timer-dot--running {
    animation: none;
  }
}
</style>
