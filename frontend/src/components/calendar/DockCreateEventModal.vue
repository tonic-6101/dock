<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Full calendar create modal — Title, Type, Time, Location, Meeting URL, Attendees, Description.
-->
<script lang="ts">
export default { name: 'DockCreateEventModal' }
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { X, Loader2, Search, UserPlus, UserMinus } from 'lucide-vue-next'
import { callApi } from '@/composables/useApi'
import { __ } from '@/composables/useTranslate'
import type { DockEvent } from '@/types/dock'

interface Props {
  show: boolean
  initialDate?: Date | null
}

interface AttendeeEntry {
  user: string
  full_name: string
  required: boolean
}

interface EventForm {
  title: string
  event_type: string
  all_day: boolean
  start_datetime: string
  end_datetime: string
  location: string
  meeting_url: string
  description: string
  attendees: AttendeeEntry[]
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  initialDate: null,
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'created', event: DockEvent): void
}>()

const EVENT_TYPES = ['Meeting', 'Deadline', 'Review', 'Milestone', 'Other']

const form = ref<EventForm>({
  title: '',
  event_type: 'Meeting',
  all_day: false,
  start_datetime: '',
  end_datetime: '',
  location: '',
  meeting_url: '',
  description: '',
  attendees: [],
})

const saving = ref(false)
const error = ref<string | null>(null)

// Attendee search
const attendeeQuery = ref('')
const attendeeResults = ref<{ user: string; full_name: string }[]>([])
const searchingAttendees = ref(false)
let searchTimer: ReturnType<typeof setTimeout> | null = null

