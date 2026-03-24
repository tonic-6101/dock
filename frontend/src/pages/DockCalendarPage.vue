<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockCalendarPage' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { ChevronLeft, ChevronRight, X, Plus, MoreHorizontal, Share2, Trash2, Pencil } from 'lucide-vue-next'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'
import { __ } from '@/composables/useTranslate'
import DockCreateEventModal from '@/components/calendar/DockCreateEventModal.vue'
import DockEventManagerPanel from '@/components/calendar/DockEventManagerPanel.vue'
import CreateCalendarPopover from '@/components/calendar/CreateCalendarPopover.vue'
import ShareCalendarModal from '@/components/calendar/ShareCalendarModal.vue'
import type { DockEvent as DockEventType, DockCalendar } from '@/types/dock'

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
  calendar: string | null
}

interface CalendarSource {
  app: string
  label: string
  color: string
  event_label: string
  create_route_template?: string
}

interface EventLayout {
  event: DockEvent
  col: number
  totalCols: number
}

type CalendarView = 'week' | 'month' | 'day' | 'agenda'

const HOUR_HEIGHT = 60
const STORAGE_HIDDEN = 'dock.calendar.hidden_sources'
const STORAGE_HIDDEN_CALS = 'dock.calendar.hidden_calendars'
const STORAGE_VIEW   = 'dock.calendar.view'

const { settings, calendarSources, userCalendars } = useDockBoot()
const weekStartMonday = computed(() => (settings.value?.week_start ?? 'Monday') === 'Monday')

// User calendars (owned + shared)
const myCalendars = ref<DockCalendar[]>([])
const sharedCalendars = ref<DockCalendar[]>([])
const showCreateCalendar = ref(false)
const shareCalendar = ref<DockCalendar | null>(null)
const showShareModal = ref(false)
const contextMenuCal = ref<DockCalendar | null>(null)
const contextMenuPos = ref<{ x: number; y: number } | null>(null)
const collapsedGroups = ref<Set<string>>(new Set())

// Rename inline editing
const renamingCal = ref<string | null>(null)
const renameTitle = ref('')

const view = ref<CalendarView>(
  (localStorage.getItem(STORAGE_VIEW) as CalendarView | null) ?? 'week'
)
const hiddenApps = ref<Set<string>>(
  new Set(JSON.parse(localStorage.getItem(STORAGE_HIDDEN) || '[]') as string[])
)
const hiddenCals = ref<Set<string>>(
  new Set(JSON.parse(localStorage.getItem(STORAGE_HIDDEN_CALS) || '[]') as string[])
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
let fetchTimer: ReturnType<typeof setTimeout> | null = null
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
  // For native events, resolve from their user calendar
  if (ev.calendar) {
    const cal = [...myCalendars.value, ...sharedCalendars.value].find(c => c.name === ev.calendar)
    if (cal?.color) return cal.color
  }
  // For app-sourced events, resolve from app source
  const src = (calendarSources.value as CalendarSource[]).find(s => s.app === ev.source_app)
  return src?.color ?? '#6366f1'
}

// ── Side-by-side overlapping event layout ──────────────────────────────────

function layoutDay(evs: DockEvent[]): EventLayout[] {
  if (!evs.length) return []
  const sorted = [...evs].sort((a, b) =>
    new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime()
  )
  const colEnds: number[] = []
  const result: Array<{ event: DockEvent; col: number }> = []
  for (const ev of sorted) {
    const start = new Date(ev.start_datetime).getTime()
    const end = ev.end_datetime
      ? new Date(ev.end_datetime).getTime()
      : start + 3_600_000
    let col = colEnds.findIndex(e => e <= start)
    if (col === -1) col = colEnds.length
    colEnds[col] = end
    result.push({ event: ev, col })
  }
  const totalCols = colEnds.length || 1
  return result.map(r => ({ ...r, totalCols }))
}

// ── Week view computeds ────────────────────────────────────────────────────

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
  let list = events.value.filter(ev => {
    // Hide by app source toggle
    if (hiddenApps.value.has(ev.source_app)) return false
    // Hide by user calendar toggle
    if (ev.calendar && hiddenCals.value.has(ev.calendar)) return false
    return true
  })
  if (urlRef.value) list = list.filter(ev => ev.source_name === urlRef.value)
  return list
})

