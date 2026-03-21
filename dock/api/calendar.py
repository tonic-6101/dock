# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import json
import frappe
from frappe import _
from frappe.utils import get_datetime, add_to_date


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
    send_reminder: int = 0,
    reminder_minutes: int = 60,
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
        "send_reminder": int(send_reminder),
        "reminder_minutes": int(reminder_minutes),
        "organizer": frappe.session.user,
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
                "status", "color", "send_reminder", "reminder_minutes"]

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


# ---------------------------------------------------------------------------
# Attendee management
# ---------------------------------------------------------------------------


@frappe.whitelist()
def add_attendee(event_name: str, user: str, required: int = 1) -> dict:
    """Add an attendee to an event. Only event owner can add attendees."""
    doc = frappe.get_doc("Dock Event", event_name)
    if doc.user != frappe.session.user:
        frappe.throw(_("You can only manage attendees on your own events."))

    # Check if already an attendee
    for att in doc.get("attendees") or []:
        if att.user == user:
            frappe.throw(_("{0} is already an attendee.").format(user))

    doc.append("attendees", {
        "user": user,
        "required": int(required),
        "rsvp_status": "Pending",
    })
    doc.save(ignore_permissions=True)
    return doc.as_dict()


@frappe.whitelist()
def remove_attendee(event_name: str, user: str) -> dict:
    """Remove an attendee from an event. Only event owner can remove attendees."""
    doc = frappe.get_doc("Dock Event", event_name)
    if doc.user != frappe.session.user:
        frappe.throw(_("You can only manage attendees on your own events."))

    original_len = len(doc.get("attendees") or [])
    doc.attendees = [a for a in doc.attendees if a.user != user]

    if len(doc.attendees) == original_len:
        frappe.throw(_("{0} is not an attendee.").format(user))

    doc.save(ignore_permissions=True)
    return {"success": True}


# ---------------------------------------------------------------------------
# Enhanced RSVP
# ---------------------------------------------------------------------------


@frappe.whitelist()
def update_rsvp_enhanced(event_name: str, status: str, note: str = None) -> dict:
    """
    Update RSVP status for current user with optional response note.
    Returns updated stats and attendee list.
    """
    valid = ("Pending", "Accepted", "Declined", "Tentative")
    if status not in valid:
        frappe.throw(_("Invalid status. Must be one of: {0}").format(", ".join(valid)))

    doc = frappe.get_doc("Dock Event", event_name)

    attendee = None
    old_status = None
    for att in doc.get("attendees") or []:
        if att.user == frappe.session.user:
            attendee = att
            old_status = att.rsvp_status
            break

    if not attendee:
        frappe.throw(_("You are not an attendee of this event."))

    attendee.rsvp_status = status
    if note:
        attendee.notes = note

    # Clear proposed times if accepting
    if status == "Accepted":
        attendee.proposed_start = None
        attendee.proposed_end = None

    doc.save(ignore_permissions=True)

    # Notify organizer of change
    if old_status != status and doc.organizer and doc.organizer != frappe.session.user:
        _notify_rsvp_change(doc, old_status, status)

    return {
        "status": status,
        "attendee_stats": _get_attendee_stats(doc),
        "attendees": _get_attendee_list(doc),
    }


@frappe.whitelist()
def propose_new_time(
    event_name: str,
    proposed_start: str,
    proposed_end: str,
    note: str = None,
) -> dict:
    """Propose an alternative time for an event. Sets RSVP to Tentative."""
    if not proposed_start or not proposed_end:
        frappe.throw(_("Both proposed start and end times are required."))

    doc = frappe.get_doc("Dock Event", event_name)

    attendee = None
    for att in doc.get("attendees") or []:
        if att.user == frappe.session.user:
            attendee = att
            break

    if not attendee:
        frappe.throw(_("You are not an attendee of this event."))

    attendee.rsvp_status = "Tentative"
    attendee.proposed_start = proposed_start
    attendee.proposed_end = proposed_end
    if note:
        attendee.notes = note

    doc.save(ignore_permissions=True)

    # Notify organizer
    if doc.organizer and doc.organizer != frappe.session.user:
        _notify_time_proposal(doc, proposed_start, proposed_end)

    return {
        "status": "Tentative",
        "proposed_start": proposed_start,
        "proposed_end": proposed_end,
        "attendee_stats": _get_attendee_stats(doc),
    }


