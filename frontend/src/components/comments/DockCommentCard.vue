<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockCommentCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { __ } from '@/composables/useTranslate'
import DockReactionBar from '../reactions/DockReactionBar.vue'
import type { DockComment } from '@/types/dock'

const props = defineProps<{
  comment: DockComment
  compact?: boolean
}>()

const emit = defineEmits<{
  reply: [commentName: string]
  delete: [commentName: string]
  resolve: [commentName: string]
  unresolve: [commentName: string]
  pin: [commentName: string]
  unpin: [commentName: string]
}>()

const initials = computed(() => {
  const name = props.comment.user_fullname || props.comment.user
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
})

const timeAgo = computed(() => {
  const diff = Date.now() - new Date(props.comment.creation).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return __('just now')
  if (mins < 60) return `${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  return `${days}d`
})

const isNote = computed(() => props.comment.note_type !== 'General')
</script>

<template>
  <div
    class="group flex gap-3 py-3 px-3 rounded-lg transition-colors"
    :class="{
      'opacity-60': comment.is_resolved,
      'bg-amber-50 dark:bg-amber-900/10': isNote,
      'hover:bg-gray-50 dark:hover:bg-gray-800': !isNote,
    }"
  >
    <!-- Avatar -->
    <div class="flex-shrink-0">
      <img
        v-if="comment.user_image"
        :src="comment.user_image"
        class="w-8 h-8 rounded-full"
        :alt="comment.user_fullname"
      />
      <div
        v-else
        class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300"
      >
        {{ initials }}
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
          {{ comment.user_fullname }}
        </span>
        <span
          v-if="isNote"
          class="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-200"
        >
          {{ comment.note_type }}
        </span>
        <span
          v-if="comment.is_pinned"
          class="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
        >
          {{ __('Pinned') }}
        </span>
        <span class="text-xs text-gray-500 dark:text-gray-400 ml-auto">
          {{ timeAgo }}
        </span>
      </div>

      <div
        class="prose prose-sm max-w-none text-gray-700 dark:text-gray-300"
        v-html="comment.content"
      />

      <!-- Reactions -->
      <div class="mt-2">
        <DockReactionBar
          reference-doctype="Dock Comment"
          :reference-name="comment.name"
          compact
        />
      </div>

      <!-- Actions (visible on hover) -->
      <div class="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          class="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          @click="emit('reply', comment.name)"
        >
          {{ __('Reply') }}
          <span v-if="comment.reply_count" class="ml-1 text-gray-400">({{ comment.reply_count }})</span>
        </button>
        <button
          v-if="!comment.is_resolved"
          class="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          @click="emit('resolve', comment.name)"
        >
          {{ __('Resolve') }}
        </button>
        <button
          v-else
          class="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          @click="emit('unresolve', comment.name)"
        >
          {{ __('Reopen') }}
        </button>
        <button
          v-if="!comment.is_pinned"
          class="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          @click="emit('pin', comment.name)"
        >
          {{ __('Pin') }}
        </button>
        <button
          v-else
          class="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          @click="emit('unpin', comment.name)"
        >
          {{ __('Unpin') }}
        </button>
        <button
          class="text-xs text-red-500 hover:text-red-700"
          @click="emit('delete', comment.name)"
        >
          {{ __('Delete') }}
        </button>
      </div>
    </div>
  </div>
</template>
