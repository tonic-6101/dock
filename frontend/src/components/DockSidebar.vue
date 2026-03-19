<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Left navigation sidebar for the Dock SPA — unified settings hub.
  Only rendered inside /dock/* — never injected into domain apps.

  Shows three sections:
    1. Dock settings (General, Notifications, Calendar, People)
    2. App settings (dynamic — from dock_settings_sections hooks)
    3. Admin pages (Guest Portal, Ecosystem Apps — System Manager only)

  Follows ecosystem.localhost/spec/design/ui-specs/sidebar-nav.md
  Spec: dock.localhost/spec/features/sidebar-nav.md (revised 2026-03-19)
-->
<script lang="ts">
export default { name: 'DockSidebar' }
</script>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useRoute } from 'vue-router'
import {
  Settings, Bell, CalendarDays, Users, Link, LayoutGrid,
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
  icon: Component | string
  iconIsUrl?: boolean
  badge?: number
}

interface NavSection {
  label: string
  items: NavItem[]
}

const isSystemManager = computed(() => {
  // Frappe Desk: frappe.session.user_roles
  // Dock SPA: dockBoot.is_system_manager (flat flag, no roles array in SPA boot)
  const roles: string[] =
    (window as any).frappe?.session?.user_roles ??
    (window as any).dockBoot?.session?.user_roles ?? []
  if (roles.includes('System Manager')) return true
  return Boolean((window as any).dockBoot?.is_system_manager)
})

// Section 1: Dock's own settings
const dockSettingsItems = computed<NavItem[]>(() => [
  { path: '/settings',               name: __('General'),       icon: Settings },
  { path: '/settings/notifications', name: __('Notifications'), icon: Bell },
  { path: '/settings/calendar',     name: __('Calendar'),      icon: CalendarDays },
  { path: '/settings/people',       name: __('People'),        icon: Users },
])

// Section 2: App settings (dynamic — from dock_settings_sections hooks)
const appSettingsItems = computed<NavItem[]>(() => {
  const sections = (dock.value as any)?.settings_sections ?? []
  return sections.map((s: any) => ({
    path: `/settings/app/${s.route}`,
    name: s.label,
    icon: s.icon_url || s.icon || Settings,
    iconIsUrl: !!s.icon_url,
  }))
})

// Section 3: Admin pages (System Manager only)
const adminItems = computed<NavItem[]>(() => {
  if (!isSystemManager.value) return []
  return [
    { path: '/guest', name: __('Guest Portal'),    icon: Link as Component },
    { path: '/apps',  name: __('Ecosystem Apps'),   icon: LayoutGrid as Component },
  ]
})

// All sections
const sections = computed<NavSection[]>(() => {
  const result: NavSection[] = [
    { label: __('Dock'), items: dockSettingsItems.value },
  ]
  if (appSettingsItems.value.length > 0) {
    result.push({ label: __('Apps'), items: appSettingsItems.value })
  }
  if (adminItems.value.length > 0) {
    result.push({ label: __('Admin'), items: adminItems.value })
  }
  return result
})

function isActive(item: NavItem): boolean {
  if (item.path === '/settings') {
    return route.path === '/settings' || route.path === '/'
  }
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
    <!-- Nav sections -->
    <nav class="py-3 flex-1 overflow-y-auto">
      <template v-for="(section, sIdx) in sections" :key="section.label">
        <!-- Section divider (not before first section) -->
        <div
          v-if="sIdx > 0"
          class="border-t border-white/20 my-2"
        />

        <!-- Section label (expanded only) -->
        <div
          v-if="!collapsed"
          class="text-white/50 text-xs uppercase tracking-wider px-4 py-1 select-none"
          role="group"
          :aria-label="section.label"
        >
          {{ section.label }}
        </div>

        <!-- Section items -->
        <router-link
          v-for="item in section.items"
          :key="item.path"
          :to="item.path"
          :class="['group', itemClasses(item)]"
          :title="collapsed ? item.name : ''"
          @click="closeMobile()"
        >
          <!-- Dynamic icon: URL-based or Lucide component -->
          <img
            v-if="item.iconIsUrl"
            :src="item.icon as string"
            :alt="item.name"
            :class="iconClasses(item)"
          />
          <component
            v-else
            :is="item.icon"
            :class="iconClasses(item)"
          />

          <span v-if="!collapsed" class="flex-1 text-sm">{{ item.name }}</span>
        </router-link>
      </template>
    </nav>

    <!-- Footer -->
    <div class="py-3 border-t border-dock-400">
      <!-- Edition + version (expanded) -->
      <div v-if="!collapsed" class="px-4 pb-2">
        <div class="text-sm font-semibold text-white/80">{{ __('Community Edition') }}</div>
        <div class="text-xs text-dock-200">v0.2.0</div>
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
