<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic

  Navbar button for the Daily Briefing panel.
  Shows a sunrise icon with a badge of actionable items.
  Clicking toggles the DockBriefingPanel via useDockPanels.
-->
<script lang="ts">
export default { name: 'DockBriefingButton' }
</script>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { Sunrise } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useDockPanels } from '@/composables/useDockPanels'
import { useDockBriefing } from '@/composables/useDockBriefing'

const { togglePanel, isPanelOpen } = useDockPanels()
const { badgeCount, fetchBriefing } = useDockBriefing()

const badgeLabel = computed(() => {
  if (badgeCount.value <= 0) return ''
  return badgeCount.value > 99 ? '99+' : String(badgeCount.value)
})

onMounted(() => {
  fetchBriefing()
})
</script>

<template>
  <div class="dock-briefing relative">
    <button
      class="relative flex items-center justify-center w-8 h-8 rounded-md
             text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      :aria-expanded="isPanelOpen('briefing')"
      :aria-label="badgeCount > 0 ? `Daily Briefing, ${badgeCount} items` : 'Daily Briefing'"
      :title="__('Daily Briefing')"
      @click.stop="togglePanel('briefing')"
    >
      <Sunrise class="w-4 h-4" />
      <span
        v-if="badgeCount > 0"
        class="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1
               bg-amber-500 rounded-full text-[10px] font-bold text-white
               flex items-center justify-center leading-none"
      >{{ badgeLabel }}</span>
    </button>
  </div>
</template>
