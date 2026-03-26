<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Account panel — replaces the avatar dropdown.

  Opens from the avatar button in the top bar. Provides navigation to
  account-related pages, appearance settings, and soft-dependency items.

  "Full page" link goes to /dock/account (the account management page).
-->
<script lang="ts">
export default { name: 'DockAccountPanel' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import {
  User, SlidersHorizontal, Bookmark, StickyNote, Activity, Trash2,
  Clock, DoorOpen, UserCircle2, LogOut,
} from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useTheme } from '@/composables/useTheme'
import { useColorMode } from '@/composables/useColorMode'
import { useDockBoot } from '@/composables/useDockBoot'
import { useDockPanels } from '@/composables/useDockPanels'
import DockPanelShell from './DockPanelShell.vue'

const { theme, setTheme } = useTheme()
const { colorMode, setColorMode } = useColorMode()
const { registeredApps } = useDockBoot()
const { closePanel } = useDockPanels()

// ── Session ────────────────────────────────────────────

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

// ── Context-aware links ────────────────────────────────

const appPrefix = computed(() => {
  const path = window.location.pathname
  type App = { route: string }
  const active = (registeredApps.value as App[]).find(a =>
    a.route !== '/dock' && path.startsWith(a.route)
  )
  return active ? active.route : '/dock'
})

