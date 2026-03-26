// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// dock-desk.js entry — loaded via dynamic import() from the IIFE loader
// (dock.bundle.js). Mounts <DockNavbar /> + panel host when frappe.boot.dock.installed is true.

import './desk-style.css'
import { createApp, h, Fragment, defineAsyncComponent } from 'vue'
import DockNavbar from './components/DockNavbar.vue'

const DockDeskPanels = defineAsyncComponent(() => import('./components/DockDeskPanels.vue'))

function mountNavbar() {
  const boot = (window as any).frappe?.boot?.dock
  if (!boot?.installed) return

  const wrapper = document.createElement('div')
  wrapper.id = 'dock-navbar-root'

  // Hide Frappe's navbar (don't remove it — Desk JS holds references to it).
  // Insert DockNavbar before it so it appears at the top.
  const existing = document.querySelector('.navbar.navbar-fixed-top') as HTMLElement | null
  if (existing) {
    existing.style.display = 'none'
    existing.parentElement!.insertBefore(wrapper, existing)
  } else {
    // Fallback: prepend to <header> or <body>
    const header = document.querySelector('header')
    if (header) {
      header.prepend(wrapper)
    } else {
      document.body.prepend(wrapper)
    }
  }

  // Mount a single Vue app with both navbar and panel host.
  // Using Fragment so both render without needing a wrapper element.
  const app = createApp({
    render() {
      return h(Fragment, [
        h(DockNavbar),
        h(DockDeskPanels),
      ])
    },
  })
  app.mount(wrapper)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountNavbar)
} else {
  mountNavbar()
}
