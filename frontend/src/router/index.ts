// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/dock'),
  routes: [
    {
      path: '/',
      redirect: '/settings',
    },

    // ── Dock Settings (unified settings hub) ──────────────────────────
    {
      path: '/settings',
      name: 'dock-settings',
      component: () => import('@/pages/DockSettingsPage.vue'),
    },
    {
      path: '/settings/notifications',
      name: 'dock-settings-notifications',
      component: () => import('@/pages/DockSettingsNotifications.vue'),
    },
    {
      path: '/settings/calendar',
      name: 'dock-settings-calendar',
      component: () => import('@/pages/DockSettingsCalendar.vue'),
    },
    {
      path: '/settings/people',
      name: 'dock-settings-people',
      component: () => import('@/pages/DockSettingsPeople.vue'),
    },
    {
      // Dynamic app settings host — loads app's settings component at runtime
      path: '/settings/app/:appName',
      name: 'dock-settings-app',
      component: () => import('@/pages/DockSettingsAppHost.vue'),
    },

    // ── Account (accessible from avatar menu, not sidebar) ────────────
    {
      path: '/account',
      name: 'dock-account',
      component: () => import('@/pages/DockAccountPage.vue'),
    },

    // ── Shared pages (accessible from top bar, not sidebar) ───────────
    {
      path: '/people',
      name: 'dock-people',
      component: () => import('@/pages/DockPeoplePage.vue'),
    },
    {
      path: '/people/:name',
      name: 'dock-person',
      component: () => import('@/pages/DockPersonPage.vue'),
    },
    {
      path: '/calendar',
      name: 'dock-calendar',
      component: () => import('@/pages/DockCalendarPage.vue'),
    },
    {
      path: '/notes',
      name: 'dock-notes',
      component: () => import('@/pages/DockNotesPage.vue'),
    },
    {
      path: '/bookmarks',
      name: 'dock-bookmarks',
      component: () => import('@/pages/DockBookmarksPage.vue'),
    },
    {
      path: '/notifications',
      name: 'dock-notifications',
      component: () => import('@/pages/DockNotificationsPage.vue'),
    },

    // ── Admin pages (sidebar — System Manager only) ───────────────────
    {
      path: '/integrations',
      name: 'dock-integrations',
      component: () => import('@/pages/DockIntegrationsPage.vue'),
    },
    {
      path: '/apps',
      name: 'dock-apps',
      component: () => import('@/pages/DockEcosystemAppsPage.vue'),
    },
    {
      path: '/guest',
      name: 'dock-guest-sessions',
      component: () => import('@/pages/DockGuestSessionsPage.vue'),
    },
    {
      path: '/guest/:token',
      name: 'dock-guest-portal',
      component: () => import('@/pages/DockGuestPortalPage.vue'),
    },

    // ── Catch-all ─────────────────────────────────────────────────────
    {
      path: '/:pathMatch(.*)*',
      name: 'dock-not-found',
      component: () => import('@/pages/DockNotFoundPage.vue'),
    },
  ],
})

export default router
