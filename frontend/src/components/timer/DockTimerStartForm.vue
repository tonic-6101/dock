<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockTimerStartForm' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'

interface Context { app: string; doctype: string; name: string; label: string }

const props = defineProps<{ pending?: Context | null; loading?: boolean }>()
const emit = defineEmits<{ start: [ctx: Context | null]; cancel: [] }>()

const ctx = ref<Context | null>(props.pending ?? null)
</script>

<template>
  <div class="p-3 space-y-3">
    <p class="text-xs font-medium text-[var(--dock-text)]">{{ __('Start Timer') }}</p>

    <!-- Context chip -->
    <div v-if="ctx" class="flex items-center gap-1.5 bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 text-xs text-[var(--dock-text)]">
      <span class="truncate">{{ ctx.label }} · {{ ctx.doctype }}</span>
      <button class="shrink-0 text-[var(--dock-icon)] hover:text-[var(--dock-text)]" @click="ctx = null">
        <X class="w-3 h-3" />
      </button>
    </div>
    <input
      v-else
      type="text"
      class="w-full text-sm rounded border border-[var(--dock-border)] bg-[var(--dock-bg)] text-[var(--dock-text)]
             px-2 py-1.5 placeholder-[var(--dock-icon)] focus:outline-none focus:ring-1 focus:ring-[var(--dock-accent)]"
      :placeholder="__('What are you working on?')"
    />

    <div class="flex gap-2">
      <button
        class="flex-1 px-3 py-1.5 rounded-md bg-[var(--dock-accent)] text-white text-sm font-medium
               hover:opacity-90 transition-opacity disabled:opacity-50"
        :disabled="loading"
        @click="emit('start', ctx)"
      >▶ {{ __('Start') }}</button>
      <button
        class="px-3 py-1.5 rounded-md text-sm text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10"
        @click="emit('cancel')"
      >{{ __('Cancel') }}</button>
    </div>
  </div>
</template>
