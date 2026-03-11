# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe


@frappe.whitelist()
def track(app: str, doctype: str, docname: str, label: str, icon: str = None) -> None:
    """
    Upsert a recent item for the current user.
    Updates visited_at if a record for (user, app, doctype, docname) already exists.
    Trims list to recent_items_limit after upsert.
    No-op when enable_recent_items is false.
    """
    if not _recent_items_enabled():
        return

    user = frappe.session.user
    existing = frappe.db.get_value(
        "Dock Recent Item",
        {"user": user, "app": app, "doctype": doctype, "docname": docname},
        "name",
    )

    if existing:
        frappe.db.set_value(
            "Dock Recent Item",
            existing,
            {"visited_at": frappe.utils.now(), "label": label},
            update_modified=False,
        )
    else:
        frappe.get_doc({
            "doctype": "Dock Recent Item",
            "user": user,
            "app": app,
            "doctype": doctype,
            "docname": docname,
            "label": label,
            "icon": icon or "",
            "visited_at": frappe.utils.now(),
        }).insert(ignore_permissions=True)

    _trim_recent_items(user)


@frappe.whitelist()
def get(limit: int = 20) -> list:
    """Returns recent items for the current user, newest first."""
    if not _recent_items_enabled():
        return []

    return frappe.get_all(
        "Dock Recent Item",
        filters={"user": frappe.session.user},
        fields=["name", "app", "doctype", "docname", "label", "icon", "visited_at"],
        order_by="visited_at desc",
        limit=int(limit),
    )


@frappe.whitelist()
def remove(recent_item_name: str) -> None:
    """Remove a single recent item (user-initiated privacy control)."""
    doc = frappe.get_doc("Dock Recent Item", recent_item_name)
    if doc.user != frappe.session.user and "System Manager" not in frappe.get_roles():
        frappe.throw(frappe._("Not permitted"), frappe.PermissionError)
    frappe.delete_doc("Dock Recent Item", recent_item_name, ignore_permissions=True)


@frappe.whitelist()
def clear() -> None:
    """Delete all recent items for the current user."""
    frappe.db.delete("Dock Recent Item", {"user": frappe.session.user})


def _recent_items_enabled() -> bool:
    if not frappe.db.exists("DocType", "Dock Settings"):
        return False
    return bool(frappe.db.get_single_value("Dock Settings", "enable_recent_items"))


def _trim_recent_items(user: str) -> None:
    """Keep only the most recent N items per the configured limit."""
    limit = int(
        frappe.db.get_single_value("Dock Settings", "recent_items_limit") or 20
    )
    all_items = frappe.get_all(
        "Dock Recent Item",
        filters={"user": user},
        fields=["name"],
        order_by="visited_at desc",
    )
    if len(all_items) > limit:
        to_delete = [r["name"] for r in all_items[limit:]]
        frappe.db.delete("Dock Recent Item", {"name": ["in", to_delete]})
