<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Dynamic host for app settings components.
  Reads the registered dock_settings_sections from boot data, finds the matching
  app by route param, and lazy-loads the app's settings component from its ESM bundle.

  Spec: dock.localhost/spec/features/unified-settings.md
-->
<script lang="ts">
export default { name: 'DockSettingsAppHost' }
</script>

<script setup lang="ts">
import { computed, defineAsyncComponent, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { __ } from '@/composables/useTranslate'
import { useDockBoot } from '@/composables/useDockBoot'

const route = useRoute()
const { dock } = useDockBoot()

const appName = computed(() => route.params.appName as string)

const section = computed(() => {
  const sections = (dock.value as any)?.settings_sections ?? []
  return sections.find((s: any) => s.route === appName.value) ?? null
})

// Lazy-load the app's settings component from its ESM bundle
const AppSettingsComponent = computed<Component | null>(() => {
  if (!section.value?.bundle || !section.value?.component) return null

  return defineAsyncComponent({
    loader: () =>
      import(/* @vite-ignore */ section.value!.bundle)
        .then((mod: any) => {
          const comp = mod[section.value!.component] ?? mod.default
          if (!comp) {
            throw new Error(
              `Component "${section.value!.component}" not found in bundle "${section.value!.bundle}"`
            )
          }
          return comp
        }),
    loadingComponent: {
      template: `<div class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-dock-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p class="text-sm text-gray-500 dark:text-gray-400">${__('Loading settings...')}</p>
        </div>
      </div>`,
    },
    errorComponent: {
      template: `<div class="max-w-md mx-auto px-6 py-16 text-center">
        <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">${__('Failed to load settings')}</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">${__('The settings component could not be loaded. Please reload the page.')}</p>
      </div>`,
    },
    delay: 200,
    timeout: 15000,
  })
})

const activeSection = computed(() => (route.query.section as string) ?? undefined)
</script>

<template>
  <div class="max-w-2xl mx-auto px-6 py-8">
    <!-- Header -->
    <h1 v-if="section" class="text-xl font-semibold text-gray-900 dark:text-white mb-8">
      {{ section.label }} {{ __('Settings') }}
    </h1>

    <!-- App settings component (lazy-loaded from ESM bundle) -->
    <component
      v-if="AppSettingsComponent"
      :is="AppSettingsComponent"
      :section="activeSection"
    />

    <!-- App not found -->
    <div v-else-if="!section" class="text-center py-20">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {{ __('Settings not found') }}
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ __('No settings registered for this app.') }}
      </p>
    </div>
  </div>
</template>
