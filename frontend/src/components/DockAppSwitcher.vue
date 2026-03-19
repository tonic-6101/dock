<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockAppSwitcher' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Grip } from 'lucide-vue-next'
import { useDockBoot } from '@/composables/useDockBoot'
import { useDropdownExclusion } from '@/composables/useDropdownExclusion'
import { __ } from '@/composables/useTranslate'
import DockBookmarks from './DockBookmarks.vue'

const { registeredApps } = useDockBoot()

const triggerRef = ref<HTMLButtonElement | null>(null)
const rootRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const currentPath = ref(window.location.pathname)

const { open, toggle, close } = useDropdownExclusion('switcher', triggerRef)

type App = { app: string; label: string; icon?: string; color: string; route: string }

const isSystemManager = computed(() => {
  const deskRoles = ((window as any).frappe?.boot?.user?.roles ?? []) as string[]
  return deskRoles.includes('System Manager')
})

const ctaLabel = computed(() =>
  isSystemManager.value ? __('Install apps →') : __('Browse all apps →')
)

// Build rows of 3 for WAI-ARIA grid pattern
const appRows = computed(() => {
  const apps = registeredApps.value as App[]
  const rows: App[][] = []
  for (let i = 0; i < apps.length; i += 3) rows.push(apps.slice(i, i + 3))
  return rows
})

function isActive(app: App): boolean {
  return currentPath.value.startsWith(app.route)
}

function navigateTo(app: App) {
  document.documentElement.style.setProperty('--dock-accent', app.color)
  window.location.href = app.route
  close()
}

function onClickOutside(e: MouseEvent) {
  if (open.value && rootRef.value && !rootRef.value.contains(e.target as Node)) {
    close()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) close()
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

function onPopstate() {
  currentPath.value = window.location.pathname
}

onMounted(() => {
  // Use mousedown (not click) for outside detection to avoid race with the
  // button's @click handler — mousedown fires before click, so the dropdown
  // is already closed by the time the button's click would re-open it.
  document.addEventListener('mousedown', onClickOutside)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('popstate', onPopstate)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('popstate', onPopstate)
})
</script>

<template>
  <div ref="rootRef" class="dock-app-switcher relative">
    <!-- Trigger button -->
    <button
      ref="triggerRef"
      class="flex items-center justify-center w-8 h-8 rounded-md
             text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      :aria-expanded="open"
      aria-haspopup="true"
      :aria-label="__('Open app switcher')"
      :title="__('App switcher')"
      @click.stop="toggle"
    >
      <Grip class="w-4 h-4" />
    </button>

    <!-- Mobile backdrop -->
    <Transition name="dock-backdrop">
      <div
        v-if="open"
        class="fixed inset-0 bg-black/20 z-30 sm:hidden"
        aria-hidden="true"
        @click="close"
      />
    </Transition>

    <!-- Panel: inline styles for positioning to prevent cross-bundle Tailwind cascade conflicts -->
    <div
      v-if="open"
      role="dialog"
      aria-label="App switcher"
      class="dock-switcher-panel max-h-[420px] overflow-y-auto
             bg-[var(--dock-bg)] border border-[var(--dock-border)] shadow-lg p-3"
      :style="{
        position: 'absolute',
        right: '0',
        top: '100%',
        marginTop: '0.5rem',
        width: '18rem',
        borderRadius: '0.5rem',
        zIndex: 9999,
      }"
    >
        <!-- Mobile drag handle -->
        <div class="flex justify-center mb-3 sm:hidden">
          <div class="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>

        <!-- dock_pro injects <DockSitesSwitcher /> here -->
        <slot name="panel-top" />

        <!-- Pinned bookmarks (hidden when empty) -->
        <DockBookmarks @close="close" />

        <!-- App grid: registered domain apps -->
        <div
          ref="gridRef"
          role="grid"
          aria-label="Apps"
          class="grid grid-cols-3 gap-2 mb-3"
          @keydown="onGridKeydown"
        >
          <!-- Dynamic: registered domain apps -->
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
                :class="{ 'ring-2 ring-[var(--dock-accent)]': isActive(app) }"
                @click.prevent="navigateTo(app)"
              >
                <span
                  class="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
                  :class="!app.icon ? 'text-white text-xl font-bold' : ''"
                  :style="!app.icon ? { backgroundColor: app.color } : {}"
                >
                  <img
                    v-if="app.icon"
                    :src="app.icon"
                    :alt="app.label"
                    class="w-full h-full object-contain"
                  />
                  <template v-else>{{ app.label[0] }}</template>
                </span>
                <span class="text-xs text-[var(--dock-text)] truncate w-full leading-tight">
                  {{ app.label }}
                </span>
              </a>
            </div>
          </template>

          <!-- Empty slot filler when no domain apps (show discover hint below grid) -->
        </div>

        <div v-if="(registeredApps as App[]).length === 0" class="flex flex-col items-center gap-3 py-8 text-center">
          <Grip class="w-8 h-8 text-[var(--dock-icon)] opacity-40" />
          <p class="text-sm text-[var(--dock-icon)]">{{ __('Discover ecosystem apps') }}</p>
        </div>

        <!-- Footer -->
        <div class="border-t border-[var(--dock-border)] pt-2 mt-1 space-y-0.5">
          <a
            href="/dock/apps"
            class="flex items-center justify-between px-2 py-1.5 rounded-lg
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors
                   text-sm font-medium text-[var(--dock-accent)]"
          >
            {{ ctaLabel }}
          </a>
          <a
            href="/app"
            class="flex items-center gap-2 px-2 py-1.5 rounded-lg
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors
                   text-sm text-[var(--dock-icon)]"
          >
            <img :src="'/assets/frappe/images/frappe-framework-logo.svg'" alt="Frappe" class="w-4 h-4" />
            {{ __('Frappe Desk') }}
          </a>
        </div>
      </div>
  </div>
</template>

<style scoped>
/* Desktop popover: 150ms ease-out fade + 6px translateY */
.dock-switcher-enter-active {
  transition: opacity 150ms ease-out, transform 150ms ease-out;
}
.dock-switcher-leave-active {
  transition: opacity 100ms ease-in;
}
.dock-switcher-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.dock-switcher-leave-to {
  opacity: 0;
}

/* Mobile: slide up from bottom */
@media (max-width: 639px) {
  .dock-switcher-enter-from {
    opacity: 0;
    transform: translateY(100%);
  }
  .dock-switcher-enter-active {
    transition: opacity 200ms ease-out, transform 200ms ease-out;
  }
  .dock-switcher-leave-active {
    transition: opacity 150ms ease-in, transform 150ms ease-in;
  }
  .dock-switcher-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
}

/* Backdrop */
.dock-backdrop-enter-active { transition: opacity 150ms ease-out; }
.dock-backdrop-leave-active { transition: opacity 100ms ease-in; }
.dock-backdrop-enter-from,
.dock-backdrop-leave-to { opacity: 0; }

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .dock-switcher-enter-active,
  .dock-switcher-leave-active,
  .dock-backdrop-enter-active,
  .dock-backdrop-leave-active {
    transition-duration: 100ms;
  }
  .dock-switcher-enter-from,
  .dock-switcher-leave-to {
    transform: none;
  }
}
</style>
