<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockDiscussionCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { __ } from '@/composables/useTranslate'
import type { DockDiscussion } from '@/types/dock'

const props = defineProps<{ discussion: DockDiscussion }>()

const typeColors: Record<string, string> = {
  'General': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  'Decision': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  'Meeting Protocol': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  'Retrospective': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  'Proposal': 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
}

const statusColors: Record<string, string> = {
  'Open': 'text-green-600 dark:text-green-400',
  'Resolved': 'text-blue-600 dark:text-blue-400',
  'Archived': 'text-gray-500',
}

const typeBadgeClass = computed(() => typeColors[props.discussion.discussion_type] ?? typeColors.General)
const statusClass = computed(() => statusColors[props.discussion.status] ?? '')
</script>

<template>
  <router-link
    :to="`/discussions/${discussion.name}`"
    class="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
  >
    <div class="flex items-start justify-between">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span :class="['text-xs px-1.5 py-0.5 rounded', typeBadgeClass]">
            {{ __(discussion.discussion_type) }}
          </span>
          <span :class="['text-xs font-medium', statusClass]">
            {{ __(discussion.status) }}
          </span>
          <span v-if="discussion.is_pinned" class="text-xs text-blue-500">\uD83D\uDCCC</span>
        </div>
        <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {{ discussion.title }}
        </h4>
        <p v-if="discussion.resolved_summary" class="text-xs text-gray-500 mt-1 truncate">
          {{ discussion.resolved_summary }}
        </p>
      </div>
      <div class="flex items-center gap-3 ml-4 text-xs text-gray-500">
        <span v-if="discussion.reply_count" :title="__('Replies')">
          \uD83D\uDCAC {{ discussion.reply_count }}
        </span>
        <span v-if="discussion.linked_records?.length" :title="__('Linked records')">
          \uD83D\uDD17 {{ discussion.linked_records.length }}
        </span>
      </div>
    </div>
    <div class="flex items-center gap-2 mt-2 text-xs text-gray-500">
      <span>{{ discussion.created_by_fullname || discussion.created_by }}</span>
      <span>&middot;</span>
      <span>{{ new Date(discussion.creation).toLocaleDateString() }}</span>
    </div>
  </router-link>
</template>
