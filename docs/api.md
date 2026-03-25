# API Reference

All endpoints use the Frappe RPC convention:

```
POST /api/method/dock.api.<module>.<function>
Content-Type: application/json
```

Authenticated via Frappe session cookie or token. Methods marked **(guest)** accept unauthenticated requests.

---

## Search

### `global_search`

Search across all registered apps and DocTypes.

```
dock.api.search.global_search
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `query` | string | *(required)* | Search term (min 2 characters) |
| `app` | string | `None` | Filter to a specific app |
| `section` | string | `None` | Filter to a specific section |
| `per_section` | int | `5` | Results per section |

**Returns:** `[{label, route, app, section, doctype, name, description?, status?, meta?, category?}, ...]`

---

## Notifications

### `publish`

Create and deliver a notification.

```
dock.api.notifications.publish
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `for_user` | string | Recipient's email/user ID |
| `from_app` | string | Source app name |
| `notification_type` | string | Must match a declared `dock_notification_types` key |
| `title` | string | Notification title |
| `message` | string | Optional detail text |
| `reference_doctype` | string | Optional linked DocType |
| `reference_name` | string | Optional linked document |
| `action_url` | string | URL to navigate to on click |

**Returns:** notification name (string)

### `get_recent`

```
dock.api.notifications.get_recent
```

| Parameter | Type | Default |
|-----------|------|---------|
| `limit` | int | `20` |

**Returns:** `[{name, for_user, from_app, notification_type, title, message, read, read_at, creation, ...}, ...]`

### `get_list`

```
dock.api.notifications.get_list
```

| Parameter | Type | Default |
|-----------|------|---------|
| `limit` | int | `50` |
| `offset` | int | `0` |
| `app` | string | `None` |
| `unread_only` | bool | `False` |

**Returns:** `{items: [...], total: int}`

### `mark_read`

```
dock.api.notifications.mark_read
```

| Parameter | Type |
|-----------|------|
| `notification_names` | list |

### `mark_all_read`

```
dock.api.notifications.mark_all_read
```

| Parameter | Type | Default |
|-----------|------|---------|
| `app` | string | `None` |

### `delete`

```
dock.api.notifications.delete
```

| Parameter | Type |
|-----------|------|
| `notification_names` | list |

---

## Bookmarks

### `add`

```
dock.api.bookmarks.add
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `app` | string | App name |
| `doctype` | string | DocType name |
| `docname` | string | Document name |
| `label` | string | Display label |
| `icon` | string | Lucide icon name (optional) |

Max 12 bookmarks per user. Idempotent — returns existing bookmark if already saved.

**Returns:** bookmark name (string)

### `remove`

```
dock.api.bookmarks.remove
```

| Parameter | Type |
|-----------|------|
| `bookmark_name` | string |

### `get`

```
dock.api.bookmarks.get
```

**Returns:** `[{name, app, doctype, docname, label, icon, sort_order}, ...]`

### `reorder`

```
dock.api.bookmarks.reorder
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `ordered_names` | list | Bookmark names in desired order |

---

## Recent Items

### `track`

```
dock.api.recent.track
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `app` | string | App name |
| `doctype` | string | DocType name |
| `docname` | string | Document name |
| `label` | string | Display label |
| `icon` | string | Lucide icon (optional) |

Upserts — updates `visited_at` if already tracked. Trims to configured limit.

### `get`

```
dock.api.recent.get
```

| Parameter | Type | Default |
|-----------|------|---------|
| `limit` | int | `20` |

**Returns:** `[{name, app, doctype, docname, label, icon, visited_at}, ...]`

### `remove`

```
dock.api.recent.remove
```

| Parameter | Type |
|-----------|------|
| `recent_item_name` | string |

### `clear`

```
dock.api.recent.clear
```

Deletes all recent items for the current user.

---

## Calendar

### Events

#### `get_events`

```
dock.api.calendar.get_events
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start` | string | *(required)* | ISO date/datetime |
| `end` | string | *(required)* | ISO date/datetime |
| `sources` | list | `None` | Filter by source app |
| `calendars` | list | `None` | Filter by calendar name |

**Returns:** `[{name, title, start_datetime, end_datetime, all_day, event_type, color, url, status, location, meeting_url, calendar, source_app, source_doctype, source_name, description}, ...]`

#### `create_event`

```
dock.api.calendar.create_event
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | *(required)* | |
| `start_datetime` | string | *(required)* | ISO datetime |
| `end_datetime` | string | `None` | |
| `all_day` | int | `0` | |
| `event_type` | string | `"Meeting"` | |
| `description` | string | `None` | |
| `color` | string | `None` | Hex color |
| `location` | string | `None` | |
| `meeting_url` | string | `None` | |
| `attendees` | string | `None` | JSON: `[{user, required}]` |
| `send_reminder` | int | `0` | |
| `reminder_minutes` | int | `60` | |
| `calendar` | string | `None` | Calendar name |

