<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  DEPRECATED v0.3.0: Use DockMessagesIcon instead. Will be removed in v0.4.0.

  Discussions icon in the top bar — navigates to the discussions shared page
  in the current app context (e.g. /orga/discussions) or /dock/discussions.
  Shows unread badge seeded from boot data.
-->
<script lang="ts">
export default { name: 'DockDiscussionsIcon' }
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MessageSquare } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useDockBoot } from '@/composables/useDockBoot'

const { registeredApps } = useDockBoot()

const boot = (window as any).frappe?.boot?.dock ?? (window as any).dockBoot
const unread = ref<number>(boot?.unread_discussions ?? 0)

const badgeLabel = computed(() => (unread.value > 99 ? '99+' : String(unread.value)))

const discussionsUrl = computed(() => {
  const path = window.location.pathname
  type App = { route: string }
  const active = (registeredApps.value as App[]).find(a =>
    a.route !== '/dock' && path.startsWith(a.route)
  )
  return active ? `${active.route}/discussions` : '/dock/discussions'
})
</script>

<template>
  <a
    :href="discussionsUrl"
    class="relative flex items-center justify-center w-8 h-8 rounded-md
           text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    :title="__('Discussions')"
    :aria-label="unread > 0 ? `${__('Discussions')}, ${unread} ${__('unread')}` : __('Discussions')"
  >
    <MessageSquare class="w-4 h-4" />
    <span
      v-if="unread > 0"
      class="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1
             bg-red-500 rounded-full text-[10px] font-bold text-white
             flex items-center justify-center leading-none"
    >{{ badgeLabel }}</span>
  </a>
</template>
