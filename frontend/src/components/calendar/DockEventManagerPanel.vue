<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Full event manager panel — 4 tabs: Details, Attendees, Context (app-contributed), Actions.
-->
<script lang="ts">
export default { name: 'DockEventManagerPanel' }
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import {
  CalendarDays, FileText, Users, Layers, Zap,
  ExternalLink, Loader2, Trash2, X, Info,
  MapPin, Video, Check, Clock, HelpCircle, XCircle,
  CheckCircle, Ban, ChevronDown, ChevronRight,
} from 'lucide-vue-next'
import { callApi } from '@/composables/useApi'
import { __ } from '@/composables/useTranslate'
import type { DockEvent, DockEventAttendee, DockContextPanel } from '@/types/dock'

interface Props {
  event: DockEvent
}

interface Tab {
  id: string
  label: string
  icon: string
  hidden?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'deleted', name: string): void
  (e: 'updated'): void
}>()

// ── State ────────────────────────────────────────────────────────────────────

const activeTab = ref('details')
const deleting = ref(false)
const deleteErr = ref<string | null>(null)

// Full event detail (with attendees + context)
const eventDetail = ref<DockEvent | null>(null)
const loading = ref(false)
const contextPanels = ref<DockContextPanel[]>([])
const expandedPanels = ref<Set<number>>(new Set([0]))  // first panel expanded
const rsvpLoading = ref(false)
const statusLoading = ref(false)

const TABS = computed<Tab[]>(() => [
  { id: 'details', label: __('Details'), icon: 'details' },
  { id: 'attendees', label: __('Attendees'), icon: 'attendees' },
  { id: 'context', label: __('Context'), icon: 'context', hidden: contextPanels.value.length === 0 },
  { id: 'actions', label: __('Actions'), icon: 'actions' },
])

const visibleTabs = computed(() => TABS.value.filter(t => !t.hidden))

const ev = computed(() => eventDetail.value || props.event)
const isNativeEvent = computed(() => ev.value?.source_app === 'dock')
const sourceLabel = computed(() => {
  const a = ev.value?.source_app ?? ''
  return a.charAt(0).toUpperCase() + a.slice(1)
})
const currentUser = computed(() => (window as any).frappe?.session?.user ?? '')

// Check if current user is an attendee (for RSVP)
const myAttendee = computed(() =>
  (ev.value?.attendees || []).find((a: DockEventAttendee) => a.user === currentUser.value)
)

// ── Data loading ─────────────────────────────────────────────────────────────

async function loadDetail() {
  loading.value = true
  try {
    const result = await callApi<DockEvent>('dock.api.calendar.get_event_detail', { name: props.event.name })
    eventDetail.value = result
    contextPanels.value = result.context_panels || []
  } catch (e) {
    console.error('Failed to load event detail:', e)
    eventDetail.value = props.event
  } finally {
    loading.value = false
  }
}

