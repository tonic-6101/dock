<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockPeoplePage' }
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  UserPlus, ArrowUpDown, X, ChevronDown,
  Users, Globe, Building2, Tag,
} from 'lucide-vue-next'
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
  owner: string
  user?: string
  is_internal?: boolean
  tags?: string[]
}

interface ListResponse {
  items: Contact[]
  total: number
  available_tags: string[]
  available_companies: string[]
}

type ContactType = 'all' | 'internal' | 'external'
type Visibility  = 'all' | 'mine'
type Status      = 'active' | 'archived' | 'dnc'
type SortMode    = 'recent' | 'asc' | 'desc'

const PAGE_SIZE = 50

// --- State ---
const contacts          = ref<Contact[]>([])
const total             = ref(0)
const offset            = ref(0)
const loading           = ref(false)
const hasError          = ref(false)
const showCreate        = ref(false)
const contextBadges     = ref<Record<string, string[]>>({})

// Filter state
const contactType       = ref<ContactType>('all')
const visibility        = ref<Visibility>('all')
const status            = ref<Status>('active')
const sortMode          = ref<SortMode>('recent')
const selectedTags      = ref<string[]>([])
const selectedCompany   = ref<string | null>(null)

// Available filter values (populated by API)
const availableTags     = ref<string[]>([])
const availableCompanies = ref<string[]>([])

// Dropdown open state
const showTagDropdown     = ref(false)
const showCompanyDropdown = ref(false)

const { registeredApps } = useDockBoot()
const hasDomainApps = computed(() => (registeredApps.value as unknown[]).length > 0)

// Router for URL query persistence
let router: ReturnType<typeof useRouter> | undefined
let route: ReturnType<typeof useRoute> | undefined
try { router = useRouter(); route = useRoute() } catch { /* outside router */ }

// Count of active filters (excluding defaults)
const activeFilterCount = computed(() => {
  let n = 0
  if (contactType.value !== 'all') n++
  if (visibility.value !== 'all') n++
  if (status.value !== 'active') n++
  if (selectedTags.value.length) n++
  if (selectedCompany.value) n++
  return n
})

// --- URL query sync ---
function readFiltersFromUrl() {
  if (!route?.query) return
  const q = route.query
  if (q.type && ['all', 'internal', 'external'].includes(q.type as string))
    contactType.value = q.type as ContactType
  if (q.visibility && ['all', 'mine'].includes(q.visibility as string))
    visibility.value = q.visibility as Visibility
  if (q.status && ['active', 'archived', 'dnc'].includes(q.status as string))
    status.value = q.status as Status
  if (q.sort && ['recent', 'asc', 'desc'].includes(q.sort as string))
    sortMode.value = q.sort as SortMode
  if (q.tags) {
    try { selectedTags.value = JSON.parse(q.tags as string) } catch { /* ignore */ }
  }
  if (q.company) selectedCompany.value = q.company as string
}

function pushFiltersToUrl() {
  if (!router) return
  const query: Record<string, string> = {}
  if (contactType.value !== 'all') query.type = contactType.value
  if (visibility.value !== 'all') query.visibility = visibility.value
  if (status.value !== 'active') query.status = status.value
  if (sortMode.value !== 'recent') query.sort = sortMode.value
  if (selectedTags.value.length) query.tags = JSON.stringify(selectedTags.value)
  if (selectedCompany.value) query.company = selectedCompany.value
  router.replace({ query }).catch(() => {})
}

// --- Data loading ---
async function load(reset = false) {
  if (reset) { offset.value = 0; contacts.value = []; contextBadges.value = {} }
  loading.value = true
  hasError.value = false
  try {
    const res = await callApi<ListResponse>(
      'dock.api.people.get_list',
      {
        limit:        PAGE_SIZE,
        offset:       offset.value,
        contact_type: contactType.value === 'all' ? undefined : contactType.value,
        visibility:   visibility.value === 'all' ? undefined : visibility.value,
        status:       status.value,
        sort:         sortMode.value,
        tags:         selectedTags.value.length ? JSON.stringify(selectedTags.value) : undefined,
        company:      selectedCompany.value || undefined,
      }
    )
    contacts.value = reset ? res.items : [...contacts.value, ...res.items]
    total.value    = res.total
    offset.value  += res.items.length
    availableTags.value     = res.available_tags ?? []
    availableCompanies.value = res.available_companies ?? []

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
    // non-critical
  }
}

// --- Filter actions ---
function setContactType(t: ContactType) {
  contactType.value = t
  applyFilters()
}

function setVisibility(v: Visibility) {
  visibility.value = v
  applyFilters()
}

function setStatus(s: Status) {
  status.value = s
  applyFilters()
}

function setSort(s: SortMode) {
  sortMode.value = s
  applyFilters()
}

