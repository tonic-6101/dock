<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockPromoteToDiscussion' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useDiscussions } from '@/composables/useDiscussions'

const props = defineProps<{
  referenceDoctype: string
  referenceName: string
  commentCount: number
}>()

const emit = defineEmits<{
  promoted: [discussionName: string]
}>()

const { promote } = useDiscussions()
const showModal = ref(false)
const title = ref('')
const discussionType = ref('General')
const includeComments = ref(true)
const submitting = ref(false)

const typeOptions = ['General', 'Decision', 'Meeting Protocol', 'Retrospective', 'Proposal']

function open() {
  title.value = `${__('Discussion')}: ${props.referenceName}`
  showModal.value = true
}

async function submit() {
  if (!title.value.trim()) return
  submitting.value = true
  try {
    const discussion = await promote(
      props.referenceDoctype,
      props.referenceName,
      title.value,
      discussionType.value,
      includeComments.value,
    )
    showModal.value = false
    emit('promoted', discussion.name)
  } finally {
    submitting.value = false
  }
}

function close() {
  showModal.value = false
}
</script>

<template>
  <div v-if="commentCount >= 5">
    <!-- Prompt banner -->
    <div class="mt-3 p-3 rounded-lg border border-blue-200 bg-blue-50
                dark:border-blue-800 dark:bg-blue-900/20">
      <p class="text-sm text-gray-700 dark:text-gray-300">
        {{ __('This thread has {0} replies.').replace('{0}', String(commentCount)) }}
        {{ __('Would you like to continue as a Discussion?') }}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {{ __('Discussions are titled, threaded, and searchable — better for complex topics.') }}
      </p>
      <div class="flex gap-2 mt-2">
        <button
          class="text-xs px-3 py-1.5 rounded bg-blue-600 text-white
                 hover:bg-blue-700 transition-colors"
          @click="open"
        >
          {{ __('Start Discussion') }}
        </button>
        <button
          class="text-xs px-3 py-1.5 rounded text-gray-600
                 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200
                 transition-colors"
          @click="$el.parentElement?.remove()"
        >
          {{ __('Keep commenting') }}
        </button>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50"
          @click="close"
        />

        <!-- Dialog -->
        <div class="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl
                    w-full max-w-md mx-4 p-5">
          <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {{ __('Start Discussion') }}
          </h3>

          <!-- Title -->
          <div class="mb-3">
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ __('Title') }}
            </label>
            <input
              v-model="title"
              type="text"
              class="w-full px-3 py-2 text-sm rounded border border-gray-300
                     dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
              @keydown.enter.prevent="submit"
            />
          </div>

          <!-- Type -->
          <div class="mb-3">
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ __('Type') }}
            </label>
            <select
              v-model="discussionType"
              class="w-full px-3 py-2 text-sm rounded border border-gray-300
                     dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="t in typeOptions" :key="t" :value="t">
                {{ __(t) }}
              </option>
            </select>
          </div>

          <!-- Include comments -->
          <label class="flex items-center gap-2 mb-4 text-sm text-gray-700 dark:text-gray-300">
            <input
              v-model="includeComments"
              type="checkbox"
              class="rounded border-gray-300 dark:border-gray-600"
            />
            {{ __('Include existing comments as context') }}
          </label>

          <!-- Actions -->
          <div class="flex justify-end gap-2">
            <button
              class="text-sm px-3 py-1.5 rounded text-gray-600
                     hover:text-gray-800 dark:text-gray-400
                     transition-colors"
              :disabled="submitting"
              @click="close"
            >
              {{ __('Cancel') }}
            </button>
            <button
              class="text-sm px-4 py-1.5 rounded bg-blue-600 text-white
                     hover:bg-blue-700 disabled:opacity-50
                     transition-colors"
              :disabled="submitting || !title.trim()"
              @click="submit"
            >
              {{ submitting ? __('Creating...') : __('Create Discussion') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
