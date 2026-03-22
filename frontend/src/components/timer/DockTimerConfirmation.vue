<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Post-stop confirmation view.
  Shows "✓ Saved · 1h 23m" + description + "View entry →".
  Auto-closes after 3 seconds, or stays open if user interacts.
-->
<script lang="ts">
export default { name: 'DockTimerConfirmation' }
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useDockTimer } from '@/composables/useDockTimer'

const { stoppedEntry, stoppedDurationDisplay, stoppedDescription } = useDockTimer()

const emit = defineEmits<{ dismiss: [] }>()

const interacted = ref(false)
let autoCloseTimeout: ReturnType<typeof setTimeout> | null = null

function onInteract() {
  interacted.value = true
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout)
    autoCloseTimeout = null
  }
}

onMounted(() => {
  autoCloseTimeout = setTimeout(() => {
    if (!interacted.value) emit('dismiss')
  }, 3000)
})

onUnmounted(() => {
  if (autoCloseTimeout) clearTimeout(autoCloseTimeout)
})
</script>

<template>
  <div
    class="dock-timer-confirmation"
    @mouseenter="onInteract"
    @focusin="onInteract"
  >
    <div class="dock-confirm-icon">✓</div>
    <p class="dock-confirm-title">{{ __('Time entry saved') }}</p>
    <p class="dock-confirm-detail">
      {{ stoppedDurationDisplay }}
      <template v-if="stoppedDescription">
        · {{ stoppedDescription }}
      </template>
    </p>
    <a
      v-if="stoppedEntry"
      :href="`/watch/entry/${stoppedEntry}`"
      class="dock-confirm-link"
    >{{ __('View entry') }} →</a>
  </div>
</template>

<style scoped>
.dock-timer-confirmation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 2rem 1rem;
  text-align: center;
}

.dock-confirm-icon {
  font-size: 1.5rem;
  color: #16a34a;
}
:root.dark .dock-confirm-icon { color: #4ade80; }

.dock-confirm-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--dock-text);
}

.dock-confirm-detail {
  font-size: 0.75rem;
  color: var(--dock-icon);
}

.dock-confirm-link {
  font-size: 0.75rem;
  color: var(--dock-accent);
  text-decoration: none;
  margin-top: 0.25rem;
}
.dock-confirm-link:hover {
  text-decoration: underline;
}
</style>
