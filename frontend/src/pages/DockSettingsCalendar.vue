<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Calendar preferences page.
  Allows users to configure default view, working hours,
  weekend display, and calendar source toggles.

  Spec: dock.localhost/spec/features/unified-settings.md
-->
<script lang="ts">
export default { name: 'DockSettingsCalendar' }
</script>

<script setup lang="ts">
import { __ } from '@/composables/useTranslate'
</script>

<template>
  <div class="max-w-2xl mx-auto px-6 py-8 space-y-10">
    <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
      {{ __('Calendar Settings') }}
    </h1>

    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
      <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 class="text-base font-medium text-gray-900 dark:text-white mb-1">
        {{ __('Coming soon') }}
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ __('Calendar preferences will be available in v0.2.0. Configure default view, working hours, weekend display, and which apps appear as calendar sources.') }}
      </p>
    </div>
  </div>
</template>
