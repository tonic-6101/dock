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

const { settings } = useDockBoot()

const label = computed(() => {
  const raw = settings.value?.site_label || 'Dock'
  return raw.charAt(0).toUpperCase() + raw.slice(1)
})
</script>

<template>
  <div class="dock-app-label flex items-center gap-2 min-w-0">
    <img :src="dockIconUrl" alt="Dock" class="h-6 w-6 rounded-md flex-shrink-0" />
    <span class="text-sm font-medium text-[var(--dock-text)] truncate max-w-[140px]">
      {{ label }}
    </span>
  </div>
</template>
