<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  People/contacts preferences page.
  Allows users to configure display name format
  and default visible fields on contact cards.
-->
<script lang="ts">
export default { name: 'DockSettingsPeople' }
</script>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockSettings } from '@/composables/useDockSettings'

const settings = useDockSettings()

const nameFormat = ref(settings.value.peopleDisplayNameFormat)
const cardFields = ref<string[]>([...settings.value.peopleCardFields])

const saving = ref(false)
const saved  = ref(false)

const nameFormatOptions = [
  { value: 'first_last', label: __('First Last'),   example: 'Astrid de Vries' },
  { value: 'last_first', label: __('Last, First'),  example: 'de Vries, Astrid' },
]

const availableCardFields = [
  { value: 'email_id',      label: __('Email') },
  { value: 'phone',         label: __('Phone') },
  { value: 'company_name',  label: __('Company') },
  { value: 'designation',   label: __('Job title') },
  { value: 'department',    label: __('Department') },
  { value: 'dock_birthday', label: __('Birthday') },
  { value: 'dock_linkedin', label: __('LinkedIn') },
  { value: 'dock_twitter',  label: __('Twitter / X') },
  { value: 'dock_github',   label: __('GitHub') },
]

const previewName = computed(() => {
  return nameFormat.value === 'last_first' ? 'de Vries, Astrid' : 'Astrid de Vries'
})

function isFieldSelected(field: string): boolean {
  return cardFields.value.includes(field)
}

function toggleField(field: string) {
  const idx = cardFields.value.indexOf(field)
  if (idx >= 0) {
    cardFields.value.splice(idx, 1)
  } else {
    cardFields.value.push(field)
  }
}

async function savePreference(field: string, value: string) {
  saving.value = true
  saved.value  = false
  try {
    await callApi('dock.api.settings.save_user_preference', { [field]: value })
    saved.value = true
    setTimeout(() => (saved.value = false), 2000)
  } finally {
    saving.value = false
  }
}

watch(nameFormat, val => savePreference('people_display_name_format', val))
watch(cardFields, val => savePreference('people_card_fields', JSON.stringify(val)), { deep: true })
</script>

<template>
  <div class="max-w-2xl px-6 py-6">
    <h1 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
      {{ __('People Settings') }}
    </h1>

    <div class="space-y-6">
    <!-- Display Name Format -->
    <section class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
      <h2 class="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {{ __('Display') }}
      </h2>

      <div class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ __('Name format') }}
          </label>
          <div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              v-for="o in nameFormatOptions"
              :key="o.value"
              class="px-4 py-1.5 text-sm transition-colors"
              :class="nameFormat === o.value
                ? 'bg-accent-600 dark:bg-accent-400 text-white dark:text-gray-900 font-medium'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'"
              @click="nameFormat = o.value as typeof nameFormat"
            >
              {{ o.label }}
            </button>
          </div>
          <p class="mt-2 text-xs text-gray-400 dark:text-gray-500">
            {{ __('Preview:') }} <span class="font-medium text-gray-600 dark:text-gray-300">{{ previewName }}</span>
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Card Fields -->
    <section class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
      <h2 class="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {{ __('Contact Card Fields') }}
      </h2>
      <p class="mb-4 text-xs text-gray-400 dark:text-gray-500">
        {{ __('Choose which fields appear on contact cards in the People list.') }}
      </p>

      <div class="space-y-2">
        <label
          v-for="f in availableCardFields"
          :key="f.value"
          class="flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer transition-colors"
          :class="isFieldSelected(f.value)
            ? 'bg-accent-50 dark:bg-accent-900/20'
            : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'"
        >
          <button
            class="relative flex-shrink-0 h-5 w-5 rounded border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400 focus:ring-offset-2"
            :class="isFieldSelected(f.value)
              ? 'bg-accent-600 dark:bg-accent-400 border-accent-600 dark:border-accent-400'
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'"
            role="checkbox"
            :aria-checked="isFieldSelected(f.value)"
            @click.prevent="toggleField(f.value)"
          >
            <svg
              v-if="isFieldSelected(f.value)"
              class="absolute inset-0 h-5 w-5 text-white dark:text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <span class="text-sm text-gray-700 dark:text-gray-300">{{ f.label }}</span>
        </label>
      </div>
    </section>

    <!-- Sync (Phase 2 teaser) -->
    <section class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 opacity-60">
      <h2 class="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {{ __('Sync') }}
      </h2>
      <p class="text-xs text-gray-400 dark:text-gray-500">
        {{ __('CardDAV and vCard sync will be available in a future release.') }}
      </p>
    </section>

    </div>

    <!-- Save feedback -->
    <p v-if="saved" class="mt-3 text-xs text-green-600 dark:text-green-400">{{ __('Saved') }}</p>
  </div>
</template>