**Returns:** full event dict

#### `update_event`

```
dock.api.calendar.update_event
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | Event name |
| `**fields` | any | Any editable field |

Only native Dock Events can be updated (sourced events are read-only).

#### `delete_event`

```
dock.api.calendar.delete_event
```

| Parameter | Type |
|-----------|------|
| `name` | string |

**Returns:** `{deleted: name}`

#### `get_event_detail`

```
dock.api.calendar.get_event_detail
```

| Parameter | Type |
|-----------|------|
| `name` | string |

**Returns:** full event + context panels from all apps

#### `update_status`

```
dock.api.calendar.update_status
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `event_name` | string | |
| `status` | string | `Scheduled`, `Completed`, or `Cancelled` |

Event owner only.

### Attendees & RSVP

#### `add_attendee`

```
dock.api.calendar.add_attendee
```

| Parameter | Type | Default |
|-----------|------|---------|
| `event_name` | string | |
| `user` | string | |
| `required` | int | `1` |

#### `remove_attendee`

```
dock.api.calendar.remove_attendee
```

| Parameter | Type |
|-----------|------|
| `event_name` | string |
| `user` | string |

#### `update_rsvp`

```
dock.api.calendar.update_rsvp
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `event_name` | string | |
| `status` | string | `Accepted`, `Declined`, or `Tentative` |

**Returns:** `{event, status}`

#### `update_rsvp_enhanced`

```
dock.api.calendar.update_rsvp_enhanced
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `event_name` | string | |
| `status` | string | |
| `note` | string | Optional response note |

**Returns:** `{status, attendee_stats, attendees}`

#### `propose_new_time`

```
dock.api.calendar.propose_new_time
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `event_name` | string | |
| `proposed_start` | string | ISO datetime |
| `proposed_end` | string | ISO datetime |
| `note` | string | Optional |

Sets RSVP to Tentative. **Returns:** `{status, proposed_start, proposed_end, attendee_stats}`

#### `get_event_rsvp_info`

```
dock.api.calendar.get_event_rsvp_info
```

| Parameter | Type |
|-----------|------|
| `event_name` | string |

**Returns:** `{is_attendee, user_rsvp_status, attendee_stats, attendees}`

#### `send_invitations`

```
dock.api.calendar.send_invitations
```

| Parameter | Type |
|-----------|------|
| `event_name` | string |

**Returns:** `{success: true, sent_count, failed: [...]}`

### Calendars

#### `get_calendars`

```
dock.api.calendars.get_calendars
```

**Returns:** `{user_calendars: [...], shared_calendars: [...]}`

#### `create_calendar`

```
dock.api.calendars.create_calendar
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | string | Calendar name |
| `color` | string | Hex color (optional) |
| `description` | string | Optional |

#### `update_calendar`

```
dock.api.calendars.update_calendar
```

| Parameter | Type |
|-----------|------|
| `name` | string |
| `title` | string |
| `color` | string |
| `description` | string |

Owner or Manage role required.

#### `delete_calendar`

```
dock.api.calendars.delete_calendar
```

| Parameter | Type |
|-----------|------|
| `name` | string |

Cannot delete default calendar. Events are moved to default. **Returns:** `{deleted, events_moved_to}`

