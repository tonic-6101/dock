# Architecture

## Layer model

```
Layer 0   Frappe Core        (Contact, File, Event, User…)
Layer 1   Dock               coordination layer — you are here
Layer 2   Domain Apps        (Watch, Orga, Micro, Home)
Layer 3   Service Apps       (Drive, Repo, Jana)
```

Dock is **infrastructure, not a domain app**. It owns the shell (top bar, search, notifications, calendar, people hub) — your apps own the content. Every Tonic app works without Dock installed, but with Dock the experience is unified.

## How Dock loads

### Boot data

On every page load Frappe calls `extend_bootinfo()` (declared in `dock/hooks.py`). This injects `frappe.boot.dock` into the session with:

| Key | Type | Description |
|-----|------|-------------|
| `installed` | `boolean` | Always `true` when Dock is present |
| `version` | `string` | Dock version (e.g. `"0.3.2"`) |
| `settings` | `object` | Merged org + user preferences |
| `registered_apps` | `array` | App registry collected from all installed apps |
| `calendar_sources` | `array` | Apps that declare `dock_calendar_sources` |
| `user_calendars` | `object` | Owned + shared calendars for the current user |
| `notification_types` | `object` | Dict keyed by type for O(1) lookup |
| `unread_notifications` | `number` | Badge count |
| `watch_installed` | `boolean` | Whether Watch app is present |
| `timer_state` | `object \| null` | Current timer from Watch (soft dependency) |
| `timer_context_options` | `array` | Timer context types from Watch |
| `focus_defaults` | `object` | Pomodoro defaults from Watch |
| `stale_threshold_hours` | `number` | Auto-stop threshold for stale timers |
| `recent_items` | `array` | Last 8 visited records |
| `bookmarks` | `array` | User's pinned records (max 12) |
| `search_sections` | `object` | App → doctype search scopes |
| `guest_views` | `array` | Registered guest portal view IDs |
| `settings_sections` | `array` | App settings UI declarations |
| `bridges` | `array` | Cross-app sync bridges |
| `activity_sources` | `array` | DocTypes feeding the activity feed |
| `unread_discussions` | `number` | Discussion badge count |
| `note_actions` | `array` | Actions available on Dock Notes |
| `bin_count` | `number` | Total soft-deleted items across all apps |

Domain apps can also call `dock.boot.get_boot()` directly (whitelisted API) to get the same data without a full Frappe boot.

### Frontend check

```typescript
const dockInstalled = !!(window as any).frappe?.boot?.dock?.installed
const dockVersion  = (window as any).frappe?.boot?.dock?.version
```

### Python check

```python
if "dock" in frappe.get_installed_apps():
    # Dock is available
    pass
```

## Build outputs

Dock's Vite config produces four entry points:

| Entry | File | Purpose |
|-------|------|---------|
| Desk bundle | `dock.bundle.js` | IIFE loader — mounts DockNavbar on the Frappe Desk |
| ESM navbar | `dock-navbar.esm.js` | Domain apps import components from this module |
| SPA app | `dock-app.js` | Full Dock SPA at `/dock/*` |
| Collab ESM | `dock-collab.esm.js` | Collaboration components (comments, discussions) |

### Shared Vue runtime

Dock ships its own Vue and Vue Router builds so domain apps share a single runtime:

```
/assets/dock/js/vendor/vue.esm.js
/assets/dock/js/vendor/vue-router.esm.js
```

Domain apps should externalize Vue to these same URLs in their Vite config to avoid duplicate runtimes.

### Design tokens

`dock-tokens.css` is emitted during build and contains shared CSS custom properties (colors, spacing, typography). Domain apps can import it for consistent styling.

## ESM exports

Domain apps load Dock components at runtime:

```typescript
import {
  DockNavbar,
  DockLayout,
  DockSidebarShell,
  DockShareButton,
  DockGuestShareButton,
  useDockSidebar,
  dockSharedRoutes,
  useBinToast,
} from '/assets/dock/js/dock-navbar.esm.js'
```

| Export | Type | Description |
|--------|------|-------------|
| `DockNavbar` | Vue component | Shared top bar with app switcher, search, notifications |
| `DockLayout` | Vue component | Full page layout with navbar + content area |
| `DockSidebarShell` | Vue component | Sidebar container that responds to toggle events |
| `DockShareButton` | Vue component | Internal sharing button |
| `DockGuestShareButton` | Vue component | Guest portal share button (no-op without Dock) |
| `useDockSidebar` | Composable | Sidebar state management |
| `dockSharedRoutes` | Function | Lazy-loaded route definitions for shared Dock pages |
| `useBinToast` | Composable | Shows "Moved to Bin. [Undo]" toast after soft-deletes |

## DocTypes

Dock defines 20 DocTypes:

| DocType | Type | Purpose |
|---------|------|---------|
| Dock Settings | Single | Org-wide configuration |
| Dock User Preference | Document | Per-user setting overrides (autoname = user) |
| Dock Notification | Document | Cross-app notification records |
| Dock Bookmark | Document | Pinned records per user |
| Dock Recent Item | Document | Recently visited pages per user |
| Dock Event | Document | Calendar events |
| Dock Event Attendee | Child table | Event attendee + RSVP state |
| Dock Calendar | Document | User-created calendars |
| Dock Calendar Member | Child table | Calendar sharing permissions |
| Dock Comment | Document | Threaded comments on any record |
| Dock Comment Mention | Child table | @mention tracking |
| Dock Discussion | Document | Standalone or record-linked discussions |
| Dock Discussion Link | Child table | Records linked to a discussion |
| Dock Discussion Participant | Child table | Discussion participants + read state |
| Dock Note | Document | Sticky notes attached to records |
| Dock Reaction | Document | Emoji reactions on any record |
| Dock Guest Session | Document | Token-based guest access sessions |
| Dock Guest Activity | Document | Guest portal activity log (GDPR-aware) |
| Dock Sync Log | Document | Cross-app sync audit trail |
| Dock App Order | Child table | App ordering in the top bar |

## Permissions

Dock uses two custom roles:

- **Dock User** — granted to all active users. Allows creating/reading bookmarks, recent items, comments, notes, discussions, events, and calendars. Row-level filtering ensures users only see their own data.
- **Dock Manager** — administrative role. Full access to all Dock records, settings, and the ecosystem management panel.

Row-level permissions are enforced via `permission_query_conditions` and `has_permission` hooks declared in `dock/hooks.py`.

## Soft dependencies

Dock reads data from other apps without importing their code:

- **Watch** — Timer state, daily summary, focus sessions. All timer API methods return graceful fallbacks (`None` or empty state) when Watch is not installed.
- **Domain apps** — Dock discovers capabilities at runtime by reading hook declarations (`dock_app_registry`, `dock_search_sections`, etc.) from all installed apps.

No app should ever add `dock` to `install_requires`. Dock is always optional.
