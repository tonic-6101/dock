// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { ref } from 'vue'
import { callApi } from './useApi'
import type { ActivityFeedItem } from '@/types/dock'

interface FeedResponse {
  items: ActivityFeedItem[]
  has_more: boolean
  total: number
}

export function useActivityFeed() {
  const items = ref<ActivityFeedItem[]>([])
  const total = ref(0)
  const hasMore = ref(false)
  const loading = ref(false)

  async function load(filters: Record<string, unknown> = {}) {
    loading.value = true
    try {
      const res = await callApi<FeedResponse>('dock.api.activity.get_activity_feed', filters)
      items.value = res.items
      total.value = res.total
      hasMore.value = res.has_more
    } finally {
      loading.value = false
    }
  }

  async function loadMore(filters: Record<string, unknown> = {}) {
    const res = await callApi<FeedResponse>('dock.api.activity.get_activity_feed', {
      ...filters,
      offset: items.value.length,
    })
    items.value.push(...res.items)
    hasMore.value = res.has_more
    total.value = res.total
  }

  return { items, total, hasMore, loading, load, loadMore }
}
