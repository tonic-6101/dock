<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockSearchEmpty' }
</script>

<script setup lang="ts">
import { __ } from '@/composables/useTranslate'

const props = defineProps<{ query: string; scopedApp?: string | null }>()
const emit  = defineEmits<{ clearScope: [] }>()
</script>

<template>
  <div class="px-4 py-6 text-center text-sm text-[var(--dock-icon)]">
    <p v-if="scopedApp">
      {{ __('No results for "{0}"').replace('{0}', query) }} {{ __('in {0}').replace('{0}', scopedApp) }}
    </p>
    <p v-else>{{ __('No results for "{0}"').replace('{0}', query) }}</p>
    <button
      v-if="scopedApp"
      class="mt-2 text-[var(--dock-accent)] hover:underline"
      @click="emit('clearScope')"
    >{{ __('Search in All apps') }}</button>
  </div>
</template>
