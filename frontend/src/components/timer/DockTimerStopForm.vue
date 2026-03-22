<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Stop form for the timer panel.
  Notes textarea + "Stop & Save" + "Cancel" buttons.
  Confirmation view is now in DockTimerConfirmation.vue.
-->
<script lang="ts">
export default { name: 'DockTimerStopForm' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { __ } from '@/composables/useTranslate'

defineProps<{ loading?: boolean }>()
const emit = defineEmits<{ stop: [notes: string]; cancel: [] }>()

const notes = ref('')
</script>

<template>
  <div class="dock-stop-form">
    <textarea
      v-model="notes"
      class="dock-stop-notes"
      :placeholder="__('Add notes...')"
    />
    <div class="dock-stop-actions">
      <button
        class="dock-timer-btn dock-timer-btn--stop flex-1"
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
.dock-stop-form {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid var(--dock-border);
}

.dock-stop-notes {
  width: 100%;
  font-size: 0.8125rem;
  border-radius: 0.375rem;
  border: 1px solid var(--dock-border);
  background: var(--dock-bg);
  color: var(--dock-text);
  padding: 0.375rem 0.5rem;
  resize: none;
  height: 4rem;
}
.dock-stop-notes::placeholder { color: var(--dock-icon); }
.dock-stop-notes:focus {
  outline: none;
  box-shadow: 0 0 0 1px var(--dock-accent);
}

.dock-stop-actions {
  display: flex;
  gap: 0.5rem;
}

.dock-timer-btn {
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid var(--dock-border);
  color: var(--dock-text);
  background: transparent;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  text-align: center;
}
.dock-timer-btn:hover {
  background: color-mix(in srgb, var(--dock-text) 8%, transparent);
}
.dock-timer-btn:disabled {
  opacity: 0.5;
  cursor: default;
}
.dock-timer-btn--stop {
  border-color: #ef4444;
  color: #ef4444;
}
.dock-timer-btn--stop:hover {
  background: color-mix(in srgb, #ef4444 8%, transparent);
}
.dock-timer-btn--ghost {
  border: none;
  color: var(--dock-icon);
}
.dock-timer-btn--ghost:hover {
  color: var(--dock-text);
}
</style>
