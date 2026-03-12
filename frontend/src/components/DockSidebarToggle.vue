<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Sidebar toggle button — emits 'toggle' for the active domain app to handle.
  Uses Lucide Menu icon.
-->
<script lang="ts">
export default { name: 'DockSidebarToggle' }
</script>

<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
</script>

<template>
  <button
    class="flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)]
           hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    aria-label="Toggle sidebar"
    title="Toggle sidebar"
    @click="$emit('toggle')"
  >
    <Menu class="w-5 h-5" />
  </button>
</template>
