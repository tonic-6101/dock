<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockAppLabel' }
</script>

<script setup lang="ts">
import { useDockBoot } from '@/composables/useDockBoot'

const { settings } = useDockBoot()
</script>

<template>
  <span class="dock-app-label text-sm font-semibold text-[var(--dock-text)] truncate max-w-[160px]">
    {{ settings?.site_label || 'Desk' }}
  </span>
</template>
