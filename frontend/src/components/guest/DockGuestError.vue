<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Guest Portal error states — shown inside DockGuestShell when token is invalid.
-->
<script lang="ts">
export default { name: 'DockGuestError' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { __ } from '@/composables/useTranslate'

type ErrorReason = 'not_found' | 'expired' | 'revoked' | 'unavailable'

const props = defineProps<{ reason: ErrorReason }>()

const message = computed(() => {
  switch (props.reason) {
    case 'not_found':  return __('This link is invalid or has been removed.')
    case 'expired':    return __('This link has expired. Please ask the sender for a new link.')
    case 'revoked':    return __('This link has been deactivated.')
    case 'unavailable': return __('Content is temporarily unavailable.')
    default:           return __('This link is invalid or has been removed.')
  }
})
</script>

<template>
  <div class="flex items-center justify-center min-h-[40vh] px-6">
    <p class="text-sm text-[var(--dock-icon)] text-center max-w-sm">{{ message }}</p>
  </div>
</template>
