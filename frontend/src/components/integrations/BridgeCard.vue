<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'BridgeCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import {
  ArrowRight, ArrowLeftRight, RefreshCw, CheckCircle,
  AlertCircle, XCircle, Loader2, ExternalLink, Clock,
} from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'

export interface BridgeRegistration {
  app: string
  label: string
  target_app: string
  target_doctype?: string
  source_doctype: string
  direction: 'one_way' | 'two_way'
  target_installed: boolean
  status_endpoint?: string
  sync_endpoint?: string
  settings_route?: string
}

export interface BridgeStatus {
  active: boolean
  reason?: string
  unsynced_count?: number
  last_bulk_sync?: string | null
  last_sync?: string | null
  last_error?: string | null
}

const props = defineProps<{
  bridge: BridgeRegistration
  status: BridgeStatus | null
  loading: boolean
  syncing: boolean
}>()

const emit = defineEmits<{
  (e: 'check-status'): void
  (e: 'sync'): void
}>()

const directionIcon = computed(() =>
  props.bridge.direction === 'two_way' ? ArrowLeftRight : ArrowRight
)

const directionLabel = computed(() =>
  props.bridge.direction === 'two_way' ? __('Two-way') : __('One-way')
)

const statusIcon = computed(() => {
  if (!props.bridge.target_installed) return XCircle
  if (!props.status) return Clock
  if (props.status.last_error) return AlertCircle
  if (props.status.active) return CheckCircle
  return XCircle
})

const statusColor = computed(() => {
  if (!props.bridge.target_installed) return 'text-gray-400'
  if (!props.status) return 'text-gray-400'
  if (props.status.last_error) return 'text-amber-500'
  if (props.status.active) return 'text-emerald-500'
  return 'text-gray-400'
})

const statusLabel = computed(() => {
  if (!props.bridge.target_installed) {
    return __('Target not installed')
  }
  if (!props.status) return __('Not checked')
  if (!props.status.active) return props.status.reason || __('Inactive')
  if (props.status.last_error) return __('Error')
  return __('Active')
})

const lastSync = computed(() => {
  if (!props.status) return null
  return props.status.last_bulk_sync || props.status.last_sync || null
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
    <!-- Header -->
    <div class="flex items-start justify-between gap-2">
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-semibold text-gray-900 truncate">
          {{ bridge.label }}
        </h3>
        <div class="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span class="font-mono">{{ bridge.source_doctype }}</span>
          <component :is="directionIcon" class="w-3.5 h-3.5 flex-shrink-0" />
          <span class="font-mono">{{ bridge.target_doctype || bridge.target_app }}</span>
        </div>
      </div>

      <!-- Direction badge -->
      <span class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600 flex-shrink-0">
        <component :is="directionIcon" class="w-3 h-3" />
        {{ directionLabel }}
      </span>
    </div>

    <!-- Status row -->
    <div class="flex items-center gap-2">
      <component :is="statusIcon" :class="['w-4 h-4 flex-shrink-0', statusColor]" />
      <span class="text-sm" :class="statusColor">{{ statusLabel }}</span>

      <template v-if="status?.unsynced_count">
        <span class="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
          {{ status.unsynced_count }} {{ __('unsynced') }}
        </span>
      </template>
    </div>

    <!-- Last sync time -->
    <div v-if="lastSync" class="flex items-center gap-1.5 text-xs text-gray-400">
      <Clock class="w-3 h-3" />
      {{ __('Last sync') }}: {{ lastSync }}
    </div>

    <!-- Error message -->
    <div
      v-if="status?.last_error"
      class="text-xs text-red-600 bg-red-50 rounded px-2 py-1.5 break-words"
    >
      {{ status.last_error }}
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2 pt-1 border-t border-gray-100">
      <button
        class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
        :disabled="loading || !bridge.target_installed"
        @click="emit('check-status')"
      >
        <Loader2 v-if="loading" class="w-3.5 h-3.5 animate-spin" />
        <RefreshCw v-else class="w-3.5 h-3.5" />
        {{ __('Check Status') }}
      </button>

      <button
        v-if="bridge.sync_endpoint"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded transition-colors disabled:opacity-50"
        :disabled="syncing || !bridge.target_installed || !status?.active"
        @click="emit('sync')"
      >
        <Loader2 v-if="syncing" class="w-3.5 h-3.5 animate-spin" />
        <RefreshCw v-else class="w-3.5 h-3.5" />
        {{ __('Sync Now') }}
      </button>

      <a
        v-if="bridge.settings_route"
        :href="bridge.settings_route"
        class="ml-auto inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        <ExternalLink class="w-3 h-3" />
        {{ __('Settings') }}
      </a>
    </div>
  </div>
</template>
