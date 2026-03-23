<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Notes contextual panel — quick capture from anywhere.

  Opens from the Notes icon in the top bar. Lets you jot down a note
  without leaving the current page. The note is automatically linked
  to the current record if detectable from the URL.

  "Full page" link goes to the context-aware notes page (/orga/notes, /dock/notes).
-->
<script lang="ts">
export default { name: 'DockNotesPanel' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Pin, Pencil, Trash2, StickyNote } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'
import { useDockPanels } from '@/composables/useDockPanels'
import DockPanelShell from './DockPanelShell.vue'

const { closePanel } = useDockPanels()
const { registeredApps } = useDockBoot()

interface Note {
  name: string
  content: string
  reference_doctype: string
  reference_name: string
  reference_label: string
  pinned: boolean
  owner_name: string
  creation: string
  modified: string
}

// ── State ──────────────────────────────────────────────

const notes = ref<Note[]>([])
const total = ref(0)
const loading = ref(false)
const newContent = ref('')
const saving = ref(false)

// ── Context detection ──────────────────────────────────

// Detect the current record from the URL (e.g. /orga/projects/PROJ-001)
const currentContext = computed(() => {
  const path = window.location.pathname
  // Match /{app}/{doctype-slug}/{name} pattern
  const match = path.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/)
  if (!match) return null
  const [, app, , docname] = match
  if (app === 'dock' || app === 'app' || app === 'api') return null
  return { app, docname: decodeURIComponent(docname) }
})

const contextLabel = computed(() => {
  if (!currentContext.value) return null
  return currentContext.value.docname
})

// Full-page link — context-aware
const notesPageUrl = computed(() => {
  const path = window.location.pathname
  type App = { route: string }
  const active = (registeredApps.value as App[]).find(a =>
    a.route !== '/dock' && path.startsWith(a.route)
  )
  return active ? `${active.route}/notes` : '/dock/notes'
})

// ── API calls ──────────────────────────────────────────

async function load() {
  loading.value = true
  try {
    const res = await callApi<{ items: Note[]; total: number }>('dock.api.notes.get_list', {
      limit: 20,
      pinned_first: true,
    })
    notes.value = res.items
    total.value = res.total
  } catch {
    notes.value = []
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
  } finally {
    saving.value = false
  }
}

async function togglePin(name: string) {
  const note = notes.value.find(n => n.name === name)
  if (!note) return
  note.pinned = !note.pinned
  try {
    await callApi('dock.api.notes.toggle_pin', { name })
  } catch {
    note.pinned = !note.pinned
  }
}

// ── Inline editing ─────────────────────────────────────

const editingName = ref<string | null>(null)
const editContent = ref('')

function startEdit(note: Note) {
  editingName.value = note.name
  // Strip HTML tags for plain text editing
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

function onEditKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    saveEdit()
  }
  if (e.key === 'Escape') {
    cancelEdit()
  }
}

async function deleteNote(name: string) {
  const idx = notes.value.findIndex(n => n.name === name)
  if (idx < 0) return
  const removed = notes.value.splice(idx, 1)
  total.value--
  try {
    await callApi('dock.api.notes.delete', { name })
  } catch {
    notes.value.splice(idx, 0, ...removed)
    total.value++
  }
}

function onKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    createNote()
  }
}

function relativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return __('just now')
  if (mins < 60) return `${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d`
  return new Date(timestamp).toLocaleDateString()
}

// ── Lifecycle ──────────────────────────────────────────

onMounted(load)
</script>

