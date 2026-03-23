# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe import _
from frappe.model.document import Document


class DockReaction(Document):
    def before_insert(self):
        self.user = frappe.session.user
        # Enforce uniqueness: one reaction per type per user per record
        existing = frappe.db.exists("Dock Reaction", {
            "reference_doctype": self.reference_doctype,
            "reference_name": self.reference_name,
            "user": self.user,
            "reaction_type": self.reaction_type,
        })
        if existing:
            frappe.throw(
                _("You have already reacted with {0}").format(self.reaction_type),
                frappe.DuplicateEntryError,
            )


def get_permission_query_conditions(user=None):
    if not user:
        user = frappe.session.user
    roles = frappe.get_roles(user)
    if "System Manager" in roles or "Dock Manager" in roles:
        return None
    return None  # All logged-in users can see reactions


def has_permission(doc, ptype="read", user=None):
    user = user or frappe.session.user
    roles = frappe.get_roles(user)
    if "System Manager" in roles or "Dock Manager" in roles:
        return True
    if ptype == "read":
        return True  # All logged-in users can read reactions
    if ptype in ("create", "delete") and doc.user == user:
        return True
    return False
