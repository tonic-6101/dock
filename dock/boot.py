# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from dock import __version__
from dock.api.settings import _get_merged_settings


def extend_bootinfo(bootinfo):
    """Inject frappe.boot.dock — available client-side as window.frappe.boot.dock."""
    if not frappe.db.exists("DocType", "Dock Settings"):
        # Guard: not fully installed yet (e.g. mid-migration)
        return

    merged = _get_merged_settings(frappe.session.user)
    watch_installed = "watch" in frappe.get_installed_apps()

    bootinfo.dock = {
        "installed": True,
        "version": __version__,
        "settings": merged,
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
        # Timer — soft dependency on watch (formerly frappe_time)
        "watch_installed": watch_installed,
        "timer_state": _get_timer_state() if watch_installed else None,
        # Recent items + bookmarks — seeded at boot to avoid extra API calls on mount
        "recent_items": _get_recent_items(merged),
        "bookmarks": _get_bookmarks(merged),
        # Search sections per app — drives second-level scope tabs in the search modal
        "search_sections": _get_search_sections(),
        # Guest views — collected from dock_guest_views hooks; used by Guest Portal shell
        "guest_views": _get_guest_views(),
        # Settings sections — collected from dock_settings_sections hooks; drives sidebar
        "settings_sections": _get_settings_sections(),
    }


@frappe.whitelist()
def get_boot():
    """Return dock boot data for domain-app SPAs that bypass Frappe's standard boot."""
    if not frappe.db.exists("DocType", "Dock Settings"):
        return {"installed": False}

    merged = _get_merged_settings(frappe.session.user)
    watch_installed = "watch" in frappe.get_installed_apps()

    return {
        "installed": True,
        "version": __version__,
        "settings": merged,
        "registered_apps": _get_registered_apps(),
        "calendar_sources": _get_calendar_sources(),
        "notification_types": _get_notification_types(),
        "unread_notifications": frappe.db.count(
            "Dock Notification",
            {"for_user": frappe.session.user, "read": 0},
        ),
        "watch_installed": watch_installed,
        "timer_state": _get_timer_state() if watch_installed else None,
        "recent_items": _get_recent_items(merged),
        "bookmarks": _get_bookmarks(merged),
        "search_sections": _get_search_sections(),
        "guest_views": _get_guest_views(),
        "settings_sections": _get_settings_sections(),
    }


_REQUIRED_APP_REGISTRY_FIELDS = {"label", "icon", "color", "route"}


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
        missing = _REQUIRED_APP_REGISTRY_FIELDS - set(unwrapped.keys())
        if missing:
            frappe.log_error(
                f"dock: {app} dock_app_registry missing required fields: {missing}",
                "Dock Hook Validation",
            )
            continue
        registered.append({"app": app, **unwrapped})
    return registered


def _get_calendar_sources():
    """Returns apps that declare dock_calendar_sources, merged with registry color/label."""
    registered = {r["app"]: r for r in _get_registered_apps()}
    sources = []
    for app in frappe.get_installed_apps():
        decl = frappe.get_hooks("dock_calendar_sources", app_name=app)
        if not decl:
            continue
        # get_hooks may return a dict or a list — normalize
        entry = decl if isinstance(decl, dict) else decl[0]
        # Unwrap single-item list values (Frappe normalizes hook values to lists)
        entry = {k: v[0] if isinstance(v, list) and len(v) == 1 else v for k, v in entry.items()}
        reg = registered.get(app, {})
        sources.append({
            "app": app,
            "label": reg.get("label", app),
            "color": reg.get("color", "#6b7280"),
            "event_label": entry.get("event_label", "Event"),
            "create_route_template": entry.get("create_route_template"),
        })
    return sources


_REQUIRED_NOTIFICATION_TYPE_FIELDS = {"type", "label", "icon"}


def _get_notification_types():
    """Returns dict keyed by notification type for O(1) frontend resolution."""
    types = {}
    for app in frappe.get_installed_apps():
        for t in frappe.get_hooks("dock_notification_types", app_name=app):
            items = t if isinstance(t, list) else [t]
            for item in items:
                if not isinstance(item, dict):
                    continue
                missing = _REQUIRED_NOTIFICATION_TYPE_FIELDS - set(item.keys())
                if missing:
                    frappe.log_error(
                        f"dock: {app} dock_notification_types entry missing fields: {missing}",
                        "Dock Hook Validation",
                    )
                    continue
                key = item["type"]
                if key in types:
                    frappe.log_error(
                        f"dock: duplicate notification type '{key}' declared by '{app}' "
                        f"(already registered by '{types[key]['app']}'). First declaration wins.",
                        "Dock Hook Validation",
                    )
                    continue
                types[key] = {
                    "label": item["label"],
                    "icon": item["icon"],
                    "app": app,
                }
    return types


