<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Per-record activity feed for the contextual panel.
  Shows Version changes + linked discussions for a single record.
-->
<script lang="ts">
export default { name: 'DockActivityRecordFeed' }
</script>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'

const props = defineProps<{
  referenceDoctype: string
  referenceName: string
}>()

interface RecordActivityItem {
  type: string
  user: string
  user_fullname: string
  timestamp: string
  field_changes?: { field: string; old: string; new: string }[]
  name?: string
  title?: string
  discussion_type?: string
  status?: string
  reply_count?: number
}

const items = ref<RecordActivityItem[]>([])
const loading = ref(false)

async function load() {
  loading.value = true
  try {
    const res = await callApi<{ items: RecordActivityItem[] }>(
      'dock.api.activity.get_record_activity',
      { reference_doctype: props.referenceDoctype, reference_name: props.referenceName },
    )
    items.value = res.items
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => props.referenceName, load)

function formatTime(ts: string): string {
  const d = new Date(ts)
  const now = new Date()
  const diffMin = Math.floor((now.getTime() - d.getTime()) / 60000)
  if (diffMin < 1) return __('just now')
  if (diffMin < 60) return `${diffMin}m`
  const diffHrs = Math.floor(diffMin / 60)
  if (diffHrs < 24) return `${diffHrs}h`
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
</script>

<template>
  <div>
    <div v-if="loading" class="py-6 text-center text-sm" style="color: var(--dock-icon, #9ca3af)">
      {{ __('Loading...') }}
    </div>

    <div v-else-if="!items.length" class="py-6 text-center text-sm" style="color: var(--dock-icon, #9ca3af)">
      {{ __('No activity recorded') }}
    </div>

    <div v-else class="space-y-2">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="flex gap-2 py-2 text-xs"
        style="border-bottom: 1px solid var(--dock-border, #e5e7eb)"
      >
        <div class="flex-1 min-w-0">
          <span style="font-weight: 600; color: var(--dock-text, #111827)">
            {{ item.user_fullname }}
          </span>

          <!-- Discussion -->
          <template v-if="item.type === 'discussion'">
            <span style="color: var(--dock-icon, #9ca3af)"> {{ __('started discussion') }} </span>
            <span style="font-weight: 500; color: var(--dock-text, #111827)">{{ item.title }}</span>
            <span
              v-if="item.reply_count"
              style="color: var(--dock-icon, #9ca3af); margin-left: 0.25rem"
            >
              ({{ item.reply_count }} {{ __('replies') }})
            </span>
          </template>

          <!-- Field changes -->
          <template v-else-if="item.field_changes?.length">
            <span style="color: var(--dock-icon, #9ca3af)"> {{ __('changed') }} </span>
            <div class="mt-1 space-y-0.5">
              <div v-for="(fc, j) in item.field_changes.slice(0, 3)" :key="j" style="color: var(--dock-icon, #6b7280)">
                <span style="font-weight: 500">{{ fc.field }}</span>:
                <span style="text-decoration: line-through; color: #f87171">{{ fc.old || __('(empty)') }}</span>
                &rarr; <span style="color: #22c55e">{{ fc.new || __('(empty)') }}</span>
              </div>
            </div>
          </template>

          <!-- Insert / generic update -->
          <template v-else>
            <span style="color: var(--dock-icon, #9ca3af)">
              {{ item.type === 'insert' ? __('created this record') : __('updated this record') }}
            </span>
          </template>
        </div>
        <span style="color: var(--dock-icon, #9ca3af); white-space: nowrap">{{ formatTime(item.timestamp) }}</span>
      </div>
    </div>
  </div>
</template>
