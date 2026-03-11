<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Share dialog — expiry picker + URL display + copy button + revoke.
  Used by <DockGuestShareButton /> after clicking "Share with client".
-->
<script lang="ts">
export default { name: 'DockGuestShareDialog' }
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, Copy, Check } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'

const props = defineProps<{
  viewId: string
  sourceApp: string
  sourceDoctype: string
  sourceName: string
  label: string
  defaultExpiryDays?: number
}>()
const emit = defineEmits<{ close: [] }>()

type Step = 'configure' | 'done'
const step      = ref<Step>('configure')
const loading   = ref(false)
const hasError  = ref(false)
const copied    = ref(false)
const revoking  = ref(false)

const EXPIRY_OPTIONS = [
  { label: __('7 days'),  value: 7 },
  { label: __('30 days'), value: 30 },
  { label: __('90 days'), value: 90 },
  { label: __('No expiry'), value: 0 },
]

const selectedExpiry = ref(props.defaultExpiryDays ?? 30)
const sessionName    = ref('')
const portalUrl      = ref('')
const expiresAt      = ref<string | null>(null)

async function generate() {
  loading.value = true; hasError.value = false
  try {
    const res = await callApi<{ session_name: string; token: string; url: string; expires_at: string | null }>(
      'dock.api.guest.create_session',
      {
        view_id: props.viewId,
        source_app: props.sourceApp,
        source_doctype: props.sourceDoctype,
        source_name: props.sourceName,
        label: props.label,
        expires_in_days: selectedExpiry.value,
      },
    )
    sessionName.value = res.session_name
    portalUrl.value   = res.url
    expiresAt.value   = res.expires_at
    step.value        = 'done'
  } catch { hasError.value = true }
  finally { loading.value = false }
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(portalUrl.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch { /* silent */ }
}

async function revoke() {
  revoking.value = true
  try {
    await callApi('dock.api.guest.revoke_session', { session_name: sessionName.value })
    emit('close')
  } catch { /* silent */ }
  finally { revoking.value = false }
}

const expiryLabel = computed(() => {
  if (!expiresAt.value) return __('No expiry')
  return new Date(expiresAt.value).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
})
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
      @mousedown.self="emit('close')"
    >
      <div
        class="w-full max-w-sm bg-[var(--dock-bg)] border border-[var(--dock-border)]
               rounded-xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 class="text-sm font-semibold text-[var(--dock-text)]">
            {{ __('Share "{0}"').replace('{0}', label) }}
          </h2>
          <button
            class="text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
            :aria-label="__('Close')"
            @click="emit('close')"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <div class="px-5 pb-5">
          <!-- Step 1: Configure -->
          <template v-if="step === 'configure'">
            <label class="block text-xs text-[var(--dock-icon)] mb-1.5">
              {{ __('Link expires in:') }}
            </label>
            <select
              v-model="selectedExpiry"
              class="w-full bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg
                     px-3 py-2 text-sm text-[var(--dock-text)] outline-none
                     focus:border-[var(--dock-accent)] mb-4"
            >
              <option v-for="opt in EXPIRY_OPTIONS" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>

            <div v-if="hasError" class="text-xs text-red-500 dark:text-red-400 mb-3">
              {{ __('Failed to generate link. Please try again.') }}
            </div>

            <button
              class="w-full bg-[var(--dock-accent)] text-white text-sm font-medium
                     rounded-lg py-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              :disabled="loading"
              @click="generate"
            >
              {{ loading ? __('Generating…') : __('Generate link') }}
            </button>
          </template>

          <!-- Step 2: Done -->
          <template v-else>
            <!-- URL row -->
            <div class="flex items-center gap-2 bg-black/5 dark:bg-white/10 rounded-lg px-3 py-2 mb-3">
              <span class="flex-1 text-xs text-[var(--dock-text)] truncate font-mono">
                {{ portalUrl }}
              </span>
              <button
                class="text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors shrink-0"
                :aria-label="__('Copy link')"
                @click="copyLink"
              >
                <Check v-if="copied" class="w-4 h-4 text-green-500" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
            <div v-if="copied" class="text-xs text-green-500 dark:text-green-400 mb-2 text-center">
              {{ __('Copied!') }}
            </div>

            <!-- Expiry -->
            <p class="text-xs text-[var(--dock-icon)] mb-4">
              {{ __('Expires: {0}').replace('{0}', expiryLabel) }}
            </p>

            <!-- Revoke -->
            <button
              class="text-xs text-red-500 dark:text-red-400 hover:opacity-80 transition-opacity disabled:opacity-40"
              :disabled="revoking"
              @click="revoke"
            >
              {{ revoking ? __('Revoking…') : __('Revoke') }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>
