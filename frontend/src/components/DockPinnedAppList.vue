<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Compact single-column list of pinned apps shown at the top of the Apps panel.
  20px icons, 32px rows — denser and more scannable than a grid for 3-6 items.
-->
<script lang="ts">
export default { name: 'DockPinnedAppList' }
</script>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { MoreVertical, Pin } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import type { AppEntry } from '@/types/apps'

const props = defineProps<{
  apps: AppEntry[]
}>()

const emit = defineEmits<{
  navigate: [app: AppEntry]
  unpin: [appName: string]
}>()

const currentPath = ref(window.location.pathname)
const menuOpen = ref<string | null>(null)
const brokenIcons: Record<string, boolean> = reactive({})

function isActive(app: AppEntry): boolean {
  if (app.route === '/app') return false
  return currentPath.value.startsWith(app.route)
}

function navigateTo(app: AppEntry) {
  document.documentElement.style.setProperty('--dock-accent', app.color || '')
  emit('navigate', app)
}

function toggleMenu(app: string) {
  menuOpen.value = menuOpen.value === app ? null : app
}

function handleUnpin(app: string) {
  menuOpen.value = null
  emit('unpin', app)
}

/** Deterministic color from app name */
function fallbackColor(app: AppEntry): string {
  if (app.color) return app.color
  const palette = ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6']
  let hash = 0
  for (let i = 0; i < app.app.length; i++) hash = ((hash << 5) - hash + app.app.charCodeAt(i)) | 0
  return palette[Math.abs(hash) % palette.length]
}
</script>

<template>
  <div role="listbox" :aria-label="__('Pinned apps')" class="flex flex-col">
    <div
      v-for="app in apps"
      :key="app.app"
      role="option"
      :aria-selected="isActive(app)"
      class="group relative flex items-center gap-2.5 px-2 rounded-lg cursor-pointer
             hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      :class="isActive(app) ? 'bg-black/5 dark:bg-white/10' : ''"
      :style="{
        height: '2rem',
        borderLeft: isActive(app) ? `2px solid ${app.color || 'var(--dock-accent)'}` : '2px solid transparent',
      }"
    >
      <!-- Icon (20px) -->
      <span class="w-5 h-5 flex items-center justify-center flex-shrink-0">
        <img
          v-if="app.icon && !brokenIcons[app.app]"
          :src="app.icon"
          :alt="app.label"
          class="w-full h-full object-contain rounded"
          @error="brokenIcons[app.app] = true"
        />
        <svg v-else viewBox="0 0 20 20" class="w-full h-full">
          <rect width="20" height="20" rx="4" :fill="fallbackColor(app)" />
          <text
            x="10" y="10" text-anchor="middle" dominant-baseline="central"
            fill="white" font-size="10" font-weight="700"
            font-family="system-ui, -apple-system, sans-serif"
          >{{ app.label[0] }}</text>
        </svg>
      </span>

      <!-- Label (clickable area) -->
      <a
        :href="app.route"
        class="flex-1 text-sm text-[var(--dock-text)] truncate leading-none"
        @click.prevent="navigateTo(app)"
      >
        {{ app.label }}
      </a>

      <!-- Overflow menu -->
      <button
        class="flex items-center justify-center w-5 h-5 rounded opacity-0 group-hover:opacity-100
               transition-opacity text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
        :aria-label="__('More options')"
        @click.stop="toggleMenu(app.app)"
      >
        <MoreVertical class="w-3.5 h-3.5" />
      </button>

      <!-- Dropdown menu -->
      <div
        v-if="menuOpen === app.app"
        class="absolute right-0 top-full mt-1 z-50 bg-[var(--dock-bg)] border border-[var(--dock-border)]
               rounded-lg shadow-lg py-1 min-w-[8rem]"
      >
        <button
          class="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-[var(--dock-text)]
                 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          @click="handleUnpin(app.app)"
        >
          <Pin class="w-3.5 h-3.5" />
          {{ __('Unpin') }}
        </button>
        <a
          :href="app.route"
          target="_blank"
          class="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-[var(--dock-text)]
                 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          @click="menuOpen = null"
        >
          {{ __('Open in new tab') }}
        </a>
      </div>
    </div>
  </div>
</template>
