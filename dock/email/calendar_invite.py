# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

"""
Generic calendar invitation and reminder email templates.

These are ecosystem-branded (not app-specific). Domain apps can customise
invitation content in the future via a ``dock_calendar_invitation_context``
hook if needed.
"""

import frappe
from frappe import _
from frappe.utils import get_datetime


def send_invitation_email(
    recipient: str,
    recipient_name: str,
    event,
    organizer_name: str,
    formatted_date: str,
    formatted_time: str,
    is_required: bool = True,
):
    """Send a calendar invitation email to a single attendee."""
    subject = _("Invitation: {0} — {1} at {2}").format(
        event.title, formatted_date, formatted_time
    )

    attendance_type = _("Required") if is_required else _("Optional")

    location_info = ""
    if event.get("location"):
        location_info = f"<p><strong>{_('Location')}:</strong> {event.location}</p>"
    if event.get("meeting_url"):
        location_info += (
            f'<p><strong>{_("Meeting Link")}:</strong> '
            f'<a href="{event.meeting_url}">{event.meeting_url}</a></p>'
        )

    description_info = ""
    if event.get("description"):
        description_info = (
            f"<hr><p><strong>{_('Details')}:</strong></p>"
            f"<div>{event.description}</div>"
        )

    end_time_info = ""
    if event.get("end_datetime"):
        end_dt = get_datetime(event.end_datetime)
        end_time_info = f" — {end_dt.strftime('%I:%M %p')}"

    message = f"""
    <p>{_("Hello {0}").format(recipient_name)},</p>

    <p>{_("You have been invited to the following event")}:</p>

    <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #6366f1;">
        <h3 style="margin: 0 0 12px 0; color: #333;">{event.title}</h3>
        <p style="margin: 4px 0;"><strong>{_("Type")}:</strong> {event.get("event_type") or "Event"}</p>
        <p style="margin: 4px 0;"><strong>{_("Date")}:</strong> {formatted_date}</p>
        <p style="margin: 4px 0;"><strong>{_("Time")}:</strong> {formatted_time}{end_time_info}</p>
        <p style="margin: 4px 0;"><strong>{_("Organizer")}:</strong> {organizer_name}</p>
        <p style="margin: 4px 0;"><strong>{_("Your attendance")}:</strong> <span style="color: {'#dc2626' if is_required else '#6b7280'};">{attendance_type}</span></p>
        {location_info}
    </div>

    {description_info}

    <p style="margin-top: 20px;">{_("Please respond to this invitation in the calendar")}.</p>

    <p>{_("Best regards")},<br>Dock</p>
    """

    frappe.sendmail(
        recipients=[recipient],
        subject=subject,
        message=message,
        now=True,
    )


def send_reminder_email(
    recipient: str,
    recipient_name: str,
    event,
    formatted_date: str,
    formatted_time: str,
):
    """Send a reminder email to a single attendee."""
    subject = _("Reminder: {0} — {1} at {2}").format(
        event.title, formatted_date, formatted_time
    )

    location_info = ""
    if event.get("location"):
        location_info = f"<p><strong>{_('Location')}:</strong> {event.location}</p>"
    if event.get("meeting_url"):
        location_info += (
            f'<p><strong>{_("Meeting Link")}:</strong> '
            f'<a href="{event.meeting_url}">{event.meeting_url}</a></p>'
        )

    description_info = ""
    if event.get("description"):
        description_info = (
            f"<p><strong>{_('Details')}:</strong></p>"
            f"<div>{event.description}</div>"
        )

    message = f"""
    <p>{_("Hello {0}").format(recipient_name)},</p>

    <p>{_("This is a reminder for your upcoming event")}:</p>

    <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <h3 style="margin: 0 0 12px 0; color: #333;">{event.title}</h3>
        <p style="margin: 4px 0;"><strong>{_("Type")}:</strong> {event.get("event_type") or "Event"}</p>
        <p style="margin: 4px 0;"><strong>{_("Date")}:</strong> {formatted_date}</p>
        <p style="margin: 4px 0;"><strong>{_("Time")}:</strong> {formatted_time}</p>
        {location_info}
    </div>

    {description_info}

    <p>{_("Best regards")},<br>Dock</p>
    """

    frappe.sendmail(
        recipients=[recipient],
        subject=subject,
        message=message,
        now=True,
    )
