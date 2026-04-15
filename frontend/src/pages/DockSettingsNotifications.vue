<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Notification preferences page.
  Per-app master toggles, delivery channel selection, per-type toggles, and event reminder defaults.
-->
<script lang="ts">
export default { name: 'DockSettingsNotifications' }
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bell, Mail, BellRing, ChevronDown, ChevronRight } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'

interface TypeInfo {
  label: string
  icon: string
  app: string
}

const { registeredApps } = useDockBoot()
const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot

const notificationTypes = computed<Record<string, TypeInfo>>(() => boot?.notification_types ?? {})

// --- State ---
const mutedTypes = ref<Set<string>>(new Set(boot?.muted_notification_types ?? []))
const mutedApps = ref<Set<string>>(new Set(boot?.muted_apps ?? []))
const deliveryChannels = ref<Record<string, string>>(boot?.app_delivery_channels ?? {})
const reminderEnabled = ref<boolean>(boot?.event_reminder_defaults?.enabled ?? false)
const reminderMinutes = ref<number>(boot?.event_reminder_defaults?.minutes ?? 15)
const expandedApps = ref<Set<string>>(new Set())

const saving = ref(false)
const saved = ref(false)

const REMINDER_OPTIONS = [5, 10, 15, 30, 60]
const CHANNEL_OPTIONS: { value: string; label: string }[] = [
  { value: 'bell', label: 'Bell' },
  { value: 'email', label: 'Email' },
  { value: 'both', label: 'Both' },
]

// Group types by app
const groupedTypes = computed(() => {
  const groups: Record<string, {
    app: string; label: string; color: string;
    types: Array<{ key: string; info: TypeInfo }>
  }> = {}

  for (const [key, info] of Object.entries(notificationTypes.value)) {
    if (!groups[info.app]) {
      type App = { app: string; label: string; color?: string }
      const reg = (registeredApps.value as App[]).find(a => a.app === info.app)
      groups[info.app] = {
        app: info.app,
        label: reg?.label ?? info.app,
        color: reg?.color ?? '#6b7280',
        types: [],
      }
    }
    groups[info.app].types.push({ key, info })
  }

  return Object.values(groups).sort((a, b) => a.label.localeCompare(b.label))
})

const hasTypes = computed(() => Object.keys(notificationTypes.value).length > 0)

// --- Helpers ---
function isAppEnabled(app: string): boolean {
  return !mutedApps.value.has(app)
}

function isTypeEnabled(typeKey: string): boolean {
  return !mutedTypes.value.has(typeKey)
}

function getChannel(app: string): string {
  return deliveryChannels.value[app] ?? 'both'
}

function isExpanded(app: string): boolean {
  return expandedApps.value.has(app)
}

function toggleExpand(app: string) {
  const next = new Set(expandedApps.value)
  if (next.has(app)) next.delete(app)
  else next.add(app)
  expandedApps.value = next
}

// --- Save helper ---
async function savePrefs(partial: Record<string, unknown>) {
  saving.value = true
  saved.value = false
  try {
    await callApi('dock.api.settings.save_notification_preferences', partial)
    saved.value = true
    setTimeout(() => (saved.value = false), 2000)
  } finally {
    saving.value = false
  }
}

// --- Toggles ---
async function toggleApp(app: string) {
  const next = new Set(mutedApps.value)
  if (next.has(app)) next.delete(app)
  else next.add(app)
  mutedApps.value = next
  await savePrefs({ muted_apps: [...next] })
}

async function toggleType(typeKey: string) {
  const next = new Set(mutedTypes.value)
  if (next.has(typeKey)) next.delete(typeKey)
  else next.add(typeKey)
  mutedTypes.value = next
  await savePrefs({ muted_notification_types: [...next] })
}

async function setChannel(app: string, channel: string) {
  const next = { ...deliveryChannels.value, [app]: channel }
  deliveryChannels.value = next
  await savePrefs({ app_delivery_channels: next })
}

async function toggleReminderEnabled() {
  reminderEnabled.value = !reminderEnabled.value
  await savePrefs({
    event_reminder_enabled: reminderEnabled.value ? 1 : 0,
    event_reminder_minutes: reminderMinutes.value,
  })
}

async function setReminderMinutes(mins: number) {
  reminderMinutes.value = mins
  await savePrefs({ event_reminder_minutes: mins })
}
</script>

