<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Single bookmark tile — 4px top border in app color (derived from registered_apps,
  never stored in DB), label (2 lines), muted section, × to remove (hover),
  drag handle when editMode=true.
-->
<script lang="ts">
export default { name: 'DockBookmarkTile' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { X, GripVertical } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useDockBoot } from '@/composables/useDockBoot'
import type { Bookmark } from '@/composables/useBookmarks'

const props = defineProps<{
  bookmark: Bookmark
  editMode: boolean
}>()
const emit = defineEmits<{
  remove: [name: string]
  navigate: [route: string]
}>()

// Derive color from registered_apps at render time — color is NOT stored in DB
const { registeredApps } = useDockBoot()
const appColor = computed(() => {
  const reg = (registeredApps.value as Array<{ app: string; color?: string }>)
    .find(a => a.app === props.bookmark.app)
  return reg?.color ?? 'var(--dock-accent)'
})

function routeFor(b: Bookmark): string {
  return `/${b.app}/${b.doctype}/${encodeURIComponent(b.docname)}`
}
</script>

<template>
  <div
    role="link"
    :aria-label="`${bookmark.label} (${bookmark.doctype})`"
    :title="bookmark.label"
    class="relative group rounded-lg border border-[var(--dock-border)] bg-[var(--dock-bg)]
           overflow-hidden cursor-pointer hover:shadow-sm transition-shadow"
    style="border-top-width: 4px"
    :style="{ borderTopColor: appColor }"
    @click="!editMode && emit('navigate', routeFor(bookmark))"
  >
    <!-- Drag handle (edit mode only) -->
    <GripVertical
      v-if="editMode"
      role="button"
      :aria-label="__('Drag to reorder {0}').replace('{0}', bookmark.label)"
      class="dock-drag-handle absolute left-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--dock-icon)] cursor-grab"
    />

    <div class="px-3 py-2" :class="editMode && 'pl-6'">
      <!-- Label (2-line clamp) -->
      <div class="text-xs font-medium text-[var(--dock-text)] leading-snug line-clamp-2">
        {{ bookmark.label }}
      </div>
      <!-- Section (doctype) -->
      <div class="text-[10px] text-[var(--dock-icon)] mt-0.5 truncate">
        {{ bookmark.doctype }}
      </div>
    </div>

    <!-- Remove button -->
    <button
      class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity
             text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
      :aria-label="__('Remove bookmark')"
      @click.stop="emit('remove', bookmark.name)"
    >
      <X class="w-3 h-3" />
    </button>
  </div>
</template>