function timedEventsForDay(d: Date): DockEvent[] {
  return filteredEvents.value.filter(ev => !ev.all_day && ev.start_datetime.slice(0, 10) === dateKey(d))
}

function allDayEventsForDay(d: Date): DockEvent[] {
  return filteredEvents.value.filter(ev => ev.all_day && ev.start_datetime.slice(0, 10) === dateKey(d))
}

// ── Month view computeds ───────────────────────────────────────────────────

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

// ── Day view computeds ─────────────────────────────────────────────────────

const dayLabel = computed(() =>
  currentDate.value.toLocaleDateString([], {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
)

// ── Agenda view computeds ──────────────────────────────────────────────────

const agendaEnd = computed(() => {
  const d = new Date(currentDate.value)
  d.setDate(d.getDate() + 30)
  return d
})

const agendaLabel = computed(() =>
  `${currentDate.value.toLocaleDateString([], { month: 'short', day: 'numeric' })} – ${agendaEnd.value.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}`
)

const agendaDays = computed(() => {
  const byDate: Record<string, DockEvent[]> = {}
  for (const ev of filteredEvents.value) {
    const dk = ev.start_datetime.slice(0, 10)
    if (!byDate[dk]) byDate[dk] = []
    byDate[dk].push(ev)
  }
  return Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, evs]) => ({
      date,
      events: evs.sort((a, b) => a.start_datetime.localeCompare(b.start_datetime)),
    }))
})

// ── Navigation ─────────────────────────────────────────────────────────────

function jumpToDay(d: Date) {
  currentDate.value = new Date(d)
  if (view.value !== 'week') view.value = 'week'
}

function prev() {
  const d = new Date(currentDate.value)
  if (view.value === 'week') d.setDate(d.getDate() - 7)
  else if (view.value === 'month') { d.setDate(1); d.setMonth(d.getMonth() - 1) }
  else d.setDate(d.getDate() - 1)
  currentDate.value = d
}

function next() {
  const d = new Date(currentDate.value)
  if (view.value === 'week') d.setDate(d.getDate() + 7)
  else if (view.value === 'month') { d.setDate(1); d.setMonth(d.getMonth() + 1) }
  else d.setDate(d.getDate() + 1)
  currentDate.value = d
}

function goToday() { currentDate.value = new Date() }

// ── Data fetching ──────────────────────────────────────────────────────────

async function fetchEvents() {
  loading.value = true
  try {
    let start: string, end: string
    if (view.value === 'week') {
      start = `${dateKey(weekDays.value[0])} 00:00:00`
      end   = `${dateKey(weekDays.value[6])} 23:59:59`
    } else if (view.value === 'month') {
      const y = currentDate.value.getFullYear()
      const m = String(currentDate.value.getMonth() + 1).padStart(2, '0')
      const last = String(monthEnd.value.getDate()).padStart(2, '0')
      start = `${y}-${m}-01 00:00:00`
      end   = `${y}-${m}-${last} 23:59:59`
    } else if (view.value === 'day') {
      const d = dateKey(currentDate.value)
      start = `${d} 00:00:00`
      end   = `${d} 23:59:59`
    } else {
      // agenda: 30 days forward
      start = `${dateKey(currentDate.value)} 00:00:00`
      end   = `${dateKey(agendaEnd.value)} 23:59:59`
    }
    const args: Record<string, unknown> = { start, end }
    if (urlSource.value) args.sources = [urlSource.value]
    events.value = await callApi<DockEvent[]>('dock.api.calendar.get_events', args)
  } finally {
    loading.value = false
  }
}

function debouncedFetch() {
  if (fetchTimer) clearTimeout(fetchTimer)
  fetchTimer = setTimeout(() => { fetchTimer = null; fetchEvents() }, 200)
}

// ── Calendar management ───────────────────────────────────────────────────

function toggleCalendar(calName: string) {
  const next = new Set(hiddenCals.value)
  next.has(calName) ? next.delete(calName) : next.add(calName)
  hiddenCals.value = next
  localStorage.setItem(STORAGE_HIDDEN_CALS, JSON.stringify([...next]))
}

function toggleGroup(group: string) {
  const next = new Set(collapsedGroups.value)
  next.has(group) ? next.delete(group) : next.add(group)
  collapsedGroups.value = next
}

function showCalendarContextMenu(cal: DockCalendar, event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  contextMenuCal.value = cal
  contextMenuPos.value = { x: event.clientX, y: event.clientY }
}

