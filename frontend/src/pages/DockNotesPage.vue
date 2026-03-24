<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockNotesPage' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import {
  Plus, Pin, PinOff, Pencil, Trash2, Send, StickyNote,
  ExternalLink, X, Tag, Palette, Check, ImagePlus, SquareArrowOutUpRight,
} from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockBoot } from '@/composables/useDockBoot'
import { uploadFile, pickFiles } from '@/composables/useFileUpload'
import { relativeTime } from '@/composables/useRelativeTime'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

// ── Constants ──────────────────────────────────────────

const NOTE_COLORS: { value: string; label: string; hex: string }[] = [
  { value: '', label: __('No color'), hex: '' },
  { value: 'yellow', label: __('Yellow'), hex: '#eab308' },
  { value: 'green', label: __('Green'), hex: '#22c55e' },
  { value: 'blue', label: __('Blue'), hex: '#3b82f6' },
  { value: 'purple', label: __('Purple'), hex: '#a855f7' },
  { value: 'red', label: __('Red'), hex: '#ef4444' },
  { value: 'orange', label: __('Orange'), hex: '#f97316' },
]

// ── Types ──────────────────────────────────────────────

interface Note {
  name: string
  content: string
  reference_doctype: string
  reference_name: string
  reference_label: string
  pinned: boolean
  color: string
  tags: string[]
  owner: string
  owner_name: string
  creation: string
  modified: string
}

// ── State ──────────────────────────────────────────────

const PAGE_SIZE = 30
const notes = ref<Note[]>([])
const total = ref(0)
const offset = ref(0)
const loading = ref(false)
const hasError = ref(false)

const showCreate = ref(false)
const saving = ref(false)
const newColor = ref('')
const showNewColorPicker = ref(false)

// Filters
const filterColors = ref<string[]>([])
const filterTags = ref<string[]>([])
const sortBy = ref<'modified' | 'creation'>('modified')
const allTags = ref<string[]>([])
const showTagFilter = ref(false)
const showSortMenu = ref(false)

let router: ReturnType<typeof useRouter> | undefined
try { router = useRouter() } catch { /* outside router */ }

const { noteActions } = useDockBoot()

// ── Note actions (hook-driven) ──────────────────────────

interface NoteActionResult {
  success: boolean
  message?: string
  route?: string
}

const actionRunning = ref<string | null>(null)
const confirmActionFor = ref<string | null>(null)
const pendingAction = ref<{ action: string; handler: string; label: string } | null>(null)
const actionSuccess = ref<{ noteName: string; message: string } | null>(null)

function promptNoteAction(action: { action: string; handler: string; label: string }, noteName: string) {
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
    const result = await callApi<NoteActionResult>(action.handler, { note_name: noteName })
    if (result?.message) {
      actionSuccess.value = { noteName, message: result.message }
      setTimeout(() => { actionSuccess.value = null }, 3000)
      load(true)
    }
  } finally {
    actionRunning.value = null
  }
}

// ── Tiptap — create editor ────────────────────────────

// ── Image upload helper ────────────────────────────────

async function uploadAndInsert(file: File, editor: ReturnType<typeof useEditor>['value']) {
  if (!editor) return
  const fileUrl = await uploadFile(file)
  if (fileUrl) {
    editor.chain().focus().setImage({ src: fileUrl }).run()
  }
}

async function attachImageToEditor(editor: ReturnType<typeof useEditor>['value']) {
  if (!editor) return
  const files = await pickFiles('image/*')
  for (const file of files) {
    await uploadAndInsert(file, editor)
  }
}

// ── Drag-and-drop zone ─────────────────────────────────
// ProseMirror swallows drop events internally, so we use a capture-phase
// listener on the wrapping div to intercept file drops before ProseMirror.

const createDropZone = ref<HTMLElement | null>(null)
const editDropZone = ref<HTMLElement | null>(null)
const draggingOver = ref<'create' | 'edit' | null>(null)

