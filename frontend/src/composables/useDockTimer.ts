// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { ref, computed, readonly, onMounted, onUnmounted } from 'vue'
import { callApi } from '@/composables/useApi'

/**
 * Shared timer state composable — extracted from DockTimer.vue.
 *
 * Owns:
 * - Timer state (seeded from boot, kept live via realtime + 30s poll fallback)
 * - Client-side tick (setInterval) from started_at
 * - API actions (start, stop, pause, resume, update)
 *
 * Used by DockTimerButton (top bar) and DockTimerPanel (contextual panel).
 */

export interface TimerContextOption {
  readonly doctype: string
  readonly label: string
  readonly search_fields: readonly string[]
  readonly display_field: string
  readonly parent_field?: string | null
  readonly parent_doctype?: string | null
}

export interface TimerState {
  state: 'stopped' | 'running' | 'paused' | 'unavailable'
  elapsed_seconds?: number
  started_at?: string
  accumulated_seconds?: number
  description?: string | null
  context_label?: string | null
  // Context fields — persisted in Watch
  contact?: string | null
  contact_name?: string | null
  context_type?: string | null
  context_name?: string | null
  context_display?: string | null
  // Legacy — kept for backward compat
  context_app?: string | null
  context_doctype?: string | null
  entry_name?: string | null
  tags?: string[]
  entry_type?: string | null
  focus_mode?: boolean
  focus_phase?: 'work' | 'break'
  focus_session_number?: number
  focus_total_sessions?: number
  focus_work_minutes?: number
  focus_break_minutes?: number
}

// ── Singleton state (shared across all consumers) ──────────────────

const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot

const timerAvailable = ref(
  boot?.watch_installed === true,
)

const timerState = ref<TimerState>(boot?.timer_state ?? { state: 'stopped' })
const contextOptions = ref<TimerContextOption[]>(boot?.timer_context_options ?? [])
const displaySeconds = ref(timerState.value.elapsed_seconds ?? 0)
const loading = ref(false)
const hasError = ref(false)
const stoppedEntry = ref<string | null>(null)
const stoppedDuration = ref(0)
const stoppedDescription = ref<string | null>(null)

let tickInterval: ReturnType<typeof setInterval> | null = null
let pollInterval: ReturnType<typeof setInterval> | null = null
let mountCount = 0

// ── Tick logic ─────────────────────────────────────────────────────

function startTick() {
  stopTick()
  if (timerState.value.state !== 'running') return
  const startedAt = timerState.value.started_at
    ? new Date(timerState.value.started_at).getTime()
    : 0
  const accum = timerState.value.accumulated_seconds ?? 0
  tickInterval = setInterval(() => {
    displaySeconds.value = startedAt
      ? accum + Math.floor((Date.now() - startedAt) / 1000)
      : displaySeconds.value + 1
  }, 1000)
}

function stopTick() {
  if (tickInterval) { clearInterval(tickInterval); tickInterval = null }
}

// ── State application ──────────────────────────────────────────────

function applyState(s: TimerState) {
  const wasRunning = timerState.value.state === 'running'
  timerState.value = s
  displaySeconds.value = s.elapsed_seconds ?? 0
  stopTick()
  if (s.state === 'running') {
    // Reset snooze when a new timer starts (not on poll refresh of same timer)
    if (!wasRunning) staleSnoozedUntil.value = 0
    startTick()
  }
}

// ── Computed ───────────────────────────────────────────────────────

const displayTime = computed(() => {
  const s = displaySeconds.value
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return [h, m, sec].map(n => String(n).padStart(2, '0')).join(':')
})

const displayDuration = computed(() => {
  const s = displaySeconds.value
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`
  return `${m}m`
})

const stoppedDurationDisplay = computed(() => {
  const s = stoppedDuration.value
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`
  return m > 0 ? `${m}m` : '< 1m'
})

const isRunning = computed(() => timerState.value.state === 'running')
const isPaused = computed(() => timerState.value.state === 'paused')
const isStopped = computed(() => timerState.value.state === 'stopped')
const isActive = computed(() => isRunning.value || isPaused.value)

// Stale threshold — read from Watch Settings via boot, fallback 4 hours
const staleThresholdHours = boot?.stale_threshold_hours ?? 4
const staleSnoozedUntil = ref(0)
const isStale = computed(() =>
  isRunning.value
  && displaySeconds.value > staleThresholdHours * 3600
  && Date.now() > staleSnoozedUntil.value,
)

/** Snooze the stale warning for the given number of minutes, or until end of day. */
function snoozeStale(minutes?: number) {
  if (minutes) {
    staleSnoozedUntil.value = Date.now() + minutes * 60_000
  } else {
    // End of day — midnight tonight
    const eod = new Date()
    eod.setHours(23, 59, 59, 999)
    staleSnoozedUntil.value = eod.getTime()
  }
}

const appColor = computed(() => {
  const ctxApp = timerState.value.context_app
  if (!ctxApp) return null
  const apps = boot?.registered_apps ?? []
  const match = apps.find((a: any) => a.app === ctxApp)
  return match?.color ?? null
})

const ariaLabel = computed(() => {
  if (isRunning.value) return `Timer running, ${displayTime.value}. Click to manage.`
  if (isPaused.value) return `Timer paused, ${displayTime.value}. Click to manage.`
  return 'Start timer'
})

// ── Realtime + poll ────────────────────────────────────────────────

function onRealtimeUpdate(data: TimerState) {
  applyState(data)
}

async function poll() {
  try {
    const s = await callApi<TimerState>('dock.api.timer.get_state')
    applyState(s)
  } catch { /* silent */ }
}

