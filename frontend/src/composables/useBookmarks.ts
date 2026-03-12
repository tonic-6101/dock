// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// Module-level singleton — all consumers share the same reactive state.
// Seeded from frappe.boot.dock.bookmarks (no API call on first mount).

import { ref, computed } from 'vue'
import { callApi } from './useApi'

export interface Bookmark {
  name: string
  app: string
  doctype: string
  docname: string
  label: string
  icon: string
  sort_order: number
}

const MAX = 12

const bookmarks = ref<Bookmark[]>([])
let initialised = false

function init(bootBookmarks?: Bookmark[]) {
  if (initialised) return
  initialised = true
  if (bootBookmarks?.length) bookmarks.value = bootBookmarks
}

const atLimit = computed(() => bookmarks.value.length >= MAX)

function isBookmarked(app: string, doctype: string, docname: string): string | null {
  return bookmarks.value.find(
    b => b.app === app && b.doctype === doctype && b.docname === docname,
  )?.name ?? null
}

async function addBookmark(item: Omit<Bookmark, 'name' | 'sort_order'>) {
  if (atLimit.value) return
  // Optimistic — will get real name from server
  const tempName = `__tmp_${Date.now()}`
  const temp: Bookmark = { name: tempName, sort_order: bookmarks.value.length, ...item }
  bookmarks.value.push(temp)

  try {
    const name = await callApi<string>('dock.api.bookmarks.add', {
      app: item.app,
      doctype: item.doctype,
      docname: item.docname,
      label: item.label,
      icon: item.icon,
    })
    // Replace temp with real name
    const idx = bookmarks.value.findIndex(b => b.name === tempName)
    if (idx >= 0) bookmarks.value[idx].name = name
  } catch {
    bookmarks.value = bookmarks.value.filter(b => b.name !== tempName)
  }
}

function removeBookmark(bookmarkName: string) {
  bookmarks.value = bookmarks.value.filter(b => b.name !== bookmarkName)
  callApi('dock.api.bookmarks.remove', { bookmark_name: bookmarkName }).catch(() => { /* silent */ })
}

function reorderBookmarks(orderedNames: string[]) {
  const map = new Map(bookmarks.value.map(b => [b.name, b]))
  bookmarks.value = orderedNames.map((n, i) => ({ ...map.get(n)!, sort_order: i }))
  callApi('dock.api.bookmarks.reorder', { ordered_names: orderedNames }).catch(() => { /* silent */ })
}

export function useBookmarks() {
  return { bookmarks, atLimit, init, isBookmarked, addBookmark, removeBookmark, reorderBookmarks }
}
