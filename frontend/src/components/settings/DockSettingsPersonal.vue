<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockSettingsPersonal' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useRecentItems } from '@/composables/useRecentItems'
import type { DockSettings } from '@/composables/useDockSettings'

const props = defineProps<{ settings: DockSettings }>()

const theme      = ref(props.settings.theme)
const timezone   = ref(props.settings.timezone)
const weekStart  = ref(props.settings.weekStart)
const dateFormat = ref(props.settings.dateFormat)
const language   = ref(props.settings.uiLanguage)

const saving = ref(false)
const saved  = ref(false)

const user = (window as any).dockBoot?.session?.user ?? window.frappe?.session?.user ?? ''

const { clearAll: clearRecentItems } = useRecentItems()
const historyCleared = ref(false)

async function confirmClearHistory() {
  if (!window.confirm(__('This will remove all recent items. Continue?'))) return
  clearRecentItems()
  historyCleared.value = true
  setTimeout(() => (historyCleared.value = false), 2500)
}

const themes = [
  { value: 'light',  label: __('Light') },
  { value: 'dark',   label: __('Dark') },
  { value: 'system', label: __('System') },
]

const weekOptions = [
  { value: 'Monday', label: __('Monday') },
  { value: 'Sunday', label: __('Sunday') },
]

const dateOptions = [
  { value: 'dd/mm/yyyy', label: 'dd/mm/yyyy' },
  { value: 'mm/dd/yyyy', label: 'mm/dd/yyyy' },
  { value: 'yyyy-mm-dd', label: 'yyyy-mm-dd' },
]

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

watch(theme, val => {
  // Apply instantly via CSS — no save button needed
  document.documentElement.classList.remove('light', 'dark')
  if (val !== 'system') document.documentElement.classList.add(val)
  savePreference('theme', val)
})
watch(timezone,   val => savePreference('timezone', val))
watch(weekStart,  val => savePreference('week_start', val))
watch(dateFormat, val => savePreference('date_format', val))
watch(language,   val => savePreference('ui_language', val))
</script>

<template>
  <section class="space-y-5">
    <h2 class="text-base font-semibold text-gray-900 dark:text-white">{{ __('Your Preferences') }}</h2>

    <!-- Theme -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ __('Theme') }}</label>
      <div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          v-for="t in themes"
          :key="t.value"
          class="px-4 py-1.5 text-sm transition-colors"
          :class="theme === t.value
            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'"
          @click="theme = t.value as typeof theme"
        >
          {{ t.label }}
        </button>
      </div>
    </div>

    <!-- Timezone -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Timezone') }}</label>
      <input
        v-model="timezone"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
        :placeholder="__('e.g. Europe/Berlin')"
      />
      <p class="mt-1 text-xs text-gray-400">{{ __('Blank = org default') }}: {{ settings.timezone }}</p>
    </div>

    <!-- Week starts on -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Week starts on') }}</label>
      <select
        v-model="weekStart"
        class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
      >
        <option value="">{{ __('Org default') }}</option>
        <option v-for="o in weekOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
    </div>

    <!-- Date format -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Date format') }}</label>
      <select
        v-model="dateFormat"
        class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
      >
        <option value="">{{ __('Org default') }}</option>
        <option v-for="o in dateOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
    </div>

    <!-- Language -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Language') }}</label>
      <input
        v-model="language"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
        :placeholder="__('e.g. en, fr, de')"
      />
      <p class="mt-1 text-xs text-gray-400">{{ __('Blank = org default') }}: {{ settings.uiLanguage }}</p>
    </div>

    <!-- My Account -->
    <div class="pt-2 border-t border-gray-100 dark:border-gray-700">
      <a
        :href="`/app/user/${user}`"
        class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors underline underline-offset-2"
      >
        {{ __('My Account') }} →
      </a>
      <p class="mt-0.5 text-xs text-gray-400">{{ __('Password, 2FA, profile picture') }}</p>
    </div>

    <!-- Recent items privacy -->
    <div v-if="settings.enableRecentItems" class="pt-2 border-t border-gray-100 dark:border-gray-700">
      <button
        class="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors underline underline-offset-2"
        @click="confirmClearHistory"
      >{{ __('Clear recent items history') }}</button>
      <p v-if="historyCleared" class="mt-1 text-xs text-green-600 dark:text-green-400">
        {{ __('History cleared') }}
      </p>
    </div>

    <!-- Save feedback -->
    <p v-if="saved" class="text-xs text-green-600 dark:text-green-400">{{ __('Saved') }}</p>
  </section>
</template>
