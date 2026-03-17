# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe


def before_uninstall():
    """
    Remove Dock roles from all users, drop the dock_shared custom field, and clear cache.
    Frappe handles DocType + record deletion automatically after this hook runs.
    """
    try:
        for role in ("Dock User", "Dock Manager"):
            if frappe.db.exists("Role", role):
                frappe.db.delete("Has Role", {"role": role})

        # Remove dock_shared custom field from Frappe Contact
        if frappe.db.exists("Custom Field", "Contact-dock_shared"):
            frappe.delete_doc("Custom Field", "Contact-dock_shared", ignore_permissions=True)

        frappe.clear_cache()

    except Exception:
        frappe.log_error(title="Dock Uninstall Error")
        raise
