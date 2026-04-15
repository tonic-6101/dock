// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Tonic

import { ref, readonly, computed } from 'vue'
import { callApi } from './useApi'

// ── Types ──────────────────────────────────────────────

export interface BriefingData {
  date: string
  apps: Record<string, AppBriefing>
}

export interface AppBriefing {
  error?: string
  [key: string]: unknown
}

// ── State (singleton) ──────────────────────────────────

const data = ref<BriefingData | null>(null)
const loading = ref(false)
const error = ref(false)

/**
 * Composable for the Daily Briefing panel.
 *
 * Fetches aggregated briefing data from `dock.api.briefing.get_briefing`
 * (no LLM involved — raw structured data from all apps).
 */
export function useDockBriefing() {
  async function fetchBriefing(date?: string) {
    loading.value = true
    error.value = false
    try {
      data.value = await callApi<BriefingData>('dock.api.briefing.get_briefing', {
        date: date ?? '',
      })
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  /** Total count of actionable items across all apps. */
  const badgeCount = computed(() => {
    if (!data.value?.apps) return 0
    let count = 0
    for (const app of Object.values(data.value.apps)) {
      if (app.error) continue
      count += countActionable(app)
    }
    return count
  })

  /** List of app keys that have data (no error). */
  const activeApps = computed(() => {
    if (!data.value?.apps) return []
    return Object.entries(data.value.apps)
      .filter(([, v]) => !v.error)
      .map(([k]) => k)
  })

  function getAppData(appName: string): AppBriefing | null {
    return data.value?.apps?.[appName] ?? null
  }

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    badgeCount,
    activeApps,
    fetchBriefing,
    getAppData,
  }
}

// ── Helpers ────────────────────────────────────────────

function countActionable(app: AppBriefing): number {
  let count = 0
  for (const [key, value] of Object.entries(app)) {
    if (key === 'error') continue
    if (Array.isArray(value)) {
      count += value.length
    } else if (value && typeof value === 'object') {
      // Nested objects (e.g., nudges.stale_leads)
      for (const sub of Object.values(value as Record<string, unknown>)) {
        if (Array.isArray(sub)) {
          count += sub.length
        }
      }
    }
  }
  return count
}
