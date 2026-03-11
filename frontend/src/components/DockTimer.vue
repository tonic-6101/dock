<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Timer widget — soft dependency on frappe_time.
  Not rendered when frappe_time_installed=false OR enable_global_timer=false.

  Owns:
  - Timer state (seeded from boot, kept live via realtime + 30s poll fallback)
  - Client-side tick (setInterval) from started_at
  - dock:setTimerContext listener for domain app context push
  - Popover for start / active / stop views
-->
<script lang="ts">
export default { name: 'DockTimer' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Clock } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'
import DockTimerStartForm from './timer/DockTimerStartForm.vue'
import DockTimerActiveView from './timer/DockTimerActiveView.vue'
import DockTimerStopForm from './timer/DockTimerStopForm.vue'
import DockTimerError from './timer/DockTimerError.vue'

type TimerState = {
  state: 'stopped' | 'running' | 'paused' | 'unavailable'
  elapsed_seconds?: number
  started_at?: string
  context_app?: string | null
  context_doctype?: string | null
  context_name?: string | null
  context_label?: string | null
  entry_name?: string | null
}
interface Context { app: string; doctype: string; name: string; label: string }

const { settings } = useDockBoot()
const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot

const timerAvailable = boot?.frappe_time_installed === true
  && settings.value?.enable_global_timer === true

// State
const timerState   = ref<TimerState>(boot?.timer_state ?? { state: 'stopped' })
const pendingCtx   = ref<Context | null>(null)
const open         = ref(false)
const view         = ref<'start' | 'active' | 'stop' | 'edit'>('start')
const loading      = ref(false)
const hasError     = ref(false)
const stoppedEntry = ref<string | null | undefined>(undefined) // undefined = not yet stopped

// Client-side tick
const displaySeconds = ref(timerState.value.elapsed_seconds ?? 0)
let tickInterval: ReturnType<typeof setInterval> | null = null

function startTick() {
  stopTick()
  if (timerState.value.state !== 'running') return
  const startedAt = timerState.value.started_at ? new Date(timerState.value.started_at).getTime() : 0
  tickInterval = setInterval(() => {
    displaySeconds.value = startedAt
      ? Math.floor((Date.now() - startedAt) / 1000)
      : displaySeconds.value + 1
  }, 1000)
}
function stopTick() {
  if (tickInterval) { clearInterval(tickInterval); tickInterval = null }
}

function applyState(s: TimerState) {
  timerState.value = s
  displaySeconds.value = s.elapsed_seconds ?? 0
  stopTick()
  if (s.state === 'running') startTick()
  if (s.state === 'stopped' || s.state === 'running' || s.state === 'paused') {
    view.value = s.state === 'stopped' ? 'start' : 'active'
  }
}

const displayTime = computed(() => {
  const s = displaySeconds.value
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return [h, m, sec].map(n => String(n).padStart(2, '0')).join(':')
})

// Realtime
function onRealtimeUpdate(data: TimerState) { applyState(data) }

// 30s poll fallback
let pollInterval: ReturnType<typeof setInterval> | null = null
async function poll() {
  try {
    const s = await callApi<TimerState>('dock.api.timer.get_state')
    applyState(s)
  } catch { /* silent */ }
}

// dock:setTimerContext
function onSetContext(e: Event) {
  pendingCtx.value = (e as CustomEvent).detail ?? null
}

onMounted(() => {
  if (!timerAvailable) return
  applyState(timerState.value)
  const rt = (window as any).frappe?.realtime
  if (rt?.on) rt.on('dock_timer_update', onRealtimeUpdate)
  pollInterval = setInterval(poll, 30_000)
  window.addEventListener('dock:setTimerContext', onSetContext)
  document.addEventListener('mousedown', onOutsideClick)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  if (!timerAvailable) return
  stopTick()
  if (pollInterval) clearInterval(pollInterval)
  const rt = (window as any).frappe?.realtime
  if (rt?.off) rt.off('dock_timer_update', onRealtimeUpdate)
  window.removeEventListener('dock:setTimerContext', onSetContext)
  document.removeEventListener('mousedown', onOutsideClick)
  document.removeEventListener('keydown', onKeydown)
})

