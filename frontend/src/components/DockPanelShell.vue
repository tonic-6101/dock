<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Reusable shell for layout-level contextual panels.

  Provides consistent chrome: header (title, optional link, close button),
  fixed right positioning, slide animation, focus trap, Escape to close.
  Click-outside-to-close is handled by DockPanelBackdrop (transparent on desktop).

  Usage:
    <DockPanelShell title="Watch" link="/watch" link-label="Full page" @close="closePanel">
      <template #default>
        ... panel content ...
      </template>
    </DockPanelShell>
-->
<script lang="ts">
export default { name: 'DockPanelShell' }
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { X, ExternalLink } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'

const props = defineProps<{
  title: string
  link?: string
  linkLabel?: string
  ariaLabel?: string
}>()

const emit = defineEmits<{ close: [] }>()

const panelRef = ref<HTMLElement | null>(null)

// Inline styles — immune to scoped CSS / ESM cascade issues
const shellStyle = {
  position: 'fixed' as const,
  top: '3.5rem',
  right: '0',
  width: '24rem',
  maxWidth: '100vw',
  height: 'calc(100vh - 3.5rem)',
  zIndex: '30',
  display: 'flex',
  flexDirection: 'column' as const,
  background: 'var(--dock-bg)',
  borderLeft: '1px solid var(--dock-border)',
  boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.08)',
}

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.75rem 1rem',
  borderBottom: '1px solid var(--dock-border)',
  flexShrink: '0',
}

const titleStyle = {
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'var(--dock-text)',
}

const headerActionsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}

const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  fontSize: '0.75rem',
  color: 'var(--dock-icon)',
  textDecoration: 'none',
}

const closeBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem',
  borderRadius: '0.375rem',
  border: 'none',
  background: 'none',
  color: 'var(--dock-icon)',
  cursor: 'pointer',
}

const contentStyle = {
  flex: '1',
  overflowY: 'auto' as const,
  overflowX: 'hidden' as const,
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
    return
  }
  // Focus trap: Tab cycles within the panel
  if (e.key === 'Tab' && panelRef.value) {
    const focusable = panelRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  nextTick(() => {
    const focusable = panelRef.value?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    focusable?.focus()
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <aside
    ref="panelRef"
    role="complementary"
    :aria-label="ariaLabel || title"
    :style="shellStyle"
  >
    <!-- Header -->
    <div :style="headerStyle">
      <span :style="titleStyle">{{ __(title) }}</span>
      <div :style="headerActionsStyle">
        <a
          v-if="link"
          :href="link"
          :style="linkStyle"
          class="dock-panel-link"
        >
          {{ __(linkLabel || 'Full page') }}
          <ExternalLink class="w-3 h-3" />
        </a>
        <button
          :aria-label="__('Close')"
          :style="closeBtnStyle"
          class="dock-panel-close"
          @click="emit('close')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Content -->
    <div :style="contentStyle">
      <slot />
    </div>
  </aside>
</template>

<style>
/* Hover states — cannot be inline, but unscoped so they always apply */
.dock-panel-link:hover {
  color: var(--dock-accent) !important;
}
.dock-panel-close:hover {
  color: var(--dock-text) !important;
  background: color-mix(in srgb, var(--dock-text) 8%, transparent);
}
</style>
