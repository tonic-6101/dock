<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockAppLabel' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
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

const iconSrc = computed(() => {
  if (activeApp.value?.icon) return activeApp.value.icon
  return dockIconUrl
})

const iconAlt = computed(() => activeApp.value?.label || 'Dock')
</script>

<template>
  <div class="dock-app-label flex items-center gap-2 min-w-0 flex-shrink-0">
    <img :src="iconSrc" :alt="iconAlt" class="h-6 w-6 rounded-md flex-shrink-0" />
    <span class="text-sm font-medium text-[var(--dock-text)] truncate max-w-[140px]">
      {{ label }}
    </span>
  </div>
</template>
