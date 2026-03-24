<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Add people section: user search input + permission checkboxes + Add button.
  Filters out users already in the shares list.
-->
<script lang="ts">
export default { name: 'DockShareUserSearch' }
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Search } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import type { ShareEntry } from './DockShareUserRow.vue'

type Permission = 'read' | 'write' | 'share' | 'submit'

interface UserResult {
  name: string
  full_name: string
  user_image?: string
}

const props = defineProps<{
  doctype: string
  docname: string
  permissions: Permission[]
  existingUsers: string[]
}>()
const emit = defineEmits<{ added: [entry: ShareEntry] }>()

const query         = ref('')
const results       = ref<UserResult[]>([])
const showDropdown  = ref(false)
const searching     = ref(false)
const selectedUser  = ref<UserResult | null>(null)
const adding        = ref(false)
const hasAddError   = ref(false)

function hideDropdownDelayed() {
  setTimeout(() => { showDropdown.value = false }, 150)
}

// Permission checkboxes — only show what the parent allows
const selectedPerms = ref<Record<Permission, boolean>>({
  read:   true,
  write:  false,
  share:  false,
  submit: false,
})

let searchTimer: ReturnType<typeof setTimeout> | null = null

async function search() {
  const q = query.value.trim()
  if (!q) { results.value = []; showDropdown.value = false; return }

  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(async () => {
    searching.value = true
    try {
      const rows = await callApi<UserResult[]>('frappe.client.get_list', {
        doctype: 'User',
        fields: ['name', 'full_name', 'user_image'],
        filters: [
          ['full_name', 'like', `%${q}%`],
          ['enabled', '=', 1],
          ['name', '!=', 'Guest'],
          ['name', '!=', 'Administrator'],
        ],
        limit_page_length: 10,
      })
      // Filter out users already shared
      results.value = rows.filter(r => !props.existingUsers.includes(r.name))
      showDropdown.value = results.value.length > 0
    } catch {
      results.value = []
    } finally {
      searching.value = false
    }
  }, 200)
}

function selectUser(user: UserResult) {
  selectedUser.value = user
  query.value = user.full_name || user.name
  showDropdown.value = false
}

function clearSelection() {
  selectedUser.value = null
  query.value = ''
  results.value = []
}

// Reset selection when existingUsers changes (after a share is added)
watch(() => props.existingUsers, () => {
  if (selectedUser.value && props.existingUsers.includes(selectedUser.value.name)) {
    clearSelection()
  }
})

const canAdd = computed(() =>
  !!selectedUser.value &&
  props.permissions.some(p => selectedPerms.value[p])
)

async function add() {
  if (!selectedUser.value || adding.value) return
  adding.value = true
  hasAddError.value = false
  try {
    const p = selectedPerms.value
    await callApi('frappe.share.add', {
      doctype: props.doctype,
      name: props.docname,
      user: selectedUser.value.name,
      read:   p.read   ? 1 : 0,
      write:  p.write  ? 1 : 0,
      share:  p.share  ? 1 : 0,
      submit: p.submit ? 1 : 0,
    })
    emit('added', {
      name:       '',   // DocShare name unknown until re-fetch, caller can handle
      user:       selectedUser.value.name,
      full_name:  selectedUser.value.full_name,
      user_image: selectedUser.value.user_image,
      read:   p.read   ? 1 : 0,
      write:  p.write  ? 1 : 0,
      share:  p.share  ? 1 : 0,
      submit: p.submit ? 1 : 0,
    })
    clearSelection()
  } catch {
    hasAddError.value = true
  } finally {
    adding.value = false
  }
}
</script>

<template>
  <div>
    <p class="text-xs font-semibold text-[var(--dock-icon)] uppercase tracking-wide mb-3">
      {{ __('Add people') }}
    </p>

    <!-- User search input -->
    <div class="relative mb-3">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--dock-icon)]" />
      <input
        v-model="query"
        type="text"
        class="w-full pl-9 pr-3 py-2 rounded-md border border-[var(--dock-border)]
               bg-transparent text-sm text-[var(--dock-text)]
               focus:outline-none focus:ring-2 focus:ring-[var(--dock-accent)]/30
               placeholder:text-[var(--dock-icon)]"
        :placeholder="__('Search users...')"
        autocomplete="off"
        @input="search"
        @focus="showDropdown = results.length > 0"
        @blur="hideDropdownDelayed"
      />

      <!-- Results dropdown -->
      <div
        v-if="showDropdown"
        class="absolute top-full left-0 right-0 mt-1 z-10
               bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-md shadow-lg overflow-hidden"
      >
        <button
          v-for="user in results"
          :key="user.name"
          class="w-full flex items-center gap-2 px-3 py-2 text-left
                 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          @mousedown.prevent="selectUser(user)"
        >
          <div
            class="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center
                   bg-[var(--dock-accent)]/15 text-[var(--dock-accent)] text-[10px] font-semibold overflow-hidden"
          >
            <img v-if="user.user_image" :src="user.user_image" :alt="user.full_name" class="w-6 h-6 object-cover" />
            <span v-else>{{ (user.full_name || user.name)[0].toUpperCase() }}</span>
          </div>
          <span class="text-sm text-[var(--dock-text)] truncate">{{ user.full_name || user.name }}</span>
        </button>
      </div>
    </div>

    <!-- Permission checkboxes -->
    <div class="mb-3">
      <p class="text-xs text-[var(--dock-icon)] mb-2">{{ __('Permissions') }}</p>
      <div class="flex flex-wrap gap-3">
        <label
          v-for="perm in permissions"
          :key="perm"
          class="flex items-center gap-1.5 cursor-pointer"
        >
          <input
            v-model="selectedPerms[perm]"
            type="checkbox"
            class="w-3.5 h-3.5 rounded accent-accent-600"
          />
          <span class="text-sm text-[var(--dock-text)]">
            {{ perm === 'read' ? __('Read') : perm === 'write' ? __('Write') : perm === 'share' ? __('Share') : __('Submit') }}
          </span>
        </label>
      </div>
    </div>

    <!-- Error -->
    <p v-if="hasAddError" class="text-xs text-red-500 dark:text-red-400 mb-2">
      {{ __('Could not add user. Please try again.') }}
    </p>

    <!-- Add button -->
    <button
      class="w-full py-2 rounded-md bg-[var(--dock-accent)] text-white text-sm font-medium
             hover:opacity-90 transition-opacity disabled:opacity-50"
      :disabled="!canAdd || adding"
      @click="add"
    >
      {{ adding ? __('Adding…') : __('Add') }}
    </button>
  </div>
</template>
