<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Lightweight panel host for /desk pages where DockLayout is not available.
  Renders the same panel system that DockLayout provides, but as a standalone
  component mounted from main.ts alongside DockNavbar.
-->
<script lang="ts">
export default { name: 'DockDeskPanels' }
</script>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useDockPanels } from '@/composables/useDockPanels'

const DockPanelBackdrop = defineAsyncComponent(() => import('./DockPanelBackdrop.vue'))
const DockTimerPanel = defineAsyncComponent(() => import('./DockTimerPanel.vue'))
const DockContextPanel = defineAsyncComponent(() => import('./DockContextPanel.vue'))
const DockNotesPanel = defineAsyncComponent(() => import('./DockNotesPanel.vue'))
const DockJanaPanel = defineAsyncComponent(() => import('./DockJanaPanel.vue'))
const DockTasksPanel = defineAsyncComponent(() => import('./DockTasksPanel.vue'))
const DockCapturePanel = defineAsyncComponent(() => import('./DockCapturePanel.vue'))
const DockAccountPanel = defineAsyncComponent(() => import('./DockAccountPanel.vue'))
const DockMessagesPanel = defineAsyncComponent(() => import('./DockMessagesPanel.vue'))
const DockAppsPanel = defineAsyncComponent(() => import('./DockAppsPanel.vue'))

const { activePanel, closePanel } = useDockPanels()
</script>

<template>
  <DockPanelBackdrop v-if="activePanel" @close="closePanel" />
  <DockTimerPanel v-if="activePanel === 'timer'" />
  <DockContextPanel v-if="activePanel === 'context'" />
  <DockNotesPanel v-if="activePanel === 'notes'" />
  <DockJanaPanel v-if="activePanel === 'jana'" />
  <DockTasksPanel v-if="activePanel === 'tasks'" />
  <DockCapturePanel v-if="activePanel === 'capture'" />
  <DockAccountPanel v-if="activePanel === 'account'" />
  <DockMessagesPanel v-if="activePanel === 'messages'" />
  <DockAppsPanel v-if="activePanel === 'apps'" />
</template>
