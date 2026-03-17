<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  "Everyone" toggle — maps to the everyone=1 DocShare entry.
  Shown only when 'read' is in the permissions prop.
-->
<script lang="ts">
export default { name: 'DockShareEveryoneToggle' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'

const props = defineProps<{
  doctype: string
  docname: string
  enabled: boolean
}>()
const emit = defineEmits<{ 'update:enabled': [value: boolean] }>()

const toggling = ref(false)

async function toggle() {
  if (toggling.value) return
  toggling.value = true
  try {
    if (!props.enabled) {
      // Enable everyone read
      await callApi('frappe.share.add', {
        doctype: props.doctype,
        name: props.docname,
        user: '',
        everyone: 1,
        read: 1,
      })
      emit('update:enabled', true)
    } else {
      // Disable everyone read
      await callApi('frappe.share.remove', {
        doctype: props.doctype,
        name: props.docname,
        user: '',
      })
      emit('update:enabled', false)
    }
  } catch {
    // silent — optimistic update not applied
  } finally {
    toggling.value = false
  }
}
</script>

<template>
  <div class="flex items-start gap-3 py-2">
    <button
      role="checkbox"
      :aria-checked="enabled"
      class="mt-0.5 w-4 h-4 flex-shrink-0 rounded border border-[var(--dock-border)]
             flex items-center justify-center transition-colors disabled:opacity-50"
      :class="enabled
        ? 'bg-[var(--dock-accent)] border-[var(--dock-accent)]'
        : 'bg-transparent hover:border-[var(--dock-accent)]/50'"
      :disabled="toggling"
      @click="toggle"
    >
      <svg
        v-if="enabled"
        class="w-2.5 h-2.5 text-white"
        viewBox="0 0 10 10"
        fill="none"
      >
        <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div class="flex-1">
      <p class="text-sm font-medium text-[var(--dock-text)] leading-tight">{{ __('Everyone') }}</p>
      <p class="text-xs text-[var(--dock-icon)] mt-0.5">
        <template v-if="enabled">{{ __('All logged-in users can view this document') }}</template>
        <template v-else>{{ __('All logged-in users') }}</template>
      </p>
    </div>
  </div>
</template>