function setupListeners() {
  mountCount++
  if (mountCount > 1) return // Already set up

  if (!timerAvailable.value) return
  applyState(timerState.value)

  const rt = (window as any).frappe?.realtime
  if (rt?.on) rt.on('dock_timer_update', onRealtimeUpdate)
  pollInterval = setInterval(poll, 30_000)
}

function teardownListeners() {
  mountCount--
  if (mountCount > 0) return // Other consumers still mounted

  stopTick()
  if (pollInterval) { clearInterval(pollInterval); pollInterval = null }
  const rt = (window as any).frappe?.realtime
  if (rt?.off) rt.off('dock_timer_update', onRealtimeUpdate)
}

// ── API actions ────────────────────────────────────────────────────

async function start(params?: {
  description?: string
  tags?: string[]
  entry_type?: string
  contact?: string
  context_type?: string
  context_name?: string
}) {
  loading.value = true
  hasError.value = false
  stoppedEntry.value = null
  try {
    const apiParams: Record<string, any> = {}
    if (params?.description) apiParams.context_label = params.description
    if (params?.tags?.length) apiParams.tags = JSON.stringify(params.tags)
    if (params?.entry_type) apiParams.entry_type = params.entry_type
    if (params?.contact) apiParams.contact = params.contact
    if (params?.context_type) apiParams.context_type = params.context_type
    if (params?.context_name) apiParams.context_name = params.context_name
    const s = await callApi<TimerState>('dock.api.timer.start', apiParams)
    applyState(s)
    return s
  } catch {
    hasError.value = true
    return null
  } finally {
    loading.value = false
  }
}

async function pause() {
  loading.value = true
  try {
    applyState(await callApi<TimerState>('dock.api.timer.pause'))
  } catch { hasError.value = true }
  finally { loading.value = false }
}

async function resume() {
  loading.value = true
  try {
    applyState(await callApi<TimerState>('dock.api.timer.resume'))
  } catch { hasError.value = true }
  finally { loading.value = false }
}

async function stop(notes?: string) {
  loading.value = true
  // Capture duration and description before stop resets them to 0
  stoppedDuration.value = displaySeconds.value
  stoppedDescription.value = timerState.value.context_label ?? timerState.value.description ?? null
  try {
    const s = await callApi<TimerState & { entry_name?: string }>(
      'dock.api.timer.stop', notes ? { notes } : {},
    )
    stoppedEntry.value = s.entry_name ?? null
    applyState(s)
    return s
  } catch {
    hasError.value = true
    return null
  } finally {
    loading.value = false
  }
}

async function update(params: {
  description?: string
  tags?: string[]
  entry_type?: string
  contact?: string | null
  context_type?: string | null
  context_name?: string | null
}) {
  loading.value = true
  try {
    const apiParams: Record<string, any> = {}
    if (params.description !== undefined) apiParams.context_label = params.description
    if (params.tags) apiParams.tags = JSON.stringify(params.tags)
    if (params.entry_type) apiParams.entry_type = params.entry_type
    if (params.contact !== undefined) apiParams.contact = params.contact ?? ''
    if (params.context_type !== undefined) apiParams.context_type = params.context_type ?? ''
    if (params.context_name !== undefined) apiParams.context_name = params.context_name ?? ''
    const s = await callApi<TimerState>('dock.api.timer.update_context', apiParams)
    applyState(s)
  } catch { hasError.value = true }
  finally { loading.value = false }
}

async function startFocus(params?: {
  description?: string
  tags?: string[]
  entry_type?: string
  sessions?: number
  work_minutes?: number
  break_minutes?: number
  contact?: string
  context_type?: string
  context_name?: string
}) {
  loading.value = true
  hasError.value = false
  stoppedEntry.value = null
  try {
    const apiParams: Record<string, any> = {}
    if (params?.description) apiParams.description = params.description
    if (params?.tags?.length) apiParams.tags = JSON.stringify(params.tags)
    if (params?.entry_type) apiParams.entry_type = params.entry_type
    if (params?.sessions) apiParams.sessions = params.sessions
    if (params?.work_minutes) apiParams.work_minutes = params.work_minutes
    if (params?.break_minutes) apiParams.break_minutes = params.break_minutes
    if (params?.contact) apiParams.contact = params.contact
    if (params?.context_type) apiParams.context_type = params.context_type
    if (params?.context_name) apiParams.context_name = params.context_name
    const s = await callApi<TimerState>('dock.api.timer.start_focus', apiParams)
    applyState(s)
    return s
  } catch {
    hasError.value = true
    return null
  } finally {
    loading.value = false
  }
}

function clearError() {
  hasError.value = false
}

function clearStoppedEntry() {
  stoppedEntry.value = null
}

// ── Public API ─────────────────────────────────────────────────────

export function useDockTimer() {
  // Setup/teardown listeners per mount cycle
  onMounted(setupListeners)
  onUnmounted(teardownListeners)

  return {
    // State
    timerAvailable: readonly(timerAvailable),
    timerState: readonly(timerState),
    contextOptions: readonly(contextOptions),
    displaySeconds: readonly(displaySeconds),
    displayTime,
    displayDuration,
    loading: readonly(loading),
    hasError: readonly(hasError),
    stoppedEntry: readonly(stoppedEntry),
    stoppedDuration: readonly(stoppedDuration),
    stoppedDescription: readonly(stoppedDescription),
    stoppedDurationDisplay,

    // Computed
    isRunning,
    isPaused,
    isStopped,
    isActive,
    isStale,
    appColor,
    ariaLabel,

    // Actions
    start,
    pause,
    resume,
    stop,
    update,
    startFocus,
    clearError,
    clearStoppedEntry,
    applyState,
    snoozeStale,
  }
}
