<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Guest Portal route — /dock/guest/:token
  Accessible without Frappe login (allow_guest=True backed by dock.py guest path).
  Validates token → renders DockGuestShell with domain app iframe, or an error state.
-->
<script lang="ts">
export default { name: 'DockGuestPortalPage' }
</script>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import DockGuestShell from '@/components/guest/DockGuestShell.vue'
import DockGuestError from '@/components/guest/DockGuestError.vue'

type ErrorReason = 'not_found' | 'expired' | 'revoked' | 'unavailable'
type State = 'loading' | 'valid' | 'error'

const route = useRoute()
const token = computed(() => route.params.token as string)

const state      = ref<State>('loading')
const errorReason = ref<ErrorReason>('not_found')
const viewUrl    = ref('')
const label      = ref('')

// Boot data — injected by dock.py for guest routes
const boot = (window as any).dockBoot ?? (window as any).frappe?.boot?.dock
const siteLabel = computed(() => boot?.settings?.site_label ?? window.location.hostname)
const privacyPolicyUrl = computed(() => boot?.settings?.privacy_policy_url ?? '')

async function validateAndLoad() {
  try {
    const res = await fetch('/api/method/dock.api.guest.validate_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token.value }),
    })
    const json = await res.json()
    const data = json.message

    if (!data.valid) {
      errorReason.value = data.reason ?? 'not_found'
      state.value = 'error'
      return
    }

    label.value = data.label

    // Resolve the domain app iframe URL — replace {name} in the registered route
    const views = _getRegisteredViews()
    const view = views.find((v: any) => v.view_id === data.view_id)
    if (!view) {
      errorReason.value = 'unavailable'
      state.value = 'error'
      return
    }

    viewUrl.value = view.route.replace('{name}', encodeURIComponent(data.source_name))
    state.value = 'valid'

    // Log activity on successful load
    fetch('/api/method/dock.api.guest.log_activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token.value, event_type: 'viewed', view_id: data.view_id }),
    }).catch(() => { /* silent */ })

  } catch {
    errorReason.value = 'unavailable'
    state.value = 'error'
  }
}

function _getRegisteredViews(): any[] {
  // Collect dock_guest_views from boot-injected registered apps
  // Domain apps declare these via hooks.py; Dock collects them into boot
  return boot?.guest_views ?? []
}

onMounted(validateAndLoad)
</script>

<template>
  <DockGuestShell :site-label="siteLabel" :privacy-policy-url="privacyPolicyUrl">
    <!-- Loading -->
    <div v-if="state === 'loading'" class="flex items-center justify-center min-h-[40vh]">
      <div class="w-6 h-6 border-2 border-[var(--dock-border)] border-t-[var(--dock-accent)] rounded-full animate-spin" />
    </div>

    <!-- Error -->
    <DockGuestError v-else-if="state === 'error'" :reason="errorReason" />

    <!-- Valid — domain app view in iframe -->
    <iframe
      v-else-if="state === 'valid'"
      :src="viewUrl"
      class="w-full border-0"
      style="min-height: calc(100vh - 112px)"
      :title="label"
      sandbox="allow-same-origin allow-scripts allow-forms"
    />
  </DockGuestShell>
</template>
