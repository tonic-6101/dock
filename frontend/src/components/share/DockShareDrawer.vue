<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Slide-over share drawer. Manages all share state for a single document.
  Contains: user search/add, people-with-access list, everyone toggle.
-->
<script lang="ts">
export default { name: 'DockShareDrawer' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { X } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import DockShareUserSearch from './DockShareUserSearch.vue'
import DockShareUserList from './DockShareUserList.vue'
import DockShareEveryoneToggle from './DockShareEveryoneToggle.vue'
import type { ShareEntry } from './DockShareUserRow.vue'

type Permission = 'read' | 'write' | 'share' | 'submit'

const props = defineProps<{
  doctype: string
  docname: string
  permissions: Permission[]
}>()
const emit = defineEmits<{
  close: []
  shared:  [payload: { user: string; permissions: Record<string, number> }]
  removed: [payload: { user: string }]
}>()

const loading        = ref(true)
const hasError       = ref(false)
const userShares     = ref<ShareEntry[]>([])
const everyoneEnabled = ref(false)
const showReadOnly   = computed(() => props.permissions.includes('read'))

const existingUsers = computed(() => userShares.value.map(s => s.user))

async function fetchShares() {
  loading.value = true
  hasError.value = false
  try {
    const rows = await callApi<ShareEntry[]>('frappe.share.get_users', {
      doctype: props.doctype,
      name: props.docname,
    })
    // Separate everyone entry from user entries
    everyoneEnabled.value = rows.some(r => r.everyone)
    userShares.value = rows.filter(r => !r.everyone && r.user)
  } catch {
    hasError.value = true
  } finally {
    loading.value = false
  }
}

function onAdded(entry: ShareEntry) {
  // Replace if already in list (update), otherwise prepend
  const idx = userShares.value.findIndex(s => s.user === entry.user)
  if (idx >= 0) {
    userShares.value[idx] = entry
  } else {
    userShares.value.unshift(entry)
  }
  emit('shared', {
    user: entry.user,
    permissions: { read: entry.read, write: entry.write, share: entry.share, submit: entry.submit },
  })
}

function onRemoved(user: string) {
  userShares.value = userShares.value.filter(s => s.user !== user)
  emit('removed', { user })
}

onMounted(fetchShares)
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-40 bg-black/30"
      aria-hidden="true"
      @click="emit('close')"
    />

    <!-- Drawer panel -->
    <aside
      class="fixed right-0 top-0 h-full w-full sm:w-96 z-50
             bg-[var(--dock-bg)] border-l border-[var(--dock-border)]
             flex flex-col shadow-xl"
      role="dialog"
      aria-modal="true"
      :aria-label="__('Share {0} {1}').replace('{0}', doctype).replace('{1}', docname)"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-[var(--dock-border)] flex-shrink-0">
        <h2 class="text-sm font-semibold text-[var(--dock-text)] truncate pr-4">
          {{ __('Share {0} {1}').replace('{0}', doctype).replace('{1}', docname) }}
        </h2>
        <button
          class="w-7 h-7 flex items-center justify-center rounded flex-shrink-0
                 text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          :aria-label="__('Close')"
          @click="emit('close')"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto px-5 py-5 space-y-6">
        <!-- Loading -->
        <div v-if="loading" class="space-y-3">
          <div class="h-8 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
          <div class="h-4 w-3/4 rounded bg-black/[0.06] dark:bg-white/[0.06] animate-pulse" />
        </div>

        <!-- Error -->
        <div v-else-if="hasError" class="text-center py-6">
          <p class="text-sm text-[var(--dock-icon)] mb-2">{{ __('Could not load shares') }}</p>
          <button class="text-xs text-[var(--dock-accent)] hover:underline" @click="fetchShares">{{ __('Retry') }}</button>
        </div>

        <template v-else>
          <!-- Add people -->
          <DockShareUserSearch
            :doctype="doctype"
            :docname="docname"
            :permissions="permissions"
            :existing-users="existingUsers"
            @added="onAdded"
          />

          <!-- Divider -->
          <hr class="border-[var(--dock-border)]" />

          <!-- People with access -->
          <DockShareUserList
            :doctype="doctype"
            :docname="docname"
            :shares="userShares"
            @removed="onRemoved"
          />

          <!-- Everyone toggle — only when read is in permissions -->
          <template v-if="showReadOnly">
            <hr v-if="userShares.length" class="border-[var(--dock-border)]" />
            <DockShareEveryoneToggle
              :doctype="doctype"
              :docname="docname"
              :enabled="everyoneEnabled"
              @update:enabled="everyoneEnabled = $event"
            />
          </template>
        </template>
      </div>
    </aside>
  </Teleport>
</template>
