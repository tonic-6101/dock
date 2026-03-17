<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockPeopleIcon' }
</script>

<script setup lang="ts">
import { Users } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
</script>

<template>
  <a
    href="/dock/people"
    class="flex items-center justify-center w-8 h-8 rounded-md
           text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    :title="__('People')"
    :aria-label="__('People')"
  >
    <Users class="w-4 h-4" />
  </a>
</template>
