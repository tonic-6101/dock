# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import json
import frappe
import frappe.sessions
from dock.boot import (
    _get_registered_apps, _get_notification_types, _get_timer_state,
    _get_recent_items, _get_bookmarks,
)


def get_context(context):
    # Guest portal routes (/dock/guest/<token>) are public — no Frappe login required.
    # All other /dock/* routes require a logged-in user.
    path = frappe.request.path if frappe.request else ""
    is_guest_portal = frappe.session.user == "Guest" and "/guest/" in path

    if frappe.session.user == "Guest" and not is_guest_portal:
        frappe.throw(frappe._("Please log in to access Dock."), frappe.PermissionError)

    if is_guest_portal:
        # Minimal boot for guest portal shell — no user-specific data
        raw_settings = frappe.db.get_singles_dict("Dock Settings")
        boot = {
            "installed": True,
            "is_guest_portal": True,
            "settings": {
                "site_label": raw_settings.get("site_label") or "",
                "privacy_policy_url": raw_settings.get("privacy_policy_url") or "",
            },
        }
        context.dock_boot_json = json.dumps(boot)
        return

    settings = _get_dock_settings()
    frappe_time_installed = "frappe_time" in frappe.get_installed_apps()

    # Build a lightweight settings object for _get_recent_items (only needs enable_recent_items)
    class _SettingsProxy:
        def __init__(self, raw):
            self._raw = raw
        def get(self, key, default=None):
            return self._raw.get(key, default)

    settings_proxy = _SettingsProxy(settings)

    boot = {
        "installed": True,
        "settings": settings,
        "registered_apps": _get_registered_apps(),
        "notification_types": _get_notification_types(),
        "unread_notifications": frappe.db.count(
            "Dock Notification",
            {"for_user": frappe.session.user, "read": 0},
        ),
        "frappe_time_installed": frappe_time_installed,
        "timer_state": _get_timer_state() if frappe_time_installed else None,
        "recent_items": _get_recent_items(settings_proxy),
        "bookmarks": _get_bookmarks(),
        "session": {
            "user": frappe.session.user,
            "user_fullname": frappe.utils.get_fullname(frappe.session.user),
            "user_image": frappe.db.get_value("User", frappe.session.user, "user_image"),
            "csrf_token": frappe.sessions.get_csrf_token(),
        },
        "is_dock_manager": frappe.db.get_value(
            "Has Role",
            {"parent": frappe.session.user, "role": ["in", ["Dock Manager", "System Manager"]]},
            "name",
        ) is not None,
    }
    # Pre-serialized so the template can output it with {{ dock_boot_json }}
    # without needing tojson filter (which may be blocked in safe_render mode)
    context.dock_boot_json = json.dumps(boot)


def _get_dock_settings():
    fields = [
        "theme", "timezone", "week_start", "date_format", "site_label",
        "enable_global_timer", "enable_bookmarks", "enable_recent_items",
        "recent_items_limit", "privacy_policy_url",
    ]
    raw = frappe.db.get_singles_dict("Dock Settings")
    return {f: raw.get(f) for f in fields}
