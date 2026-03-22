<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Shared backdrop for layout-level contextual panels.
  Visible when any panel is open. Click to close.
  Mobile/tablet: dark overlay. Desktop: transparent (click-outside-to-close).
-->
<script lang="ts">
export default { name: 'DockPanelBackdrop' }
</script>

<script setup lang="ts">
defineEmits<{ close: [] }>()
</script>

<template>
  <div
    class="dock-panel-backdrop"
    aria-hidden="true"
    @click="$emit('close')"
  />
</template>

<style scoped>
.dock-panel-backdrop {
  position: fixed;
  inset: 0;
  top: 3.5rem; /* below navbar */
  z-index: 20;
  background: rgba(0, 0, 0, 0.3);
  animation: dock-backdrop-fade-in 150ms ease-out;
}

@keyframes dock-backdrop-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Desktop: transparent backdrop — still catches clicks to close panel */
@media (min-width: 1024px) {
  .dock-panel-backdrop {
    background: transparent;
    animation: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dock-panel-backdrop {
    animation: none;
  }
}
</style>
