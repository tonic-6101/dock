<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Notification preferences page.
  Allows users to toggle which notification types they receive in the bell.
  Muted types are stored as a JSON array in Dock User Preference.
-->
<script lang="ts">
export default { name: 'DockSettingsNotifications' }
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
const muted = ref<Set<string>>(new Set(boot?.muted_notification_types ?? []))

const saving = ref(false)
const saved  = ref(false)

// Group types by app for display
const groupedTypes = computed(() => {
  const groups: Record<string, { app: string; label: string; color: string; types: Array<{ key: string; info: TypeInfo }> }> = {}

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

function isEnabled(typeKey: string): boolean {
  return !muted.value.has(typeKey)
}

async function toggleType(typeKey: string) {
  const newMuted = new Set(muted.value)
  if (newMuted.has(typeKey)) {
    newMuted.delete(typeKey)
  } else {
    newMuted.add(typeKey)
  }
  muted.value = newMuted

  saving.value = true
  saved.value  = false
  try {
    await callApi('dock.api.settings.save_notification_preferences', {
      muted_notification_types: [...newMuted],
    })
    saved.value = true
    setTimeout(() => (saved.value = false), 2000)
  } finally {
    saving.value = false
  }
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

    <!-- Notification type toggles grouped by app -->
    <template v-else>
      <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {{ __('Choose which notifications appear in your bell. Muted types are silently skipped.') }}
      </p>

      <div class="space-y-4">
        <section
          v-for="group in groupedTypes"
          :key="group.app"
          class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
        >
          <div class="flex items-center gap-2 mb-4">
            <div class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: group.color }" />
            <h2 class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {{ group.label }}
            </h2>
          </div>

          <div class="space-y-3">
            <div
              v-for="t in group.types"
              :key="t.key"
              class="flex items-center justify-between gap-3"
            >
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ t.info.label }}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">{{ t.key }}</p>
              </div>

              <button
                class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-500 dark:focus:ring-accent-400 focus:ring-offset-2"
                :class="isEnabled(t.key) ? 'bg-accent-600 dark:bg-accent-400' : 'bg-gray-200 dark:bg-gray-600'"
                role="switch"
                :aria-checked="isEnabled(t.key)"
                :aria-label="t.info.label"
                @click="toggleType(t.key)"
              >
                <span
                  class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  :class="isEnabled(t.key) ? 'translate-x-4' : 'translate-x-0'"
                />
              </button>
            </div>
          </div>
        </section>
      </div>

      <!-- Save feedback -->
      <p v-if="saved" class="mt-3 text-xs text-green-600 dark:text-green-400">{{ __('Saved') }}</p>
    </template>
  </div>
</template>
