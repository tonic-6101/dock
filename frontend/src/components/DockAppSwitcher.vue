<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockAppSwitcher' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Grid3x3 } from 'lucide-vue-next'
import { useDockBoot } from '@/composables/useDockBoot'
import { __ } from '@/composables/useTranslate'
import DockBookmarks from './DockBookmarks.vue'

const { registeredApps } = useDockBoot()
const open = ref(false)
</script>

<template>
  <div class="dock-app-switcher relative">
    <button
      class="flex items-center justify-center w-8 h-8 rounded-md
             text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      :aria-expanded="open"
      aria-haspopup="true"
      aria-label="App switcher"
      title="App switcher"
      @click="open = !open"
    >
      <Grid3x3 class="w-4 h-4" />
    </button>

    <div
      v-if="open"
      class="absolute right-0 top-full mt-2 w-72 bg-[var(--dock-bg)] border border-[var(--dock-border)]
             rounded-lg shadow-lg p-3 z-20"
      role="menu"
    >
      <!-- Pinned bookmarks (hidden when empty) -->
      <DockBookmarks @close="open = false" />

      <div class="grid grid-cols-3 gap-2 mb-3">
        <a
          v-for="app in registeredApps"
          :key="app.app"
          :href="app.route"
          role="menuitem"
          class="flex flex-col items-center gap-1.5 p-2 rounded-lg
                 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-center"
        >
          <span
            class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold"
            :style="{ backgroundColor: app.color }"
          >
            {{ app.label[0] }}
          </span>
          <span class="text-xs text-[var(--dock-text)] truncate w-full text-center">
            {{ app.label }}
          </span>
        </a>
      </div>

      <div class="border-t border-[var(--dock-border)] pt-2">
        <a
          href="/app"
          role="menuitem"
          class="flex items-center gap-2 px-2 py-1.5 rounded-lg
                 hover:bg-black/5 dark:hover:bg-white/10 transition-colors
                 text-sm text-[var(--dock-icon)]"
        >
          <Grid3x3 class="w-4 h-4" />
          {{ __('Frappe Desk') }}
        </a>
      </div>
    </div>
  </div>
</template>
