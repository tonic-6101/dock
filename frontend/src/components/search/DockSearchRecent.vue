<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Shows recent items when the search query is empty (< 2 chars).
  Seeded from boot — no API call needed.
-->
<script lang="ts">
export default { name: 'DockSearchRecent' }
</script>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useRecentItems } from '@/composables/useRecentItems'
import { useDockBoot } from '@/composables/useDockBoot'
import { computed } from 'vue'

const emit = defineEmits<{ navigate: [route: string] }>()

const { items, removeItem } = useRecentItems()
const { registeredApps } = useDockBoot()

const appColorMap = computed(() => {
  const map: Record<string, string> = {}
  for (const a of (registeredApps.value as Array<{ app: string; color?: string }>) ?? []) {
    if (a.color) map[a.app] = a.color
  }
  return map
})

function routeFor(item: { app: string; doctype: string; docname: string }): string {
  return `/${item.app}/${item.doctype}/${encodeURIComponent(item.docname)}`
}
</script>

<template>
  <div v-if="items.length" class="py-1">
    <div class="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--dock-icon)]">
      {{ __('Recent') }}
    </div>
    <div
      v-for="item in items"
      :key="item.name"
      class="group flex items-center gap-2.5 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
      @click="emit('navigate', routeFor(item))"
    >
      <!-- Colored dot -->
      <span
        class="w-2 h-2 rounded-full shrink-0"
        :style="{ background: appColorMap[item.app] ?? 'var(--dock-accent)' }"
      />
      <!-- Label + section -->
      <div class="flex-1 min-w-0">
        <div class="text-sm text-[var(--dock-text)] truncate">{{ item.label }}</div>
        <div class="text-[11px] text-[var(--dock-icon)] truncate">{{ item.doctype }}</div>
      </div>
      <!-- Remove button (hover only) -->
      <button
        class="opacity-0 group-hover:opacity-100 text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-opacity"
        :aria-label="__('Remove from recent')"
        @click.stop="removeItem(item.name)"
      >
        <X class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
  <div v-else class="px-4 py-3 text-xs text-[var(--dock-icon)]">
    {{ __('No recent items yet') }}
  </div>
</template>
