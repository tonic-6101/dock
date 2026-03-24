<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Modal for sharing a calendar with other users.
  People search + role picker + member list.
-->
<script lang="ts">
export default { name: 'ShareCalendarModal' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Loader2, Search, UserPlus, UserMinus, ChevronDown } from 'lucide-vue-next'
import { callApi } from '@/composables/useApi'
import { __ } from '@/composables/useTranslate'
import type { DockCalendar, DockCalendarMember } from '@/types/dock'

interface Props {
  show: boolean
  calendar: DockCalendar | null
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  calendar: null,
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'updated'): void
}>()

const ROLES = ['View', 'Edit', 'Manage'] as const

const members = ref<DockCalendarMember[]>([])
const loading = ref(false)
const addRole = ref<'View' | 'Edit' | 'Manage'>('Edit')
const searchQuery = ref('')
const searchResults = ref<{ user: string; full_name: string }[]>([])
const searching = ref(false)
let searchTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.show, async (val) => {
  if (val && props.calendar) {
    await fetchMembers()
    searchQuery.value = ''
    searchResults.value = []
  }
})

async function fetchMembers() {
  if (!props.calendar) return
  loading.value = true
  try {
    members.value = await callApi<DockCalendarMember[]>(
      'dock.api.calendars.get_calendar_members',
      { calendar: props.calendar.name },
    )
  } catch {
    members.value = []
  } finally {
    loading.value = false
  }
}

function onSearch() {
  if (searchTimer) clearTimeout(searchTimer)
  const q = searchQuery.value.trim()
  if (q.length < 2) { searchResults.value = []; return }
  searchTimer = setTimeout(async () => {
    searching.value = true
    try {
      const results = await callApi<{ user: string; full_name: string }[]>(
        'dock.api.people.search_users', { query: q, limit: 8 },
      )
      const existing = new Set(members.value.map(m => m.user))
      existing.add(props.calendar?.owner_user ?? '')
      searchResults.value = (results || []).filter(r => !existing.has(r.user))
    } catch {
      searchResults.value = []
    } finally {
      searching.value = false
    }
  }, 200)
}

async function addMember(user: string) {
  if (!props.calendar) return
  try {
    await callApi('dock.api.calendars.add_calendar_member', {
      calendar: props.calendar.name,
      user,
      role: addRole.value,
    })
    searchQuery.value = ''
    searchResults.value = []
    await fetchMembers()
    emit('updated')
  } catch (e) {
    // Silently handle — user sees the member list unchanged
  }
}

async function updateRole(user: string, role: string) {
  if (!props.calendar) return
  try {
    await callApi('dock.api.calendars.update_calendar_member', {
      calendar: props.calendar.name,
      user,
      role,
    })
    await fetchMembers()
    emit('updated')
  } catch {
    // Silently handle
  }
}

async function removeMember(user: string) {
  if (!props.calendar) return
  try {
    await callApi('dock.api.calendars.remove_calendar_member', {
      calendar: props.calendar.name,
      user,
    })
    await fetchMembers()
    emit('updated')
  } catch {
    // Silently handle
  }
}

