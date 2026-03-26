// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// Shared page routes — domain apps spread these into their Vue Router to render
// Dock pages (People, Calendar, Notifications, Bookmarks) inside their own layout.
//
// Usage in a domain app:
//   import { dockSharedRoutes } from '/assets/dock/js/dock-navbar.esm.js'
//
//   const routes = [
//     { path: '/orga', component: Dashboard },
//     ...dockSharedRoutes('/orga'),
//     { path: '/:pathMatch(.*)*', component: NotFound },  // catch-all last
//   ]

import type { RouteRecordRaw } from 'vue-router'

/**
 * Returns Vue Router route definitions for Dock's shared pages.
 *
 * @param prefix - Route prefix matching the app's base path (e.g. '/orga', '/watch').
 *                 Omit or pass '' for apps using a router base path instead.
 */
export function dockSharedRoutes(prefix: string = ''): RouteRecordRaw[] {
  const p = prefix.replace(/\/$/, '') // strip trailing slash

  return [
    {
      path: `${p}/account`,
      name: 'dock-account',
      component: () => import('./pages/DockAccountPage.vue'),
      meta: { dockShared: true, title: 'My Account' },
    },
    {
      path: `${p}/bin`,
      name: 'dock-bin',
      component: () => import('./pages/DockBinPage.vue'),
      meta: { dockShared: true, title: 'Bin' },
    },
    {
      path: `${p}/people`,
      name: 'dock-people',
      component: () => import('./pages/DockPeoplePage.vue'),
      meta: { dockShared: true, title: 'People' },
    },
    {
      path: `${p}/people/:name`,
      name: 'dock-person',
      component: () => import('./pages/DockPersonPage.vue'),
      meta: { dockShared: true, title: 'Contact' },
    },
    {
      path: `${p}/calendar`,
      name: 'dock-calendar',
      component: () => import('./pages/DockCalendarPage.vue'),
      meta: { dockShared: true, title: 'Calendar' },
    },
    {
      path: `${p}/notes`,
      name: 'dock-notes',
      component: () => import('./pages/DockNotesPage.vue'),
      meta: { dockShared: true, title: 'Notes' },
    },
    {
      path: `${p}/notifications`,
      name: 'dock-notifications',
      component: () => import('./pages/DockNotificationsPage.vue'),
      meta: { dockShared: true, title: 'Notifications' },
    },
    {
      path: `${p}/bookmarks`,
      name: 'dock-bookmarks',
      component: () => import('./pages/DockBookmarksPage.vue'),
      meta: { dockShared: true, title: 'Bookmarks' },
    },
    {
      path: `${p}/activity`,
      name: 'dock-activity',
      component: () => import('./pages/DockActivityPage.vue'),
      meta: { dockShared: true, title: 'Activity' },
    },
    {
      path: `${p}/messages`,
      name: 'dock-messages',
      component: () => import('./pages/DockMessagesPage.vue'),
      meta: { dockShared: true, title: 'Messages' },
    },
    {
      path: `${p}/discussions`,
      name: 'dock-discussions',
      component: () => import('./pages/DockDiscussionsPage.vue'),
      meta: { dockShared: true, title: 'Discussions' },
    },
    {
      path: `${p}/discussions/:name`,
      name: 'dock-discussion-detail',
      component: () => import('./pages/DockDiscussionDetail.vue'),
      meta: { dockShared: true, title: 'Discussion' },
    },
  ]
}
