<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Avatar button + account menu dropdown.
  Structure (per ecosystem spec account-menu.md):
    [Avatar] Name / email
    ────────────────────
    My Profile | Preferences
    ────────────────────
    Time  (if frappe_time)
    Guest Portal | People
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
import { UserCircle2, Settings, LogOut } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useTheme } from '@/composables/useTheme'

const { theme, setTheme } = useTheme()

const open        = ref(false)
const wrapperRef  = ref<HTMLElement | null>(null)

// Session — Frappe Desk: window.frappe.session; /dock web pages: dockBoot.session
const session = computed(() => window.frappe?.session ?? (window as any).dockBoot?.session)

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
const frappeTimeInstalled = installedApps.includes('frappe_time')


// Theme options
const themeOptions = [
  { value: 'system' as const, label: __('System') },
  { value: 'light'  as const, label: __('Light')  },
  { value: 'dark'   as const, label: __('Dark')   },
]

// Close on outside click or Escape
function onClickOutside(e: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="wrapperRef" class="dock-avatar relative">
    <!-- Trigger -->
    <button
      class="w-8 h-8 rounded-full bg-black/10 dark:bg-white/20
             hover:bg-black/15 dark:hover:bg-white/30 transition-colors
             flex items-center justify-center text-[var(--dock-text)] text-xs font-semibold overflow-hidden"
      :aria-expanded="open"
      aria-haspopup="true"
      :aria-label="__('User menu')"
      :title="fullName || __('User menu')"
      @click="open = !open"
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
        class="absolute right-0 top-full mt-2 w-56 rounded-lg shadow-lg border border-[var(--dock-border)]
               bg-white dark:bg-[#1a1f2e] py-1 z-20"
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
            :href="`/app/user/${session?.user}`"
            role="menuitem"
            class="block px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            @click="open = false"
          >{{ __('My Profile') }}</a>
          <a
            href="/dock/settings"
            role="menuitem"
            class="block px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            @click="open = false"
          >{{ __('Preferences') }}</a>
        </div>

        <!-- § 3 — Soft-dep items -->
        <div class="py-1 border-b border-[var(--dock-border)]">
          <a
            v-if="frappeTimeInstalled"
            href="/app/ft-timer"
            role="menuitem"
            class="block px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            @click="open = false"
          >{{ __('Time') }}</a>
          <a
            href="/dock/guest"
            role="menuitem"
            class="block px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            @click="open = false"
          >{{ __('Guest Portal') }}</a>
          <a
            href="/dock/people"
            role="menuitem"
            class="block px-3 py-1.5 text-sm text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            @click="open = false"
          >{{ __('People') }}</a>
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
