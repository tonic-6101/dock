<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Avatar button — opens the account panel.
  Displays the user's profile image, initials, or a fallback icon.
-->
<script lang="ts">
export default { name: 'DockAvatar' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { UserCircle2 } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useDockPanels } from '@/composables/useDockPanels'
import { useDockBoot } from '@/composables/useDockBoot'

const { togglePanel, isPanelOpen } = useDockPanels()
const { registeredApps } = useDockBoot()

// Session — Frappe Desk: window.frappe.session; /dock web pages: dockBoot.session;
// Domain app SPAs (Orga, Watch): window.frappe.boot.user (different shape)
const session = computed(() => {
  if (window.frappe?.session) return window.frappe.session
  if ((window as any).dockBoot?.session) return (window as any).dockBoot.session
  const bootUser = (window as any).frappe?.boot?.user
  if (bootUser) {
    return {
      user: bootUser.name || bootUser.email,
      user_fullname: bootUser.full_name,
      user_image: bootUser.user_image,
    }
  }
  return null
})

const fullName = computed(() =>
  session.value?.user_fullname ?? session.value?.user ?? ''
)

const initials = computed(() => {
  const name = fullName.value || '?'
  return name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
})
</script>

<template>
  <div class="dock-avatar">
    <button
      class="w-8 h-8 rounded-full bg-black/10 dark:bg-white/20
             hover:bg-black/15 dark:hover:bg-white/30 transition-colors
             flex items-center justify-center text-[var(--dock-text)] text-xs font-semibold overflow-hidden"
      :class="{ 'ring-2 ring-[var(--dock-accent)] ring-offset-1 ring-offset-[var(--dock-bg)]': isPanelOpen('account') }"
      :aria-expanded="isPanelOpen('account')"
      aria-haspopup="true"
      :aria-label="__('User menu')"
      :title="fullName || __('User menu')"
      @click.stop="togglePanel('account')"
    >
      <img
        v-if="session?.user_image"
        :src="session.user_image"
        :alt="fullName"
        class="w-8 h-8 object-cover"
      />
      <UserCircle2 v-else-if="!initials || initials === '?'" class="w-5 h-5 text-[var(--dock-icon)]" />
      <span v-else>{{ initials }}</span>
    </button>
  </div>
</template>
