# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

"""
Scheduled job to send event reminders.

Runs every 15 minutes via scheduler_events in hooks.py.
Finds Dock Events where:
- send_reminder = 1
- reminder_sent = 0
- status = Scheduled
- start_datetime - reminder_minutes <= now
"""

import frappe
from frappe import _
from frappe.utils import now_datetime, add_to_date, get_datetime


def send_event_reminders():
    """Main scheduled job function. Finds due reminders and sends emails."""
    try:
        events = _get_events_needing_reminder()
        for event in events:
            try:
                _send_reminder_for_event(event)
                _mark_reminder_sent(event.name)
                frappe.db.commit()
            except Exception as e:
                frappe.log_error(
                    message=f"Failed to send reminder for {event.name}: {e}",
                    title="Dock Event Reminder Error",
                )
                frappe.db.rollback()
    except Exception as e:
        frappe.log_error(
            message=f"Event reminder job failed: {e}",
            title="Dock Event Reminder Job Error",
        )


def _get_events_needing_reminder():
    """Find events that need reminders sent now."""
    current_time = now_datetime()

    events = frappe.get_all(
        "Dock Event",
        filters={
            "send_reminder": 1,
            "reminder_sent": 0,
            "status": "Scheduled",
        },
        fields=[
            "name", "title", "event_type", "start_datetime",
            "end_datetime", "location", "meeting_url", "reminder_minutes",
            "description", "organizer", "user",
        ],
    )

    due = []
    for evt in events:
        minutes = evt.reminder_minutes or 60
        reminder_time = add_to_date(get_datetime(evt.start_datetime), minutes=-minutes)
        if get_datetime(reminder_time) <= current_time:
            due.append(evt)

    return due


def _send_reminder_for_event(event):
    """Send reminder email to all non-declined attendees of an event."""
    from dock.email.calendar_invite import send_reminder_email

    attendees = frappe.get_all(
        "Dock Event Attendee",
        filters={"parent": event.name},
        fields=["user", "rsvp_status"],
    )

    if not attendees:
        return

    start_dt = get_datetime(event.start_datetime)
    formatted_date = start_dt.strftime("%A, %B %d, %Y")
    formatted_time = start_dt.strftime("%I:%M %p")

    for att in attendees:
        if att.rsvp_status == "Declined":
            continue

        user_info = frappe.db.get_value("User", att.user, ["full_name", "email"], as_dict=True)
        if not user_info or not user_info.email:
            continue

        try:
            send_reminder_email(
                recipient=user_info.email,
                recipient_name=user_info.full_name or att.user,
                event=event,
                formatted_date=formatted_date,
                formatted_time=formatted_time,
            )
        except Exception as e:
            frappe.log_error(
                message=f"Failed to send reminder to {user_info.email}: {e}",
                title="Dock Event Reminder Email Error",
            )


def _mark_reminder_sent(event_name):
    """Mark an event's reminder as sent."""
    frappe.db.set_value("Dock Event", event_name, "reminder_sent", 1)


@frappe.whitelist()
def trigger_reminders():
    """Manually trigger the reminder job (for testing)."""
    if not frappe.has_permission("Dock Event", "write"):
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    events = _get_events_needing_reminder()
    sent_count = 0

    for event in events:
        try:
            _send_reminder_for_event(event)
            _mark_reminder_sent(event.name)
            frappe.db.commit()
            sent_count += 1
        except Exception as e:
            frappe.log_error(
                message=f"Failed to send reminder for {event.name}: {e}",
                title="Dock Event Reminder Error",
            )

    return {"success": True, "found": len(events), "sent": sent_count}
