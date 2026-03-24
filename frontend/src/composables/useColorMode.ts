// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { ref, type Ref } from 'vue'
import { callApi } from './useApi'

export type ColorMode = 'branded' | 'neutral'

export interface UseColorModeReturn {
  colorMode: Ref<ColorMode>
  setColorMode: (m: ColorMode) => void
}

const STORAGE_KEY = 'color-mode'

function readInitial(): ColorMode {
  // 1. Server-side preference from Dock boot
  const boot = (window as any).frappe?.boot?.dock?.settings?.color_mode
    ?? (window as any).dockBoot?.settings?.color_mode
  if (boot === 'branded' || boot === 'neutral') return boot

  // 2. localStorage fallback
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'branded' || stored === 'neutral') return stored as ColorMode

  return 'branded'
}

function applyColorMode(m: ColorMode): void {
  if (m === 'neutral') {
    document.documentElement.setAttribute('data-color-mode', 'neutral')
  } else {
    document.documentElement.removeAttribute('data-color-mode')
  }
}

// Singleton state
const colorMode = ref<ColorMode>(readInitial())

// Apply on load
applyColorMode(colorMode.value)

export function useColorMode(): UseColorModeReturn {
  function setColorMode(m: ColorMode): void {
    colorMode.value = m
    applyColorMode(m)
    localStorage.setItem(STORAGE_KEY, m)
    // Persist to server best-effort
    callApi('dock.api.settings.save_user_preference', { color_mode: m }).catch(() => {})
  }

  return { colorMode, setColorMode }
}
