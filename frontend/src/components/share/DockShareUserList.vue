<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  "People with access" section — lists current DocShare entries.
  Handles remove API call; emits removed so parent can sync state.
-->
<script lang="ts">
export default { name: 'DockShareUserList' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import DockShareUserRow, { type ShareEntry } from './DockShareUserRow.vue'

const props = defineProps<{
  doctype: string
  docname: string
  shares: ShareEntry[]
}>()
const emit = defineEmits<{ removed: [user: string] }>()

const removingUser = ref<string | null>(null)

async function remove(user: string) {
  if (removingUser.value) return
  removingUser.value = user
  try {
    await callApi('frappe.share.remove', {
      doctype: props.doctype,
      name: props.docname,
      user,
    })
    emit('removed', user)
  } catch {
    // silent — row stays in list if remove fails
  } finally {
    removingUser.value = null
  }
}
</script>

<template>
  <div v-if="shares.length">
    <p class="text-xs font-semibold text-[var(--dock-icon)] uppercase tracking-wide mb-2">
      {{ __('People with access') }}
    </p>
    <div class="divide-y divide-[var(--dock-border)]">
      <DockShareUserRow
        v-for="entry in shares"
        :key="entry.user"
        :entry="entry"
        :removing="removingUser === entry.user"
        @remove="remove"
      />
    </div>
  </div>
</template>
