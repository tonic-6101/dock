<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockReactionBar' }
</script>

<script setup lang="ts">
import { onMounted } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useReactions } from '@/composables/useReactions'

const props = defineProps<{
  referenceDoctype: string
  referenceName: string
  compact?: boolean
}>()

const { summary, load, toggle } = useReactions(props.referenceDoctype, props.referenceName)

const REACTIONS = [
  { key: 'acknowledge' as const, emoji: '\uD83D\uDC4D', label: 'Acknowledge' },
  { key: 'celebrate' as const, emoji: '\uD83C\uDF89', label: 'Celebrate' },
  { key: 'seen' as const, emoji: '\uD83D\uDC40', label: 'Seen' },
  { key: 'flag' as const, emoji: '\uD83D\uDEA9', label: 'Flag' },
]

onMounted(load)
</script>

<template>
  <div class="flex gap-1">
    <button
      v-for="r in REACTIONS"
      :key="r.key"
      class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border transition-colors"
      :class="summary[r.key].current_user
        ? 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20'
        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'"
      :title="__(r.label)"
      @click="toggle(r.key)"
    >
      <span>{{ r.emoji }}</span>
      <span v-if="summary[r.key].count" class="text-gray-600 dark:text-gray-400">
        {{ summary[r.key].count }}
      </span>
    </button>
  </div>
</template>