#### `set_default_calendar`

```
dock.api.calendars.set_default_calendar
```

| Parameter | Type |
|-----------|------|
| `name` | string |

#### `get_calendar_members` / `add_calendar_member` / `update_calendar_member` / `remove_calendar_member`

Manage calendar sharing. Roles: `View`, `Edit`, `Manage`.

```
dock.api.calendars.add_calendar_member
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `calendar` | string | | Calendar name |
| `user` | string | | User to add |
| `role` | string | `"Edit"` | `View`, `Edit`, or `Manage` |

#### `ensure_default_calendar`

```
dock.api.calendars.ensure_default_calendar
```

Auto-creates a default calendar if the user doesn't have one. **Returns:** `{name, title, color}`

#### `get_calendar_sources`

```
dock.api.calendar.get_calendar_sources
```

**Returns:** `{app_sources, user_calendars, shared_calendars}`

---

## People Hub

### `get_list`

```
dock.api.people.get_list
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | int | `50` | |
| `offset` | int | `0` | |
| `query` | string | `None` | Text search |
| `contact_type` | string | `None` | `internal` or `external` |
| `visibility` | string | `None` | |
| `tags` | string | `None` | Comma-separated tag filter (OR) |
| `company` | string | `None` | |
| `status` | string | `"active"` | `active`, `archived`, or `dnc` |
| `sort` | string | `"recent"` | |
| `filter_mine` | bool | `False` | Only contacts owned by current user |

**Returns:** `{items, total, available_tags, available_companies}`

### `get_contact`

```
dock.api.people.get_contact
```

| Parameter | Type |
|-----------|------|
| `contact_name` | string |

**Returns:** full contact with addresses, tags, last activity, Dock custom fields

### `get_contact_context`

```
dock.api.people.get_contact_context
```

Returns cross-app context panels from all apps declaring `dock_people_context`.

### `create_contact`

```
dock.api.people.create_contact
```

| Parameter | Type |
|-----------|------|
| `full_name` | string |
| `email` | string |
| `phone` | string |
| `designation` | string |
| `company_name` | string |

### `update_contact`

```
dock.api.people.update_contact
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `contact_name` | string | |
| `field` | string | Whitelisted field name |
| `value` | any | New value |

Inline single-field update.

### `get_activity_timeline`

```
dock.api.people.get_activity_timeline
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `contact_name` | string | | |
| `limit` | int | `20` | |
| `offset` | int | `0` | |
| `activity_type` | string | `None` | `email`, `call`, `comment`, or all |

### File management

- `get_files(contact_name)` — list attached files
- `upload_file(contact_name)` — multipart upload
- `delete_file(contact_name, file_name)` — remove file
- `upload_image(contact_name)` — profile image upload

### Tags

- `add_tag(contact_name, tag)` — add tag, returns updated list
- `remove_tag(contact_name, tag)` — remove tag

### Address management

- `create_address(contact_name, address_type, ...)` — create address
- `update_address(contact_name, address_name, ...)` — update address
- `delete_address(contact_name, address_name)` — remove address

### Utility

- `search_countries(query, limit)` — autocomplete for country picker
- `search_users(query, limit)` — lightweight user search for attendee picker
- `search_contacts(query, limit)` — contact search for timer context picker

---

## Comments

### `add_comment`

