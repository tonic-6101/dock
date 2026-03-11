// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { computed } from 'vue'

export interface DockSettings {
  timezone: string
  week_start: 'Monday' | 'Sunday' | ''
  date_format: string
  ui_language: string
  currency: string
  number_format: string
  theme: 'light' | 'dark' | 'system'
  enable_global_timer: boolean
  enable_bookmarks: boolean
  enable_recent_items: boolean
  recent_items_limit: number
  site_label: string
  default_app: string
}

/** Merged settings from boot (user pref → org default → fallback).
 *  Works whether Dock is installed or not — all fallbacks built in. */
export function useDockSettings() {
  const s = computed(() => {
    const raw = window.frappe?.boot?.dock?.settings ?? (window as any).dockBoot?.settings
    return raw as Partial<DockSettings> | undefined
  })

  return computed<DockSettings>(() => ({
    timezone:          s.value?.timezone          ?? (window as any).frappe?.boot?.time_zone ?? 'UTC',
    week_start:        s.value?.week_start         ?? 'Monday',
    date_format:       s.value?.date_format        ?? 'dd/mm/yyyy',
    ui_language:       s.value?.ui_language        ?? (window as any).frappe?.boot?.lang ?? 'en',
    currency:          s.value?.currency           ?? 'EUR',
    number_format:     s.value?.number_format      ?? '#.###,##',
    theme:             s.value?.theme              ?? 'system',
    enable_global_timer: s.value?.enable_global_timer ?? true,
    enable_bookmarks:    s.value?.enable_bookmarks    ?? true,
    enable_recent_items: s.value?.enable_recent_items ?? true,
    recent_items_limit:  s.value?.recent_items_limit  ?? 20,
    site_label:        s.value?.site_label         ?? '',
    default_app:       s.value?.default_app        ?? '/app',
  }))
}