function setupDropZone(el: HTMLElement | null, editorRef: () => ReturnType<typeof useEditor>['value'], zone: 'create' | 'edit') {
  if (!el) return
  // Use capture phase to intercept before ProseMirror
  el.addEventListener('dragenter', (e: DragEvent) => {
    if (e.dataTransfer?.types.includes('Files')) {
      draggingOver.value = zone
    }
  }, true)
  el.addEventListener('dragover', (e: DragEvent) => {
    if (e.dataTransfer?.types.includes('Files')) {
      e.preventDefault()
      e.stopPropagation()
      e.dataTransfer.dropEffect = 'copy'
    }
  }, true)
  el.addEventListener('dragleave', (e: DragEvent) => {
    // Only clear if leaving the container itself
    if (el && !el.contains(e.relatedTarget as Node)) {
      draggingOver.value = null
    }
  }, true)
  el.addEventListener('drop', (e: DragEvent) => {
    draggingOver.value = null
    const files = e.dataTransfer?.files
    if (!files?.length) return
    const hasImages = Array.from(files).some(f => f.type.startsWith('image/'))
    if (!hasImages) return
    e.preventDefault()
    e.stopPropagation()
    for (const file of Array.from(files)) {
      if (file.type.startsWith('image/')) {
        uploadAndInsert(file, editorRef())
      }
    }
  }, true)
}

// ── Tiptap — create editor ────────────────────────────

const createEditor = useEditor({
  extensions: [
    StarterKit,
    TaskList,
    TaskItem.configure({ nested: true }),
    ImageExtension.configure({ inline: true, allowBase64: false }),
    LinkExtension.configure({ openOnClick: false }),
    Placeholder.configure({ placeholder: __('Write a note...') }),
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm max-w-none focus:outline-none min-h-[100px] px-1 py-2',
    },
    handlePaste(_view: any, event: ClipboardEvent) {
      const items = event.clipboardData?.items
      if (!items) return false
      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          event.preventDefault()
          const file = item.getAsFile()
          if (file) uploadAndInsert(file, createEditor.value)
          return true
        }
      }
      return false
    },
  },
})

// ── Tiptap — edit editor ──────────────────────────────

const editEditor = useEditor({
  extensions: [
    StarterKit,
    TaskList,
    TaskItem.configure({ nested: true }),
    ImageExtension.configure({ inline: true, allowBase64: false }),
    LinkExtension.configure({ openOnClick: false }),
    Placeholder.configure({ placeholder: __('Edit note...') }),
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm max-w-none focus:outline-none min-h-[60px] px-2 py-2 border border-[var(--dock-accent)] rounded-md',
    },
    handlePaste(_view: any, event: ClipboardEvent) {
      const items = event.clipboardData?.items
      if (!items) return false
      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          event.preventDefault()
          const file = item.getAsFile()
          if (file) uploadAndInsert(file, editEditor.value)
          return true
        }
      }
      return false
    },
  },
})

// ── Data loading ───────────────────────────────────────

async function load(reset = false) {
  if (reset) { offset.value = 0; notes.value = [] }
  loading.value = true
  hasError.value = false
  try {
    const params: Record<string, any> = {
      limit: PAGE_SIZE,
      offset: offset.value,
      sort_by: sortBy.value,
    }
    if (filterColors.value.length) {
      params.color = filterColors.value.join(',')
    }
    if (filterTags.value.length) {
      params.tag = filterTags.value.join(',')
    }
    const res = await callApi<{ items: Note[]; total: number }>('dock.api.notes.get_list', params)
    notes.value = reset ? res.items : [...notes.value, ...res.items]
    total.value = res.total
    offset.value += res.items.length

    // Collect all unique tags for the filter dropdown
    const tagSet = new Set(allTags.value)
    for (const n of res.items) {
      for (const t of n.tags) tagSet.add(t)
    }
    allTags.value = Array.from(tagSet).sort()
  } catch {
    hasError.value = true
  } finally {
    loading.value = false
  }
}

