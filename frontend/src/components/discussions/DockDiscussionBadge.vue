<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockDiscussionBadge' }
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useDiscussions } from '@/composables/useDiscussions'

const props = defineProps<{
  referenceDoctype: string
  referenceName: string
}>()

const { getRecordDiscussions } = useDiscussions()
const count = ref(0)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const discussions = await getRecordDiscussions(
      props.referenceDoctype,
      props.referenceName,
      0,
    )
    count.value = discussions.length
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <router-link
    v-if="count > 0"
    :to="`/discussions?ref_doctype=${referenceDoctype}&ref_name=${referenceName}`"
    class="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full
           bg-blue-50 text-blue-700 hover:bg-blue-100
           dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50
           transition-colors"
    :title="__('Discussions')"
  >
    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
    <span>{{ count }}</span>
  </router-link>
</template>
