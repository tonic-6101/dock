# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe


def cleanup_old_notifications():
    """
    Delete read Dock Notifications older than the configured retention window.
    Also caps unread notifications at 500 per user (oldest deleted first).
    Runs daily. Retention window comes from Dock Settings.notification_retention_days.
    """
    if not frappe.db.exists("DocType", "Dock Settings"):
        return

    days = (
        frappe.db.get_single_value("Dock Settings", "notification_retention_days") or 90
    )

    from frappe.query_builder import Interval
    from frappe.query_builder.functions import Now

    # Delete read notifications beyond retention window
    table = frappe.qb.DocType("Dock Notification")
    frappe.qb.from_(table).delete().where(
        (table.read == 1) & (table.modified < (Now() - Interval(days=days)))
    ).run()

    # Cap unread notifications at 500 per user
    UNREAD_CAP = 500
    users_with_excess = frappe.db.sql(
        """
        SELECT for_user, COUNT(*) as cnt
        FROM `tabDock Notification`
        WHERE `read` = 0
        GROUP BY for_user
        HAVING cnt > %s
        """,
        (UNREAD_CAP,),
        as_dict=True,
    )
    for row in users_with_excess:
        excess = frappe.get_all(
            "Dock Notification",
            filters={"for_user": row.for_user, "read": 0},
            fields=["name"],
            order_by="creation asc",
            limit=row.cnt - UNREAD_CAP,
        )
        names = [n.name for n in excess]
        if names:
            frappe.db.delete("Dock Notification", {"name": ["in", names]})
