// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// dock-desk.js entry — loaded via dynamic import() from the IIFE loader
// (dock.bundle.js). Mounts <DockNavbar /> + panel host when frappe.boot.dock.installed is true.

import './desk-style.css'
import { createApp, h, Fragment, defineAsyncComponent } from 'vue'
import DockNavbar from './components/DockNavbar.vue'

const DockDeskPanels = defineAsyncComponent(() => import('./components/DockDeskPanels.vue'))

/** Selectors for Frappe navbar elements that Dock replaces. */
const FRAPPE_NAVBAR_SELECTORS = [
  '.navbar.navbar-fixed-top',            // v15 standard navbar
  '.navbar.navbar-expand-lg',            // v16 standard navbar
  '.desktop-navbar',                     // v16 desktop page custom navbar
  '.body-sidebar-container .standard-items-sections',  // sidebar search/bell
  '.page-head .sidebar-toggle-btn',      // page-level sidebar toggle (Dock has its own)
  '.page-head .search-bar',              // page-level search bar (Dock has its own)
]

/** Hide all Frappe navbar elements — called once and observed for late renders. */
function hideFrappeNavbars() {
  for (const sel of FRAPPE_NAVBAR_SELECTORS) {
    document.querySelectorAll<HTMLElement>(sel).forEach(el => {
      el.style.setProperty('display', 'none', 'important')
    })
  }
}

function mountNavbar() {
  const boot = (window as any).frappe?.boot?.dock
  if (!boot?.installed) return

  // Prevent double-mount
  if (document.getElementById('dock-navbar-root')) return

  // Hide existing Frappe navbars immediately
  hideFrappeNavbars()

  const wrapper = document.createElement('div')
  wrapper.id = 'dock-navbar-root'

  // Mount Dock navbar at the top of .main-section (the Desk page container).
  const mainSection = document.querySelector('.main-section') || document.body
  mainSection.prepend(wrapper)

  // Watch for late-rendered Frappe navbar elements (desktop page, route changes)
  const observer = new MutationObserver(() => hideFrappeNavbars())
  observer.observe(document.body, { childList: true, subtree: true })
  // Stop after 10s to avoid permanent overhead
  setTimeout(() => observer.disconnect(), 10000)

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
