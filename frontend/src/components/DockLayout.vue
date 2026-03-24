<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  DockLayout — wrapper component for domain apps.

  Provides the DockNavbar + full-height layout shell + contextual panels.
  Domain apps wrap their root template in <DockLayout> and never think
  about the top bar or panel system again.

  Usage (in any domain app's App.vue):

    import { DockLayout } from '/assets/dock/js/dock-navbar.esm.js'

    <DockLayout>
      <RouterView />
    </DockLayout>
-->
<script lang="ts">
export default { name: 'DockLayout' }
</script>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useDockPanels } from '@/composables/useDockPanels'
import DockNavbar from './DockNavbar.vue'

const DockPanelBackdrop = defineAsyncComponent(() => import('./DockPanelBackdrop.vue'))
const DockTimerPanel = defineAsyncComponent(() => import('./DockTimerPanel.vue'))
const DockContextPanel = defineAsyncComponent(() => import('./DockContextPanel.vue'))
const DockNotesPanel = defineAsyncComponent(() => import('./DockNotesPanel.vue'))
const DockJanaPanel = defineAsyncComponent(() => import('./DockJanaPanel.vue'))

const { activePanel, closePanel } = useDockPanels()
</script>

<template>
  <div class="dock-layout flex flex-col h-screen transition-colors">
    <DockNavbar />
    <div class="flex flex-1 min-w-0 overflow-hidden">
      <slot />

      <!-- Contextual panel overlay -->
      <DockPanelBackdrop v-if="activePanel" @close="closePanel" />
      <DockTimerPanel v-if="activePanel === 'timer'" />
      <DockContextPanel v-if="activePanel === 'context'" />
      <DockNotesPanel v-if="activePanel === 'notes'" />
      <DockJanaPanel v-if="activePanel === 'jana'" />
    </div>
  </div>
</template>
