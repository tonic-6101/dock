<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Apps panel — DockPanelShell-based app switcher.
  Sections: Pinned bookmarks, Apps (ecosystem), Platform & Extensions (admin-only).
  Filter input visible when total apps >= 8.
-->
<script lang="ts">
export default { name: 'DockAppsPanel' }
</script>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue'
import { Grip } from 'lucide-vue-next'
import { useDockBoot } from '@/composables/useDockBoot'
import { useDockPanels } from '@/composables/useDockPanels'
import { __ } from '@/composables/useTranslate'
import DockPanelShell from './DockPanelShell.vue'
import DockAppGrid from './DockAppGrid.vue'
import DockBookmarks from './DockBookmarks.vue'
import type { AppEntry } from '@/types/apps'

const { registeredApps } = useDockBoot()
const { closePanel, activePanel } = useDockPanels()

const filter = ref('')
const filterRef = ref<HTMLInputElement | null>(null)

const isSystemManager = computed(() => {
  const deskRoles = ((window as any).frappe?.boot?.user?.roles ?? []) as string[]
  return deskRoles.includes('System Manager')
})

const ctaLabel = computed(() =>
  isSystemManager.value ? __('Install apps') : __('Discover Apps')
)

// Group registered apps by tier
const allApps = computed(() => registeredApps.value as AppEntry[])

// Ecosystem apps — visible to all users (filtered by has_permission on backend)
const ecosystemApps = computed(() =>
  allApps.value.filter(a => a.tier === 'ecosystem')
)

// Platform (Desk) + external apps — admin-only section
const platformAndExternalApps = computed(() =>
  allApps.value.filter(a => a.tier === 'platform' || a.tier === 'external')
)

// Filter logic
const filterLower = computed(() => filter.value.toLowerCase())

function matchesFilter(app: AppEntry): boolean {
  if (!filterLower.value) return true
  return app.label.toLowerCase().includes(filterLower.value)
}

const filteredApps = computed(() =>
  ecosystemApps.value.filter(matchesFilter)
)

const filteredPlatformApps = computed(() =>
  platformAndExternalApps.value.filter(matchesFilter)
)

const totalApps = computed(() => allApps.value.length)

const hasResults = computed(() =>
  filteredApps.value.length > 0 || filteredPlatformApps.value.length > 0
)

// Auto-focus filter input on panel open
watch(() => activePanel.value, (val) => {
  if (val === 'apps') {
    nextTick(() => filterRef.value?.focus())
  }
})

function navigateTo(app: AppEntry) {
  window.location.href = app.route
  closePanel()
}

const sectionLabelStyle = {
  fontSize: '0.6875rem',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  color: 'var(--dock-icon)',
  marginBottom: '0.5rem',
  paddingLeft: '0.25rem',
}
</script>

<template>
  <DockPanelShell :title="__('Apps')" aria-label="Apps" @close="closePanel()">
    <div class="p-3 space-y-4">
      <!-- Filter input (visible when >= 8 apps) -->
      <div v-if="totalApps >= 8">
        <input
          ref="filterRef"
          v-model="filter"
          type="text"
          :placeholder="__('Filter apps...')"
          class="w-full px-3 py-1.5 text-sm rounded-lg border border-[var(--dock-border)]
                 bg-transparent text-[var(--dock-text)] placeholder-[var(--dock-icon)]
                 focus:outline-none focus:ring-2 focus:ring-[var(--dock-accent)] focus:border-transparent"
        />
      </div>

      <!-- dock_pro injects <DockSitesSwitcher /> here -->
      <slot name="panel-top" />

      <!-- Pinned bookmarks (hidden when empty) -->
      <DockBookmarks @close="closePanel()" />

      <!-- Apps: ecosystem only — visible to all users -->
      <section v-if="filteredApps.length">
        <div :style="sectionLabelStyle">{{ __('Apps') }}</div>
        <DockAppGrid
          :apps="filteredApps"
          @navigate="navigateTo"
        />
      </section>

      <!-- Platform & Extensions: Desk + external apps — admin only -->
      <section v-if="isSystemManager && filteredPlatformApps.length">
        <div :style="sectionLabelStyle">{{ __('Platform & Extensions') }}</div>
        <DockAppGrid
          :apps="filteredPlatformApps"
          @navigate="navigateTo"
        />
      </section>

      <!-- Empty state -->
      <div v-if="!hasResults" class="flex flex-col items-center gap-3 py-8 text-center">
        <Grip class="w-8 h-8 text-[var(--dock-icon)] opacity-40" />
        <p class="text-sm text-[var(--dock-icon)]">
          {{ filter ? __('No apps match your search') : __('Discover ecosystem apps') }}
        </p>
      </div>

      <!-- Footer CTA -->
      <div class="border-t border-[var(--dock-border)] pt-3 mt-2">
        <a
          href="/dock/apps"
          class="flex items-center justify-center px-3 py-2 rounded-lg
                 hover:bg-black/5 dark:hover:bg-white/10 transition-colors
                 text-sm font-medium text-[var(--dock-accent)]"
          @click="closePanel()"
        >
          {{ ctaLabel }}
        </a>
      </div>
    </div>
  </DockPanelShell>
</template>
