<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockNotificationLoading' }
</script>

<template>
  <div class="py-1">
    <div v-for="i in 3" :key="i" class="px-3 py-2.5 flex gap-3 items-start animate-pulse">
      <div class="w-4 h-4 rounded bg-black/10 dark:bg-white/10 mt-0.5 shrink-0" />
      <div class="flex-1 space-y-1.5">
        <div class="h-3 rounded bg-black/10 dark:bg-white/10 w-3/4" />
        <div class="h-2.5 rounded bg-black/10 dark:bg-white/10 w-1/2" />
      </div>
    </div>
  </div>
</template>
