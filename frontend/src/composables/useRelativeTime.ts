// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// Smart relative timestamp formatting per spec:
//   < 1h  → "2m"
//   1–24h → "3h"
//   > 24h → "Mar 3"

export function relativeTime(dateStr: string): string {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60_000)

  if (diffMin < 60) return `${Math.max(diffMin, 1)}m`
  const diffH = Math.floor(diffMin / 60)
  if (diffH < 24) return `${diffH}h`
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
