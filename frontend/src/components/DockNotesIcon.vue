<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockNotesIcon' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { StickyNote } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useDockBoot } from '@/composables/useDockBoot'

const { registeredApps } = useDockBoot()

const notesUrl = computed(() => {
  const path = window.location.pathname
  type App = { route: string }
  const active = (registeredApps.value as App[]).find(a =>
    a.route !== '/dock' && path.startsWith(a.route)
  )
  return active ? `${active.route}/notes` : '/dock/notes'
})
</script>

<template>
  <a
    :href="notesUrl"
    class="flex items-center justify-center w-8 h-8 rounded-md
           text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    :title="__('Notes')"
    :aria-label="__('Notes')"
  >
    <StickyNote class="w-4 h-4" />
  </a>
</template>
