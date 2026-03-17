<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  "Pinned" section shown above the app grid in DockAppSwitcher.
  Hidden when the user has no bookmarks.
  Edit mode: ✎ → drag to reorder → "Done" → reorder() API call.
-->
<script lang="ts">
export default { name: 'DockBookmarks' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Pencil } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useBookmarks } from '@/composables/useBookmarks'
import { useDockBoot } from '@/composables/useDockBoot'
import DockBookmarkTile from './DockBookmarkTile.vue'

const emit = defineEmits<{ close: [] }>()

const { settings } = useDockBoot()
const { bookmarks, removeBookmark, reorderBookmarks } = useBookmarks()
const editMode = ref(false)

// Drag-and-drop state
const dragIdx = ref<number | null>(null)

function onDragStart(idx: number) { dragIdx.value = idx }
function onDragOver(e: DragEvent, idx: number) {
  e.preventDefault()
  if (dragIdx.value === null || dragIdx.value === idx) return
  const moved = bookmarks.value.splice(dragIdx.value, 1)[0]
  bookmarks.value.splice(idx, 0, moved)
  dragIdx.value = idx
}
function onDrop() {
  dragIdx.value = null
  reorderBookmarks(bookmarks.value.map(b => b.name))
}

function finishEdit() {
  editMode.value = false
}

function navigate(route: string) {
  window.location.href = route
  emit('close')
}
</script>

<template>
  <div v-if="bookmarks.length && settings?.enable_bookmarks !== false" class="px-4 pt-3 pb-2">
    <!-- Header -->
    <div class="flex items-center justify-between mb-2">
      <span class="text-[10px] font-semibold uppercase tracking-wider text-[var(--dock-icon)]">
        {{ __('Pinned') }}
      </span>
      <button
        class="text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
        :aria-label="__('Edit bookmarks')"
        :aria-pressed="editMode"
        @click="editMode ? finishEdit() : (editMode = true)"
      >
        <span v-if="editMode" class="text-[10px] font-semibold">{{ __('Done') }}</span>
        <Pencil v-else class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-3 gap-2">
      <DockBookmarkTile
        v-for="(bm, idx) in bookmarks"
        :key="bm.name"
        :bookmark="bm"
        :edit-mode="editMode"
        :draggable="editMode"
        @dragstart="onDragStart(idx)"
        @dragover="(e: DragEvent) => onDragOver(e, idx)"
        @drop="onDrop"
        @remove="removeBookmark"
        @navigate="navigate"
      />
    </div>

    <div class="mt-2 border-b border-[var(--dock-border)]" />
  </div>
</template>
