# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe.model.document import Document


class DockNote(Document):
    def before_insert(self):
        """Cache a human-readable label for the linked record."""
        if self.reference_doctype and self.reference_name:
            title_field = frappe.get_meta(self.reference_doctype).get_title_field()
            self.reference_label = (
                frappe.db.get_value(self.reference_doctype, self.reference_name, title_field)
                or self.reference_name
            )


def get_permission_query_conditions(user=None):
    if not user:
        user = frappe.session.user
    roles = frappe.get_roles(user)
    if "System Manager" in roles or "Dock Manager" in roles:
        return None
    # Users see only their own notes (and non-deleted ones)
    return (
        f"`tabDock Note`.`owner` = {frappe.db.escape(user)}"
        f" AND `tabDock Note`.`deleted_at` IS NULL"
    )


def has_permission(doc, ptype="read", user=None):
    user = user or frappe.session.user
    roles = frappe.get_roles(user)
    if "System Manager" in roles or "Dock Manager" in roles:
        return True
    if doc.owner == user and not doc.deleted_at:
        return True
    return False
