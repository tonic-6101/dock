# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

app_name = "dock"
app_title = "Dock"
app_publisher = "Tonic"
app_description = "Ecosystem coordination layer for Frappe"
app_email = "tonic6101@gmail.com"
app_license = "AGPL-3.0-or-later"

# Inject frappe.boot.dock on every session (cache-safe — fires even on Redis-cached bootinfo)
extend_bootinfo = "dock.boot.extend_bootinfo"

# Inject Dock JS bundle into Frappe Desk
app_include_js = "assets/dock/js/dock.bundle.js"

# Lifecycle hooks
after_install = "dock.install.after_install"
before_uninstall = "dock.uninstall.before_uninstall"

# Cache invalidation when domain apps install or uninstall
# Clears Redis bootinfo so the app switcher reflects the new state immediately
after_app_install = "dock.utils.after_app_install"
after_app_uninstall = "dock.utils.after_app_uninstall"

# Cascade delete: Dock Guest Session → Dock Guest Activity
doc_events = {
    "Dock Guest Session": {
        "on_trash": "dock.dock.doctype.dock_guest_session.dock_guest_session.on_trash",
    }
}

# Row-level permission filters (custom user fields — if_owner does not apply here)
permission_query_conditions = {
    "Dock Notification":   "dock.dock.doctype.dock_notification.dock_notification.get_permission_query_conditions",
    "Dock Recent Item":    "dock.dock.doctype.dock_recent_item.dock_recent_item.get_permission_query_conditions",
    "Dock Bookmark":       "dock.dock.doctype.dock_bookmark.dock_bookmark.get_permission_query_conditions",
    "Dock Event":          "dock.dock.doctype.dock_event.dock_event.get_permission_query_conditions",
    "Dock Guest Session":  "dock.dock.doctype.dock_guest_session.dock_guest_session.get_permission_query_conditions",
    "Dock Guest Activity": "dock.dock.doctype.dock_guest_activity.dock_guest_activity.get_permission_query_conditions",
}

# Document-level permission checks (single record access)
has_permission = {
    "Dock Notification":   "dock.dock.doctype.dock_notification.dock_notification.has_permission",
    "Dock Recent Item":    "dock.dock.doctype.dock_recent_item.dock_recent_item.has_permission",
    "Dock Bookmark":       "dock.dock.doctype.dock_bookmark.dock_bookmark.has_permission",
    "Dock Event":          "dock.dock.doctype.dock_event.dock_event.has_permission",
    "Dock Guest Session":  "dock.dock.doctype.dock_guest_session.dock_guest_session.has_permission",
    "Dock Guest Activity": "dock.dock.doctype.dock_guest_activity.dock_guest_activity.has_permission",
}

# Scheduled cleanup: remove old read notifications beyond retention window
scheduler_events = {
    "daily": [
        "dock.tasks.cleanup_old_notifications",
    ],
}

# Ship dock_shared custom field on Frappe Contact
fixtures = [
    {
        "dt": "Custom Field",
        "filters": [["dt", "=", "Contact"], ["fieldname", "=", "dock_shared"]],
    }
]

# Route /dock and /dock/* to the Vue SPA shell
website_route_rules = [
    {"from_route": "/dock",            "to_route": "dock"},
    {"from_route": "/dock/<path:app_path>", "to_route": "dock"},
]

# NOTE: Dock does NOT appear in add_to_apps_screen.
# Dock is infrastructure — it renders the app switcher but is not itself a navigable app.
