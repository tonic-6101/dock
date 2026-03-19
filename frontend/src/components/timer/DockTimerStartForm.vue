<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockTimerStartForm' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'

export interface TimerStartData {
  app: string
  doctype: string
  name: string
  label: string
  tags: string[]
  entry_type: string
}

interface Context { app: string; doctype: string; name: string; label: string }

const props = defineProps<{
  pending?: Context | null
  loading?: boolean
  mode?: 'start' | 'edit'
  initialTags?: string[]
  initialEntryType?: string | null
}>()
const emit = defineEmits<{ start: [data: TimerStartData | null]; cancel: [] }>()

const isEdit = props.mode === 'edit'
const ctx    = ref<Context | null>(props.pending ?? null)
const label  = ref(props.pending?.label ?? '')

// Tags
const tagInput   = ref('')
const tags       = ref<string[]>(props.initialTags?.slice() ?? [])
const tagResults = ref<{ tag_name: string; color?: string }[]>([])
const showTagDropdown = ref(false)

async function searchTags(query: string) {
  if (!query.trim()) { tagResults.value = []; showTagDropdown.value = false; return }
  try {
    const results = await callApi<{ tag_name: string; color?: string }[]>(
      'watch.api.tags.get_tags', { search: query }
    )
    tagResults.value = (results || []).filter(t => !tags.value.includes(t.tag_name))
    showTagDropdown.value = tagResults.value.length > 0
  } catch { tagResults.value = []; showTagDropdown.value = false }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null
function onTagInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  tagInput.value = val
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => searchTags(val), 200)
}

function addTag(name: string) {
  if (!tags.value.includes(name)) tags.value.push(name)
  tagInput.value = ''
  tagResults.value = []
  showTagDropdown.value = false
}

function removeTag(name: string) {
  tags.value = tags.value.filter(t => t !== name)
}

function onTagBlur() {
  setTimeout(() => { showTagDropdown.value = false }, 150)
}

function onTagKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && tagInput.value.trim()) {
    e.preventDefault()
    if (tagResults.value.length > 0) {
      addTag(tagResults.value[0].tag_name)
    } else {
      addTag(tagInput.value.trim())
    }
  }
}

// Entry type
const entryTypes = [
  { value: 'billable', label: 'Billable' },
  { value: 'non-billable', label: 'Non-billable' },
  { value: 'internal', label: 'Internal' },
] as const
const entryType = ref<string>(props.initialEntryType ?? 'billable')

function submit() {
  const data: TimerStartData = {
    app: ctx.value?.app ?? '',
    doctype: ctx.value?.doctype ?? '',
    name: ctx.value?.name ?? '',
    label: ctx.value?.label ?? label.value.trim(),
    tags: tags.value,
    entry_type: entryType.value,
  }
  emit('start', data.label ? data : null)
}
</script>

<template>
  <div class="p-3 space-y-2.5">
    <p class="text-xs font-medium text-[var(--dock-text)]">{{ isEdit ? __('Edit Timer') : __('Start Timer') }}</p>

    <!-- Context chip (only when linked to a specific document) -->
    <div v-if="ctx && ctx.doctype" class="flex items-center gap-1.5 bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 text-xs text-[var(--dock-text)]">
      <span class="truncate">{{ ctx.label }} · {{ ctx.doctype }}</span>
      <button class="shrink-0 text-[var(--dock-icon)] hover:text-[var(--dock-text)]" @click="ctx = null">
        <X class="w-3 h-3" />
      </button>
    </div>
    <input
      v-else
      v-model="label"
      type="text"
      class="dock-input"
      :placeholder="__('What are you working on?')"
      @keydown.enter="submit"
    />

    <!-- Tags -->
    <div class="relative">
      <div v-if="tags.length" class="flex flex-wrap gap-1 mb-1.5">
        <span
          v-for="tag in tags" :key="tag"
          class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs
                 bg-black/5 dark:bg-white/10 text-[var(--dock-text)]"
        >
          {{ tag }}
          <button class="text-[var(--dock-icon)] hover:text-[var(--dock-text)]" @click="removeTag(tag)">
            <X class="w-2.5 h-2.5" />
          </button>
        </span>
      </div>
      <input
        :value="tagInput"
        type="text"
        class="dock-input"
        :placeholder="__('Add tags...')"
        @input="onTagInput"
        @keydown="onTagKeydown"
        @blur="onTagBlur"
      />
      <div
        v-if="showTagDropdown"
        class="absolute left-0 right-0 top-full mt-1 bg-[var(--dock-bg)] border border-[var(--dock-border)]
               rounded-md shadow-lg z-30 max-h-32 overflow-y-auto"
      >
        <button
          v-for="t in tagResults" :key="t.tag_name"
          class="w-full text-left px-2 py-1.5 text-xs text-[var(--dock-text)]
                 hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-1.5"
          @mousedown.prevent="addTag(t.tag_name)"
        >
          <span
            v-if="t.color"
            class="w-2 h-2 rounded-full shrink-0"
            :style="{ backgroundColor: t.color }"
          />
          {{ t.tag_name }}
        </button>
      </div>
    </div>

    <!-- Entry type -->
    <div class="flex gap-1.5">
      <button
        v-for="et in entryTypes" :key="et.value"
        class="dock-type-chip"
        :class="{ 'dock-type-chip--active': entryType === et.value }"
        @click="entryType = et.value"
      >{{ __(et.label) }}</button>
    </div>

    <!-- Actions -->
    <div class="flex gap-2 pt-0.5">
      <button
        class="dock-timer-btn dock-timer-btn--accent flex-1"
        :disabled="loading"
        @click="submit"
      >{{ isEdit ? __('Update') : '▶ ' + __('Start Timer') }}</button>
      <button
        class="dock-timer-btn dock-timer-btn--ghost"
        @click="emit('cancel')"
      >{{ __('Cancel') }}</button>
    </div>
  </div>
</template>

<style scoped>
.dock-input {
  width: 100%;
  font-size: 0.8125rem;
  border-radius: 0.375rem;
  border: 1px solid var(--dock-border);
  background: var(--dock-bg);
  color: var(--dock-text);
  padding: 0.375rem 0.5rem;
}
.dock-input::placeholder { color: var(--dock-icon); }
.dock-input:focus {
  outline: none;
  box-shadow: 0 0 0 1px var(--dock-accent);
}

.dock-type-chip {
  font-size: 0.6875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid var(--dock-border);
  color: var(--dock-icon);
  background: transparent;
  cursor: pointer;
  transition: all 0.15s;
}
.dock-type-chip:hover {
  color: var(--dock-text);
  border-color: var(--dock-text);
}
.dock-type-chip--active {
  color: var(--dock-text);
  border-color: var(--dock-text);
  background: color-mix(in srgb, var(--dock-text) 6%, transparent);
}

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
