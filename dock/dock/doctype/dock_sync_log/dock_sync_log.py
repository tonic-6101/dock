# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe.model.document import Document


class DockSyncLog(Document):
    pass


def get_permission_query_conditions(user=None):
    if not user:
        user = frappe.session.user
    roles = frappe.get_roles(user)
    if "System Manager" in roles or "Dock Manager" in roles:
        return None
    # Non-admin users cannot see sync logs
    return "1=0"


def has_permission(doc, ptype="read", user=None):
    user = user or frappe.session.user
    roles = frappe.get_roles(user)
    if ptype in ("write", "create"):
        return False
    return "System Manager" in roles or "Dock Manager" in roles


def cleanup_old_sync_logs():
    """Delete Dock Sync Log entries older than the configured retention period."""
    retention_days = frappe.db.get_single_value("Dock Settings", "sync_log_retention_days") or 90
    cutoff = frappe.utils.add_days(frappe.utils.now_datetime(), -retention_days)
    old_logs = frappe.get_all(
        "Dock Sync Log",
        filters={"creation": ["<", cutoff]},
        fields=["name"],
        limit=1000,
    )
    for log in old_logs:
        frappe.delete_doc("Dock Sync Log", log.name, ignore_permissions=True)
    if old_logs:
        frappe.db.commit()