```
dock.api.comment.add_comment
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `reference_doctype` | string | | DocType being commented on |
| `reference_name` | string | | Document name |
| `content` | string | | Comment body (HTML) |
| `parent_comment` | string | `None` | Reply to this comment |
| `note_type` | string | `"General"` | `General`, `Note`, `Decision`, `Protocol`, `System` |
| `visibility` | string | `"Team"` | `Internal`, `Team`, `Public` |

Parses @mentions automatically. **Returns:** enriched comment with user info.

### `get_comments`

```
dock.api.comment.get_comments
```

| Parameter | Type | Default |
|-----------|------|---------|
| `reference_doctype` | string | |
| `reference_name` | string | |
| `limit` | int | `20` |
| `offset` | int | `0` |
| `include_resolved` | bool | `False` |

Pinned comments first. **Returns:** `{comments, has_more, total, resolved_count}`

### `get_replies`

```
dock.api.comment.get_replies
```

| Parameter | Type | Default |
|-----------|------|---------|
| `comment_name` | string | |
| `limit` | int | `20` |

### Thread management

- `resolve_comment(comment_name)` — mark thread resolved
- `unresolve_comment(comment_name)` — reopen thread
- `pin_comment(comment_name)` — pin (unpins previous)
- `unpin_comment(comment_name)` — remove pin
- `delete_comment(comment_name)` — author or Dock Manager

### `get_users_for_mention`

```
dock.api.comment.get_users_for_mention
```

| Parameter | Type | Default |
|-----------|------|---------|
| `search` | string | `""` |
| `limit` | int | `10` |

**Returns:** `[{id, label, user_image}, ...]`

---

## Discussions

### `create_discussion`

```
dock.api.discussion.create_discussion
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | | |
| `content` | string | | HTML body |
| `discussion_type` | string | `"General"` | `General`, `Decision`, `Meeting Protocol`, `Retrospective`, `Proposal` |
| `linked_records` | string | `None` | JSON: `[{reference_doctype, reference_name}]` |
| `participants` | string | `None` | JSON: `[{user}]` |
| `source_app` | string | `None` | |

### `get_discussion`

```
dock.api.discussion.get_discussion
```

| Parameter | Type |
|-----------|------|
| `name` | string |

**Returns:** full discussion with unread tracking

### `list_discussions`

```
dock.api.discussion.list_discussions
```

| Parameter | Type | Default |
|-----------|------|---------|
| `status` | string | `None` |
| `discussion_type` | string | `None` |
| `source_app` | string | `None` |
| `reference_doctype` | string | `None` |
| `reference_name` | string | `None` |
| `participant` | string | `None` |
| `search` | string | `None` |
| `limit` | int | `20` |
| `offset` | int | `0` |

**Returns:** `{discussions, has_more, total}`

### Other discussion methods

- `get_record_discussions(reference_doctype, reference_name, limit)` — discussions linked to a record
- `resolve_discussion(name, resolved_summary)` — resolve with summary
- `reopen_discussion(name)` — reopen
- `add_linked_record(discussion_name, reference_doctype, reference_name)` — link a record
- `remove_linked_record(discussion_name, reference_doctype, reference_name)` — unlink
- `promote_to_discussion(reference_doctype, reference_name, title, ...)` — create discussion from comment thread
- `mark_read(name)` — update read state for current user

---

## Notes

### `get_list`

```
dock.api.notes.get_list
```

| Parameter | Type | Default |
|-----------|------|---------|
| `reference_doctype` | string | `None` |
| `reference_name` | string | `None` |
| `limit` | int | `20` |
| `offset` | int | `0` |
| `pinned_first` | bool | `True` |
| `color` | string | `None` |
| `tag` | string | `None` |
| `sort_by` | string | `"modified"` |
| `sort_order` | string | `"desc"` |

**Returns:** `{items, total}`

### `create`

```
dock.api.notes.create
```

| Parameter | Type |
|-----------|------|
| `content` | string |
| `reference_doctype` | string |
| `reference_name` | string |
| `color` | string |

Colors: `yellow`, `green`, `blue`, `purple`, `red`, `orange`.

### `update`

```
dock.api.notes.update
```

| Parameter | Type |
|-----------|------|
| `name` | string |
| `content` | string |
| `pinned` | int |
| `color` | string |

### `delete`

Soft-delete (sets `deleted_at`). Owner only.

```
dock.api.notes.delete
```

### `toggle_pin`

```
dock.api.notes.toggle_pin
```

---

## Reactions

### `toggle_reaction`

