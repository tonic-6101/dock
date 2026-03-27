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
import { ref, computed, watch, onMounted, defineAsyncComponent, type Component } from 'vue'
import { useRouter } from 'vue-router'
import { __ } from '@/composables/useTranslate'
import { useMessages, type MessageChannel } from '@/composables/useMessages'

const router = useRouter()
const { channels, isSingleChannel, channelUnread } = useMessages()

const activeTab = ref<string>('')

// Single-channel redirect
onMounted(() => {
  if (isSingleChannel.value && channels.value[0]?.route) {
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

/** Cache for dynamically loaded external channel page components. */
const asyncPageCache: Record<string, Component> = {}

/** Resolve the page component for a channel — async-loaded from app bundle. */
function resolvePageComponent(channel: MessageChannel): Component | null {
  if (!channel.page_component) return null
  const cacheKey = `${channel.app}/${channel.page_component}`
  if (asyncPageCache[cacheKey]) return asyncPageCache[cacheKey]
  const comp = defineAsyncComponent(() =>
    import(/* @vite-ignore */ `/assets/${channel.app}/js/${channel.app}-messages.esm.js`)
      .then(mod => mod[channel.page_component!] ?? mod.default)
  )
  asyncPageCache[cacheKey] = comp
  return comp
}

/** Active page component for the current tab. */
const activePageComponent = computed(() => {
  const channel = channels.value.find(c => c.key === activeTab.value)
  if (!channel) return null
  return resolvePageComponent(channel)
})

/** Active channel object. */
const activeChannel = computed(() =>
  channels.value.find(c => c.key === activeTab.value) ?? null
)

function selectTab(channel: MessageChannel) {
  activeTab.value = channel.key
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
        @click="selectTab(channel)"
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

    <!-- Channel content — rendered inline when page_component is available -->
    <div v-if="activePageComponent" class="flex-1 overflow-auto">
      <component :is="activePageComponent" />
    </div>

    <!-- Fallback: channel without page_component — show link to channel route -->
    <div
      v-else-if="activeChannel && activeChannel.route"
      class="flex-1 flex flex-col items-center justify-center gap-4 text-center"
    >
      <p class="text-sm text-gray-500">{{ __('This channel opens in its own page.') }}</p>
      <a
        :href="activeChannel.route"
        class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium
               text-white bg-[var(--dock-accent)] rounded-lg hover:opacity-90 transition-opacity"
      >{{ __(activeChannel.label) }}</a>
    </div>

    <!-- Empty state when no channels -->
    <div v-else-if="channels.length === 0" class="flex-1 flex items-center justify-center text-gray-500 text-sm">
      {{ __('No communication channels configured.') }}
    </div>
  </div>
</template>
