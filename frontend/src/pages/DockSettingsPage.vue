<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockSettingsPage' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useDockSettings } from '@/composables/useDockSettings'
import DockSettingsPersonal from '@/components/settings/DockSettingsPersonal.vue'
import DockSettingsOrganization from '@/components/settings/DockSettingsOrganization.vue'

const settings      = useDockSettings()
const isDockManager = (window as any).dockBoot?.is_dock_manager ?? false
const reloadBanner  = ref(false)

function reload() { window.location.reload() }
</script>

<template>
  <div class="max-w-2xl mx-auto px-6 py-8 space-y-10">
    <h1 class="text-xl font-semibold text-gray-900 dark:text-white">{{ __('Dock Settings') }}</h1>

    <div
      v-if="reloadBanner"
      class="flex items-center justify-between rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-4 py-3 text-sm text-amber-800 dark:text-amber-300"
    >
      <span>{{ __('Organization settings updated — reload to apply') }}</span>
      <button class="underline ml-4" @click="reload">{{ __('Reload') }}</button>
    </div>

    <DockSettingsPersonal :settings="settings" />

    <hr class="border-gray-100 dark:border-gray-700" />

    <DockSettingsOrganization
      v-if="isDockManager"
      :settings="settings"
      @saved="reloadBanner = true"
    />
  </div>
</template>
