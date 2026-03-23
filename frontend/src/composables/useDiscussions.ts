// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { ref } from 'vue'
import { callApi } from './useApi'
import type { DockDiscussion } from '@/types/dock'

interface ListResponse {
  discussions: DockDiscussion[]
  has_more: boolean
  total: number
}

export function useDiscussions() {
  const discussions = ref<DockDiscussion[]>([])
  const total = ref(0)
  const hasMore = ref(false)
  const loading = ref(false)

  async function list(filters: Record<string, unknown> = {}) {
    loading.value = true
    try {
      const res = await callApi<ListResponse>('dock.api.discussion.list_discussions', filters)
      discussions.value = res.discussions
      total.value = res.total
      hasMore.value = res.has_more
    } finally {
      loading.value = false
    }
  }

  async function get(name: string): Promise<DockDiscussion> {
    return callApi<DockDiscussion>('dock.api.discussion.get_discussion', { name })
  }

  async function create(data: {
    title: string
    content: string
    discussion_type?: string
    linked_records?: { doctype: string; name: string }[]
    participants?: string[]
    source_app?: string
  }): Promise<DockDiscussion> {
    return callApi<DockDiscussion>('dock.api.discussion.create_discussion', {
      title: data.title,
      content: data.content,
      discussion_type: data.discussion_type ?? 'General',
      linked_records: data.linked_records ? JSON.stringify(data.linked_records) : undefined,
      participants: data.participants ? JSON.stringify(data.participants) : undefined,
      source_app: data.source_app,
    })
  }

  async function resolve(name: string, resolvedSummary: string) {
    await callApi('dock.api.discussion.resolve_discussion', {
      name,
      resolved_summary: resolvedSummary,
    })
    const d = discussions.value.find(d => d.name === name)
    if (d) { d.status = 'Resolved'; d.resolved_summary = resolvedSummary }
  }

  async function reopen(name: string) {
    await callApi('dock.api.discussion.reopen_discussion', { name })
    const d = discussions.value.find(d => d.name === name)
    if (d) { d.status = 'Open'; d.resolved_summary = null }
  }

  async function getRecordDiscussions(
    referenceDoctype: string,
    referenceName: string,
    limit = 10,
  ): Promise<DockDiscussion[]> {
    return callApi<DockDiscussion[]>('dock.api.discussion.get_record_discussions', {
      reference_doctype: referenceDoctype,
      reference_name: referenceName,
      limit,
    })
  }

  async function markRead(name: string) {
    await callApi('dock.api.discussion.mark_read', { name })
  }

  async function promote(
    referenceDoctype: string,
    referenceName: string,
    title: string,
    discussionType = 'General',
    includeComments = true,
  ): Promise<DockDiscussion> {
    return callApi<DockDiscussion>('dock.api.discussion.promote_to_discussion', {
      reference_doctype: referenceDoctype,
      reference_name: referenceName,
      title,
      discussion_type: discussionType,
      include_comments: includeComments,
    })
  }

  return {
    discussions, total, hasMore, loading,
    list, get, create, resolve, reopen,
    getRecordDiscussions, markRead, promote,
  }
}
