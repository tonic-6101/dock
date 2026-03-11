<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockTimerError' }
</script>

<script setup lang="ts">
import { __ } from '@/composables/useTranslate'
defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="p-3 text-sm text-[var(--dock-icon)] text-center">
    {{ __('Timer unavailable') }}
    <button class="underline ml-1 hover:text-[var(--dock-text)]" @click="$emit('retry')">
      {{ __('Try again') }}
    </button>
  </div>
</template>
