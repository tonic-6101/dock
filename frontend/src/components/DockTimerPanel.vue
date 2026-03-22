<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Timer contextual panel — replaces the v0.1.0 popover.

  Renders inside DockLayout using DockPanelShell.
  Orchestrates sub-views: running/paused, stop form, confirmation, idle (start form).
  Includes today's entries summary at the bottom.
-->
<script lang="ts">
export default { name: 'DockTimerPanel' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useDockTimer } from '@/composables/useDockTimer'
import { useDockPanels } from '@/composables/useDockPanels'
import DockPanelShell from './DockPanelShell.vue'
import DockTimerDisplay from './timer/DockTimerDisplay.vue'
import DockTimerEntryForm from './timer/DockTimerEntryForm.vue'
import DockTimerActions from './timer/DockTimerActions.vue'
import DockTimerStopForm from './timer/DockTimerStopForm.vue'
import DockTimerConfirmation from './timer/DockTimerConfirmation.vue'
import DockTimerDailySummary from './timer/DockTimerDailySummary.vue'
import DockTimerStartForm from './timer/DockTimerStartForm.vue'
import DockTimerError from './timer/DockTimerError.vue'

const {
  timerState, isActive, isStopped, isStale,
  displayDuration,
  hasError, loading, stoppedEntry,
  start, stop, startFocus, clearError, clearStoppedEntry,
} = useDockTimer()
const { closePanel } = useDockPanels()

const staleWarningStyle = {
  padding: '0.5rem 1rem',
  fontSize: '0.8125rem',
  color: '#92400e',
  background: '#fffbeb',
  borderBottom: '1px solid #fde68a',
}

const focusIndicatorStyle = {
  padding: '0.5rem 1rem',
  fontSize: '0.8125rem',
  color: '#991b1b',
  background: '#fef2f2',
  borderBottom: '1px solid #fecaca',
}

// Panel sub-view state
type PanelView = 'active' | 'stopping' | 'confirmation' | 'idle'
const panelView = ref<PanelView>(isStopped.value ? 'idle' : 'active')

// Sync panelView when timer state changes externally
watch(() => timerState.value.state, (state) => {
  if (state === 'stopped' && panelView.value !== 'confirmation') {
    panelView.value = 'idle'
  } else if (state === 'running' || state === 'paused') {
    if (panelView.value === 'idle') panelView.value = 'active'
  }
})

// Handle stop button click → show stop form
function onStopClick() {
  panelView.value = 'stopping'
}

// Handle stop & save
async function onStopAndSave(notes: string) {
  await stop(notes)
  panelView.value = 'confirmation'
}

// Cancel stop → go back to active view
function onStopCancel() {
  panelView.value = 'active'
}

// After confirmation auto-close
function onConfirmDismiss() {
  clearStoppedEntry()
  closePanel()
}

// Start form submit (idle state)
async function onStartFromForm(data: any) {
  if (data) {
    await start({
      description: data.label || data.description,
      tags: data.tags,
      entry_type: data.entry_type,
      contact: data.contact,
      context_type: data.context_type,
      context_name: data.context_name,
    })
  } else {
    await start()
  }
  panelView.value = 'active'
}

// Focus mode from start form (now receives full config data)
async function onFocus(data: any) {
  await startFocus({
    description: data?.label || data?.description,
    tags: data?.tags,
    entry_type: data?.entry_type,
    sessions: data?.sessions,
    work_minutes: data?.work_minutes,
    break_minutes: data?.break_minutes,
    contact: data?.contact,
    context_type: data?.context_type,
    context_name: data?.context_name,
  })
  panelView.value = 'active'
}

function onRetry() {
  clearError()
}
</script>

<template>
  <DockPanelShell
    title="Watch"
    link="/watch"
    link-label="Full page"
    aria-label="Watch"
    @close="closePanel"
  >
    <!-- Error state -->
    <DockTimerError v-if="hasError" @retry="onRetry" />

    <!-- Confirmation (post-stop) -->
    <template v-else-if="panelView === 'confirmation'">
      <DockTimerConfirmation @dismiss="onConfirmDismiss" />
      <DockTimerDailySummary />
    </template>

    <!-- Stop form -->
    <template v-else-if="panelView === 'stopping'">
      <DockTimerDisplay />
      <DockTimerStopForm
        :loading="loading"
        @stop="onStopAndSave"
        @cancel="onStopCancel"
      />
    </template>

    <!-- Active (running / paused) -->
    <template v-else-if="isActive">
      <!-- Stale timer warning (regular timer only) -->
      <div v-if="isStale && !timerState.focus_mode" :style="staleWarningStyle">
        <span>{{ __('Timer running for {0} — did you forget?').replace('{0}', displayDuration) }}</span>
      </div>

      <!-- Focus session indicator -->
      <div v-if="timerState.focus_mode" :style="focusIndicatorStyle">
        <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }">
          <span>🍅 {{ __('Focus') }} — {{ timerState.focus_phase === 'break' ? __('Break') : __('Session {0}/{1}').replace('{0}', String(timerState.focus_session_number ?? 1)).replace('{1}', String(timerState.focus_total_sessions ?? 4)) }}</span>
        </div>
        <!-- Session dots -->
        <div :style="{ display: 'flex', gap: '0.375rem', marginTop: '0.375rem' }">
          <span
            v-for="i in (timerState.focus_total_sessions ?? 4)"
            :key="i"
            :style="{
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '9999px',
              backgroundColor: i < (timerState.focus_session_number ?? 1) ? '#22c55e'
                : i === (timerState.focus_session_number ?? 1) ? (timerState.focus_phase === 'break' ? '#f59e0b' : '#ef4444')
                : 'var(--dock-border)',
            }"
          />
        </div>
      </div>

      <DockTimerDisplay />
      <DockTimerEntryForm />
      <DockTimerActions @stop="onStopClick" />
      <DockTimerDailySummary />
    </template>

    <!-- Idle (stopped, panel opened manually) -->
    <template v-else>
      <DockTimerStartForm
        :loading="loading"
        @start="onStartFromForm"
        @focus="onFocus"
        @cancel="closePanel"
      />
      <DockTimerDailySummary />
    </template>
  </DockPanelShell>
</template>
