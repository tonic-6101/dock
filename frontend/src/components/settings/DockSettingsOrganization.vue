<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockSettingsOrganization' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import type { DockSettings } from '@/composables/useDockSettings'

const props = defineProps<{ settings: DockSettings }>()
const emit  = defineEmits<{ saved: [] }>()

const siteLabel    = ref(props.settings.siteLabel)
const defaultApp   = ref(props.settings.defaultApp)
const timezone     = ref(props.settings.timezone)
const weekStart    = ref(props.settings.weekStart)
const dateFormat   = ref(props.settings.dateFormat)
const language     = ref(props.settings.uiLanguage)
const currency     = ref(props.settings.currency)
const numberFormat = ref(props.settings.numberFormat)
const timerEnabled = ref(props.settings.enableGlobalTimer)
const bookmarks    = ref(props.settings.enableBookmarks)
const recentItems  = ref(props.settings.enableRecentItems)
const recentLimit  = ref(props.settings.recentItemsLimit)

const saving = ref(false)
const saved  = ref(false)
const error  = ref('')

const weekOptions = [
  { value: 'Monday', label: __('Monday') },
  { value: 'Sunday', label: __('Sunday') },
]

const dateOptions = [
  { value: 'dd/mm/yyyy', label: 'dd/mm/yyyy' },
  { value: 'mm/dd/yyyy', label: 'mm/dd/yyyy' },
  { value: 'yyyy-mm-dd', label: 'yyyy-mm-dd' },
]

async function save() {
  saving.value = true
  saved.value  = false
  error.value  = ''
  try {
    await callApi('dock.api.settings.save_org_settings', {
      values: {
        site_label:          siteLabel.value,
        default_app:         defaultApp.value,
        timezone:            timezone.value,
        week_start:          weekStart.value,
        date_format:         dateFormat.value,
        ui_language:         language.value,
        currency:            currency.value,
        number_format:       numberFormat.value,
        enable_global_timer: timerEnabled.value ? 1 : 0,
        enable_bookmarks:    bookmarks.value ? 1 : 0,
        enable_recent_items: recentItems.value ? 1 : 0,
        recent_items_limit:  recentLimit.value,
      },
    })
    saved.value = true
    emit('saved')
    setTimeout(() => (saved.value = false), 3000)
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : __('Save failed')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section class="space-y-5">
    <h2 class="text-base font-semibold text-gray-900 dark:text-white">{{ __('Organization Defaults') }}</h2>

    <!-- Site label -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Site label') }}</label>
      <input
        v-model="siteLabel"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
        :placeholder="__('Displayed in the top bar')"
      />
    </div>

    <!-- Default app -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Default app on login') }}</label>
      <input
        v-model="defaultApp"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
        placeholder="/app"
      />
    </div>

    <!-- Timezone -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Timezone') }}</label>
      <input
        v-model="timezone"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
        placeholder="Europe/Berlin"
      />
    </div>

    <!-- Week start -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Week starts on') }}</label>
      <select
        v-model="weekStart"
        class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
      >
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
        <option v-for="o in dateOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
    </div>

    <!-- Language -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Language') }}</label>
      <input
        v-model="language"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
        placeholder="en"
      />
    </div>

    <!-- Currency -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Currency') }}</label>
      <input
        v-model="currency"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
        placeholder="EUR"
      />
    </div>

    <!-- Number format -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Number format') }}</label>
      <input
        v-model="numberFormat"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
        placeholder="#.###,##"
      />
    </div>

    <!-- Feature toggles -->
    <div class="space-y-3 pt-1">
      <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ __('Features') }}</p>

      <label class="flex items-center gap-3 cursor-pointer">
        <input v-model="timerEnabled" type="checkbox" class="w-4 h-4 rounded accent-gray-900" />
        <span class="text-sm text-gray-700 dark:text-gray-300">{{ __('Enable global timer') }}</span>
      </label>

      <label class="flex items-center gap-3 cursor-pointer">
        <input v-model="bookmarks" type="checkbox" class="w-4 h-4 rounded accent-gray-900" />
        <span class="text-sm text-gray-700 dark:text-gray-300">{{ __('Enable bookmarks') }}</span>
      </label>

      <label class="flex items-center gap-3 cursor-pointer">
        <input v-model="recentItems" type="checkbox" class="w-4 h-4 rounded accent-gray-900" />
        <span class="text-sm text-gray-700 dark:text-gray-300">{{ __('Enable recent items') }}</span>
      </label>

      <div v-if="recentItems" class="flex items-center gap-2 pl-7">
        <label class="text-xs text-gray-500 dark:text-gray-400">{{ __('Limit') }}</label>
        <input
          v-model.number="recentLimit"
          type="number"
          min="5"
          max="100"
          class="w-20 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
    </div>

    <!-- Save -->
    <div class="flex items-center gap-3 pt-2">
      <button
        class="px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
        :disabled="saving"
        @click="save"
      >
        {{ saving ? __('Saving…') : __('Save organization settings') }}
      </button>
      <span v-if="saved"  class="text-xs text-green-600 dark:text-green-400">{{ __('Saved') }}</span>
      <span v-if="error"  class="text-xs text-red-600 dark:text-red-400">{{ error }}</span>
    </div>
  </section>
</template>
