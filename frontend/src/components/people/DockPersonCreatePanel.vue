<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Slide-in side panel for creating a new contact.
  Spec: dock.localhost/spec/features/people.md  §UX: Create Contact (Side Panel)
-->
<script lang="ts">
export default { name: 'DockPersonCreatePanel' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { X, ChevronDown } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'

const emit = defineEmits<{
  close: []
  created: [contact: { name: string; full_name: string }]
}>()

const router = useRouter()

// Form fields
const fullName   = ref('')
const email      = ref('')
const phone      = ref('')
const jobTitle   = ref('')
const company    = ref('')
const moreOpen   = ref(false)

// Duplicate detection
const dupContact  = ref<{ name: string; full_name: string } | null>(null)
const checkingDup = ref(false)

// Submission state
const saving  = ref(false)
const error   = ref<string | null>(null)

async function checkDuplicate() {
  if (!email.value.trim()) { dupContact.value = null; return }
  checkingDup.value = true
  try {
    const res = await callApi<{ items: Array<{ name: string; full_name: string; email_id?: string }>; total: number }>(
      'dock.api.people.get_list',
      { query: email.value.trim(), limit: 1 }
    )
    // Match on exact email (server returns fuzzy — filter client-side)
    dupContact.value = res.items.find(
      c => c.email_id?.toLowerCase() === email.value.trim().toLowerCase()
    ) ?? null
  } catch {
    dupContact.value = null
  } finally {
    checkingDup.value = false
  }
}

watch(email, () => { dupContact.value = null })

async function submit(andOpen = false) {
  if (!fullName.value.trim()) return
  saving.value = true
  error.value = null
  try {
    const contact = await callApi<{ name: string; full_name: string }>(
      'dock.api.people.create_contact',
      {
        full_name:    fullName.value.trim(),
        email:        email.value.trim()      || undefined,
        phone:        phone.value.trim()      || undefined,
        designation:  jobTitle.value.trim()   || undefined,
        company_name: company.value.trim()    || undefined,
      }
    )
    emit('created', contact)
    if (andOpen) {
      router.push(`/people/${contact.name}`)
    }
    emit('close')
  } catch (e: any) {
    error.value = e.message ?? __('Could not create contact')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <!-- Overlay on mobile -->
  <div class="fixed inset-0 z-30 sm:relative sm:inset-auto" @click.self="emit('close')">
    <!-- Panel -->
    <aside
      class="fixed right-0 top-0 h-full w-full sm:w-96 z-40
             bg-[var(--dock-bg)] border-l border-[var(--dock-border)]
             flex flex-col shadow-xl"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-[var(--dock-border)]">
        <h2 class="text-sm font-semibold text-[var(--dock-text)]">{{ __('New contact') }}</h2>
        <button
          class="w-7 h-7 flex items-center justify-center rounded text-[var(--dock-icon)]
                 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          :aria-label="__('Close')"
          @click="emit('close')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Form -->
      <form class="flex-1 overflow-y-auto px-5 py-4 space-y-4" @submit.prevent>
        <!-- Tier 1 — always visible -->
        <div>
          <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">
            {{ __('Full name') }} <span class="text-red-500">*</span>
          </label>
          <input
            v-model="fullName"
            type="text"
            class="w-full px-3 py-2 rounded-md border border-[var(--dock-border)]
                   bg-transparent text-sm text-[var(--dock-text)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--dock-accent)]/30
                   placeholder:text-[var(--dock-icon)]"
            :placeholder="__('Jane Smith')"
            required
            autofocus
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">{{ __('Email') }}</label>
          <input
            v-model="email"
            type="email"
            class="w-full px-3 py-2 rounded-md border border-[var(--dock-border)]
                   bg-transparent text-sm text-[var(--dock-text)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--dock-accent)]/30
                   placeholder:text-[var(--dock-icon)]"
            :placeholder="__('jane@example.com')"
            @blur="checkDuplicate"
          />
          <!-- Duplicate warning -->
          <p v-if="dupContact" class="mt-1 text-xs text-amber-600 dark:text-amber-400">
            {{ __('This email is already on') }} {{ dupContact.full_name }} —
            <router-link
              :to="`/people/${dupContact.name}`"
              class="underline"
              @click="emit('close')"
            >{{ __('View existing →') }}</router-link>
          </p>
        </div>

        <!-- Tier 2 — always visible below Tier 1 -->
        <div>
          <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">{{ __('Phone') }}</label>
          <input
            v-model="phone"
            type="tel"
            class="w-full px-3 py-2 rounded-md border border-[var(--dock-border)]
                   bg-transparent text-sm text-[var(--dock-text)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--dock-accent)]/30
                   placeholder:text-[var(--dock-icon)]"
            :placeholder="__('+ 1 555 000 0000')"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">{{ __('Job title') }}</label>
          <input
            v-model="jobTitle"
            type="text"
            class="w-full px-3 py-2 rounded-md border border-[var(--dock-border)]
                   bg-transparent text-sm text-[var(--dock-text)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--dock-accent)]/30
                   placeholder:text-[var(--dock-icon)]"
            :placeholder="__('Product Manager')"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">{{ __('Company') }}</label>
          <input
            v-model="company"
            type="text"
            class="w-full px-3 py-2 rounded-md border border-[var(--dock-border)]
                   bg-transparent text-sm text-[var(--dock-text)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--dock-accent)]/30
                   placeholder:text-[var(--dock-icon)]"
            :placeholder="__('Acme Corp')"
          />
        </div>

        <!-- Tier 3 — "More fields" expander (placeholder) -->
        <button
          type="button"
          class="flex items-center gap-1 text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
          @click="moreOpen = !moreOpen"
        >
          <ChevronDown class="w-3.5 h-3.5 transition-transform" :class="moreOpen ? '' : '-rotate-90'" />
          {{ __('More fields') }}
        </button>

        <div v-if="moreOpen" class="text-xs text-[var(--dock-icon)] px-1">
          {{ __('Additional fields (address, notes, etc.) can be edited after creating the contact.') }}
        </div>

        <!-- Error -->
        <p v-if="error" class="text-xs text-red-600 dark:text-red-400">{{ error }}</p>
      </form>

      <!-- CTAs -->
      <div class="px-5 py-4 border-t border-[var(--dock-border)] flex gap-2">
        <button
          class="flex-1 px-4 py-2 rounded-md border border-[var(--dock-border)]
                 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10
                 transition-colors disabled:opacity-50"
          :disabled="saving || !fullName.trim()"
          @click="submit(false)"
        >
          {{ saving ? __('Creating…') : __('Create') }}
        </button>
        <button
          class="flex-1 px-4 py-2 rounded-md
                 bg-[var(--dock-accent)] text-white text-sm font-medium
                 hover:opacity-90 transition-opacity disabled:opacity-50"
          :disabled="saving || !fullName.trim()"
          @click="submit(true)"
        >
          {{ __('Create & Open') }}
        </button>
      </div>
    </aside>
  </div>
</template>