function closeContextMenu() {
  contextMenuCal.value = null
  contextMenuPos.value = null
}

function startRename(cal: DockCalendar) {
  renamingCal.value = cal.name
  renameTitle.value = cal.title
  closeContextMenu()
  nextTick(() => {
    const input = document.querySelector(`input[data-rename="${cal.name}"]`) as HTMLInputElement
    input?.focus()
    input?.select()
  })
}

async function finishRename(cal: DockCalendar) {
  const newTitle = renameTitle.value.trim()
  if (!newTitle || newTitle === cal.title) { renamingCal.value = null; return }
  try {
    await callApi('dock.api.calendars.update_calendar', { name: cal.name, title: newTitle })
    cal.title = newTitle
  } catch { /* ignore */ }
  renamingCal.value = null
}

function openShareModal(cal: DockCalendar) {
  closeContextMenu()
  shareCalendar.value = cal
  showShareModal.value = true
}

async function deleteCalendar(cal: DockCalendar) {
  closeContextMenu()
  if (cal.is_default) return
  try {
    await callApi('dock.api.calendars.delete_calendar', { name: cal.name })
    myCalendars.value = myCalendars.value.filter(c => c.name !== cal.name)
    await fetchEvents()
  } catch { /* ignore */ }
}

async function changeCalendarColor(cal: DockCalendar, color: string) {
  try {
    await callApi('dock.api.calendars.update_calendar', { name: cal.name, color })
    cal.color = color
  } catch { /* ignore */ }
}

function onCalendarCreated(cal: DockCalendar) {
  myCalendars.value = [...myCalendars.value, cal]
}

async function loadUserCalendars() {
  try {
    // Fetch fresh from API — boot data may not be ready in SPA mode
    const data = await callApi<{ user_calendars: DockCalendar[]; shared_calendars: DockCalendar[] }>(
      'dock.api.calendars.get_calendars'
    )
    myCalendars.value = data?.user_calendars ?? []
    sharedCalendars.value = data?.shared_calendars ?? []

    // If user has no calendars, auto-create a default
    if (!myCalendars.value.length) {
      const defaultCal = await callApi<DockCalendar>('dock.api.calendars.ensure_default_calendar')
      if (defaultCal?.name) {
        myCalendars.value = [{ ...defaultCal, is_default: 1, owner_user: '' } as DockCalendar]
      }
    }
  } catch {
    myCalendars.value = []
    sharedCalendars.value = []
  }
}

// ── Slot / create interactions ─────────────────────────────────────────────

