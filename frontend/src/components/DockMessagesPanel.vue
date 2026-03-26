<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Messages panel — unified communication slide-over (Feature #52).
  Renders channel tabs from dock_message_channels hook.
  Single-channel mode: no tab bar, renders content directly.
-->
<script lang="ts">
export default { name: 'DockMessagesPanel' }
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useDockPanels } from '@/composables/useDockPanels'
import { useMessages } from '@/composables/useMessages'
import DockPanelShell from './DockPanelShell.vue'
import DockDiscussionsPanel from './discussions/DockDiscussionsPanel.vue'

const { closePanel } = useDockPanels()
const { channels, isSingleChannel, channelUnread, messagesUrl } = useMessages()

const activeTab = ref<string>('')

// Set initial active tab
watch(channels, (chs) => {
  if (chs.length > 0 && !activeTab.value) {
    activeTab.value = chs[0].key
  }
}, { immediate: true })

function openFullPage() {
  const channel = channels.value.find(c => c.key === activeTab.value)
  if (channel?.route) {
    window.location.href = channel.route
  }
  closePanel()
}

function onTabKeydown(e: KeyboardEvent, index: number) {
  const tabs = channels.value
  let next = index
  if (e.key === 'ArrowRight') next = (index + 1) % tabs.length
  else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length
  else return
  e.preventDefault()
  activeTab.value = tabs[next].key
  const btn = (e.target as HTMLElement)?.parentElement?.children[next] as HTMLElement
  btn?.focus()
}
</script>

<template>
  <DockPanelShell
    :title="__('Messages')"
    :link="messagesUrl"
    :link-label="__('Full page')"
    @close="closePanel"
  >
    <!-- Tab bar (hidden in single-channel mode) -->
    <div
      v-if="!isSingleChannel"
      role="tablist"
      class="flex border-b border-[var(--dock-border)] px-2"
      style="flex-shrink: 0"
    >
      <button
        v-for="(channel, idx) in channels"
        :key="channel.key"
        role="tab"
        :aria-selected="activeTab === channel.key"
        :tabindex="activeTab === channel.key ? 0 : -1"
        class="relative px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap"
        :class="activeTab === channel.key
          ? 'text-[var(--dock-text)]'
          : 'text-gray-500 hover:text-[var(--dock-text)]'"
        @click="activeTab = channel.key"
        @keydown="onTabKeydown($event, idx)"
      >
        {{ __(channel.label) }}
        <span
          v-if="channelUnread(channel.key) > 0"
          class="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1
                 bg-red-500 rounded-full text-[10px] font-bold text-white leading-none"
        >{{ channelUnread(channel.key) > 99 ? '99+' : channelUnread(channel.key) }}</span>
        <!-- Active indicator -->
        <span
          v-if="activeTab === channel.key"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--dock-accent)]"
        />
      </button>
    </div>

    <!-- Channel content — built-in Discussions rendered directly -->
    <DockDiscussionsPanel
      v-if="activeTab === 'discussions'"
      :close="closePanel"
      :open-full-page="openFullPage"
    />

    <!-- Future: external channel components loaded via defineAsyncComponent -->
  </DockPanelShell>
</template>
