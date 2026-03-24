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


def auto_purge_bin():
    """
    Daily task: permanently delete bin items past the configured retention period.
    Calls each app's registered delete_endpoint via dock_bin_doctypes hooks.
    """
    if not frappe.db.exists("DocType", "Dock Settings"):
        return

    auto_purge = frappe.db.get_single_value("Dock Settings", "auto_purge_enabled")
    if not auto_purge:
        return

    retention_days = int(
        frappe.db.get_single_value("Dock Settings", "bin_retention_days") or 30
    )
    cutoff = frappe.utils.add_days(frappe.utils.now(), -retention_days)

    total_purged = 0
    for app in frappe.get_installed_apps():
        for decl in frappe.get_hooks("dock_bin_doctypes", app_name=app):
            items = decl if isinstance(decl, list) else [decl]
            for item in items:
                if not isinstance(item, dict):
                    continue
                dt = item.get("doctype")
                if isinstance(dt, list):
                    dt = dt[0]
                delete_endpoint = item.get("delete_endpoint")
                if isinstance(delete_endpoint, list):
                    delete_endpoint = delete_endpoint[0]
                if not dt or not delete_endpoint or not frappe.db.exists("DocType", dt):
                    continue
                expired = frappe.get_all(
                    dt,
                    filters={"deleted": 1, "deleted_on": ["<", cutoff]},
                    pluck="name",
                )
                if not expired:
                    continue
                try:
                    # Detect the right param name for the endpoint
                    import inspect
                    parts = delete_endpoint.rsplit(".", 1)
                    mod = frappe.get_module(parts[0])
                    func = getattr(mod, parts[1])
                    sig = inspect.signature(func)
                    param_name = "names"
                    for p in sig.parameters:
                        if p != "self":
                            param_name = p
                            break
                    result = frappe.call(delete_endpoint, **{param_name: expired})
                    count = (result or {}).get("deleted", len(expired))
                    total_purged += count
                except Exception as e:
                    frappe.log_error(
                        f"dock: auto_purge_bin failed for {dt}: {e}",
                        "Dock Bin Auto-Purge",
                    )

    if total_purged > 0:
        frappe.logger().info(f"Dock bin auto-purge: {total_purged} item(s) permanently deleted.")
