// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

export {}

declare global {
  interface Window {
    dockBoot?: NonNullable<NonNullable<NonNullable<Window['frappe']>['boot']>['dock']>
    frappe?: {
      boot?: {
        dock?: {
          installed: boolean
          version: string
          settings: {
            theme: 'light' | 'dark' | 'system'
            timezone: string
            week_start: 'Monday' | 'Sunday'
            date_format: string
            enable_global_timer: boolean
            enable_bookmarks: boolean
            enable_recent_items: boolean
            recent_items_limit: number
            site_label: string
            notification_retention_days: number
            guest_session_default_expiry_days: number
          }
          registered_apps: Array<{
            app: string
            label: string
            icon: string
            color: string
            route: string
            description?: string
          }>
          notification_types: Array<{
            type: string
            label: string
            icon: string
          }>
        }
      }
      session?: {
        user: string
        user_fullname: string
        user_image?: string
      }
      csrf_token?: string
    }
  }
}
