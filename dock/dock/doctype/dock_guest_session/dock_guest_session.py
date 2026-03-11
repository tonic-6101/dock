# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe.model.document import Document


class DockGuestSession(Document):
    def on_trash(self):
        """Cascade delete all activity records for this session (GDPR Art. 17 + data integrity)."""
        frappe.db.delete("Dock Guest Activity", {"session": self.name})


def get_permission_query_conditions(user=None):
    if not user:
        user = frappe.session.user
    roles = frappe.get_roles(user)
    if "System Manager" in roles or "Dock Manager" in roles:
        return None
    return f"`tabDock Guest Session`.`created_by` = {frappe.db.escape(user)}"


def has_permission(doc, ptype="read", user=None):
    user = user or frappe.session.user
    roles = frappe.get_roles(user)
    is_manager = "System Manager" in roles or "Dock Manager" in roles
    if ptype == "read":
        return doc.created_by == user or is_manager
    if ptype in ("write", "delete"):
        return is_manager
    return False
