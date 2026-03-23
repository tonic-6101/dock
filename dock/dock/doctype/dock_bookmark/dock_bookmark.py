# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe import _
from frappe.model.document import Document


class DockBookmark(Document):
    def validate(self):
        if not self.is_new() and self.get_db_value("user") != self.user:
            frappe.throw(_("Cannot change bookmark owner"))


def get_permission_query_conditions(user=None):
    if not user:
        user = frappe.session.user
    if "System Manager" in frappe.get_roles(user):
        return None
    return f"`tabDock Bookmark`.`user` = {frappe.db.escape(user)}"


def has_permission(doc, ptype="read", user=None):
    user = user or frappe.session.user
    if "System Manager" in frappe.get_roles(user):
        return True
    return doc.user == user
