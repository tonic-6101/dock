<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Guest Portal shell — site name header + "Powered by Tonic" footer.
  Wraps domain app content (slot).
-->
<script lang="ts">
export default { name: 'DockGuestShell' }
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  siteLabel: string
  privacyPolicyUrl?: string
}>()

const siteName = computed(() => props.siteLabel || window.location.hostname)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[var(--dock-bg)] text-[var(--dock-text)]">
    <!-- Header -->
    <header class="border-b border-[var(--dock-border)] px-6 py-4">
      <span class="text-base font-semibold text-[var(--dock-text)]">{{ siteName }}</span>
    </header>

    <!-- Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-[var(--dock-border)] px-6 py-3 text-xs text-[var(--dock-icon)] flex items-center gap-3">
      <span>Powered by Tonic</span>
      <template v-if="privacyPolicyUrl">
        <span>·</span>
        <a
          :href="privacyPolicyUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-[var(--dock-text)] transition-colors"
        >Privacy Policy</a>
      </template>
    </footer>
  </div>
</template>
