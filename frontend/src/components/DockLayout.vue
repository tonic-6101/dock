<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  DockLayout — wrapper component for domain apps.

  Provides the DockNavbar + full-height layout shell. Domain apps wrap their
  root template in <DockLayout> and never think about the top bar again.

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
import DockNavbar from './DockNavbar.vue'
</script>

<template>
  <div class="dock-layout flex flex-col h-screen overflow-hidden transition-colors">
    <DockNavbar />
    <div class="flex flex-1 min-w-0 overflow-hidden">
      <slot />
    </div>
  </div>
</template>
