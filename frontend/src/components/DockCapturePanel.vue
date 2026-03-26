<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Capture quick-add panel — create Repo Explorer Entries from anywhere.

  Opens from the Capture icon in the top bar. Lets you upload a photo
  or document without leaving the current page. Context is auto-detected
  from the URL when possible (e.g. Home property/room/item).
-->
<script lang="ts">
export default { name: 'DockCapturePanel' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Upload, CheckCircle, ExternalLink } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockPanels } from '@/composables/useDockPanels'
import DockPanelShell from './DockPanelShell.vue'

const { closePanel } = useDockPanels()

// ── State ──────────────────────────────────────────────

const file = ref<File | null>(null)
const objectName = ref('')
const capturePurpose = ref('')
const saving = ref(false)
const justCreated = ref<{ name: string; object_name: string } | null>(null)
const recentEntries = ref<Array<{ name: string; object_name: string; capture_purpose: string; captured_date: string }>>([])
const loadingRecent = ref(false)
const dragOver = ref(false)

const purposes = ['General', 'Condition', 'Damage', 'Renovation', 'Inspection', 'Receipt', 'Contract', 'Move-in', 'Move-out', 'Other']

// ── Context detection ──────────────────────────────────

interface CaptureContext {
  homeProperty?: string
  homeRoom?: string
  homeItem?: string
  objectName: string
}

const currentContext = computed<CaptureContext | null>(() => {
  const path = window.location.pathname

  if (!path.startsWith('/home')) return null

  const params = new URLSearchParams(window.location.search)
  const propFromQuery = params.get('property')

  const propEl = document.querySelector('[data-home-property]')
  const propFromDom = propEl?.getAttribute('data-home-property') || ''
  const propertyName = propFromQuery || propFromDom || ''

  if (!propertyName) return null

  const itemMatch = path.match(/^\/home\/items\/([^/]+)/)
  const roomMatch = path.match(/^\/home\/rooms\/([^/]+)/)

  const itemName = itemMatch ? decodeURIComponent(itemMatch[1]) : undefined
  const roomName = roomMatch ? decodeURIComponent(roomMatch[1]) : undefined

  // Build a meaningful object name from context
  let name = propertyName
  if (roomName) name += ` / ${roomName}`
  if (itemName) name += ` / ${itemName}`

  return {
    homeProperty: propertyName,
    homeRoom: roomName,
    homeItem: itemName,
    objectName: name,
  }
})

const contextLabel = computed(() => currentContext.value?.objectName ?? null)

// ── Load data ──────────────────────────────────────────

async function loadRecentEntries() {
  loadingRecent.value = true
  try {
    const result = await callApi<Array<{ name: string; object_name: string; capture_purpose: string; captured_date: string }>>(
      'frappe.client.get_list',
      {
        doctype: 'Explorer Entry',
        fields: JSON.stringify(['name', 'object_name', 'capture_purpose', 'captured_date']),
        filters: JSON.stringify({ deleted: 0 }),
        order_by: 'creation desc',
        limit_page_length: 5,
      }
    )
    recentEntries.value = result ?? []
  } catch {
    // Silently fail — panel still works for creation
  } finally {
    loadingRecent.value = false
  }
}

onMounted(() => {
  loadRecentEntries()
  // Pre-fill object name from context
  if (currentContext.value) {
    objectName.value = currentContext.value.objectName
  }
})

// ── Listen for dock:openCapture events from other apps ─

function onExternalCapture(e: Event) {
  const detail = (e as CustomEvent).detail
  if (detail?.home_property) {
    objectName.value = detail.home_property
    if (detail.home_room) objectName.value += ` / ${detail.home_room}`
    if (detail.home_item) objectName.value += ` / ${detail.home_item}`
  }
}

onMounted(() => window.addEventListener('dock:openCapture', onExternalCapture))
onUnmounted(() => window.removeEventListener('dock:openCapture', onExternalCapture))

// ── File handling ──────────────────────────────────────

function onFileInput(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    file.value = target.files[0]
  }
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  dragOver.value = false
  if (e.dataTransfer?.files?.length) {
    file.value = e.dataTransfer.files[0]
  }
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
  dragOver.value = true
}

function onDragLeave() {
  dragOver.value = false
}

function clearFile() {
  file.value = null
}

// ── Create capture ─────────────────────────────────────

const canCreate = computed(() => objectName.value.trim().length > 0 && !saving.value)

async function createCapture() {
  if (!canCreate.value) return

  saving.value = true
  justCreated.value = null

  try {
    // Determine object_type from context
    const ctx = currentContext.value
    let objectType = 'Other'
    if (ctx?.homeItem) objectType = 'Home Item'
    else if (ctx?.homeRoom) objectType = 'Home Room'
    else if (ctx?.homeProperty) objectType = 'Home Property'

    const data: Record<string, unknown> = {
      object_type: objectType,
      object_id: '',
      object_name: objectName.value.trim(),
    }

    if (capturePurpose.value) data.capture_purpose = capturePurpose.value

    // Home context custom fields
    if (ctx?.homeProperty) data.home_property = ctx.homeProperty
    if (ctx?.homeRoom) data.home_room = ctx.homeRoom
    if (ctx?.homeItem) data.home_item = ctx.homeItem

    const result = await callApi<{ explorer_entry_id: string }>(
      'repo.api.capture.upload',
      data,
    )

    justCreated.value = {
      name: result?.explorer_entry_id ?? '',
      object_name: objectName.value.trim(),
    }

    // Reset form
    objectName.value = currentContext.value?.objectName ?? ''
    capturePurpose.value = ''
    file.value = null

    loadRecentEntries()

    setTimeout(() => { justCreated.value = null }, 3000)
  } catch {
    // Error shown by Frappe's global error handler
  } finally {
    saving.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    createCapture()
  }
}
</script>

