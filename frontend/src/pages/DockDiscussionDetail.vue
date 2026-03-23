<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockDiscussionDetail' }
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { __ } from '@/composables/useTranslate'
import { useDiscussions } from '@/composables/useDiscussions'
import DockCommentThread from '@/components/comments/DockCommentThread.vue'
import DockReactionBar from '@/components/reactions/DockReactionBar.vue'
import type { DockDiscussion } from '@/types/dock'

const route = useRoute()
const router = useRouter()
const { get, resolve, reopen, markRead } = useDiscussions()

const discussion = ref<DockDiscussion | null>(null)
const loading = ref(true)
const resolveModal = ref(false)
const resolveSummary = ref('')

const typeColors: Record<string, string> = {
  'General': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  'Decision': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  'Meeting Protocol': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  'Retrospective': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  'Proposal': 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
}

onMounted(async () => {
  try {
    const name = route.params.name as string
    discussion.value = await get(name)
    markRead(name)
  } finally {
    loading.value = false
  }
})

async function handleResolve() {
  if (!discussion.value || !resolveSummary.value.trim()) return
  await resolve(discussion.value.name, resolveSummary.value)
  discussion.value.status = 'Resolved'
  discussion.value.resolved_summary = resolveSummary.value
  resolveModal.value = false
}

async function handleReopen() {
  if (!discussion.value) return
  await reopen(discussion.value.name)
  discussion.value.status = 'Open'
  discussion.value.resolved_summary = null
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-6">
    <div v-if="loading" class="py-8 text-center text-sm text-gray-500">
      {{ __('Loading...') }}
    </div>

    <div v-else-if="!discussion" class="py-8 text-center text-sm text-gray-500">
      {{ __('Discussion not found') }}
    </div>

    <template v-else>
      <!-- Header -->
      <div class="mb-6">
        <button
          class="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-3"
          @click="router.push('/discussions')"
        >
          &larr; {{ __('All Discussions') }}
        </button>
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span :class="['text-xs px-1.5 py-0.5 rounded', typeColors[discussion.discussion_type] || '']">
                {{ __(discussion.discussion_type) }}
              </span>
              <span class="text-xs font-medium" :class="discussion.status === 'Open' ? 'text-green-600' : 'text-blue-600'">
                {{ __(discussion.status) }}
              </span>
            </div>
            <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {{ discussion.title }}
            </h1>
            <p class="text-sm text-gray-500 mt-1">
              {{ discussion.created_by_fullname }} &middot; {{ new Date(discussion.creation).toLocaleDateString() }}
            </p>
          </div>
          <div class="flex gap-2">
            <button
              v-if="discussion.status === 'Open'"
              class="text-sm px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              @click="resolveModal = true"
            >
              {{ __('Resolve') }}
            </button>
            <button
              v-else
              class="text-sm px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              @click="handleReopen"
            >
              {{ __('Reopen') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Resolution banner -->
      <div
        v-if="discussion.resolved_summary"
        class="mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800"
      >
        <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">{{ __('Resolution') }}</h3>
        <p class="text-sm text-blue-700 dark:text-blue-300">{{ discussion.resolved_summary }}</p>
      </div>

      <!-- Opening post -->
      <div class="mb-6 prose prose-sm max-w-none text-gray-700 dark:text-gray-300" v-html="discussion.content" />

      <!-- Linked records -->
      <div v-if="discussion.linked_records?.length" class="mb-6">
        <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{{ __('Linked Records') }}</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="link in discussion.linked_records"
            :key="`${link.reference_doctype}-${link.reference_name}`"
            class="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            {{ link.link_label || `${link.reference_doctype}: ${link.reference_name}` }}
          </span>
        </div>
      </div>

      <!-- Reactions -->
      <div class="mb-6">
        <DockReactionBar
          reference-doctype="Dock Discussion"
          :reference-name="discussion.name"
        />
      </div>

      <!-- Participants -->
      <div v-if="discussion.participants?.length" class="mb-6">
        <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">{{ __('Participants') }}</h3>
        <div class="flex gap-2">
          <span
            v-for="p in discussion.participants"
            :key="p.user"
            class="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            :title="p.role"
          >
            {{ p.user_fullname || p.user }}
          </span>
        </div>
      </div>

      <!-- Replies (Dock Comment Thread) -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
        <DockCommentThread
          reference-doctype="Dock Discussion"
          :reference-name="discussion.name"
          show-notes
        />
      </div>

      <!-- Resolve modal -->
      <div
        v-if="resolveModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        @click.self="resolveModal = false"
      >
        <div class="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-xl">
          <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{{ __('Resolve Discussion') }}</h2>
          <textarea
            v-model="resolveSummary"
            :placeholder="__('Resolution summary...')"
            class="w-full min-h-[100px] text-sm border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-transparent text-gray-900 dark:text-gray-100"
          />
          <div class="flex justify-end gap-2 mt-4">
            <button
              class="text-sm px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700"
              @click="resolveModal = false"
            >
              {{ __('Cancel') }}
            </button>
            <button
              class="text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              :disabled="!resolveSummary.trim()"
              @click="handleResolve"
            >
              {{ __('Resolve') }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