function fmt(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function resetDates() {
  const base = props.initialDate ? new Date(props.initialDate) : new Date()
  base.setMinutes(0, 0, 0)
  const end = new Date(base)
  end.setHours(end.getHours() + 1)
  form.value.start_datetime = fmt(base)
  form.value.end_datetime = fmt(end)
}

function resetForm() {
  form.value = {
    title: '', event_type: 'Meeting', all_day: false,
    start_datetime: '', end_datetime: '',
    location: '', meeting_url: '', description: '', attendees: [],
  }
  resetDates()
  error.value = null
  attendeeQuery.value = ''
  attendeeResults.value = []
}

watch(() => props.show, (val) => { if (val) resetDates() })

// Keep end ≥ start + 1h when start changes
watch(() => form.value.start_datetime, (newStart, oldStart) => {
  if (!newStart || !oldStart || !form.value.end_datetime) return
  const startMs = new Date(newStart).getTime()
  const endMs = new Date(form.value.end_datetime).getTime()
  const oldMs = new Date(oldStart).getTime()
  if (startMs >= endMs) {
    const dur = Math.max(endMs - oldMs, 3_600_000)
    form.value.end_datetime = fmt(new Date(startMs + dur))
  }
})

// Attendee search
function onAttendeeSearch() {
  if (searchTimer) clearTimeout(searchTimer)
  const q = attendeeQuery.value.trim()
  if (q.length < 2) { attendeeResults.value = []; return }
  searchTimer = setTimeout(async () => {
    searchingAttendees.value = true
    try {
      const results = await callApi<{ user: string; full_name: string }[]>(
        'dock.api.people.search_users', { query: q, limit: 8 }
      )
      // Filter out already-added attendees
      const added = new Set(form.value.attendees.map(a => a.user))
      attendeeResults.value = (results || []).filter(r => !added.has(r.user))
    } catch {
      attendeeResults.value = []
    } finally {
      searchingAttendees.value = false
    }
  }, 200)
}

function addAttendee(user: string, full_name: string) {
  if (form.value.attendees.some(a => a.user === user)) return
  form.value.attendees.push({ user, full_name, required: true })
  attendeeQuery.value = ''
  attendeeResults.value = []
}

function removeAttendee(user: string) {
  form.value.attendees = form.value.attendees.filter(a => a.user !== user)
}

function toggleRequired(user: string) {
  const att = form.value.attendees.find(a => a.user === user)
  if (att) att.required = !att.required
}

function getInitials(name: string): string {
  if (!name) return '?'
  const parts = name.split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.substring(0, 2).toUpperCase()
}

async function handleSubmit() {
  error.value = null
  if (!form.value.title.trim()) { error.value = __('Title is required'); return }
  if (!form.value.start_datetime) { error.value = __('Start date/time is required'); return }

  saving.value = true
  try {
    const toFrappeStr = (s: string) => s.replace('T', ' ')
    const created = await callApi<DockEvent>('dock.api.calendar.create_event', {
      title: form.value.title.trim(),
      start_datetime: toFrappeStr(form.value.start_datetime),
      end_datetime: form.value.end_datetime ? toFrappeStr(form.value.end_datetime) : null,
      all_day: form.value.all_day ? 1 : 0,
      event_type: form.value.event_type,
      description: form.value.description || null,
      location: form.value.location || null,
      meeting_url: form.value.meeting_url || null,
      attendees: JSON.stringify(form.value.attendees.map(a => ({
        user: a.user,
        required: a.required ? 1 : 0,
      }))),
    })
    emit('created', created)
    resetForm()
    emit('close')
  } catch (e) {
    error.value = (e as Error).message || __('Failed to create event')
  } finally {
    saving.value = false
  }
}

function handleClose() {
  resetForm()
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      :aria-label="__('New Event')"
      @click.self="handleClose"
    >
      <div class="absolute inset-0 bg-black/40 dark:bg-black/60" @click="handleClose" />

      <div class="relative w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto
                  rounded-xl shadow-2xl border border-[var(--dock-border)]
                  bg-[var(--dock-bg)]">
        <form @submit.prevent="handleSubmit" class="p-6">

          <!-- Header -->
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-base font-semibold text-[var(--dock-text)]">{{ __('New Event') }}</h2>
            <button
              type="button"
              class="p-1 rounded text-[var(--dock-icon)] hover:text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10"
              @click="handleClose"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Error -->
          <div
            v-if="error"
            class="mb-4 px-3 py-2 rounded-lg text-sm
                   bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800
                   text-red-700 dark:text-red-300"
          >{{ error }}</div>

          <div class="space-y-4">

            <!-- Title -->
            <div>
              <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">
                {{ __('Title') }} <span class="text-red-400">*</span>
              </label>
              <input
                v-model="form.title"
                type="text"
                :placeholder="__('Meeting title')"
                autofocus
                class="w-full px-3 py-2 rounded-lg text-sm
                       border border-[var(--dock-border)] bg-[var(--dock-bg)]
                       text-[var(--dock-text)] placeholder-[var(--dock-icon)]
                       focus:outline-none focus:border-[var(--dock-icon)] transition-colors"
              />
            </div>

            <!-- Type + All day -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">{{ __('Event Type') }}</label>
                <select
                  v-model="form.event_type"
                  class="w-full px-3 py-2 rounded-lg text-sm
                         border border-[var(--dock-border)] bg-[var(--dock-bg)]
                         text-[var(--dock-text)]
                         focus:outline-none focus:border-[var(--dock-icon)]"
                >
                  <option v-for="t in EVENT_TYPES" :key="t" :value="t">{{ __(t) }}</option>
                </select>
              </div>
              <div class="flex items-end pb-1">
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    v-model="form.all_day"
                    type="checkbox"
                    class="w-4 h-4 rounded border-[var(--dock-border)] accent-[var(--dock-icon)]"
                  />
                  <span class="text-sm text-[var(--dock-text)]">{{ __('All day event') }}</span>
                </label>
              </div>
            </div>

            <!-- Start / End -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">
                  {{ __('Start') }} <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="form.start_datetime"
                  :type="form.all_day ? 'date' : 'datetime-local'"
                  class="w-full px-3 py-2 rounded-lg text-sm
                         border border-[var(--dock-border)] bg-[var(--dock-bg)]
                         text-[var(--dock-text)]
                         focus:outline-none focus:border-[var(--dock-icon)]"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">{{ __('End') }}</label>
                <input
                  v-model="form.end_datetime"
                  :type="form.all_day ? 'date' : 'datetime-local'"
                  class="w-full px-3 py-2 rounded-lg text-sm
                         border border-[var(--dock-border)] bg-[var(--dock-bg)]
                         text-[var(--dock-text)]
                         focus:outline-none focus:border-[var(--dock-icon)]"
                />
              </div>
            </div>

            <!-- Location + Meeting URL -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">{{ __('Location') }}</label>
                <input
                  v-model="form.location"
                  type="text"
                  :placeholder="__('Room or address')"
                  class="w-full px-3 py-2 rounded-lg text-sm
                         border border-[var(--dock-border)] bg-[var(--dock-bg)]
                         text-[var(--dock-text)] placeholder-[var(--dock-icon)]
                         focus:outline-none focus:border-[var(--dock-icon)] transition-colors"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">{{ __('Meeting URL') }}</label>
                <input
                  v-model="form.meeting_url"
                  type="url"
                  placeholder="https://..."
                  class="w-full px-3 py-2 rounded-lg text-sm
                         border border-[var(--dock-border)] bg-[var(--dock-bg)]
                         text-[var(--dock-text)] placeholder-[var(--dock-icon)]
                         focus:outline-none focus:border-[var(--dock-icon)] transition-colors"
                />
              </div>
            </div>

            <!-- Invite People -->
            <div>
              <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">{{ __('Invite People') }}</label>

              <!-- Selected attendees -->
              <div v-if="form.attendees.length" class="space-y-1.5 mb-2">
                <div
                  v-for="att in form.attendees"
                  :key="att.user"
                  class="flex items-center justify-between px-2.5 py-1.5 rounded-lg
                         bg-black/[0.03] dark:bg-white/[0.03] border border-[var(--dock-border)]"
                >
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="w-6 h-6 rounded-full bg-[var(--dock-icon)]/20 text-[var(--dock-icon)]
                                 text-[10px] font-semibold flex items-center justify-center shrink-0">
                      {{ getInitials(att.full_name) }}
                    </span>
                    <span class="text-sm text-[var(--dock-text)] truncate">{{ att.full_name }}</span>
                  </div>
                  <div class="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      class="text-[10px] px-1.5 py-0.5 rounded transition-colors"
                      :class="att.required
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'"
                      @click="toggleRequired(att.user)"
                    >
                      {{ att.required ? __('required') : __('optional') }}
                    </button>
                    <button
                      type="button"
                      class="p-0.5 text-[var(--dock-icon)] hover:text-red-500 transition-colors"
                      @click="removeAttendee(att.user)"
                    >
                      <UserMinus class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Search input -->
              <div class="relative">
                <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--dock-icon)]" />
                <input
                  v-model="attendeeQuery"
                  type="text"
                  :placeholder="__('Search for people to invite...')"
                  class="w-full pl-8 pr-3 py-2 rounded-lg text-sm
                         border border-[var(--dock-border)] bg-[var(--dock-bg)]
                         text-[var(--dock-text)] placeholder-[var(--dock-icon)]
                         focus:outline-none focus:border-[var(--dock-icon)] transition-colors"
                  @input="onAttendeeSearch"
                />
              </div>

              <!-- Search results -->
              <div
                v-if="attendeeResults.length || searchingAttendees"
                class="mt-1 border border-[var(--dock-border)] rounded-lg overflow-hidden"
              >
                <div v-if="searchingAttendees" class="p-3 text-center">
                  <Loader2 class="w-4 h-4 animate-spin text-[var(--dock-icon)] mx-auto" />
                </div>
                <button
                  v-for="r in attendeeResults"
                  :key="r.user"
                  type="button"
                  class="w-full flex items-center gap-2 px-3 py-2 text-left
                         hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  @click="addAttendee(r.user, r.full_name)"
                >
                  <span class="w-6 h-6 rounded-full bg-[var(--dock-icon)]/20 text-[var(--dock-icon)]
                               text-[10px] font-semibold flex items-center justify-center shrink-0">
                    {{ getInitials(r.full_name) }}
                  </span>
                  <div class="min-w-0">
                    <p class="text-sm text-[var(--dock-text)] m-0 truncate">{{ r.full_name }}</p>
                    <p class="text-xs text-[var(--dock-icon)] m-0 truncate">{{ r.user }}</p>
                  </div>
                  <UserPlus class="w-3.5 h-3.5 text-[var(--dock-icon)] shrink-0 ml-auto" />
                </button>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">{{ __('Description') }}</label>
              <textarea
                v-model="form.description"
                rows="3"
                :placeholder="__('Add details about this event...')"
                class="w-full px-3 py-2 rounded-lg text-sm resize-none
                       border border-[var(--dock-border)] bg-[var(--dock-bg)]
                       text-[var(--dock-text)] placeholder-[var(--dock-icon)]
                       focus:outline-none focus:border-[var(--dock-icon)]"
              />
            </div>

          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-2 mt-6 pt-4 border-t border-[var(--dock-border)]">
            <button
              type="button"
              :disabled="saving"
              class="px-4 py-2 text-sm rounded-lg
                     border border-[var(--dock-border)] text-[var(--dock-text)]
                     hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              @click="handleClose"
            >{{ __('Cancel') }}</button>
            <button
              type="submit"
              :disabled="saving"
              class="px-4 py-2 text-sm rounded-lg font-medium
                     bg-[var(--dock-icon)] text-white
                     hover:opacity-90 transition-opacity
                     flex items-center gap-1.5 disabled:opacity-60"
            >
              <Loader2 v-if="saving" class="w-3.5 h-3.5 animate-spin" />
              <span>{{ saving ? __('Creating...') : __('Create Event') }}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  </Teleport>
</template>
