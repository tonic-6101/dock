<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockNotesPage' }
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Pin, PinOff, Pencil, Trash2, Send, StickyNote, ExternalLink } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { relativeTime } from '@/composables/useRelativeTime'

interface Note {
  name: string
  content: string
  reference_doctype: string
  reference_name: string
  reference_label: string
  pinned: boolean
  owner: string
  owner_name: string
  creation: string
  modified: string
}

const PAGE_SIZE = 30
const notes = ref<Note[]>([])
const total = ref(0)
const offset = ref(0)
const loading = ref(false)
const hasError = ref(false)

const showCreate = ref(false)
const newContent = ref('')
const saving = ref(false)

let router: ReturnType<typeof useRouter> | undefined
try { router = useRouter() } catch { /* outside router */ }

async function load(reset = false) {
  if (reset) { offset.value = 0; notes.value = [] }
  loading.value = true
  hasError.value = false
  try {
    const res = await callApi<{ items: Note[]; total: number }>('dock.api.notes.get_list', {
      limit: PAGE_SIZE,
      offset: offset.value,
    })
    notes.value = reset ? res.items : [...notes.value, ...res.items]
    total.value = res.total
    offset.value += res.items.length
  } catch {
    hasError.value = true
  } finally {
    loading.value = false
  }
}

async function createNote() {
  if (!newContent.value.trim() || saving.value) return
  saving.value = true
  try {
    const note = await callApi<Note>('dock.api.notes.create', {
      content: newContent.value.trim(),
    })
    notes.value.unshift(note)
    total.value++
    newContent.value = ''
    showCreate.value = false
  } finally {
    saving.value = false
  }
}

async function togglePin(name: string) {
  try {
    const updated = await callApi<Note>('dock.api.notes.toggle_pin', { name })
    const idx = notes.value.findIndex(n => n.name === name)
    if (idx >= 0) notes.value[idx] = updated
    notes.value.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
  } catch { /* silent */ }
}

async function deleteNote(name: string) {
  try {
    await callApi('dock.api.notes.delete', { name })
    notes.value = notes.value.filter(n => n.name !== name)
    total.value--
  } catch { /* silent */ }
}

// Inline editing
const editingName = ref<string | null>(null)
const editContent = ref('')

function startEdit(note: Note) {
  editingName.value = note.name
  editContent.value = note.content.replace(/<[^>]*>/g, '').trim()
}

function cancelEdit() {
  editingName.value = null
  editContent.value = ''
}

async function saveEdit() {
  if (!editingName.value || !editContent.value.trim()) return
  const note = notes.value.find(n => n.name === editingName.value)
  if (!note) return
  const oldContent = note.content
  note.content = editContent.value.trim()
  try {
    await callApi('dock.api.notes.update', {
      name: editingName.value,
      content: editContent.value.trim(),
    })
  } catch {
    note.content = oldContent
  }
  editingName.value = null
  editContent.value = ''
}

function navigateToReference(note: Note) {
  if (!note.reference_doctype || !note.reference_name) return
  const dt = note.reference_doctype
  const dn = note.reference_name
  if (dt === 'Contact') {
    const url = `/dock/people/${dn}`
    if (router) router.push({ name: 'dock-person', params: { name: dn } })
    else window.location.href = url
  } else if (dt === 'Dock Event') {
    window.location.href = '/dock/calendar'
  } else {
    window.location.href = `/app/${dt.toLowerCase().replace(/ /g, '-')}/${dn}`
  }
}

