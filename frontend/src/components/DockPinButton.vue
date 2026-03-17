<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Pin / unpin button shown in the navbar on /{app}/{doctype}/{name} URLs.
  Filled = already bookmarked; outline = not yet bookmarked.
  Hidden on list pages, settings pages, and /dock/* routes.
  Disabled when the bookmark limit (12) is reached.
-->
<script lang="ts">
export default { name: 'DockPinButton' }
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Bookmark, BookmarkCheck } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useBookmarks } from '@/composables/useBookmarks'
import { useRecentItems } from '@/composables/useRecentItems'
import { useDockBoot } from '@/composables/useDockBoot'

interface ParsedRoute {
  app: string
  doctype: string
  docname: string
}

const props = defineProps<{ currentPath: string }>()

const { settings } = useDockBoot()
const { atLimit, isBookmarked, addBookmark, removeBookmark } = useBookmarks()
const { items: recentItems } = useRecentItems()

const parsed = computed<ParsedRoute | null>(() => {
  const match = props.currentPath.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/)
  if (!match) return null
  const [, app, doctype, docname] = match
  // Skip /dock/* and obviously non-record paths
  if (app === 'dock') return null
  return { app, doctype, docname: decodeURIComponent(docname) }
})

const visible = computed(() => parsed.value !== null && settings.value?.enable_bookmarks !== false)

const bookmarkName = computed(() => {
  if (!parsed.value) return null
  return isBookmarked(parsed.value.app, parsed.value.doctype, parsed.value.docname)
})

const isPinned = computed(() => bookmarkName.value !== null)
const loading = ref(false)

async function toggle() {
  if (!parsed.value) return
  loading.value = true
  try {
    if (isPinned.value && bookmarkName.value) {
      removeBookmark(bookmarkName.value)
    } else {
      // Prefer human label from recent items (set by dock:trackVisit); fall back to docname
      const recent = recentItems.value.find(
        r => r.app === parsed.value!.app
          && r.doctype === parsed.value!.doctype
          && r.docname === parsed.value!.docname,
      )
      await addBookmark({
        app: parsed.value.app,
        doctype: parsed.value.doctype,
        docname: parsed.value.docname,
        label: recent?.label ?? parsed.value.docname,
        icon: recent?.icon ?? '',
      })
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <button
    v-if="visible"
    class="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
    :class="[
      isPinned
        ? 'text-[var(--dock-accent)]'
        : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10',
      (atLimit && !isPinned) && 'opacity-40 cursor-not-allowed',
    ]"
    :aria-label="isPinned ? __('Remove bookmark') : __('Bookmark this record')"
    :disabled="loading || (atLimit && !isPinned)"
    :title="atLimit && !isPinned ? __('Bookmark limit reached (12). Remove a bookmark to add another.') : undefined"
    @click="toggle"
  >
    <BookmarkCheck v-if="isPinned" class="w-4 h-4" />
    <Bookmark v-else class="w-4 h-4" />
  </button>
</template>
