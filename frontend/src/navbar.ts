// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// dock-navbar.esm.js entry — domain apps import components from this bundle.
//
// Usage in a domain app:
//   import { DockLayout, dockSharedRoutes } from '/assets/dock/js/dock-navbar.esm.js'
//
//   // Layout
//   <DockLayout>
//     <Sidebar />
//     <main class="flex-1 overflow-y-auto"><RouterView /></main>
//   </DockLayout>
//
//   // Router (renders People, Calendar, etc. inside the app's content area)
//   const routes = [...appRoutes, ...dockSharedRoutes('/orga')]

// Layout components
export { default as DockNavbar }       from './components/DockNavbar.vue'
export { default as DockLayout }       from './components/DockLayout.vue'
export { default as DockSidebarShell } from './components/DockSidebarShell.vue'
export { default as DockShareButton }      from './components/share/DockShareButton.vue'
export { default as DockGuestShareButton } from './components/guest/DockGuestShareButton.vue'

// Composables
export { useDockSidebar } from './composables/useDockSidebar'
export type { UseDockSidebarReturn } from './composables/useDockSidebar'
export { useDockPanels } from './composables/useDockPanels'

// Shared page route helper (lazy-loaded — zero initial bundle cost)
export { dockSharedRoutes } from './shared-routes'

// Bin toast composable (domain apps show "Moved to Bin. [Undo]" after deletes)
export { useBinToast } from './composables/useBinToast'
