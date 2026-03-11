<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockSearchLoading' }
</script>

<template>
  <div class="py-2 px-3 space-y-2">
    <div v-for="i in 4" :key="i" class="flex gap-3 items-center animate-pulse">
      <div class="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10 shrink-0" />
      <div class="flex-1 h-3 rounded bg-black/10 dark:bg-white/10" :style="{ width: `${60 + i * 8}%` }" />
      <div class="w-12 h-2.5 rounded bg-black/10 dark:bg-white/10 shrink-0" />
    </div>
  </div>
</template>
