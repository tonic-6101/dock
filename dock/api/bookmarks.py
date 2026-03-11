# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe

_MAX_BOOKMARKS = 12


@frappe.whitelist()
def add(app: str, doctype: str, docname: str, label: str, icon: str = None) -> str:
    """
    Add a bookmark for the current user. Returns bookmark name.
    Idempotent — returns existing name if already bookmarked.
    Raises frappe.ValidationError if the user already has _MAX_BOOKMARKS bookmarks.
    """
    user = frappe.session.user

    existing = frappe.db.get_value(
        "Dock Bookmark",
        {"user": user, "app": app, "doctype": doctype, "docname": docname},
        "name",
    )
    if existing:
        return existing

    count = frappe.db.count("Dock Bookmark", {"user": user})
    if count >= _MAX_BOOKMARKS:
        frappe.throw(
            frappe._("You can have a maximum of {0} bookmarks").format(_MAX_BOOKMARKS),
            frappe.ValidationError,
        )

    doc = frappe.get_doc({
        "doctype": "Dock Bookmark",
        "user": user,
        "app": app,
        "doctype": doctype,
        "docname": docname,
        "label": label,
        "icon": icon or "",
        "sort_order": count,
    })
    doc.insert(ignore_permissions=True)
    return doc.name


@frappe.whitelist()
def remove(bookmark_name: str) -> None:
    """Remove a bookmark."""
    frappe.delete_doc("Dock Bookmark", bookmark_name)


@frappe.whitelist()
def get() -> list:
    """Returns all bookmarks for the current user, sorted by sort_order."""
    return frappe.get_all(
        "Dock Bookmark",
        filters={"user": frappe.session.user},
        fields=["name", "app", "doctype", "docname", "label", "icon", "sort_order"],
        order_by="sort_order asc",
    )


@frappe.whitelist()
def reorder(ordered_names: list) -> None:
    """
    Update sort_order for bookmarks. Pass names in desired order (index = new sort_order).
    Verifies all names belong to the current user before updating.
    """
    if isinstance(ordered_names, str):
        import json
        ordered_names = json.loads(ordered_names)

    user = frappe.session.user
    owned = {
        r["name"]
        for r in frappe.get_all("Dock Bookmark", filters={"user": user}, fields=["name"])
    }
    for name in ordered_names:
        if name not in owned:
            frappe.throw(frappe._("Permission denied"), frappe.PermissionError)

    for i, name in enumerate(ordered_names):
        frappe.db.set_value("Dock Bookmark", name, "sort_order", i, update_modified=False)