<template>
  <DockPanelShell
    :title="__('Notes')"
    :link="notesPageUrl"
    :link-label="__('All notes')"
    :aria-label="__('Notes panel')"
    @close="closePanel"
  >
    <!-- Quick capture input -->
    <div
      :style="{
        padding: '0.75rem 1rem',
        borderBottom: '1px solid var(--dock-border)',
      }"
    >
      <textarea
        v-model="newContent"
        :placeholder="contextLabel
          ? __('Add a note') + '...'
          : __('Write a note...')"
        :style="{
          width: '100%',
          minHeight: '4rem',
          padding: '0.5rem',
          fontSize: '0.8125rem',
          lineHeight: '1.4',
          border: '1px solid var(--dock-border)',
          borderRadius: '0.375rem',
          background: 'transparent',
          color: 'var(--dock-text)',
          resize: 'vertical',
          outline: 'none',
        }"
        @keydown="onKeydown"
      />
      <div
        :style="{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.375rem',
        }"
      >
        <span :style="{ fontSize: '0.6875rem', color: 'var(--dock-icon)' }">
          {{ __('Ctrl+Enter to save') }}
        </span>
        <button
          :disabled="!newContent.trim() || saving"
          :style="{
            fontSize: '0.75rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.25rem',
            background: newContent.trim() && !saving ? 'var(--dock-text)' : 'var(--dock-border)',
            color: newContent.trim() && !saving ? 'var(--dock-bg)' : 'var(--dock-icon)',
            border: 'none',
            cursor: newContent.trim() && !saving ? 'pointer' : 'default',
            opacity: newContent.trim() && !saving ? 1 : 0.5,
          }"
          @click="createNote"
        >
          {{ saving ? __('Saving...') : __('Save') }}
        </button>
      </div>
    </div>

    <!-- Notes list -->
    <div
      :style="{
        flex: '1',
        overflowY: 'auto',
      }"
    >
      <!-- Loading -->
      <div
        v-if="loading"
        :style="{ padding: '2rem', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--dock-icon)' }"
      >
        {{ __('Loading...') }}
      </div>

      <!-- Empty -->
      <div
        v-else-if="!notes.length"
        :style="{ padding: '2rem', textAlign: 'center' }"
      >
        <StickyNote
          :style="{ width: '1.5rem', height: '1.5rem', margin: '0 auto 0.5rem', color: 'var(--dock-icon)', opacity: 0.5 }"
        />
        <p :style="{ fontSize: '0.8125rem', color: 'var(--dock-icon)', margin: 0 }">
          {{ __('No notes yet') }}
        </p>
      </div>

      <!-- Notes -->
      <div v-else>
        <div
          v-for="note in notes"
          :key="note.name"
          :style="{
            padding: '0.625rem 1rem',
            borderBottom: '1px solid var(--dock-border)',
            position: 'relative',
          }"
          class="dock-note-item"
        >
          <!-- Content: edit mode -->
          <div v-if="editingName === note.name">
            <textarea
              v-model="editContent"
              :style="{
                width: '100%',
                minHeight: '3rem',
                padding: '0.375rem',
                fontSize: '0.8125rem',
                lineHeight: '1.4',
                border: '1px solid var(--dock-accent, #6366f1)',
                borderRadius: '0.25rem',
                background: 'transparent',
                color: 'var(--dock-text)',
                resize: 'vertical',
                outline: 'none',
              }"
              @keydown="onEditKeydown"
            />
            <div :style="{ display: 'flex', gap: '0.375rem', marginTop: '0.25rem', justifyContent: 'flex-end' }">
              <button
                :style="{
                  fontSize: '0.6875rem', padding: '0.125rem 0.5rem', borderRadius: '0.25rem',
                  background: 'none', border: '1px solid var(--dock-border)', color: 'var(--dock-text)', cursor: 'pointer',
                }"
                @click="cancelEdit"
              >{{ __('Cancel') }}</button>
              <button
                :disabled="!editContent.trim()"
                :style="{
                  fontSize: '0.6875rem', padding: '0.125rem 0.5rem', borderRadius: '0.25rem',
                  background: 'var(--dock-text)', color: 'var(--dock-bg)', border: 'none', cursor: 'pointer',
                  opacity: editContent.trim() ? 1 : 0.5,
                }"
                @click="saveEdit"
              >{{ __('Save') }}</button>
            </div>
          </div>

          <!-- Content: display mode (click to edit) -->
          <div
            v-else
            :style="{
              fontSize: '0.8125rem',
              lineHeight: '1.4',
              color: 'var(--dock-text)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              cursor: 'text',
              borderRadius: '0.25rem',
              padding: '0.125rem',
            }"
            :title="__('Click to edit')"
            v-html="note.content"
            @click="startEdit(note)"
          />

          <!-- Meta row -->
          <div
            :style="{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.375rem',
              fontSize: '0.6875rem',
              color: 'var(--dock-icon)',
            }"
          >
            <span>{{ relativeTime(note.modified) }}</span>
            <span v-if="note.reference_label" :style="{ opacity: 0.7 }">
              · {{ note.reference_label }}
            </span>
            <span :style="{ flex: 1 }" />
            <!-- Actions -->
            <button
              :title="note.pinned ? __('Unpin') : __('Pin')"
              :style="{
                display: 'flex',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                padding: '0.125rem',
                cursor: 'pointer',
                color: note.pinned ? 'var(--dock-accent, #6366f1)' : 'var(--dock-icon)',
                opacity: note.pinned ? 1 : 0,
                transition: 'opacity 0.15s',
              }"
              class="dock-note-action"
              @click="togglePin(note.name)"
            >
              <Pin :style="{ width: '0.75rem', height: '0.75rem' }" />
            </button>
            <button
              :title="__('Edit')"
              :style="{
                display: 'flex',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                padding: '0.125rem',
                cursor: 'pointer',
                color: 'var(--dock-icon)',
                opacity: 0,
                transition: 'opacity 0.15s',
              }"
              class="dock-note-action"
              @click="startEdit(note)"
            >
              <Pencil :style="{ width: '0.75rem', height: '0.75rem' }" />
            </button>
            <button
              :title="__('Delete')"
              :style="{
                display: 'flex',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                padding: '0.125rem',
                cursor: 'pointer',
                color: 'var(--dock-icon)',
                opacity: 0,
                transition: 'opacity 0.15s',
              }"
              class="dock-note-action"
              @click="deleteNote(note.name)"
            >
              <Trash2 :style="{ width: '0.75rem', height: '0.75rem' }" />
            </button>
          </div>
        </div>

        <!-- Load more -->
        <button
          v-if="notes.length < total"
          :style="{
            display: 'block',
            width: '100%',
            padding: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--dock-accent, #6366f1)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'center',
          }"
          @click="load"
        >
          {{ __('Load more') }}
        </button>
      </div>
    </div>
  </DockPanelShell>
</template>

<style scoped>
.dock-note-item:hover .dock-note-action {
  opacity: 1 !important;
}
</style>
