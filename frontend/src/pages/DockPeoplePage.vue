<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockPeoplePage' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, UserPlus, ArrowUpDown } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'
import DockPersonRow from '@/components/people/DockPersonRow.vue'
import DockPersonCreatePanel from '@/components/people/DockPersonCreatePanel.vue'

interface Contact {
  name: string
  full_name: string
  email_id?: string
  phone?: string
  company_name?: string
  image?: string
  dock_shared: number | boolean
  owner: string
}

type FilterMode = 'all' | 'mine' | 'shared'
type SortMode   = 'modified' | 'name'

const PAGE_SIZE    = 50
const contacts     = ref<Contact[]>([])
const total        = ref(0)
const offset       = ref(0)
const loading      = ref(false)
const hasError     = ref(false)
const searchQuery  = ref('')
const filterMode   = ref<FilterMode>('all')
const sortMode     = ref<SortMode>('modified')
const showCreate   = ref(false)

// App-context badges: contact_name → list of app names
const contextBadges = ref<Record<string, string[]>>({})

const { registeredApps } = useDockBoot()
const hasDomainApps = computed(() => (registeredApps.value as unknown[]).length > 0)

let searchTimer: ReturnType<typeof setTimeout> | null = null

async function load(reset = false) {
  if (reset) { offset.value = 0; contacts.value = []; contextBadges.value = {} }
  loading.value = true
  hasError.value = false
  try {
    const res = await callApi<{ items: Contact[]; total: number }>(
      'dock.api.people.get_list',
      {
        limit:         PAGE_SIZE,
        offset:        offset.value,
        query:         searchQuery.value.trim() || undefined,
        filter_mine:   filterMode.value === 'mine',
        filter_shared: filterMode.value === 'shared',
        sort:          sortMode.value,
      }
    )
    contacts.value = reset ? res.items : [...contacts.value, ...res.items]
    total.value    = res.total
    offset.value  += res.items.length

    // Fetch app-context badges for the newly loaded batch (only when domain apps exist)
    if (hasDomainApps.value && res.items.length) {
      fetchContextBadges(res.items.map(c => c.name))
    }
  } catch {
    hasError.value = true
  } finally {
    loading.value = false
  }
}

async function fetchContextBadges(names: string[]) {
  try {
    const result = await callApi<Record<string, string[]>>(
      'dock.api.people.get_list_context',
      { contact_names: names }
    )
    Object.assign(contextBadges.value, result)
  } catch {
    // badges are non-critical — silent fail
  }
}

function onSearch() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => load(true), 250)
}

function setFilter(mode: FilterMode) {
  filterMode.value = mode
  load(true)
}

function toggleSort() {
  sortMode.value = sortMode.value === 'modified' ? 'name' : 'modified'
  load(true)
}

async function toggleShared(name: string, value: boolean) {
  await callApi('dock.api.people.update_shared', { contact_name: name, dock_shared: value ? 1 : 0 })
  const c = contacts.value.find(c => c.name === name)
  if (c) c.dock_shared = value ? 1 : 0
}

function onCreated(_contact: { name: string; full_name: string }) {
  load(true)
}

onMounted(() => load(true))
</script>

