# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import json as _json

import frappe
from frappe import _


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
    Validates notification_type against the dock_notification_types hook for from_app.
    Respects per-app muting, per-type muting, and delivery channel preferences.
    Returns the created notification name (or None if skipped).
    """
    # Validate notification_type against the app's declared types
    registered = frappe.get_hooks("dock_notification_types", app_name=from_app)
    valid_types = []
    for entry in registered:
        items = entry if isinstance(entry, list) else [entry]
        for item in items:
            if isinstance(item, dict) and item.get("type"):
                valid_types.append(item["type"])
    if valid_types and notification_type not in valid_types:
        frappe.throw(
            _("Unknown notification_type '{0}' for app '{1}'").format(notification_type, from_app),
            frappe.ValidationError,
        )

    # Single DB read for all notification preferences
    prefs = _get_user_notification_prefs(for_user)

    # App-level mute check
    if from_app in prefs["muted_apps"]:
        return None

    # Per-type mute check
    if notification_type in prefs["muted_types"]:
        return None

    # Determine delivery channel
    channel = prefs["channels"].get(from_app, "both")
    result_name = None

    # Bell notification (bell or both)
    if channel in ("bell", "both"):
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
        result_name = doc.name

        frappe.publish_realtime(
            "dock_notification",
            {
                "name": doc.name,
                "from_app": from_app,
                "notification_type": notification_type,
                "title": title,
                "message": message,
                "action_url": action_url,
                "creation": str(doc.creation),
            },
            user=for_user,
        )

    # Email notification (email or both)
    if channel in ("email", "both"):
        _send_notification_email(for_user, from_app, title, message, action_url)

    return result_name


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
def mark_read(notification_names: str | list) -> None:
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
def delete(notification_names: str | list) -> None:
    """Bulk delete notifications."""
    if isinstance(notification_names, str):
        import json
        notification_names = json.loads(notification_names)

    for name in notification_names:
        frappe.delete_doc("Dock Notification", name, ignore_permissions=True)


def _get_user_notification_prefs(user: str) -> dict:
    """Single DB read for all notification preferences: muted types, muted apps, channels."""
    try:
        raw = frappe.db.get_value(
            "Dock User Preference",
            user,
            ["muted_notification_types", "muted_apps", "app_delivery_channels"],
            as_dict=True,
        )
        if not raw:
            return {"muted_types": [], "muted_apps": [], "channels": {}}
        return {
            "muted_types": _json.loads(raw.muted_notification_types or "[]"),
            "muted_apps": _json.loads(raw.muted_apps or "[]"),
            "channels": _json.loads(raw.app_delivery_channels or "{}"),
        }
    except Exception:
        return {"muted_types": [], "muted_apps": [], "channels": {}}


def _send_notification_email(for_user, from_app, title, message, action_url):
    """Send a notification as email. Queued via frappe.sendmail for non-blocking delivery."""
    user_info = frappe.db.get_value("User", for_user, ["full_name", "email"], as_dict=True)
    if not user_info or not user_info.email:
        return

    body = message or title
    if action_url:
        body += f"\n\n<a href=\"{action_url}\">{_('View')}</a>"

    frappe.sendmail(
        recipients=[user_info.email],
        subject=f"[{from_app.title()}] {title}",
        message=body,
        now=False,
    )
