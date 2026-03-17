<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Single row in the "People with access" list.
  Shows avatar, display name, permission summary, and a Remove button.
-->
<script lang="ts">
export default { name: 'DockShareUserRow' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'

export interface ShareEntry {
  name: string        // DocShare name
  user: string
  full_name?: string
  user_image?: string
  read: number
  write: number
  share: number
  submit: number
  everyone?: number
}

const props = defineProps<{
  entry: ShareEntry
  removing?: boolean
}>()
const emit = defineEmits<{ remove: [user: string] }>()

const initials = computed(() => {
  const n = props.entry.full_name || props.entry.user || '?'
  return n.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
})

const permissionSummary = computed(() => {
  const labels: string[] = []
  if (props.entry.read)   labels.push(__('Read'))
  if (props.entry.write)  labels.push(__('Write'))
  if (props.entry.share)  labels.push(__('Share'))
  if (props.entry.submit) labels.push(__('Submit'))
  return labels.join(', ') || __('None')
})
</script>

<template>
  <div class="flex items-center gap-3 py-2.5">
    <!-- Avatar -->
    <div
      class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center
             bg-[var(--dock-accent)]/15 text-[var(--dock-accent)] text-xs font-semibold overflow-hidden"
    >
      <img
        v-if="entry.user_image"
        :src="entry.user_image"
        :alt="entry.full_name || entry.user"
        class="w-8 h-8 object-cover"
      />
      <span v-else>{{ initials }}</span>
    </div>

    <!-- Name + permissions -->
    <div class="flex-1 min-w-0">
      <p class="text-sm text-[var(--dock-text)] truncate">{{ entry.full_name || entry.user }}</p>
      <p class="text-xs text-[var(--dock-icon)] truncate">{{ permissionSummary }}</p>
    </div>

    <!-- Remove -->
    <button
      class="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded text-xs
             text-[var(--dock-icon)] hover:text-red-500 hover:bg-red-500/10
             transition-colors disabled:opacity-40"
      :disabled="removing"
      :aria-label="__('Remove')"
      @click="emit('remove', entry.user)"
    >
      <X class="w-3.5 h-3.5" />
      {{ removing ? '…' : __('Remove') }}
    </button>
  </div>
</template>
