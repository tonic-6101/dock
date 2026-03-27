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

const calDefaultView = ref(props.settings.calendarDefaultView)
const calTimeFormat  = ref(props.settings.calendarTimeFormat)
const calShowWeekends = ref(props.settings.calendarShowWeekends)
const calWorkStart   = ref(props.settings.calendarWorkingHoursStart)
const calWorkEnd     = ref(props.settings.calendarWorkingHoursEnd)

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

const calViewOptions = [
  { value: 'week',   label: __('Week') },
  { value: 'month',  label: __('Month') },
  { value: 'day',    label: __('Day') },
  { value: 'agenda', label: __('Agenda') },
]

const calTimeFormatOptions = [
  { value: '',    label: __('Browser default') },
  { value: '12h', label: __('12-hour (AM/PM)') },
  { value: '24h', label: __('24-hour') },
]

const calWorkStartOptions = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
]

const calWorkEndOptions = [
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00',
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
        calendar_default_view:       calDefaultView.value,
        calendar_time_format:        calTimeFormat.value,
        calendar_show_weekends:      calShowWeekends.value ? '1' : '0',
        calendar_working_hours_start: calWorkStart.value,
        calendar_working_hours_end:   calWorkEnd.value,
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
  <section class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
    <h2 class="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{{ __('Organization Defaults') }}</h2>

    <div class="space-y-5">
    <!-- Site label -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Site label') }}</label>
      <input
        v-model="siteLabel"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
        :placeholder="__('Displayed in the top bar')"
      />
    </div>

    <!-- Default app -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Default app on login') }}</label>
      <input
        v-model="defaultApp"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
        placeholder="/app"
      />
    </div>

    <!-- Timezone -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Timezone') }}</label>
      <input
        v-model="timezone"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
        placeholder="Europe/Berlin"
      />
    </div>

    <!-- Week start -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Week starts on') }}</label>
      <select
        v-model="weekStart"
        class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
      >
        <option v-for="o in weekOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
    </div>

    <!-- Date format -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Date format') }}</label>
      <select
        v-model="dateFormat"
        class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
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
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
        placeholder="en"
      />
    </div>

    <!-- Currency -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Currency') }}</label>
      <input
        v-model="currency"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
        placeholder="EUR"
      />
    </div>

    <!-- Number format -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Number format') }}</label>
      <input
        v-model="numberFormat"
        type="text"
        class="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
        placeholder="#.###,##"
      />
    </div>

    <!-- Feature toggles -->
    <div class="space-y-3 pt-1">
      <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ __('Features') }}</p>

      <label class="flex items-center gap-3 cursor-pointer">
        <input v-model="timerEnabled" type="checkbox" class="w-4 h-4 rounded accent-accent-600" />
        <span class="text-sm text-gray-700 dark:text-gray-300">{{ __('Enable global timer') }}</span>
      </label>

      <label class="flex items-center gap-3 cursor-pointer">
        <input v-model="bookmarks" type="checkbox" class="w-4 h-4 rounded accent-accent-600" />
        <span class="text-sm text-gray-700 dark:text-gray-300">{{ __('Enable bookmarks') }}</span>
      </label>

      <label class="flex items-center gap-3 cursor-pointer">
        <input v-model="recentItems" type="checkbox" class="w-4 h-4 rounded accent-accent-600" />
        <span class="text-sm text-gray-700 dark:text-gray-300">{{ __('Enable recent items') }}</span>
      </label>

      <div v-if="recentItems" class="flex items-center gap-2 pl-7">
        <label class="text-xs text-gray-500 dark:text-gray-400">{{ __('Limit') }}</label>
        <input
          v-model.number="recentLimit"
          type="number"
          min="5"
          max="100"
          class="w-20 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
        />
      </div>
    </div>

    <!-- Calendar defaults -->
    <div class="space-y-3 pt-1">
      <p class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ __('Calendar Defaults') }}</p>
      <p class="text-xs text-gray-400 dark:text-gray-500">{{ __('Organization-wide defaults. Users can override these in personal calendar settings.') }}</p>

      <!-- Default view -->
      <div>
        <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{{ __('Default view') }}</label>
        <select
          v-model="calDefaultView"
          class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
        >
          <option v-for="o in calViewOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </div>

      <!-- Time format -->
      <div>
        <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{{ __('Time format') }}</label>
        <select
          v-model="calTimeFormat"
          class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
        >
          <option v-for="o in calTimeFormatOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </div>

      <!-- Show weekends -->
      <label class="flex items-center gap-3 cursor-pointer">
        <input v-model="calShowWeekends" type="checkbox" class="w-4 h-4 rounded accent-accent-600" />
        <span class="text-sm text-gray-700 dark:text-gray-300">{{ __('Show weekends') }}</span>
      </label>

      <!-- Working hours -->
      <div class="flex items-center gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{{ __('Working hours start') }}</label>
          <select
            v-model="calWorkStart"
            class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
          >
            <option v-for="h in calWorkStartOptions" :key="h" :value="h">{{ h }}</option>
          </select>
        </div>
        <span class="mt-5 text-gray-400">–</span>
        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{{ __('Working hours end') }}</label>
          <select
            v-model="calWorkEnd"
            class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
          >
            <option v-for="h in calWorkEndOptions" :key="h" :value="h">{{ h }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Save -->
    <div class="flex items-center gap-3 pt-2">
      <button
        class="px-4 py-2 rounded-lg bg-accent-600 dark:bg-accent-400 text-white dark:text-gray-900 text-sm font-medium hover:bg-accent-700 dark:hover:bg-accent-300 transition-colors disabled:opacity-50"
        :disabled="saving"
        @click="save"
      >
        {{ saving ? __('Saving…') : __('Save organization settings') }}
      </button>
      <span v-if="saved"  class="text-xs text-green-600 dark:text-green-400">{{ __('Saved') }}</span>
      <span v-if="error"  class="text-xs text-red-600 dark:text-red-400">{{ error }}</span>
    </div>
    </div>
  </section>
</template>
