# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe.model.document import Document


class DockDiscussion(Document):
    def before_insert(self):
        self.created_by = frappe.session.user
        self._add_author_as_participant()
        self._cache_link_labels()

    def on_update(self):
        self._cache_link_labels()

    def on_trash(self):
        """Cascade delete: remove comments and reactions on this discussion."""
        comments = frappe.get_all(
            "Dock Comment",
            filters={
                "reference_doctype": "Dock Discussion",
                "reference_name": self.name,
            },
            pluck="name",
        )
        for comment_name in comments:
            frappe.delete_doc("Dock Comment", comment_name, force=True)

        frappe.db.delete("Dock Reaction", {
            "reference_doctype": "Dock Discussion",
            "reference_name": self.name,
        })

    def _add_author_as_participant(self):
        """Ensure the creator is listed as a participant with Author role."""
        author_exists = any(
            p.user == self.created_by and p.role == "Author"
            for p in (self.participants or [])
        )
        if not author_exists:
            self.append("participants", {
                "user": self.created_by,
                "role": "Author",
            })

    def _cache_link_labels(self):
        """Auto-fetch human-readable labels for linked records."""
        for link in (self.linked_records or []):
            if link.reference_doctype and link.reference_name and not link.link_label:
                try:
                    title_field = frappe.get_meta(link.reference_doctype).get_title_field()
                    link.link_label = (
                        frappe.db.get_value(
                            link.reference_doctype, link.reference_name, title_field
                        )
                        or link.reference_name
                    )
                except Exception:
                    link.link_label = link.reference_name


def get_permission_query_conditions(user=None):
    if not user:
        user = frappe.session.user
    roles = frappe.get_roles(user)
    if "System Manager" in roles or "Dock Manager" in roles:
        return None
    return None  # All logged-in Dock Users can see discussions


def has_permission(doc, ptype="read", user=None):
    user = user or frappe.session.user
    roles = frappe.get_roles(user)
    if "System Manager" in roles or "Dock Manager" in roles:
        return True
    if ptype == "read":
        return True  # All Dock Users can read discussions
    if ptype in ("write", "create"):
        return True  # All Dock Users can create/write discussions
    if ptype == "delete":
        return doc.created_by == user
    return False
