<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  DockJanaPanel — hosts the Jana AI chat widget inside DockPanelShell.

  On mount, dispatches `dock:jana-panel-mount` with the container element.
  Jana's bundle listens for this and mounts an embedded widget instance.
  On unmount, dispatches `dock:jana-panel-unmount` so Jana can clean up.
-->
<script lang="ts">
export default { name: 'DockJanaPanel' }
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import DockPanelShell from './DockPanelShell.vue'
import { useDockPanels } from '@/composables/useDockPanels'

const { closePanel } = useDockPanels()
const containerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (containerRef.value) {
    document.dispatchEvent(new CustomEvent('dock:jana-panel-mount', {
      detail: { container: containerRef.value },
    }))
  }
})

onUnmounted(() => {
  document.dispatchEvent(new CustomEvent('dock:jana-panel-unmount'))
})
</script>

<template>
  <DockPanelShell title="Jana" link="/jana" link-label="Full page" @close="closePanel">
    <div ref="containerRef" style="display: flex; flex-direction: column; height: 100%" />
  </DockPanelShell>
</template>
