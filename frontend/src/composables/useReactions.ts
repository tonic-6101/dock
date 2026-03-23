// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { ref } from 'vue'
import { callApi } from './useApi'
import type { DockReactionSummary } from '@/types/dock'

const EMPTY_SUMMARY: DockReactionSummary = {
  acknowledge: { count: 0, users: [], current_user: false },
  celebrate: { count: 0, users: [], current_user: false },
  seen: { count: 0, users: [], current_user: false },
  flag: { count: 0, users: [], current_user: false },
}

export function useReactions(referenceDoctype: string, referenceName: string) {
  const summary = ref<DockReactionSummary>({ ...EMPTY_SUMMARY })

  async function load() {
    summary.value = await callApi<DockReactionSummary>('dock.api.reaction.get_reactions', {
      reference_doctype: referenceDoctype,
      reference_name: referenceName,
    })
  }

  async function toggle(reactionType: keyof DockReactionSummary) {
    // Optimistic toggle
    const entry = summary.value[reactionType]
    entry.current_user = !entry.current_user
    entry.count += entry.current_user ? 1 : -1

    summary.value = await callApi<DockReactionSummary>('dock.api.reaction.toggle_reaction', {
      reference_doctype: referenceDoctype,
      reference_name: referenceName,
      reaction_type: reactionType,
    })
  }

  return { summary, load, toggle }
}
