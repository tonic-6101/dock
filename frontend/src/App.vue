<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockApp' }
</script>

<script setup lang="ts">
import DockNavbar from './components/DockNavbar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors">
    <DockNavbar />
    <main class="flex-1 bg-white dark:bg-gray-950">
      <RouterView />
    </main>
  </div>
</template>
