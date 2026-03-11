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
  <div class="flex flex-col min-h-screen">
    <DockNavbar />
    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>
