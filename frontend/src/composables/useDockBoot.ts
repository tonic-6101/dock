// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { computed, ref, type Ref } from 'vue'

// Singleton: fetched once, shared across all consumers
let _fetched = false
let _fetching: Promise<void> | null = null
const _remote: Ref<Record<string, any> | null> = ref(null)

function _getWindowDock() {
  return (window as any).frappe?.boot?.dock ?? (window as any).dockBoot ?? null
}

function _fetchBoot(): Promise<void> {
  if (_fetching) return _fetching
  _fetching = fetch('/api/method/dock.boot.get_boot', {
    method: 'GET',
    headers: { 'X-Frappe-CSRF-Token': (window as any).csrf_token ?? '' },
  })
    .then(r => r.json())
    .then(data => { _remote.value = data.message ?? null; _fetched = true })
    .catch(() => { _fetched = true })
  return _fetching
}

/** Returns the frappe.boot.dock payload, or null when Dock is not installed.
 *  On /dock web pages, falls back to window.dockBoot (injected by dock.py).
 *  On domain-app SPAs (e.g. /orga/*), auto-fetches from API. */
export function useDockBoot() {
  const dock = computed(() => _getWindowDock() ?? _remote.value)

  // Auto-fetch when no boot data is available in window globals
  if (!_getWindowDock() && !_fetched) {
    _fetchBoot()
  }

  const isInstalled = computed(() => Boolean(dock.value?.installed))
  const settings = computed(() => dock.value?.settings ?? null)
  const registeredApps = computed(() => dock.value?.registered_apps ?? [])
  const calendarSources = computed(() => dock.value?.calendar_sources ?? [])
  const userCalendars = computed(() => dock.value?.user_calendars ?? { user_calendars: [], shared_calendars: [] })
  const notificationTypes = computed(() => dock.value?.notification_types ?? [])
  const noteActions = computed(() => dock.value?.note_actions ?? [])
  const pinnedApps = computed(() => dock.value?.pinned_apps ?? [])

  return { dock, isInstalled, settings, registeredApps, calendarSources, userCalendars, notificationTypes, noteActions, pinnedApps }
}
