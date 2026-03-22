<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Always-editable description, tags, and entry type form for the timer panel.
  Auto-saves on blur/change via update_timer() — no explicit Save button.
  Shows a brief "Saved" indicator on successful update.
-->
<script lang="ts">
export default { name: 'DockTimerEntryForm' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Check } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockTimer } from '@/composables/useDockTimer'
import DockTimerContactPicker from './DockTimerContactPicker.vue'
import DockTimerContextPicker from './DockTimerContextPicker.vue'

const { timerState, contextOptions, update } = useDockTimer()

// Local state (synced from timer state)
const description = ref(timerState.value.context_label ?? timerState.value.description ?? '')
const tags = ref<string[]>(timerState.value.tags?.slice() ?? [])
const entryType = ref(timerState.value.entry_type ?? 'billable')
const contact = ref<string | null>(timerState.value.contact ?? null)
const contactDisplay = ref<string | null>(timerState.value.contact_name ?? null)
const contextType = ref<string | null>(timerState.value.context_type ?? null)
const contextName = ref<string | null>(timerState.value.context_name ?? null)
const contextDisplay = ref<string | null>(timerState.value.context_display ?? null)
const savedFlash = ref(false)
let savedTimeout: ReturnType<typeof setTimeout> | null = null

// Track whether the description input is focused to avoid overwriting user input
const descriptionFocused = ref(false)

// Sync from external state changes (realtime updates)
watch(() => timerState.value, (s) => {
  // Only sync description when the user is not actively editing
  if (!descriptionFocused.value) {
    description.value = s.context_label ?? s.description ?? ''
  }
  tags.value = s.tags?.slice() ?? []
  entryType.value = s.entry_type ?? 'billable'
  contact.value = s.contact ?? null
  contactDisplay.value = s.contact_name ?? null
  contextType.value = s.context_type ?? null
  contextName.value = s.context_name ?? null
  contextDisplay.value = s.context_display ?? null
}, { deep: true })

function flashSaved() {
  savedFlash.value = true
  if (savedTimeout) clearTimeout(savedTimeout)
  savedTimeout = setTimeout(() => { savedFlash.value = false }, 1500)
}

// Auto-save on blur
async function onDescriptionBlur() {
  const val = description.value.trim()
  if (val === (timerState.value.context_label ?? timerState.value.description ?? '')) return
  await update(allLocalValues())
  flashSaved()
}

// Tags
const tagInput = ref('')
const tagResults = ref<{ tag_name: string; color?: string }[]>([])
const showTagDropdown = ref(false)
const tagHighlightedIndex = ref(-1)

async function searchTags(query: string) {
  if (!query.trim()) { tagResults.value = []; showTagDropdown.value = false; return }
  try {
    const results = await callApi<{ tag_name: string; color?: string }[]>(
      'watch.api.tags.get_tags', { search: query },
    )
    tagResults.value = (results || []).filter(t => !tags.value.includes(t.tag_name))
    showTagDropdown.value = tagResults.value.length > 0
  } catch { tagResults.value = []; showTagDropdown.value = false }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null
function onTagInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  tagInput.value = val
  tagHighlightedIndex.value = -1
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => searchTags(val), 200)
}

/** Send all local values so the server never returns stale data for unsaved fields. */
function allLocalValues() {
  return {
    description: description.value.trim(),
    tags: tags.value,
    entry_type: entryType.value,
    contact: contact.value,
    context_type: contextType.value,
    context_name: contextName.value,
  }
}

// Contact/context auto-save
async function onContactChange(val: string | null) {
  contact.value = val
  await update(allLocalValues())
  flashSaved()
}

async function onContextTypeChange(val: string | null) {
  contextType.value = val
  contextName.value = null
  contextDisplay.value = null
}

async function onContextNameChange(val: string | null) {
  contextName.value = val
  await update(allLocalValues())
  flashSaved()
}

async function onContextDisplayChange(val: string | null) {
  contextDisplay.value = val
}

async function addTag(name: string) {
  if (!tags.value.includes(name)) tags.value.push(name)
  tagInput.value = ''
  tagResults.value = []
  showTagDropdown.value = false
  await update(allLocalValues())
  flashSaved()
}

async function removeTag(name: string) {
  tags.value = tags.value.filter(t => t !== name)
  await update(allLocalValues())
  flashSaved()
}

function onTagBlur() {
  setTimeout(() => { showTagDropdown.value = false }, 150)
}

function onTagKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown' && showTagDropdown.value && tagResults.value.length > 0) {
    e.preventDefault()
    tagHighlightedIndex.value = (tagHighlightedIndex.value + 1) % tagResults.value.length
  } else if (e.key === 'ArrowUp' && showTagDropdown.value && tagResults.value.length > 0) {
    e.preventDefault()
    tagHighlightedIndex.value = tagHighlightedIndex.value <= 0
      ? tagResults.value.length - 1
      : tagHighlightedIndex.value - 1
  } else if (e.key === 'Enter' && tagInput.value.trim()) {
    e.preventDefault()
    if (tagHighlightedIndex.value >= 0 && tagResults.value[tagHighlightedIndex.value]) {
      addTag(tagResults.value[tagHighlightedIndex.value].tag_name)
    } else if (tagResults.value.length > 0) {
      addTag(tagResults.value[0].tag_name)
    } else {
      addTag(tagInput.value.trim())
    }
    tagHighlightedIndex.value = -1
  } else if (e.key === 'Escape') {
    showTagDropdown.value = false
    tagHighlightedIndex.value = -1
  }
}

