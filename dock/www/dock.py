# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
import frappe.sessions
from dock import __version__
from dock.boot import (
    _get_registered_apps, _get_notification_types, _get_timer_state,
    _get_recent_items, _get_bookmarks, _get_guest_views, _get_settings_sections,
    _get_activity_sources, _get_unread_discussions_count,
)
from dock.api.messages import get_message_channels, get_unread_counts
from dock.api.settings import _get_merged_settings


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
            # Guest views needed to resolve the iframe URL for the portal shell
            "guest_views": _get_guest_views(),
        }
        context.dock_boot_json = frappe.as_json(boot)
        return

    settings = _get_merged_settings(frappe.session.user)
    watch_installed = "watch" in frappe.get_installed_apps()

    boot = {
        "installed": True,
        "version": __version__,
        "settings": settings,
        "registered_apps": _get_registered_apps(),
        "notification_types": _get_notification_types(),
        "unread_notifications": frappe.db.count(
            "Dock Notification",
            {"for_user": frappe.session.user, "read": 0},
        ),
        "watch_installed": watch_installed,
        "timer_state": _get_timer_state() if watch_installed else None,
        "recent_items": _get_recent_items(settings),
        "bookmarks": _get_bookmarks(settings),
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
        "is_system_manager": frappe.db.get_value(
            "Has Role",
            {"parent": frappe.session.user, "role": "System Manager"},
            "name",
        ) is not None,
        "guest_views": _get_guest_views(),
        "settings_sections": _get_settings_sections(),
        "activity_sources": _get_activity_sources(),
        "message_channels": get_message_channels(),
        "unread_counts": get_unread_counts(),
        "unread_discussions": _get_unread_discussions_count(),
    }
    # Pre-serialized so the template can output it with {{ dock_boot_json }}
    # without needing tojson filter (which may be blocked in safe_render mode)
    context.dock_boot_json = frappe.as_json(boot)

