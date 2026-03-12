# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from dock import __version__


def extend_bootinfo(bootinfo):
    """Inject frappe.boot.dock — available client-side as window.frappe.boot.dock."""
    if not frappe.db.exists("DocType", "Dock Settings"):
        # Guard: not fully installed yet (e.g. mid-migration)
        return

    settings = frappe.get_cached_doc("Dock Settings")
    frappe_time_installed = "frappe_time" in frappe.get_installed_apps()

    bootinfo.dock = {
        "installed": True,
        "version": __version__,
        "settings": {
            "theme": settings.get("theme") or "system",
            "timezone": settings.get("timezone") or "",
            "week_start": settings.get("week_start") or "Monday",
            "date_format": settings.get("date_format") or "dd/mm/yyyy",
            "enable_global_timer": bool(settings.get("enable_global_timer")),
            "enable_bookmarks": bool(settings.get("enable_bookmarks")),
            "enable_recent_items": bool(settings.get("enable_recent_items")),
            "recent_items_limit": settings.get("recent_items_limit") or 20,
            "site_label": settings.get("site_label") or "",
            "notification_retention_days": settings.get("notification_retention_days") or 90,
            "guest_session_default_expiry_days": settings.get("guest_session_default_expiry_days") or 30,
            # frappe_manager_url intentionally excluded — server-only, permlevel 1
        },
        "registered_apps": _get_registered_apps(),
        # calendar_sources — seeded at boot to drive sidebar toggles + create picker
        "calendar_sources": _get_calendar_sources(),
        # notification_types: dict keyed by type for O(1) icon/label resolution
        "notification_types": _get_notification_types(),
        # Bell badge — avoids extra API call on mount
        "unread_notifications": frappe.db.count(
            "Dock Notification",
            {"for_user": frappe.session.user, "read": 0},
        ),
        # Timer — soft dependency on frappe_time
        "frappe_time_installed": frappe_time_installed,
        "timer_state": _get_timer_state() if frappe_time_installed else None,
        # Recent items + bookmarks — seeded at boot to avoid extra API calls on mount
        "recent_items": _get_recent_items(settings),
        "bookmarks": _get_bookmarks(),
    }


def _get_registered_apps():
    registered = []
    for app in frappe.get_installed_apps():
        registry = frappe.get_hooks("dock_app_registry", app_name=app)
        if not registry:
            continue
        # get_hooks may return the raw dict or a list-wrapped dict
        entry = registry if isinstance(registry, dict) else registry[0]
        # Frappe normalizes hook values to lists — unwrap single-item lists
        unwrapped = {k: v[0] if isinstance(v, list) and len(v) == 1 else v for k, v in entry.items()}
        registered.append({"app": app, **unwrapped})
    return registered


def _get_calendar_sources():
    """Returns apps that declare dock_calendar_sources, merged with registry color/label."""
    registered = {r["app"]: r for r in _get_registered_apps()}
    sources = []
    for app in frappe.get_installed_apps():
        decl = frappe.get_hooks("dock_calendar_sources", app_name=app)
        if decl:
            reg = registered.get(app, {})
            sources.append({
                "app": app,
                "label": reg.get("label", app),
                "color": reg.get("color", "#6b7280"),
                "event_label": decl[0].get("event_label", "Event"),
                "create_route_template": decl[0].get("create_route_template"),
            })
    return sources


def _get_notification_types():
    """Returns dict keyed by notification type for O(1) frontend resolution."""
    types = {}
    for app in frappe.get_installed_apps():
        for t in frappe.get_hooks("dock_notification_types", app_name=app):
            items = t if isinstance(t, list) else [t]
            for item in items:
                types[item["type"]] = {
                    "label": item["label"],
                    "icon": item.get("icon", "bell"),
                    "app": app,
                }
    return types


def _get_recent_items(settings):
    if not settings.get("enable_recent_items"):
        return []
    return frappe.get_all(
        "Dock Recent Item",
        filters={"user": frappe.session.user},
        fields=["name", "app", "doctype", "docname", "label", "icon", "visited_at"],
        order_by="visited_at desc",
        limit=8,
    )


def _get_bookmarks():
    return frappe.get_all(
        "Dock Bookmark",
        filters={"user": frappe.session.user},
        fields=["name", "app", "doctype", "docname", "label", "icon", "color", "sort_order"],
        order_by="sort_order asc",
        limit=12,
    )


def _get_timer_state():
    try:
        from dock.api.timer import get_state
        return get_state()
    except Exception:
        return {"state": "unavailable"}
