<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockDiscussionNew' }
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { __ } from '@/composables/useTranslate'
import { useDiscussions } from '@/composables/useDiscussions'

const route = useRoute()
const router = useRouter()
const { create } = useDiscussions()

const title = ref('')
const content = ref('')
const discussionType = ref('General')
const submitting = ref(false)

const TYPES = [
  { value: 'General', label: 'General' },
  { value: 'Decision', label: 'Decision' },
  { value: 'Meeting Protocol', label: 'Meeting Protocol' },
  { value: 'Retrospective', label: 'Retrospective' },
  { value: 'Proposal', label: 'Proposal' },
]

const TEMPLATES: Record<string, string> = {
  'General': '',
  'Decision': '## Context\n\n## Options Considered\n1. \n2. \n\n## Decision\n\n## Consequences\n',
  'Meeting Protocol': '## Attendees\n\n## Agenda\n1. \n\n## Discussion Notes\n\n## Decisions\n- \n\n## Action Items\n- ',
  'Retrospective': '## What went well\n- \n\n## What could improve\n- \n\n## Action items\n- ',
  'Proposal': '## Problem\n\n## Proposed Solution\n\n## Alternatives Considered\n1. \n\n## Impact\n',
}

// Pre-fill linked record from query params
const linkedDoctype = ref(route.query.link_doctype as string || '')
const linkedName = ref(route.query.link_name as string || '')

onMounted(() => {
  if (linkedDoctype.value && linkedName.value) {
    title.value = `Discussion: ${linkedDoctype.value} ${linkedName.value}`
  }
})

function onTypeChange() {
  if (!content.value.trim() || Object.values(TEMPLATES).includes(content.value)) {
    content.value = TEMPLATES[discussionType.value] || ''
  }
}

async function handleSubmit() {
  if (!title.value.trim() || !content.value.trim()) return
  submitting.value = true
  try {
    const linked = linkedDoctype.value && linkedName.value
      ? [{ doctype: linkedDoctype.value, name: linkedName.value }]
      : undefined
    const result = await create({
      title: title.value,
      content: `<p>${content.value.replace(/\n/g, '</p><p>')}</p>`,
      discussion_type: discussionType.value,
      linked_records: linked,
    })
    router.push(`/discussions/${result.name}`)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-6">
    <button
      class="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-4"
      @click="router.push('/discussions')"
    >
      &larr; {{ __('All Discussions') }}
    </button>

    <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
      {{ __('New Discussion') }}
    </h1>

    <div class="space-y-4">
      <!-- Type -->
      <div class="flex gap-2">
        <button
          v-for="t in TYPES"
          :key="t.value"
          class="text-xs px-3 py-1.5 rounded-md transition-colors"
          :class="discussionType === t.value
            ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
            : 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'"
          @click="discussionType = t.value; onTypeChange()"
        >
          {{ __(t.label) }}
        </button>
      </div>

      <!-- Title -->
      <input
        v-model="title"
        type="text"
        :placeholder="__('Discussion title')"
        class="w-full text-lg font-medium border-b border-gray-200 dark:border-gray-700 py-2 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
      />

      <!-- Linked record (if pre-filled) -->
      <div v-if="linkedDoctype && linkedName" class="flex items-center gap-2">
        <span class="text-xs text-gray-500">{{ __('Linked to') }}:</span>
        <span class="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          {{ linkedDoctype }}: {{ linkedName }}
        </span>
      </div>

      <!-- Content -->
      <textarea
        v-model="content"
        :placeholder="__('Write your discussion content...')"
        class="w-full min-h-[300px] text-sm border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 font-mono"
      />

      <!-- Submit -->
      <div class="flex justify-end gap-2">
        <button
          class="text-sm px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          @click="router.push('/discussions')"
        >
          {{ __('Cancel') }}
        </button>
        <button
          class="text-sm px-4 py-2 rounded-md bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 transition-colors"
          :disabled="!title.trim() || !content.trim() || submitting"
          @click="handleSubmit"
        >
          {{ submitting ? __('Creating...') : __('Create Discussion') }}
        </button>
      </div>
    </div>
  </div>
</template>
