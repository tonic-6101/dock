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
import { ref, computed, watch, defineAsyncComponent, type Component, shallowRef } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useDockPanels } from '@/composables/useDockPanels'
import { useMessages } from '@/composables/useMessages'
import DockPanelShell from './DockPanelShell.vue'
import DockDiscussionsPanel from './discussions/DockDiscussionsPanel.vue'

const { closePanel } = useDockPanels()
const { channels, isSingleChannel, channelUnread, messagesUrl } = useMessages()

/** Registry of built-in panel components. External apps register via dock_message_channels hook. */
const builtinPanels: Record<string, Component> = {
  DockDiscussionsPanel,
}

/** Cache for dynamically loaded external channel components. */
const asyncPanelCache: Record<string, Component> = {}

/** Resolve the panel component for a channel — built-in or async-loaded from app bundle. */
function resolvePanelComponent(channel: { key: string; panel_component?: string; app?: string }): Component | null {
  if (!channel.panel_component) return null
  // Built-in component
  if (builtinPanels[channel.panel_component]) return builtinPanels[channel.panel_component]
  // Cached async component
  const cacheKey = `${channel.app}/${channel.panel_component}`
  if (asyncPanelCache[cacheKey]) return asyncPanelCache[cacheKey]
  // Load from app's ESM bundle (convention: /assets/{app}/js/{app}-messages.esm.js)
  const comp = defineAsyncComponent(() =>
    import(/* @vite-ignore */ `/assets/${channel.app}/js/${channel.app}-messages.esm.js`)
      .then(mod => mod[channel.panel_component!] ?? mod.default)
  )
  asyncPanelCache[cacheKey] = comp
  return comp
}

/** Active panel component for the current tab. */
const activePanelComponent = computed(() => {
  const channel = channels.value.find(c => c.key === activeTab.value)
  if (!channel) return null
  return resolvePanelComponent(channel)
})

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

    <!-- Channel content — resolved dynamically from built-in or external bundles -->
    <component
      v-if="activePanelComponent"
      :is="activePanelComponent"
      :close="closePanel"
      :open-full-page="openFullPage"
    />

    <!-- Fallback when channel has no panel_component -->
    <div
      v-else-if="activeTab"
      class="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center"
    >
      <p class="text-sm text-gray-500">{{ __('Open the full page to view this channel.') }}</p>
      <button
        class="text-sm font-medium text-[var(--dock-accent)] hover:underline"
        @click="openFullPage"
      >{{ __('Open full page') }}</button>
    </div>
  </DockPanelShell>
</template>
