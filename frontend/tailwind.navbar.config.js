// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// Tailwind config for the standalone dock-navbar.css build.
// Scans ONLY exported Dock components (DockNavbar, DockLayout, and sub-components).

import dockPreset from './src/styles/dock-tailwind-preset.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dockPreset],
  content: [
    './src/components/**/*.{vue,ts}',
    './src/composables/**/*.ts',
    './src/shared-routes.ts',
    './src/pages/Dock*Page.vue',
  ],
  plugins: [],
}
