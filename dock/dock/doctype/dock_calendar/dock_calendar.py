# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe import _
from frappe.model.document import Document


# Curated palette — auto-cycled on creation
CALENDAR_COLORS = [
    "#6366f1",  # Indigo
    "#10b981",  # Emerald
    "#f43f5e",  # Rose
    "#f59e0b",  # Amber
    "#0ea5e9",  # Sky
    "#8b5cf6",  # Violet
    "#14b8a6",  # Teal
    "#f97316",  # Orange
    "#ec4899",  # Pink
    "#84cc16",  # Lime
    "#64748b",  # Slate
    "#06b6d4",  # Cyan
]


class DockCalendar(Document):
    def validate(self):
        self.set_owner_user()
        self.set_default_color()

    def set_owner_user(self):
        if not self.owner_user:
            self.owner_user = frappe.session.user

    def set_default_color(self):
        if not self.color:
            used_colors = set(
                frappe.get_all(
                    "Dock Calendar",
                    filters={"owner_user": self.owner_user},
                    pluck="color",
                )
            )
            for c in CALENDAR_COLORS:
                if c not in used_colors:
                    self.color = c
                    return
            self.color = CALENDAR_COLORS[0]

    def after_insert(self):
        # If this is the user's first calendar, make it default
        count = frappe.db.count(
            "Dock Calendar", {"owner_user": self.owner_user}
        )
        if count == 1:
            self.db_set("is_default", 1)

    def on_trash(self):
        if self.is_default:
            frappe.throw(_("Cannot delete the default calendar. Set another calendar as default first."))


def get_permission_query_conditions(user=None):
    if not user:
        user = frappe.session.user
    if "System Manager" in frappe.get_roles(user):
        return None
    escaped = frappe.db.escape(user)
    return (
        f"(`tabDock Calendar`.`owner_user` = {escaped}"
        f" OR `tabDock Calendar`.`name` IN"
        f" (SELECT parent FROM `tabDock Calendar Member` WHERE user = {escaped}))"
    )


def has_permission(doc, ptype="read", user=None):
    user = user or frappe.session.user
    if "System Manager" in frappe.get_roles(user):
        return True
    # Owner can do anything
    if doc.owner_user == user:
        return True
    # Members can read; Edit/Manage members can write
    for m in doc.get("members") or []:
        if m.user == user:
            if ptype == "read":
                return True
            if ptype == "write" and m.role in ("Edit", "Manage"):
                return True
            if ptype == "delete":
                return False
    return False
