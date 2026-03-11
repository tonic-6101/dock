<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockNotificationEmpty' }
</script>

<script setup lang="ts">
import { __ } from '@/composables/useTranslate'
</script>

<template>
  <div class="px-3 py-6 text-center text-sm text-[var(--dock-icon)]">
    {{ __("You're all caught up") }}
  </div>
</template>
