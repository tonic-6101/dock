<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Capture icon in the top bar — opens the capture quick-add panel.
  Only rendered when Repo is installed (checked by DockNavbar).
-->
<script lang="ts">
export default { name: 'DockCaptureIcon' }
</script>

<script setup lang="ts">
import { Camera } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useDockPanels } from '@/composables/useDockPanels'

const { togglePanel, isPanelOpen } = useDockPanels()
</script>

<template>
  <button
    class="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
    :class="isPanelOpen('capture')
      ? 'bg-black/10 dark:bg-white/20 text-[var(--dock-text)]'
      : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
    :title="__('Capture')"
    :aria-label="__('Capture')"
    :aria-expanded="isPanelOpen('capture')"
    @click="togglePanel('capture')"
  >
    <Camera class="w-4 h-4" />
  </button>
</template>