onMounted(() => load(true))
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-[var(--dock-text)]">{{ __('Notes') }}</h1>
      <button
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-md
               bg-[var(--dock-accent)] text-white text-sm font-medium
               hover:opacity-90 transition-opacity"
        @click="showCreate = !showCreate"
      >
        <Plus class="w-4 h-4" />
        {{ __('New note') }}
      </button>
    </div>

    <!-- Create form -->
    <div v-if="showCreate" class="border border-[var(--dock-border)] rounded-lg p-4 mb-6">
      <textarea
        v-model="newContent"
        class="w-full text-sm text-[var(--dock-text)] bg-transparent outline-none resize-none min-h-[100px]
               placeholder:text-[var(--dock-icon)]/40"
        :placeholder="__('Write a note... (not linked to any record)')"
        @keydown.meta.enter="createNote"
        @keydown.ctrl.enter="createNote"
        autofocus
      />
      <div class="flex items-center justify-between mt-3">
        <span class="text-[10px] text-[var(--dock-icon)]">{{ __('Cmd+Enter to save') }}</span>
        <div class="flex items-center gap-2">
          <button
            class="text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
            @click="showCreate = false; newContent = ''"
          >
            {{ __('Cancel') }}
          </button>
          <button
            class="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium
                   bg-[var(--dock-accent)] text-white hover:opacity-90 transition-opacity
                   disabled:opacity-50"
            :disabled="!newContent.trim() || saving"
            @click="createNote"
          >
            <Send class="w-3 h-3" />
            {{ saving ? __('Saving...') : __('Save') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading && !notes.length" class="space-y-3">
      <div v-for="i in 5" :key="i" class="h-20 bg-black/[0.04] dark:bg-white/[0.04] rounded-lg animate-pulse" />
    </div>

    <!-- Error -->
    <div v-else-if="hasError" class="text-center py-12">
      <p class="text-sm text-[var(--dock-icon)] mb-3">{{ __('Could not load notes') }}</p>
      <button class="text-xs text-[var(--dock-accent)] hover:underline" @click="load(true)">{{ __('Retry') }}</button>
    </div>

    <!-- Empty -->
    <div v-else-if="!notes.length && !showCreate" class="text-center py-16">
      <StickyNote class="w-10 h-10 text-[var(--dock-icon)] mx-auto mb-3 opacity-40" />
      <p class="text-sm text-[var(--dock-icon)] mb-1">{{ __('No notes yet') }}</p>
      <p class="text-xs text-[var(--dock-icon)]/60">{{ __('Notes you add on contacts or here will appear in this feed.') }}</p>
    </div>

    <!-- Notes list -->
    <div v-else class="space-y-3">
      <div
        v-for="note in notes"
        :key="note.name"
        class="group border border-[var(--dock-border)] rounded-lg px-4 py-3"
        :class="note.pinned ? 'border-[var(--dock-accent)]/30 bg-[var(--dock-accent)]/[0.02]' : ''"
      >
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1 min-w-0">
            <!-- Edit mode -->
            <div v-if="editingName === note.name">
              <textarea
                v-model="editContent"
                class="w-full text-sm text-[var(--dock-text)] bg-transparent outline-none resize-none min-h-[60px]
                       border border-[var(--dock-accent)] rounded-md p-2"
                autofocus
                @keydown.meta.enter="saveEdit"
                @keydown.ctrl.enter="saveEdit"
                @keydown.escape="cancelEdit"
              />
              <div class="flex items-center justify-end gap-2 mt-2">
                <button
                  class="text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
                  @click="cancelEdit"
                >{{ __('Cancel') }}</button>
                <button
                  class="px-2.5 py-1 rounded-md text-xs font-medium
                         bg-[var(--dock-accent)] text-white hover:opacity-90 transition-opacity
                         disabled:opacity-50"
                  :disabled="!editContent.trim()"
                  @click="saveEdit"
                >{{ __('Save') }}</button>
              </div>
            </div>
            <!-- Display mode (click to edit) -->
            <div
              v-else
              class="text-sm text-[var(--dock-text)] prose prose-sm max-w-none cursor-text rounded p-0.5
                     hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              :title="__('Click to edit')"
              v-html="note.content"
              @click="startEdit(note)"
            />
          </div>
          <!-- Actions -->
          <div class="flex items-center gap-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              class="p-1 rounded text-[var(--dock-icon)] hover:text-[var(--dock-accent)] transition-colors"
              :title="note.pinned ? __('Unpin') : __('Pin')"
              @click="togglePin(note.name)"
            >
              <PinOff v-if="note.pinned" class="w-3.5 h-3.5" />
              <Pin v-else class="w-3.5 h-3.5" />
            </button>
            <button
              class="p-1 rounded text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
              :title="__('Edit')"
              @click="startEdit(note)"
            >
              <Pencil class="w-3.5 h-3.5" />
            </button>
            <button
              class="p-1 rounded text-[var(--dock-icon)] hover:text-red-500 transition-colors"
              :title="__('Delete')"
              @click="deleteNote(note.name)"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <!-- Meta -->
        <div class="flex items-center gap-2 mt-2 text-[10px] text-[var(--dock-icon)]">
          <span>{{ note.owner_name }}</span>
          <span>&middot;</span>
          <span>{{ relativeTime(note.creation) }}</span>
          <span v-if="note.pinned" class="flex items-center gap-0.5 text-[var(--dock-accent)]">
            <Pin class="w-2.5 h-2.5" />
            {{ __('Pinned') }}
          </span>
          <!-- Reference link -->
          <button
            v-if="note.reference_label"
            class="flex items-center gap-0.5 text-[var(--dock-accent)] hover:underline"
            @click="navigateToReference(note)"
          >
            <ExternalLink class="w-2.5 h-2.5" />
            {{ note.reference_label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Load more -->
    <div v-if="notes.length < total" class="text-center mt-4">
      <button
        class="text-xs text-[var(--dock-accent)] hover:underline disabled:opacity-50"
        :disabled="loading"
        @click="load(false)"
      >
        {{ loading ? __('Loading...') : __('Load more') }}
      </button>
    </div>
  </div>
</template>
