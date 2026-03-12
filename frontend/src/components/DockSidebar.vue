<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Left navigation sidebar for the Dock SPA.
  Only rendered inside /dock/* — never injected into domain apps.

  Follows ecosystem.localhost/spec/design/ui-specs/sidebar-nav.md
  Spec: dock.localhost/spec/features/sidebar-nav.md
-->
<script lang="ts">
export default { name: 'DockSidebar' }
</script>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useRoute } from 'vue-router'
import {
  Settings, Users, CalendarDays, Bell, Link,
} from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useSidebar } from '@/composables/useSidebar'
import { useDockBoot } from '@/composables/useDockBoot'

const { collapsed, mobileOpen, closeMobile } = useSidebar()
const { dock } = useDockBoot()
const route = useRoute()

interface NavItem {
  path: string
  name: string
  icon: Component
  badge?: number
  systemManagerOnly?: boolean
}

const unreadCount = computed(() => (dock.value as any)?.unread_count ?? 0)

const isSystemManager = computed(() => {
  const roles: string[] =
    (window as any).frappe?.session?.user_roles ??
    (window as any).dockBoot?.session?.user_roles ?? []
  return roles.includes('System Manager')
})

const navItems = computed<NavItem[]>(() => [
  { path: '/settings',      name: __('Settings'),      icon: Settings },
  { path: '/people',        name: __('People'),        icon: Users },
  { path: '/calendar',      name: __('Calendar'),      icon: CalendarDays },
  { path: '/notifications', name: __('Notifications'), icon: Bell, badge: unreadCount.value },
  ...(isSystemManager.value
    ? [{ path: '/guest', name: __('Guest Portal'), icon: Link as Component, systemManagerOnly: true }]
    : []
  ),
])

function isActive(item: NavItem): boolean {
  if (item.path === '/') return route.path === '/'
  return route.path.startsWith(item.path)
}

const sidebarClasses = computed<string>(() => [
  'dock-sidebar bg-dock-600 flex-shrink-0 flex flex-col transition-all duration-200',
  collapsed.value ? 'w-16' : 'w-52',
  'max-sm:fixed max-sm:left-0 max-sm:top-14 max-sm:h-[calc(100vh-3.5rem)] max-sm:z-40',
  mobileOpen.value ? 'max-sm:translate-x-0' : 'max-sm:-translate-x-full',
].join(' '))

const itemClasses = (item: NavItem): string => [
  'group sidebar-item flex items-center no-underline transition-all duration-200 rounded-r-lg relative min-h-[44px]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dock-600',
  collapsed.value ? 'justify-center px-2 py-3 mx-1' : 'gap-3 px-4 py-3 mr-2',
  isActive(item)
    ? 'bg-white/20 text-white font-semibold border-r-4 border-white'
    : 'text-white/90 hover:bg-white/10 hover:text-white',
].join(' ')

const iconClasses = (item: NavItem): string => [
  'transition-transform duration-200 flex-shrink-0',
  collapsed.value ? 'w-6 h-6' : 'w-5 h-5',
  isActive(item) ? 'scale-110' : 'group-hover:scale-105',
].join(' ')
</script>

<template>
  <aside :class="sidebarClasses">
    <!-- Nav items -->
    <nav class="py-3 flex-1 overflow-y-auto">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        :class="['group', itemClasses(item)]"
        :title="collapsed ? item.name : ''"
        @click="closeMobile()"
      >
        <component :is="item.icon" :class="iconClasses(item)" />

        <span v-if="!collapsed" class="flex-1 text-sm">{{ item.name }}</span>

        <!-- Unread badge -->
        <span
          v-if="item.badge && item.badge > 0"
          :class="[
            'rounded-full bg-white text-dock-600 font-bold leading-none flex items-center justify-center',
            collapsed
              ? 'absolute top-1 right-1 w-4 h-4 text-[9px]'
              : 'ml-auto px-1.5 py-0.5 text-[10px] min-w-[18px] text-center',
          ]"
          :aria-label="`${item.badge} unread`"
        >
          {{ item.badge > 99 ? '99+' : item.badge }}
        </span>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="py-3 border-t border-dock-400">
      <!-- Edition + version (expanded) -->
      <div v-if="!collapsed" class="px-4 pb-2">
        <div class="text-sm font-semibold text-white/80">{{ __('Community Edition') }}</div>
        <div class="text-xs text-dock-200">v0.0.1</div>
      </div>

      <!-- Links -->
      <div :class="['flex items-center', collapsed ? 'justify-center px-2' : 'gap-4 px-4']">
        <!-- AGPL source code requirement -->
        <a
          href="https://github.com/tonic-6101/dock"
          target="_blank"
          rel="noopener noreferrer"
          class="text-dock-200 hover:text-white transition-colors"
          :title="__('Source Code')"
          aria-label="Source Code on GitHub"
        >
          <!-- GitHub icon via SVG (Lucide has no GitHub icon) -->
          <svg
            :class="collapsed ? 'w-6 h-6' : 'w-4 h-4'"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>
    </div>
  </aside>

  <!-- Mobile backdrop -->
  <div
    v-if="mobileOpen"
    class="fixed inset-0 bg-black/50 z-30 sm:hidden"
    @click="closeMobile()"
  />
</template>
