# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe import _


@frappe.whitelist()
def save_user_preference(
    theme: str = None,
    color_mode: str = None,
    timezone: str = None,
    week_start: str = None,
    date_format: str = None,
    ui_language: str = None,
) -> dict:
    """
    Upsert Dock User Preference for the current user (autoname = user).
    Blank/None values are saved as blank (meaning: inherit from org default).
    Returns updated merged settings.
    """
    user = frappe.session.user
    if frappe.db.exists("Dock User Preference", user):
        doc = frappe.get_doc("Dock User Preference", user)
    else:
        doc = frappe.new_doc("Dock User Preference")
        doc.user = user

    if theme is not None:
        doc.theme = theme
    if color_mode is not None:
        doc.color_mode = color_mode
    if timezone is not None:
        doc.timezone = timezone
    if week_start is not None:
        doc.week_start = week_start
    if date_format is not None:
        doc.date_format = date_format
    if ui_language is not None:
        doc.ui_language = ui_language

    doc.save(ignore_permissions=True)
    return _get_merged_settings(user)


_ORG_FIELDS = {
    "site_label", "default_app", "timezone", "week_start", "date_format",
    "ui_language", "currency", "number_format",
    "enable_global_timer", "enable_bookmarks", "enable_recent_items", "recent_items_limit",
}


@frappe.whitelist()
def save_org_settings(values: dict) -> dict:
    """
    Saves allowed fields to Dock Settings. Requires Dock Manager role.
    Fires dock_settings_updated realtime after commit.
    """
    if not frappe.has_permission("Dock Settings", "write"):
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    sanitised = {k: v for k, v in values.items() if k in _ORG_FIELDS}
    if not sanitised:
        return {}

    frappe.db.set_single_value("Dock Settings", sanitised)

    frappe.publish_realtime(
        "dock_settings_updated",
        {"changed_fields": list(sanitised.keys())},
        after_commit=True,
    )

    frappe.clear_document_cache("Dock Settings", "Dock Settings")
    return _get_merged_settings(frappe.session.user)


def _flag(val, default: bool = True) -> bool:
    """Return bool(val) if val is not None, else default. Handles unset Frappe integer flags."""
    return bool(val) if val is not None else default


def _get_merged_settings(user: str) -> dict:
    """Internal: cascade merge for a given user. Called by extend_bootinfo — not a public endpoint."""
    org = frappe.get_cached_doc("Dock Settings")

    pref = None
    if frappe.db.exists("Dock User Preference", user):
        pref = frappe.get_cached_doc("Dock User Preference", user)

    def resolve(pref_val, org_val, fallback):
        if pref_val:
            return pref_val
        if org_val:
            return org_val
        return fallback

    # theme: user pref only → fallback to "system" (no org-level theme)
    theme = (pref.theme if pref and pref.theme else None) or "system"
    # color_mode: user pref only → fallback to "branded"
    color_mode = (pref.color_mode if pref and pref.get("color_mode") else None) or "branded"

    return {
        "theme": theme,
        "color_mode": color_mode,
        "timezone": resolve(
            pref.timezone if pref else None,
            org.get("timezone"),
            "UTC",
        ),
        "week_start": resolve(
            pref.week_start if pref else None,
            org.get("week_start"),
            "Monday",
        ),
        "date_format": resolve(
            pref.date_format if pref else None,
            org.get("date_format"),
            "dd/mm/yyyy",
        ),
        "ui_language": resolve(
            pref.ui_language if pref else None,
            org.get("ui_language"),
            "en",
        ),
        "currency":      org.get("currency")      or "EUR",
        "number_format": org.get("number_format") or "#.###,##",
        "enable_global_timer": _flag(org.get("enable_global_timer"), default=True),
        "enable_bookmarks": _flag(org.get("enable_bookmarks"), default=True),
        "enable_recent_items": _flag(org.get("enable_recent_items"), default=True),
        "recent_items_limit": org.get("recent_items_limit") or 20,
        "site_label": org.get("site_label") or "",
        "default_app": org.get("default_app") or "/app",
        "privacy_policy_url": org.get("privacy_policy_url") or "",
        "notification_retention_days": org.get("notification_retention_days") or 90,
        "guest_session_default_expiry_days": org.get("guest_session_default_expiry_days") or 30,
    }