```
dock.api.reaction.toggle_reaction
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `reference_doctype` | string | |
| `reference_name` | string | |
| `reaction_type` | string | `acknowledge`, `celebrate`, `seen`, or `flag` |

Creates if not exists, removes if exists. **Returns:** updated summary.

### `get_reactions`

```
dock.api.reaction.get_reactions
```

**Returns:** `{acknowledge: {count, users, current_user}, celebrate: {...}, seen: {...}, flag: {...}}`

---

## Activity Feed

### `get_activity_feed`

```
dock.api.activity.get_activity_feed
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `app` | string | `None` | |
| `user` | string | `None` | |
| `doctype` | string | `None` | |
| `docname` | string | `None` | |
| `activity_type` | string | `None` | Comma-separated: `create`, `update`, `insert`, `comment`, `discussion` |
| `date_from` | string | `None` | |
| `date_to` | string | `None` | |
| `limit` | int | `30` | |
| `offset` | int | `0` | |

**Returns:** `{items, has_more, total}`

### `get_record_activity`

```
dock.api.activity.get_record_activity
```

| Parameter | Type | Default |
|-----------|------|---------|
| `reference_doctype` | string | |
| `reference_name` | string | |
| `limit` | int | `20` |
| `offset` | int | `0` |

**Returns:** `{items, has_more, total}`

---

## Guest Portal

### `create_session`

```
dock.api.guest.create_session
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `view_id` | string | | Registered guest view ID |
| `source_app` | string | | |
| `source_doctype` | string | | |
| `source_name` | string | | |
| `label` | string | | Human-readable label |
| `expires_in_days` | int | `None` | Override default expiry |

**Returns:** `{session_name, token, url, expires_at}`

### `validate_token` **(guest)**

```
dock.api.guest.validate_token
```

| Parameter | Type |
|-----------|------|
| `token` | string |

No authentication required. **Returns:** `{valid, session_name?, view_id?, source_doctype?, source_name?, label?, reason?}`

### `revoke_session`

```
dock.api.guest.revoke_session
```

| Parameter | Type |
|-----------|------|
| `session_name` | string |

Session creator or Dock Manager only.

### `get_sessions`

```
dock.api.guest.get_sessions
```

| Parameter | Type | Default |
|-----------|------|---------|
| `limit` | int | `50` |
| `offset` | int | `0` |
| `source_doctype` | string | `None` |
| `source_name` | string | `None` |

Dock Managers see all sessions; users see only their own.

### `log_activity` **(guest)**

```
dock.api.guest.log_activity
```

| Parameter | Type | Default |
|-----------|------|---------|
| `token` | string | |
| `event_type` | string | `"viewed"` |
| `view_id` | string | `None` |
| `metadata` | dict | `None` |

Silently ignores invalid tokens. Logs IP and user agent.

---

## Bin (Soft Delete)

### `get_items`

```
dock.api.bin.get_items
```

| Parameter | Type | Default |
|-----------|------|---------|
| `app` | string | `None` |
| `search` | string | `None` |
| `sort_by` | string | `"deleted_on"` |
| `sort_order` | string | `"desc"` |
| `limit` | int | `20` |
| `offset` | int | `0` |

**Returns:** `{items, total, counts_by_app}`

### `get_count`

```
dock.api.bin.get_count
```

**Returns:** `{total: int}`

### `restore` (POST)

```
dock.api.bin.restore
```

| Parameter | Type |
|-----------|------|
| `doctype` | string |
| `names` | list or string |

Proxies to the owning app's `restore_endpoint`. **Returns:** `{restored, failed}`

### `delete_permanently` (POST)

```
dock.api.bin.delete_permanently
```

| Parameter | Type |
|-----------|------|
| `doctype` | string |
| `names` | list or string |

**Returns:** `{deleted, failed}`

### `empty_bin` (POST)

```
dock.api.bin.empty_bin
```

Permanently deletes all soft-deleted items. **Returns:** `{deleted: total}`

---

## Bridges (Cross-App Sync)

### `get_bridges`

```
dock.api.bridges.get_bridges
```

**Returns:** `[{app, label, target_app, source_doctype, direction, target_installed, status_endpoint, sync_endpoint, settings_route}, ...]`

### `get_bridge_status`

```
dock.api.bridges.get_bridge_status
```

| Parameter | Type |
|-----------|------|
| `app` | string |
| `source_doctype` | string |

**Returns:** `{active: bool, ...}` or `{active: false, reason: string}`

### `trigger_sync` (System Manager)

```
dock.api.bridges.trigger_sync
```

| Parameter | Type |
|-----------|------|
| `app` | string |
| `source_doctype` | string |

### `get_sync_log` (System Manager)

```
dock.api.bridges.get_sync_log
```

| Parameter | Type | Default |
|-----------|------|---------|
| `app` | string | `None` |
| `limit` | int | `20` |

---

## Timer (Watch Integration)

All methods gracefully return empty/null when Watch is not installed.

### `get_state`

```
dock.api.timer.get_state
```

**Returns:** `{state, elapsed_seconds, started_at, context_label, entry_name, entry_type, tags, contact, contact_name, context_type, context_name, context_display}`

### `start`

```
dock.api.timer.start
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `context_label` | string | What you're working on |
| `description` | string | Optional |
| `tags` | string | Comma-separated |
| `entry_type` | string | e.g. `billable` |
| `contact` | string | Contact name |
| `context_type` | string | DocType |
| `context_name` | string | Document name |

