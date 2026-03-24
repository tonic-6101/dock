# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

"""
Calendar management API — CRUD for user calendars and sharing.
Separate from calendar.py (event API) to keep concerns clean.
"""

import frappe
from frappe import _


@frappe.whitelist()
def get_calendars() -> dict:
    """
    Returns all calendars visible to the current user, grouped:
    - user_calendars: owned by current user
    - shared_calendars: shared with current user (via Dock Calendar Member)
    """
    user = frappe.session.user

    # Owned calendars
    owned = frappe.get_all(
        "Dock Calendar",
        filters={"owner_user": user},
        fields=["name", "title", "color", "is_default", "owner_user"],
        order_by="is_default desc, title asc",
    )

    # Shared calendars (where current user is a member)
    shared_names = frappe.get_all(
        "Dock Calendar Member",
        filters={"user": user},
        fields=["parent", "role"],
    )
    shared = []
    for s in shared_names:
        cal = frappe.db.get_value(
            "Dock Calendar", s.parent,
            ["name", "title", "color", "owner_user"],
            as_dict=True,
        )
        if cal:
            owner_name = frappe.db.get_value("User", cal.owner_user, "full_name") or cal.owner_user
            shared.append({
                **cal,
                "role": s.role,
                "owner_name": owner_name,
            })

    return {
        "user_calendars": owned,
        "shared_calendars": shared,
    }


@frappe.whitelist()
def create_calendar(title: str, color: str = None, description: str = None) -> dict:
    """Create a new user calendar."""
    doc = frappe.get_doc({
        "doctype": "Dock Calendar",
        "title": title,
        "color": color or None,
        "description": description or None,
        "owner_user": frappe.session.user,
    })
    doc.insert(ignore_permissions=True)
    return doc.as_dict()


@frappe.whitelist()
def update_calendar(name: str, title: str = None, color: str = None, description: str = None) -> dict:
    """Update a calendar's properties. Only owner or Manage role."""
    doc = frappe.get_doc("Dock Calendar", name)
    _check_manage_access(doc)

    if title is not None:
        doc.title = title
    if color is not None:
        doc.color = color
    if description is not None:
        doc.description = description

    doc.save(ignore_permissions=True)
    return doc.as_dict()


@frappe.whitelist()
def delete_calendar(name: str) -> dict:
    """Delete a calendar. Only owner can delete. Cannot delete default."""
    doc = frappe.get_doc("Dock Calendar", name)
    if doc.owner_user != frappe.session.user:
        frappe.throw(_("Only the calendar owner can delete it."))
    if doc.is_default:
        frappe.throw(_("Cannot delete the default calendar. Set another as default first."))

    # Move events to default calendar
    default_cal = frappe.db.get_value(
        "Dock Calendar",
        {"owner_user": frappe.session.user, "is_default": 1},
        "name",
    )
    if default_cal:
        frappe.db.sql(
            "UPDATE `tabDock Event` SET calendar = %s WHERE calendar = %s",
            (default_cal, name),
        )

    doc.delete(ignore_permissions=True)
    return {"deleted": name, "events_moved_to": default_cal}


@frappe.whitelist()
def set_default_calendar(name: str) -> dict:
    """Set a calendar as the user's default."""
    doc = frappe.get_doc("Dock Calendar", name)
    if doc.owner_user != frappe.session.user:
        frappe.throw(_("Only the calendar owner can set it as default."))

    # Clear existing default
    frappe.db.sql(
        "UPDATE `tabDock Calendar` SET is_default = 0 WHERE owner_user = %s AND is_default = 1",
        (frappe.session.user,),
    )
    doc.db_set("is_default", 1)
    return {"name": name, "is_default": 1}


# ── Sharing ────────────────────────────────────────────────────────────────


@frappe.whitelist()
def get_calendar_members(calendar: str) -> list:
    """Get members of a calendar with user info."""
    doc = frappe.get_doc("Dock Calendar", calendar)
    _check_manage_access(doc)

    members = []
    for m in doc.get("members") or []:
        user_info = frappe.db.get_value(
            "User", m.user, ["full_name", "user_image"], as_dict=True,
        )
        members.append({
            "user": m.user,
            "user_name": (user_info.get("full_name") if user_info else None) or m.user,
            "user_image": user_info.get("user_image") if user_info else None,
            "role": m.role,
        })
    return members


