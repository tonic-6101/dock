<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Integrations dashboard — shows all registered cross-app bridges (dock_bridges hook).
  Admin-only (System Manager). Lives at /dock/integrations in the sidebar.
-->
<script lang="ts">
export default { name: 'DockIntegrationsPage' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Cable, RefreshCw, Loader2, Inbox } from 'lucide-vue-next'
import { callApi } from '@/composables/useApi'
import { __ } from '@/composables/useTranslate'
import { useDockBoot } from '@/composables/useDockBoot'
import BridgeCard from '@/components/integrations/BridgeCard.vue'
import type { BridgeRegistration, BridgeStatus } from '@/components/integrations/BridgeCard.vue'

const { dock } = useDockBoot()

const bridges = computed<BridgeRegistration[]>(
  () => (dock.value as any)?.bridges ?? []
)

// Per-bridge status cache keyed by "app:source_doctype"
const statuses = ref<Record<string, BridgeStatus>>({})
const loadingStatus = ref<Record<string, boolean>>({})
const syncing = ref<Record<string, boolean>>({})
const refreshing = ref(false)

function bridgeKey(b: BridgeRegistration): string {
  return `${b.app}:${b.source_doctype}`
}

async function checkStatus(bridge: BridgeRegistration) {
  const key = bridgeKey(bridge)
  loadingStatus.value[key] = true
  try {
    const result = await callApi<BridgeStatus>('dock.api.bridges.get_bridge_status', {
      app: bridge.app,
      source_doctype: bridge.source_doctype,
    })
    statuses.value[key] = result
  } catch (e) {
    statuses.value[key] = {
      active: false,
      reason: (e as Error).message || __('Failed to check status'),
    }
  } finally {
    loadingStatus.value[key] = false
  }
}

async function triggerSync(bridge: BridgeRegistration) {
  const key = bridgeKey(bridge)
  syncing.value[key] = true
  try {
    await callApi('dock.api.bridges.trigger_sync', {
      app: bridge.app,
      source_doctype: bridge.source_doctype,
    })
    // Refresh status after sync
    await checkStatus(bridge)
  } catch {
    // Status will show error on next check
  } finally {
    syncing.value[key] = false
  }
}

async function checkAllStatuses() {
  refreshing.value = true
  const installed = bridges.value.filter(b => b.target_installed && b.status_endpoint)
  await Promise.allSettled(installed.map(b => checkStatus(b)))
  refreshing.value = false
}

onMounted(() => {
  checkAllStatuses()
})
</script>

<template>
  <div class="max-w-3xl mx-auto py-6 px-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <Cable class="w-6 h-6 text-gray-500" />
        <div>
          <h1 class="text-lg font-semibold text-gray-900">{{ __('Integrations') }}</h1>
          <p class="text-sm text-gray-500">
            {{ __('Cross-app bridges to Frappe and ERPNext') }}
          </p>
        </div>
      </div>

      <button
        class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        :disabled="refreshing"
        @click="checkAllStatuses"
      >
        <Loader2 v-if="refreshing" class="w-4 h-4 animate-spin" />
        <RefreshCw v-else class="w-4 h-4" />
        {{ __('Refresh All') }}
      </button>
    </div>

    <!-- Bridge cards -->
    <div v-if="bridges.length > 0" class="grid gap-4">
      <BridgeCard
        v-for="bridge in bridges"
        :key="bridgeKey(bridge)"
        :bridge="bridge"
        :status="statuses[bridgeKey(bridge)] ?? null"
        :loading="loadingStatus[bridgeKey(bridge)] ?? false"
        :syncing="syncing[bridgeKey(bridge)] ?? false"
        @check-status="checkStatus(bridge)"
        @sync="triggerSync(bridge)"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-16 text-center"
    >
      <Inbox class="w-12 h-12 text-gray-300 mb-3" />
      <h2 class="text-sm font-medium text-gray-600">{{ __('No bridges registered') }}</h2>
      <p class="text-sm text-gray-400 mt-1 max-w-sm">
        {{ __('Domain apps register their Frappe/ERPNext bridges via the dock_bridges hook. Bridges will appear here once apps declare them.') }}
      </p>
    </div>
  </div>
</template>
