# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe


def after_install():
    _create_role("Dock User", desk_access=1)
    _create_role("Dock Manager", desk_access=1)
    _create_dock_settings()
    _assign_dock_user_to_existing_users()
    frappe.clear_cache()
    frappe.db.commit()
    frappe.msgprint(
        frappe._("Dock installed. Go to Dock Settings to configure theme, timezone, and features.")
    )


def _create_role(role_name: str, desk_access: int = 1):
    if frappe.db.exists("Role", role_name):
        return
    frappe.get_doc({
        "doctype": "Role",
        "role_name": role_name,
        "desk_access": desk_access,
    }).insert(ignore_permissions=True)


def _create_dock_settings():
    """Seed Dock Settings with sensible defaults. Safe to call multiple times."""
    site_timezone = (
        frappe.db.get_single_value("System Settings", "time_zone") or "UTC"
    )

    # Use set_single_value — the ORM new_doc+save path for Singles has
    # unreliable insert behaviour when tabSingles rows don't exist yet.
    # set_single_value does an INSERT ... ON DUPLICATE UPDATE directly.
    defaults = {
        "theme": "system",
        "timezone": site_timezone,
        "week_start": "Monday",
        "date_format": "dd/mm/yyyy",
        "recent_items_limit": 20,
        "notification_retention_days": 90,
        "guest_session_default_expiry_days": 30,
        "enable_global_timer": 1,
        "enable_bookmarks": 1,
        "enable_recent_items": 1,
    }

    # Only write fields that have no value yet — don't overwrite admin changes
    to_set = {
        k: v for k, v in defaults.items()
        if not frappe.db.get_single_value("Dock Settings", k)
    }
    if to_set:
        frappe.db.set_single_value("Dock Settings", to_set)


def _assign_dock_user_to_existing_users():
    """Assign Dock User role to all enabled System Users who don't already have it."""
    if not frappe.db.exists("Role", "Dock User"):
        return

    system_users = frappe.get_all(
        "User",
        filters={"enabled": 1, "user_type": "System User"},
        pluck="name",
    )

    for user_name in system_users:
        user = frappe.get_doc("User", user_name)
        if "Dock User" not in [r.role for r in user.roles]:
            user.add_roles("Dock User")
