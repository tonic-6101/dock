<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockTimerStopForm' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { __ } from '@/composables/useTranslate'

const props = defineProps<{ loading?: boolean; entryName?: string | null }>()
const emit  = defineEmits<{ stop: [notes: string]; cancel: [] }>()

const notes = ref('')
</script>

<template>
  <!-- Post-stop confirmation -->
  <div v-if="entryName !== undefined && entryName !== null" class="p-3 space-y-2">
    <p class="text-sm text-green-600 dark:text-green-400 font-medium">✓ {{ __('Time entry saved') }}</p>
    <a
      :href="`/app/ft-time-entry/${entryName}`"
      class="text-xs text-[var(--dock-accent)] hover:underline"
    >{{ __('View time entry') }} →</a>
  </div>

  <!-- Stop form -->
  <div v-else class="p-3 space-y-3">
    <textarea
      v-model="notes"
      class="w-full text-sm rounded border border-[var(--dock-border)] bg-[var(--dock-bg)]
             text-[var(--dock-text)] px-2 py-1.5 resize-none h-16
             placeholder-[var(--dock-icon)] focus:outline-none focus:ring-1 focus:ring-[var(--dock-accent)]"
      :placeholder="__('Add notes...')"
    />
    <div class="flex gap-2">
      <button
        class="flex-1 px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium
               hover:bg-red-600 transition-colors disabled:opacity-50"
        :disabled="loading"
        @click="emit('stop', notes)"
      >⏹ {{ __('Stop & Save') }}</button>
      <button
        class="px-3 py-1.5 rounded-md text-sm text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10"
        @click="emit('cancel')"
      >{{ __('Cancel') }}</button>
    </div>
  </div>
</template>
