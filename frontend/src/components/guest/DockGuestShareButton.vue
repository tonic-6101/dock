<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Reusable "Share with client" button for domain apps.
  Opens DockGuestShareDialog on click.
  Hidden when Dock is not installed.

  Usage in domain apps:
    <DockGuestShareButton
      view-id="orga.project_status"
      source-app="orga"
      source-doctype="Orga Project"
      :source-name="project.name"
      :label="project.project_name"
    />
-->
<script lang="ts">
export default { name: 'DockGuestShareButton' }
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Share2 } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useDockBoot } from '@/composables/useDockBoot'
import DockGuestShareDialog from './DockGuestShareDialog.vue'

const props = defineProps<{
  viewId: string
  sourceApp: string
  sourceDoctype: string
  sourceName: string
  label: string
}>()

const { isInstalled, settings } = useDockBoot()
const dialogOpen = ref(false)

const defaultExpiry = computed(() =>
  Number(settings.value?.guest_session_default_expiry_days ?? 30)
)
</script>

<template>
  <template v-if="isInstalled">
    <button
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--dock-border)]
             text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      @click="dialogOpen = true"
    >
      <Share2 class="w-3.5 h-3.5" />
      {{ __('Share with client') }}
    </button>

    <DockGuestShareDialog
      v-if="dialogOpen"
      :view-id="viewId"
      :source-app="sourceApp"
      :source-doctype="sourceDoctype"
      :source-name="sourceName"
      :label="label"
      :default-expiry-days="defaultExpiry"
      @close="dialogOpen = false"
    />
  </template>
</template>
