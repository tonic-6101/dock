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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Pin, Pencil, Trash2, StickyNote, X, Tag, ImagePlus, SquareArrowOutUpRight } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { uploadFile, pickFiles } from '@/composables/useFileUpload'
import { useDockBoot } from '@/composables/useDockBoot'
import { useDockPanels } from '@/composables/useDockPanels'
import DockPanelShell from './DockPanelShell.vue'

const { closePanel } = useDockPanels()
const { registeredApps, noteActions } = useDockBoot()

const NOTE_COLORS: Record<string, string> = {
  yellow: '#eab308',
  green: '#22c55e',
  blue: '#3b82f6',
  purple: '#a855f7',
  red: '#ef4444',
  orange: '#f97316',
}

interface Note {
  name: string
  content: string
  reference_doctype: string
  reference_name: string
  reference_label: string
  pinned: boolean
  color: string
  tags: string[]
  owner_name: string
  creation: string
  modified: string
}

// ── State ──────────────────────────────────────────────

const notes = ref<Note[]>([])
const total = ref(0)
const loading = ref(false)
const newContent = ref('')
const newColor = ref('')
const showNewColorPicker = ref(false)
const newPinned = ref(false)
const newTags = ref<string[]>([])
const showNewTagInput = ref(false)
const newTagInput = ref('')
const saving = ref(false)

// ── Context detection ──────────────────────────────────

const currentContext = computed(() => {
  const path = window.location.pathname
  const match = path.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/)
  if (!match) return null
  const [, app, slug, docname] = match
  if (app === 'dock' || app === 'app' || app === 'api') return null
  // Convert slug to DocType-like name (e.g. "projects" → detect from meta)
  return { app, slug, docname: decodeURIComponent(docname) }
})

const contextLabel = computed(() => {
  if (!currentContext.value) return null
  return currentContext.value.docname
})

// Whether user wants the context link (opt-out dismissable)
const includeContext = ref(true)

// Pending image attachments (uploaded before note is saved)
const pendingImages = ref<{ url: string; name: string }[]>([])
const uploadingImage = ref(false)

// Full-page link — context-aware
const notesPageUrl = computed(() => {
  const path = window.location.pathname
  type App = { route: string }
  const active = (registeredApps.value as App[]).find(a =>
    a.route !== '/dock' && path.startsWith(a.route)
  )
  return active ? `${active.route}/notes` : '/dock/notes'
})

// ── Tag input state ────────────────────────────────────

const addingTagFor = ref<string | null>(null)
const tagInput = ref('')

// ── Image handling ─────────────────────────────────────

async function attachImage() {
  const files = await pickFiles('image/*')
  for (const file of files) {
    await doUpload(file)
  }
}

async function doUpload(file: File) {
  uploadingImage.value = true
  try {
    const url = await uploadFile(file)
    if (url) {
      pendingImages.value.push({ url, name: file.name })
    }
  } finally {
    uploadingImage.value = false
  }
}

function removePendingImage(url: string) {
  pendingImages.value = pendingImages.value.filter(i => i.url !== url)
}

function onPaste(e: ClipboardEvent) {
  const items = e.clipboardData?.items
  if (!items) return
  for (const item of Array.from(items)) {
    if (item.type.startsWith('image/')) {
      e.preventDefault()
      const file = item.getAsFile()
      if (file) doUpload(file)
      return
    }
  }
}

// ── Drag-and-drop ─────────────────────────────────────

const draggingOver = ref(false)

function onPanelDragEnter(e: DragEvent) {
  if (e.dataTransfer?.types?.includes('Files')) draggingOver.value = true
}
function onPanelDragOver(e: DragEvent) {
  if (e.dataTransfer?.types?.includes('Files')) e.dataTransfer!.dropEffect = 'copy'
}
function onPanelDragLeave(e: DragEvent) {
  const el = e.currentTarget as HTMLElement
  if (!el?.contains(e.relatedTarget as Node)) draggingOver.value = false
}
function onPanelDrop(e: DragEvent) {
  draggingOver.value = false
  const files = e.dataTransfer?.files
  if (!files?.length) return
  for (const file of Array.from(files)) {
    if (file.type.startsWith('image/')) doUpload(file)
  }
}

