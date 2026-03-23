<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockCommentThread' }
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useComments } from '@/composables/useComments'
import DockCommentCard from './DockCommentCard.vue'
import DockCommentInput from './DockCommentInput.vue'

const props = defineProps<{
  referenceDoctype: string
  referenceName: string
  showNotes?: boolean
  compact?: boolean
}>()

const {
  comments, total, hasMore, resolvedCount, loading,
  load, addComment, deleteComment,
  resolveComment, unresolveComment, pinComment, unpinComment,
} = useComments()

const filter = ref<'all' | 'notes' | 'resolved'>('all')
const includeResolved = ref(false)
const replyingTo = ref<string | null>(null)

onMounted(() => {
  load(props.referenceDoctype, props.referenceName, 20, 0, includeResolved.value)
})

async function handleSubmit(content: string, noteType: string) {
  await addComment(
    props.referenceDoctype,
    props.referenceName,
    content,
    replyingTo.value ?? undefined,
    noteType,
  )
  replyingTo.value = null
}

function setFilter(f: 'all' | 'notes' | 'resolved') {
  filter.value = f
  includeResolved.value = f === 'resolved'
  load(props.referenceDoctype, props.referenceName, 20, 0, includeResolved.value)
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">
        {{ __('Comments') }}
        <span v-if="total" class="text-gray-500 font-normal">({{ total }})</span>
        <span v-if="resolvedCount" class="text-gray-400 font-normal text-xs ml-1">
          {{ resolvedCount }} {{ __('resolved') }}
        </span>
      </h3>
      <div class="flex gap-1">
        <button
          v-for="f in (['all', 'notes', 'resolved'] as const)"
          :key="f"
          class="text-xs px-2 py-1 rounded transition-colors"
          :class="filter === f
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
          @click="setFilter(f)"
        >
          {{ __(f === 'all' ? 'All' : f === 'notes' ? 'Notes' : 'Resolved') }}
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="py-8 text-center text-sm text-gray-500">
      {{ __('Loading...') }}
    </div>

    <!-- Empty state -->
    <div v-else-if="!comments.length" class="py-8 text-center text-sm text-gray-500">
      {{ __('No comments yet') }}
    </div>

    <!-- Comment list -->
    <div v-else class="space-y-1">
      <DockCommentCard
        v-for="comment in comments"
        :key="comment.name"
        :comment="comment"
        :compact="compact"
        @reply="replyingTo = $event"
        @delete="deleteComment"
        @resolve="resolveComment"
        @unresolve="unresolveComment"
        @pin="pinComment"
        @unpin="unpinComment"
      />
      <button
        v-if="hasMore"
        class="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 py-2"
        @click="load(referenceDoctype, referenceName, 20, comments.length, includeResolved)"
      >
        {{ __('Load more') }}
      </button>
    </div>

    <!-- Reply indicator -->
    <div
      v-if="replyingTo"
      class="mt-2 text-xs text-gray-500 flex items-center gap-2"
    >
      {{ __('Replying to comment') }}
      <button class="text-red-500 hover:text-red-700" @click="replyingTo = null">&#x2715;</button>
    </div>

    <!-- Input -->
    <div class="mt-3">
      <DockCommentInput
        :show-note-mode="showNotes"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>
