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
    {
      path: '/settings',
      component: () => import('@/pages/DockSettingsPage.vue'),
    },
    {
      path: '/people',
      component: () => import('@/pages/DockPeoplePage.vue'),
    },
    {
      path: '/people/:name',
      component: () => import('@/pages/DockPersonPage.vue'),
    },
    {
      path: '/apps',
      component: () => import('@/pages/DockEcosystemAppsPage.vue'),
    },
    {
      path: '/calendar',
      component: () => import('@/pages/DockCalendarPage.vue'),
    },
    {
      path: '/notifications',
      component: () => import('@/pages/DockNotificationsPage.vue'),
    },
    {
      path: '/guest',
      component: () => import('@/pages/DockGuestSessionsPage.vue'),
    },
    {
      path: '/guest/:token',
      component: () => import('@/pages/DockGuestPortalPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/DockNotFoundPage.vue'),
    },
  ],
})

export default router
