<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Notes icon in the top bar — opens the notes panel for quick capture.
  The full notes page lives at /dock/notes (or /orga/notes via shared routes).
-->
<script lang="ts">
export default { name: 'DockNotesIcon' }
</script>

<script setup lang="ts">
import { StickyNote } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useDockPanels } from '@/composables/useDockPanels'

const { togglePanel, isPanelOpen } = useDockPanels()
</script>

<template>
  <button
    class="flex items-center justify-center w-8 h-8 rounded-md transition-colors"
    :class="isPanelOpen('notes')
      ? 'bg-black/10 dark:bg-white/20 text-[var(--dock-text)]'
      : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10'"
    :title="__('Notes')"
    :aria-label="__('Notes')"
    :aria-expanded="isPanelOpen('notes')"
    @click="togglePanel('notes')"
  >
    <StickyNote class="w-4 h-4" />
  </button>
</template>
