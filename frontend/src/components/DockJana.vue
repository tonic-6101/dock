<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Jana AI assistant button — only rendered when `jana` is installed.
  Toggles the Jana panel in the Dock panel system.
-->
<script lang="ts">
export default { name: 'DockJana' }
</script>

<script setup lang="ts">
import { BotMessageSquare } from 'lucide-vue-next'
import { useDockPanels } from '@/composables/useDockPanels'
import { __ } from '@/composables/useTranslate'

const { togglePanel, isPanelOpen } = useDockPanels()

function toggle() {
  togglePanel('jana')
}
</script>

<template>
  <button
    class="flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)]
           hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    :class="{ 'bg-black/5 dark:bg-white/10': isPanelOpen('jana') }"
    :aria-label="__('Toggle Jana AI Assistant')"
    :title="__('Jana')"
    :aria-pressed="isPanelOpen('jana')"
    @click="toggle"
  >
    <BotMessageSquare class="w-4 h-4" />
  </button>
</template>
