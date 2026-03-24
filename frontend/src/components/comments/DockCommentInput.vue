<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockCommentInput' }
</script>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'

defineProps<{
  placeholder?: string
  showNoteMode?: boolean
}>()

const emit = defineEmits<{
  submit: [content: string, noteType: string]
}>()

const content = ref('')
const noteType = ref('General')
const submitting = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

// --- @mention autocomplete ---
interface MentionUser {
  id: string
  label: string
  user_image?: string | null
}

const mentionOpen = ref(false)
const mentionSearch = ref('')
const mentionUsers = ref<MentionUser[]>([])
const mentionIndex = ref(0)
const mentionStart = ref(0) // cursor position of the '@'
let mentionDebounce: ReturnType<typeof setTimeout> | null = null

async function searchMentions(query: string) {
  try {
    mentionUsers.value = await callApi<MentionUser[]>(
      'dock.api.comment.get_users_for_mention',
      { search: query, limit: 6 },
    )
    mentionIndex.value = 0
  } catch {
    mentionUsers.value = []
  }
}

function onInput() {
  const el = textareaRef.value
  if (!el) return

  const cursor = el.selectionStart
  const text = content.value.slice(0, cursor)

  // Find the last '@' that's either at start or after a space/newline
  const match = text.match(/(^|[\s])@(\w*)$/)
  if (match) {
    mentionOpen.value = true
    mentionSearch.value = match[2]
    mentionStart.value = cursor - match[2].length - 1 // position of '@'

    if (mentionDebounce) clearTimeout(mentionDebounce)
    mentionDebounce = setTimeout(() => searchMentions(match[2]), 150)
  } else {
    mentionOpen.value = false
  }
}

function selectMention(user: MentionUser) {
  const before = content.value.slice(0, mentionStart.value)
  const after = content.value.slice(textareaRef.value?.selectionStart ?? mentionStart.value)
  content.value = `${before}@${user.label} ${after}`
  mentionOpen.value = false

  nextTick(() => {
    const pos = before.length + 1 + user.label.length + 1
    textareaRef.value?.setSelectionRange(pos, pos)
    textareaRef.value?.focus()
  })
}

function onMentionKeydown(e: KeyboardEvent) {
  if (!mentionOpen.value || !mentionUsers.value.length) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    mentionIndex.value = (mentionIndex.value + 1) % mentionUsers.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    mentionIndex.value = (mentionIndex.value - 1 + mentionUsers.value.length) % mentionUsers.value.length
  } else if (e.key === 'Enter' || e.key === 'Tab') {
    e.preventDefault()
    selectMention(mentionUsers.value[mentionIndex.value])
  } else if (e.key === 'Escape') {
    e.preventDefault()
    mentionOpen.value = false
  }
}

// --- Submit ---
async function handleSubmit() {
  if (!content.value.trim()) return
  submitting.value = true
  mentionOpen.value = false
  try {
    // Wrap in <p>, convert @Name to <span class="mention"> for rendering
    const html = content.value
      .replace(/@([\w\s]+?)(?=\s@|\s*$|[.,!?])/g, '<span class="mention" data-mention="$1">@$1</span>')
    emit('submit', `<p>${html}</p>`, noteType.value)
    content.value = ''
    noteType.value = 'General'
  } finally {
    submitting.value = false
  }
}

function onKeydown(e: KeyboardEvent) {
  // Mention navigation takes priority
  if (mentionOpen.value && mentionUsers.value.length) {
    onMentionKeydown(e)
    if (['ArrowDown', 'ArrowUp', 'Tab'].includes(e.key)) return
    if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey) return
    if (e.key === 'Escape') return
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    handleSubmit()
  }
}
</script>

<template>
  <div class="relative border border-gray-200 dark:border-gray-700 rounded-lg p-3">
    <textarea
      ref="textareaRef"
      v-model="content"
      :placeholder="placeholder || __('Write a comment... Type @ to mention')"
      class="w-full min-h-[80px] text-sm bg-transparent border-none outline-none resize-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
      @keydown="onKeydown"
      @input="onInput"
    />

    <!-- @mention dropdown -->
    <div
      v-if="mentionOpen && mentionUsers.length"
      class="absolute left-3 bottom-full mb-1 z-50 w-64 rounded-lg shadow-lg overflow-hidden py-1"
      style="background: var(--dock-bg, white); border: 1px solid var(--dock-border, #e5e7eb)"
    >
      <button
        v-for="(user, i) in mentionUsers"
        :key="user.id"
        class="w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors"
        :class="i === mentionIndex
          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'"
        @click="selectMention(user)"
        @mouseenter="mentionIndex = i"
      >
        <img
          v-if="user.user_image"
          :src="user.user_image"
          class="w-5 h-5 rounded-full flex-shrink-0"
          :alt="user.label"
        />
        <div
          v-else
          class="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-medium flex-shrink-0"
        >
          {{ (user.label || '?')[0] }}
        </div>
        <div class="min-w-0 flex-1">
          <div class="font-medium truncate">{{ user.label }}</div>
          <div class="text-[10px] text-gray-400 truncate">{{ user.id }}</div>
        </div>
      </button>
    </div>

    <div class="flex items-center justify-between mt-2">
      <div v-if="showNoteMode" class="flex gap-1">
        <button
          v-for="type in ['General', 'Note', 'Decision']"
          :key="type"
          class="text-xs px-2 py-1 rounded transition-colors"
          :class="noteType === type
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
          @click="noteType = type"
        >
          {{ __(type) }}
        </button>
      </div>
      <div v-else />
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-400">{{ __('Ctrl+Enter to send') }}</span>
        <button
          class="text-sm px-3 py-1.5 rounded-md bg-accent-600 dark:bg-accent-400 text-white dark:text-gray-900 hover:bg-accent-700 dark:hover:bg-accent-300 disabled:opacity-50 transition-colors"
          :disabled="!content.trim() || submitting"
          @click="handleSubmit"
        >
          {{ __('Send') }}
        </button>
      </div>
    </div>
  </div>
</template>
