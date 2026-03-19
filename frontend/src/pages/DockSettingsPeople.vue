<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  People/contacts preferences page.
  Allows users to configure display name format,
  default visible fields, and sync preferences.

  Spec: dock.localhost/spec/features/unified-settings.md
-->
<script lang="ts">
export default { name: 'DockSettingsPeople' }
</script>

<script setup lang="ts">
import { __ } from '@/composables/useTranslate'
</script>

<template>
  <div class="max-w-2xl mx-auto px-6 py-8 space-y-10">
    <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
      {{ __('People Settings') }}
    </h1>

    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
      <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <h2 class="text-base font-medium text-gray-900 dark:text-white mb-1">
        {{ __('Coming soon') }}
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ __('People preferences will be available in v0.2.0. Configure display name format, default contact card fields, and sync settings.') }}
      </p>
    </div>
  </div>
</template>
