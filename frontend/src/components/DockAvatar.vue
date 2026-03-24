<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Avatar button + account menu dropdown.
  All Section 2 links are context-aware: they resolve to /{currentApp}/... based on
  the active app detected from window.location.pathname. Fallback: /dock/...
  Structure:
    [Avatar] Name / email
    ────────────────────
    My Account  → /{app}/account
    Preferences → /{app}/settings
    Bookmarks   → /{app}/bookmarks
    Notes       → /{app}/notes
    Activity    → /{app}/activity
    ────────────────────
    Time  (if watch)
    Guest Portal  (if privileged)
    ────────────────────
    [☀] [🖥] [🌙]  theme pill (icon-only)
    ────────────────────
    Log out  (red)
-->
<script lang="ts">
export default { name: 'DockAvatar' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  UserCircle2, User, SlidersHorizontal, Bookmark, StickyNote, Activity, Trash2, Clock, DoorOpen,
  Settings, LogOut,
} from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useTheme } from '@/composables/useTheme'
import { useColorMode } from '@/composables/useColorMode'
import { useDropdownExclusion } from '@/composables/useDropdownExclusion'
import { useDockBoot } from '@/composables/useDockBoot'

const { theme, setTheme } = useTheme()
const { colorMode, setColorMode } = useColorMode()
const { registeredApps } = useDockBoot()

// Context-aware app prefix — resolves to /orga when in Orga, /watch when in Watch, /dock as fallback
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
  // Domain apps route to /dock/settings/app/{appRoute} (the unified settings hub)
  // Dock itself routes to /dock/settings
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

const binCount = computed(() => (boot as any).dock?.bin_count || 0)

const triggerRef  = ref<HTMLButtonElement | null>(null)
const wrapperRef  = ref<HTMLElement | null>(null)
const { open, toggle, close } = useDropdownExclusion('avatar', triggerRef)

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

// Soft-dependency checks
const boot: Record<string, unknown> = (window as any).frappe?.boot ?? (window as any).dockBoot ?? {}
const installedApps: string[] = (boot.installed_apps as string[]) ?? []
const watchInstalled = installedApps.includes('watch')

// Privileged items (Guest Portal) — System Manager / Dock Manager only
const isPrivileged = computed(() => {
  // Desk: boot.user.roles; Domain SPAs (Orga/Watch): boot.user_roles
  const deskRoles = (
    (window as any).frappe?.boot?.user?.roles
    ?? (window as any).frappe?.boot?.user_roles
    ?? []
  ) as string[]
  if (deskRoles.includes('System Manager') || deskRoles.includes('Dock Manager')) return true
  return Boolean((window as any).dockBoot?.is_dock_manager)
})

// Theme options
const themeOptions = [
  { value: 'system' as const, label: __('System') },
  { value: 'light'  as const, label: __('Light')  },
  { value: 'dark'   as const, label: __('Dark')   },
]

// Color mode options
const colorModeOptions = [
  { value: 'branded' as const, label: __('Branded') },
  { value: 'neutral' as const, label: __('Neutral') },
]

// Close on outside click or Escape
function onClickOutside(e: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    close()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) close()
}

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="wrapperRef" class="dock-avatar relative">
    <!-- Trigger -->
    <button
      ref="triggerRef"
      class="w-8 h-8 rounded-full bg-black/10 dark:bg-white/20
             hover:bg-black/15 dark:hover:bg-white/30 transition-colors
             flex items-center justify-center text-[var(--dock-text)] text-xs font-semibold overflow-hidden"
      :aria-expanded="open"
      aria-haspopup="true"
      :aria-label="__('User menu')"
      :title="fullName || __('User menu')"
      @click.stop="toggle"
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

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0 translate-y-1.5"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1.5"
    >
      <div
        v-if="open"
        class="rounded-lg shadow-lg border border-[var(--dock-border)]
               bg-[var(--dock-bg)] py-1"
        :style="{
          position: 'absolute',
          right: '0',
          top: '100%',
          marginTop: '0.5rem',
          width: '14rem',
          zIndex: 9999,
        }"
        role="menu"
      >
        <!-- § 1 — Identity header -->
        <div class="px-3 py-2.5 border-b border-[var(--dock-border)]">
          <p class="text-sm font-medium text-[var(--dock-text)] truncate">{{ fullName }}</p>
          <p class="text-xs text-[var(--dock-icon)] truncate">{{ session?.user }}</p>
        </div>

        <!-- § 2 — Core nav -->
        <div class="py-1 border-b border-[var(--dock-border)]">
          <a
            :href="accountUrl"
            role="menuitem"
            class="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
            @click="close"
          >
            <User class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
            {{ __('My Account') }}
          </a>
          <a
            :href="settingsUrl"
            role="menuitem"
            class="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
            @click="close"
          >
            <SlidersHorizontal class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
            {{ __('Preferences') }}
          </a>
          <a
            :href="bookmarksUrl"
            role="menuitem"
            class="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
            @click="close"
          >
            <Bookmark class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
            {{ __('Bookmarks') }}
          </a>
          <a
            :href="notesUrl"
            role="menuitem"
            class="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
            @click="close"
          >
            <StickyNote class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
            {{ __('Notes') }}
          </a>
          <a
            :href="activityUrl"
            role="menuitem"
            class="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
            @click="close"
          >
            <Activity class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
            {{ __('Activity') }}
          </a>
          <a
            :href="binUrl"
            role="menuitem"
            class="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
            @click="close"
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

        <!-- § 3 — Soft-dep items -->
        <div v-if="watchInstalled || isPrivileged" class="py-1 border-b border-[var(--dock-border)]">
          <a
            v-if="watchInstalled"
            href="/app/ft-timer"
            role="menuitem"
            class="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
            @click="close"
          >
            <Clock class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
            {{ __('Time') }}
          </a>
          <a
            v-if="isPrivileged"
            href="/dock/guest"
            role="menuitem"
            class="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors no-underline"
            @click="close"
          >
            <DoorOpen class="w-4 h-4 text-[var(--dock-icon)]" aria-hidden="true" />
            {{ __('Guest Portal') }}
          </a>
        </div>

        <!-- § 4 — Theme toggle -->
        <div class="px-4 py-3 border-b border-[var(--dock-border)]" @click.stop>
          <div class="flex items-center gap-2 mb-2">
            <Settings class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {{ __('Theme') }}
            </span>
          </div>
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

          <!-- Color mode toggle -->
          <div class="flex items-center gap-2 mt-3 mb-1">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {{ __('Colors') }}
            </span>
          </div>
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

        <!-- § 5 — Log out -->
        <div class="py-1">
          <a
            href="/app/logout"
            role="menuitem"
            class="flex items-center gap-2 px-3 py-1.5 text-sm
                   text-red-600 dark:text-red-400
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <LogOut class="w-4 h-4" />
            {{ __('Log out') }}
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>
