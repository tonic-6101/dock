<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockPersonPage' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft, Mail, Phone, Building2, User, Activity, Clock, Globe,
  Star, MoreHorizontal, ExternalLink, Copy, Check, CheckSquare,
  Edit3, Trash2, FileText, MessageSquare, Tag,
} from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useBookmarks } from '@/composables/useBookmarks'
import { relativeTime } from '@/composables/useRelativeTime'
import DockPersonContextPanel from '@/components/people/DockPersonContextPanel.vue'

// --- Types ---

interface EmailEntry  { email: string; is_primary: number }
interface PhoneEntry  { phone: string; is_primary: number; label?: string }
interface AddressInfo { name: string; display: string; city: string; country: string }
interface ActivityInfo { type: string; subject: string; date: string }

interface Contact {
  name: string
  full_name: string
  company_name?: string
  designation?: string
  image?: string
  status?: string
  source?: string
  department?: string
  email_ids: EmailEntry[]
  phone_nos: PhoneEntry[]
  dock_shared: boolean
  owner: string
  owner_name?: string
  modified?: string
  tags?: string[]
  address?: AddressInfo | null
  last_activity?: ActivityInfo | null
}

interface ContextPanel {
  app: string
  label: string
  icon?: string
  link?: string
  fields?: { label: string; value: string }[]
}

// --- Router ---

let route: ReturnType<typeof useRoute> | undefined
let router: ReturnType<typeof useRouter> | undefined
try { route = useRoute(); router = useRouter() } catch { /* outside router context */ }

// --- State ---

const contact      = ref<Contact | null>(null)
const panels       = ref<ContextPanel[]>([])
const loading      = ref(true)
const hasError     = ref(false)
const togglingShare = ref(false)
const showOverflow = ref(false)
const activeTab    = ref<'activity' | 'details' | 'notes' | 'context' | 'files'>('activity')
const copiedField  = ref<string | null>(null)

// --- Bookmarks ---

const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()

const bookmarkName = computed(() =>
  contact.value ? isBookmarked('dock', 'Contact', contact.value.name) : null,
)
const isFavorited = computed(() => bookmarkName.value !== null)

function toggleFavorite() {
  if (!contact.value) return
  if (isFavorited.value && bookmarkName.value) {
    removeBookmark(bookmarkName.value)
  } else if (contact.value) {
    addBookmark({
      app: 'dock',
      doctype: 'Contact',
      docname: contact.value.name,
      label: contact.value.full_name,
      icon: 'user',
    })
  }
}

// --- Computed ---

const contactName = computed(() => {
  if (route?.params?.name) return route.params.name as string
  const match = window.location.pathname.match(/\/people\/([^/]+)/)
  return match?.[1] ?? ''
})

const session = (window as any).frappe?.session ?? (window as any).dockBoot?.session
const isOwner = computed(() => contact.value?.owner === session?.user)
const isSystemManager = computed(() => {
  const deskRoles = ((window as any).frappe?.boot?.user?.roles ?? []) as string[]
  if (deskRoles.includes('System Manager')) return true
  return Boolean((window as any).dockBoot?.is_system_manager)
})
const canToggleShare = computed(() => isOwner.value || isSystemManager.value)

const primaryEmail = computed(() =>
  contact.value?.email_ids.find(e => e.is_primary)?.email ?? contact.value?.email_ids[0]?.email,
)
const secondaryEmails = computed(() =>
  contact.value?.email_ids.filter(e => !e.is_primary) ?? [],
)
const primaryPhone = computed(() =>
  contact.value?.phone_nos.find(p => p.is_primary)?.phone ?? contact.value?.phone_nos[0]?.phone,
)
const primaryPhoneLabel = computed(() => {
  const p = contact.value?.phone_nos.find(p => p.is_primary) ?? contact.value?.phone_nos[0]
  return p?.label || ''
})
const secondaryPhones = computed(() =>
  contact.value?.phone_nos.filter(p => !p.is_primary) ?? [],
)

const initials = computed(() => {
  const n = contact.value?.full_name || '?'
  return n.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
})

