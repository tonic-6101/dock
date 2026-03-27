// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { computed } from 'vue'

export interface DockSettings {
  timezone: string
  weekStart: 'Monday' | 'Sunday'
  dateFormat: string
  uiLanguage: string
  currency: string
  numberFormat: string
  theme: 'light' | 'dark' | 'system'
  colorMode: 'branded' | 'neutral'
  enableGlobalTimer: boolean
  enableBookmarks: boolean
  enableRecentItems: boolean
  recentItemsLimit: number
  siteLabel: string
  defaultApp: string
  calendarDefaultView: 'week' | 'month' | 'day' | 'agenda'
  calendarTimeFormat: '' | '12h' | '24h'
  calendarShowWeekends: boolean
  calendarWorkingHoursStart: string
  calendarWorkingHoursEnd: string
  peopleDisplayNameFormat: 'first_last' | 'last_first'
  peopleCardFields: string[]
}

/** Merged settings from boot (user pref → org default → fallback).
 *  Works whether Dock is installed or not — all fallbacks built in. */
export function useDockSettings() {
  const s = computed(() => {
    const raw = (window as any).frappe?.boot?.dock?.settings ?? (window as any).dockBoot?.settings
    return raw as Record<string, unknown> | undefined
  })

  return computed<DockSettings>(() => ({
    timezone:          (s.value?.timezone          as string)  ?? (window as any).frappe?.boot?.time_zone ?? 'UTC',
    weekStart:         (s.value?.week_start        as 'Monday' | 'Sunday') ?? 'Monday',
    dateFormat:        (s.value?.date_format       as string)  ?? 'dd/mm/yyyy',
    uiLanguage:        (s.value?.ui_language       as string)  ?? (window as any).frappe?.boot?.lang ?? 'en',
    currency:          (s.value?.currency          as string)  ?? 'EUR',
    numberFormat:      (s.value?.number_format     as string)  ?? '#.###,##',
    theme:             (s.value?.theme             as 'light' | 'dark' | 'system') ?? 'system',
    colorMode:         (s.value?.color_mode        as 'branded' | 'neutral') ?? 'branded',
    enableGlobalTimer: (s.value?.enable_global_timer as boolean) ?? true,
    enableBookmarks:   (s.value?.enable_bookmarks   as boolean) ?? true,
    enableRecentItems: (s.value?.enable_recent_items as boolean) ?? true,
    recentItemsLimit:  (s.value?.recent_items_limit  as number) ?? 20,
    siteLabel:         (s.value?.site_label        as string)  ?? '',
    defaultApp:        (s.value?.default_app       as string)  ?? '/app',
    calendarDefaultView:       (s.value?.calendar_default_view as 'week' | 'month' | 'day' | 'agenda') ?? 'week',
    calendarTimeFormat:        (s.value?.calendar_time_format  as '' | '12h' | '24h') ?? '',
    calendarShowWeekends:      (s.value?.calendar_show_weekends as string) !== '0',
    calendarWorkingHoursStart: (s.value?.calendar_working_hours_start as string) ?? '08:00',
    calendarWorkingHoursEnd:   (s.value?.calendar_working_hours_end   as string) ?? '18:00',
    peopleDisplayNameFormat:   (s.value?.people_display_name_format  as 'first_last' | 'last_first') ?? 'first_last',
    peopleCardFields:          (() => {
      const raw = s.value?.people_card_fields
      if (Array.isArray(raw)) return raw as string[]
      if (typeof raw === 'string') { try { return JSON.parse(raw) } catch { /* fall through */ } }
      return ['email_id', 'phone', 'company_name']
    })(),
  }))
}
