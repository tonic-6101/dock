<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Collapsible cross-app context panel for a contact detail view.
  Rendered once per app that returned data from dock_people_context.
-->
<script lang="ts">
export default { name: 'DockPersonContextPanel' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, ExternalLink } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'

interface ContextField {
  label: string
  value: string
}

interface ContextPanel {
  app: string
  label: string
  icon?: string
  link?: string
  fields?: ContextField[]
}

defineProps<{ panel: ContextPanel }>()

const open = ref(true)
</script>

<template>
  <div class="border border-[var(--dock-border)] rounded-lg overflow-hidden">
    <!-- Header -->
    <button
      class="w-full flex items-center gap-2 px-4 py-3 text-left
             hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
      @click="open = !open"
    >
      <span class="flex-1 text-sm font-medium text-[var(--dock-text)]">{{ panel.label }}</span>
      <span class="text-[10px] text-[var(--dock-icon)] capitalize mr-1">{{ panel.app }}</span>
      <ChevronDown
        class="w-4 h-4 text-[var(--dock-icon)] transition-transform duration-200"
        :class="open ? '' : '-rotate-90'"
      />
    </button>

    <!-- Body -->
    <div v-if="open" class="border-t border-[var(--dock-border)]">
      <dl v-if="panel.fields && panel.fields.length" class="divide-y divide-[var(--dock-border)]">
        <div
          v-for="field in panel.fields"
          :key="field.label"
          class="flex items-center gap-2 px-4 py-2.5"
        >
          <dt class="w-28 flex-shrink-0 text-xs text-[var(--dock-icon)]">{{ field.label }}</dt>
          <dd class="flex-1 text-sm text-[var(--dock-text)] truncate">{{ field.value }}</dd>
        </div>
      </dl>

      <div v-if="panel.link" class="px-4 py-3 border-t border-[var(--dock-border)]">
        <a
          :href="panel.link"
          class="inline-flex items-center gap-1 text-xs text-[var(--dock-accent)] hover:underline"
        >
          {{ __('Open in') }} <span class="capitalize">{{ panel.app }}</span>
          <ExternalLink class="w-3 h-3" />
        </a>
      </div>
    </div>
  </div>
</template>
