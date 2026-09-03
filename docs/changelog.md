# Changelog

All notable changes to Dock are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/).

## [0.3.5] — 2026-04-15

### Added
- **Briefing panel** — `[Briefing]` button in the top bar opens a daily briefing aggregated from every installed app. Reads the `jana_briefing_source` hook and calls each app's endpoint directly. No LLM involved — instant, structured, zero cost
- `dock.api.briefing.get_briefing(date)` and `dock.api.briefing.get_badge_count()`
- **Notifications panel** — `DockNotificationsPanel` slide-over replaces the inline bell dropdown
- App-level notification muting (`muted_apps`) — mutes every type from one app at once
- Per-app delivery channels (`app_delivery_channels`) — route an app's notifications to `bell`, `email`, or `both`
- Per-user event reminder defaults (`event_reminder_enabled`, `event_reminder_minutes`) applied by `create_event()` and by apps syncing into Dock Events
- `event_reminder` notification type
- `jana_permissions` hook — Dock declares its read-only DocTypes and endpoints to the Jana assistant
- Boot data gains `muted_apps`, `app_delivery_channels`, `event_reminder_defaults`, and `ecosystem_links`

### Changed
- `notifications.publish()` now resolves app mute → type mute → delivery channel in a single preference read, and returns `None` when a notification is suppressed
- `calendar.create_event()` falls back to the user's reminder defaults when `send_reminder` / `reminder_minutes` are omitted

## [0.3.4] — 2026-03-27

### Added
- Calendar preferences — default view, time format, weekend visibility, and working hours, both org-wide (Dock Settings) and per user
- People preferences — display name format and contact card fields
- Per-type notification muting (`muted_notification_types`) with `dock.api.settings.save_notification_preferences`
- App favicon

### Fixed
- CSS cascade conflict between the Dock desk bundle and domain app styles
- Notes and messages boot data gaps found during the spec audit

## [0.3.3] — 2026-03-26

### Added
- **Messages** — `[💬]` unified communication entry point. Apps register a channel via the `dock_message_channels` hook; Dock renders channel tabs in `DockMessagesPanel` and a shared page, and aggregates one unread badge across all channels
- `dock.api.messages.get_unread_counts()` — calls each channel's `badge_method`
- **Pinned apps** — users pin up to 6 apps into the top bar; `dock.api.apps.pin_app`, `unpin_app`, `reorder_pinned_apps`
- **App visibility** — `Dock App Visibility` child table on Dock Settings with `Auto` / `Everyone` / `By Role` / `Hidden` modes, so admins control which apps appear in the switcher
- External apps (Frappe Desk, ERPNext) resolved into the app switcher alongside ecosystem apps
- `DockDeskPanels` — Dock panels render inside the Frappe Desk, not only in the SPA
- `dock.api.discussion.get_unread_count()` and `mark_read()` — badge method for the Discussions channel

### Changed
- Boot data gains `message_channels`, `unread_counts`, and `pinned_apps`
- App switcher ordering now combines admin `app_order`, user pins, and visit counts

## [0.3.2] — 2026-03-25

### Added
- Bin (soft delete) — cross-app trash with restore, permanent delete, and auto-purge
- Discussion promotion — create discussions from existing comment threads
- Enhanced RSVP — attendee notes, proposed times, invitation emails
- Note actions — extensible actions on Dock Notes via `dock_note_actions` hook
- Sync log — audit trail for cross-app bridge operations
- Color mode user preference (branded vs neutral accent colors)

### Changed
- Boot data now includes `bin_count`, `note_actions`, and `unread_discussions`
- Calendar member management sends realtime notifications

## [0.3.0] — 2026-03-23

### Added
- Migrated to Frappe v16
- Dock Discussions — standalone or record-linked threaded conversations
- Dock Comments — threaded comments with @mentions, pinning, and resolution
- Dock Reactions — emoji reactions (acknowledge, celebrate, seen, flag) on any record
- Dock Notes — color-coded sticky notes attached to records with soft delete
- Activity Feed — aggregated activity from all registered apps
- Bridges — cross-app sync framework with status tracking and sync logs
- Ecosystem management panel — install, update, remove apps via Frappe Manager API
- Account management — profile editing, password change, session management
- Calendar sharing — multi-user calendars with View/Edit/Manage roles
- Focus sessions — Pomodoro timer integration via Watch

### Changed
- ESM exports now include `DockLayout`, `DockSidebarShell`, `useDockSidebar`, `dockSharedRoutes`, `useBinToast`
- Shared Vue runtime shipped at `/assets/dock/js/vendor/`
- Design tokens exported as `dock-tokens.css`

## [0.2.0] — 2026-03-17

### Added
- Dock declared as required dependency for all ecosystem apps
- Top bar & app switcher with hook-based registration
- Global Search (Cmd+K) across all registered apps
- Cross-app notifications with realtime delivery
- Timer widget (Watch soft dependency)
- People Hub with contact management and cross-app context
- Calendar with events and attendee management
- Guest Portal with token-based access and GDPR-aware activity logging
- Bookmarks & Recent Items
- Ecosystem Settings with per-user overrides
- DockNavbar ESM export for domain apps
- `dock:trackVisit` CustomEvent for recent item tracking

## [0.1.0] — 2026-03-10

### Added
- Initial release
- Dock Settings (Single DocType)
- Basic top bar component
- App switcher prototype