// Entry type — auto-save on change
const entryTypes = [
  { value: 'billable', label: 'Billable' },
  { value: 'non-billable', label: 'Non-billable' },
  { value: 'internal', label: 'Internal' },
] as const

async function setEntryType(val: string) {
  if (val === entryType.value) return
  entryType.value = val
  await update(allLocalValues())
  flashSaved()
}
</script>

<template>
  <div class="dock-entry-form">
    <!-- Description -->
    <div class="dock-entry-field">
      <input
        v-model="description"
        type="text"
        class="dock-input"
        :placeholder="__('What are you working on?')"
        @focus="descriptionFocused = true"
        @blur="descriptionFocused = false; onDescriptionBlur()"
        @keydown.enter="($event.target as HTMLInputElement).blur()"
      />
      <transition name="dock-fade">
        <span v-if="savedFlash" class="dock-saved-flash">
          <Check class="w-3 h-3" /> {{ __('Saved') }}
        </span>
      </transition>
    </div>

    <!-- Context pickers -->
    <div class="dock-entry-field grid gap-2" :class="contextOptions.length > 0 ? 'grid-cols-2' : 'grid-cols-1'">
      <DockTimerContactPicker
        :model-value="contact"
        :display-name="contactDisplay"
        @update:model-value="onContactChange"
        @update:display-name="contactDisplay = $event"
      />
      <DockTimerContextPicker
        :options="contextOptions"
        :context-type="contextType"
        :context-name="contextName"
        :context-display="contextDisplay"
        @update:context-type="onContextTypeChange"
        @update:context-name="onContextNameChange"
        @update:context-display="onContextDisplayChange"
      />
    </div>

    <!-- Tags -->
    <div class="dock-entry-field relative">
      <div v-if="tags.length" class="dock-tag-list">
        <span
          v-for="tag in tags" :key="tag"
          class="dock-tag-chip"
        >
          {{ tag }}
          <button class="dock-tag-remove" @click="removeTag(tag)">
            <X class="w-2.5 h-2.5" />
          </button>
        </span>
      </div>
      <input
        :value="tagInput"
        type="text"
        class="dock-input"
        :placeholder="tags.length ? __('Add more tags...') : __('+ Add tags')"
        @input="onTagInput"
        @keydown="onTagKeydown"
        @blur="onTagBlur"
      />
      <div
        v-if="showTagDropdown"
        class="dock-tag-dropdown"
      >
        <button
          v-for="(t, idx) in tagResults" :key="t.tag_name"
          class="dock-tag-option"
          :class="{ 'dock-tag-option--active': idx === tagHighlightedIndex }"
          @mousedown.prevent="addTag(t.tag_name)"
          @mouseenter="tagHighlightedIndex = idx"
        >
          <span
            v-if="t.color"
            class="dock-tag-dot"
            :style="{ backgroundColor: t.color }"
          />
          {{ t.tag_name }}
        </button>
      </div>
    </div>

    <!-- Entry type -->
    <div class="dock-entry-types">
      <button
        v-for="et in entryTypes" :key="et.value"
        class="dock-type-chip"
        :class="{ 'dock-type-chip--active': entryType === et.value }"
        @click="setEntryType(et.value)"
      >{{ __(et.label) }}</button>
    </div>
  </div>
</template>

<style scoped>
.dock-entry-form {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  border-top: 1px solid var(--dock-border);
}

.dock-entry-field {
  position: relative;
}

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

.dock-saved-flash {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.6875rem;
  color: #16a34a;
}
:root.dark .dock-saved-flash { color: #4ade80; }

.dock-fade-enter-active { transition: opacity 0.15s; }
.dock-fade-leave-active { transition: opacity 0.3s; }
.dock-fade-enter-from, .dock-fade-leave-to { opacity: 0; }

.dock-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0.375rem;
}

.dock-tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  background: color-mix(in srgb, var(--dock-text) 6%, transparent);
  color: var(--dock-text);
}

.dock-tag-remove {
  display: flex;
  color: var(--dock-icon);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}
.dock-tag-remove:hover { color: var(--dock-text); }

.dock-tag-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 0.25rem;
  background: var(--dock-bg);
  border: 1px solid var(--dock-border);
  border-radius: 0.375rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 30;
  max-height: 8rem;
  overflow-y: auto;
}

.dock-tag-option {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  width: 100%;
  text-align: left;
  padding: 0.375rem 0.5rem;
  font-size: 0.75rem;
  color: var(--dock-text);
  background: none;
  border: none;
  cursor: pointer;
}
.dock-tag-option:hover,
.dock-tag-option--active {
  background: color-mix(in srgb, var(--dock-text) 6%, transparent);
}

.dock-tag-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  flex-shrink: 0;
}

.dock-entry-types {
  display: flex;
  gap: 0.375rem;
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
</style>
