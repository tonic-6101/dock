<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  DockSidebarShell — reusable sidebar layout shell for domain apps.

  Handles collapse/expand, mobile overlay, active states, footer, and
  accessibility. Domain apps provide nav items and a brand color.

  Usage (in any domain app's App.vue):

    import { DockLayout, DockSidebarShell } from '/assets/dock/js/dock-navbar.esm.js'
    import { Home, Settings } from 'lucide-vue-next'

    const items = [
      { key: 'home', label: __('Home'), icon: Home, path: '/app', exact: true },
      { key: 'settings', label: __('Settings'), icon: Settings, path: '/app/settings' },
    ]

    <DockLayout>
      <DockSidebarShell color="#f59e0b" :items="items" :footer="{ edition: 'Community Edition', version: '0.1.0', sourceUrl: '...' }" />
      <main class="flex-1 overflow-y-auto"><RouterView /></main>
    </DockLayout>

  Spec: ecosystem.localhost/spec/apps/dock/features/community/sidebar-shell.md
-->
<script lang="ts">
export default { name: 'DockSidebarShell' }
</script>

<script setup lang="ts">
import { computed, ref, type Component, type Ref, unref, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

// ── Types ─────────────────────────────────────────────────────────────────

export interface SidebarNavItem {
  key: string
  label: string
  icon: Component
  path: string
  exact?: boolean
  badge?: number | Ref<number>
  divider?: boolean
  visible?: boolean | Ref<boolean> | (() => boolean)
}

export interface SidebarFooterLink {
  label: string
  url: string
  icon?: Component
}

export interface SidebarFooter {
  edition: string
  version: string
  sourceUrl: string
  links?: SidebarFooterLink[]
  updateAvailable?: boolean | Ref<boolean>
  updateUrl?: string
}

// ── Props ─────────────────────────────────────────────────────────────────

const props = defineProps<{
  /** CSS color for sidebar background (hex, e.g. '#f59e0b') */
  color: string
  /** Navigation items */
  items: SidebarNavItem[]
  /** Footer config */
  footer?: SidebarFooter
  /** localStorage key — default: derived from first item's path */
  storageKey?: string
  /** Aria label for the sidebar */
  ariaLabel?: string
}>()

// ── Sidebar state ─────────────────────────────────────────────────────────

const resolvedStorageKey = computed(() => {
  if (props.storageKey) return props.storageKey
  const first = props.items[0]
  if (first?.path) {
    const app = first.path.split('/').filter(Boolean)[0] || 'app'
    return `${app}-sidebar-collapsed`
  }
  return 'dock-shell-sidebar-collapsed'
})

const collapsed = ref<boolean>(localStorage.getItem(resolvedStorageKey.value) === 'true')
const mobileOpen = ref<boolean>(false)

function isMobile(): boolean {
  return window.innerWidth <= 576
}

function toggle(): void {
  if (isMobile()) {
    mobileOpen.value = !mobileOpen.value
  } else {
    collapsed.value = !collapsed.value
    localStorage.setItem(resolvedStorageKey.value, String(collapsed.value))
  }
}

function closeMobile(): void {
  mobileOpen.value = false
}

// Bridge: DockNavbar dispatches this event when sidebar toggle is clicked
function onDockToggle() { toggle() }

onMounted(() => window.addEventListener('dock:toggleSidebar', onDockToggle))
onUnmounted(() => window.removeEventListener('dock:toggleSidebar', onDockToggle))

// ── Route matching ────────────────────────────────────────────────────────

// useRoute() may return undefined when rendered outside a router context
// (e.g. duplicate vue-router instances across bundles, or Desk integration).
const route = useRoute() as ReturnType<typeof useRoute> | undefined

function isActive(item: SidebarNavItem): boolean {
  if (!route?.path) return false
  if (item.exact) return route.path === item.path
  return route.path === item.path || route.path.startsWith(item.path + '/')
}

// ── Visibility ────────────────────────────────────────────────────────────

function isVisible(item: SidebarNavItem): boolean {
  if (item.visible === undefined) return true
  if (typeof item.visible === 'function') return item.visible()
  return unref(item.visible)
}

const visibleItems = computed(() => props.items.filter(isVisible))

// ── Badge value ───────────────────────────────────────────────────────────

function badgeValue(item: SidebarNavItem): number {
  if (item.badge === undefined) return 0
  return unref(item.badge) ?? 0
}

// ── Footer ────────────────────────────────────────────────────────────────

const hasUpdate = computed(() => {
  if (!props.footer?.updateAvailable) return false
  return unref(props.footer.updateAvailable)
})
</script>

<template>
  <!-- Mobile backdrop -->
  <div
    v-if="mobileOpen"
    class="fixed inset-0 z-30 sm:hidden"
    style="background: rgba(0,0,0,0.5)"
    @click="closeMobile()"
  />

  <aside
    :class="[
      'flex-shrink-0 flex flex-col transition-all duration-200',
      collapsed ? 'w-16' : 'w-52',
      'max-sm:fixed max-sm:left-0 max-sm:top-14 max-sm:h-[calc(100vh-3.5rem)] max-sm:z-40 max-sm:w-52',
      mobileOpen ? 'max-sm:translate-x-0' : 'max-sm:-translate-x-full',
    ]"
    :style="{ backgroundColor: color }"
    :aria-label="ariaLabel || 'Navigation'"
  >
    <!-- Nav items -->
    <nav class="flex-1 overflow-y-auto py-3">
      <template v-for="item in visibleItems" :key="item.key">
        <!-- Section divider -->
        <div
          v-if="item.divider"
          class="my-2"
          style="border-top: 1px solid rgba(255,255,255,0.2)"
        />

        <RouterLink
          :to="item.path"
          :class="[
            'group sidebar-item flex items-center no-underline',
            'transition-all duration-200 rounded-r-lg relative',
            'min-h-[44px]',
            'focus-visible:outline-none focus-visible:ring-2',
            collapsed ? 'justify-center px-2 py-3 mx-1' : 'gap-3 px-4 py-3 mr-2',
            isActive(item)
              ? 'font-semibold'
              : '',
          ]"
          :style="{
            color: 'white',
            opacity: isActive(item) ? 1 : 0.9,
            backgroundColor: isActive(item) ? 'rgba(255,255,255,0.2)' : undefined,
            borderRight: isActive(item) ? '4px solid white' : undefined,
            '--tw-ring-color': 'rgba(255,255,255,0.5)',
            '--tw-ring-offset-color': color,
          }"
          :title="collapsed ? item.label : ''"
          @click="closeMobile()"
          @mouseenter="($event.currentTarget as HTMLElement).style.backgroundColor = isActive(item) ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'"
          @mouseleave="($event.currentTarget as HTMLElement).style.backgroundColor = isActive(item) ? 'rgba(255,255,255,0.2)' : ''"
        >
          <!-- Icon -->
          <component
            :is="item.icon"
            :class="[
              'transition-transform duration-200 flex-shrink-0',
              collapsed ? 'w-6 h-6' : 'w-5 h-5',
              isActive(item) ? 'scale-110' : 'group-hover:scale-105',
            ]"
            aria-hidden="true"
          />

          <!-- Label (expanded only) -->
          <span v-if="!collapsed" class="flex-1 text-sm">{{ item.label }}</span>

          <!-- Badge -->
          <template v-if="badgeValue(item) > 0">
            <!-- Collapsed: small dot -->
            <span
              v-if="collapsed"
              class="absolute top-1 right-1 w-2.5 h-2.5 rounded-full"
              style="background: rgba(255,255,255,0.8)"
            />
            <!-- Expanded: pill with count -->
            <span
              v-else
              class="ml-auto px-1.5 py-0.5 text-[10px] min-w-[18px] text-center rounded-full font-bold leading-none"
              style="background: rgba(255,255,255,0.3); color: white"
            >
              {{ badgeValue(item) > 99 ? '99+' : badgeValue(item) }}
            </span>
          </template>
        </RouterLink>
      </template>
    </nav>

    <!-- Footer -->
    <div
      class="py-3"
      style="border-top: 1px solid rgba(255,255,255,0.2)"
    >
      <slot name="above-footer" />

      <slot name="footer">
        <template v-if="footer">
          <!-- Edition + version (expanded) -->
          <div v-if="!collapsed" class="px-4 pb-2">
            <div class="text-sm font-semibold" style="color: rgba(255,255,255,0.8)">
              {{ footer.edition }}
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-xs" style="color: rgba(255,255,255,0.6)">
                v{{ footer.version }}
              </span>
              <a
                v-if="hasUpdate && footer.updateUrl"
                :href="footer.updateUrl"
                class="flex items-center gap-1 text-xs no-underline transition-colors"
                style="color: #fbbf24"
              >
                <span>&uarr; Update</span>
              </a>
            </div>
          </div>

          <!-- Collapsed: update dot -->
          <div v-if="collapsed && hasUpdate" class="flex justify-center pb-2">
            <span
              class="w-2.5 h-2.5 rounded-full animate-pulse block"
              style="background: #fbbf24"
              title="Update available"
            />
          </div>

          <!-- Links -->
          <div :class="['flex items-center', collapsed ? 'justify-center px-2' : 'gap-4 px-4']">
            <!-- AGPL source code link (mandatory) -->
            <a
              :href="footer.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors"
              style="color: rgba(255,255,255,0.6)"
              title="Source Code"
              aria-label="Source Code on GitHub"
              @mouseenter="($event.currentTarget as HTMLElement).style.color = 'white'"
              @mouseleave="($event.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'"
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

            <!-- Additional links (expanded only) -->
            <template v-if="!collapsed && footer.links">
              <a
                v-for="link in footer.links"
                :key="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors"
                style="color: rgba(255,255,255,0.6)"
                :title="link.label"
                @mouseenter="($event.currentTarget as HTMLElement).style.color = 'white'"
                @mouseleave="($event.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'"
              >
                <component v-if="link.icon" :is="link.icon" class="w-4 h-4" />
                <span v-else class="text-xs">{{ link.label }}</span>
              </a>
            </template>
          </div>
        </template>
      </slot>
    </div>
  </aside>
</template>