<template>
  <div class="flex h-full relative">
    <!-- Main content -->
    <div class="flex-1 min-w-0 max-w-3xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl font-semibold text-[var(--dock-text)]">{{ __('People') }}</h1>
        <button
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-md
                 bg-[var(--dock-accent)] text-white text-sm font-medium
                 hover:opacity-90 transition-opacity"
          @click="showCreate = true"
        >
          <UserPlus class="w-4 h-4" />
          {{ __('New contact') }}
        </button>
      </div>

      <!-- No-domain-apps banner (contacts exist but no app context available) -->
      <div
        v-if="!hasDomainApps && contacts.length > 0"
        class="mb-4 flex items-start gap-2 px-4 py-3 rounded-lg
               border border-[var(--dock-border)] bg-black/[0.02] dark:bg-white/[0.02]
               text-xs text-[var(--dock-icon)]"
      >
        <span>{{ __('Install Orga, Micro, or other apps to see cross-app context for your contacts.') }}</span>
      </div>

      <!-- Search + filters + sort -->
      <div class="flex flex-col sm:flex-row gap-3 mb-4">
        <!-- Search -->
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--dock-icon)]" />
          <input
            v-model="searchQuery"
            type="search"
            class="w-full pl-9 pr-3 py-2 rounded-md border border-[var(--dock-border)]
                   bg-transparent text-sm text-[var(--dock-text)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--dock-accent)]/30
                   placeholder:text-[var(--dock-icon)]"
            :placeholder="__('Search by name, email, or phone…')"
            @input="onSearch"
          />
        </div>

        <!-- Filter chips + sort toggle -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <button
            v-for="chip in ([
              { mode: 'all',    label: __('All') },
              { mode: 'mine',   label: __('My contacts') },
              { mode: 'shared', label: __('Shared') },
            ] as { mode: FilterMode; label: string }[])"
            :key="chip.mode"
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            :class="filterMode === chip.mode
              ? 'bg-[var(--dock-accent)] text-white'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 border border-[var(--dock-border)]'"
            @click="setFilter(chip.mode)"
          >
            {{ chip.label }}
          </button>

          <!-- Sort toggle -->
          <button
            class="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                   text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 border border-[var(--dock-border)]"
            :title="sortMode === 'modified' ? __('Sort: last modified — click for A–Z') : __('Sort: A–Z — click for last modified')"
            @click="toggleSort"
          >
            <ArrowUpDown class="w-3 h-3" />
            {{ sortMode === 'modified' ? __('Recent') : __('A–Z') }}
          </button>
        </div>
      </div>

      <!-- List -->
      <div class="border border-[var(--dock-border)] rounded-lg overflow-hidden">
        <!-- Header row -->
        <div class="flex items-center px-4 py-2 border-b border-[var(--dock-border)]
                    bg-black/[0.02] dark:bg-white/[0.02]">
          <span class="text-xs text-[var(--dock-icon)]">
            {{ total }} {{ total === 1 ? __('contact') : __('contacts') }}
          </span>
        </div>

        <!-- Loading skeleton -->
        <div v-if="loading && !contacts.length" class="divide-y divide-[var(--dock-border)]">
          <div v-for="i in 8" :key="i" class="flex items-center gap-3 px-4 py-3">
            <div class="w-9 h-9 rounded-full bg-black/10 dark:bg-white/10 animate-pulse flex-shrink-0" />
            <div class="flex-1 space-y-1.5">
              <div class="h-3 w-36 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
              <div class="h-2.5 w-24 bg-black/[0.06] dark:bg-white/[0.06] rounded animate-pulse" />
            </div>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="hasError" class="px-4 py-8 text-center">
          <p class="text-sm text-[var(--dock-icon)] mb-3">{{ __('Could not load contacts') }}</p>
          <button class="text-xs text-[var(--dock-accent)] hover:underline" @click="load(true)">{{ __('Retry') }}</button>
        </div>

        <!-- Empty -->
        <div v-else-if="!contacts.length" class="px-4 py-10 text-center">
          <p class="text-sm text-[var(--dock-icon)] mb-1">{{ __('No contacts found') }}</p>
          <p class="text-xs text-[var(--dock-icon)]/60">
            {{ __('Create a contact or adjust your filters') }}
          </p>
        </div>

        <!-- Rows -->
        <div v-else class="divide-y divide-[var(--dock-border)]">
          <DockPersonRow
            v-for="c in contacts"
            :key="c.name"
            :contact="c"
            :app-badges="contextBadges[c.name] ?? []"
            @toggle-shared="toggleShared"
          />
        </div>

        <!-- Load more -->
        <div
          v-if="contacts.length < total"
          class="border-t border-[var(--dock-border)] px-4 py-2 text-center"
        >
          <button
            class="text-xs text-[var(--dock-accent)] hover:underline disabled:opacity-50"
            :disabled="loading"
            @click="load(false)"
          >
            {{ loading ? __('Loading…') : __('Load more') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Create panel (slide-in) -->
    <DockPersonCreatePanel
      v-if="showCreate"
      @close="showCreate = false"
      @created="onCreated"
    />
  </div>
</template>
