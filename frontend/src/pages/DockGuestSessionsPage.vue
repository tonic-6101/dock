<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Guest Portal admin page — /dock/guest
  Lists all Guest Portal sessions. System Manager only.
-->
<script lang="ts">
export default { name: 'DockGuestSessionsPage' }
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Copy, Check, RotateCcw } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { relativeTime } from '@/composables/useRelativeTime'

interface Session {
  name: string
  label: string
  view_id: string
  source_app: string
  source_doctype: string
  source_name: string
  token: string
  is_active: 0 | 1
  expires_at: string | null
  last_accessed_at: string | null
  created_by: string
}

const sessions  = ref<Session[]>([])
const total     = ref(0)
const loading   = ref(true)
const hasError  = ref(false)
const revoking  = ref<Record<string, boolean>>({})
const copied    = ref<string | null>(null)

async function load() {
  loading.value = true; hasError.value = false
  try {
    const res = await callApi<{ items: Session[]; total: number }>('dock.api.guest.get_sessions', { limit: 50, offset: 0 })
    sessions.value = res.items
    total.value    = res.total
  } catch { hasError.value = true }
  finally { loading.value = false }
}

async function revoke(s: Session) {
  revoking.value[s.name] = true
  try {
    await callApi('dock.api.guest.revoke_session', { session_name: s.name })
    s.is_active = 0
  } catch { /* silent */ }
  finally { delete revoking.value[s.name] }
}

async function copyUrl(s: Session) {
  const url = `${window.location.origin}/dock/guest/${s.token}`
  try {
    await navigator.clipboard.writeText(url)
    copied.value = s.name
    setTimeout(() => { if (copied.value === s.name) copied.value = null }, 2000)
  } catch { /* silent */ }
}

function statusLabel(s: Session): string {
  if (!s.is_active) return __('Revoked')
  if (s.expires_at && new Date(s.expires_at) < new Date()) return __('Expired')
  return __('Active')
}

function statusClass(s: Session): string {
  if (!s.is_active) return 'text-red-500 dark:text-red-400'
  if (s.expires_at && new Date(s.expires_at) < new Date()) return 'text-[var(--dock-icon)]'
  return 'text-green-600 dark:text-green-400'
}

function canRevoke(s: Session): boolean {
  return Boolean(s.is_active) && !(s.expires_at && new Date(s.expires_at) < new Date())
}

onMounted(load)
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-8">
    <div class="mb-6">
      <h1 class="text-xl font-semibold text-[var(--dock-text)]">{{ __('Guest Portal') }}</h1>
    </div>

    <!-- Error -->
    <div v-if="hasError" class="text-sm text-red-500 dark:text-red-400 mb-4">
      {{ __('Failed to load sessions.') }}
      <button class="underline ml-1" @click="load">{{ __('Retry') }}</button>
    </div>

    <!-- Loading -->
    <div v-else-if="loading" class="flex justify-center py-12">
      <div class="w-6 h-6 border-2 border-[var(--dock-border)] border-t-[var(--dock-accent)] rounded-full animate-spin" />
    </div>

    <!-- Empty -->
    <p v-else-if="!sessions.length" class="text-sm text-[var(--dock-icon)] py-12 text-center">
      {{ __('No guest sessions yet.') }}
    </p>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="border-b border-[var(--dock-border)] text-left text-[var(--dock-icon)] text-xs">
            <th class="pb-2 pr-4 font-medium">{{ __('Label') }}</th>
            <th class="pb-2 pr-4 font-medium">{{ __('View') }}</th>
            <th class="pb-2 pr-4 font-medium">{{ __('Expires') }}</th>
            <th class="pb-2 pr-4 font-medium">{{ __('Last accessed') }}</th>
            <th class="pb-2 pr-4 font-medium">{{ __('Status') }}</th>
            <th class="pb-2 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="s in sessions"
            :key="s.name"
            class="border-b border-[var(--dock-border)] last:border-0"
            :class="(!s.is_active || (s.expires_at && new Date(s.expires_at) < new Date())) ? 'opacity-50' : ''"
          >
            <td class="py-2.5 pr-4 text-[var(--dock-text)] font-medium">{{ s.label }}</td>
            <td class="py-2.5 pr-4 text-[var(--dock-icon)] text-xs font-mono">{{ s.view_id }}</td>
            <td class="py-2.5 pr-4 text-[var(--dock-icon)]">
              {{ s.expires_at ? relativeTime(s.expires_at) : __('Never') }}
            </td>
            <td class="py-2.5 pr-4 text-[var(--dock-icon)]">
              {{ s.last_accessed_at ? relativeTime(s.last_accessed_at) : '—' }}
            </td>
            <td class="py-2.5 pr-4">
              <span class="text-xs" :class="statusClass(s)">{{ statusLabel(s) }}</span>
            </td>
            <td class="py-2.5 text-right whitespace-nowrap">
              <button
                class="inline-flex items-center gap-1 text-xs text-[var(--dock-icon)]
                       hover:text-[var(--dock-text)] transition-colors mr-3"
                :aria-label="__('Copy portal URL')"
                @click="copyUrl(s)"
              >
                <Check v-if="copied === s.name" class="w-3.5 h-3.5 text-green-500" />
                <Copy v-else class="w-3.5 h-3.5" />
              </button>
              <button
                v-if="canRevoke(s)"
                class="inline-flex items-center gap-1 text-xs text-red-500 dark:text-red-400
                       hover:opacity-80 transition-opacity disabled:opacity-40"
                :disabled="revoking[s.name]"
                :aria-label="__('Revoke session')"
                @click="revoke(s)"
              >
                <RotateCcw v-if="revoking[s.name]" class="w-3.5 h-3.5 animate-spin" />
                <span v-else>{{ __('Revoke') }}</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="total > sessions.length" class="text-xs text-[var(--dock-icon)] mt-3">
        {{ __('Showing {0} of {1} sessions').replace('{0}', String(sessions.length)).replace('{1}', String(total)) }}
      </p>
    </div>
  </div>
</template>
