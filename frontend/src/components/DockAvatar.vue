<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Avatar button + dropdown menu.
  Dropdown structure (from spec):
    [Avatar] Name / email
    ─────────────────────
    My Profile | Preferences
    ─────────────────────
    Time  (if frappe_time)
    Frame (if frame)
    Ecosystem Apps
    ─────────────────────
    [☀] [🖥] [🌙]  theme pill
    ─────────────────────
    Log out  (red)
-->
<script lang="ts">
export default { name: 'DockAvatar' }
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { UserCircle2, Sun, Monitor, Moon, LogOut } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'

const open = ref(false)

// Session — Desk: window.frappe.session; /dock web pages: dockBoot.session
const session = computed(() => window.frappe?.session ?? (window as any).dockBoot?.session)

const initials = computed(() => {
  const name = session.value?.user_fullname || session.value?.user || '?'
  return name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
})

// Soft-dependency checks
const boot = (window as any).frappe?.boot ?? (window as any).dockBoot
const installedApps: string[] = boot?.installed_apps ?? []
const frappeTimeInstalled = installedApps.includes('frappe_time')
const frameInstalled      = installedApps.includes('frame')

// Theme
type Theme = 'light' | 'system' | 'dark'
const theme = ref<Theme>((localStorage.getItem('dock-theme') as Theme) ?? 'system')

function applyTheme(t: Theme) {
  theme.value = t
  localStorage.setItem('dock-theme', t)
  const dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
  // Persist to server (best-effort, no await)
  callApi('dock.api.settings.save_user_preference', { values: { theme: t } }).catch(() => {})
}
</script>

<template>
  <div class="dock-avatar relative">
    <button
      class="w-8 h-8 rounded-full bg-black/10 dark:bg-white/20
             hover:bg-black/15 dark:hover:bg-white/30 transition-colors
             flex items-center justify-center text-[var(--dock-text)] text-xs font-semibold overflow-hidden"
      :aria-expanded="open"
      aria-haspopup="true"
      aria-label="User menu"
      title="User menu"
      @click="open = !open"
    >
      <img
        v-if="session?.user_image"
        :src="session.user_image"
        :alt="session?.user_fullname"
        class="w-8 h-8 object-cover"
      />
      <UserCircle2 v-else-if="!initials || initials === '?'" class="w-5 h-5 text-[var(--dock-icon)]" />
      <span v-else>{{ initials }}</span>
    </button>

    <div
      v-if="open"
      class="absolute right-0 top-full mt-2 w-56 bg-[var(--dock-bg)] border border-[var(--dock-border)]
             rounded-lg shadow-lg py-1 z-20"
      role="menu"
    >
      <!-- Name + email header -->
      <div class="px-3 py-2 border-b border-[var(--dock-border)]">
        <p class="text-sm font-medium text-[var(--dock-text)] truncate">
          {{ session?.user_fullname }}
        </p>
        <p class="text-xs text-[var(--dock-icon)] truncate">{{ session?.user }}</p>
      </div>

      <!-- Profile + preferences -->
      <div class="py-1 border-b border-[var(--dock-border)]">
        <a
          :href="`/app/user/${session?.user}`"
          role="menuitem"
          class="block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >{{ __('My Profile') }}</a>
        <a
          href="/dock/settings"
          role="menuitem"
          class="block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >{{ __('Preferences') }}</a>
      </div>

      <!-- Conditional app links -->
      <div v-if="frappeTimeInstalled || frameInstalled" class="py-1 border-b border-[var(--dock-border)]">
        <a
          v-if="frappeTimeInstalled"
          href="/app/ft-timer"
          role="menuitem"
          class="block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >{{ __('Time') }}</a>
        <a
          v-if="frameInstalled"
          href="/dock/guest/sessions"
          role="menuitem"
          class="block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >{{ __('Frame') }}</a>
        <a
          href="/dock/people"
          role="menuitem"
          class="block px-3 py-1.5 text-sm text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >{{ __('Ecosystem Apps') }}</a>
      </div>

      <!-- Theme pill -->
      <div class="px-3 py-2 border-b border-[var(--dock-border)]">
        <div class="flex gap-1 bg-black/5 dark:bg-white/10 rounded-full p-1">
          <button
            :class="theme === 'light'
              ? 'bg-[var(--dock-bg)] shadow-sm text-[var(--dock-text)]'
              : 'text-[var(--dock-icon)] hover:text-[var(--dock-text)]'"
            class="flex-1 flex items-center justify-center rounded-full p-1 transition-all"
            :aria-pressed="theme === 'light'"
            :title="__('Light')"
            @click="applyTheme('light')"
          >
            <Sun class="w-4 h-4" />
          </button>
          <button
            :class="theme === 'system'
              ? 'bg-[var(--dock-bg)] shadow-sm text-[var(--dock-text)]'
              : 'text-[var(--dock-icon)] hover:text-[var(--dock-text)]'"
            class="flex-1 flex items-center justify-center rounded-full p-1 transition-all"
            :aria-pressed="theme === 'system'"
            :title="__('System')"
            @click="applyTheme('system')"
          >
            <Monitor class="w-4 h-4" />
          </button>
          <button
            :class="theme === 'dark'
              ? 'bg-[var(--dock-bg)] shadow-sm text-[var(--dock-text)]'
              : 'text-[var(--dock-icon)] hover:text-[var(--dock-text)]'"
            class="flex-1 flex items-center justify-center rounded-full p-1 transition-all"
            :aria-pressed="theme === 'dark'"
            :title="__('Dark')"
            @click="applyTheme('dark')"
          >
            <Moon class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Log out -->
      <div class="py-1">
        <a
          href="/app/logout"
          role="menuitem"
          class="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 dark:text-red-400
                 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <LogOut class="w-4 h-4" />
          {{ __('Log out') }}
        </a>
      </div>
    </div>
  </div>
</template>
