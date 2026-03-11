# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe


def cleanup_old_notifications():
    """
    Delete read Dock Notifications older than the configured retention window.
    Runs daily. Retention window comes from Dock Settings.notification_retention_days.
    """
    if not frappe.db.exists("DocType", "Dock Settings"):
        return

    days = (
        frappe.db.get_single_value("Dock Settings", "notification_retention_days") or 90
    )

    from frappe.query_builder import Interval
    from frappe.query_builder.functions import Now

    table = frappe.qb.DocType("Dock Notification")
    frappe.qb.from_(table).delete().where(
        (table.read == 1) & (table.modified < (Now() - Interval(days=days)))
    ).run()