function toggleTag(tag: string) {
  const idx = selectedTags.value.indexOf(tag)
  if (idx >= 0) {
    selectedTags.value.splice(idx, 1)
  } else {
    selectedTags.value.push(tag)
  }
  applyFilters()
}

function removeTag(tag: string) {
  const idx = selectedTags.value.indexOf(tag)
  if (idx >= 0) selectedTags.value.splice(idx, 1)
  applyFilters()
}

function setCompany(c: string | null) {
  selectedCompany.value = c
  showCompanyDropdown.value = false
  applyFilters()
}

function clearAllFilters() {
  contactType.value = 'all'
  visibility.value = 'all'
  status.value = 'active'
  sortMode.value = 'recent'
  selectedTags.value = []
  selectedCompany.value = null
  applyFilters()
}

function applyFilters() {
  pushFiltersToUrl()
  load(true)
}

function onCreated(_contact: { name: string; full_name: string }) {
  load(true)
}

// Close dropdowns on outside click
function onDocumentClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.dock-tag-dropdown')) showTagDropdown.value = false
  if (!target.closest('.dock-company-dropdown')) showCompanyDropdown.value = false
}

onMounted(() => {
  readFiltersFromUrl()
  load(true)
  document.addEventListener('click', onDocumentClick)
})
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

      <!-- No-domain-apps banner -->
      <div
        v-if="!hasDomainApps && contacts.length > 0"
        class="mb-4 flex items-start gap-2 px-4 py-3 rounded-lg
               border border-[var(--dock-border)] bg-black/[0.02] dark:bg-white/[0.02]
               text-xs text-[var(--dock-icon)]"
      >
        <span>{{ __('Install Orga, Micro, or other apps to see cross-app context for your contacts.') }}</span>
      </div>

      <!-- Filter bar -->
      <div class="flex flex-wrap items-center gap-2 mb-4">
        <!-- Type toggle (Internal / External / All) -->
        <div class="flex items-center rounded-full border border-[var(--dock-border)] overflow-hidden">
          <button
            v-for="chip in ([
              { value: 'all',      label: __('All'), icon: null },
              { value: 'internal', label: __('Internal'), icon: Users },
              { value: 'external', label: __('External'), icon: Globe },
            ] as { value: ContactType; label: string; icon: any }[])"
            :key="chip.value"
            class="dock-filter-chip flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition-colors"
            :class="contactType === chip.value
              ? 'bg-[var(--dock-accent)] text-white'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click="setContactType(chip.value)"
          >
            <component :is="chip.icon" v-if="chip.icon" class="w-3 h-3" />
            {{ chip.label }}
          </button>
        </div>

        <!-- Visibility toggle (All / My contacts / Shared) -->
        <div class="flex items-center rounded-full border border-[var(--dock-border)] overflow-hidden">
          <button
            v-for="chip in ([
              { value: 'all',    label: __('All') },
              { value: 'mine',   label: __('Mine') },
            ] as { value: Visibility; label: string }[])"
            :key="chip.value"
            class="dock-filter-chip px-3 py-1.5 text-xs font-medium transition-colors"
            :class="visibility === chip.value
              ? 'bg-[var(--dock-accent)] text-white'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click="setVisibility(chip.value)"
          >
            {{ chip.label }}
          </button>
        </div>

        <!-- Status toggle -->
        <div class="flex items-center rounded-full border border-[var(--dock-border)] overflow-hidden">
          <button
            v-for="chip in ([
              { value: 'active',   label: __('Active') },
              { value: 'archived', label: __('Archived') },
              { value: 'dnc',      label: __('Do Not Contact') },
            ] as { value: Status; label: string }[])"
            :key="chip.value"
            class="dock-filter-chip px-3 py-1.5 text-xs font-medium transition-colors"
            :class="status === chip.value
              ? 'bg-[var(--dock-accent)] text-white'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click="setStatus(chip.value)"
          >
            {{ chip.label }}
          </button>
        </div>

        <!-- Tags dropdown -->
        <div class="relative dock-tag-dropdown">
          <button
            class="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                   border border-[var(--dock-border)]"
            :class="selectedTags.length
              ? 'bg-[var(--dock-accent)]/10 text-[var(--dock-accent)] border-[var(--dock-accent)]/30'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click.stop="showTagDropdown = !showTagDropdown"
          >
            <Tag class="w-3 h-3" />
            {{ __('Tags') }}
            <span v-if="selectedTags.length" class="ml-0.5 bg-[var(--dock-accent)] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px]">
              {{ selectedTags.length }}
            </span>
            <ChevronDown class="w-3 h-3" />
          </button>
          <div
            v-if="showTagDropdown"
            class="absolute left-0 top-full mt-1 z-30 w-56 max-h-60 overflow-y-auto
                   bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg py-1"
          >
            <div v-if="!availableTags.length" class="px-3 py-2 text-xs text-[var(--dock-icon)]">
              {{ __('No tags found') }}
            </div>
            <button
              v-for="tag in availableTags"
              :key="tag"
              class="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left
                     hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              :class="selectedTags.includes(tag) ? 'text-[var(--dock-accent)] font-medium' : 'text-[var(--dock-text)]'"
              @click.stop="toggleTag(tag)"
            >
              <span class="w-3 h-3 rounded border flex items-center justify-center flex-shrink-0"
                    :class="selectedTags.includes(tag) ? 'bg-[var(--dock-accent)] border-[var(--dock-accent)]' : 'border-[var(--dock-border)]'">
                <svg v-if="selectedTags.includes(tag)" class="w-2 h-2 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M2 6l3 3 5-5" />
                </svg>
              </span>
              {{ tag }}
            </button>
          </div>
        </div>

        <!-- Company dropdown -->
        <div v-if="availableCompanies.length" class="relative dock-company-dropdown">
          <button
            class="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                   border border-[var(--dock-border)]"
            :class="selectedCompany
              ? 'bg-[var(--dock-accent)]/10 text-[var(--dock-accent)] border-[var(--dock-accent)]/30'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click.stop="showCompanyDropdown = !showCompanyDropdown"
          >
            <Building2 class="w-3 h-3" />
            {{ selectedCompany || __('Company') }}
            <ChevronDown class="w-3 h-3" />
          </button>
          <div
            v-if="showCompanyDropdown"
            class="absolute left-0 top-full mt-1 z-30 w-56 max-h-60 overflow-y-auto
                   bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg py-1"
          >
            <button
              v-if="selectedCompany"
              class="w-full px-3 py-1.5 text-xs text-left text-[var(--dock-icon)]
                     hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              @click.stop="setCompany(null)"
            >
              {{ __('All companies') }}
            </button>
            <button
              v-for="c in availableCompanies"
              :key="c"
              class="w-full px-3 py-1.5 text-xs text-left hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              :class="selectedCompany === c ? 'text-[var(--dock-accent)] font-medium' : 'text-[var(--dock-text)]'"
              @click.stop="setCompany(c)"
            >
              {{ c }}
            </button>
          </div>
        </div>

        <!-- Sort -->
        <div class="flex items-center rounded-full border border-[var(--dock-border)] overflow-hidden">
          <button
            v-for="chip in ([
              { value: 'recent', label: __('Recent') },
              { value: 'asc',    label: __('A→Z') },
              { value: 'desc',   label: __('Z→A') },
            ] as { value: SortMode; label: string }[])"
            :key="chip.value"
            class="dock-filter-chip flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition-colors"
            :class="sortMode === chip.value
              ? 'bg-[var(--dock-accent)] text-white'
              : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
            @click="setSort(chip.value)"
          >
            <ArrowUpDown v-if="chip.value === sortMode" class="w-3 h-3" />
            {{ chip.label }}
          </button>
        </div>

        <!-- Clear all (when filters active) -->
        <button
          v-if="activeFilterCount > 0"
          class="flex items-center gap-1 px-2 py-1.5 rounded-full text-xs text-[var(--dock-icon)]
                 hover:text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          @click="clearAllFilters"
        >
          <X class="w-3 h-3" />
          {{ __('Clear filters') }}
        </button>
      </div>

      <!-- Active tag pills (removable) -->
      <div v-if="selectedTags.length" class="flex flex-wrap items-center gap-1.5 mb-3">
        <span
          v-for="tag in selectedTags"
          :key="tag"
          class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium
                 bg-[var(--dock-accent)]/10 text-[var(--dock-accent)]"
        >
          {{ tag }}
          <button class="hover:opacity-70" @click="removeTag(tag)">
            <X class="w-2.5 h-2.5" />
          </button>
        </span>
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

        <!-- Empty (no results after filtering) -->
        <div v-else-if="!contacts.length" class="px-4 py-10 text-center">
          <p class="text-sm text-[var(--dock-icon)] mb-1">
            {{ activeFilterCount > 0 ? __('No contacts match these filters') : __('No contacts found') }}
          </p>
          <button
            v-if="activeFilterCount > 0"
            class="text-xs text-[var(--dock-accent)] hover:underline mt-1"
            @click="clearAllFilters"
          >
            {{ __('Clear filters') }}
          </button>
          <p v-else class="text-xs text-[var(--dock-icon)]/60">
            {{ __('Create a contact to get started') }}
          </p>
        </div>

        <!-- Rows -->
        <div v-else class="divide-y divide-[var(--dock-border)]">
          <DockPersonRow
            v-for="c in contacts"
            :key="c.name"
            :contact="c"
            :app-badges="contextBadges[c.name] ?? []"
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

<style>
/* Ensure first/last child in toggle groups have rounded corners */
.dock-filter-chip:first-child { border-radius: 9999px 0 0 9999px; }
.dock-filter-chip:last-child  { border-radius: 0 9999px 9999px 0; }
.dock-filter-chip:only-child  { border-radius: 9999px; }
</style>
