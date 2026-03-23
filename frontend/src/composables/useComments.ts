// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { ref } from 'vue'
import { callApi } from './useApi'
import type { DockComment } from '@/types/dock'

interface CommentsResponse {
  comments: DockComment[]
  has_more: boolean
  total: number
  resolved_count: number
}

export function useComments() {
  const comments = ref<DockComment[]>([])
  const total = ref(0)
  const hasMore = ref(false)
  const resolvedCount = ref(0)
  const loading = ref(false)

  async function load(
    referenceDoctype: string,
    referenceName: string,
    limit = 20,
    offset = 0,
    includeResolved = false,
  ) {
    loading.value = true
    try {
      const res = await callApi<CommentsResponse>('dock.api.comment.get_comments', {
        reference_doctype: referenceDoctype,
        reference_name: referenceName,
        limit,
        offset,
        include_resolved: includeResolved,
      })
      comments.value = res.comments
      total.value = res.total
      hasMore.value = res.has_more
      resolvedCount.value = res.resolved_count
    } finally {
      loading.value = false
    }
  }

  async function addComment(
    referenceDoctype: string,
    referenceName: string,
    content: string,
    parentComment?: string,
    noteType = 'General',
    visibility = 'Team',
  ): Promise<DockComment> {
    const result = await callApi<DockComment>('dock.api.comment.add_comment', {
      reference_doctype: referenceDoctype,
      reference_name: referenceName,
      content,
      parent_comment: parentComment,
      note_type: noteType,
      visibility,
    })
    // Prepend to list if it's a top-level comment
    if (!parentComment) {
      comments.value.unshift(result)
      total.value++
    }
    return result
  }

  async function getReplies(commentName: string, limit = 20): Promise<DockComment[]> {
    return callApi<DockComment[]>('dock.api.comment.get_replies', {
      comment_name: commentName,
      limit,
    })
  }

  async function deleteComment(commentName: string) {
    await callApi('dock.api.comment.delete_comment', { comment_name: commentName })
    comments.value = comments.value.filter(c => c.name !== commentName)
    total.value--
  }

  async function resolveComment(commentName: string) {
    await callApi('dock.api.comment.resolve_comment', { comment_name: commentName })
    const c = comments.value.find(c => c.name === commentName)
    if (c) { c.is_resolved = 1 }
  }

  async function unresolveComment(commentName: string) {
    await callApi('dock.api.comment.unresolve_comment', { comment_name: commentName })
    const c = comments.value.find(c => c.name === commentName)
    if (c) { c.is_resolved = 0 }
  }

  async function pinComment(commentName: string) {
    await callApi('dock.api.comment.pin_comment', { comment_name: commentName })
    // Unpin all, then pin the target
    for (const c of comments.value) c.is_pinned = 0
    const c = comments.value.find(c => c.name === commentName)
    if (c) { c.is_pinned = 1 }
  }

  async function unpinComment(commentName: string) {
    await callApi('dock.api.comment.unpin_comment', { comment_name: commentName })
    const c = comments.value.find(c => c.name === commentName)
    if (c) { c.is_pinned = 0 }
  }

  return {
    comments, total, hasMore, resolvedCount, loading,
    load, addComment, getReplies, deleteComment,
    resolveComment, unresolveComment, pinComment, unpinComment,
  }
}

export async function getUsersForMention(search = '', limit = 10) {
  return callApi<{ id: string; label: string; user_image: string | null }[]>(
    'dock.api.comment.get_users_for_mention',
    { search, limit },
  )
}