@frappe.whitelist()
def get_event_rsvp_info(event_name: str) -> dict:
    """Get RSVP information for an event (for activity cards)."""
    if not frappe.db.exists("Dock Event", event_name):
        return {
            "is_attendee": False,
            "user_rsvp_status": None,
            "attendee_stats": {"total": 0, "accepted": 0, "declined": 0, "tentative": 0, "pending": 0},
            "attendees": [],
        }

    doc = frappe.get_doc("Dock Event", event_name)

    is_attendee = False
    user_rsvp_status = None
    for att in doc.get("attendees") or []:
        if att.user == frappe.session.user:
            is_attendee = True
            user_rsvp_status = att.rsvp_status
            break

    return {
        "is_attendee": is_attendee,
        "user_rsvp_status": user_rsvp_status,
        "attendee_stats": _get_attendee_stats(doc),
        "attendees": _get_attendee_list(doc),
    }


@frappe.whitelist()
def send_invitations(event_name: str) -> dict:
    """
    Send email invitations to all attendees of an event.
    Only event owner/organizer can send invitations.
    """
    doc = frappe.get_doc("Dock Event", event_name)
    if doc.user != frappe.session.user and doc.organizer != frappe.session.user:
        frappe.throw(_("Only the event organizer can send invitations."))

    if not doc.get("attendees"):
        return {"success": True, "sent_count": 0, "failed": []}

    from dock.email.calendar_invite import send_invitation_email

    organizer_name = frappe.db.get_value("User", doc.organizer or doc.user, "full_name") or "Dock"
    start_dt = get_datetime(doc.start_datetime)
    formatted_date = start_dt.strftime("%A, %B %d, %Y")
    formatted_time = start_dt.strftime("%I:%M %p")

    sent_count = 0
    failed = []

    for att in doc.attendees:
        user_info = frappe.db.get_value("User", att.user, ["full_name", "email"], as_dict=True)
        if not user_info or not user_info.email:
            failed.append({"user": att.user, "reason": "No email address"})
            continue

        try:
            send_invitation_email(
                recipient=user_info.email,
                recipient_name=user_info.full_name or att.user,
                event=doc,
                organizer_name=organizer_name,
                formatted_date=formatted_date,
                formatted_time=formatted_time,
                is_required=att.required,
            )
            sent_count += 1
        except Exception as e:
            failed.append({"user": att.user, "reason": str(e)})
            frappe.log_error(
                message=f"Failed to send invitation to {user_info.email}: {e}",
                title="Dock Calendar Invitation Error",
            )

    return {"success": True, "sent_count": sent_count, "failed": failed}


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------


def _get_attendee_stats(doc) -> dict:
    """Get RSVP statistics for an event."""
    stats = {"total": 0, "accepted": 0, "declined": 0, "tentative": 0, "pending": 0}
    for att in doc.get("attendees") or []:
        stats["total"] += 1
        key = (att.rsvp_status or "Pending").lower()
        if key in stats:
            stats[key] += 1
    return stats


def _get_attendee_list(doc) -> list:
    """Get list of attendees with user info."""
    attendees = []
    for att in doc.get("attendees") or []:
        user_info = frappe.db.get_value(
            "User", att.user, ["full_name", "user_image"], as_dict=True
        )
        attendees.append({
            "user": att.user,
            "name": (user_info.get("full_name") if user_info else None) or att.user,
            "user_image": user_info.get("user_image") if user_info else None,
            "rsvp_status": att.rsvp_status or "Pending",
            "required": att.required,
            "notes": att.get("notes"),
            "proposed_start": str(att.proposed_start) if att.get("proposed_start") else None,
            "proposed_end": str(att.proposed_end) if att.get("proposed_end") else None,
        })
    return attendees


def _notify_rsvp_change(doc, old_status: str, new_status: str):
    """Send realtime notification when RSVP changes."""
    try:
        user_fullname = frappe.db.get_value("User", frappe.session.user, "full_name") or frappe.session.user
        frappe.publish_realtime(
            "dock_rsvp_updated",
            {
                "event": doc.name,
                "event_title": doc.title,
                "from_user": frappe.session.user,
                "from_user_fullname": user_fullname,
                "old_status": old_status,
                "new_status": new_status,
            },
            user=doc.organizer,
        )
    except Exception as e:
        frappe.log_error(f"RSVP notification failed: {e}", "Dock Calendar")


def _notify_time_proposal(doc, proposed_start: str, proposed_end: str):
    """Send realtime notification when time is proposed."""
    try:
        user_fullname = frappe.db.get_value("User", frappe.session.user, "full_name") or frappe.session.user
        frappe.publish_realtime(
            "dock_time_proposed",
            {
                "event": doc.name,
                "event_title": doc.title,
                "from_user": frappe.session.user,
                "from_user_fullname": user_fullname,
                "proposed_start": proposed_start,
                "proposed_end": proposed_end,
            },
            user=doc.organizer,
        )
    except Exception as e:
        frappe.log_error(f"Time proposal notification failed: {e}", "Dock Calendar")


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
