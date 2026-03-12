<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockCalendarPage' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { ChevronLeft, ChevronRight, X, Plus } from 'lucide-vue-next'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'
import { __ } from '@/composables/useTranslate'
import DockCreateEventModal from '@/components/calendar/DockCreateEventModal.vue'
import DockEventManagerPanel from '@/components/calendar/DockEventManagerPanel.vue'
import type { DockEvent as DockEventType } from '@/types/dock'

interface DockEvent {
  name: string
  title: string
  start_datetime: string
  end_datetime: string | null
  all_day: 0 | 1
  event_type: string
  color: string | null
  url: string
  source_app: string
  source_doctype: string
  source_name: string
  description: string | null
}

interface CalendarSource {
  app: string
  label: string
  color: string
  event_label: string
  create_route_template?: string
}

type CalendarView = 'week' | 'month'

const HOUR_HEIGHT = 60
const STORAGE_HIDDEN = 'dock.calendar.hidden_sources'
const STORAGE_VIEW   = 'dock.calendar.view'

const { settings, calendarSources } = useDockBoot()
const weekStartMonday = computed(() => (settings.value?.week_start ?? 'Monday') === 'Monday')

const view = ref<CalendarView>(
  (localStorage.getItem(STORAGE_VIEW) as CalendarView | null) ?? 'week'
)
const hiddenApps = ref<Set<string>>(
  new Set(JSON.parse(localStorage.getItem(STORAGE_HIDDEN) || '[]') as string[])
)

const currentDate = ref(new Date())
const events = ref<DockEvent[]>([])
const loading = ref(false)
const selectedEvent = ref<DockEvent | null>(null)
const createTarget = ref<{ date: Date; hour: number } | null>(null)
const showCreateModal = ref(false)
const createModalDate = ref<Date | null>(null)
const now = ref(new Date())
let clockTimer: ReturnType<typeof setInterval>
const gridRef = ref<HTMLElement | null>(null)

const urlSource = ref<string | null>(null)
const urlRef    = ref<string | null>(null)

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function isToday(d: Date): boolean {
  return dateKey(d) === dateKey(now.value)
}

function startOfWeek(d: Date): Date {
  const dow = d.getDay()
  const offset = weekStartMonday.value ? (dow === 0 ? -6 : 1 - dow) : -dow
  const s = new Date(d)
  s.setDate(d.getDate() + offset)
  s.setHours(0, 0, 0, 0)
  return s
}

function formatTime(dt: string): string {
  if (!dt) return ''
  return new Date(dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatDateShort(d: Date): string {
  return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
}

function eventColor(ev: DockEvent): string {
  if (ev.color) return ev.color
  const src = (calendarSources.value as CalendarSource[]).find(s => s.app === ev.source_app)
  return src?.color ?? '#6366f1'
}

const weekStart = computed(() => startOfWeek(currentDate.value))

const weekDays = computed<Date[]>(() =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart.value)
    d.setDate(weekStart.value.getDate() + i)
    return d
  })
)

const weekLabel = computed(() => {
  const s = weekDays.value[0]
  const e = weekDays.value[6]
  return `${s.toLocaleDateString([], { day: 'numeric', month: 'short' })} – ${e.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}`
})

const currentTimeTop = computed(() => now.value.getHours() * 60 + now.value.getMinutes())

function eventTop(ev: DockEvent): number {
  const d = new Date(ev.start_datetime)
  return d.getHours() * 60 + d.getMinutes()
}

function eventHeight(ev: DockEvent): number {
  if (!ev.end_datetime) return 60
  const ms = new Date(ev.end_datetime).getTime() - new Date(ev.start_datetime).getTime()
  return Math.max(20, Math.round(ms / 60000))
}

const filteredEvents = computed(() => {
  let list = events.value.filter(ev => !hiddenApps.value.has(ev.source_app))
  if (urlRef.value) list = list.filter(ev => ev.source_name === urlRef.value)
  return list
})

function timedEventsForDay(d: Date): DockEvent[] {
  return filteredEvents.value.filter(ev => !ev.all_day && ev.start_datetime.slice(0, 10) === dateKey(d))
}

function allDayEventsForDay(d: Date): DockEvent[] {
  return filteredEvents.value.filter(ev => ev.all_day && ev.start_datetime.slice(0, 10) === dateKey(d))
}

const monthStart = computed(() => new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1))
const monthEnd   = computed(() => new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0))
const monthLabel = computed(() => monthStart.value.toLocaleString('default', { month: 'long', year: 'numeric' }))

