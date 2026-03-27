<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockAppLabel' }
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDockBoot } from '@/composables/useDockBoot'
import dockIconUrl from '@/assets/dock-icon.svg'

const props = defineProps<{
  currentPath?: string
}>()

const { settings, registeredApps } = useDockBoot()

type RegApp = { app: string; label: string; icon: string; color?: string; route: string }

const activeApp = computed(() => {
  const path = props.currentPath || window.location.pathname
  return (registeredApps.value as RegApp[]).find(a => path.startsWith(a.route)) ?? null
})

const label = computed(() => {
  if (activeApp.value) return activeApp.value.label
  const raw = settings.value?.site_label || 'Dock'
  return raw.charAt(0).toUpperCase() + raw.slice(1)
})

const iconBroken = ref(false)

const hasIcon = computed(() => !!activeApp.value?.icon && !iconBroken.value)

const iconSrc = computed(() => {
  if (activeApp.value?.icon) return activeApp.value.icon
  return dockIconUrl
})

// Reset broken state when navigating to a different app
watch(() => activeApp.value?.app, () => { iconBroken.value = false })

const iconAlt = computed(() => activeApp.value?.label || 'Dock')

/** First letter of the app label — used as fallback when no icon is provided. */
const letterFallback = computed(() => activeApp.value?.label?.[0] ?? 'D')

/** App color for the letter fallback background. */
const appColor = computed(() => activeApp.value?.color ?? 'var(--dock-accent)')
</script>

<template>
  <div class="dock-app-label flex items-center gap-2 min-w-0 flex-shrink-0">
    <!-- App icon or letter fallback -->
    <img
      v-if="hasIcon || !activeApp"
      :src="iconSrc"
      :alt="iconAlt"
      class="h-6 w-6 rounded-md flex-shrink-0"
      @error="iconBroken = true"
    />
    <svg
      v-else
      viewBox="0 0 24 24"
      class="h-6 w-6 flex-shrink-0"
      :aria-label="iconAlt"
    >
      <rect width="24" height="24" rx="6" :fill="appColor" />
      <text
        x="12" y="12"
        text-anchor="middle"
        dominant-baseline="central"
        fill="white"
        font-size="13"
        font-weight="700"
        font-family="system-ui, -apple-system, sans-serif"
      >{{ letterFallback }}</text>
    </svg>
    <span class="text-sm font-medium text-[var(--dock-text)] truncate max-w-[140px]">
      {{ label }}
    </span>
  </div>
</template>
