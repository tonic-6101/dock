// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// dock.bundle.js entry — injected into Frappe Desk via app_include_js.
// Mounts <DockNavbar /> when frappe.boot.dock.installed is true.

import { createApp } from 'vue'
import DockNavbar from './components/DockNavbar.vue'

function mountNavbar() {
  const boot = (window as any).frappe?.boot?.dock
  if (!boot?.installed) return

  // Replace existing navbar if Frappe rendered one, or prepend to body.
  const existing = document.querySelector('.navbar.navbar-fixed-top')
  if (existing) {
    const wrapper = document.createElement('div')
    existing.replaceWith(wrapper)
    createApp(DockNavbar).mount(wrapper)
  } else {
    const wrapper = document.createElement('div')
    document.body.prepend(wrapper)
    createApp(DockNavbar).mount(wrapper)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountNavbar)
} else {
  mountNavbar()
}
