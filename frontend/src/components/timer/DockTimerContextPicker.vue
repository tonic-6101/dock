<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockTimerContextPicker' }
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { X, FolderOpen } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import type { TimerContextOption } from '@/composables/useDockTimer'

const props = defineProps<{
  options: readonly TimerContextOption[]
  contextType?: string | null
  contextName?: string | null
  contextDisplay?: string | null
}>()
const emit = defineEmits<{
  'update:contextType': [value: string | null]
  'update:contextName': [value: string | null]
  'update:contextDisplay': [value: string | null]
}>()

// If only one option, auto-select it
const selectedType = ref(props.contextType || (props.options.length === 1 ? props.options[0].doctype : ''))
const selectedDisplay = ref(props.contextDisplay || '')

const activeOption = computed(() =>
  props.options.find(o => o.doctype === selectedType.value) ?? null
)

const typeLabel = computed(() => activeOption.value?.label ?? selectedType.value)

watch(() => props.contextType, (val) => {
  if (val) selectedType.value = val
})
watch(() => props.contextDisplay, (val) => {
  if (val) selectedDisplay.value = val
})

// Name search
const query = ref('')
const results = ref<{ name: string; display: string }[]>([])
const showDropdown = ref(false)
const highlightedIndex = ref(-1)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

function onTypeChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value
  selectedType.value = val
  emit('update:contextType', val || null)
  // Clear name when type changes
  emit('update:contextName', null)
  emit('update:contextDisplay', null)
  selectedDisplay.value = ''
}

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  query.value = val
  highlightedIndex.value = -1
  if (debounceTimer) clearTimeout(debounceTimer)
  if (!val.trim() || !activeOption.value) {
    results.value = []
    showDropdown.value = false
    return
  }
  debounceTimer = setTimeout(() => searchContext(val), 200)
}

function onKeydown(e: KeyboardEvent) {
  if (!showDropdown.value || results.value.length === 0) return
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    highlightedIndex.value = (highlightedIndex.value + 1) % results.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    highlightedIndex.value = highlightedIndex.value <= 0
      ? results.value.length - 1
      : highlightedIndex.value - 1
  } else if (e.key === 'Enter' && highlightedIndex.value >= 0) {
    e.preventDefault()
    select(results.value[highlightedIndex.value])
  } else if (e.key === 'Escape') {
    showDropdown.value = false
    highlightedIndex.value = -1
  }
}

async function searchContext(q: string) {
  const opt = activeOption.value
  if (!opt) return
  try {
    const res = await callApi<{ name: string; display: string }[]>('dock.api.timer.search_context', {
      doctype: opt.doctype,
      query: q,
    })
    results.value = res || []
    showDropdown.value = results.value.length > 0
  } catch {
    results.value = []
    showDropdown.value = false
  }
}

function select(item: { name: string; display: string }) {
  emit('update:contextType', selectedType.value)
  emit('update:contextName', item.name)
  emit('update:contextDisplay', item.display)
  selectedDisplay.value = item.display
  query.value = ''
  results.value = []
  showDropdown.value = false
}

function clear() {
  emit('update:contextName', null)
  emit('update:contextDisplay', null)
  selectedDisplay.value = ''
  query.value = ''
}

function onBlur() {
  setTimeout(() => { showDropdown.value = false }, 150)
}
</script>

<template>
  <div v-if="options.length > 0" class="relative">
    <label class="block text-[0.6875rem] text-[var(--dock-icon)] mb-0.5">{{ __('Working on?') }}</label>

    <!-- Type selector (only when multiple types available) -->
    <select
      v-if="options.length > 1"
      :value="selectedType"
      class="dock-input mb-1"
      @change="onTypeChange"
    >
      <option value="">{{ __('Select type...') }}</option>
      <option v-for="opt in options" :key="opt.doctype" :value="opt.doctype">
        {{ __(opt.label) }}
      </option>
    </select>

    <!-- Selected context display -->
    <div v-if="contextName && selectedDisplay" class="flex items-center gap-1.5 dock-input pr-1">
      <FolderOpen class="w-3 h-3 shrink-0 text-[var(--dock-icon)]" />
      <span v-if="options.length === 1" class="text-[0.625rem] text-[var(--dock-icon)] shrink-0">{{ __(typeLabel) }}:</span>
      <span class="truncate text-xs text-[var(--dock-text)] flex-1">{{ selectedDisplay }}</span>
      <button class="shrink-0 text-[var(--dock-icon)] hover:text-[var(--dock-text)] p-0.5" @click="clear">
        <X class="w-3 h-3" />
      </button>
    </div>

    <!-- Name search (when type is selected but no name yet) -->
    <input
      v-else-if="selectedType"
      :value="query"
      type="text"
      class="dock-input"
      :placeholder="__('Search') + ' ' + __(typeLabel) + '...'"
      @input="onInput"
      @keydown="onKeydown"
      @blur="onBlur"
    />

    <!-- Dropdown -->
    <div
      v-if="showDropdown"
      class="absolute left-0 right-0 top-full mt-1 bg-[var(--dock-bg)] border border-[var(--dock-border)]
             rounded-md shadow-lg z-30 max-h-40 overflow-y-auto"
    >
      <button
        v-for="(item, idx) in results" :key="item.name"
        class="w-full text-left px-2 py-1.5 text-xs text-[var(--dock-text)]
               hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2"
        :class="{ 'bg-black/5 dark:bg-white/10': idx === highlightedIndex }"
        @mousedown.prevent="select(item)"
        @mouseenter="highlightedIndex = idx"
      >
        <FolderOpen class="w-3.5 h-3.5 shrink-0 text-[var(--dock-icon)]" />
        <span class="truncate">{{ item.display }}</span>
      </button>
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
select.dock-input {
  cursor: pointer;
  appearance: auto;
}
</style>
