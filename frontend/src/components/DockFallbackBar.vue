<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Minimal fallback bar shown when DockNavbar crashes (error boundary).
  Must have zero dependencies on Dock state or composables.
-->
<script lang="ts">
export default { name: 'DockFallbackBar' }
</script>

<template>
  <div
    role="banner"
    class="dock-fallback-bar h-14 sticky top-0 z-50 flex items-center px-4
           bg-[var(--dock-bg)] border-b border-[var(--dock-border)] text-[var(--dock-text)] text-sm"
  >
    <span class="opacity-60">Dock</span>
  </div>
</template>
