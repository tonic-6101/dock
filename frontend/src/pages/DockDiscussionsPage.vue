<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockDiscussionsPage' }
</script>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useDiscussions } from '@/composables/useDiscussions'
import DockDiscussionCard from '@/components/discussions/DockDiscussionCard.vue'

const { discussions, total, hasMore, loading, list } = useDiscussions()

const filterStatus = ref<string>('Open')
const filterType = ref<string | null>(null)
const search = ref('')

function load() {
  const filters: Record<string, unknown> = {}
  if (filterStatus.value) filters.status = filterStatus.value
  if (filterType.value) filters.discussion_type = filterType.value
  if (search.value) filters.search = search.value
  list(filters)
}

onMounted(load)
watch([filterStatus, filterType], load)

function onSearch() {
  load()
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {{ __('Discussions') }}
        <span v-if="total" class="text-gray-500 font-normal text-base">({{ total }})</span>
      </h1>
      <router-link
        to="/discussions/new"
        class="text-sm px-3 py-1.5 rounded-md bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
      >
        {{ __('New Discussion') }}
      </router-link>
    </div>

    <!-- Filters -->
    <div class="flex gap-3 mb-4">
      <div class="flex gap-1">
        <button
          v-for="s in ['Open', 'Resolved', 'Archived']"
          :key="s"
          class="text-xs px-2 py-1 rounded transition-colors"
          :class="filterStatus === s
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
          @click="filterStatus = s"
        >
          {{ __(s) }}
        </button>
      </div>
      <select
        v-model="filterType"
        class="text-xs border border-gray-200 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-900"
      >
        <option :value="null">{{ __('All types') }}</option>
        <option v-for="t in ['General', 'Decision', 'Meeting Protocol', 'Retrospective', 'Proposal']" :key="t" :value="t">
          {{ __(t) }}
        </option>
      </select>
      <input
        v-model="search"
        type="text"
        :placeholder="__('Search discussions...')"
        class="text-xs border border-gray-200 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-900 flex-1 max-w-xs"
        @keyup.enter="onSearch"
      />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="py-8 text-center text-sm text-gray-500">
      {{ __('Loading...') }}
    </div>

    <!-- Empty -->
    <div v-else-if="!discussions.length" class="py-8 text-center text-sm text-gray-500">
      {{ __('No discussions found') }}
    </div>

    <!-- List -->
    <div v-else class="space-y-2">
      <DockDiscussionCard
        v-for="d in discussions"
        :key="d.name"
        :discussion="d"
      />
      <button
        v-if="hasMore"
        class="w-full text-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 py-3"
        @click="list({ status: filterStatus, discussion_type: filterType, search: search || undefined, offset: discussions.length })"
      >
        {{ __('Load more') }}
      </button>
    </div>
  </div>
</template>
