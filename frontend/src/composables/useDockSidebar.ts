// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// Reusable sidebar state composable for domain apps.
// Exported from dock-navbar.esm.js alongside DockSidebarShell.
//
// Usage:
//   import { useDockSidebar } from '/assets/dock/js/dock-navbar.esm.js'
//   const { collapsed, mobileOpen, toggle, closeMobile } = useDockSidebar('home-sidebar-collapsed')

import { ref, type Ref } from 'vue'

export interface UseDockSidebarReturn {
  collapsed: Ref<boolean>
  mobileOpen: Ref<boolean>
  toggle: () => void
  closeMobile: () => void
  isMobile: () => boolean
}

// Cache per storage key — singleton state per app
const instances = new Map<string, UseDockSidebarReturn>()

export function useDockSidebar(storageKey: string = 'dock-shell-sidebar-collapsed'): UseDockSidebarReturn {
  const existing = instances.get(storageKey)
  if (existing) return existing

  const collapsed = ref<boolean>(localStorage.getItem(storageKey) === 'true')
  const mobileOpen = ref<boolean>(false)

  function isMobile(): boolean {
    return window.innerWidth <= 576
  }

  function toggle(): void {
    if (isMobile()) {
      mobileOpen.value = !mobileOpen.value
    } else {
      collapsed.value = !collapsed.value
      localStorage.setItem(storageKey, String(collapsed.value))
    }
  }

  function closeMobile(): void {
    mobileOpen.value = false
  }

  const instance: UseDockSidebarReturn = { collapsed, mobileOpen, toggle, closeMobile, isMobile }
  instances.set(storageKey, instance)
  return instance
}
