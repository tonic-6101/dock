<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Full-width banner shown below the top bar when the timer has been running > 4 hours.
  Sibling of <DockTimer />, not a child — rendered from <DockNavbar /> context.
-->
<script lang="ts">
export default { name: 'DockTimerStaleWarning' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'

const STALE_THRESHOLD_SECONDS = 4 * 3600

const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot
const timerState = boot?.timer_state

const dismissed = ref(false)
const visible = ref(false)

function actualElapsedSeconds(): number {
  if (!timerState) return 0
  const base = timerState.elapsed_seconds ?? 0
  if (timerState.state === 'running' && timerState.started_at) {
    return base + Math.floor((Date.now() - new Date(timerState.started_at).getTime()) / 1000)
  }
  return base
}

onMounted(() => {
  if (timerState?.state === 'running' && actualElapsedSeconds() > STALE_THRESHOLD_SECONDS) {
    visible.value = true
  }
})

const elapsed = computed(() => {
  const s = actualElapsedSeconds()
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return h > 0 ? `${h}h ${m}m` : `${m}m`
})

async function stopAndSave() {
  try { await callApi('dock.api.timer.stop') }
  catch { /* silent */ }
  visible.value = false
}

function keepRunning() {
  dismissed.value = true
  visible.value = false
}
</script>

<template>
  <div
    v-if="visible && !dismissed"
    class="w-full flex items-center justify-between gap-4 px-4 py-2
           bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-700
           text-sm text-amber-800 dark:text-amber-300"
  >
    <span>⚠ {{ __('Your timer has been running for {0}').replace('{0}', elapsed) }}</span>
    <div class="flex items-center gap-3 shrink-0">
      <button
        class="font-medium underline hover:no-underline"
        @click="stopAndSave"
      >{{ __('Stop & Save') }}</button>
      <button
        class="hover:underline"
        @click="keepRunning"
      >{{ __('Keep running') }}</button>
    </div>
  </div>
</template>
