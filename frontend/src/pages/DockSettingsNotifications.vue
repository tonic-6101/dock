<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Notification preferences page.
  Allows users to configure which notification types they receive,
  email digest frequency, mute rules, and quiet hours.

  Spec: dock.localhost/spec/features/unified-settings.md
-->
<script lang="ts">
export default { name: 'DockSettingsNotifications' }
</script>

<script setup lang="ts">
import { __ } from '@/composables/useTranslate'
</script>

<template>
  <div class="max-w-2xl px-6 py-6">
    <h1 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
      {{ __('Notification Settings') }}
    </h1>

    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
      <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
      <h2 class="text-base font-medium text-gray-900 dark:text-white mb-1">
        {{ __('Coming soon') }}
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ __('Notification preferences will be available in v0.2.0. Configure which types you receive, email digest frequency, mute rules, and quiet hours.') }}
      </p>
    </div>
  </div>
</template>