const accountUrl = computed(() => `${appPrefix.value}/account`)
const settingsUrl = computed(() => {
  const prefix = appPrefix.value
  if (prefix !== '/dock') {
    const appRoute = prefix.replace(/^\//, '')
    return `/dock/settings/app/${appRoute}`
  }
  return '/dock/settings'
})
const bookmarksUrl = computed(() => `${appPrefix.value}/bookmarks`)
const notesUrl = computed(() => `${appPrefix.value}/notes`)
const activityUrl = computed(() => `${appPrefix.value}/activity`)
const binUrl = computed(() => `${appPrefix.value}/bin`)

// ── Soft dependencies ──────────────────────────────────

const boot: Record<string, unknown> = (window as any).frappe?.boot ?? (window as any).dockBoot ?? {}
const installedApps: string[] = (boot.installed_apps as string[]) ?? []
const watchInstalled = installedApps.includes('watch')

const binCount = computed(() => (boot as any).dock?.bin_count || 0)

const isPrivileged = computed(() => {
  const deskRoles = (
    (window as any).frappe?.boot?.user?.roles
    ?? (window as any).frappe?.boot?.user_roles
    ?? []
  ) as string[]
  if (deskRoles.includes('System Manager') || deskRoles.includes('Dock Manager')) return true
  return Boolean((window as any).dockBoot?.is_dock_manager)
})

const hasAppsSection = computed(() => watchInstalled || isPrivileged.value)

// ── Theme / Color ──────────────────────────────────────

const themeOptions = [
  { value: 'system' as const, label: __('System') },
  { value: 'light'  as const, label: __('Light')  },
  { value: 'dark'   as const, label: __('Dark')   },
]

const colorModeOptions = [
  { value: 'branded' as const, label: __('Branded') },
  { value: 'neutral' as const, label: __('Neutral') },
]
</script>

<template>
  <DockPanelShell
    title="Account"
    :link="accountUrl"
    link-label="My Account"
    aria-label="Account panel"
    @close="closePanel"
  >
    <!-- § 1 — Identity card -->
    <a
      :href="accountUrl"
      class="block px-4 py-4 border-b border-[var(--dock-border)]
             hover:bg-black/5 dark:hover:bg-white/5 transition-colors no-underline"
      @click="closePanel"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 rounded-full bg-black/10 dark:bg-white/20
                 flex items-center justify-center text-[var(--dock-text)]
                 text-sm font-semibold overflow-hidden flex-shrink-0"
        >
          <img
            v-if="session?.user_image"
            :src="session.user_image"
            :alt="fullName"
            class="w-12 h-12 object-cover"
          />
          <UserCircle2 v-else-if="!initials || initials === '?'" class="w-7 h-7 text-[var(--dock-icon)]" />
          <span v-else>{{ initials }}</span>
        </div>
        <div class="min-w-0">
          <p class="text-sm font-medium text-[var(--dock-text)] truncate">{{ fullName }}</p>
          <p class="text-xs text-[var(--dock-icon)] truncate">{{ session?.user }}</p>
        </div>
      </div>
    </a>

    <!-- § 2 — Navigation -->
    <div class="py-1 border-b border-[var(--dock-border)]">
      <a
        :href="accountUrl"
        class="flex items-center gap-3 px-4 py-2 text-sm text-[var(--dock-text)]
               hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
        @click="closePanel"
      >
        <User class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
        {{ __('My Account') }}
      </a>
      <a
        :href="settingsUrl"
        class="flex items-center gap-3 px-4 py-2 text-sm text-[var(--dock-text)]
               hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
        @click="closePanel"
      >
        <SlidersHorizontal class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
        {{ __('Preferences') }}
      </a>
      <a
        :href="bookmarksUrl"
        class="flex items-center gap-3 px-4 py-2 text-sm text-[var(--dock-text)]
               hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
        @click="closePanel"
      >
        <Bookmark class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
        {{ __('Bookmarks') }}
      </a>
      <a
        :href="notesUrl"
        class="flex items-center gap-3 px-4 py-2 text-sm text-[var(--dock-text)]
               hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
        @click="closePanel"
      >
        <StickyNote class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
        {{ __('Notes') }}
      </a>
      <a
        :href="activityUrl"
        class="flex items-center gap-3 px-4 py-2 text-sm text-[var(--dock-text)]
               hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
        @click="closePanel"
      >
        <Activity class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
        {{ __('Activity') }}
      </a>
      <a
        :href="binUrl"
        class="flex items-center gap-3 px-4 py-2 text-sm text-[var(--dock-text)]
               hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
        @click="closePanel"
      >
        <Trash2 class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
        {{ __('Bin') }}
        <span
          v-if="binCount > 0"
          class="ml-auto text-xs text-[var(--dock-icon)] bg-black/5 dark:bg-white/10
                 rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center"
        >
          {{ binCount }}
        </span>
      </a>
    </div>

    <!-- § 3 — Apps (conditional) -->
    <div v-if="hasAppsSection" class="py-1 border-b border-[var(--dock-border)]">
      <a
        v-if="watchInstalled"
        href="/app/ft-timer"
        class="flex items-center gap-3 px-4 py-2 text-sm text-[var(--dock-text)]
               hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
        @click="closePanel"
      >
        <Clock class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
        {{ __('Time') }}
      </a>
      <a
        v-if="isPrivileged"
        href="/dock/guest"
        class="flex items-center gap-3 px-4 py-2 text-sm text-[var(--dock-text)]
               hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
        @click="closePanel"
      >
        <DoorOpen class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
        {{ __('Guest Portal') }}
      </a>
    </div>

    <!-- § 4 — Appearance -->
    <div class="px-4 py-3 border-b border-[var(--dock-border)]">
      <p class="text-xs font-medium text-[var(--dock-icon)] uppercase tracking-wide mb-2">
        {{ __('Theme') }}
      </p>
      <div
        class="flex gap-1 bg-gray-100 dark:bg-gray-900 rounded-lg p-1"
        role="radiogroup"
        :aria-label="__('Theme preference')"
      >
        <button
          v-for="opt in themeOptions"
          :key="opt.value"
          class="flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors"
          :class="theme === opt.value
            ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'"
          role="radio"
          :aria-checked="theme === opt.value"
          @click="setTheme(opt.value)"
        >
          {{ opt.label }}
        </button>
      </div>

      <p class="text-xs font-medium text-[var(--dock-icon)] uppercase tracking-wide mt-3 mb-2">
        {{ __('Colors') }}
      </p>
      <div
        class="flex gap-1 bg-gray-100 dark:bg-gray-900 rounded-lg p-1"
        role="radiogroup"
        :aria-label="__('Color mode')"
      >
        <button
          v-for="opt in colorModeOptions"
          :key="opt.value"
          class="flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors"
          :class="colorMode === opt.value
            ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'"
          role="radio"
          :aria-checked="colorMode === opt.value"
          @click="setColorMode(opt.value)"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <!-- § 5 — Help (future slot — hidden when empty) -->
    <!-- Future: Tour, What's New, Help Center, Keyboard Shortcuts -->

    <!-- § 6 — Logout -->
    <div class="py-1">
      <a
        href="/app/logout"
        class="flex items-center gap-3 px-4 py-2 text-sm
               text-red-600 dark:text-red-400
               hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
      >
        <LogOut class="w-4 h-4" aria-hidden="true" />
        {{ __('Log out') }}
      </a>
    </div>
  </DockPanelShell>
</template>
