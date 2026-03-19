<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockPersonPage' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Mail, Phone, Building2, Briefcase, Share2, ExternalLink } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import DockPersonContextPanel from '@/components/people/DockPersonContextPanel.vue'

interface EmailEntry  { email: string; is_primary: number }
interface PhoneEntry  { phone: string; is_primary: number }

interface Contact {
  name: string
  full_name: string
  company_name?: string
  designation?: string
  image?: string
  email_ids: EmailEntry[]
  phone_nos: PhoneEntry[]
  dock_shared: boolean
  owner: string
}

interface ContextPanel {
  app: string
  label: string
  icon?: string
  link?: string
  fields?: { label: string; value: string }[]
}

let route: ReturnType<typeof useRoute> | undefined
let router: ReturnType<typeof useRouter> | undefined
try { route = useRoute(); router = useRouter() } catch { /* outside router context */ }

const contact      = ref<Contact | null>(null)
const panels       = ref<ContextPanel[]>([])
const loading      = ref(true)
const hasError     = ref(false)
const togglingShare = ref(false)

const contactName = computed(() => {
  if (route?.params?.name) return route.params.name as string
  // Fallback: extract from URL path (e.g. /dock/people/CONT-00001)
  const match = window.location.pathname.match(/\/people\/([^/]+)/)
  return match?.[1] ?? ''
})

const session = (window as any).frappe?.session ?? (window as any).dockBoot?.session
const isOwner = computed(() => contact.value?.owner === session?.user)
const isSystemManager = computed(() => {
  // Frappe Desk context: roles are on frappe.boot.user.roles
  const deskRoles = ((window as any).frappe?.boot?.user?.roles ?? []) as string[]
  if (deskRoles.includes('System Manager')) return true
  // SPA context: is_system_manager is set in dockBoot by dock/www/dock.py
  return Boolean((window as any).dockBoot?.is_system_manager)
})
const canToggleShare = computed(() => isOwner.value || isSystemManager.value)

const primaryEmail = computed(() => contact.value?.email_ids.find(e => e.is_primary)?.email ?? contact.value?.email_ids[0]?.email)
const primaryPhone = computed(() => contact.value?.phone_nos.find(p => p.is_primary)?.phone ?? contact.value?.phone_nos[0]?.phone)

const initials = computed(() => {
  const n = contact.value?.full_name || '?'
  return n.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
})

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

function goBack() {
  if (router) {
    router.push({ name: 'dock-people' })
  } else {
    window.location.href = window.location.pathname.replace(/\/people\/.*$/, '/people')
  }
}