function buildMonthDays(refStart: Date, refEnd: Date) {
  const days: Array<{ date: Date; currentMonth: boolean }> = []
  const start = new Date(refStart)
  const dow = start.getDay()
  const leading = weekStartMonday.value ? (dow === 0 ? 6 : dow - 1) : dow
  for (let i = leading - 1; i >= 0; i--) { const d = new Date(start); d.setDate(d.getDate() - i - 1); days.push({ date: d, currentMonth: false }) }
  const end = new Date(refEnd)
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) days.push({ date: new Date(d), currentMonth: true })
  const trailing = days.length % 7 === 0 ? 0 : 7 - (days.length % 7)
  for (let i = 1; i <= trailing; i++) { const d = new Date(end); d.setDate(d.getDate() + i); days.push({ date: d, currentMonth: false }) }
  return days
}

const calendarDays = computed(() => buildMonthDays(monthStart.value, monthEnd.value))
const miniMonthDays = computed(() => buildMonthDays(
  new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1),
  new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0)
))

const weekDayHeaders = computed(() =>
  weekStartMonday.value
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
)

function monthEventsForDay(d: Date): DockEvent[] {
  return filteredEvents.value.filter(ev => ev.start_datetime.slice(0, 10) === dateKey(d))
}

function isInCurrentWeek(d: Date): boolean {
  const ws = weekStart.value
  const we = new Date(ws); we.setDate(ws.getDate() + 6)
  return d >= ws && d <= we
}

function jumpToDay(d: Date) {
  currentDate.value = new Date(d)
  if (view.value !== 'week') view.value = 'week'
}

function prev() {
  const d = new Date(currentDate.value)
  if (view.value === 'week') d.setDate(d.getDate() - 7)
  else { d.setDate(1); d.setMonth(d.getMonth() - 1) }
  currentDate.value = d
}

function next() {
  const d = new Date(currentDate.value)
  if (view.value === 'week') d.setDate(d.getDate() + 7)
  else { d.setDate(1); d.setMonth(d.getMonth() + 1) }
  currentDate.value = d
}

function goToday() { currentDate.value = new Date() }

async function fetchEvents() {
  loading.value = true
  try {
    let start: string, end: string
    if (view.value === 'week') {
      start = `${dateKey(weekDays.value[0])} 00:00:00`
      end   = `${dateKey(weekDays.value[6])} 23:59:59`
    } else {
      const y = currentDate.value.getFullYear()
      const m = String(currentDate.value.getMonth() + 1).padStart(2, '0')
      const last = String(monthEnd.value.getDate()).padStart(2, '0')
      start = `${y}-${m}-01 00:00:00`
      end   = `${y}-${m}-${last} 23:59:59`
    }
    const args: Record<string, unknown> = { start, end }
    if (urlSource.value) args.sources = [urlSource.value]
    events.value = await callApi<DockEvent[]>('dock.api.calendar.get_events', args)
  } finally {
    loading.value = false
  }
}

function onSlotClick(day: Date, hour: number) {
  const sources = calendarSources.value as CalendarSource[]
  if (!sources.length) return
  if (sources.length === 1) { navigateToCreate(sources[0], day, hour); return }
  createTarget.value = { date: day, hour }
}

function navigateToCreate(src: CalendarSource, day: Date, hour: number) {
  if (!src.create_route_template) return
  const url = src.create_route_template
    .replace('{date}', dateKey(day))
    .replace('{time}', `${String(hour).padStart(2, '0')}:00`)
  window.location.href = url
}

function scrollToCurrentTime() {
  nextTick(() => { if (gridRef.value) gridRef.value.scrollTop = Math.max(0, currentTimeTop.value - 200) })
}

function toggleSource(app: string) {
  const next = new Set(hiddenApps.value)
  next.has(app) ? next.delete(app) : next.add(app)
  hiddenApps.value = next
  localStorage.setItem(STORAGE_HIDDEN, JSON.stringify([...next]))
}

function openCreateModal(date?: Date) {
  createModalDate.value = date ?? new Date()
  showCreateModal.value = true
}

function onEventCreated(event: DockEventType) {
  events.value = [...events.value, event as unknown as DockEvent]
}

function onEventDeleted(name: string) {
  events.value = events.value.filter(e => e.name !== name)
  selectedEvent.value = null
}

watch(view, v => { localStorage.setItem(STORAGE_VIEW, v); fetchEvents(); if (v === 'week') scrollToCurrentTime() })
watch(weekStart, () => { if (view.value === 'week') fetchEvents() })
watch(monthStart, () => { if (view.value === 'month') fetchEvents() })

