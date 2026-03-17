// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

/**
 * Highlight matching text segments by wrapping them in <mark>.
 * See ecosystem spec: search.md §6.2
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function highlightMatch(text: string, query: string): string {
  if (!query || query.length < 1) return escapeHtml(text)
  const escaped = escapeRegExp(query)
  const regex = new RegExp(`(${escaped})`, 'gi')
  return escapeHtml(text).replace(
    regex,
    '<mark class="bg-yellow-200/60 dark:bg-yellow-500/30 text-inherit rounded-sm px-0.5">$1</mark>',
  )
}