onMounted(fetchContact)
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-8">
    <!-- Back -->
    <button
      class="flex items-center gap-1.5 text-sm text-[var(--dock-icon)] hover:text-[var(--dock-text)]
             transition-colors mb-6"
      @click="goBack"
    >
      <ArrowLeft class="w-4 h-4" />
      {{ __('People') }}
    </button>

    <!-- Loading -->
    <div v-if="loading" class="space-y-4">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-black/10 dark:bg-white/10 animate-pulse flex-shrink-0" />
        <div class="space-y-2 flex-1">
          <div class="h-5 w-48 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
          <div class="h-3.5 w-32 bg-black/[0.06] dark:bg-white/[0.06] rounded animate-pulse" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="hasError" class="text-center py-12">
      <p class="text-sm text-[var(--dock-icon)] mb-3">{{ __('Could not load contact') }}</p>
      <button class="text-xs text-[var(--dock-accent)] hover:underline" @click="fetchContact">{{ __('Retry') }}</button>
    </div>

    <template v-else-if="contact">
      <!-- Two-column layout on wide screens -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left: contact fields -->
        <div class="flex-1 min-w-0">
          <!-- Identity card -->
          <div class="flex items-start gap-4 mb-6">
            <!-- Avatar -->
            <div
              class="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center
                     bg-[var(--dock-accent)]/15 text-[var(--dock-accent)] text-xl font-semibold overflow-hidden"
            >
              <img v-if="contact.image" :src="contact.image" :alt="contact.full_name" class="w-16 h-16 object-cover" />
              <span v-else>{{ initials }}</span>
            </div>

            <div class="flex-1 min-w-0 pt-1">
              <h1 class="text-2xl font-semibold text-[var(--dock-text)] truncate">{{ contact.full_name }}</h1>
              <p v-if="contact.designation" class="text-sm text-[var(--dock-icon)] truncate">{{ contact.designation }}</p>
              <p v-if="contact.company_name" class="text-sm text-[var(--dock-icon)] truncate">{{ contact.company_name }}</p>
            </div>
          </div>

          <!-- Fields -->
          <dl class="border border-[var(--dock-border)] rounded-lg divide-y divide-[var(--dock-border)] overflow-hidden mb-4">
            <div v-if="primaryEmail" class="flex items-center gap-3 px-4 py-3">
              <Mail class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
              <div class="min-w-0">
                <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Email') }}</dt>
                <dd class="text-sm text-[var(--dock-text)]">
                  <a :href="`mailto:${primaryEmail}`" class="hover:underline">{{ primaryEmail }}</a>
                </dd>
              </div>
              <!-- Secondary emails -->
              <div v-if="contact.email_ids.length > 1" class="ml-auto flex flex-col items-end gap-0.5">
                <span
                  v-for="e in contact.email_ids.filter(e => !e.is_primary)"
                  :key="e.email"
                  class="text-xs text-[var(--dock-icon)]"
                >
                  <a :href="`mailto:${e.email}`" class="hover:underline">{{ e.email }}</a>
                </span>
              </div>
            </div>

            <div v-if="primaryPhone" class="flex items-center gap-3 px-4 py-3">
              <Phone class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
              <div class="min-w-0">
                <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Phone') }}</dt>
                <dd class="text-sm text-[var(--dock-text)]">
                  <a :href="`tel:${primaryPhone}`" class="hover:underline">{{ primaryPhone }}</a>
                </dd>
              </div>
            </div>

            <div v-if="contact.company_name" class="flex items-center gap-3 px-4 py-3">
              <Building2 class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
              <div class="min-w-0">
                <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Company') }}</dt>
                <dd class="text-sm text-[var(--dock-text)]">{{ contact.company_name }}</dd>
              </div>
            </div>

            <div v-if="contact.designation" class="flex items-center gap-3 px-4 py-3">
              <Briefcase class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
              <div class="min-w-0">
                <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Job title') }}</dt>
                <dd class="text-sm text-[var(--dock-text)]">{{ contact.designation }}</dd>
              </div>
            </div>

            <!-- Share with team toggle -->
            <div class="flex items-center gap-3 px-4 py-3">
              <Share2 class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Visibility') }}</dt>
                <dd class="text-sm text-[var(--dock-text)]">
                  {{ contact.dock_shared ? __('Shared with team') : __('Private') }}
                </dd>
              </div>
              <button
                v-if="canToggleShare"
                class="flex-shrink-0 px-2.5 py-1 rounded text-xs border transition-colors disabled:opacity-50"
                :class="contact.dock_shared
                  ? 'border-[var(--dock-accent)] text-[var(--dock-accent)] hover:bg-[var(--dock-accent)]/5'
                  : 'border-[var(--dock-border)] text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
                :disabled="togglingShare"
                @click="toggleShared"
              >
                {{ contact.dock_shared ? __('Make private') : __('Share with team') }}
              </button>
            </div>
          </dl>

          <!-- Escape hatch to Frappe Desk -->
          <a
            :href="`/app/contact/${contact.name}`"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1 text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
          >
            <ExternalLink class="w-3 h-3" />
            {{ __('Open in Desk') }}
          </a>
        </div>

        <!-- Right: cross-app context panels -->
        <div v-if="panels.length" class="lg:w-72 flex-shrink-0 space-y-3">
          <h2 class="text-xs font-semibold text-[var(--dock-icon)] uppercase tracking-wide mb-1">
            {{ __('App context') }}
          </h2>
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
