<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Sticky section header for grouped search results.
  See ecosystem spec: search.md §7
-->
<script lang="ts">
export default { name: 'DockSearchSectionHeader' }
</script>

<script setup lang="ts">
import { __ } from '@/composables/useTranslate'

defineProps<{
  label: string
  count: number
}>()
</script>

<template>
  <div
    class="flex items-center gap-2 px-4 py-2 sticky top-0
           bg-[var(--dock-bg)]/95 backdrop-blur-sm
           border-b border-[var(--dock-border)]/50"
    role="presentation"
  >
    <span class="text-[11px] font-semibold uppercase tracking-widest text-[var(--dock-icon)]">
      {{ __(label) }}
    </span>
    <span class="ml-auto text-[10px] text-[var(--dock-icon)]/60">
      {{ count }}
    </span>
  </div>
</template>
