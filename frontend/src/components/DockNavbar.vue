<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Main top bar component — exported for dynamic import by domain apps.
  Slot order (fixed): SidebarToggle | AppLabel | Search | Timer | Bell | Jana | AppSwitcher | Avatar
-->
<script lang="ts">
export default { name: 'DockNavbar' }
</script>

<script setup lang="ts">
import { defineAsyncComponent, onErrorCaptured, onMounted, onUnmounted, ref } from 'vue'
import DockFallbackBar from './DockFallbackBar.vue'
import DockPinButton from './DockPinButton.vue'
import { useDockBoot } from '@/composables/useDockBoot'
import { useRecentItems } from '@/composables/useRecentItems'
import { useBookmarks } from '@/composables/useBookmarks'
import { useSidebar } from '@/composables/useSidebar'

const { toggle: dockToggle } = useSidebar()

// Dispatch CustomEvent so domain app sidebars (separate bundles) can react
function toggleSidebar() {
  dockToggle()
  window.dispatchEvent(new CustomEvent('dock:toggleSidebar'))
}

const crashed  = ref(false)
const scrolled = ref(false)
const currentPath = ref(window.location.pathname)

onErrorCaptured(() => {
  crashed.value = true
  return false
})

function onScroll() { scrolled.value = window.scrollY > 4 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// Inject per-app accent color from boot registry
const { registeredApps, dock } = useDockBoot()

// Seed singletons from boot data (idempotent — safe to call multiple times)
const { init: initRecent, trackItem } = useRecentItems()
const { init: initBookmarks } = useBookmarks()

onMounted(() => {
  initRecent(dock.value?.recent_items)
  initBookmarks(dock.value?.bookmarks)

  const path = window.location.pathname
  currentPath.value = path
  type App = { route: string; color?: string }
  const active = (registeredApps.value as App[]).find(a => path.startsWith(a.route))
  if (active?.color) {
    document.documentElement.style.setProperty('--dock-accent', active.color)
  }
})

// URL tracking — intercept pushState + popstate
function handleNavigation() {
  const path = window.location.pathname
  currentPath.value = path

  // Track /{app}/{doctype}/{name} visits
  const match = path.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/)
  if (match) {
    const [, app, doctype, docname] = match
    // Skip Dock internal pages and Frappe system pages (user profiles, etc.)
    if (app !== 'dock' && !(app === 'app' && doctype === 'user')) {
      // Find app label from registry
      type RegApp = { app: string; label: string; color?: string }
      const regApp = (registeredApps.value as RegApp[]).find(a => a.app === app)
      trackItem({
        app,
        doctype,
        docname: decodeURIComponent(docname),
        label: decodeURIComponent(docname),
        icon: regApp?.color ? '' : '',
      })
    }
  }
}

// Patch pushState to fire navigation tracking
function onTrackVisit(e: Event) {
  const detail = (e as CustomEvent).detail
  if (detail) trackItem(detail)
}

onMounted(() => {
  const orig = history.pushState.bind(history)
  ;(history as any).__dockPushState = orig
  history.pushState = function (...args) {
    orig(...args)
    handleNavigation()
  }
  window.addEventListener('popstate', handleNavigation)
  window.addEventListener('dock:trackVisit', onTrackVisit)
})

onUnmounted(() => {
  if ((history as any).__dockPushState) {
    history.pushState = (history as any).__dockPushState
    delete (history as any).__dockPushState
  }
  window.removeEventListener('popstate', handleNavigation)
  window.removeEventListener('dock:trackVisit', onTrackVisit)
})

// Jana is a soft dependency
const janaInstalled = (window as any).frappe?.boot?.installed_apps?.includes('jana')
  ?? (window as any).dockBoot?.installed_apps?.includes('jana')
  ?? false

const DockSidebarToggle   = defineAsyncComponent(() => import('./DockSidebarToggle.vue'))
const DockAppLabel        = defineAsyncComponent(() => import('./DockAppLabel.vue'))
const DockSearch          = defineAsyncComponent(() => import('./DockSearch.vue'))
const DockTimer           = defineAsyncComponent(() => import('./DockTimer.vue'))
const DockTimerStaleWarning = defineAsyncComponent(() => import('./DockTimerStaleWarning.vue'))
const DockCalendarIcon    = defineAsyncComponent(() => import('./DockCalendarIcon.vue'))
const DockPeopleIcon      = defineAsyncComponent(() => import('./DockPeopleIcon.vue'))
const DockBell            = defineAsyncComponent(() => import('./DockBell.vue'))
const DockJana            = defineAsyncComponent(() => import('./DockJana.vue'))
const DockAppSwitcher     = defineAsyncComponent(() => import('./DockAppSwitcher.vue'))
const DockAvatar          = defineAsyncComponent(() => import('./DockAvatar.vue'))
</script>

<template>
  <DockFallbackBar v-if="crashed" />

  <header
    v-else
    role="banner"
    class="dock-navbar h-14 sticky top-0 z-50 flex items-center gap-2 px-4 select-none
           bg-[var(--dock-bg)] text-[var(--dock-text)] transition-shadow duration-150"
    :class="scrolled ? 'shadow-sm' : 'border-b border-[var(--dock-border)] border-opacity-50'"
  >
    <!-- Sidebar toggle -->
    <DockSidebarToggle class="flex-shrink-0" @toggle="toggleSidebar" />

    <!-- App label -->
    <DockAppLabel :current-path="currentPath" />

    <!-- Centre: search -->
    <div class="flex-1 flex justify-center px-4">
      <DockSearch />
    </div>

    <!-- Right: action cluster -->
    <div class="flex items-center gap-1 flex-shrink-0">
      <DockPinButton :current-path="currentPath" />
      <DockTimer />
      <DockCalendarIcon />
      <DockPeopleIcon />
      <DockBell />
      <DockJana v-if="janaInstalled" />
      <DockAppSwitcher />
      <DockAvatar />
    </div>
  </header>

  <!-- Stale timer warning — full-width banner below the top bar, only when needed -->
  <DockTimerStaleWarning v-if="!crashed" />
</template>