// Outside click + Esc
function onOutsideClick(e: MouseEvent) {
  const el = document.getElementById('dock-timer-root')
  if (el && !el.contains(e.target as Node)) open.value = false
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) open.value = false
}

// API actions
async function startTimer(ctx: Context | null) {
  loading.value = true; hasError.value = false
  try {
    const s = await callApi<TimerState>('dock.api.timer.start', ctx ? {
      context_app: ctx.app, context_doctype: ctx.doctype,
      context_name: ctx.name, context_label: ctx.label,
    } : {})
    applyState(s)
  } catch { hasError.value = true }
  finally { loading.value = false }
}

async function pauseTimer() {
  loading.value = true
  try { applyState(await callApi<TimerState>('dock.api.timer.pause')) }
  catch { hasError.value = true }
  finally { loading.value = false }
}

async function stopTimer(notes: string) {
  loading.value = true
  try {
    const s = await callApi<TimerState & { entry_name?: string }>('dock.api.timer.stop', notes ? { notes } : {})
    stoppedEntry.value = s.entry_name ?? null
    applyState(s)
    view.value = 'stop'
  } catch { hasError.value = true }
  finally { loading.value = false }
}

async function updateContext(ctx: Context | null) {
  if (!ctx) return
  loading.value = true
  try {
    const s = await callApi<TimerState>('dock.api.timer.update_context', {
      context_app: ctx.app, context_doctype: ctx.doctype,
      context_name: ctx.name, context_label: ctx.label,
    })
    applyState(s)
    view.value = 'active'
  } catch { hasError.value = true }
  finally { loading.value = false }
}

const ariaLabel = computed(() => {
  if (timerState.value.state === 'running') return `Timer running, ${displayTime.value}. Click to manage.`
  if (timerState.value.state === 'paused') return `Timer paused, ${displayTime.value}. Click to manage.`
  return 'Start timer'
})
</script>

<template>
  <div v-if="timerAvailable" id="dock-timer-root" class="dock-timer relative">
    <!-- Top bar button -->
    <button
      class="flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors text-sm font-mono
             hover:bg-black/5 dark:hover:bg-white/10"
      :class="{
        'text-green-600 dark:text-green-400': timerState.state === 'running',
        'text-amber-600 dark:text-amber-400': timerState.state === 'paused',
        'text-[var(--dock-icon)]':            timerState.state === 'stopped',
      }"
      :aria-label="ariaLabel"
      @click="open = !open"
    >
      <span
        v-if="timerState.state === 'running'"
        class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
      />
      <Clock v-else class="w-3.5 h-3.5" />
      <span v-if="timerState.state !== 'stopped'">{{ displayTime }}</span>
    </button>

    <!-- Popover -->
    <div
      v-if="open"
      role="dialog"
      aria-label="Timer"
      class="absolute right-0 top-full mt-2 w-64 bg-[var(--dock-bg)] border border-[var(--dock-border)]
             rounded-lg shadow-lg z-20 overflow-hidden"
    >
      <DockTimerError v-if="hasError" @retry="hasError = false" />
      <template v-else>
        <DockTimerStartForm
          v-if="view === 'start'"
          :pending="pendingCtx"
          :loading="loading"
          @start="startTimer"
          @cancel="open = false"
        />
        <DockTimerActiveView
          v-else-if="view === 'active' && (timerState.state === 'running' || timerState.state === 'paused')"
          :state="timerState as any"
          :display="displayTime"
          :loading="loading"
          @pause="pauseTimer"
          @resume="startTimer(null)"
          @stop="view = 'stop'"
          @edit="view = 'edit'"
        />
        <DockTimerStartForm
          v-else-if="view === 'edit'"
          :pending="pendingCtx"
          :loading="loading"
          @start="updateContext"
          @cancel="view = 'active'"
        />
        <DockTimerStopForm
          v-else-if="view === 'stop'"
          :loading="loading"
          :entry-name="stoppedEntry"
          @stop="stopTimer"
          @cancel="view = 'active'"
        />
      </template>
    </div>
  </div>
</template>
