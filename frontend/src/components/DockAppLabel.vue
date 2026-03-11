<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockAppLabel' }
</script>

<script setup lang="ts">
import { useDockBoot } from '@/composables/useDockBoot'
import dockIconUrl from '@/assets/dock-icon.svg'

const { settings } = useDockBoot()
</script>

<template>
  <div class="dock-app-label flex items-center gap-2 min-w-0">
    <img :src="dockIconUrl" alt="Dock" class="h-7 w-7 rounded-lg flex-shrink-0" />
    <span class="text-sm font-semibold text-[var(--dock-text)] truncate max-w-[140px]">
      {{ settings?.site_label || 'Desk' }}
    </span>
  </div>
</template>
