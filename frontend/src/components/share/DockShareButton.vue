<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Reusable share button for domain apps.
  Opens DockShareDrawer on click.

  Usage in domain apps:
    import { DockShareButton } from '@tonic/dock-ui'

    <DockShareButton
      doctype="Tender"
      docname="TDR-0042"
      :permissions="['read', 'write']"
      @shared="onShared"
    />
-->
<script lang="ts">
export default { name: 'DockShareButton' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Share2 } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import DockShareDrawer from './DockShareDrawer.vue'

type Permission = 'read' | 'write' | 'share' | 'submit'
type Variant    = 'default' | 'ghost' | 'minimal'

const props = withDefaults(defineProps<{
  doctype:     string
  docname:     string
  permissions?: Permission[]
  label?:      string
  variant?:    Variant
}>(), {
  permissions: () => ['read', 'write', 'share', 'submit'] as Permission[],
  label:       'Share',
  variant:     'default',
})

const emit = defineEmits<{
  shared:  [payload: { user: string; permissions: Record<string, number> }]
  removed: [payload: { user: string }]
}>()

const drawerOpen = ref(false)

const buttonClass = {
  default: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
            bg-[var(--dock-accent)] text-white text-sm font-medium
            hover:opacity-90 transition-opacity`,
  ghost:   `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
            border border-[var(--dock-border)] text-sm text-[var(--dock-text)]
            hover:bg-black/5 dark:hover:bg-white/10 transition-colors`,
  minimal: `inline-flex items-center gap-1 text-sm text-[var(--dock-icon)]
            hover:text-[var(--dock-text)] transition-colors`,
}
</script>

<template>
  <button
    :class="buttonClass[variant]"
    @click="drawerOpen = true"
  >
    <Share2 class="w-3.5 h-3.5" />
    {{ __(label) }}
  </button>

  <DockShareDrawer
    v-if="drawerOpen"
    :doctype="doctype"
    :docname="docname"
    :permissions="permissions"
    @close="drawerOpen = false"
    @shared="emit('shared', $event)"
    @removed="emit('removed', $event)"
  />
</template>
