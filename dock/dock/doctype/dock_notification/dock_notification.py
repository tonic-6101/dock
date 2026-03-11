# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe.model.document import Document


class DockNotification(Document):
    pass


def get_permission_query_conditions(user=None):
    if not user:
        user = frappe.session.user
    roles = frappe.get_roles(user)
    if "System Manager" in roles or "Dock Manager" in roles:
        return None
    return f"`tabDock Notification`.`for_user` = {frappe.db.escape(user)}"


def has_permission(doc, ptype="read", user=None):
    user = user or frappe.session.user
    roles = frappe.get_roles(user)
    if "System Manager" in roles or "Dock Manager" in roles:
        return True
    if ptype == "read":
        return doc.for_user == user
    return False