@frappe.whitelist()
def add_calendar_member(calendar: str, user: str, role: str = "Edit") -> dict:
    """Share a calendar with a user."""
    if role not in ("View", "Edit", "Manage"):
        frappe.throw(_("Invalid role. Must be View, Edit, or Manage."))

    doc = frappe.get_doc("Dock Calendar", calendar)
    _check_manage_access(doc)

    # Cannot add yourself
    if user == doc.owner_user:
        frappe.throw(_("The calendar owner is already implicitly a member."))

    # Check for duplicates
    for m in doc.get("members") or []:
        if m.user == user:
            frappe.throw(_("{0} is already a member of this calendar.").format(user))

    doc.append("members", {
        "user": user,
        "role": role,
    })
    doc.save(ignore_permissions=True)

    # Notify the user
    _notify_calendar_shared(doc, user, role)

    return {"success": True}


@frappe.whitelist()
def update_calendar_member(calendar: str, user: str, role: str) -> dict:
    """Change a member's role."""
    if role not in ("View", "Edit", "Manage"):
        frappe.throw(_("Invalid role. Must be View, Edit, or Manage."))

    doc = frappe.get_doc("Dock Calendar", calendar)
    _check_manage_access(doc)

    updated = False
    for m in doc.get("members") or []:
        if m.user == user:
            m.role = role
            updated = True
            break

    if not updated:
        frappe.throw(_("{0} is not a member of this calendar.").format(user))

    doc.save(ignore_permissions=True)
    return {"success": True, "role": role}


@frappe.whitelist()
def remove_calendar_member(calendar: str, user: str) -> dict:
    """Remove a member from a calendar. Owner or Manage role, or user removing themselves."""
    doc = frappe.get_doc("Dock Calendar", calendar)

    # Allow the user to remove themselves (leave calendar)
    if user != frappe.session.user:
        _check_manage_access(doc)

    original_len = len(doc.get("members") or [])
    doc.members = [m for m in doc.members if m.user != user]

    if len(doc.members) == original_len:
        frappe.throw(_("{0} is not a member of this calendar.").format(user))

    doc.save(ignore_permissions=True)
    return {"success": True}


# ── Default calendar auto-setup ────────────────────────────────────────────


@frappe.whitelist()
def ensure_default_calendar() -> dict:
    """
    Ensures the current user has a default calendar.
    Creates one if none exists. Returns the default calendar.
    """
    user = frappe.session.user
    default_cal = frappe.db.get_value(
        "Dock Calendar",
        {"owner_user": user, "is_default": 1},
        ["name", "title", "color"],
        as_dict=True,
    )
    if default_cal:
        return default_cal

    # Check if user has any calendar at all
    any_cal = frappe.db.get_value(
        "Dock Calendar",
        {"owner_user": user},
        "name",
    )
    if any_cal:
        frappe.db.set_value("Dock Calendar", any_cal, "is_default", 1)
        return frappe.db.get_value(
            "Dock Calendar", any_cal,
            ["name", "title", "color"], as_dict=True,
        )

    # Create default calendar
    doc = frappe.get_doc({
        "doctype": "Dock Calendar",
        "title": _("My Calendar"),
        "owner_user": user,
        "is_default": 1,
    })
    doc.insert(ignore_permissions=True)
    return {"name": doc.name, "title": doc.title, "color": doc.color}


# ── Internal helpers ───────────────────────────────────────────────────────


def _check_manage_access(doc):
    """Check if current user can manage this calendar (owner or Manage role)."""
    user = frappe.session.user
    if doc.owner_user == user:
        return
    for m in doc.get("members") or []:
        if m.user == user and m.role == "Manage":
            return
    frappe.throw(_("You don't have permission to manage this calendar."))


def _notify_calendar_shared(doc, user, role):
    """Send realtime notification when a calendar is shared."""
    try:
        owner_name = frappe.db.get_value("User", doc.owner_user, "full_name") or doc.owner_user
        frappe.publish_realtime(
            "dock_calendar_shared",
            {
                "calendar": doc.name,
                "calendar_title": doc.title,
                "from_user": doc.owner_user,
                "from_user_fullname": owner_name,
                "role": role,
            },
            user=user,
        )
    except Exception as e:
        frappe.log_error(f"Calendar share notification failed: {e}", "Dock Calendar")