watch(() => props.event?.name, () => {
  activeTab.value = 'details'
  deleteErr.value = null
  loadDetail()
}, { immediate: true })

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmtDatetime(dt: string | null | undefined): string {
  if (!dt) return '—'
  return new Date(dt).toLocaleString([], {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function fmtDate(dt: string | null | undefined): string {
  if (!dt) return '—'
  return new Date(dt).toLocaleDateString([], {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

function rsvpColor(status: string): string {
  switch (status) {
    case 'Accepted': return 'text-green-600 dark:text-green-400'
    case 'Declined': return 'text-red-500 dark:text-red-400'
    case 'Tentative': return 'text-amber-500 dark:text-amber-400'
    default: return 'text-gray-400 dark:text-gray-500'
  }
}

function rsvpIcon(status: string) {
  switch (status) {
    case 'Accepted': return CheckCircle
    case 'Declined': return XCircle
    case 'Tentative': return HelpCircle
    default: return Clock
  }
}

function statusColor(status: string): string {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  }
}

function getInitials(name: string): string {
  if (!name) return '?'
  const parts = name.split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.substring(0, 2).toUpperCase()
}

function togglePanel(idx: number) {
  const next = new Set(expandedPanels.value)
  next.has(idx) ? next.delete(idx) : next.add(idx)
  expandedPanels.value = next
}

// ── Actions ──────────────────────────────────────────────────────────────────

async function handleRsvp(status: 'Accepted' | 'Declined' | 'Tentative') {
  rsvpLoading.value = true
  try {
    await callApi('dock.api.calendar.update_rsvp', { event_name: ev.value.name, status })
    await loadDetail()
    emit('updated')
  } catch (e) {
    console.error('RSVP failed:', e)
  } finally {
    rsvpLoading.value = false
  }
}

async function handleStatus(status: 'Scheduled' | 'Completed' | 'Cancelled') {
  statusLoading.value = true
  try {
    await callApi('dock.api.calendar.update_status', { event_name: ev.value.name, status })
    await loadDetail()
    emit('updated')
  } catch (e) {
    console.error('Status change failed:', e)
  } finally {
    statusLoading.value = false
  }
}

async function handleDelete() {
  if (!confirm(__('Delete this event? This cannot be undone.'))) return
  deleting.value = true
  deleteErr.value = null
  try {
    await callApi('dock.api.calendar.delete_event', { name: ev.value.name })
    emit('deleted', ev.value.name)
    emit('close')
  } catch (e) {
    deleteErr.value = (e as Error).message || __('Failed to delete event')
  } finally {
    deleting.value = false
  }
}
</script>

<template>
  <!-- Mobile backdrop -->
  <div
    class="dock-event-backdrop fixed inset-0 bg-black/50 z-30"
    @click="emit('close')"
  />

  <aside
    class="dock-event-panel fixed inset-y-0 right-0 w-full max-w-sm z-50
           bg-[var(--dock-bg)] border-l border-[var(--dock-border)]
           flex flex-col flex-shrink-0 overflow-hidden transition-all"
    role="dialog"
    :aria-label="ev.title"
  >

    <!-- Header -->
    <div class="p-4 border-b border-[var(--dock-border)] flex items-center justify-between shrink-0">
      <h3 class="font-semibold text-[var(--dock-text)] m-0 flex items-center gap-2 min-w-0">
        <CalendarDays class="w-4 h-4 shrink-0 text-[var(--dock-icon)]" />
        <span class="truncate">{{ ev.title }}</span>
      </h3>
      <div class="flex items-center gap-1.5 shrink-0">
        <span
          v-if="ev.status"
          class="text-[10px] font-semibold px-1.5 py-0.5 rounded"
          :class="statusColor(ev.status)"
        >{{ ev.status }}</span>
        <span class="text-xs text-[var(--dock-icon)]">{{ sourceLabel }}</span>
        <button
          class="p-1.5 text-[var(--dock-icon)] hover:text-[var(--dock-text)]
                 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          @click="emit('close')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Tab Bar -->
    <div class="border-b border-[var(--dock-border)] shrink-0">
      <div class="flex px-4" role="tablist">
        <button
          v-for="tab in visibleTabs"
          :key="tab.id"
          role="tab"
          :aria-selected="activeTab === tab.id"
          class="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium relative transition-colors"
          :class="activeTab === tab.id
            ? 'text-[var(--dock-icon)]'
            : 'text-[var(--dock-icon)] opacity-50 hover:opacity-80'"
          @click="activeTab = tab.id"
        >
          <FileText v-if="tab.icon === 'details'" class="w-3.5 h-3.5" />
          <Users v-else-if="tab.icon === 'attendees'" class="w-3.5 h-3.5" />
          <Layers v-else-if="tab.icon === 'context'" class="w-3.5 h-3.5" />
          <Zap v-else class="w-3.5 h-3.5" />
          {{ tab.label }}
          <div
            v-if="activeTab === tab.id"
            class="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[var(--dock-icon)]"
          />
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <Loader2 class="w-5 h-5 animate-spin text-[var(--dock-icon)]" />
    </div>

    <!-- Tab Content -->
    <div v-else class="flex-1 overflow-auto" role="tabpanel">
      <div class="p-4">

        <!-- ═══ DETAILS TAB ═══ -->
        <div v-show="activeTab === 'details'" class="space-y-4">

          <!-- When -->
          <div>
            <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">{{ __('When') }}</label>
            <template v-if="ev.all_day">
              <p class="mt-1 text-sm text-[var(--dock-text)]">
                {{ fmtDate(ev.start_datetime) }}
                <span class="ml-2 text-xs text-[var(--dock-icon)]">({{ __('All day') }})</span>
              </p>
            </template>
            <template v-else>
              <p class="mt-1 text-sm text-[var(--dock-text)]">{{ fmtDatetime(ev.start_datetime) }}</p>
              <p v-if="ev.end_datetime" class="text-sm text-[var(--dock-icon)]">→ {{ fmtDatetime(ev.end_datetime) }}</p>
            </template>
          </div>

          <!-- Location -->
          <div v-if="ev.location">
            <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">{{ __('Where') }}</label>
            <p class="mt-1 text-sm text-[var(--dock-text)] flex items-center gap-1.5">
              <MapPin class="w-3.5 h-3.5 text-[var(--dock-icon)] shrink-0" />
              {{ ev.location }}
            </p>
          </div>

          <!-- Meeting URL -->
          <div v-if="ev.meeting_url">
            <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">{{ __('Meeting') }}</label>
            <a
              :href="ev.meeting_url"
              target="_blank"
              rel="noopener"
              class="mt-1 text-sm text-[var(--dock-icon)] hover:text-[var(--dock-text)]
                     flex items-center gap-1.5 no-underline transition-colors"
            >
              <Video class="w-3.5 h-3.5 shrink-0" />
              {{ __('Join meeting →') }}
            </a>
          </div>

          <!-- Type -->
          <div v-if="ev.event_type">
            <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">{{ __('Type') }}</label>
            <p class="mt-1 text-sm text-[var(--dock-text)]">{{ ev.event_type }}</p>
          </div>

          <!-- Description -->
          <div v-if="ev.description">
            <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">{{ __('Description') }}</label>
            <p class="mt-1 text-sm text-[var(--dock-text)] whitespace-pre-wrap">{{ ev.description }}</p>
          </div>

          <!-- Source -->
          <div>
            <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">{{ __('Source') }}</label>
            <div class="mt-1 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full shrink-0" :style="{ background: ev.color || 'var(--dock-icon)' }" />
              <span class="text-sm text-[var(--dock-text)]">{{ sourceLabel }}</span>
            </div>
          </div>
        </div>

        <!-- ═══ ATTENDEES TAB ═══ -->
        <div v-show="activeTab === 'attendees'" class="space-y-4">

          <template v-if="(ev.attendees || []).length">
            <!-- Attendee list -->
            <div class="space-y-2">
              <div
                v-for="att in ev.attendees"
                :key="att.user"
                class="flex items-center gap-2.5 py-1.5"
              >
                <span class="w-7 h-7 rounded-full bg-[var(--dock-icon)]/20 text-[var(--dock-icon)]
                             text-[10px] font-semibold flex items-center justify-center shrink-0">
                  {{ getInitials(att.user_name || att.user) }}
                </span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-[var(--dock-text)] m-0 truncate">{{ att.user_name || att.user }}</p>
                  <p class="text-xs text-[var(--dock-icon)] m-0 truncate">{{ att.user }}</p>
                </div>
                <div class="flex items-center gap-1 shrink-0" :class="rsvpColor(att.rsvp_status)">
                  <component :is="rsvpIcon(att.rsvp_status)" class="w-3.5 h-3.5" />
                  <span class="text-xs font-medium">{{ att.rsvp_status }}</span>
                </div>
              </div>
            </div>

            <!-- My RSVP (for native events) -->
            <div v-if="myAttendee && isNativeEvent" class="pt-3 border-t border-[var(--dock-border)]">
              <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider mb-2 block">
                {{ __('Your response') }}
              </label>
              <div class="flex gap-2">
                <button
                  :disabled="rsvpLoading"
                  class="flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors"
                  :class="myAttendee.rsvp_status === 'Accepted'
                    ? 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400'
                    : 'border-[var(--dock-border)] text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/5'"
                  @click="handleRsvp('Accepted')"
                >{{ __('Accept') }}</button>
                <button
                  :disabled="rsvpLoading"
                  class="flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors"
                  :class="myAttendee.rsvp_status === 'Tentative'
                    ? 'bg-amber-100 border-amber-300 text-amber-700 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-400'
                    : 'border-[var(--dock-border)] text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/5'"
                  @click="handleRsvp('Tentative')"
                >{{ __('Maybe') }}</button>
                <button
                  :disabled="rsvpLoading"
                  class="flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors"
                  :class="myAttendee.rsvp_status === 'Declined'
                    ? 'bg-red-100 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-400'
                    : 'border-[var(--dock-border)] text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/5'"
                  @click="handleRsvp('Declined')"
                >{{ __('Decline') }}</button>
              </div>
            </div>

            <!-- RSVP link for sourced events -->
            <div v-else-if="myAttendee && !isNativeEvent && ev.url" class="pt-3 border-t border-[var(--dock-border)]">
              <a
                :href="ev.url"
                class="text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors no-underline"
              >{{ __('Respond in') }} {{ sourceLabel }} →</a>
            </div>
          </template>

          <!-- No attendees -->
          <div v-else class="text-center py-8">
            <Users class="w-8 h-8 text-[var(--dock-border)] mx-auto mb-3" />
            <p class="text-sm text-[var(--dock-icon)] m-0">{{ __('No attendees') }}</p>
          </div>
        </div>

        <!-- ═══ CONTEXT TAB ═══ -->
        <div v-show="activeTab === 'context'" class="space-y-3">
          <div
            v-for="(panel, idx) in contextPanels"
            :key="idx"
            class="border border-[var(--dock-border)] rounded-lg overflow-hidden"
          >
            <!-- Panel header -->
            <button
              class="w-full flex items-center gap-2 px-3 py-2.5 text-left
                     hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              @click="togglePanel(idx)"
            >
              <component
                :is="expandedPanels.has(idx) ? ChevronDown : ChevronRight"
                class="w-3.5 h-3.5 text-[var(--dock-icon)] shrink-0"
              />
              <span class="text-sm font-medium text-[var(--dock-text)]">{{ panel.label }}</span>
            </button>

            <!-- Panel body -->
            <div v-if="expandedPanels.has(idx)" class="px-3 pb-3 space-y-2">
              <div
                v-for="field in (panel.fields || [])"
                :key="field.label"
                class="flex justify-between text-sm"
              >
                <span class="text-[var(--dock-icon)]">{{ field.label }}</span>
                <span class="text-[var(--dock-text)] font-medium">{{ field.value }}</span>
              </div>
              <a
                v-if="panel.link"
                :href="panel.link"
                class="inline-flex items-center gap-1 text-xs text-[var(--dock-icon)]
                       hover:text-[var(--dock-text)] no-underline transition-colors mt-1"
              >
                <ExternalLink class="w-3 h-3" />
                {{ panel.link_label || (__('Open in') + ' ' + sourceLabel) }}
              </a>
            </div>
          </div>
        </div>

        <!-- ═══ ACTIONS TAB ═══ -->
        <div v-show="activeTab === 'actions'" class="space-y-2">

          <!-- Status change (event owner only) -->
          <div v-if="ev.user === currentUser" class="space-y-2 pb-3 border-b border-[var(--dock-border)]">
            <label class="text-[10px] font-semibold text-[var(--dock-icon)] uppercase tracking-wider">{{ __('Status') }}</label>
            <div class="flex gap-2">
              <button
                v-if="ev.status !== 'Completed'"
                :disabled="statusLoading"
                class="flex-1 py-1.5 text-xs font-medium rounded-lg
                       bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400
                       hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                @click="handleStatus('Completed')"
              >
                <CheckCircle class="w-3 h-3 inline mr-1" />{{ __('Complete') }}
              </button>
              <button
                v-if="ev.status !== 'Cancelled'"
                :disabled="statusLoading"
                class="flex-1 py-1.5 text-xs font-medium rounded-lg
                       bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400
                       hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                @click="handleStatus('Cancelled')"
              >
                <Ban class="w-3 h-3 inline mr-1" />{{ __('Cancel') }}
              </button>
              <button
                v-if="ev.status !== 'Scheduled'"
                :disabled="statusLoading"
                class="flex-1 py-1.5 text-xs font-medium rounded-lg
                       bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400
                       hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                @click="handleStatus('Scheduled')"
              >
                <CalendarDays class="w-3 h-3 inline mr-1" />{{ __('Reschedule') }}
              </button>
            </div>
          </div>

          <!-- Open in source app -->
          <a
            v-if="ev.url"
            :href="ev.url"
            class="w-full flex items-center gap-3 p-3 text-left
                   bg-black/5 dark:bg-white/5 rounded-lg
                   hover:bg-black/10 dark:hover:bg-white/10
                   transition-colors no-underline"
          >
            <ExternalLink class="w-4 h-4 text-[var(--dock-icon)] shrink-0" />
            <div>
              <p class="text-sm font-medium text-[var(--dock-text)] m-0">{{ __('Open in') }} {{ sourceLabel }}</p>
              <p class="text-xs text-[var(--dock-icon)] m-0">{{ __('View full details in the source app') }}</p>
            </div>
          </a>

          <!-- Delete (native events only) -->
          <template v-if="isNativeEvent">
            <div
              v-if="deleteErr"
              class="px-3 py-2 rounded-lg text-sm
                     bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800
                     text-red-700 dark:text-red-300"
            >{{ deleteErr }}</div>
            <button
              :disabled="deleting"
              class="w-full flex items-center gap-3 p-3 text-left
                     bg-red-50 dark:bg-red-900/20 rounded-lg
                     hover:bg-red-100 dark:hover:bg-red-900/30
                     transition-colors disabled:opacity-60"
              @click="handleDelete"
            >
              <Loader2 v-if="deleting" class="w-4 h-4 text-red-500 animate-spin shrink-0" />
              <Trash2 v-else class="w-4 h-4 text-red-500 shrink-0" />
              <div>
                <p class="text-sm font-medium text-red-700 dark:text-red-400 m-0">
                  {{ deleting ? __('Deleting…') : __('Delete Event') }}
                </p>
                <p class="text-xs text-red-500 dark:text-red-400 m-0">{{ __('Permanently remove this event') }}</p>
              </div>
            </button>
          </template>

          <!-- No actions for sourced events without URL -->
          <div
            v-if="!ev.url && !isNativeEvent"
            class="text-center py-8"
          >
            <Info class="w-8 h-8 text-[var(--dock-border)] mx-auto mb-3" />
            <p class="text-sm text-[var(--dock-icon)] m-0">{{ __('No actions available') }}</p>
            <p class="text-xs text-[var(--dock-icon)] opacity-60 mt-1">{{ __('Manage this event in') }} {{ sourceLabel }}</p>
          </div>
        </div>

      </div>
    </div>

  </aside>
</template>

<style scoped>
/* ── Desktop: panel is inline, backdrop hidden ── */
@media (min-width: 1024px) {
  .dock-event-backdrop {
    display: none;
  }
  .dock-event-panel {
    position: relative;
    z-index: auto;
    width: 20rem; /* w-80 */
    max-width: none;
    inset: auto;
    right: auto;
  }
}
</style>