const statusColor = computed(() => {
  const s = (contact.value?.status || '').toLowerCase()
  const colors: Record<string, string> = {
    open: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    replied: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    passive: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    lead: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  }
  return colors[s] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
})

const lastActivityText = computed(() => {
  if (contact.value?.last_activity) {
    const a = contact.value.last_activity
    const ago = relativeTime(a.date)
    const label = a.subject ? `${a.type} — ${a.subject}` : a.type
    return `${ago} — ${label}`
  }
  if (contact.value?.modified) {
    return `${relativeTime(contact.value.modified)} — ${__('Modified')}`
  }
  return __('No activity')
})

const visibleTags = computed(() => (contact.value?.tags ?? []).slice(0, 5))
const overflowTagCount = computed(() => Math.max(0, (contact.value?.tags?.length ?? 0) - 5))

// --- Actions ---

async function fetchContact() {
  loading.value  = true
  hasError.value = false
  try {
    const [c, ctx] = await Promise.all([
      callApi<Contact>('dock.api.people.get_contact', { contact_name: contactName.value }),
      callApi<ContextPanel[]>('dock.api.people.get_contact_context', { contact_name: contactName.value }),
    ])
    contact.value = c
    panels.value  = ctx
    // Default to context tab if there are panels and no activity yet
    if (ctx.length && !c.last_activity) {
      activeTab.value = 'context'
    }
  } catch {
    hasError.value = true
  } finally {
    loading.value = false
  }
}

async function toggleShared() {
  if (!contact.value || togglingShare.value) return
  togglingShare.value = true
  try {
    const newVal = !contact.value.dock_shared
    await callApi('dock.api.people.update_shared', {
      contact_name: contactName.value,
      dock_shared:  newVal ? 1 : 0,
    })
    contact.value.dock_shared = newVal
  } finally {
    togglingShare.value = false
  }
}

async function copyToClipboard(text: string, fieldId: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedField.value = fieldId
    setTimeout(() => { copiedField.value = null }, 2000)
  } catch { /* clipboard not available */ }
}

function goBack() {
  if (router) {
    router.push({ name: 'dock-people' })
  } else {
    window.location.href = window.location.pathname.replace(/\/people\/.*$/, '/people')
  }
}

function closeOverflow(e: MouseEvent) {
  if (showOverflow.value) showOverflow.value = false
}

