# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

"""
Bridge Registry API — unified dashboard for cross-app integration bridges.

Domain apps (Watch, Orga, Micro, etc.) register their Frappe/ERPNext bridges
via the ``dock_bridges`` hook. Dock discovers them at boot and provides this
API so the Integrations dashboard can show live status and trigger syncs.

Bridge *logic* stays in the declaring app. Dock only proxies calls to the
app's declared ``status_endpoint`` and ``sync_endpoint``.
"""

import frappe
from frappe import _

from dock.boot import _get_bridges


# ── Public API ───────────────────────────────────────────────────────────────


@frappe.whitelist()
def get_bridges() -> list:
    """Returns all registered bridges with target installation status."""
    return _get_bridges()


@frappe.whitelist()
def get_bridge_status(app: str, source_doctype: str) -> dict:
    """
    Proxy to an app's declared ``status_endpoint``.

    Returns the app's status dict (shape varies per app, typically includes
    ``active``, ``unsynced_count``, ``last_sync``, ``last_error``).

    Returns ``{"active": False, "reason": "..."}`` if the bridge or endpoint
    is not found.
    """
    bridge = _find_bridge(app, source_doctype)
    if not bridge:
        return {"active": False, "reason": _("Bridge not registered")}

    endpoint = bridge.get("status_endpoint")
    if not endpoint:
        return {"active": False, "reason": _("No status endpoint declared")}

    if not bridge.get("target_installed"):
        return {"active": False, "reason": _("{0} is not installed").format(bridge["target_app"])}

    try:
        return frappe.call(endpoint) or {"active": False}
    except Exception as e:
        frappe.log_error(
            f"dock: bridge status call failed for {app}/{source_doctype}: {e}",
            "Dock Bridge Status",
        )
        return {"active": False, "reason": str(e)}


@frappe.whitelist()
def trigger_sync(app: str, source_doctype: str) -> dict:
    """
    Proxy to an app's declared ``sync_endpoint``.

    Requires System Manager role. Returns the app's sync result dict.
    """
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        frappe.throw(_("Only System Manager can trigger bridge sync"), frappe.PermissionError)

    bridge = _find_bridge(app, source_doctype)
    if not bridge:
        return {"success": False, "message": _("Bridge not registered")}

    endpoint = bridge.get("sync_endpoint")
    if not endpoint:
        return {"success": False, "message": _("No sync endpoint declared")}

    if not bridge.get("target_installed"):
        return {"success": False, "message": _("{0} is not installed").format(bridge["target_app"])}

    try:
        result = frappe.call(endpoint)
        return result if isinstance(result, dict) else {"success": True}
    except Exception as e:
        frappe.log_error(
            f"dock: bridge sync call failed for {app}/{source_doctype}: {e}",
            "Dock Bridge Sync",
        )
        return {"success": False, "message": str(e)}


@frappe.whitelist()
def get_sync_log(app: str = None, limit: int = 20) -> list:
    """
    Returns recent Dock Sync Log entries.

    Requires System Manager role. Returns ``[]`` if the DocType does not
    exist yet (Phase B not deployed).
    """
    if "System Manager" not in frappe.get_roles(frappe.session.user):
        frappe.throw(_("Only System Manager can view sync logs"), frappe.PermissionError)

    if not frappe.db.exists("DocType", "Dock Sync Log"):
        return []

    filters = {}
    if app:
        filters["app"] = app

    limit = min(int(limit), 100)

    return frappe.get_all(
        "Dock Sync Log",
        filters=filters,
        fields=[
            "name", "app", "source_doctype", "source_name",
            "target_app", "target_doctype", "target_name",
            "status", "error_message", "creation", "synced_by",
        ],
        order_by="creation desc",
        limit=limit,
    )


# ── Helpers ──────────────────────────────────────────────────────────────────


def _find_bridge(app: str, source_doctype: str) -> dict | None:
    """Look up a specific bridge registration by app + source_doctype."""
    for bridge in _get_bridges():
        if bridge["app"] == app and bridge["source_doctype"] == source_doctype:
            return bridge
    return None
