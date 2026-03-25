# Hook Reference

Dock discovers capabilities from other apps at runtime by reading hook declarations from `hooks.py`. Your app never imports Dock code directly — it declares what it can do, and Dock reads it.

All hooks are optional. Your app must work without Dock installed.

## dock_app_registry

Register your app in the top bar app switcher.

```python
# your_app/hooks.py

dock_app_registry = {
    "label": "Your App",              # Display name
    "icon": "layout-grid",            # Lucide icon name
    "color": "#6366f1",               # Brand color (hex)
    "route": "/your-app",             # SPA entry route
    "description": "Short tooltip",   # Optional
}
```

Dock collects these from all installed apps and includes them in `frappe.boot.dock.registered_apps`.

## dock_search_sections

Expose your app's content in Dock Global Search (Cmd+K).

```python
dock_search_sections = [
    {
        "label": "Projects",                          # Section heading in results
        "doctype": "Your DocType",                     # DocType to search
        "search_fields": ["name", "title"],            # Fields to match against
        "display_field": "title",                      # Field shown as result label
        "route_template": "/your-app/projects/{name}", # URL when clicked
        # Optional:
        "description_field": "description",            # Secondary text in results
        "status_field": "status",                      # Status badge
        "meta_field": "modified",                      # Metadata shown in results
        "category": "Work",                            # Group label
        "extra_fields": ["status", "priority"],        # Additional fields to fetch
        "visibility_fn": "your_app.api.can_search",   # Python function returning bool
    },
]
```

## dock_notification_types

Declare the types of notifications your app can publish.

```python
dock_notification_types = [
    {
        "type": "task_assigned",       # Unique key (used in publish() call)
        "label": "Task Assigned",      # Human-readable label
        "icon": "check-circle",        # Lucide icon name
    },
]
```

Then publish notifications from Python:

```python
if "dock" in frappe.get_installed_apps():
    frappe.call(
        "dock.api.notifications.publish",
        for_user="user@example.com",
        from_app="your_app",
        notification_type="task_assigned",
        title="You were assigned a task",
        message="Optional detail",
        reference_doctype="Your DocType",
        reference_name="RECORD-001",
        action_url="/your-app/tasks/RECORD-001",
    )
```

## dock_guest_views

Register views that can be shared with guests via token-based links.

```python
dock_guest_views = [
    {
        "view_id": "your_app_record",                  # Unique view identifier
        "label": "Record",                              # Human-readable label
        "route": "/your-app/records/{name}",            # URL rendered in guest portal
    },
]
```

Use `<DockGuestShareButton />` in your frontend to create guest sessions.

## dock_calendar_sources

Declare that your app can push events into the Dock calendar.

```python
dock_calendar_sources = [
    {
        "app": "your_app",
        "label": "Your App Events",
        "event_types": [
            {"type": "deadline", "label": "Deadline", "color": "#ef4444"},
        ],
        "get_events": "your_app.api.calendar.get_events",  # Python function
    },
]
```

The `get_events` function receives `start`, `end`, and `user` parameters and returns a list of event dicts.

## dock_calendar_context

Provide contextual panels when users view a Dock Event linked to your app's records.

```python
dock_calendar_context = [
    {
        "app": "your_app",
        "get_context": "your_app.api.calendar.get_event_context",
    },
]
```

The function receives an event dict and returns a list of context panel dicts with `label`, `icon`, `fields`, `link`, and `link_label`.

## dock_people_context

Provide contextual information when users view a contact in the People Hub.

```python
dock_people_context = [
    {
        "app": "your_app",
        "get_context": "your_app.api.people.get_contact_context",
    },
]
```

## dock_activity_sources

Declare DocTypes that should appear in the Dock activity feed.

```python
dock_activity_sources = [
    "Your DocType",
    "Another DocType",
]
```

Dock reads Version (change tracking) entries and document creation events for these DocTypes.

## dock_bridges

Declare sync bridges between your app's DocTypes and external systems.

```python
dock_bridges = [
    {
        "app": "your_app",
        "label": "Sync Projects",
        "target_app": "erpnext",                           # Target app
        "source_doctype": "Your Project",
        "direction": "bidirectional",                       # or "push" / "pull"
        "status_endpoint": "your_app.api.bridge.status",   # Returns {active: bool}
        "sync_endpoint": "your_app.api.bridge.sync",       # Triggers sync
        "settings_route": "/your-app/settings/bridge",     # Settings UI route
    },
]
```

## dock_settings_sections

Add your app's settings panel to the Dock settings page.

```python
dock_settings_sections = [
    {
        "app": "your_app",
        "label": "Your App Settings",
        "icon": "settings",
        "route": "/your-app/settings",
    },
]
```

## dock_note_actions

Add actions to Dock Notes (e.g. "Convert to Task").

```python
dock_note_actions = [
    {
        "app": "your_app",
        "label": "Convert to Task",
        "icon": "check-square",
        "action": "your_app.api.notes.convert_to_task",  # Python function
    },
]
```

## dock_bin_doctypes

Register your app's DocTypes for soft-delete support in the Dock Bin.

```python
dock_bin_doctypes = [
    {
        "doctype": "Your DocType",
        "app": "your_app",
        "label": "Projects",
        "icon": "folder",
        "restore_endpoint": "your_app.api.bin.restore",
        "delete_endpoint": "your_app.api.bin.delete_permanently",
        "list_endpoint": "your_app.api.bin.get_deleted",
    },
]
```

## watch_timer_contexts

Register DocTypes that can serve as timer contexts in Watch.

```python
watch_timer_contexts = [
    {
        "doctype": "Your DocType",
        "label": "Project",
        "route_template": "/your-app/projects/{name}",
    },
]
```

## Summary

| Hook | Purpose | Required fields |
|------|---------|----------------|
| `dock_app_registry` | App switcher entry | `label`, `icon`, `color`, `route` |
| `dock_search_sections` | Global search | `label`, `doctype`, `search_fields` |
| `dock_notification_types` | Notification types | `type`, `label`, `icon` |
| `dock_guest_views` | Guest portal views | `view_id`, `label`, `route` |
| `dock_calendar_sources` | Calendar events | `app`, `label`, `event_types`, `get_events` |
| `dock_calendar_context` | Event context panels | `app`, `get_context` |
| `dock_people_context` | Contact context panels | `app`, `get_context` |
| `dock_activity_sources` | Activity feed DocTypes | list of DocType names |
| `dock_bridges` | Cross-app sync bridges | `app`, `label`, `target_app`, `source_doctype` |
| `dock_settings_sections` | Settings page entry | `app`, `label`, `route` |
| `dock_note_actions` | Note action buttons | `app`, `label`, `action` |
| `dock_bin_doctypes` | Soft-delete bin support | `doctype`, `app`, `restore_endpoint`, `delete_endpoint` |
| `watch_timer_contexts` | Timer context DocTypes | `doctype`, `label` |
