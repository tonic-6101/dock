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

### Calendar defaults

Org-wide calendar defaults. Each field is overridable per user.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `calendar_default_view` | Select | `week` | `week`, `month`, `day`, or `agenda` |
| `calendar_time_format` | Select | — | `12h` or `24h`. Blank = browser default |
| `calendar_show_weekends` | Select | `1` | `1` = show weekends, `0` = hide |
| `calendar_working_hours_start` | Select | `08:00` | Start of the working day |
| `calendar_working_hours_end` | Select | `18:00` | End of the working day |

### App switcher

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `app_order` | Table | — | `Dock App Order` — `app` + `order`, lower sorts leftmost |
| `app_visibility` | Table | — | `Dock App Visibility` — controls who sees which app |

`Dock App Visibility` rows have `app`, `mode`, and `roles`:

| Mode | Effect |
|------|--------|
| `Auto` | Default — visibility is derived from the app's own roles |
| `Everyone` | Visible to all users |
| `By Role` | Visible only to the roles listed in `roles` (comma-separated) |
| `Hidden` | Visible to System Managers only |

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
| `pinned_apps` | JSON | — | Array of app names pinned into the top bar (max 6) |

### Calendar

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `calendar_default_view` | Select | — | `week`, `month`, `day`, `agenda`. Blank = inherit |
| `calendar_time_format` | Select | — | `12h` or `24h`. Blank = inherit |
| `calendar_show_weekends` | Select | — | `1` or `0`. Blank = inherit |
| `calendar_working_hours_start` | Select | — | Blank = inherit |
| `calendar_working_hours_end` | Select | — | Blank = inherit |

### People

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `people_display_name_format` | Select | — | `first_last` or `last_first`. Blank = First Last |
| `people_card_fields` | JSON | — | Array of field names shown on contact cards. Blank = default set |

### Notifications

Notification preferences follow an **opt-out** model — empty means everything is enabled.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `muted_notification_types` | JSON | — | Array of notification type keys the user muted |
| `muted_apps` | JSON | — | Array of apps muted entirely. Coarser than per-type muting — unmuting an app restores its per-type settings |
| `app_delivery_channels` | JSON | — | Object mapping app → `bell`, `email`, or `both`. Missing key = `both` |

Example:

```json
{
  "muted_apps": ["micro"],
  "muted_notification_types": ["comment_mention"],
  "app_delivery_channels": { "orga": "bell", "watch": "email" }
}
```

### Event reminders

User-level only — there is no org cascade for these two fields.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `event_reminder_enabled` | Check | `0` | New events default to `send_reminder = 1` |
| `event_reminder_minutes` | Int | `15` | Minutes before start to send the reminder |

Applied when `dock.api.calendar.create_event()` is called without explicit `send_reminder` /
`reminder_minutes`, and when other apps sync their records into Dock Events.

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
| `calendar_default_view` | string | `week`, `month`, `day`, `agenda` |
| `calendar_time_format` | string | `12h` or `24h` |
| `calendar_show_weekends` | string | `1` or `0` |
| `calendar_working_hours_start` | string | e.g. `08:00` |
| `calendar_working_hours_end` | string | e.g. `18:00` |
| `people_display_name_format` | string | `first_last` or `last_first` |
| `people_card_fields` | string | JSON array of field names |

All parameters are optional — only the ones you pass are written. Returns the merged
settings (user overrides + org defaults).

### Save notification preferences

```
POST /api/method/dock.api.settings.save_notification_preferences
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `muted_notification_types` | list or JSON string | Muted type keys |
| `muted_apps` | list or JSON string | Fully muted apps |
| `app_delivery_channels` | dict or JSON string | App → `bell`, `email`, or `both` |
| `event_reminder_enabled` | int | Reminder default for new events |
| `event_reminder_minutes` | int | Minutes before start |

Only `bell`, `email`, and `both` are accepted as delivery channels. Omitted parameters are
left untouched. Returns the merged settings.

### Save org settings (Dock Manager)

```
POST /api/method/dock.api.settings.save_org_settings
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `values` | dict | Object with any of: `site_label`, `default_app`, `timezone`, `week_start`, `date_format`, `ui_language`, `currency`, `number_format`, `enable_global_timer`, `enable_bookmarks`, `enable_recent_items`, `recent_items_limit`, `calendar_default_view`, `calendar_time_format`, `calendar_show_weekends`, `calendar_working_hours_start`, `calendar_working_hours_end` |

Publishes a realtime `dock_settings_updated` event after commit so all connected clients refresh.
