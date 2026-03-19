<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockBookmarksPage' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Pencil, Bookmark } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useBookmarks } from '@/composables/useBookmarks'
import DockBookmarkTile from '@/components/DockBookmarkTile.vue'

const { bookmarks, removeBookmark, reorderBookmarks } = useBookmarks()
const editMode = ref(false)

// Drag state
const dragIdx = ref<number | null>(null)

function onDragStart(idx: number) { dragIdx.value = idx }
function onDragOver(e: DragEvent, idx: number) {
  e.preventDefault()
  if (dragIdx.value === null || dragIdx.value === idx) return
  const items = [...bookmarks.value]
  const [moved] = items.splice(dragIdx.value, 1)
  items.splice(idx, 0, moved)
  bookmarks.value = items
  dragIdx.value = idx
}
function onDragEnd() {
  if (dragIdx.value !== null) {
    reorderBookmarks(bookmarks.value.map(b => b.name))
  }
  dragIdx.value = null
}

function navigate(route: string) {
  window.location.href = route
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <Bookmark class="w-6 h-6 text-[var(--dock-icon)]" />
        <h1 class="text-xl font-semibold text-[var(--dock-text)]">{{ __('Bookmarks') }}</h1>
        <span
          v-if="bookmarks.length"
          class="text-xs text-[var(--dock-icon)] bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full"
        >
          {{ bookmarks.length }}
        </span>
      </div>
      <button
        v-if="bookmarks.length"
        class="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors"
        :class="editMode
          ? 'bg-[var(--dock-accent)] text-white'
          : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
        @click="editMode = !editMode"
      >
        <Pencil class="w-3.5 h-3.5" />
        {{ editMode ? __('Done') : __('Edit') }}
      </button>
    </div>

    <!-- Empty state -->
    <div
      v-if="!bookmarks.length"
      class="text-center py-16 text-[var(--dock-icon)]"
    >
      <Bookmark class="w-10 h-10 mx-auto mb-3 opacity-40" />
      <p class="text-sm">{{ __('No bookmarks yet') }}</p>
      <p class="text-xs mt-1">{{ __('Pin items from any app using the bookmark button in the top bar') }}</p>
    </div>

    <!-- Grid -->
    <div
      v-else
      class="dock-bookmarks-grid gap-3"
    >
      <div
        v-for="(bm, idx) in bookmarks"
        :key="bm.name"
        :draggable="editMode"
        @dragstart="onDragStart(idx)"
        @dragover="onDragOver($event, idx)"
        @dragend="onDragEnd"
      >
        <DockBookmarkTile
          :bookmark="bm"
          :edit-mode="editMode"
          @remove="removeBookmark"
          @navigate="navigate"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Responsive grid — plain CSS to avoid Tailwind cascade conflicts in consuming apps */
.dock-bookmarks-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (min-width: 640px) {
  .dock-bookmarks-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .dock-bookmarks-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
