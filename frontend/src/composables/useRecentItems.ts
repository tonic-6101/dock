// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// Module-level singleton — all consumers share the same reactive state.
// Seeded from frappe.boot.dock.recent_items (no API call on first mount).

import { ref } from 'vue'
import { callApi } from './useApi'

export interface RecentItem {
  name: string
  app: string
  doctype: string
  docname: string
  label: string
  icon: string
  visited_at: string
}

const items = ref<RecentItem[]>([])
let initialised = false

function init(bootItems?: RecentItem[]) {
  if (initialised) return
  initialised = true
  if (bootItems?.length) items.value = bootItems
}

function trackItem(item: Omit<RecentItem, 'name' | 'visited_at'>) {
  // Optimistic update — move/add to top
  const idx = items.value.findIndex(
    r => r.app === item.app && r.doctype === item.doctype && r.docname === item.docname,
  )
  const now = new Date().toISOString()
  const updated: RecentItem = { name: idx >= 0 ? items.value[idx].name : '', ...item, visited_at: now }
  if (idx >= 0) {
    items.value.splice(idx, 1)
  }
  items.value.unshift(updated)
  if (items.value.length > 8) items.value = items.value.slice(0, 8)

  // Fire and forget — server keeps the authoritative list
  callApi('dock.api.recent.track', {
    app: item.app,
    doctype: item.doctype,
    docname: item.docname,
    label: item.label,
    icon: item.icon,
  }).catch(() => { /* silent */ })
}

function removeItem(name: string) {
  items.value = items.value.filter(r => r.name !== name)
  callApi('dock.api.recent.remove', { recent_item_name: name }).catch(() => { /* silent */ })
}

function clearAll() {
  items.value = []
  callApi('dock.api.recent.clear').catch(() => { /* silent */ })
}

export function useRecentItems() {
  return { items, init, trackItem, removeItem, clearAll }
}
