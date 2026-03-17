# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe


@frappe.whitelist()
def get_events(start: str, end: str, sources: list = None) -> list:
    """
    Returns Dock Events for the current user whose start_datetime falls in [start, end].
    start / end: ISO datetime strings, e.g. "2026-03-01 00:00:00"
    sources: optional list of source_app values to pre-filter (URL param support).
             Client-side toggle filtering is done in the frontend — do not pass hidden apps here.
    """
    filters = {
        "user": frappe.session.user,
        "start_datetime": ["between", [start, end]],
    }
    if sources:
        filters["source_app"] = ["in", sources]

    return frappe.get_all(
        "Dock Event",
        filters=filters,
        fields=[
            "name", "title", "start_datetime", "end_datetime",
            "all_day", "event_type", "color", "url",
            "source_app", "source_doctype", "source_name", "description",
        ],
        order_by="start_datetime asc",
    )


@frappe.whitelist()
def create_event(
    title: str,
    start_datetime: str,
    end_datetime: str = None,
    all_day: int = 0,
    event_type: str = "Meeting",
    description: str = None,
    color: str = None,
) -> dict:
    """
    Creates a native Dock Event (source_app = 'dock').
    Called from DockCreateEventModal.
    """
    doc = frappe.get_doc({
        "doctype": "Dock Event",
        "title": title,
        "start_datetime": start_datetime,
        "end_datetime": end_datetime or None,
        "all_day": int(all_day),
        "event_type": event_type,
        "description": description or None,
        "color": color or None,
        "source_app": "dock",
        "source_doctype": "Dock Event",
        "source_name": "pending",
        "url": "",
        "user": frappe.session.user,
    })
    doc.flags.ignore_permissions = True
    doc.flags.ignore_mandatory = True
    doc.insert(ignore_permissions=True, ignore_mandatory=True)
    # Back-fill source_name with the auto-assigned name
    frappe.db.set_value("Dock Event", doc.name, "source_name", doc.name, update_modified=False)
    doc.source_name = doc.name
    return doc.as_dict()


@frappe.whitelist()
def delete_event(name: str) -> dict:
    """
    Deletes a native Dock Event (source_app = 'dock' only).
    Other events are read-only mirrors — users must delete from the source app.
    """
    doc = frappe.get_doc("Dock Event", name)
    if doc.source_app != "dock":
        frappe.throw(frappe._("Only native Dock events can be deleted here."))
    if doc.user != frappe.session.user:
        frappe.throw(frappe._("You can only delete your own events."))
    doc.delete(ignore_permissions=True)
    return {"deleted": name}


@frappe.whitelist()
def get_calendar_sources() -> list:
    """
    Returns apps that declare dock_calendar_sources, merged with dock_app_registry
    color and label for sidebar rendering.
    Each item: { app, label, color, event_label, create_route_template }
    """
    registered = {}
    for app in frappe.get_installed_apps():
        reg = frappe.get_hooks("dock_app_registry", app_name=app)
        if not reg:
            continue
        entry = reg if isinstance(reg, dict) else reg[0]
        registered[app] = {k: v[0] if isinstance(v, list) and len(v) == 1 else v for k, v in entry.items()}

    sources = []
    for app in frappe.get_installed_apps():
        decl = frappe.get_hooks("dock_calendar_sources", app_name=app)
        if decl:
            reg = registered.get(app, {})
            sources.append({
                "app": app,
                "label": reg.get("label", app),
                "color": reg.get("color", "#6b7280"),
                "event_label": decl[0].get("event_label", "Event"),
                "create_route_template": decl[0].get("create_route_template"),
            })
    return sources
