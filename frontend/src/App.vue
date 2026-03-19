<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockApp' }
</script>

<script setup lang="ts">
import DockLayout from './components/DockLayout.vue'
import DockSidebar from './components/DockSidebar.vue'
</script>

<template>
  <DockLayout>
    <DockSidebar />
    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>
  </DockLayout>
</template>
