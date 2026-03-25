# Configuration

Dock has two layers of configuration: **org-wide settings** (Dock Settings, a Single DocType) and **per-user preferences** (Dock User Preference). User preferences cascade on top of org defaults — blank fields inherit from the org.

## Dock Settings

Accessible at `/app/dock-settings` (requires **Dock Manager** role).

### General

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `site_label` | Data | — | Name shown in the top bar and guest portal |
| `default_app` | Data | — | Route to open on login (e.g. `/orga`) |
| `theme` | Select | `system` | Default theme: `light`, `dark`, or `system` |
| `timezone` | Data | — | IANA timezone (e.g. `Europe/Berlin`) |
| `week_start` | Select | `Monday` | `Monday` or `Sunday` |
| `date_format` | Select | `dd/mm/yyyy` | `dd/mm/yyyy`, `mm/dd/yyyy`, or `yyyy-mm-dd` |

### Features

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enable_global_timer` | Check | `1` | Show the Watch timer widget in the top bar |
| `enable_bookmarks` | Check | `1` | Allow users to pin records |
| `enable_recent_items` | Check | `1` | Track recently visited pages |
| `recent_items_limit` | Int | `20` | Max recent items stored per user |

### Notifications

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `notification_retention_days` | Int | `90` | Days to keep read notifications before daily cleanup |

### Guest Portal

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `guest_session_default_expiry_days` | Int | `30` | Default session lifetime in days. `0` = no expiry |
| `privacy_policy_url` | Data | — | URL shown in Guest Portal footer (GDPR Art. 13) |

### Advanced (permlevel 1 — System Manager)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `frappe_manager_url` | Data | — | Base URL of Frappe Manager API |
| `sync_log_retention_days` | Int | `90` | Days to keep Dock Sync Log entries. `0` = forever |
| `bin_retention_days` | Int | `30` | Days to keep soft-deleted items. `0` = forever |
| `auto_purge_enabled` | Check | `1` | Automatically purge expired bin items daily |
| `app_order` | Table | — | Child table controlling app order in the top bar |

## Dock User Preference

One record per user (autoname = `user` field). Users manage their preferences at `/dock/settings`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `user` | Link → User | *(auto)* | One record per user |
| `theme` | Select | — | `light`, `dark`, or `system`. Blank = inherit org default |
| `color_mode` | Select | — | `branded` (each app has its accent color) or `neutral` |
| `timezone` | Data | — | IANA timezone. Blank = inherit org default |
| `week_start` | Select | — | `Monday` or `Sunday`. Blank = inherit org default |
| `date_format` | Select | — | Blank = inherit org default |
| `ui_language` | Data | — | Language code. Blank = inherit org default |

## API

### Save user preferences

```
POST /api/method/dock.api.settings.save_user_preference
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `theme` | string | `light`, `dark`, or `system` |
| `color_mode` | string | `branded` or `neutral` |
| `timezone` | string | IANA timezone |
| `week_start` | string | `Monday` or `Sunday` |
| `date_format` | string | Date format string |
| `ui_language` | string | Language code |

Returns the merged settings (user overrides + org defaults).

### Save org settings (Dock Manager)

```
POST /api/method/dock.api.settings.save_org_settings
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `values` | dict | Object with any of: `site_label`, `default_app`, `timezone`, `week_start`, `date_format`, `ui_language`, `currency`, `number_format`, `enable_global_timer`, `enable_bookmarks`, `enable_recent_items`, `recent_items_limit` |

Publishes a realtime `dock_settings_updated` event after commit so all connected clients refresh.
