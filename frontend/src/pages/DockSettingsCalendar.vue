<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Calendar preferences page.
  Allows users to configure default view, working hours,
  weekend display, and time format.
-->
<script lang="ts">
export default { name: 'DockSettingsCalendar' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockSettings } from '@/composables/useDockSettings'

const settings = useDockSettings()

const defaultView    = ref(settings.value.calendarDefaultView)
const timeFormat     = ref(settings.value.calendarTimeFormat)
const showWeekends   = ref(settings.value.calendarShowWeekends)
const workStart      = ref(settings.value.calendarWorkingHoursStart)
const workEnd        = ref(settings.value.calendarWorkingHoursEnd)

const saving = ref(false)
const saved  = ref(false)

const viewOptions = [
  { value: 'week',   label: __('Week') },
  { value: 'month',  label: __('Month') },
  { value: 'day',    label: __('Day') },
  { value: 'agenda', label: __('Agenda') },
]

const timeFormatOptions = [
  { value: '',   label: __('Browser default') },
  { value: '12h', label: __('12-hour (AM/PM)') },
  { value: '24h', label: __('24-hour') },
]

const workStartOptions = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
]

const workEndOptions = [
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00',
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

watch(defaultView,  val => savePreference('calendar_default_view', val))
watch(timeFormat,   val => savePreference('calendar_time_format', val))
watch(showWeekends, val => savePreference('calendar_show_weekends', val ? '1' : '0'))
watch(workStart,    val => savePreference('calendar_working_hours_start', val))
watch(workEnd,      val => savePreference('calendar_working_hours_end', val))
</script>

<template>
  <div class="max-w-2xl px-6 py-6">
    <h1 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
      {{ __('Calendar Settings') }}
    </h1>

    <div class="space-y-6">
    <section class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
      <h2 class="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{{ __('Display') }}</h2>

      <div class="space-y-5">
        <!-- Default view -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ __('Default view') }}</label>
          <div class="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              v-for="o in viewOptions"
              :key="o.value"
              class="px-4 py-1.5 text-sm transition-colors"
              :class="defaultView === o.value
                ? 'bg-accent-600 dark:bg-accent-400 text-white dark:text-gray-900 font-medium'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'"
              @click="defaultView = o.value as typeof defaultView"
            >
              {{ o.label }}
            </button>
          </div>
        </div>

        <!-- Time format -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ __('Time format') }}</label>
          <select
            v-model="timeFormat"
            class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
          >
            <option v-for="o in timeFormatOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
        </div>

        <!-- Show weekends -->
        <div class="flex items-center gap-3">
          <button
            class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400 focus:ring-offset-2"
            :class="showWeekends ? 'bg-accent-600 dark:bg-accent-400' : 'bg-gray-200 dark:bg-gray-600'"
            role="switch"
            :aria-checked="showWeekends"
            @click="showWeekends = !showWeekends"
          >
            <span
              class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              :class="showWeekends ? 'translate-x-4' : 'translate-x-0'"
            />
          </button>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ __('Show weekends') }}</label>
        </div>
      </div>
    </section>

    <section class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
      <h2 class="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{{ __('Working Hours') }}</h2>
      <p class="mb-4 text-xs text-gray-400 dark:text-gray-500">{{ __('The calendar auto-scrolls to this range and dims hours outside it.') }}</p>

      <div class="flex items-center gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{{ __('Start') }}</label>
          <select
            v-model="workStart"
            class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
          >
            <option v-for="h in workStartOptions" :key="h" :value="h">{{ h }}</option>
          </select>
        </div>

        <span class="mt-5 text-gray-400">–</span>

        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{{ __('End') }}</label>
          <select
            v-model="workEnd"
            class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400"
          >
            <option v-for="h in workEndOptions" :key="h" :value="h">{{ h }}</option>
          </select>
        </div>
      </div>
    </section>

    </div>

    <!-- Save feedback -->
    <p v-if="saved" class="mt-3 text-xs text-green-600 dark:text-green-400">{{ __('Saved') }}</p>
  </div>
</template>
