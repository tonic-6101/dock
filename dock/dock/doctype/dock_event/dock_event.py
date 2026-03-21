# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import get_datetime, time_diff_in_seconds, add_to_date


class DockEvent(Document):
    def validate(self):
        self.validate_dates()
        self.set_organizer()

    def validate_dates(self):
        """Ensure end_datetime >= start_datetime, auto-correct if needed."""
        if self.end_datetime and self.start_datetime:
            start = get_datetime(self.start_datetime)
            end = get_datetime(self.end_datetime)
            if end < start:
                self.end_datetime = add_to_date(self.start_datetime, hours=1)
                frappe.msgprint(
                    _("End time was before start time. Adjusted to 1 hour after start."),
                    indicator="orange",
                    alert=True,
                )

    def set_organizer(self):
        """Set organizer on first save."""
        if not self.organizer:
            self.organizer = frappe.session.user

    def after_insert(self):
        self._log_activity("created", _("Created event: {0}").format(self.title))

    def on_update(self):
        if self.has_value_changed("start_datetime") or self.has_value_changed("end_datetime"):
            self._log_activity("rescheduled", _("Rescheduled event: {0}").format(self.title))
        elif self.has_value_changed("status"):
            self._log_activity(
                "status_changed",
                _("Event '{0}' status changed to {1}").format(self.title, self.status),
            )

    def _log_activity(self, action: str, content: str):
        try:
            frappe.get_doc(
                {
                    "doctype": "Activity Log",
                    "subject": content,
                    "content": content,
                    "reference_doctype": "Dock Event",
                    "reference_name": self.name,
                    "user": frappe.session.user,
                    "full_name": frappe.db.get_value(
                        "User", frappe.session.user, "full_name"
                    ),
                }
            ).insert(ignore_permissions=True)
        except Exception as e:
            frappe.log_error(f"Failed to log event activity: {e}")


def get_permission_query_conditions(user=None):
    if not user:
        user = frappe.session.user
    if "System Manager" in frappe.get_roles(user):
        return None
    return f"`tabDock Event`.`user` = {frappe.db.escape(user)}"


def has_permission(doc, ptype="read", user=None):
    user = user or frappe.session.user
    if "System Manager" in frappe.get_roles(user):
        return True
    if ptype in ("write", "delete", "create"):
        # Domain apps write via ignore_permissions — direct writes are blocked
        return False
    return doc.user == user
