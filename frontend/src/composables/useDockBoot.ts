// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { computed } from 'vue'

/** Returns the frappe.boot.dock payload, or null when Dock is not installed.
 *  On /dock web pages, falls back to window.__DOCK_BOOT__ (injected by dock.py). */
export function useDockBoot() {
  const dock = computed(() => window.frappe?.boot?.dock ?? (window as any).dockBoot ?? null)
  const isInstalled = computed(() => Boolean(dock.value?.installed))
  const settings = computed(() => dock.value?.settings ?? null)
  const registeredApps = computed(() => dock.value?.registered_apps ?? [])
  const calendarSources = computed(() => dock.value?.calendar_sources ?? [])
  const notificationTypes = computed(() => dock.value?.notification_types ?? [])

  return { dock, isInstalled, settings, registeredApps, calendarSources, notificationTypes }
}