onMounted(() => {
  fetchContact()
  document.addEventListener('click', closeOverflow)
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
    <!-- Back -->
    <button
      class="flex items-center gap-1.5 text-sm text-[var(--dock-icon)] hover:text-[var(--dock-text)]
             transition-colors mb-6"
      @click="goBack"
    >
      <ArrowLeft class="w-4 h-4" />
      {{ __('People') }}
    </button>

    <!-- Loading skeleton -->
    <div v-if="loading" class="space-y-4">
      <div class="flex items-center gap-4">
        <div class="w-20 h-20 rounded-full bg-black/10 dark:bg-white/10 animate-pulse flex-shrink-0" />
        <div class="space-y-2 flex-1">
          <div class="h-6 w-56 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
          <div class="h-4 w-40 bg-black/[0.06] dark:bg-white/[0.06] rounded animate-pulse" />
          <div class="h-4 w-32 bg-black/[0.06] dark:bg-white/[0.06] rounded animate-pulse" />
        </div>
      </div>
      <div class="h-10 w-full bg-black/[0.04] dark:bg-white/[0.04] rounded animate-pulse mt-4" />
      <div class="space-y-2 mt-4">
        <div class="h-12 bg-black/[0.04] dark:bg-white/[0.04] rounded animate-pulse" v-for="i in 5" :key="i" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="hasError" class="text-center py-12">
      <p class="text-sm text-[var(--dock-icon)] mb-3">{{ __('Could not load contact') }}</p>
      <button class="text-xs text-[var(--dock-accent)] hover:underline" @click="fetchContact">{{ __('Retry') }}</button>
    </div>

    <template v-else-if="contact">
      <!-- ============================== -->
      <!-- ZONE 1 — Identity Header       -->
      <!-- ============================== -->
      <div class="mb-6">
        <div class="flex items-start gap-4">
          <!-- Avatar -->
          <div
            class="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center
                   bg-[var(--dock-accent)]/15 text-[var(--dock-accent)] text-2xl font-semibold overflow-hidden"
          >
            <img v-if="contact.image" :src="contact.image" :alt="contact.full_name" class="w-20 h-20 object-cover" />
            <span v-else>{{ initials }}</span>
          </div>

          <div class="flex-1 min-w-0 pt-0.5">
            <!-- Name row with favorite + overflow -->
            <div class="flex items-start gap-2">
              <h1 class="text-2xl font-semibold text-[var(--dock-text)] truncate flex-1">
                {{ contact.full_name }}
              </h1>
              <!-- Favorite -->
              <button
                class="p-1.5 rounded-md transition-colors flex-shrink-0"
                :class="isFavorited
                  ? 'text-amber-500 hover:text-amber-600'
                  : 'text-[var(--dock-icon)] hover:text-[var(--dock-text)]'"
                :title="isFavorited ? __('Remove from favorites') : __('Add to favorites')"
                @click="toggleFavorite"
              >
                <Star class="w-5 h-5" :class="isFavorited ? 'fill-current' : ''" />
              </button>
              <!-- Overflow menu -->
              <div class="relative flex-shrink-0">
                <button
                  class="p-1.5 rounded-md text-[var(--dock-icon)] hover:text-[var(--dock-text)]
                         hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  @click.stop="showOverflow = !showOverflow"
                >
                  <MoreHorizontal class="w-5 h-5" />
                </button>
                <div
                  v-if="showOverflow"
                  class="absolute right-0 top-full mt-1 w-48 bg-[var(--dock-bg)] border border-[var(--dock-border)]
                         rounded-lg shadow-lg z-50 py-1 overflow-hidden"
                >
                  <a
                    :href="`/app/contact/${contact.name}`"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center gap-2 px-3 py-2 text-sm text-[var(--dock-text)]
                           hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    <Edit3 class="w-4 h-4 text-[var(--dock-icon)]" />
                    {{ __('Edit in Desk') }}
                  </a>
                  <a
                    :href="`/app/contact/${contact.name}`"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center gap-2 px-3 py-2 text-sm text-[var(--dock-text)]
                           hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink class="w-4 h-4 text-[var(--dock-icon)]" />
                    {{ __('Open in Desk') }}
                  </a>
                  <button
                    v-if="canToggleShare"
                    class="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--dock-text)]
                           hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-left"
                    :disabled="togglingShare"
                    @click="toggleShared(); showOverflow = false"
                  >
                    <Globe class="w-4 h-4 text-[var(--dock-icon)]" />
                    {{ contact.dock_shared ? __('Make private') : __('Share with team') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Subtitle: designation + company -->
            <p v-if="contact.designation" class="text-sm text-[var(--dock-icon)] truncate">
              {{ contact.designation }}
            </p>
            <p v-if="contact.company_name" class="text-sm text-[var(--dock-icon)] truncate">
              <a
                :href="`/app/contact?company_name=${encodeURIComponent(contact.company_name)}`"
                class="hover:text-[var(--dock-accent)] hover:underline transition-colors"
              >
                {{ contact.company_name }}
              </a>
            </p>

            <!-- Tags + Status badge -->
            <div class="flex items-center gap-2 mt-2 flex-wrap">
              <!-- Status badge -->
              <span
                v-if="contact.status"
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                :class="statusColor"
              >
                {{ contact.status }}
              </span>
              <!-- Visibility badge -->
              <span
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                :class="contact.dock_shared
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                  : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'"
              >
                {{ contact.dock_shared ? __('Shared') : __('Private') }}
              </span>
              <!-- Tags -->
              <span
                v-for="tag in visibleTags"
                :key="tag"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                       bg-[var(--dock-accent)]/10 text-[var(--dock-accent)]"
              >
                <Tag class="w-3 h-3" />
                {{ tag }}
              </span>
              <span
                v-if="overflowTagCount > 0"
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs
                       bg-black/5 dark:bg-white/10 text-[var(--dock-icon)]"
              >
                +{{ overflowTagCount }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Actions Row -->
        <div class="flex items-center gap-2 mt-4 pl-24">
          <a
            v-if="primaryEmail"
            :href="`mailto:${primaryEmail}`"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                   bg-[var(--dock-accent)] text-white hover:opacity-90 transition-opacity"
          >
            <Mail class="w-4 h-4" />
            {{ __('Email') }}
          </a>
          <a
            v-if="primaryPhone"
            :href="`tel:${primaryPhone}`"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                   border border-[var(--dock-border)] text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Phone class="w-4 h-4" />
            {{ __('Call') }}
          </a>
          <button
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                   border border-[var(--dock-border)] text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            @click="activeTab = 'notes'"
          >
            <MessageSquare class="w-4 h-4" />
            {{ __('Note') }}
          </button>
          <button
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                   border border-[var(--dock-border)] text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <CheckSquare class="w-4 h-4" />
            {{ __('Task') }}
          </button>
        </div>
      </div>

      <!-- ============================== -->
      <!-- ZONE 2 — Key Properties        -->
      <!-- ============================== -->
      <dl class="border border-[var(--dock-border)] rounded-lg divide-y divide-[var(--dock-border)] overflow-hidden mb-6">
        <!-- Primary Email -->
        <div v-if="primaryEmail" class="flex items-center gap-3 px-4 py-3 group">
          <Mail class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Email') }}</dt>
            <dd class="text-sm text-[var(--dock-text)]">
              <a :href="`mailto:${primaryEmail}`" class="hover:underline">{{ primaryEmail }}</a>
            </dd>
            <!-- Secondary emails inline -->
            <div v-if="secondaryEmails.length" class="mt-1 space-y-0.5">
              <span
                v-for="e in secondaryEmails"
                :key="e.email"
                class="block text-xs text-[var(--dock-icon)]"
              >
                <a :href="`mailto:${e.email}`" class="hover:underline">{{ e.email }}</a>
              </span>
            </div>
          </div>
          <button
            class="flex-shrink-0 p-1.5 rounded text-[var(--dock-icon)] opacity-0 group-hover:opacity-100
                   hover:text-[var(--dock-text)] transition-all"
            :title="__('Copy')"
            @click="copyToClipboard(primaryEmail!, 'email')"
          >
            <Check v-if="copiedField === 'email'" class="w-4 h-4 text-green-500" />
            <Copy v-else class="w-4 h-4" />
          </button>
        </div>

        <!-- Primary Phone -->
        <div v-if="primaryPhone" class="flex items-center gap-3 px-4 py-3 group">
          <Phone class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">
              {{ __('Phone') }}
              <span v-if="primaryPhoneLabel" class="ml-1 normal-case">({{ primaryPhoneLabel }})</span>
            </dt>
            <dd class="text-sm text-[var(--dock-text)]">
              <a :href="`tel:${primaryPhone}`" class="hover:underline">{{ primaryPhone }}</a>
            </dd>
            <!-- Secondary phones -->
            <div v-if="secondaryPhones.length" class="mt-1 space-y-0.5">
              <span
                v-for="p in secondaryPhones"
                :key="p.phone"
                class="block text-xs text-[var(--dock-icon)]"
              >
                <a :href="`tel:${p.phone}`" class="hover:underline">{{ p.phone }}</a>
                <span v-if="p.label" class="ml-1">({{ p.label }})</span>
              </span>
            </div>
          </div>
          <button
            class="flex-shrink-0 p-1.5 rounded text-[var(--dock-icon)] opacity-0 group-hover:opacity-100
                   hover:text-[var(--dock-text)] transition-all"
            :title="__('Copy')"
            @click="copyToClipboard(primaryPhone!, 'phone')"
          >
            <Check v-if="copiedField === 'phone'" class="w-4 h-4 text-green-500" />
            <Copy v-else class="w-4 h-4" />
          </button>
        </div>

        <!-- Owner -->
        <div class="flex items-center gap-3 px-4 py-3">
          <User class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
          <div class="min-w-0">
            <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Owner') }}</dt>
            <dd class="text-sm text-[var(--dock-text)]">
              {{ isOwner ? __('You') : (contact.owner_name || contact.owner) }}
            </dd>
          </div>
        </div>

        <!-- Last Activity -->
        <div class="flex items-center gap-3 px-4 py-3">
          <Activity class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
          <div class="min-w-0">
            <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Last activity') }}</dt>
            <dd class="text-sm text-[var(--dock-text)]">{{ lastActivityText }}</dd>
          </div>
        </div>

        <!-- Source (if populated) -->
        <div v-if="contact.source" class="flex items-center gap-3 px-4 py-3">
          <Globe class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
          <div class="min-w-0">
            <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Source') }}</dt>
            <dd class="text-sm text-[var(--dock-text)]">{{ contact.source }}</dd>
          </div>
        </div>

        <!-- Address (if populated) -->
        <div v-if="contact.address" class="flex items-center gap-3 px-4 py-3 group">
          <Building2 class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Address') }}</dt>
            <dd class="text-sm text-[var(--dock-text)]">
              {{ contact.address.city && contact.address.country
                ? `${contact.address.city}, ${contact.address.country}`
                : contact.address.display }}
            </dd>
          </div>
          <button
            class="flex-shrink-0 p-1.5 rounded text-[var(--dock-icon)] opacity-0 group-hover:opacity-100
                   hover:text-[var(--dock-text)] transition-all"
            :title="__('Copy')"
            @click="copyToClipboard(contact.address!.display, 'address')"
          >
            <Check v-if="copiedField === 'address'" class="w-4 h-4 text-green-500" />
            <Copy v-else class="w-4 h-4" />
          </button>
        </div>
      </dl>

      <!-- ============================== -->
      <!-- ZONE 3 — Tabbed Detail Area    -->
      <!-- ============================== -->
      <div>
        <!-- Tab bar -->
        <div class="flex items-center gap-1 border-b border-[var(--dock-border)] mb-4 overflow-x-auto">
          <button
            v-for="tab in ([
              { id: 'activity', label: __('Activity'), icon: Activity },
              { id: 'details', label: __('Details'), icon: FileText },
              { id: 'notes', label: __('Notes'), icon: MessageSquare },
              ...(panels.length ? [{ id: 'context', label: __('Context'), icon: Globe }] : []),
            ] as const)"
            :key="tab.id"
            class="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 -mb-px
                   transition-colors whitespace-nowrap"
            :class="activeTab === tab.id
              ? 'border-[var(--dock-accent)] text-[var(--dock-accent)]'
              : 'border-transparent text-[var(--dock-icon)] hover:text-[var(--dock-text)] hover:border-[var(--dock-border)]'"
            @click="activeTab = tab.id as any"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            {{ tab.label }}
          </button>
        </div>

        <!-- Activity tab -->
        <div v-if="activeTab === 'activity'" class="space-y-3">
          <div v-if="contact.last_activity" class="flex items-start gap-3 px-3 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
            <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Mail class="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-[var(--dock-text)]">
                {{ contact.last_activity.type }}
                <span v-if="contact.last_activity.subject" class="text-[var(--dock-icon)]">
                  — {{ contact.last_activity.subject }}
                </span>
              </p>
              <p class="text-xs text-[var(--dock-icon)] mt-0.5">{{ relativeTime(contact.last_activity.date) }}</p>
            </div>
          </div>
          <div v-else class="text-center py-12">
            <Activity class="w-8 h-8 text-[var(--dock-icon)] mx-auto mb-3 opacity-50" />
            <p class="text-sm text-[var(--dock-icon)]">{{ __('No activity yet') }}</p>
            <p class="text-xs text-[var(--dock-icon)] mt-1">{{ __('Send an email or add a note to get started.') }}</p>
          </div>
        </div>

        <!-- Details tab -->
        <div v-if="activeTab === 'details'" class="space-y-4">
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-if="contact.full_name">
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Full name') }}</dt>
              <dd class="text-sm text-[var(--dock-text)]">{{ contact.full_name }}</dd>
            </div>
            <div v-if="contact.designation">
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Job title') }}</dt>
              <dd class="text-sm text-[var(--dock-text)]">{{ contact.designation }}</dd>
            </div>
            <div v-if="contact.company_name">
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Company') }}</dt>
              <dd class="text-sm text-[var(--dock-text)]">{{ contact.company_name }}</dd>
            </div>
            <div v-if="contact.department">
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Department') }}</dt>
              <dd class="text-sm text-[var(--dock-text)]">{{ contact.department }}</dd>
            </div>
            <div v-if="contact.status">
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Status') }}</dt>
              <dd class="text-sm text-[var(--dock-text)]">{{ contact.status }}</dd>
            </div>
            <div v-if="contact.source">
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Source') }}</dt>
              <dd class="text-sm text-[var(--dock-text)]">{{ contact.source }}</dd>
            </div>
            <div v-if="contact.owner">
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Owner') }}</dt>
              <dd class="text-sm text-[var(--dock-text)]">{{ contact.owner_name || contact.owner }}</dd>
            </div>
            <div v-if="contact.modified">
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Last modified') }}</dt>
              <dd class="text-sm text-[var(--dock-text)]">{{ new Date(contact.modified).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) }}</dd>
            </div>
            <div v-if="contact.address">
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Address') }}</dt>
              <dd class="text-sm text-[var(--dock-text)] whitespace-pre-line">{{ contact.address.display }}</dd>
            </div>
          </dl>

          <!-- All emails -->
          <div v-if="contact.email_ids.length">
            <h3 class="text-xs text-[var(--dock-icon)] font-medium uppercase tracking-wide mb-2">{{ __('Email addresses') }}</h3>
            <div class="space-y-1">
              <div
                v-for="e in contact.email_ids"
                :key="e.email"
                class="flex items-center gap-2 text-sm"
              >
                <a :href="`mailto:${e.email}`" class="text-[var(--dock-text)] hover:underline">{{ e.email }}</a>
                <span v-if="e.is_primary" class="text-[10px] px-1.5 py-0.5 rounded bg-[var(--dock-accent)]/10 text-[var(--dock-accent)]">{{ __('Primary') }}</span>
              </div>
            </div>
          </div>

          <!-- All phones -->
          <div v-if="contact.phone_nos.length">
            <h3 class="text-xs text-[var(--dock-icon)] font-medium uppercase tracking-wide mb-2">{{ __('Phone numbers') }}</h3>
            <div class="space-y-1">
              <div
                v-for="p in contact.phone_nos"
                :key="p.phone"
                class="flex items-center gap-2 text-sm"
              >
                <a :href="`tel:${p.phone}`" class="text-[var(--dock-text)] hover:underline">{{ p.phone }}</a>
                <span v-if="p.label" class="text-xs text-[var(--dock-icon)]">({{ p.label }})</span>
                <span v-if="p.is_primary" class="text-[10px] px-1.5 py-0.5 rounded bg-[var(--dock-accent)]/10 text-[var(--dock-accent)]">{{ __('Primary') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Notes tab -->
        <div v-if="activeTab === 'notes'" class="space-y-3">
          <div class="text-center py-12">
            <MessageSquare class="w-8 h-8 text-[var(--dock-icon)] mx-auto mb-3 opacity-50" />
            <p class="text-sm text-[var(--dock-icon)]">{{ __('No notes yet') }}</p>
            <p class="text-xs text-[var(--dock-icon)] mt-1">{{ __('Notes will appear here once the notes API is connected.') }}</p>
          </div>
        </div>

        <!-- Context tab (cross-app panels) -->
        <div v-if="activeTab === 'context' && panels.length" class="space-y-3">
          <DockPersonContextPanel
            v-for="panel in panels"
            :key="panel.app"
            :panel="panel"
          />
        </div>
      </div>
    </template>
  </div>
</template>
