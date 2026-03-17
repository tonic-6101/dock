<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Ghost pill trigger for Global Search.
  Desktop: [🔍  Search...  ⌘K] pill — not a real input, clicks open the modal.
  Mobile (< md): icon button.
  Cmd/Ctrl+K from anywhere opens the modal.
  Focus returns to the pill when modal closes.
-->
<script lang="ts">
export default { name: 'DockSearch' }
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { Search } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'

const DockSearchModal = defineAsyncComponent(() => import('./search/DockSearchModal.vue'))

const pillRef = ref<HTMLButtonElement | null>(null)
const isOpen  = ref(false)

const isMac = navigator.platform.toUpperCase().includes('MAC')

function open() { isOpen.value = true }
function close() { isOpen.value = false; pillRef.value?.focus() }

function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    open()
  }
}

onMounted(() => document.addEventListener('keydown', onGlobalKeydown))
onUnmounted(() => document.removeEventListener('keydown', onGlobalKeydown))
</script>

<template>
  <!-- Desktop ghost pill -->
  <button
    ref="pillRef"
    class="dock-search hidden md:flex items-center gap-2 h-8 px-3 min-w-44
           rounded-lg border border-[var(--dock-border)]
           bg-black/[0.02] dark:bg-white/[0.02]
           text-[var(--dock-icon)] hover:border-[var(--dock-accent)]/40
           hover:bg-[var(--dock-accent)]/5 transition-all cursor-text"
    :aria-label="__('Open search')"
    :title="`${__('Search')} (${isMac ? '⌘K' : 'Ctrl+K'})`"
    @click="open"
  >
    <Search class="w-3.5 h-3.5 shrink-0" />
    <span class="flex-1 text-sm text-left">{{ __('Search...') }}</span>
    <kbd
      class="hidden lg:inline text-[10px] font-sans bg-black/5 dark:bg-white/10
             px-1.5 py-0.5 rounded shrink-0"
    >{{ isMac ? '⌘K' : 'Ctrl+K' }}</kbd>
  </button>

  <!-- Mobile icon button -->
  <button
    class="dock-search md:hidden flex items-center justify-center w-8 h-8 rounded-md
           text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    :aria-label="__('Search')"
    @click="open"
  >
    <Search class="w-4 h-4" />
  </button>

  <!-- Shared modal — teleported to <body> -->
  <DockSearchModal v-if="isOpen" :return-focus-el="pillRef" @close="close" />
</template>
