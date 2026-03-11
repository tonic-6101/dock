// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { ref, type Ref } from 'vue'
import { callApi } from './useApi'

export type ThemePreference = 'light' | 'dark' | 'system'

export interface UseThemeReturn {
  theme: Ref<ThemePreference>
  setTheme: (t: ThemePreference) => void
}

const STORAGE_KEY = 'theme'

function readInitial(): ThemePreference {
  // 1. Server-side preference from Dock boot
  const boot = (window as any).frappe?.boot?.dock?.settings?.theme
    ?? (window as any).dockBoot?.settings?.theme
  if (boot === 'light' || boot === 'dark' || boot === 'system') return boot

  // 2. localStorage fallback
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored as ThemePreference

  return 'system'
}

function applyTheme(t: ThemePreference): void {
  const dark =
    t === 'dark' ||
    (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
}

// Singleton state
const theme = ref<ThemePreference>(readInitial())

// Apply on load
applyTheme(theme.value)

// React to OS changes when in system mode
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (theme.value === 'system') {
    document.documentElement.classList.toggle('dark', e.matches)
  }
})

export function useTheme(): UseThemeReturn {
  function setTheme(t: ThemePreference): void {
    theme.value = t
    applyTheme(t)
    localStorage.setItem(STORAGE_KEY, t)
    // Persist to server best-effort — no await, silent failure is acceptable
    callApi('dock.api.settings.save_user_preference', { values: { theme: t } }).catch(() => {})
  }

  return { theme, setTheme }
}
