<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Messages icon in the top bar — opens the Messages panel (Feature #52).
  Replaces DockDiscussionsIcon. Shows combined unread badge across all
  registered message channels (dock_message_channels hook).
-->
<script lang="ts">
export default { name: 'DockMessagesIcon' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { MessageSquare } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useDockPanels } from '@/composables/useDockPanels'
import { useMessages } from '@/composables/useMessages'

const { togglePanel, isPanelOpen } = useDockPanels()
const { totalUnread } = useMessages()

const badgeLabel = computed(() => (totalUnread.value > 99 ? '99+' : String(totalUnread.value)))

const ariaLabel = computed(() =>
  totalUnread.value > 0
    ? `${__('Messages')}, ${totalUnread.value} ${__('unread')}`
    : __('Messages')
)
</script>

<template>
  <button
    class="relative flex items-center justify-center w-8 h-8 rounded-md transition-colors"
    :class="isPanelOpen('messages')
      ? 'bg-black/10 dark:bg-white/20 text-[var(--dock-text)]'
      : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
    :title="__('Messages')"
    :aria-label="ariaLabel"
    :aria-expanded="isPanelOpen('messages')"
    @click="togglePanel('messages')"
  >
    <MessageSquare class="w-4 h-4" />
    <span
      v-if="totalUnread > 0"
      class="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1
             bg-red-500 rounded-full text-[10px] font-bold text-white
             flex items-center justify-center leading-none"
    >{{ badgeLabel }}</span>
  </button>
</template>