function onSlotClick(day: Date, hour: number) {
  // Always open Dock's own create modal for native events
  createModalDate.value = day
  showCreateModal.value = true
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

// ── Watchers ───────────────────────────────────────────────────────────────

watch(view, v => {
  localStorage.setItem(STORAGE_VIEW, v)
  debouncedFetch()
  if (v === 'week' || v === 'day') scrollToCurrentTime()
})
watch(weekStart, () => { if (view.value === 'week') debouncedFetch() })
watch(monthStart, () => { if (view.value === 'month') debouncedFetch() })
watch(currentDate, () => {
  if (view.value === 'day' || view.value === 'agenda') debouncedFetch()
})

onMounted(async () => {
  const params = new URLSearchParams(window.location.search)
  urlSource.value = params.get('source')
  urlRef.value    = params.get('ref')
  await loadUserCalendars()
  await fetchEvents()
  if (view.value === 'week' || view.value === 'day') scrollToCurrentTime()
  clockTimer = setInterval(() => { now.value = new Date() }, 60000)
  // Close context menu on click outside
  document.addEventListener('click', closeContextMenu)
})

onUnmounted(() => {
  clearInterval(clockTimer)
  if (fetchTimer) clearTimeout(fetchTimer)
  document.removeEventListener('click', closeContextMenu)
})

</script>

<template>
  <div class="flex" style="height: calc(100vh - 56px)">

    <!-- Sidebar -->
    <aside class="w-52 shrink-0 border-r border-[var(--dock-border)] flex flex-col overflow-y-auto">
      <div class="p-3">
        <button
          class="flex items-center gap-1.5 w-full px-3 py-2 rounded-lg text-sm font-medium
                 border border-[var(--dock-border)] text-[var(--dock-text)]
                 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          @click="openCreateModal()"
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
              isToday(day.date) ? 'text-white font-semibold'
                : isInCurrentWeek(day.date) && view === 'week' ? 'bg-black/5 dark:bg-white/10 text-[var(--dock-text)]'
                : day.currentMonth ? 'text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10'
                : 'text-[var(--dock-icon)] opacity-40',
            ]"
            :style="isToday(day.date) ? { backgroundColor: 'var(--app-accent-500)' } : {}"
            @click="jumpToDay(day.date)"
          >
            {{ day.date.getDate() }}
          </button>
        </div>
      </div>

      <!-- Calendar groups -->
      <div class="px-3 flex-1 space-y-3">

        <!-- + Add calendar -->
        <button
          class="flex items-center gap-1 text-[10px] font-medium text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
          @click="showCreateCalendar = true"
        >
          <Plus class="w-3 h-3" />
          {{ __('Add calendar') }}
        </button>

        <!-- MY CALENDARS -->
        <div v-if="myCalendars.length">
          <button
            class="flex items-center gap-1 mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--dock-icon)] hover:text-[var(--dock-text)] select-none"
            @click="toggleGroup('my')"
          >
            <ChevronRight class="w-2.5 h-2.5 transition-transform" :class="collapsedGroups.has('my') ? '' : 'rotate-90'" />
            {{ __('My calendars') }}
          </button>
          <template v-if="!collapsedGroups.has('my')">
            <div
              v-for="cal in myCalendars" :key="cal.name"
              class="flex items-center gap-2 mb-1.5 group"
            >
              <!-- Toggle checkbox -->
              <button
                class="w-3.5 h-3.5 rounded-sm shrink-0 border-2 flex items-center justify-center cursor-pointer"
                :style="hiddenCals.has(cal.name)
                  ? { borderColor: cal.color, backgroundColor: 'transparent' }
                  : { borderColor: cal.color, backgroundColor: cal.color }"
                @click="toggleCalendar(cal.name)"
              >
                <svg v-if="!hiddenCals.has(cal.name)" viewBox="0 0 8 8" class="w-2 h-2 fill-none stroke-white stroke-[1.5]">
                  <polyline points="1,4 3,6 7,2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <!-- Name (or inline rename) -->
              <input
                v-if="renamingCal === cal.name"
                :data-rename="cal.name"
                v-model="renameTitle"
                type="text"
                class="flex-1 text-xs px-1 py-0.5 rounded border border-[var(--dock-border)] bg-[var(--dock-bg)] text-[var(--dock-text)]
                       focus:outline-none focus:border-[var(--dock-icon)]"
                @keydown.enter="finishRename(cal)"
                @keydown.escape="renamingCal = null"
                @blur="finishRename(cal)"
              />
              <span
                v-else
                class="flex-1 text-xs text-[var(--dock-text)] truncate cursor-pointer select-none"
                @click="toggleCalendar(cal.name)"
              >{{ cal.title }}</span>
              <!-- Context menu trigger -->
              <button
                class="p-0.5 rounded opacity-0 group-hover:opacity-100 text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-opacity"
                @click.stop="showCalendarContextMenu(cal, $event)"
              >
                <MoreHorizontal class="w-3 h-3" />
              </button>
            </div>
          </template>
        </div>

        <!-- SHARED WITH ME -->
        <div v-if="sharedCalendars.length">
          <button
            class="flex items-center gap-1 mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--dock-icon)] hover:text-[var(--dock-text)] select-none"
            @click="toggleGroup('shared')"
          >
            <ChevronRight class="w-2.5 h-2.5 transition-transform" :class="collapsedGroups.has('shared') ? '' : 'rotate-90'" />
            {{ __('Shared with me') }}
          </button>
          <template v-if="!collapsedGroups.has('shared')">
            <div
              v-for="cal in sharedCalendars" :key="cal.name"
              class="flex items-center gap-2 mb-1.5"
            >
              <button
                class="w-3.5 h-3.5 rounded-sm shrink-0 border-2 flex items-center justify-center cursor-pointer"
                :style="hiddenCals.has(cal.name)
                  ? { borderColor: cal.color, backgroundColor: 'transparent' }
                  : { borderColor: cal.color, backgroundColor: cal.color }"
                @click="toggleCalendar(cal.name)"
              >
                <svg v-if="!hiddenCals.has(cal.name)" viewBox="0 0 8 8" class="w-2 h-2 fill-none stroke-white stroke-[1.5]">
                  <polyline points="1,4 3,6 7,2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <span
                class="flex-1 text-xs text-[var(--dock-text)] truncate cursor-pointer select-none"
                @click="toggleCalendar(cal.name)"
              >{{ cal.owner_name }} — {{ cal.title }}</span>
            </div>
          </template>
        </div>

        <!-- APPS -->
        <div v-if="(calendarSources as CalendarSource[]).length">
          <button
            class="flex items-center gap-1 mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--dock-icon)] hover:text-[var(--dock-text)] select-none"
            @click="toggleGroup('apps')"
          >
            <ChevronRight class="w-2.5 h-2.5 transition-transform" :class="collapsedGroups.has('apps') ? '' : 'rotate-90'" />
            {{ __('Apps') }}
          </button>
          <template v-if="!collapsedGroups.has('apps')">
            <div
              v-for="src in (calendarSources as CalendarSource[])" :key="src.app"
              class="flex items-center gap-2 mb-1.5 cursor-pointer select-none"
              role="checkbox" :aria-checked="!hiddenApps.has(src.app)"
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
          </template>
        </div>
      </div>
    </aside>

    <!-- Calendar context menu -->
    <Teleport to="body">
      <div
        v-if="contextMenuCal && contextMenuPos"
        class="fixed z-50 w-40 rounded-lg shadow-xl border border-[var(--dock-border)] bg-[var(--dock-bg)] py-1"
        :style="{ top: `${contextMenuPos.y}px`, left: `${contextMenuPos.x}px` }"
        @click.stop
      >
        <button
          class="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10"
          @click="startRename(contextMenuCal!)"
        >
          <Pencil class="w-3 h-3 text-[var(--dock-icon)]" />
          {{ __('Rename') }}
        </button>
        <button
          class="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10"
          @click="openShareModal(contextMenuCal!)"
        >
          <Share2 class="w-3 h-3 text-[var(--dock-icon)]" />
          {{ __('Share...') }}
        </button>
        <button
          v-if="!contextMenuCal!.is_default"
          class="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          @click="deleteCalendar(contextMenuCal!)"
        >
          <Trash2 class="w-3 h-3" />
          {{ __('Delete') }}
        </button>
      </div>
    </Teleport>

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
          {{
            view === 'week' ? weekLabel
            : view === 'month' ? monthLabel
            : view === 'day' ? dayLabel
            : agendaLabel
          }}
        </h2>
        <div class="ml-auto flex items-center gap-2">
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                   text-white hover:opacity-90 transition-opacity"
            :style="{ backgroundColor: 'var(--app-accent-600)' }"
            @click="openCreateModal()"
          >
            <Plus class="w-3.5 h-3.5" />
            {{ __('New Event') }}
          </button>
          <div class="flex rounded-md border border-[var(--dock-border)] overflow-hidden" role="tablist">
            <button
              v-for="v in (['week', 'month', 'day', 'agenda'] as CalendarView[])" :key="v"
              role="tab" :aria-selected="view === v"
              class="px-3 py-1 text-xs font-medium transition-colors capitalize"
              :class="view === v ? 'text-white' : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
              :style="view === v ? { backgroundColor: 'var(--app-accent-600)' } : {}"
              @click="view = v"
            >
              {{ __(v === 'week' ? 'Week' : v === 'month' ? 'Month' : v === 'day' ? 'Day' : 'Agenda') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Week view -->
      <template v-if="view === 'week'">
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
              :class="isToday(day) ? 'text-white' : 'text-[var(--dock-text)]'"
              :style="isToday(day) ? { backgroundColor: 'var(--app-accent-500)' } : {}"
            >{{ day.getDate() }}</div>
          </div>
        </div>
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
        <div ref="gridRef" class="flex-1 overflow-y-auto" :class="{ 'opacity-60': loading }">
          <div class="flex" :style="{ height: `${HOUR_HEIGHT * 24}px` }">
            <div class="w-14 shrink-0 relative select-none">
              <div
                v-for="h in 23" :key="h"
                class="absolute right-2 text-[10px] text-[var(--dock-icon)] leading-none"
                :style="{ top: `${h * HOUR_HEIGHT - 6}px` }"
              >{{ String(h).padStart(2, '0') }}:00</div>
            </div>
            <div
              v-for="day in weekDays" :key="dateKey(day)"
              class="flex-1 relative border-l border-[var(--dock-border)]"
              role="gridcell"
            >
              <div
                v-for="h in 24" :key="h"
                class="absolute w-full border-t border-[var(--dock-border)] opacity-40 pointer-events-none"
                :style="{ top: `${(h - 1) * HOUR_HEIGHT}px` }"
              />
              <div
                v-if="isToday(day)"
                class="absolute w-full h-px bg-red-400 z-10 pointer-events-none"
                :style="{ top: `${currentTimeTop}px` }"
              />
              <div
                v-for="{ event: ev, col, totalCols } in layoutDay(timedEventsForDay(day))" :key="ev.name"
                role="button"
                :aria-label="`${ev.title} · ${formatTime(ev.start_datetime)} · ${ev.source_app}`"
                class="absolute rounded px-1 py-0.5 cursor-pointer text-white
                       overflow-hidden hover:opacity-90 transition-opacity z-20"
                :style="{
                  top: `${eventTop(ev)}px`,
                  height: `${eventHeight(ev)}px`,
                  left: `${(col / totalCols) * 100}%`,
                  width: `calc(${(1 / totalCols) * 100}% - 2px)`,
                  backgroundColor: eventColor(ev),
                }"
                @click.stop="selectedEvent = ev"
              >
                <div class="text-[10px] font-medium truncate leading-tight">{{ ev.title }}</div>
                <div v-if="eventHeight(ev) >= 30" class="text-[9px] opacity-75">{{ formatTime(ev.start_datetime) }}</div>
              </div>
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

      <!-- Day view -->
      <template v-else-if="view === 'day'">
        <div class="flex border-b border-[var(--dock-border)] shrink-0">
          <div class="w-14 shrink-0" />
          <div class="flex-1 text-center py-1 border-l border-[var(--dock-border)]" role="columnheader">
            <div class="text-[10px] text-[var(--dock-icon)]">{{ currentDate.toLocaleString('default', { weekday: 'long' }) }}</div>
            <div
              class="w-6 h-6 mx-auto rounded-full flex items-center justify-center text-sm font-semibold"
              :class="isToday(currentDate) ? 'text-white' : 'text-[var(--dock-text)]'"
              :style="isToday(currentDate) ? { backgroundColor: 'var(--app-accent-500)' } : {}"
            >{{ currentDate.getDate() }}</div>
          </div>
        </div>
        <div class="flex border-b border-[var(--dock-border)] shrink-0 min-h-[24px]">
          <div class="w-14 shrink-0 flex items-center justify-end pr-2">
            <span class="text-[9px] text-[var(--dock-icon)]">{{ __('All day') }}</span>
          </div>
          <div class="flex-1 border-l border-[var(--dock-border)] p-0.5">
            <div
              v-for="ev in allDayEventsForDay(currentDate)" :key="ev.name"
              role="button" :aria-label="`${ev.title} · ${ev.source_app}`"
              class="text-[10px] text-white rounded px-1 truncate mb-0.5 cursor-pointer hover:opacity-90"
              :style="{ backgroundColor: eventColor(ev) }"
              @click="selectedEvent = ev"
            >{{ ev.title }}</div>
          </div>
        </div>
        <div ref="gridRef" class="flex-1 overflow-y-auto" :class="{ 'opacity-60': loading }">
          <div class="flex" :style="{ height: `${HOUR_HEIGHT * 24}px` }">
            <div class="w-14 shrink-0 relative select-none">
              <div
                v-for="h in 23" :key="h"
                class="absolute right-2 text-[10px] text-[var(--dock-icon)] leading-none"
                :style="{ top: `${h * HOUR_HEIGHT - 6}px` }"
              >{{ String(h).padStart(2, '0') }}:00</div>
            </div>
            <div class="flex-1 relative border-l border-[var(--dock-border)]" role="gridcell">
              <div
                v-for="h in 24" :key="h"
                class="absolute w-full border-t border-[var(--dock-border)] opacity-40 pointer-events-none"
                :style="{ top: `${(h - 1) * HOUR_HEIGHT}px` }"
              />
              <div
                v-if="isToday(currentDate)"
                class="absolute w-full h-px bg-red-400 z-10 pointer-events-none"
                :style="{ top: `${currentTimeTop}px` }"
              />
              <div
                v-for="{ event: ev, col, totalCols } in layoutDay(timedEventsForDay(currentDate))" :key="ev.name"
                role="button"
                :aria-label="`${ev.title} · ${formatTime(ev.start_datetime)} · ${ev.source_app}`"
                class="absolute rounded px-1 py-0.5 cursor-pointer text-white
                       overflow-hidden hover:opacity-90 transition-opacity z-20"
                :style="{
                  top: `${eventTop(ev)}px`,
                  height: `${eventHeight(ev)}px`,
                  left: `${(col / totalCols) * 100}%`,
                  width: `calc(${(1 / totalCols) * 100}% - 2px)`,
                  backgroundColor: eventColor(ev),
                }"
                @click.stop="selectedEvent = ev"
              >
                <div class="text-[10px] font-medium truncate leading-tight">{{ ev.title }}</div>
                <div v-if="eventHeight(ev) >= 30" class="text-[9px] opacity-75">{{ formatTime(ev.start_datetime) }}</div>
              </div>
              <div
                v-for="h in 24" :key="`s${h}`"
                class="absolute w-full cursor-pointer hover:bg-[var(--dock-icon)]/5"
                :style="{ top: `${(h - 1) * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }"
                @click="onSlotClick(currentDate, h - 1)"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- Month view -->
      <template v-else-if="view === 'month'">
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
                  :class="isToday(day.date) ? 'text-white' : 'text-[var(--dock-text)] hover:bg-black/5'"
                  :style="isToday(day.date) ? { backgroundColor: 'var(--app-accent-500)' } : {}"
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

      <!-- Agenda view -->
      <template v-else>
        <div class="flex-1 overflow-auto px-4 py-3" :class="{ 'opacity-60': loading }">
          <div v-if="!agendaDays.length" class="flex items-center justify-center h-32 text-sm text-[var(--dock-icon)]">
            {{ __('No events') }}
          </div>
          <div v-else class="space-y-4">
            <div v-for="group in agendaDays" :key="group.date">
              <div class="flex items-center gap-3 mb-1">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                  :class="group.date === dateKey(now) ? 'text-white' : 'bg-black/5 dark:bg-white/10 text-[var(--dock-text)]'"
                  :style="group.date === dateKey(now) ? { backgroundColor: 'var(--app-accent-500)' } : {}"
                >
                  {{ new Date(group.date + 'T00:00:00').getDate() }}
                </div>
                <div>
                  <div class="text-xs font-semibold text-[var(--dock-text)]">
                    {{ new Date(group.date + 'T00:00:00').toLocaleDateString([], { weekday: 'long' }) }}
                  </div>
                  <div class="text-[10px] text-[var(--dock-icon)]">
                    {{ new Date(group.date + 'T00:00:00').toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' }) }}
                  </div>
                </div>
              </div>
              <div class="ml-11 space-y-1">
                <button
                  v-for="ev in group.events" :key="ev.name"
                  role="button"
                  :aria-label="`${ev.title} · ${formatTime(ev.start_datetime)} · ${ev.source_app}`"
                  class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                         border border-[var(--dock-border)] bg-[var(--dock-bg)]
                         hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  @click="selectedEvent = ev"
                >
                  <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: eventColor(ev) }" />
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-[var(--dock-text)] truncate">{{ ev.title }}</div>
                    <div class="text-[10px] text-[var(--dock-icon)]">
                      <span v-if="ev.all_day">{{ __('All day') }}</span>
                      <span v-else>{{ formatTime(ev.start_datetime) }}<span v-if="ev.end_datetime"> – {{ formatTime(ev.end_datetime) }}</span></span>
                      <span class="ml-2">· {{ ev.source_app }}</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Manager Panel -->
    <DockEventManagerPanel
      v-if="selectedEvent"
      :event="selectedEvent as unknown as DockEventType"
      @close="selectedEvent = null"
      @deleted="onEventDeleted"
    />

    <!-- (create picker removed — calendar dropdown in create modal replaces it) -->

    <DockCreateEventModal
      :show="showCreateModal"
      :initial-date="createModalDate"
      :calendars="[...myCalendars, ...sharedCalendars.filter(c => c.role === 'Edit' || c.role === 'Manage')]"
      @close="showCreateModal = false"
      @created="onEventCreated"
    />

    <CreateCalendarPopover
      :show="showCreateCalendar"
      :used-colors="myCalendars.map(c => c.color)"
      @close="showCreateCalendar = false"
      @created="onCalendarCreated"
    />

    <ShareCalendarModal
      :show="showShareModal"
      :calendar="shareCalendar"
      @close="showShareModal = false"
      @updated="loadUserCalendars"
    />
  </div>
</template>
