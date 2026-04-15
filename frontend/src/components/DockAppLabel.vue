<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockAppLabel' }
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDockBoot } from '@/composables/useDockBoot'
import dockIconUrl from '@/assets/dock-icon.svg'

const props = defineProps<{
  currentPath?: string
}>()

const { settings, registeredApps } = useDockBoot()

type RegApp = { app: string; label: string; icon: string; color?: string; route: string }

/** Resolve the owning app from a /desk/ URL by mapping DocType → module → app. */
function resolveAppFromDeskPath(path: string, apps: RegApp[]): RegApp | null {
  const slug = path.split('/')[2]  // e.g. "micro-offer-draft"
  if (!slug) return null

  // Convert slug to DocType name: "micro-offer-draft" → "Micro Offer Draft"
  const doctype = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  // Strategy 1: Use Frappe's module_app boot mapping (most reliable)
  const frappe = (window as any).frappe
  const moduleApp: Record<string, string> = frappe?.boot?.module_app || {}
  const doctypeModule: string | undefined = frappe?.boot?.doctype_modules?.[doctype]
  if (doctypeModule) {
    const appName = moduleApp[doctypeModule]
    if (appName) {
      const match = apps.find(a => a.app === appName)
      if (match) return match
    }
  }

  // Strategy 2: Match DocType name prefix against registered app labels
  // Works because Frappe convention prefixes DocTypes with app name (e.g. "Micro Offer Draft")
  for (const app of apps) {
    if (doctype.startsWith(app.label + ' ') || doctype === app.label) return app
  }

  return null
}

const activeApp = computed(() => {
  const path = props.currentPath || window.location.pathname
  // Direct route match (Vue SPA pages like /micro/..., /watch/..., etc.)
  const byRoute = (registeredApps.value as RegApp[]).find(a => path.startsWith(a.route)) ?? null
  if (byRoute) return byRoute
  // Fallback for /desk/ pages: resolve from DocType
  if (path.startsWith('/desk/')) {
    return resolveAppFromDeskPath(path, registeredApps.value as RegApp[])
  }
  return null
})

const label = computed(() => {
  if (activeApp.value) return activeApp.value.label
  const raw = settings.value?.site_label || 'Dock'
  return raw.charAt(0).toUpperCase() + raw.slice(1)
})

const iconBroken = ref(false)

const hasIcon = computed(() => !!activeApp.value?.icon && !iconBroken.value)

const iconSrc = computed(() => {
  if (activeApp.value?.icon) return activeApp.value.icon
  return dockIconUrl
})

// Reset broken state when navigating to a different app
watch(() => activeApp.value?.app, () => { iconBroken.value = false })

const iconAlt = computed(() => activeApp.value?.label || 'Dock')

/** First letter of the app label — used as fallback when no icon is provided. */
const letterFallback = computed(() => activeApp.value?.label?.[0] ?? 'D')

/** App color for the letter fallback background. */
const appColor = computed(() => activeApp.value?.color ?? 'var(--dock-accent)')
</script>

<template>
  <div class="dock-app-label flex items-center gap-2 min-w-0 flex-shrink-0">
    <!-- App icon or letter fallback -->
    <img
      v-if="hasIcon || !activeApp"
      :src="iconSrc"
      :alt="iconAlt"
      class="h-6 w-6 rounded-md flex-shrink-0"
      @error="iconBroken = true"
    />
    <svg
      v-else
      viewBox="0 0 24 24"
      class="h-6 w-6 flex-shrink-0"
      :aria-label="iconAlt"
    >
      <rect width="24" height="24" rx="6" :fill="appColor" />
      <text
        x="12" y="12"
        text-anchor="middle"
        dominant-baseline="central"
        fill="white"
        font-size="13"
        font-weight="700"
        font-family="system-ui, -apple-system, sans-serif"
      >{{ letterFallback }}</text>
    </svg>
    <span class="text-sm font-medium text-[var(--dock-text)] truncate max-w-[140px]">
      {{ label }}
    </span>
  </div>
</template>
