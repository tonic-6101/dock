// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// Shared Tailwind preset for all Dock ecosystem apps.
// Import in your tailwind.config.js:
//   import dockPreset from '../../dock/frontend/src/styles/dock-tailwind-preset.js'
//   export default { presets: [dockPreset], ... }
//
// See: ecosystem.localhost/spec/design/unified-design.md

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      // ── Typography ──────────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display':  ['2rem',      { lineHeight: '1.2',  fontWeight: '700', letterSpacing: '-0.02em' }],
        'h1':       ['1.75rem',   { lineHeight: '1.2',  fontWeight: '700', letterSpacing: '-0.01em' }],
        'h2':       ['1.5rem',    { lineHeight: '1.25', fontWeight: '600' }],
        'h3':       ['1.25rem',   { lineHeight: '1.3',  fontWeight: '600' }],
        'h4':       ['1rem',      { lineHeight: '1.4',  fontWeight: '600' }],
        'subtitle': ['0.875rem',  { lineHeight: '1.4',  fontWeight: '500' }],
        'body':     ['0.875rem',  { lineHeight: '1.5',  fontWeight: '400' }],
        'caption':  ['0.75rem',   { lineHeight: '1.5',  fontWeight: '400' }],
        'overline': ['0.6875rem', { lineHeight: '1.5',  fontWeight: '600', letterSpacing: '0.05em' }],
      },

      // ── Colors ──────────────────────────────────────────────────
      colors: {
        // Dock neutral scale (slate)
        dock: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },

        // App accent — maps to --app-accent-* CSS custom properties.
        // Each app overrides these in its app-tokens.css.
        // In neutral mode, tokens.css resets these to dock slate values.
        accent: {
          50:  'var(--app-accent-50)',
          100: 'var(--app-accent-100)',
          200: 'var(--app-accent-200)',
          300: 'var(--app-accent-300)',
          400: 'var(--app-accent-400)',
          500: 'var(--app-accent-500)',
          600: 'var(--app-accent-600)',
          700: 'var(--app-accent-700)',
          800: 'var(--app-accent-800)',
          900: 'var(--app-accent-900)',
          950: 'var(--app-accent-950)',
        },

        // Semantic status colors — shifted hues to avoid app-color collisions.
        // See: ecosystem.localhost/spec/design/app-colors.md § Reserved Hues
        status: {
          success:    'var(--status-success)',
          warning:    'var(--status-warning)',
          danger:     'var(--status-danger)',
          info:       'var(--status-info)',
          'success-bg': 'var(--status-success-bg)',
          'warning-bg': 'var(--status-warning-bg)',
          'danger-bg':  'var(--status-danger-bg)',
          'info-bg':    'var(--status-info-bg)',
        },
      },
    },
  },
}
