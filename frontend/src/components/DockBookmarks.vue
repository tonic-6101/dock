<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  "Bookmarks" section shown above the app grid in DockAppsPanel.
  Compact single-column list, limited to 5 most recent.
  Hidden when the user has no bookmarks.
  "See all" link to full bookmarks page when there are more.
-->
<script lang="ts">
export default { name: 'DockBookmarks' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Bookmark as BookmarkIcon } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useBookmarks, type Bookmark } from '@/composables/useBookmarks'
import { useDockBoot } from '@/composables/useDockBoot'

const emit = defineEmits<{ close: [] }>()

const MAX_VISIBLE = 5

const { settings, registeredApps } = useDockBoot()
const { bookmarks } = useBookmarks()

const visibleBookmarks = computed(() => bookmarks.value.slice(0, MAX_VISIBLE))
const hasMore = computed(() => bookmarks.value.length > MAX_VISIBLE)

function appColor(bm: Bookmark): string {
  const reg = (registeredApps.value as Array<{ app: string; color?: string }>)
    .find(a => a.app === bm.app)
  return reg?.color ?? 'var(--dock-icon)'
}

function routeFor(bm: Bookmark): string {
  return `/${bm.app}/${bm.doctype}/${encodeURIComponent(bm.docname)}`
}

function navigate(bm: Bookmark) {
  window.location.href = routeFor(bm)
  emit('close')
}

const sectionLabelStyle = {
  fontSize: '0.6875rem',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  color: 'var(--dock-icon)',
  marginBottom: '0.5rem',
  paddingLeft: '0.25rem',
}
</script>

<template>
  <div v-if="bookmarks.length && settings?.enable_bookmarks !== false">
    <div :style="sectionLabelStyle">{{ __('Bookmarks') }}</div>

    <!-- Compact list -->
    <div class="flex flex-col">
      <a
        v-for="bm in visibleBookmarks"
        :key="bm.name"
        :href="routeFor(bm)"
        class="flex items-center gap-2.5 px-2 py-1 rounded-lg
               hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        style="height: 2rem"
        @click.prevent="navigate(bm)"
      >
        <!-- Color dot -->
        <span
          class="w-2 h-2 rounded-full flex-shrink-0"
          :style="{ background: appColor(bm) }"
        />
        <!-- Label -->
        <span class="text-sm text-[var(--dock-text)] truncate flex-1 leading-none">
          {{ bm.label }}
        </span>
        <!-- Doctype hint -->
        <span class="text-[10px] text-[var(--dock-icon)] flex-shrink-0">
          {{ bm.doctype }}
        </span>
      </a>
    </div>

    <!-- "See all" link when there are more -->
    <a
      v-if="hasMore"
      href="/dock/bookmarks"
      class="block text-xs text-[var(--dock-accent)] hover:underline mt-1 pl-2"
      @click="emit('close')"
    >
      {{ __('See all bookmarks') }}
    </a>

    <div class="mt-3 border-b border-[var(--dock-border)]" />
  </div>
</template>