function getInitials(name: string): string {
  if (!name) return '?'
  const parts = name.split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.substring(0, 2).toUpperCase()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show && calendar"
      class="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      :aria-label="__('Share Calendar')"
      @click.self="emit('close')"
    >
      <div class="absolute inset-0 bg-black/40 dark:bg-black/60" @click="emit('close')" />

      <div class="relative w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto
                  rounded-xl shadow-2xl border border-[var(--dock-border)] bg-[var(--dock-bg)]">
        <div class="p-5">

          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-semibold text-[var(--dock-text)]">
              {{ __('Share') }} "{{ calendar.title }}"
            </h2>
            <button
              type="button"
              class="p-1 rounded text-[var(--dock-icon)] hover:text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10"
              @click="emit('close')"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Add people -->
          <div class="mb-4">
            <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1.5">{{ __('Add people') }}</label>
            <div class="flex gap-2">
              <div class="relative flex-1">
                <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--dock-icon)]" />
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="__('Search by name or email...')"
                  class="w-full pl-8 pr-3 py-2 rounded-lg text-sm
                         border border-[var(--dock-border)] bg-[var(--dock-bg)]
                         text-[var(--dock-text)] placeholder-[var(--dock-icon)]
                         focus:outline-none focus:border-[var(--dock-icon)] transition-colors"
                  @input="onSearch"
                />
              </div>
              <select
                v-model="addRole"
                class="px-2 py-2 rounded-lg text-sm border border-[var(--dock-border)] bg-[var(--dock-bg)] text-[var(--dock-text)]
                       focus:outline-none focus:border-[var(--dock-icon)]"
              >
                <option v-for="r in ROLES" :key="r" :value="r">{{ __(r) }}</option>
              </select>
            </div>

            <!-- Search results -->
            <div
              v-if="searchResults.length || searching"
              class="mt-1 border border-[var(--dock-border)] rounded-lg overflow-hidden"
            >
              <div v-if="searching" class="p-3 text-center">
                <Loader2 class="w-4 h-4 animate-spin text-[var(--dock-icon)] mx-auto" />
              </div>
              <button
                v-for="r in searchResults" :key="r.user"
                type="button"
                class="w-full flex items-center gap-2 px-3 py-2 text-left
                       hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                @click="addMember(r.user)"
              >
                <span class="w-6 h-6 rounded-full bg-[var(--dock-icon)]/20 text-[var(--dock-icon)]
                             text-[10px] font-semibold flex items-center justify-center shrink-0">
                  {{ getInitials(r.full_name) }}
                </span>
                <div class="min-w-0 flex-1">
                  <p class="text-sm text-[var(--dock-text)] m-0 truncate">{{ r.full_name }}</p>
                  <p class="text-xs text-[var(--dock-icon)] m-0 truncate">{{ r.user }}</p>
                </div>
                <UserPlus class="w-3.5 h-3.5 text-[var(--dock-icon)] shrink-0" />
              </button>
            </div>
          </div>

          <!-- Members list -->
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-[var(--dock-icon)] mb-2">
              {{ __('Members') }}
            </p>

            <div v-if="loading" class="py-4 text-center">
              <Loader2 class="w-4 h-4 animate-spin text-[var(--dock-icon)] mx-auto" />
            </div>

            <div v-else-if="!members.length" class="py-3 text-center text-xs text-[var(--dock-icon)]">
              {{ __('No members yet. Add people to share this calendar.') }}
            </div>

            <div v-else class="space-y-1.5">
              <div
                v-for="m in members" :key="m.user"
                class="flex items-center justify-between px-2.5 py-2 rounded-lg
                       bg-black/[0.02] dark:bg-white/[0.02] border border-[var(--dock-border)]"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <span class="w-7 h-7 rounded-full bg-[var(--dock-icon)]/20 text-[var(--dock-icon)]
                               text-[10px] font-semibold flex items-center justify-center shrink-0">
                    {{ getInitials(m.user_name || m.user) }}
                  </span>
                  <div class="min-w-0">
                    <p class="text-sm text-[var(--dock-text)] m-0 truncate">{{ m.user_name || m.user }}</p>
                    <p v-if="m.user_name" class="text-[10px] text-[var(--dock-icon)] m-0 truncate">{{ m.user }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <select
                    :value="m.role"
                    class="text-xs px-1.5 py-1 rounded border border-[var(--dock-border)] bg-[var(--dock-bg)] text-[var(--dock-text)]
                           focus:outline-none"
                    @change="updateRole(m.user, ($event.target as HTMLSelectElement).value)"
                  >
                    <option v-for="r in ROLES" :key="r" :value="r">{{ __(r) }}</option>
                  </select>
                  <button
                    type="button"
                    class="p-1 text-[var(--dock-icon)] hover:text-red-500 transition-colors"
                    :title="__('Remove')"
                    @click="removeMember(m.user)"
                  >
                    <X class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Owner note -->
          <div class="mt-4 text-xs text-[var(--dock-icon)]">
            {{ __('Owner') }}: {{ calendar.owner_name || calendar.owner_user }}
          </div>

          <!-- Done -->
          <div class="flex justify-end mt-4 pt-3 border-t border-[var(--dock-border)]">
            <button
              type="button"
              class="px-4 py-2 text-sm rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
              :style="{ backgroundColor: 'var(--app-accent-600)' }"
              @click="emit('close')"
            >{{ __('Done') }}</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