// Global safety net: prevent browser from opening dropped files
const _preventNav = (e: Event) => e.preventDefault()
onMounted(() => {
  document.addEventListener('dragover', _preventNav)
  document.addEventListener('drop', _preventNav)
})
onBeforeUnmount(() => {
  document.removeEventListener('dragover', _preventNav)
  document.removeEventListener('drop', _preventNav)
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
  if ((!newContent.value.trim() && !pendingImages.value.length) || saving.value) return
  saving.value = true
  try {
    // Build content: text + images
    let content = newContent.value.trim()
    if (pendingImages.value.length) {
      const imgHtml = pendingImages.value
        .map(img => `<img src="${img.url}" alt="${img.name}" />`)
        .join('')
      content = content ? `<p>${content}</p>${imgHtml}` : imgHtml
    }

    const params: Record<string, string> = { content }
    if (newColor.value) params.color = newColor.value
    // Pass context if detected and user hasn't dismissed it
    if (includeContext.value && currentContext.value) {
      params.reference_name = currentContext.value.docname
    }
    const note = await callApi<Note>('dock.api.notes.create', params)
    // Pin if toggled
    if (newPinned.value) {
      await callApi('dock.api.notes.toggle_pin', { name: note.name })
      note.pinned = true
    }
    // Add tags after creation
    for (const tag of newTags.value) {
      await callApi('frappe.client.add_tag', { tag, dt: 'Dock Note', dn: note.name })
      note.tags.push(tag)
    }
    notes.value.unshift(note)
    total.value++
    newContent.value = ''
    newColor.value = ''
    showNewColorPicker.value = false
    newPinned.value = false
    newTags.value = []
    showNewTagInput.value = false
    newTagInput.value = ''
    pendingImages.value = []
    includeContext.value = true
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
  // Strip HTML tags for plain text editing in panel
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

async function attachImageToNote(noteName: string) {
  const files = await pickFiles('image/*')
  for (const file of files) {
    const url = await uploadFile(file)
    if (!url) continue
    const note = notes.value.find(n => n.name === noteName)
    if (!note) continue
    const imgTag = `<img src="${url}" />`
    const newContent = note.content + imgTag
    const old = note.content
    note.content = newContent
    try {
      await callApi('dock.api.notes.update', { name: noteName, content: newContent })
    } catch {
      note.content = old
    }
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

// ── Tags ───────────────────────────────────────────────

function startAddTag(name: string) {
  addingTagFor.value = name
  tagInput.value = ''
}

function cancelAddTag() {
  addingTagFor.value = null
  tagInput.value = ''
}

async function addTag(noteName: string) {
  const value = tagInput.value.trim()
  if (!value) return
  const note = notes.value.find(n => n.name === noteName)
  if (!note) return
  if (note.tags.includes(value)) { cancelAddTag(); return }

  note.tags.push(value)
  cancelAddTag()
  try {
    await callApi('frappe.client.add_tag', { tag: value, dt: 'Dock Note', dn: noteName })
  } catch {
    note.tags = note.tags.filter(t => t !== value)
  }
}

async function removeTag(noteName: string, tag: string) {
  const note = notes.value.find(n => n.name === noteName)
  if (!note) return
  note.tags = note.tags.filter(t => t !== tag)
  try {
    await callApi('frappe.client.remove_tag', { tag, dt: 'Dock Note', dn: noteName })
  } catch {
    note.tags.push(tag)
  }
}

function onTagKeydown(e: KeyboardEvent, noteName: string) {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTag(noteName)
  }
  if (e.key === 'Escape') {
    cancelAddTag()
  }
}

// ── Note actions (hook-driven) ────────────────────────

const actionRunning = ref<string | null>(null)
const confirmActionFor = ref<string | null>(null)
const pendingAction = ref<{ handler: string; label: string } | null>(null)
const actionSuccess = ref<{ noteName: string; message: string } | null>(null)

function promptNoteAction(action: { handler: string; label: string }, noteName: string) {
  confirmActionFor.value = noteName
  pendingAction.value = action
}

function cancelNoteAction() {
  confirmActionFor.value = null
  pendingAction.value = null
}

async function confirmNoteAction() {
  if (!confirmActionFor.value || !pendingAction.value || actionRunning.value) return
  const noteName = confirmActionFor.value
  const action = pendingAction.value
  actionRunning.value = noteName
  confirmActionFor.value = null
  pendingAction.value = null
  try {
    const result = await callApi<{ success: boolean; message?: string; route?: string }>(
      action.handler, { note_name: noteName },
    )
    if (result?.message) {
      actionSuccess.value = { noteName, message: result.message }
      setTimeout(() => { actionSuccess.value = null }, 3000)
      load()
    }
  } finally {
    actionRunning.value = null
  }
}

// ── Color on existing notes ────────────────────────────

const colorPickerFor = ref<string | null>(null)

function toggleColorPicker(name: string) {
  colorPickerFor.value = colorPickerFor.value === name ? null : name
}

async function setNoteColor(noteName: string, color: string) {
  const note = notes.value.find(n => n.name === noteName)
  if (!note) return
  const old = note.color
  note.color = color
  colorPickerFor.value = null
  try {
    await callApi('dock.api.notes.update', { name: noteName, color })
  } catch {
    note.color = old
  }
}

// ── Helpers ────────────────────────────────────────────

function onNoteContentClick(e: MouseEvent, note: Note) {
  const target = e.target as HTMLElement
  if (target.tagName === 'IMG') {
    // Open full image in new tab instead of editing
    const src = (target as HTMLImageElement).src
    if (src) window.open(src, '_blank')
    return
  }
  startEdit(note)
}

function onKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    createNote()
  }
}

function colorBorder(color: string): string {
  return NOTE_COLORS[color] || 'transparent'
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
        ...(draggingOver ? { outline: '2px dashed var(--dock-accent)', outlineOffset: '-2px', borderRadius: '0.375rem' } : {}),
      }"
      @dragenter.prevent="onPanelDragEnter"
      @dragover.prevent="onPanelDragOver"
      @dragleave="onPanelDragLeave"
      @drop.prevent="onPanelDrop"
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
        @paste="onPaste"
      />

      <!-- Pending image previews -->
      <div
        v-if="pendingImages.length"
        :style="{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.375rem',
          marginTop: '0.375rem',
        }"
      >
        <div
          v-for="img in pendingImages"
          :key="img.url"
          :style="{
            position: 'relative',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '0.375rem',
            overflow: 'hidden',
            border: '1px solid var(--dock-border)',
          }"
        >
          <img
            :src="img.url"
            :alt="img.name"
            :style="{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }"
          />
          <button
            :style="{
              position: 'absolute',
              top: '0.125rem',
              right: '0.125rem',
              width: '1rem',
              height: '1rem',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0',
            }"
            @click="removePendingImage(img.url)"
          >
            <X :style="{ width: '0.5rem', height: '0.5rem' }" />
          </button>
        </div>
      </div>

      <!-- Uploading indicator -->
      <div
        v-if="uploadingImage"
        :style="{
          marginTop: '0.25rem',
          fontSize: '0.6875rem',
          color: 'var(--dock-icon)',
        }"
      >
        {{ __('Uploading image...') }}
      </div>

      <!-- Context chip (opt-out) -->
      <div
        v-if="contextLabel && includeContext"
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          marginTop: '0.375rem',
          padding: '0.125rem 0.5rem',
          fontSize: '0.6875rem',
          color: 'var(--dock-accent, #6366f1)',
          background: 'var(--dock-accent, #6366f1)',
          backgroundColor: 'color-mix(in srgb, var(--dock-accent, #6366f1) 8%, transparent)',
          borderRadius: '0.25rem',
          width: 'fit-content',
        }"
      >
        <span>📌 {{ contextLabel }}</span>
        <button
          :style="{
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            padding: '0.125rem',
            cursor: 'pointer',
            color: 'var(--dock-accent, #6366f1)',
          }"
          :title="__('Remove link')"
          @click="includeContext = false"
        >
          <X :style="{ width: '0.625rem', height: '0.625rem' }" />
        </button>
      </div>

      <div
        :style="{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.375rem',
        }"
      >
        <div :style="{ display: 'flex', alignItems: 'center', gap: '0.5rem' }">
          <!-- Color picker dots -->
          <div :style="{ display: 'flex', alignItems: 'center', gap: '0.25rem', position: 'relative' }">
            <button
              :style="{
                width: '1rem',
                height: '1rem',
                borderRadius: '50%',
                border: newColor ? '1px solid rgba(0,0,0,0.15)' : '1.5px dashed var(--dock-icon)',
                background: newColor ? NOTE_COLORS[newColor] || 'transparent' : 'transparent',
                cursor: 'pointer',
                padding: '0',
                flexShrink: '0',
              }"
              :title="__('Color')"
              @click="showNewColorPicker = !showNewColorPicker"
            />
            <div
              v-if="showNewColorPicker"
              :style="{
                position: 'absolute',
                bottom: '100%',
                left: '0',
                marginBottom: '0.25rem',
                display: 'flex',
                gap: '0.375rem',
                padding: '0.5rem',
                background: 'var(--dock-bg)',
                border: '1px solid var(--dock-border)',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                zIndex: '10',
              }"
            >
              <button
                v-for="(hex, name) in NOTE_COLORS"
                :key="name"
                :style="{
                  width: '1.25rem',
                  height: '1.25rem',
                  borderRadius: '50%',
                  background: hex,
                  border: newColor === name ? '2.5px solid var(--dock-text)' : '1px solid rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                  padding: '0',
                }"
                :title="name"
                @click="newColor = newColor === name ? '' : name; showNewColorPicker = false"
              />
              <button
                v-if="newColor"
                :style="{
                  width: '1.25rem',
                  height: '1.25rem',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '1.5px dashed var(--dock-icon)',
                  cursor: 'pointer',
                  padding: '0',
                }"
                :title="__('No color')"
                @click="newColor = ''; showNewColorPicker = false"
              />
            </div>
          </div>
          <button
            :style="{
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              padding: '0.25rem',
              cursor: 'pointer',
              color: 'var(--dock-icon)',
              borderRadius: '0.25rem',
            }"
            :title="__('Attach image')"
            @click="attachImage"
          >
            <ImagePlus :style="{ width: '0.875rem', height: '0.875rem' }" />
          </button>
          <button
            :style="{
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              padding: '0.25rem',
              cursor: 'pointer',
              color: showNewTagInput ? 'var(--dock-text)' : 'var(--dock-icon)',
              borderRadius: '0.25rem',
            }"
            :title="__('Add tag')"
            @click="showNewTagInput = !showNewTagInput"
          >
            <Tag :style="{ width: '0.875rem', height: '0.875rem' }" />
          </button>
          <button
            :style="{
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              padding: '0.25rem',
              cursor: 'pointer',
              color: newPinned ? 'var(--dock-accent, #6366f1)' : 'var(--dock-icon)',
              borderRadius: '0.25rem',
            }"
            :title="newPinned ? __('Unpin') : __('Pin')"
            @click="newPinned = !newPinned"
          >
            <Pin :style="{ width: '0.875rem', height: '0.875rem' }" />
          </button>
        </div>
        <!-- New note tag chips + input -->
        <div v-if="showNewTagInput || newTags.length" :style="{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.375rem' }">
          <span
            v-for="tag in newTags"
            :key="tag"
            :style="{
              display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
              fontSize: '0.625rem', padding: '0.0625rem 0.375rem',
              borderRadius: '0.75rem',
              background: 'var(--dock-accent, #6366f1)', color: '#fff',
            }"
          >
            {{ tag }}
            <button
              :style="{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: '0.625rem' }"
              @click="newTags = newTags.filter(t => t !== tag)"
            >&times;</button>
          </span>
          <input
            v-if="showNewTagInput"
            v-model="newTagInput"
            :placeholder="__('Tag...')"
            :style="{
              fontSize: '0.6875rem', padding: '0.0625rem 0.375rem',
              border: '1px solid var(--dock-border)', borderRadius: '0.25rem',
              background: 'transparent', color: 'var(--dock-text)',
              outline: 'none', width: '5rem',
            }"
            @keydown.enter.prevent="
              if (newTagInput.trim() && !newTags.includes(newTagInput.trim())) {
                newTags.push(newTagInput.trim()); newTagInput = ''
              }
            "
            @keydown.escape="showNewTagInput = false"
          />
        </div>
        <button
          :disabled="(!newContent.trim() && !pendingImages.length) || saving"
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
      <!-- Success toast -->
      <div
        v-if="actionSuccess"
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          padding: '0.375rem 0.75rem',
          margin: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.6875rem',
          background: '#f0fdf4',
          color: '#15803d',
          border: '1px solid #bbf7d0',
        }"
      >
        <span>{{ actionSuccess.message }}</span>
      </div>

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
            borderLeft: note.color ? `4px solid ${colorBorder(note.color)}` : '4px solid transparent',
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
            @click="onNoteContentClick($event, note)"
          />

          <!-- Tags -->
          <div
            v-if="note.tags.length || addingTagFor === note.name"
            :style="{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.25rem',
              marginTop: '0.375rem',
            }"
          >
            <span
              v-for="tag in note.tags"
              :key="tag"
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.125rem',
                padding: '0 0.375rem',
                fontSize: '0.625rem',
                lineHeight: '1.25rem',
                borderRadius: '0.75rem',
                background: 'color-mix(in srgb, var(--dock-accent, #6366f1) 10%, transparent)',
                color: 'var(--dock-accent, #6366f1)',
              }"
            >
              {{ tag }}
              <button
                :style="{ background: 'none', border: 'none', padding: '0', cursor: 'pointer', color: 'inherit', display: 'flex' }"
                :title="__('Remove tag')"
                @click="removeTag(note.name, tag)"
              >
                <X :style="{ width: '0.5rem', height: '0.5rem' }" />
              </button>
            </span>

            <!-- Inline tag input -->
            <input
              v-if="addingTagFor === note.name"
              v-model="tagInput"
              :style="{
                width: '5rem',
                padding: '0 0.25rem',
                fontSize: '0.625rem',
                lineHeight: '1.25rem',
                border: '1px solid var(--dock-border)',
                borderRadius: '0.75rem',
                background: 'transparent',
                color: 'var(--dock-text)',
                outline: 'none',
              }"
              :placeholder="__('Add a tag')"
              autofocus
              @keydown="onTagKeydown($event, note.name)"
              @blur="cancelAddTag"
            />
          </div>

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
            <!-- Hook-driven note actions -->
            <div
              v-for="action in noteActions"
              :key="action.action"
              :style="{ position: 'relative', display: 'inline-flex' }"
            >
              <button
                :title="__(action.label)"
                :disabled="actionRunning === note.name"
                :style="{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  padding: '0.125rem',
                  cursor: actionRunning === note.name ? 'wait' : 'pointer',
                  color: 'var(--dock-icon)',
                  opacity: 0,
                  transition: 'opacity 0.15s',
                }"
                class="dock-note-action"
                @click.stop="promptNoteAction(action, note.name)"
              >
                <SquareArrowOutUpRight :style="{ width: '0.75rem', height: '0.75rem' }" />
              </button>
              <!-- Confirmation popover -->
              <div
                v-if="confirmActionFor === note.name"
                :style="{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '0.25rem',
                  zIndex: 20,
                  background: 'var(--dock-bg)',
                  border: '1px solid var(--dock-border)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  padding: '0.625rem 0.75rem',
                  minWidth: '12rem',
                }"
                @click.stop
              >
                <p :style="{ fontSize: '0.6875rem', color: 'var(--dock-text)', margin: '0 0 0.5rem 0' }">
                  {{ __('Convert this note to a task?') }}
                </p>
                <div :style="{ display: 'flex', justifyContent: 'flex-end', gap: '0.375rem' }">
                  <button
                    :style="{
                      fontSize: '0.6875rem',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '0.25rem',
                      background: 'none',
                      border: '1px solid var(--dock-border)',
                      color: 'var(--dock-text)',
                      cursor: 'pointer',
                    }"
                    @click.stop="cancelNoteAction"
                  >{{ __('Cancel') }}</button>
                  <button
                    :disabled="actionRunning === note.name"
                    :style="{
                      fontSize: '0.6875rem',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '0.25rem',
                      background: 'var(--dock-accent, #6366f1)',
                      color: 'white',
                      border: 'none',
                      cursor: actionRunning === note.name ? 'wait' : 'pointer',
                      opacity: actionRunning === note.name ? 0.5 : 1,
                    }"
                    @click.stop="confirmNoteAction"
                  >{{ actionRunning === note.name ? __('Converting...') : __('Convert') }}</button>
                </div>
              </div>
            </div>
            <!-- Actions -->
            <button
              :title="__('Attach image')"
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
              @click.stop="attachImageToNote(note.name)"
            >
              <ImagePlus :style="{ width: '0.75rem', height: '0.75rem' }" />
            </button>
            <div :style="{ position: 'relative', display: 'inline-flex' }">
              <button
                :title="__('Color')"
                :style="{
                  width: '1rem',
                  height: '1rem',
                  borderRadius: '50%',
                  border: note.color ? '1px solid rgba(0,0,0,0.15)' : '1.5px dashed var(--dock-icon)',
                  background: note.color ? (NOTE_COLORS[note.color] || 'transparent') : 'transparent',
                  cursor: 'pointer',
                  padding: '0',
                  flexShrink: '0',
                  opacity: note.color ? 1 : 0,
                  transition: 'opacity 0.15s',
                }"
                class="dock-note-action"
                @click.stop="toggleColorPicker(note.name)"
              />
              <!-- Color popover -->
              <div
                v-if="colorPickerFor === note.name"
                :style="{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '0.25rem',
                  zIndex: 20,
                  display: 'flex',
                  gap: '0.375rem',
                  padding: '0.5rem',
                  background: 'var(--dock-bg)',
                  border: '1px solid var(--dock-border)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                }"
                @click.stop
              >
                <button
                  v-for="(hex, name) in NOTE_COLORS"
                  :key="name"
                  :style="{
                    width: '1.25rem',
                    height: '1.25rem',
                    borderRadius: '50%',
                    background: hex,
                    border: note.color === name ? '2.5px solid var(--dock-text)' : '1px solid rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    padding: '0',
                    transition: 'transform 0.1s',
                  }"
                  :title="String(name)"
                  @click="setNoteColor(note.name, note.color === name ? '' : String(name))"
                />
                <button
                  v-if="note.color"
                  :style="{
                    width: '1.25rem',
                    height: '1.25rem',
                    borderRadius: '50%',
                    background: 'transparent',
                    border: '1.5px dashed var(--dock-icon)',
                    cursor: 'pointer',
                    padding: '0',
                  }"
                  :title="__('No color')"
                  @click="setNoteColor(note.name, '')"
                />
              </div>
            </div>
            <button
              :title="__('Add a tag')"
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
              @click.stop="startAddTag(note.name)"
            >
              <Tag :style="{ width: '0.75rem', height: '0.75rem' }" />
            </button>
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

/* Images in note content — small horizontal thumbnails */
.dock-note-item :deep(img) {
  display: inline-block;
  width: 3.5rem;
  height: 3.5rem;
  object-fit: cover;
  border-radius: 0.375rem;
  margin: 0.125rem 0.25rem 0.125rem 0;
  cursor: pointer;
  vertical-align: middle;
  transition: opacity 0.15s;
}

.dock-note-item :deep(img:hover) {
  opacity: 0.8;
}
</style>
