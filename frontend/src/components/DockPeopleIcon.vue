<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockPeopleIcon' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Users } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useDockBoot } from '@/composables/useDockBoot'

const { registeredApps } = useDockBoot()

/**
 * Resolve the People page URL for the current app context.
 * If the user is inside a domain app (e.g. /orga/...), navigate to /orga/people.
 * Otherwise fall back to /dock/people.
 */
const peopleUrl = computed(() => {
  const path = window.location.pathname
  type App = { route: string }
  const active = (registeredApps.value as App[]).find(a =>
    a.route !== '/dock' && path.startsWith(a.route)
  )
  return active ? `${active.route}/people` : '/dock/people'
})
</script>

<template>
  <a
    :href="peopleUrl"
    class="flex items-center justify-center w-8 h-8 rounded-md
           text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    :title="__('People')"
    :aria-label="__('People')"
  >
    <Users class="w-4 h-4" />
  </a>
</template>
