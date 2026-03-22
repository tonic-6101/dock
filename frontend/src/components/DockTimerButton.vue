<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Top bar timer button.

  - Stopped: Click → starts timer + opens panel. Long-press (500ms) → opens panel in idle view (Focus option).
  - Running: Pulsing dot + elapsed time → toggles timer panel
  - Paused: Pause icon + elapsed time → toggles timer panel

  This replaces the old DockTimer.vue which owned both the button and the popover.
  State is now in useDockTimer composable; panel rendering is in DockTimerPanel.
-->
<script lang="ts">
export default { name: 'DockTimerButton' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Play, Pause } from 'lucide-vue-next'
import { useDockTimer } from '@/composables/useDockTimer'
import { useDockPanels } from '@/composables/useDockPanels'
import { useDockBoot } from '@/composables/useDockBoot'

const { settings } = useDockBoot()
const {
  timerAvailable, timerState, displayTime,
  isRunning, isPaused, isStopped, isStale,
  appColor, ariaLabel,
  start,
} = useDockTimer()
const { togglePanel, openPanel } = useDockPanels()

const enabled = timerAvailable.value && settings.value?.enable_global_timer === true

// Long-press detection: hold 500ms on stopped → open panel (idle view with Focus option)
const LONG_PRESS_MS = 500
let pressTimer: ReturnType<typeof setTimeout> | null = null
let longPressed = false

function onPointerDown() {
  if (!isStopped.value) return
  longPressed = false
  pressTimer = setTimeout(() => {
    longPressed = true
    openPanel('timer')
  }, LONG_PRESS_MS)
}

function onPointerUp() {
  if (pressTimer) { clearTimeout(pressTimer); pressTimer = null }
}

function onPointerCancel() {
  if (pressTimer) { clearTimeout(pressTimer); pressTimer = null }
}

async function onClick() {
  if (longPressed) {
    // Already handled by long-press — reset and skip
    longPressed = false
    return
  }
  if (isStopped.value) {
    // Quick tap: start timer immediately, then open panel
    await start()
    openPanel('timer')
  } else {
    // Running or paused — toggle the detail panel
    togglePanel('timer')
  }
}
</script>

<template>
  <button
    v-if="enabled"
    data-dock-panel-trigger
    class="dock-timer-btn flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors text-sm font-mono
           hover:bg-black/5 dark:hover:bg-white/10"
    :class="{
      'text-amber-600 dark:text-amber-400': isPaused || isStale,
      'text-[var(--dock-icon)]':            isStopped,
    }"
    :style="isRunning && !isStale && appColor ? { color: appColor } : undefined"
    :aria-label="ariaLabel"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
    @pointerleave="onPointerCancel"
    @click="onClick"
  >
    <!-- Running: colored dot + time -->
    <template v-if="isRunning">
      <span
        class="w-2 h-2 rounded-full animate-pulse"
        :style="{ backgroundColor: isStale ? '#d97706' : (appColor ?? 'currentColor') }"
      />
      <span aria-live="polite">{{ displayTime }}</span>
    </template>
    <!-- Paused: pause icon + time -->
    <template v-else-if="isPaused">
      <Pause class="w-3.5 h-3.5" />
      <span aria-live="polite">{{ displayTime }}</span>
    </template>
    <!-- Stopped: play icon only -->
    <Play v-else class="w-4 h-4" />
  </button>
</template>
