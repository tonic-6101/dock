<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  3-column app tile grid with WAI-ARIA grid pattern keyboard navigation.
  Extracted from DockAppSwitcher — used in DockAppsPanel for both
  "Apps" and "More apps" sections.
-->
<script lang="ts">
export default { name: 'DockAppGrid' }
</script>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { __ } from '@/composables/useTranslate'
import type { AppEntry } from '@/types/apps'

const props = defineProps<{
  apps: AppEntry[]
}>()

const emit = defineEmits<{
  navigate: [app: AppEntry]
}>()

const gridRef = ref<HTMLElement | null>(null)
const currentPath = ref(window.location.pathname)
const brokenIcons: Record<string, boolean> = reactive({})

const appRows = computed(() => {
  const rows: AppEntry[][] = []
  for (let i = 0; i < props.apps.length; i += 3) rows.push(props.apps.slice(i, i + 3))
  return rows
})

function isActive(app: AppEntry): boolean {
  if (app.route === '/app') return false
  return currentPath.value.startsWith(app.route)
}

function navigateTo(app: AppEntry) {
  document.documentElement.style.setProperty('--dock-accent', app.color || '')
  emit('navigate', app)
}

/** Deterministic color from app name for Tier 3 squircles */
function fallbackColor(app: AppEntry): string {
  if (app.color) return app.color
  const palette = ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e', '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6']
  let hash = 0
  for (let i = 0; i < app.app.length; i++) hash = ((hash << 5) - hash + app.app.charCodeAt(i)) | 0
  return palette[Math.abs(hash) % palette.length]
}

// WAI-ARIA grid: 2D arrow key navigation
function onGridKeydown(e: KeyboardEvent) {
  if (!gridRef.value) return
  const cells = Array.from(gridRef.value.querySelectorAll<HTMLElement>('[role="gridcell"]'))
  const idx = cells.indexOf(e.target as HTMLElement)
  if (idx === -1) return

  const cols = 3
  let next = -1
  switch (e.key) {
    case 'ArrowRight': next = idx + 1 < cells.length ? idx + 1 : idx; break
    case 'ArrowLeft':  next = idx - 1 >= 0 ? idx - 1 : idx; break
    case 'ArrowDown':  next = idx + cols < cells.length ? idx + cols : idx; break
    case 'ArrowUp':    next = idx - cols >= 0 ? idx - cols : idx; break
    case 'Home':       next = 0; break
    case 'End':        next = cells.length - 1; break
    default: return
  }
  e.preventDefault()
  cells[next]?.focus()
}
</script>

<template>
  <div
    ref="gridRef"
    role="grid"
    :aria-label="__('Apps')"
    class="grid grid-cols-3 gap-2"
    @keydown="onGridKeydown"
  >
    <template v-for="(row, ri) in appRows" :key="ri">
      <div role="row" class="contents">
        <a
          v-for="app in row"
          :key="app.app"
          :href="app.route"
          role="gridcell"
          tabindex="0"
          :aria-label="app.label"
          :aria-current="isActive(app) ? 'true' : undefined"
          class="flex flex-col items-center gap-1.5 p-2 rounded-lg text-center
                 hover:bg-black/5 dark:hover:bg-white/10 transition-colors
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dock-accent)] focus-visible:ring-offset-1"
          :class="{
            'ring-2 ring-[var(--dock-accent)]': isActive(app),
            'opacity-70': app.tier === 'external' && !app.color && app.route === '/app',
          }"
          :title="app.tier === 'external' && app.route === '/app' ? __('This app hasn\'t registered with Dock') : undefined"
          @click.prevent="navigateTo(app)"
        >
          <span class="w-12 h-12 flex items-center justify-center flex-shrink-0">
            <img
              v-if="app.icon && !brokenIcons[app.app]"
              :src="app.icon"
              :alt="app.label"
              class="w-full h-full object-contain rounded-xl"
              @error="brokenIcons[app.app] = true"
            />
            <!-- Fallback: squircle with color + first letter -->
            <svg
              v-else
              viewBox="0 0 48 48"
              class="w-full h-full"
              :aria-label="app.label"
            >
              <rect
                width="48" height="48" rx="12"
                :fill="fallbackColor(app)"
              />
              <text
                x="24" y="24"
                text-anchor="middle"
                dominant-baseline="central"
                fill="white"
                font-size="22"
                font-weight="700"
                font-family="system-ui, -apple-system, sans-serif"
              >{{ app.label[0] }}</text>
            </svg>
          </span>
          <span class="text-xs text-[var(--dock-text)] truncate w-full leading-tight">
            {{ app.label }}
          </span>
        </a>
      </div>
    </template>
  </div>
</template>
