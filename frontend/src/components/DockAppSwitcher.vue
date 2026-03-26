<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  App switcher trigger button — toggles the DockAppsPanel via useDockPanels.
  The actual panel content lives in DockAppsPanel.vue, rendered by DockLayout.
-->
<script lang="ts">
export default { name: 'DockAppSwitcher' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Grip } from 'lucide-vue-next'
import { useDockPanels } from '@/composables/useDockPanels'
import { __ } from '@/composables/useTranslate'

const { togglePanel, isPanelOpen } = useDockPanels()

const isOpen = computed(() => isPanelOpen('apps'))
</script>

<template>
  <button
    class="flex items-center justify-center w-8 h-8 rounded-md
           text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    :class="{ 'bg-black/5 dark:bg-white/10': isOpen }"
    :aria-expanded="isOpen"
    aria-haspopup="true"
    :aria-label="__('Open app switcher')"
    :title="__('App switcher')"
    @click="togglePanel('apps')"
  >
    <Grip class="w-4 h-4" />
  </button>
</template>
