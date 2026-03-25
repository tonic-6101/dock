# Changelog

All notable changes to Dock are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/).

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
