<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Lightweight popover for creating a new user calendar.
  Name + color grid. That's it.
-->
<script lang="ts">
export default { name: 'CreateCalendarPopover' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Loader2 } from 'lucide-vue-next'
import { callApi } from '@/composables/useApi'
import { __ } from '@/composables/useTranslate'
import type { DockCalendar } from '@/types/dock'

const PALETTE = [
  '#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#0ea5e9', '#8b5cf6',
  '#14b8a6', '#f97316', '#ec4899', '#84cc16', '#64748b', '#06b6d4',
]

interface Props {
  show: boolean
  usedColors?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  usedColors: () => [],
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'created', calendar: DockCalendar): void
}>()

const title = ref('')
const selectedColor = ref('')
const saving = ref(false)
const error = ref<string | null>(null)

function autoSelectColor() {
  const used = new Set(props.usedColors)
  for (const c of PALETTE) {
    if (!used.has(c)) { selectedColor.value = c; return }
  }
  selectedColor.value = PALETTE[0]
}

function reset() {
  title.value = ''
  error.value = null
  saving.value = false
  autoSelectColor()
}

// Reset when shown
watch(() => props.show, (val) => { if (val) reset() })

async function handleCreate() {
  error.value = null
  if (!title.value.trim()) { error.value = __('Name is required'); return }

  saving.value = true
  try {
    const cal = await callApi<DockCalendar>('dock.api.calendars.create_calendar', {
      title: title.value.trim(),
      color: selectedColor.value || null,
    })
    emit('created', cal)
    emit('close')
  } catch (e) {
    error.value = (e as Error).message || __('Failed to create calendar')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center"
      @click.self="emit('close')"
    >
      <div class="absolute inset-0 bg-black/20 dark:bg-black/40" @click="emit('close')" />

      <div class="relative w-72 rounded-xl shadow-xl border border-[var(--dock-border)] bg-[var(--dock-bg)] p-4">
        <!-- Header -->
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-semibold text-[var(--dock-text)]">{{ __('New Calendar') }}</h3>
          <button
            type="button"
            class="p-0.5 rounded text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
            @click="emit('close')"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- Error -->
        <div
          v-if="error"
          class="mb-3 px-2 py-1.5 rounded text-xs bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
        >{{ error }}</div>

        <!-- Name -->
        <div class="mb-3">
          <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1">
            {{ __('Name') }} <span class="text-red-400">*</span>
          </label>
          <input
            v-model="title"
            type="text"
            :placeholder="__('e.g. Personal, Team, Family')"
            autofocus
            class="w-full px-2.5 py-1.5 rounded-lg text-sm
                   border border-[var(--dock-border)] bg-[var(--dock-bg)]
                   text-[var(--dock-text)] placeholder-[var(--dock-icon)]
                   focus:outline-none focus:border-[var(--dock-icon)] transition-colors"
            @keydown.enter="handleCreate"
          />
        </div>

        <!-- Color grid -->
        <div class="mb-4">
          <label class="block text-xs font-medium text-[var(--dock-icon)] mb-1.5">{{ __('Color') }}</label>
          <div class="grid grid-cols-6 gap-1.5">
            <button
              v-for="c in PALETTE" :key="c"
              type="button"
              class="w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center"
              :style="{
                backgroundColor: c,
                borderColor: selectedColor === c ? 'var(--dock-text)' : 'transparent',
              }"
              @click="selectedColor = c"
            >
              <svg v-if="selectedColor === c" viewBox="0 0 8 8" class="w-3 h-3 fill-none stroke-white stroke-[1.5]">
                <polyline points="1,4 3,6 7,2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2">
          <button
            type="button"
            :disabled="saving"
            class="px-3 py-1.5 text-xs rounded-lg border border-[var(--dock-border)] text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            @click="emit('close')"
          >{{ __('Cancel') }}</button>
          <button
            type="button"
            :disabled="saving"
            class="px-3 py-1.5 text-xs rounded-lg font-medium text-white
                   hover:opacity-90 transition-opacity flex items-center gap-1
                   disabled:opacity-60"
            :style="{ backgroundColor: 'var(--app-accent-600)' }"
            @click="handleCreate"
          >
            <Loader2 v-if="saving" class="w-3 h-3 animate-spin" />
            {{ saving ? __('Creating...') : __('Create') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
