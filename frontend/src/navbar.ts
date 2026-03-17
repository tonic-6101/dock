// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// dock-navbar.esm.js entry — domain apps import components from this bundle.
//
// Usage in a domain app:
//   const { DockNavbar, DockShareButton } = await import('/assets/dock/js/dock-navbar.esm.js')
// or via the npm alias:
//   import { DockShareButton } from '@tonic/dock-ui'

export { default as DockNavbar }      from './components/DockNavbar.vue'
export { default as DockShareButton } from './components/share/DockShareButton.vue'
