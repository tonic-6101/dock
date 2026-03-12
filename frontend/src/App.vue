<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockApp' }
</script>

<script setup lang="ts">
import DockNavbar from './components/DockNavbar.vue'
import DockSidebar from './components/DockSidebar.vue'
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors">
    <!-- Top bar — full width -->
    <DockNavbar />

    <!-- Below top bar: sidebar + page content -->
    <div class="flex flex-1 min-w-0 overflow-hidden">
      <DockSidebar />
      <main class="flex-1 overflow-y-auto bg-white dark:bg-gray-950">
        <RouterView />
      </main>
    </div>
  </div>
</template>
