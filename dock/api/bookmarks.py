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

    # Use raw SQL for the existence check — frappe.db.get_value filters on the 'doctype'
    # column conflict with Frappe's internal meta attribute of the same name.
    existing = frappe.db.sql(
        "SELECT name FROM `tabDock Bookmark` WHERE user=%s AND app=%s AND doctype=%s AND docname=%s LIMIT 1",
        (user, app, doctype, docname),
    )
    if existing:
        return existing[0][0]

    count = frappe.db.count("Dock Bookmark", {"user": user})
    if count >= _MAX_BOOKMARKS:
        frappe.throw(
            frappe._("You can have a maximum of {0} bookmarks").format(_MAX_BOOKMARKS),
            frappe.ValidationError,
        )

    # Use frappe.new_doc + db.set_value to work around the 'doctype' fieldname conflict:
    # a dict literal with two "doctype" keys passes the bookmarked doctype as the meta
    # type, causing frappe.get_doc to create the wrong document type entirely.
    doc = frappe.new_doc("Dock Bookmark")
    doc.user = user
    doc.app = app
    doc.docname = docname
    doc.label = label
    doc.icon = icon or ""
    doc.sort_order = count
    doc.insert(ignore_permissions=True)
    frappe.db.set_value("Dock Bookmark", doc.name, "doctype", doctype, update_modified=False)
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