<template>
  <DockPanelShell
    :title="__('Capture')"
    link="/repo"
    :link-label="__('Open Repo')"
    :aria-label="__('Capture quick-add panel')"
    @close="closePanel"
  >
    <div :style="{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }">
      <!-- Context indicator -->
      <div v-if="contextLabel" :style="{ fontSize: '0.75rem', color: 'var(--dock-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }">
        {{ __('Property:') }}
        <strong>{{ contextLabel }}</strong>
      </div>

      <!-- File drop zone -->
      <div
        :style="{
          border: `2px dashed ${dragOver ? 'var(--dock-accent, #0d9488)' : 'var(--dock-border)'}`,
          borderRadius: '0.5rem',
          padding: '1rem',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? 'rgba(13, 148, 136, 0.05)' : 'transparent',
          transition: 'all 0.15s',
        }"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop"
        @click="($refs.fileInput as HTMLInputElement)?.click()"
      >
        <input
          ref="fileInput"
          type="file"
          accept="image/*,application/pdf,.doc,.docx"
          :style="{ display: 'none' }"
          @change="onFileInput"
        />
        <div v-if="file" :style="{ fontSize: '0.75rem', color: 'var(--dock-text)' }">
          <strong>{{ file.name }}</strong>
          <span :style="{ color: 'var(--dock-muted)', marginLeft: '0.25rem' }">
            ({{ (file.size / 1024).toFixed(0) }} KB)
          </span>
          <button
            :style="{ marginLeft: '0.5rem', color: 'var(--dock-muted)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }"
            @click.stop="clearFile"
          >{{ __('Remove') }}</button>
        </div>
        <div v-else :style="{ fontSize: '0.75rem', color: 'var(--dock-muted)' }">
          {{ __('Drop file here or click to upload') }}
        </div>
      </div>

      <!-- Object name -->
      <input
        v-model="objectName"
        type="text"
        :placeholder="__('What is this about?')"
        :style="{
          width: '100%',
          padding: '0.5rem 0.75rem',
          border: '1px solid var(--dock-border)',
          borderRadius: '0.375rem',
          background: 'var(--dock-bg)',
          color: 'var(--dock-text)',
          fontSize: '0.875rem',
          outline: 'none',
        }"
        @keydown="handleKeydown"
      />

      <!-- Purpose selector -->
      <select
        v-model="capturePurpose"
        :style="{
          width: '100%',
          padding: '0.375rem 0.5rem',
          border: '1px solid var(--dock-border)',
          borderRadius: '0.375rem',
          background: 'var(--dock-bg)',
          color: 'var(--dock-text)',
          fontSize: '0.75rem',
        }"
      >
        <option value="">{{ __('Purpose (optional)') }}</option>
        <option v-for="p in purposes" :key="p" :value="p">{{ __(p) }}</option>
      </select>

      <!-- Create button -->
      <button
        :disabled="!canCreate"
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.375rem',
          width: '100%',
          padding: '0.5rem',
          borderRadius: '0.375rem',
          border: 'none',
          background: canCreate ? 'var(--dock-accent, #0d9488)' : 'var(--dock-border)',
          color: canCreate ? '#fff' : 'var(--dock-muted)',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: canCreate ? 'pointer' : 'not-allowed',
          transition: 'opacity 0.15s',
        }"
        @click="createCapture"
      >
        <Upload :style="{ width: '1rem', height: '1rem' }" />
        {{ saving ? __('Capturing...') : __('Capture') }}
      </button>

      <!-- Success message -->
      <div
        v-if="justCreated"
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          background: 'rgba(13, 148, 136, 0.1)',
          color: '#0d9488',
          fontSize: '0.75rem',
        }"
      >
        <CheckCircle :style="{ width: '1rem', height: '1rem', flexShrink: '0' }" />
        <span :style="{ flex: '1' }">{{ justCreated.name }}</span>
        <a
          :href="'/repo'"
          :style="{ color: '#0d9488', display: 'flex' }"
          :title="__('Open in Repo')"
        >
          <ExternalLink :style="{ width: '0.875rem', height: '0.875rem' }" />
        </a>
      </div>

      <!-- Hint -->
      <div :style="{ fontSize: '0.625rem', color: 'var(--dock-muted)', textAlign: 'center' }">
        {{ __('Cmd+Enter to capture') }}
      </div>

      <!-- Divider -->
      <div :style="{ borderTop: '1px solid var(--dock-border)', margin: '0.25rem 0' }" />

      <!-- Recent entries -->
      <div :style="{ flex: '1', overflow: 'auto' }">
        <div :style="{ fontSize: '0.6875rem', fontWeight: '600', color: 'var(--dock-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }">
          {{ __('Recent captures') }}
        </div>

        <div v-if="loadingRecent" :style="{ fontSize: '0.75rem', color: 'var(--dock-muted)' }">
          {{ __('Loading...') }}
        </div>

        <div v-else-if="recentEntries.length === 0" :style="{ fontSize: '0.75rem', color: 'var(--dock-muted)' }">
          {{ __('No captures yet') }}
        </div>

        <div v-else :style="{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }">
          <div
            v-for="entry in recentEntries"
            :key="entry.name"
            :style="{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              color: 'var(--dock-text)',
              cursor: 'default',
            }"
          >
            <span :style="{ flex: '1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }">
              {{ entry.object_name }}
            </span>
            <span v-if="entry.capture_purpose" :style="{ fontSize: '0.625rem', color: 'var(--dock-muted)', flexShrink: '0' }">
              {{ entry.capture_purpose }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </DockPanelShell>
</template>
