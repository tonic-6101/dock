# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import json
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
            "all_day", "event_type", "color", "url", "status",
            "location", "meeting_url",
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
    location: str = None,
    meeting_url: str = None,
    attendees: str = None,
) -> dict:
    """
    Creates a native Dock Event (source_app = 'dock') with optional attendees.
    attendees: JSON string of [{user, required}]
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
        "location": location or None,
        "meeting_url": meeting_url or None,
        "status": "Scheduled",
        "source_app": "dock",
        "source_doctype": "Dock Event",
        "source_name": "pending",
        "url": "",
        "user": frappe.session.user,
    })

    # Parse and add attendees
    att_list = _parse_attendees(attendees)
    for att in att_list:
        doc.append("attendees", {
            "user": att["user"],
            "required": att.get("required", 1),
            "rsvp_status": "Pending",
        })

    doc.flags.ignore_permissions = True
    doc.flags.ignore_mandatory = True
    doc.insert(ignore_permissions=True, ignore_mandatory=True)

    # Back-fill source_name with the auto-assigned name
    frappe.db.set_value("Dock Event", doc.name, "source_name", doc.name, update_modified=False)
    doc.source_name = doc.name

    return doc.as_dict()


@frappe.whitelist()
def update_event(name: str, **fields) -> dict:
    """
    Updates a native Dock Event (source_app = 'dock' only).
    Sourced events are read-only — edit in the source app.
    """
    doc = frappe.get_doc("Dock Event", name)
    if doc.source_app != "dock":
        frappe.throw(frappe._("Sourced events can only be edited in the source app."))
    if doc.user != frappe.session.user:
        frappe.throw(frappe._("You can only edit your own events."))

    # Remove internal keys from fields
    fields.pop("cmd", None)
    fields.pop("name", None)

    editable = ["title", "start_datetime", "end_datetime", "all_day",
                "event_type", "description", "location", "meeting_url",
                "status", "color"]

    for key in editable:
        if key in fields:
            doc.set(key, fields[key])

    # Update attendees if provided
    if "attendees" in fields:
        doc.set("attendees", [])
        att_list = _parse_attendees(fields["attendees"])
        for att in att_list:
            doc.append("attendees", {
                "user": att["user"],
                "required": att.get("required", 1),
                "rsvp_status": att.get("rsvp_status", "Pending"),
            })

    doc.save(ignore_permissions=True)
    return doc.as_dict()


@frappe.whitelist()
def update_rsvp(event_name: str, status: str) -> dict:
    """
    Updates current user's RSVP status for an event.
    status: Accepted / Declined / Tentative
    """
    if status not in ("Accepted", "Declined", "Tentative"):
        frappe.throw(frappe._("Invalid RSVP status"))

    doc = frappe.get_doc("Dock Event", event_name)

    # Find current user in attendees
    updated = False
    for att in doc.get("attendees") or []:
        if att.user == frappe.session.user:
            att.rsvp_status = status
            updated = True
            break

    if not updated:
        frappe.throw(frappe._("You are not an attendee of this event."))

    doc.save(ignore_permissions=True)
    return {"event": event_name, "status": status}


@frappe.whitelist()
def update_status(event_name: str, status: str) -> dict:
    """
    Updates event status (Scheduled / Completed / Cancelled).
    Only native events or event owner can change status.
    """
    if status not in ("Scheduled", "Completed", "Cancelled"):
        frappe.throw(frappe._("Invalid status"))

    doc = frappe.get_doc("Dock Event", event_name)
    if doc.user != frappe.session.user:
        frappe.throw(frappe._("You can only change status of your own events."))

    doc.status = status
    doc.save(ignore_permissions=True)
    return {"event": event_name, "status": status}


@frappe.whitelist()
def get_event_detail(name: str) -> dict:
    """
    Returns full event details including attendees and app context panels.
    """
    doc = frappe.get_doc("Dock Event", name)
    if doc.user != frappe.session.user:
        frappe.throw(frappe._("You can only view your own events."))

    result = doc.as_dict()

    # Fetch context panels from all apps
    result["context_panels"] = _get_event_context(name)

    return result


@frappe.whitelist()
def get_event_context(event_name: str) -> list:
    """
    Returns app-contributed context panels for an event.
    Calls dock_calendar_context hook from all installed apps.
    """
    return _get_event_context(event_name)


def _get_event_context(event_name: str) -> list:
    """Internal: collect context panels from all apps."""
    panels = []
    for app in frappe.get_installed_apps():
        hook = frappe.get_hooks("dock_calendar_context", app_name=app)
        if not hook:
            continue
        try:
            result = frappe.get_attr(hook[0])(event_name)
            if result and result.get("panels"):
                panels.extend(result["panels"])
        except Exception:
            frappe.log_error(f"dock_calendar_context failed for app {app}")
    return panels


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


def _parse_attendees(attendees) -> list:
    """Parse attendees from JSON string or list."""
    if not attendees:
        return []
    if isinstance(attendees, str):
        try:
            return json.loads(attendees)
        except (json.JSONDecodeError, TypeError):
            return []
    if isinstance(attendees, list):
        return attendees
    return []