def _get_recent_items(settings):
    if not settings.get("enable_recent_items"):
        return []
    return frappe.get_all(
        "Dock Recent Item",
        filters={"user": frappe.session.user},
        fields=["name", "app", "ref_doctype as doctype", "docname", "label", "icon", "visited_at"],
        order_by="visited_at desc",
        limit=8,
    )


def _get_bookmarks(settings):
    if not settings.get("enable_bookmarks"):
        return []
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


def _get_guest_views():
    """
    Collects dock_guest_views from all installed apps.
    Shape: [{ "view_id": "orga.project_status", "label": "...", "route": "...", "app": "orga" }, ...]
    Used by the Guest Portal shell to resolve the iframe URL for a session's view_id.
    """
    views = []
    for app in frappe.get_installed_apps():
        hook_views = frappe.get_hooks("dock_guest_views", app_name=app)
        for view_list in hook_views:
            items = view_list if isinstance(view_list, list) else [view_list]
            for v in items:
                views.append({
                    "view_id": v.get("view_id"),
                    "label": v.get("label"),
                    "route": v.get("route"),
                    "app": app,
                })
    return views


def _get_settings_sections():
    """
    Collects dock_settings_sections from all installed apps.
    Each app declares its settings UI via hooks.py — Dock renders them in the
    sidebar and loads the app's settings component at runtime.

    Shape: [{
        "app": "orga",
        "label": "Orga",
        "icon": "briefcase",
        "route": "orga",
        "component": "OrgaSettings",
        "bundle": "/assets/orga/js/orga-settings.esm.js",
        "permission": "Orga Settings",  # optional
        "sections": [{"label": "General", "key": "general"}, ...]  # optional
    }, ...]
    """
    sections = []
    for app in frappe.get_installed_apps():
        hook_sections = frappe.get_hooks("dock_settings_sections", app_name=app)
        if not hook_sections:
            continue
        for entry in hook_sections:
            items = entry if isinstance(entry, list) else [entry]
            for item in items:
                if not isinstance(item, dict):
                    continue
                # Permission check — only include if user has required role
                perm = item.get("permission")
                if perm:
                    if isinstance(perm, list):
                        perm = perm[0]
                    user_roles = frappe.get_roles(frappe.session.user)
                    if perm not in user_roles and "System Manager" not in user_roles:
                        continue
                # Unwrap single-item list values (Frappe normalizes hook values to lists)
                unwrapped = {}
                for k, v in item.items():
                    if isinstance(v, list) and len(v) == 1 and k != "sections":
                        unwrapped[k] = v[0]
                    else:
                        unwrapped[k] = v
                # Unwrap nested sections list values
                if "sections" in unwrapped:
                    clean_sections = []
                    raw_sections = unwrapped["sections"]
                    if isinstance(raw_sections, list):
                        for s in raw_sections:
                            if isinstance(s, dict):
                                clean_sections.append({
                                    sk: sv[0] if isinstance(sv, list) and len(sv) == 1 else sv
                                    for sk, sv in s.items()
                                })
                    unwrapped["sections"] = clean_sections
                sections.append({"app": app, **unwrapped})
    return sections


def _get_search_sections():
    """
    Returns a dict of app → list of section labels/doctypes.
    Used by the frontend search modal to render second-level section tabs.
    Shape: { "orga": [{ "label": "Projects", "doctype": "Orga Project" }, ...], ... }
    """
    result = {}
    for app in frappe.get_installed_apps():
        if app == "frappe":
            continue
        hook_sections = frappe.get_hooks("dock_search_sections", app_name=app)
        if not hook_sections:
            continue
        sections = []
        for section_list in hook_sections:
            items = section_list if isinstance(section_list, list) else [section_list]
            for s in items:
                sections.append({
                    "label": s.get("label"),
                    "doctype": s.get("doctype"),
                })
        if sections:
            result[app] = sections
    return result