// Reload when filters change
watch([filterColors, filterTags, sortBy], () => load(true))

// ── CRUD ───────────────────────────────────────────────

async function createNote() {
  const content = createEditor.value?.getHTML()
  if (!content || content === '<p></p>' || saving.value) return
  saving.value = true
  try {
    const params: Record<string, string> = { content }
    if (newColor.value) params.color = newColor.value
    const note = await callApi<Note>('dock.api.notes.create', params)
    notes.value.unshift(note)
    total.value++
    createEditor.value?.commands.clearContent()
    newColor.value = ''
    showNewColorPicker.value = false
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

// ── Inline editing ─────────────────────────────────────

const editingName = ref<string | null>(null)

function onNoteContentClick(e: MouseEvent, note: Note) {
  const target = e.target as HTMLElement
  if (target.tagName === 'IMG') {
    const src = (target as HTMLImageElement).src
    if (src) window.open(src, '_blank')
    return
  }
  startEdit(note)
}

function startEdit(note: Note) {
  editingName.value = note.name
  nextTick(() => {
    editEditor.value?.commands.setContent(note.content)
    editEditor.value?.commands.focus()
  })
}

function cancelEdit() {
  editingName.value = null
  editEditor.value?.commands.clearContent()
}

async function saveEdit() {
  if (!editingName.value) return
  const content = editEditor.value?.getHTML()
  if (!content || content === '<p></p>') return
  const note = notes.value.find(n => n.name === editingName.value)
  if (!note) return
  const oldContent = note.content
  note.content = content
  try {
    await callApi('dock.api.notes.update', { name: editingName.value, content })
  } catch {
    note.content = oldContent
  }
  editingName.value = null
  editEditor.value?.commands.clearContent()
}

// ── Color ──────────────────────────────────────────────

const colorPickerFor = ref<string | null>(null)

function toggleColorPicker(name: string) {
  colorPickerFor.value = colorPickerFor.value === name ? null : name
}

async function setColor(noteName: string, color: string) {
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

// ── Tags ───────────────────────────────────────────────

const addingTagFor = ref<string | null>(null)
const tagInput = ref('')

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
  if (!allTags.value.includes(value)) allTags.value.push(value)
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
  if (e.key === 'Enter') { e.preventDefault(); addTag(noteName) }
  if (e.key === 'Escape') cancelAddTag()
}

// ── Filter helpers ─────────────────────────────────────

function toggleColorFilter(color: string) {
  const idx = filterColors.value.indexOf(color)
  if (idx >= 0) filterColors.value.splice(idx, 1)
  else filterColors.value.push(color)
}

function toggleTagFilter(tag: string) {
  const idx = filterTags.value.indexOf(tag)
  if (idx >= 0) filterTags.value.splice(idx, 1)
  else filterTags.value.push(tag)
}

function clearAllFilters() {
  filterColors.value = []
  filterTags.value = []
}

const hasActiveFilters = computed(() => filterColors.value.length > 0 || filterTags.value.length > 0)

// ── Navigation ─────────────────────────────────────────

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

// ── Color helpers ──────────────────────────────────────

function colorBorder(color: string): string {
  const found = NOTE_COLORS.find(c => c.value === color)
  return found?.hex || 'transparent'
}

// ── Lifecycle ──────────────────────────────────────────

onMounted(() => load(true))

// Set up drop zones when template refs become available
watch(createDropZone, (el) => setupDropZone(el, () => createEditor.value, 'create'))
watch(editDropZone, (el) => setupDropZone(el, () => editEditor.value, 'edit'))

onBeforeUnmount(() => {
  createEditor.value?.destroy()
  editEditor.value?.destroy()
})
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

    <!-- Filter bar -->
    <div class="flex flex-wrap items-center gap-3 mb-4">
      <!-- Color circles -->
      <div class="flex items-center gap-1.5">
        <button
          v-for="c in NOTE_COLORS.filter(c => c.value)"
          :key="c.value"
          class="w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center"
          :class="filterColors.includes(c.value) ? 'border-[var(--dock-text)] scale-110' : 'border-transparent opacity-60 hover:opacity-100'"
          :style="{ backgroundColor: c.hex }"
          :title="c.label"
          @click="toggleColorFilter(c.value)"
        >
          <Check v-if="filterColors.includes(c.value)" class="w-2.5 h-2.5 text-white" />
        </button>
      </div>

      <!-- Tag filter -->
      <div v-if="allTags.length" class="relative">
        <button
          class="flex items-center gap-1 px-2 py-1 rounded-md text-xs
                 border border-[var(--dock-border)] text-[var(--dock-icon)]
                 hover:text-[var(--dock-text)] transition-colors"
          @click="showTagFilter = !showTagFilter"
        >
          <Tag class="w-3 h-3" />
          {{ __('Tags') }}
          <span v-if="filterTags.length" class="ml-0.5 text-[var(--dock-accent)]">({{ filterTags.length }})</span>
        </button>
        <div
          v-if="showTagFilter"
          class="absolute top-full left-0 mt-1 z-10 bg-[var(--dock-bg)] border border-[var(--dock-border)]
                 rounded-lg shadow-lg py-1 min-w-[10rem] max-h-48 overflow-y-auto"
        >
          <button
            v-for="t in allTags"
            :key="t"
            class="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-left
                   hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors"
            :class="filterTags.includes(t) ? 'text-[var(--dock-accent)]' : 'text-[var(--dock-text)]'"
            @click="toggleTagFilter(t)"
          >
            <Check v-if="filterTags.includes(t)" class="w-3 h-3" />
            <span v-else class="w-3 h-3" />
            {{ t }}
          </button>
        </div>
      </div>

      <span class="flex-1" />

      <!-- Sort -->
      <div class="relative">
        <button
          class="flex items-center gap-1 px-2 py-1 rounded-md text-xs
                 border border-[var(--dock-border)] text-[var(--dock-icon)]
                 hover:text-[var(--dock-text)] transition-colors"
          @click="showSortMenu = !showSortMenu"
        >
          {{ __('Sort by') }}: {{ sortBy === 'modified' ? __('Date modified') : __('Date created') }}
        </button>
        <div
          v-if="showSortMenu"
          class="absolute top-full right-0 mt-1 z-10 bg-[var(--dock-bg)] border border-[var(--dock-border)]
                 rounded-lg shadow-lg py-1 min-w-[10rem]"
        >
          <button
            class="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-left
                   hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
            :class="sortBy === 'modified' ? 'text-[var(--dock-accent)]' : 'text-[var(--dock-text)]'"
            @click="sortBy = 'modified'; showSortMenu = false"
          >
            <Check v-if="sortBy === 'modified'" class="w-3 h-3" />
            <span v-else class="w-3 h-3" />
            {{ __('Date modified') }}
          </button>
          <button
            class="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-left
                   hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
            :class="sortBy === 'creation' ? 'text-[var(--dock-accent)]' : 'text-[var(--dock-text)]'"
            @click="sortBy = 'creation'; showSortMenu = false"
          >
            <Check v-if="sortBy === 'creation'" class="w-3 h-3" />
            <span v-else class="w-3 h-3" />
            {{ __('Date created') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Active filter chips -->
    <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-1.5 mb-4">
      <span
        v-for="c in filterColors"
        :key="'c-' + c"
        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]
               border border-[var(--dock-border)] text-[var(--dock-text)]"
      >
        <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: colorBorder(c) }" />
        {{ NOTE_COLORS.find(nc => nc.value === c)?.label }}
        <button class="hover:text-red-500" @click="toggleColorFilter(c)"><X class="w-2.5 h-2.5" /></button>
      </span>
      <span
        v-for="t in filterTags"
        :key="'t-' + t"
        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]
               border border-[var(--dock-border)] text-[var(--dock-accent)]"
      >
        #{{ t }}
        <button class="hover:text-red-500" @click="toggleTagFilter(t)"><X class="w-2.5 h-2.5" /></button>
      </span>
      <button
        class="text-[10px] text-[var(--dock-icon)] hover:text-[var(--dock-text)] underline"
        @click="clearAllFilters"
      >{{ __('Clear all') }}</button>
    </div>

    <!-- Create form with Tiptap -->
    <div
      v-if="showCreate"
      ref="createDropZone"
      class="border rounded-lg p-4 mb-6 relative transition-colors"
      :class="draggingOver === 'create'
        ? 'border-[var(--dock-accent)] border-dashed bg-[var(--dock-accent)]/[0.04]'
        : 'border-[var(--dock-border)]'"
    >
      <!-- Drop overlay hint -->
      <div
        v-if="draggingOver === 'create'"
        class="absolute inset-0 z-10 flex items-center justify-center rounded-lg pointer-events-none"
      >
        <span class="text-sm font-medium text-[var(--dock-accent)]">{{ __('Drop image here') }}</span>
      </div>
      <EditorContent :editor="createEditor" />
      <div class="flex items-center justify-between mt-3">
        <div class="flex items-center gap-2">
          <!-- Color picker -->
          <div class="relative">
            <button
              class="w-4 h-4 rounded-full flex-shrink-0 transition-transform hover:scale-110"
              :class="newColor ? '' : 'border border-dashed border-[var(--dock-border)]'"
              :style="{ background: newColor ? colorBorder(newColor) : 'transparent' }"
              :title="__('Color')"
              @click="showNewColorPicker = !showNewColorPicker"
            />
            <div
              v-if="showNewColorPicker"
              class="absolute bottom-full left-0 mb-1 z-10 flex items-center gap-1.5 p-2
                     bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg"
            >
              <button
                v-for="c in NOTE_COLORS.filter(c => c.value)"
                :key="c.value"
                class="w-4 h-4 rounded-full transition-transform hover:scale-110"
                :class="newColor === c.value ? 'ring-2 ring-[var(--dock-text)] ring-offset-1' : ''"
                :style="{ background: c.hex }"
                :title="c.label"
                @click="newColor = newColor === c.value ? '' : c.value; showNewColorPicker = false"
              />
              <button
                v-if="newColor"
                class="w-4 h-4 rounded-full border border-dashed border-[var(--dock-border)]
                       transition-transform hover:scale-110"
                :title="__('No color')"
                @click="newColor = ''; showNewColorPicker = false"
              />
            </div>
          </div>
          <!-- Image attach -->
          <button
            class="flex items-center gap-1 px-1.5 py-1 rounded-md text-xs
                   text-[var(--dock-icon)] hover:text-[var(--dock-text)] hover:bg-black/[0.04]
                   dark:hover:bg-white/[0.04] transition-colors"
            :title="__('Attach image')"
            @click="createEditor && attachImageToEditor(createEditor)"
          >
            <ImagePlus class="w-3.5 h-3.5" />
          </button>
          <span class="text-[10px] text-[var(--dock-icon)]">{{ __('Paste or drop images') }}</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
            @click="showCreate = false; createEditor?.commands.clearContent()"
          >
            {{ __('Cancel') }}
          </button>
          <button
            class="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium
                   bg-[var(--dock-accent)] text-white hover:opacity-90 transition-opacity
                   disabled:opacity-50"
            :disabled="saving"
            @click="createNote"
          >
            <Send class="w-3 h-3" />
            {{ saving ? __('Saving...') : __('Save') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Success toast -->
    <div
      v-if="actionSuccess"
      class="flex items-center gap-2 px-3 py-2 mb-4 rounded-lg text-xs
             bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400
             border border-green-200 dark:border-green-800"
    >
      <Check class="w-3.5 h-3.5 flex-shrink-0" />
      <span>{{ actionSuccess.message }}</span>
      <button
        class="ml-auto flex-shrink-0 hover:text-green-900 dark:hover:text-green-200"
        @click="actionSuccess = null"
      ><X class="w-3 h-3" /></button>
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
        :style="{ borderLeftWidth: '4px', borderLeftColor: note.color ? colorBorder(note.color) : 'var(--dock-border)' }"
      >
        <div class="flex items-start justify-between gap-2">
          <div class="flex-1 min-w-0">
            <!-- Edit mode -->
            <div
              v-if="editingName === note.name"
              ref="editDropZone"
              class="relative transition-colors rounded-md"
              :class="draggingOver === 'edit' ? 'ring-2 ring-[var(--dock-accent)] bg-[var(--dock-accent)]/[0.04]' : ''"
            >
              <div
                v-if="draggingOver === 'edit'"
                class="absolute inset-0 z-10 flex items-center justify-center rounded-md pointer-events-none"
              >
                <span class="text-xs font-medium text-[var(--dock-accent)]">{{ __('Drop image here') }}</span>
              </div>
              <EditorContent :editor="editEditor" />
              <div class="flex items-center justify-between gap-2 mt-2">
                <button
                  class="flex items-center gap-1 px-1.5 py-1 rounded-md text-xs
                         text-[var(--dock-icon)] hover:text-[var(--dock-text)] hover:bg-black/[0.04]
                         dark:hover:bg-white/[0.04] transition-colors"
                  :title="__('Attach image')"
                  @click="editEditor && attachImageToEditor(editEditor)"
                >
                  <ImagePlus class="w-3.5 h-3.5" />
                </button>
                <div class="flex items-center gap-2">
                  <button
                    class="text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
                    @click="cancelEdit"
                  >{{ __('Cancel') }}</button>
                  <button
                    class="px-2.5 py-1 rounded-md text-xs font-medium
                           bg-[var(--dock-accent)] text-white hover:opacity-90 transition-opacity"
                    @click="saveEdit"
                  >{{ __('Save') }}</button>
                </div>
              </div>
            </div>
            <!-- Display mode -->
            <div
              v-else
              class="text-sm text-[var(--dock-text)] prose prose-sm max-w-none cursor-text rounded p-0.5
                     hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors
                     [&_img]:max-w-full [&_img]:max-h-[200px] [&_img]:object-cover [&_img]:rounded-md [&_img]:my-2 [&_img]:cursor-pointer"
              :title="__('Click to edit')"
              v-html="note.content"
              @click="onNoteContentClick($event, note)"
            />
          </div>
          <!-- Actions -->
          <div class="flex items-center gap-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <!-- Hook-driven note actions (e.g. Convert to Task) -->
            <div v-for="action in noteActions" :key="action.action" class="relative">
              <button
                class="p-1 rounded text-[var(--dock-icon)] hover:text-[var(--dock-accent)] transition-colors"
                :title="__(action.label)"
                :disabled="actionRunning === note.name"
                @click.stop="promptNoteAction(action, note.name)"
              >
                <SquareArrowOutUpRight class="w-3.5 h-3.5" />
              </button>
              <!-- Confirmation popover -->
              <div
                v-if="confirmActionFor === note.name && pendingAction?.action === action.action"
                class="absolute top-full right-0 mt-1 z-20 bg-[var(--dock-bg)] border border-[var(--dock-border)]
                       rounded-lg shadow-lg p-3 min-w-[13rem]"
                @click.stop
              >
                <p class="text-xs text-[var(--dock-text)] mb-2.5">
                  {{ __('Convert this note to a task?') }}
                </p>
                <div class="flex items-center justify-end gap-2">
                  <button
                    class="px-2.5 py-1 rounded-md text-xs text-[var(--dock-icon)]
                           hover:text-[var(--dock-text)] hover:bg-black/[0.04]
                           dark:hover:bg-white/[0.04] transition-colors"
                    @click.stop="cancelNoteAction"
                  >{{ __('Cancel') }}</button>
                  <button
                    class="px-2.5 py-1 rounded-md text-xs font-medium
                           bg-[var(--dock-accent)] text-white hover:opacity-90
                           transition-opacity disabled:opacity-50"
                    :disabled="actionRunning === note.name"
                    @click.stop="confirmNoteAction"
                  >{{ actionRunning === note.name ? __('Converting...') : __('Convert') }}</button>
                </div>
              </div>
            </div>
            <!-- Color picker -->
            <div class="relative">
              <button
                class="p-1 rounded text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
                :title="__('Color')"
                @click.stop="toggleColorPicker(note.name)"
              >
                <Palette class="w-3.5 h-3.5" />
              </button>
              <div
                v-if="colorPickerFor === note.name"
                class="absolute top-full right-0 mt-1 z-10 bg-[var(--dock-bg)] border border-[var(--dock-border)]
                       rounded-lg shadow-lg p-2 flex gap-1.5"
                role="radiogroup"
                :aria-label="__('Color')"
              >
                <button
                  v-for="c in NOTE_COLORS"
                  :key="c.value"
                  role="radio"
                  :aria-checked="note.color === c.value"
                  :aria-label="c.label"
                  class="w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center"
                  :class="note.color === c.value ? 'border-[var(--dock-text)] scale-110' : 'border-transparent hover:scale-105'"
                  :style="{ backgroundColor: c.hex || 'var(--dock-bg)', border: !c.value ? '2px dashed var(--dock-border)' : undefined }"
                  @click="setColor(note.name, c.value)"
                >
                  <Check v-if="note.color === c.value" class="w-2.5 h-2.5" :class="c.value ? 'text-white' : 'text-[var(--dock-text)]'" />
                </button>
              </div>
            </div>
            <button
              class="p-1 rounded text-[var(--dock-icon)] hover:text-[var(--dock-accent)] transition-colors"
              :title="__('Add a tag')"
              @click.stop="startAddTag(note.name)"
            >
              <Tag class="w-3.5 h-3.5" />
            </button>
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

        <!-- Tags -->
        <div
          v-if="note.tags.length || addingTagFor === note.name"
          class="flex flex-wrap items-center gap-1.5 mt-2"
        >
          <span
            v-for="tag in note.tags"
            :key="tag"
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]
                   text-[var(--dock-accent)]"
            :style="{ background: 'color-mix(in srgb, var(--dock-accent, #6366f1) 10%, transparent)' }"
          >
            #{{ tag }}
            <button
              class="hover:text-red-500 transition-colors"
              :aria-label="__('Remove tag') + ': ' + tag"
              @click="removeTag(note.name, tag)"
            >
              <X class="w-2.5 h-2.5" />
            </button>
          </span>
          <input
            v-if="addingTagFor === note.name"
            v-model="tagInput"
            class="w-20 px-1.5 py-0.5 rounded-full text-[10px] border border-[var(--dock-border)]
                   bg-transparent text-[var(--dock-text)] outline-none"
            :placeholder="__('Add a tag')"
            autofocus
            @keydown="onTagKeydown($event, note.name)"
            @blur="cancelAddTag"
          />
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

<style>
/* Tiptap editor styles — unscoped so they apply inside the editor content */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: var(--dock-icon);
  opacity: 0.4;
  pointer-events: none;
  height: 0;
}

.ProseMirror:focus {
  outline: none;
}

.ProseMirror img {
  max-width: 100%;
  border-radius: 0.375rem;
  margin: 0.5rem 0;
}

.ProseMirror ul[data-type="taskList"] {
  list-style: none;
  padding-left: 0;
}

.ProseMirror ul[data-type="taskList"] li {
  display: flex;
  align-items: flex-start;
  gap: 0.375rem;
}

.ProseMirror ul[data-type="taskList"] li label input[type="checkbox"] {
  margin-top: 0.25rem;
}
</style>
