<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Desktop: ghost pill in centre slot — click opens modal.
  Mobile (< md): icon button only.
  Cmd/Ctrl+K opens modal from anywhere in the app.
-->
<script lang="ts">
export default { name: 'DockSearch' }
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { Search } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'

const open = ref(false)
const DockSearchModal = defineAsyncComponent(() => import('./search/DockSearchModal.vue'))

// Cmd/Ctrl+K global shortcut
function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    open.value = true
  }
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <!-- Desktop: expanded ghost pill -->
  <button
    class="dock-search hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md
           bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20
           transition-colors text-[var(--dock-icon)] text-sm min-w-[180px]"
    aria-label="Search"
    @click="open = true"
  >
    <Search class="w-3.5 h-3.5 shrink-0" />
    <span>{{ __('Search...') }}</span>
    <kbd class="ml-auto text-xs bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
  </button>

  <!-- Mobile: icon only -->
  <button
    class="dock-search md:hidden flex items-center justify-center w-8 h-8 rounded-md
           text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    aria-label="Search"
    title="Search"
    @click="open = true"
  >
    <Search class="w-4 h-4" />
  </button>

  <DockSearchModal v-if="open" @close="open = false" />
</template>
