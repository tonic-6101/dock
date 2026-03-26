<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Messages full page — unified communication view (Feature #52).
  In single-channel mode, redirects to that channel's route.
  Multi-channel mode renders tabs with inline page components.
-->
<script lang="ts">
export default { name: 'DockMessagesPage' }
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { __ } from '@/composables/useTranslate'
import { useMessages, type MessageChannel } from '@/composables/useMessages'

const router = useRouter()
const { channels, isSingleChannel, channelUnread } = useMessages()

const activeTab = ref<string>('')

// Single-channel redirect
onMounted(() => {
  if (isSingleChannel.value && channels.value[0]?.route) {
    // Use window.location for full-path routes (avoids router base doubling)
    window.location.replace(channels.value[0].route)
    return
  }
  if (channels.value.length > 0) {
    activeTab.value = channels.value[0].key
  }
})

watch(channels, (chs) => {
  if (chs.length > 0 && !activeTab.value) {
    activeTab.value = chs[0].key
  }
}, { immediate: true })

function navigateToChannel(channel: MessageChannel) {
  if (channel.route) {
    window.location.href = channel.route
  }
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
  <div class="dock-messages-page flex flex-col h-full">
    <header class="flex-shrink-0 px-6 pt-6 pb-4">
      <h1 class="text-xl font-semibold text-[var(--dock-text)]">{{ __('Messages') }}</h1>
    </header>

    <!-- Tab bar (multi-channel only) -->
    <div
      v-if="!isSingleChannel && channels.length > 1"
      role="tablist"
      class="flex-shrink-0 flex border-b border-[var(--dock-border)] px-6"
    >
      <button
        v-for="(channel, idx) in channels"
        :key="channel.key"
        role="tab"
        :aria-selected="activeTab === channel.key"
        :tabindex="activeTab === channel.key ? 0 : -1"
        class="relative px-4 py-2.5 text-sm font-medium transition-colors"
        :class="activeTab === channel.key
          ? 'text-[var(--dock-text)]'
          : 'text-gray-500 hover:text-[var(--dock-text)]'"
        @click="navigateToChannel(channel)"
        @keydown="onTabKeydown($event, idx)"
      >
        {{ __(channel.label) }}
        <span
          v-if="channelUnread(channel.key) > 0"
          class="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1
                 bg-red-500 rounded-full text-[10px] font-bold text-white leading-none"
        >{{ channelUnread(channel.key) > 99 ? '99+' : channelUnread(channel.key) }}</span>
        <span
          v-if="activeTab === channel.key"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--dock-accent)]"
        />
      </button>
    </div>

    <!-- Empty state when no channels -->
    <div v-if="channels.length === 0" class="flex-1 flex items-center justify-center text-gray-500 text-sm">
      {{ __('No communication channels configured.') }}
    </div>
  </div>
</template>
