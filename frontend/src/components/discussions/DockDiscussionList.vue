<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockDiscussionList' }
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useDiscussions } from '@/composables/useDiscussions'
import DockDiscussionCard from './DockDiscussionCard.vue'
import type { DockDiscussion } from '@/types/dock'

const props = defineProps<{
  referenceDoctype: string
  referenceName: string
  limit?: number
}>()

const { getRecordDiscussions } = useDiscussions()
const discussions = ref<DockDiscussion[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    discussions.value = await getRecordDiscussions(
      props.referenceDoctype,
      props.referenceName,
      props.limit ?? 10,
    )
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">
        {{ __('Discussions') }}
        <span v-if="discussions.length" class="text-gray-500 font-normal">({{ discussions.length }})</span>
      </h3>
      <router-link
        :to="`/discussions/new?link_doctype=${referenceDoctype}&link_name=${referenceName}`"
        class="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400"
      >
        {{ __('Start Discussion') }}
      </router-link>
    </div>

    <div v-if="loading" class="py-4 text-center text-sm text-gray-500">
      {{ __('Loading...') }}
    </div>

    <div v-else-if="!discussions.length" class="py-4 text-center text-sm text-gray-500">
      {{ __('No discussions yet') }}
    </div>

    <div v-else class="space-y-2">
      <DockDiscussionCard
        v-for="d in discussions"
        :key="d.name"
        :discussion="d"
      />
    </div>
  </div>
</template>
