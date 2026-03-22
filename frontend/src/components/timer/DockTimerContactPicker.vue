<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockTimerContactPicker' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, User } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'

const props = defineProps<{
  modelValue?: string | null
  displayName?: string | null
}>()
const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  'update:displayName': [value: string | null]
}>()

interface ContactResult {
  name: string
  full_name: string
  email_id?: string
  image?: string
}

const query = ref('')
const results = ref<ContactResult[]>([])
const showDropdown = ref(false)
const highlightedIndex = ref(-1)
const selectedName = ref(props.displayName || '')

watch(() => props.modelValue, (val) => {
  if (!val) selectedName.value = ''
})
watch(() => props.displayName, (val) => {
  if (val) selectedName.value = val
})

let debounceTimer: ReturnType<typeof setTimeout> | null = null

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  query.value = val
  highlightedIndex.value = -1
  if (debounceTimer) clearTimeout(debounceTimer)
  if (!val.trim()) {
    results.value = []
    showDropdown.value = false
    return
  }
  debounceTimer = setTimeout(() => searchContacts(val), 200)
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

async function searchContacts(q: string) {
  try {
    // Use frappe.call with run_doc_method to get proper OR search
    const res = await callApi<{ results: ContactResult[] }>('dock.api.people.search_contacts', {
      query: q,
      limit: 8,
    })
    const items = Array.isArray(res) ? res : (res?.results ?? [])
    results.value = items
    showDropdown.value = results.value.length > 0
  } catch {
    results.value = []
    showDropdown.value = false
  }
}

function select(contact: ContactResult) {
  emit('update:modelValue', contact.name)
  emit('update:displayName', contact.full_name)
  selectedName.value = contact.full_name
  query.value = ''
  results.value = []
  showDropdown.value = false
}

function clear() {
  emit('update:modelValue', null)
  emit('update:displayName', null)
  selectedName.value = ''
  query.value = ''
}

function onBlur() {
  setTimeout(() => { showDropdown.value = false }, 150)
}
</script>

<template>
  <div class="relative">
    <label class="block text-[0.6875rem] text-[var(--dock-icon)] mb-0.5">{{ __('For whom?') }}</label>
    <!-- Selected state -->
    <div v-if="modelValue && selectedName" class="flex items-center gap-1.5 dock-input pr-1">
      <User class="w-3 h-3 shrink-0 text-[var(--dock-icon)]" />
      <span class="truncate text-xs text-[var(--dock-text)] flex-1">{{ selectedName }}</span>
      <button class="shrink-0 text-[var(--dock-icon)] hover:text-[var(--dock-text)] p-0.5" @click="clear">
        <X class="w-3 h-3" />
      </button>
    </div>
    <!-- Search state -->
    <input
      v-else
      :value="query"
      type="text"
      class="dock-input"
      :placeholder="__('Search contacts...')"
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
        v-for="(c, idx) in results" :key="c.name"
        class="w-full text-left px-2 py-1.5 text-xs text-[var(--dock-text)]
               hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2"
        :class="{ 'bg-black/5 dark:bg-white/10': idx === highlightedIndex }"
        @mousedown.prevent="select(c)"
        @mouseenter="highlightedIndex = idx"
      >
        <img
          v-if="c.image"
          :src="c.image"
          class="w-5 h-5 rounded-full object-cover shrink-0"
        />
        <User v-else class="w-4 h-4 shrink-0 text-[var(--dock-icon)]" />
        <div class="min-w-0 flex-1">
          <div class="truncate">{{ c.full_name }}</div>
          <div v-if="c.email_id" class="truncate text-[0.625rem] text-[var(--dock-icon)]">{{ c.email_id }}</div>
        </div>
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
</style>
