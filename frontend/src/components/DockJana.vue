<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Jana chat button — only rendered when `jana` is installed.
  Uses Lucide MessageCircle icon.
-->
<script lang="ts">
export default { name: 'DockJana' }
</script>

<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'
</script>

<template>
  <button
    class="flex items-center justify-center w-8 h-8 rounded-md text-[var(--dock-icon)]
           hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    aria-label="Jana"
    title="Jana"
    @click="$emit('open')"
  >
    <MessageCircle class="w-4 h-4" />
  </button>
</template>