### `pause` / `resume` / `stop`

```
dock.api.timer.pause
dock.api.timer.resume
dock.api.timer.stop
```

`stop` accepts optional `notes` parameter.

### `start_focus`

```
dock.api.timer.start_focus
```

| Parameter | Type | Default |
|-----------|------|---------|
| `description` | string | `None` |
| `tags` | string | `None` |
| `entry_type` | string | `"billable"` |
| `sessions` | int | `4` |
| `work_minutes` | int | `25` |
| `break_minutes` | int | `5` |
| `contact` | string | `None` |
| `context_type` | string | `None` |
| `context_name` | string | `None` |

### `update_context`

Update context of a running/paused timer.

### `get_daily_summary`

```
dock.api.timer.get_daily_summary
```

| Parameter | Type | Default |
|-----------|------|---------|
| `date` | string | today |

### `get_context_options`

```
dock.api.timer.get_context_options
```

**Returns:** available timer context types from Watch.

### `search_context`

```
dock.api.timer.search_context
```

| Parameter | Type | Default |
|-----------|------|---------|
| `doctype` | string | |
| `query` | string | |
| `limit` | int | `8` |

---

## Ecosystem Management

### `get_apps`

```
dock.api.ecosystem.get_apps
```

**Returns:** `{installed, available, other, fm_url}`

### `refresh_registry` (System Manager)

```
dock.api.ecosystem.refresh_registry
```

Force-refresh the Tonic app registry cache.

### `update_app` / `install_app` / `remove_app` (System Manager)

```
dock.api.ecosystem.update_app
dock.api.ecosystem.install_app
dock.api.ecosystem.remove_app
```

| Parameter | Type |
|-----------|------|
| `app` | string |

Triggers operation via Frappe Manager API.

### `get_job_status`

```
dock.api.ecosystem.get_job_status
```

| Parameter | Type |
|-----------|------|
| `job_id` | string |

**Returns:** `{job_id, status, log}`

---

## Account

### `get_account`

```
dock.api.account.get_account
```

**Returns:** `{user, first_name, last_name, full_name, user_image, twofactor_enabled, twofactor_site_enabled}`

### `update_profile`

```
dock.api.account.update_profile
```

| Parameter | Type |
|-----------|------|
| `first_name` | string |
| `last_name` | string |

### `change_password`

```
dock.api.account.change_password
```

| Parameter | Type |
|-----------|------|
| `old_password` | string |
| `new_password` | string |

### `get_sessions`

```
dock.api.account.get_sessions
```

**Returns:** `[{sid, device, ip_address, last_updated, is_current}, ...]` (max 20, IPs masked)

### `revoke_session`

```
dock.api.account.revoke_session
```

| Parameter | Type |
|-----------|------|
| `sid` | string |

Cannot revoke current session.

### `set_user_image` / `remove_user_image`

```
dock.api.account.set_user_image
dock.api.account.remove_user_image
```

---

## Settings

See [Configuration](configuration.md) for full details on `save_user_preference` and `save_org_settings`.
