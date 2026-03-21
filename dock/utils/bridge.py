# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

"""
Shared bridge utilities for ecosystem apps.

Dock is ``required_apps`` for all ecosystem apps, so any app can safely do::

    from dock.utils.bridge import is_app_installed, get_employee_for_user

These helpers eliminate duplicated guard functions, employee lookups, and
sync-status boilerplate across Watch, Orga, Micro, etc. Bridge *logic*
(field mapping, status translation, domain rules) stays in each app.
"""

from __future__ import annotations

import frappe
from frappe.utils import now_datetime


# ── Guards ───────────────────────────────────────────────────────────────────


def is_app_installed(app_name: str) -> bool:
    """Check if a Frappe app is installed. Reads the cached installed-apps list."""
    return app_name in frappe.get_installed_apps()


def is_doctype_available(doctype: str) -> bool:
    """Check if a DocType exists (useful when the owning app is a soft dependency)."""
    return frappe.db.exists("DocType", doctype) is not None


# ── Employee Lookup ──────────────────────────────────────────────────────────


def get_employee_for_user(user: str | None = None) -> str | None:
    """
    Look up an ERPNext Employee by ``user_id``.

    Returns the Employee ``name`` or ``None`` if ERPNext is not installed or
    no Employee record is linked to the given user.

    This is the most-duplicated helper across Watch and Orga bridges —
    centralising it here avoids divergence.
    """
    if not is_app_installed("erpnext"):
        return None
    user = user or frappe.session.user
    return frappe.db.get_value("Employee", {"user_id": user, "status": "Active"}, "name")


# ── Sync Status Helpers ──────────────────────────────────────────────────────


def update_sync_status(doctype: str, name: str, fields: dict) -> None:
    """
    Update sync-tracking fields on a document without bumping ``modified``.

    All bridge implementations need ``update_modified=False`` to avoid
    triggering re-sync loops in ``doc_events`` hooks.

    Example::

        update_sync_status("Watch Entry", entry.name, {
            "erpnext_synced": 1,
            "erpnext_timesheet": ts.name,
        })
    """
    frappe.db.set_value(doctype, name, fields, update_modified=False)


# ── Response Builders ────────────────────────────────────────────────────────


def make_sync_response(
    success: bool,
    message: str = "",
    data: dict | None = None,
) -> dict:
    """
    Build a standardised bridge response dict.

    Normalises the return shape so the Dock Integrations dashboard can
    render status from any app without per-app parsing.
    """
    result: dict = {"success": success, "message": message}
    if data:
        result["data"] = data
    return result


# ── Sync Log ─────────────────────────────────────────────────────────────────


def log_sync_event(
    app: str,
    source_doctype: str,
    source_name: str,
    target_app: str,
    target_doctype: str,
    target_name: str | None = None,
    status: str = "Synced",
    error_message: str | None = None,
) -> str | None:
    """
    Write a ``Dock Sync Log`` entry.

    Silent no-op if the DocType does not exist yet (Phase B not deployed,
    or Dock Sync Log removed in a future version).

    Returns the log document name on success, ``None`` otherwise.
    """
    if not frappe.db.exists("DocType", "Dock Sync Log"):
        return None

    try:
        doc = frappe.new_doc("Dock Sync Log")
        doc.app = app
        doc.source_doctype = source_doctype
        doc.source_name = source_name
        doc.target_app = target_app
        doc.target_doctype = target_doctype
        doc.target_name = target_name
        doc.status = status
        doc.error_message = error_message
        doc.synced_by = frappe.session.user
        doc.insert(ignore_permissions=True)
        return doc.name
    except Exception:
        frappe.log_error(
            f"dock: failed to write Dock Sync Log for {app}/{source_doctype}/{source_name}",
            "Dock Sync Log",
        )
        return None
