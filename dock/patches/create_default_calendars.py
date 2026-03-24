# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

"""
Post-model-sync patch: Create default calendars for existing users
and assign existing native Dock Events to those calendars.
"""

import frappe
from frappe import _
from dock.dock.doctype.dock_calendar.dock_calendar import CALENDAR_COLORS


def execute():
    # Find all users who have native Dock Events (source_app = 'dock')
    users = frappe.db.sql_list(
        "SELECT DISTINCT user FROM `tabDock Event` WHERE source_app = 'dock' AND (calendar IS NULL OR calendar = '')"
    )

    if not users:
        return

    for user in users:
        # Check if user already has a calendar
        existing = frappe.db.get_value(
            "Dock Calendar",
            {"owner_user": user},
            "name",
        )
        if existing:
            # Assign orphan events to existing calendar
            frappe.db.sql(
                "UPDATE `tabDock Event` SET calendar = %s WHERE user = %s AND source_app = 'dock' AND (calendar IS NULL OR calendar = '')",
                (existing, user),
            )
            continue

        # Create default calendar for this user
        cal = frappe.get_doc({
            "doctype": "Dock Calendar",
            "title": _("My Calendar"),
            "color": CALENDAR_COLORS[0],
            "owner_user": user,
            "is_default": 1,
        })
        cal.flags.ignore_permissions = True
        cal.insert(ignore_permissions=True)

        # Assign all native events to this calendar
        frappe.db.sql(
            "UPDATE `tabDock Event` SET calendar = %s WHERE user = %s AND source_app = 'dock' AND (calendar IS NULL OR calendar = '')",
            (cal.name, user),
        )

    frappe.db.commit()
