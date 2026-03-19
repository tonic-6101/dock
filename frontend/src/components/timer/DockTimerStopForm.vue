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
  <!-- Post-stop confirmation (shown as soon as entryName is no longer undefined) -->
  <div v-if="entryName !== undefined" class="p-3 space-y-2">
    <p class="text-sm text-green-600 dark:text-green-400 font-medium">✓ {{ __('Time entry saved') }}</p>
    <a
      v-if="entryName"
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
        class="dock-timer-btn dock-timer-btn--accent flex-1"
        :disabled="loading"
        @click="emit('stop', notes)"
      >⏹ {{ __('Stop & Save') }}</button>
      <button
        class="dock-timer-btn dock-timer-btn--ghost"
        @click="emit('cancel')"
      >{{ __('Cancel') }}</button>
    </div>
  </div>
</template>

<style scoped>
.dock-timer-btn {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid var(--dock-border);
  color: var(--dock-text);
  background: transparent;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.dock-timer-btn:hover {
  background: color-mix(in srgb, var(--dock-text) 8%, transparent);
}
.dock-timer-btn:disabled {
  opacity: 0.5;
  cursor: default;
}
.dock-timer-btn--accent {
  border-color: var(--dock-accent);
  color: var(--dock-accent);
}
.dock-timer-btn--accent:hover {
  background: color-mix(in srgb, var(--dock-accent) 10%, transparent);
}
.dock-timer-btn--ghost {
  border: none;
  color: var(--dock-icon);
}
.dock-timer-btn--ghost:hover {
  color: var(--dock-text);
}
</style>
