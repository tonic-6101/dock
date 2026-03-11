# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe


@frappe.whitelist()
def publish(
    for_user: str,
    from_app: str,
    notification_type: str,
    title: str,
    message: str = None,
    reference_doctype: str = None,
    reference_name: str = None,
    action_url: str = None,
) -> str:
    """
    Create a Dock Notification and push a realtime event to the recipient.
    Returns the created notification name.
    """
    doc = frappe.get_doc({
        "doctype": "Dock Notification",
        "for_user": for_user,
        "from_app": from_app,
        "notification_type": notification_type,
        "title": title,
        "message": message,
        "reference_doctype": reference_doctype,
        "reference_name": reference_name,
        "action_url": action_url,
        "read": 0,
    })
    doc.insert(ignore_permissions=True)

    frappe.publish_realtime(
        "dock_notification",
        {
            "name": doc.name,
            "from_app": from_app,
            "notification_type": notification_type,
            "title": title,
            "message": message,
            "action_url": action_url,
        },
        user=for_user,
    )
    return doc.name


@frappe.whitelist()
def get_recent(limit: int = 20) -> list:
    """Returns the last N notifications for the current user (mix of read + unread)."""
    return frappe.get_all(
        "Dock Notification",
        filters={"for_user": frappe.session.user},
        fields=["name", "from_app", "notification_type", "title", "message",
                "action_url", "read", "read_at", "creation"],
        order_by="creation desc",
        limit=int(limit),
    )


@frappe.whitelist()
def get_list(
    limit: int = 50,
    offset: int = 0,
    app: str = None,
    unread_only: bool = False,
) -> dict:
    """Full notification page. Supports pagination and filters."""
    filters = {"for_user": frappe.session.user}
    if app:
        filters["from_app"] = app
    if unread_only:
        filters["read"] = 0

    items = frappe.get_all(
        "Dock Notification",
        filters=filters,
        fields=["name", "from_app", "notification_type", "title", "message",
                "action_url", "read", "read_at", "creation"],
        order_by="creation desc",
        limit=int(limit),
        start=int(offset),
    )
    total = frappe.db.count("Dock Notification", filters)
    return {"items": items, "total": total}


@frappe.whitelist()
def mark_read(notification_names: list) -> None:
    """Mark one or more notifications as read."""
    if isinstance(notification_names, str):
        import json
        notification_names = json.loads(notification_names)

    now = frappe.utils.now()
    for name in notification_names:
        frappe.db.set_value(
            "Dock Notification",
            name,
            {"read": 1, "read_at": now},
            update_modified=False,
        )


@frappe.whitelist()
def mark_all_read(app: str = None) -> None:
    """Mark all unread notifications as read for the current user. Single DB UPDATE."""
    filters = {"for_user": frappe.session.user, "read": 0}
    if app:
        filters["from_app"] = app

    frappe.db.set_value(
        "Dock Notification",
        filters,
        {"read": 1, "read_at": frappe.utils.now()},
        update_modified=False,
    )


@frappe.whitelist()
def delete(notification_names: list) -> None:
    """Bulk delete notifications."""
    if isinstance(notification_names, str):
        import json
        notification_names = json.loads(notification_names)

    for name in notification_names:
        frappe.delete_doc("Dock Notification", name, ignore_permissions=True)