<template>
  <div class="max-w-2xl px-6 py-6">
    <h1 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
      {{ __('Notification Settings') }}
    </h1>

    <!-- Empty state: no types registered -->
    <div v-if="!hasTypes" class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center">
      <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
      <h2 class="text-base font-medium text-gray-900 dark:text-white mb-1">
        {{ __('No notification types registered') }}
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ __('Installed apps will register their notification types here.') }}
      </p>
    </div>

    <template v-else>

      <!-- Section: Per-app notification cards -->
      <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {{ __('Control notifications per app. Expand to toggle individual types.') }}
      </p>

      <div class="space-y-3">
        <section
          v-for="group in groupedTypes"
          :key="group.app"
          class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
        >
          <!-- App header row -->
          <div class="flex items-center justify-between gap-3 px-5 py-4">
            <div class="flex items-center gap-3 min-w-0">
              <!-- Master toggle -->
              <button
                class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400 focus:ring-offset-2"
                :class="isAppEnabled(group.app) ? 'bg-accent-600 dark:bg-accent-400' : 'bg-gray-200 dark:bg-gray-600'"
                role="switch"
                :aria-checked="isAppEnabled(group.app)"
                :aria-label="__('Enable notifications from {0}', [group.label])"
                @click="toggleApp(group.app)"
              >
                <span
                  class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  :class="isAppEnabled(group.app) ? 'translate-x-4' : 'translate-x-0'"
                />
              </button>

              <!-- App label + expand -->
              <button
                class="flex items-center gap-1.5 min-w-0"
                @click="toggleExpand(group.app)"
              >
                <div class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: group.color }" />
                <span class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ group.label }}</span>
                <span class="text-xs text-gray-400 dark:text-gray-500">({{ group.types.length }})</span>
                <component
                  :is="isExpanded(group.app) ? ChevronDown : ChevronRight"
                  class="w-3.5 h-3.5 text-gray-400 shrink-0"
                />
              </button>
            </div>

            <!-- Channel selector -->
            <div
              v-if="isAppEnabled(group.app)"
              class="flex items-center rounded-md border border-gray-200 dark:border-gray-600 overflow-hidden shrink-0"
            >
              <button
                v-for="ch in CHANNEL_OPTIONS"
                :key="ch.value"
                class="flex items-center gap-1 px-2 py-1 text-xs transition-colors"
                :class="getChannel(group.app) === ch.value
                  ? 'bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'"
                :aria-label="__('Deliver via {0}', [ch.label])"
                @click="setChannel(group.app, ch.value)"
              >
                <Bell v-if="ch.value === 'bell'" class="w-3 h-3" />
                <Mail v-else-if="ch.value === 'email'" class="w-3 h-3" />
                <BellRing v-else class="w-3 h-3" />
                <span class="hidden sm:inline">{{ __(ch.label) }}</span>
              </button>
            </div>
          </div>

          <!-- Expanded: per-type toggles -->
          <div
            v-if="isExpanded(group.app)"
            class="border-t border-gray-100 dark:border-gray-700 px-5 py-3 space-y-2.5"
            :class="{ 'opacity-50 pointer-events-none': !isAppEnabled(group.app) }"
          >
            <div
              v-for="t in group.types"
              :key="t.key"
              class="flex items-center justify-between gap-3"
            >
              <div>
                <p class="text-sm text-gray-900 dark:text-white">{{ t.info.label }}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">{{ t.key }}</p>
              </div>

              <button
                class="relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400 focus:ring-offset-1"
                :class="isTypeEnabled(t.key) ? 'bg-accent-600 dark:bg-accent-400' : 'bg-gray-200 dark:bg-gray-600'"
                role="switch"
                :aria-checked="isTypeEnabled(t.key)"
                :aria-label="t.info.label"
                @click="toggleType(t.key)"
              >
                <span
                  class="pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  :class="isTypeEnabled(t.key) ? 'translate-x-3' : 'translate-x-0'"
                />
              </button>
            </div>
          </div>
        </section>
      </div>

      <!-- Section: Event Reminders -->
      <div class="mt-8">
        <h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
          {{ __('Event Reminders') }}
        </h2>
        <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
          {{ __('Set default reminder behaviour for new calendar events.') }}
        </p>

        <div class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 space-y-4">
          <!-- Enable toggle -->
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ __('Always enable reminders on new events') }}
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-500">
                {{ __('New events will default to sending a reminder before they start.') }}
              </p>
            </div>

            <button
              class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400 focus:ring-offset-2"
              :class="reminderEnabled ? 'bg-accent-600 dark:bg-accent-400' : 'bg-gray-200 dark:bg-gray-600'"
              role="switch"
              :aria-checked="reminderEnabled"
              :aria-label="__('Always enable reminders')"
              @click="toggleReminderEnabled"
            >
              <span
                class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                :class="reminderEnabled ? 'translate-x-4' : 'translate-x-0'"
              />
            </button>
          </div>

          <!-- Minutes selector -->
          <div v-if="reminderEnabled" class="flex items-center gap-3">
            <label class="text-sm text-gray-700 dark:text-gray-300 shrink-0">
              {{ __('Remind me') }}
            </label>
            <div class="flex items-center gap-1.5">
              <button
                v-for="mins in REMINDER_OPTIONS"
                :key="mins"
                class="px-2.5 py-1 text-xs rounded-md border transition-colors"
                :class="reminderMinutes === mins
                  ? 'bg-accent-50 dark:bg-accent-900/30 border-accent-300 dark:border-accent-700 text-accent-700 dark:text-accent-300 font-medium'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'"
                @click="setReminderMinutes(mins)"
              >
                {{ mins === 60 ? __('1 hour') : __(`${mins} min`) }}
              </button>
            </div>
            <span class="text-sm text-gray-700 dark:text-gray-300 shrink-0">{{ __('before') }}</span>
          </div>
        </div>
      </div>

      <!-- Save feedback -->
      <p v-if="saved" class="mt-3 text-xs text-green-600 dark:text-green-400">{{ __('Saved') }}</p>
    </template>
  </div>
</template>