onMounted(async () => {
  const params = new URLSearchParams(window.location.search)
  urlSource.value = params.get('source')
  urlRef.value    = params.get('ref')
  await fetchEvents()
  if (view.value === 'week') scrollToCurrentTime()
  clockTimer = setInterval(() => { now.value = new Date() }, 60000)
})

onUnmounted(() => clearInterval(clockTimer))
</script>

<template>
  <div class="flex" style="height: calc(100vh - 56px)">

    <!-- Sidebar -->
    <aside class="w-52 shrink-0 border-r border-[var(--dock-border)] flex flex-col overflow-y-auto">
      <div class="p-3">
        <button
          v-if="(calendarSources as CalendarSource[]).length"
          class="flex items-center gap-1.5 w-full px-3 py-2 rounded-lg text-sm font-medium
                 border border-[var(--dock-border)] text-[var(--dock-text)]
                 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          @click="onSlotClick(new Date(), new Date().getHours())"
        >
          <Plus class="w-4 h-4" />
          {{ __('Add event') }}
        </button>
      </div>

      <!-- Mini month -->
      <div class="px-3 pb-3">
        <div class="flex items-center justify-between mb-1">
          <button class="p-0.5 text-[var(--dock-icon)] hover:text-[var(--dock-text)]" @click="prev">
            <ChevronLeft class="w-3.5 h-3.5" />
          </button>
          <span class="text-xs font-medium text-[var(--dock-text)]">
            {{ new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toLocaleString('default', { month: 'long', year: 'numeric' }) }}
          </span>
          <button class="p-0.5 text-[var(--dock-icon)] hover:text-[var(--dock-text)]" @click="next">
            <ChevronRight class="w-3.5 h-3.5" />
          </button>
        </div>
        <div class="grid grid-cols-7 mb-0.5">
          <div v-for="h in weekDayHeaders" :key="h" class="text-[9px] font-medium text-[var(--dock-icon)] text-center">
            {{ h[0] }}
          </div>
        </div>
        <div class="grid grid-cols-7">
          <button
            v-for="day in miniMonthDays" :key="dateKey(day.date)"
            class="aspect-square flex items-center justify-center rounded-full text-[10px] transition-colors"
            :class="[
              isToday(day.date) ? 'bg-[var(--dock-icon)] text-white font-semibold'
                : isInCurrentWeek(day.date) && view === 'week' ? 'bg-black/5 dark:bg-white/10 text-[var(--dock-text)]'
                : day.currentMonth ? 'text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10'
                : 'text-[var(--dock-icon)] opacity-40',
            ]"
            @click="jumpToDay(day.date)"
          >
            {{ day.date.getDate() }}
          </button>
        </div>
      </div>

      <!-- App toggles -->
      <div class="px-3 flex-1">
        <p class="text-[10px] font-semibold uppercase tracking-wide text-[var(--dock-icon)] mb-2">
          {{ __('My calendars') }}
        </p>
        <div
          v-for="src in (calendarSources as CalendarSource[])" :key="src.app"
          class="flex items-center gap-2 mb-2 cursor-pointer select-none"
          role="checkbox" :aria-checked="!hiddenApps.has(src.app)"
          :aria-label="`${__('Show')} ${src.label} ${__('events')}`"
          tabindex="0"
          @click="toggleSource(src.app)"
          @keydown.enter="toggleSource(src.app)"
          @keydown.space.prevent="toggleSource(src.app)"
        >
          <span
            class="w-3.5 h-3.5 rounded-sm shrink-0 border-2 flex items-center justify-center"
            :style="hiddenApps.has(src.app)
              ? { borderColor: src.color, backgroundColor: 'transparent' }
              : { borderColor: src.color, backgroundColor: src.color }"
          >
            <svg v-if="!hiddenApps.has(src.app)" viewBox="0 0 8 8" class="w-2 h-2 fill-none stroke-white stroke-[1.5]">
              <polyline points="1,4 3,6 7,2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="text-xs text-[var(--dock-text)]">{{ src.label }}</span>
        </div>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col overflow-hidden">

      <!-- Toolbar -->
      <div class="flex items-center gap-2 px-4 py-2 border-b border-[var(--dock-border)] shrink-0">
        <button class="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 text-[var(--dock-icon)]" @click="prev">
          <ChevronLeft class="w-4 h-4" />
        </button>
        <button class="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 text-[var(--dock-icon)]" @click="next">
          <ChevronRight class="w-4 h-4" />
        </button>
        <button
          class="px-2 py-1 text-xs rounded border border-[var(--dock-border)] text-[var(--dock-icon)]
                 hover:bg-black/5 dark:hover:bg-white/10"
          @click="goToday"
        >{{ __('Today') }}</button>
        <h2 class="text-sm font-medium text-[var(--dock-text)] ml-2">
          {{ view === 'week' ? weekLabel : monthLabel }}
        </h2>
        <div class="ml-auto flex items-center gap-2">
        <button
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                 bg-[var(--dock-icon)] text-white hover:opacity-90 transition-opacity"
          @click="openCreateModal()"
        >
          <Plus class="w-3.5 h-3.5" />
          {{ __('New Event') }}
        </button>
        <div class="flex rounded-md border border-[var(--dock-border)] overflow-hidden" role="tablist">
          <button
            v-for="v in (['week', 'month'] as CalendarView[])" :key="v"
            role="tab" :aria-selected="view === v"
            class="px-3 py-1 text-xs font-medium transition-colors capitalize"
            :class="view === v ? 'bg-[var(--dock-icon)] text-white' : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click="view = v"
          >
            {{ __(v === 'week' ? 'Week' : 'Month') }}
          </button>
        </div>
        </div><!-- /ml-auto flex items-center gap-2 -->
      </div>

      <!-- Week view -->
      <template v-if="view === 'week'">
        <!-- Day headers -->
        <div class="flex border-b border-[var(--dock-border)] shrink-0">
          <div class="w-14 shrink-0" />
          <div
            v-for="day in weekDays" :key="dateKey(day)"
            class="flex-1 text-center py-1 border-l border-[var(--dock-border)]"
            role="columnheader"
          >
            <div class="text-[10px] text-[var(--dock-icon)]">{{ day.toLocaleString('default', { weekday: 'short' }) }}</div>
            <div
              class="w-6 h-6 mx-auto rounded-full flex items-center justify-center text-sm font-semibold"
              :class="isToday(day) ? 'bg-[var(--dock-icon)] text-white' : 'text-[var(--dock-text)]'"
            >{{ day.getDate() }}</div>
          </div>
        </div>

        <!-- All-day row -->
        <div class="flex border-b border-[var(--dock-border)] shrink-0 min-h-[24px]">
          <div class="w-14 shrink-0 flex items-center justify-end pr-2">
            <span class="text-[9px] text-[var(--dock-icon)]">{{ __('All day') }}</span>
          </div>
          <div v-for="day in weekDays" :key="dateKey(day)" class="flex-1 border-l border-[var(--dock-border)] p-0.5">
            <div
              v-for="ev in allDayEventsForDay(day)" :key="ev.name"
              role="button" :aria-label="`${ev.title} · ${ev.source_app}`"
              class="text-[10px] text-white rounded px-1 truncate mb-0.5 cursor-pointer hover:opacity-90"
              :style="{ backgroundColor: eventColor(ev) }"
              @click="selectedEvent = ev"
            >{{ ev.title }}</div>
          </div>
        </div>

        <!-- Time grid -->
        <div ref="gridRef" class="flex-1 overflow-y-auto" :class="{ 'opacity-60': loading }">
          <div class="flex" :style="{ height: `${HOUR_HEIGHT * 24}px` }">
            <!-- Hour labels -->
            <div class="w-14 shrink-0 relative select-none">
              <div
                v-for="h in 23" :key="h"
                class="absolute right-2 text-[10px] text-[var(--dock-icon)] leading-none"
                :style="{ top: `${h * HOUR_HEIGHT - 6}px` }"
              >{{ String(h).padStart(2, '0') }}:00</div>
            </div>
            <!-- Day columns -->
            <div
              v-for="day in weekDays" :key="dateKey(day)"
              class="flex-1 relative border-l border-[var(--dock-border)]"
              role="gridcell"
            >
              <!-- Hour lines -->
              <div
                v-for="h in 24" :key="h"
                class="absolute w-full border-t border-[var(--dock-border)] opacity-40 pointer-events-none"
                :style="{ top: `${(h - 1) * HOUR_HEIGHT}px` }"
              />
              <!-- Current time indicator -->
              <div
                v-if="isToday(day)"
                class="absolute w-full h-px bg-red-400 z-10 pointer-events-none"
                :style="{ top: `${currentTimeTop}px` }"
              />
              <!-- Timed events -->
              <div
                v-for="ev in timedEventsForDay(day)" :key="ev.name"
                role="button"
                :aria-label="`${ev.title} · ${formatTime(ev.start_datetime)} · ${ev.source_app}`"
                class="absolute left-0.5 right-0.5 rounded px-1 py-0.5 cursor-pointer text-white
                       overflow-hidden hover:opacity-90 transition-opacity z-20"
                :style="{ top: `${eventTop(ev)}px`, height: `${eventHeight(ev)}px`, backgroundColor: eventColor(ev) }"
                @click.stop="selectedEvent = ev"
              >
                <div class="text-[10px] font-medium truncate leading-tight">{{ ev.title }}</div>
                <div v-if="eventHeight(ev) >= 30" class="text-[9px] opacity-75">{{ formatTime(ev.start_datetime) }}</div>
              </div>
              <!-- Slot click areas -->
              <div
                v-for="h in 24" :key="`s${h}`"
                class="absolute w-full cursor-pointer hover:bg-[var(--dock-icon)]/5"
                :style="{ top: `${(h - 1) * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }"
                @click="onSlotClick(day, h - 1)"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- Month view -->
      <template v-else>
        <div class="flex-1 overflow-auto px-4 py-3" :class="{ 'opacity-60': loading }">
          <div class="grid grid-cols-7 mb-1" role="row">
            <div v-for="h in weekDayHeaders" :key="h" class="text-xs font-medium text-[var(--dock-icon)] text-center pb-1" role="columnheader">
              {{ __(h) }}
            </div>
          </div>
          <div class="grid grid-cols-7 border-l border-t border-[var(--dock-border)]" role="grid">
            <div
              v-for="day in calendarDays" :key="dateKey(day.date)"
              class="border-r border-b border-[var(--dock-border)] min-h-[96px] p-1 relative"
              :class="day.currentMonth ? '' : 'opacity-40'"
              role="gridcell"
            >
              <div class="flex justify-end mb-0.5">
                <span
                  class="text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium cursor-pointer"
                  :class="isToday(day.date) ? 'bg-[var(--dock-icon)] text-white' : 'text-[var(--dock-text)] hover:bg-black/5'"
                  @click="jumpToDay(day.date)"
                >{{ day.date.getDate() }}</span>
              </div>
              <div class="space-y-0.5 relative z-10">
                <button
                  v-for="ev in monthEventsForDay(day.date)" :key="ev.name"
                  role="button" :aria-label="`${ev.title} · ${ev.source_app}`"
                  class="w-full text-left text-[10px] leading-tight px-1.5 py-0.5 rounded text-white font-medium truncate hover:opacity-90"
                  :style="{ backgroundColor: eventColor(ev) }"
                  @click="selectedEvent = ev"
                >
                  <span v-if="!ev.all_day" class="opacity-75 mr-0.5">{{ formatTime(ev.start_datetime) }}</span>
                  {{ ev.title }}
                </button>
              </div>
              <div
                v-if="(calendarSources as CalendarSource[]).length"
                class="absolute inset-0 cursor-pointer"
                @click.self="onSlotClick(day.date, 9)"
              />
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Manager Panel (inline on desktop, overlay on mobile) -->
    <DockEventManagerPanel
      v-if="selectedEvent"
      :event="selectedEvent as unknown as DockEventType"
      @close="selectedEvent = null"
      @deleted="onEventDeleted"
    />

    <!-- Create picker (Teleport) -->
    <Teleport to="body">
      <!-- Create picker -->
      <div
        v-if="createTarget"
        role="dialog" :aria-label="__('Create in:')"
        class="fixed inset-0 flex items-center justify-center z-50"
        @click.self="createTarget = null"
      >
        <div class="w-64 rounded-xl shadow-xl bg-[var(--dock-bg)] border border-[var(--dock-border)] p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="text-xs text-[var(--dock-icon)]">
              {{ formatDateShort(createTarget.date) }} · {{ String(createTarget.hour).padStart(2, '0') }}:00
            </div>
            <button class="text-[var(--dock-icon)]" @click="createTarget = null"><X class="w-3.5 h-3.5" /></button>
          </div>
          <p class="text-xs font-medium text-[var(--dock-text)] mb-2">{{ __('Create in:') }}</p>
          <div class="space-y-1">
            <button
              v-for="src in (calendarSources as CalendarSource[])" :key="src.app"
              class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[var(--dock-text)]"
              @click="navigateToCreate(src, createTarget.date, createTarget.hour); createTarget = null"
            >
              <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: src.color }" />
              {{ src.label }} — {{ src.event_label }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <DockCreateEventModal
      :show="showCreateModal"
      :initial-date="createModalDate"
      @close="showCreateModal = false"
      @created="onEventCreated"
    />
  </div>
</template>
