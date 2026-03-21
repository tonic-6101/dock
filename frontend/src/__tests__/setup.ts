// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

// Global mocks for Frappe runtime that Dock composables depend on
import { vi } from 'vitest'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w = globalThis as any

// Mock frappe.boot.dock
w.frappe = {
  boot: {
    dock: {
      installed: true,
      version: '0.2.0',
      settings: {
        theme: 'system',
        timezone: 'UTC',
        week_start: 'Monday',
        date_format: 'dd/mm/yyyy',
        enable_global_timer: true,
        enable_bookmarks: true,
        enable_recent_items: true,
        recent_items_limit: 20,
        site_label: 'Test',
        notification_retention_days: 90,
      },
      registered_apps: [
        { app: 'orga', label: 'Orga', icon: 'project', color: '#4f46e5', route: '/orga' },
      ],
      notification_types: {},
      unread_notifications: 0,
      watch_installed: false,
      timer_state: null,
      recent_items: [],
      bookmarks: [],
      search_sections: {},
      guest_views: [],
      settings_sections: [],
    },
  },
  csrf_token: 'test-csrf-token',
  session: { user: 'test@example.com' },
  call: vi.fn(),
  xcall: vi.fn(),
}

// Mock __ (translation function)
w.__ = (s: string) => s
