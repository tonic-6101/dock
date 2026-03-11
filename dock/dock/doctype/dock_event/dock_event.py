# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe.model.document import Document


class DockEvent(Document):
    pass


def get_permission_query_conditions(user=None):
    if not user:
        user = frappe.session.user
    if "System Manager" in frappe.get_roles(user):
        return None
    return f"`tabDock Event`.`user` = {frappe.db.escape(user)}"


def has_permission(doc, ptype="read", user=None):
    user = user or frappe.session.user
    if "System Manager" in frappe.get_roles(user):
        return True
    if ptype in ("write", "delete", "create"):
        # Domain apps write via ignore_permissions — direct writes are blocked
        return False
    return doc.user == user
