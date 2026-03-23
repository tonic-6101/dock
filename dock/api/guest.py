# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import secrets
import frappe
from frappe import _


def _generate_token() -> str:
    """32-char URL-safe random string, prefixed dgs_."""
    return "dgs_" + secrets.token_urlsafe(24)


def _token_is_valid(session) -> tuple[bool, str]:
    """Returns (valid, reason). reason is one of: expired, revoked, ok."""
    if not session.is_active:
        return False, "revoked"
    if session.expires_at and frappe.utils.now_datetime() > session.expires_at:
        return False, "expired"
    return True, "ok"


@frappe.whitelist()
def create_session(
    view_id: str,
    source_app: str,
    source_doctype: str,
    source_name: str,
    label: str,
    expires_in_days: int = None,
) -> dict:
    """
    Create a Dock Guest Session for any logged-in user.
    expires_in_days=None uses Dock Settings.guest_session_default_expiry_days.
    0 = no expiry.
    Returns { session_name, token, url, expires_at }.
    """
    if expires_in_days is None:
        expires_in_days = int(
            frappe.db.get_single_value("Dock Settings", "guest_session_default_expiry_days") or 0
        )

    expires_at = None
    if expires_in_days and int(expires_in_days) > 0:
        expires_at = frappe.utils.add_days(frappe.utils.now_datetime(), int(expires_in_days))

    token = _generate_token()

    doc = frappe.get_doc({
        "doctype": "Dock Guest Session",
        "token": token,
        "view_id": view_id,
        "source_app": source_app,
        "source_doctype": source_doctype,
        "source_name": source_name,
        "label": label,
        "created_by": frappe.session.user,
        "is_active": 1,
        "expires_at": expires_at,
    })
    doc.insert(ignore_permissions=True)

    site_url = frappe.utils.get_url()
    url = f"{site_url}/dock/guest/{token}"

    return {
        "session_name": doc.name,
        "token": token,
        "url": url,
        "expires_at": str(expires_at) if expires_at else None,
    }


@frappe.whitelist(allow_guest=True)
def validate_token(token: str) -> dict:
    """
    Validate a guest token. No Frappe auth required.
    Returns { valid: True, session_name, view_id, source_doctype, source_name, label } on success.
    Returns { valid: False, reason: "expired" | "revoked" | "not_found" } on failure.
    Does NOT log activity — caller is responsible.
    """
    session_name = frappe.db.get_value("Dock Guest Session", {"token": token}, "name")
    if not session_name:
        return {"valid": False, "reason": "not_found"}

    session = frappe.get_doc("Dock Guest Session", session_name)
    valid, reason = _token_is_valid(session)
    if not valid:
        return {"valid": False, "reason": reason}

    return {
        "valid": True,
        "session_name": session.name,
        "view_id": session.view_id,
        "source_doctype": session.source_doctype,
        "source_name": session.source_name,
        "label": session.label,
    }


@frappe.whitelist()
def revoke_session(session_name: str) -> dict:
    """
    Revoke a session (sets is_active=0). Token immediately invalid.
    Caller must be session creator (created_by) or Dock Manager.
    """
    session = frappe.get_doc("Dock Guest Session", session_name)
    roles = frappe.get_roles()
    if session.created_by != frappe.session.user and "Dock Manager" not in roles:
        frappe.throw(
            _("Only the session creator or a Dock Manager can revoke sessions"),
            frappe.PermissionError,
        )
    frappe.db.set_value("Dock Guest Session", session_name, "is_active", 0)
    return {"revoked": True}


@frappe.whitelist()
def get_sessions(
    limit: int = 50,
    offset: int = 0,
    source_doctype: str = None,
    source_name: str = None,
) -> dict:
    """
    List guest sessions.
    Dock Manager sees all; regular users see only their own (created_by = session user).
    """
    roles = frappe.get_roles()
    filters = {}
    if "System Manager" not in roles and "Dock Manager" not in roles:
        filters["created_by"] = frappe.session.user
    if source_doctype:
        filters["source_doctype"] = source_doctype
    if source_name:
        filters["source_name"] = source_name

    items = frappe.get_all(
        "Dock Guest Session",
        filters=filters,
        fields=["name", "token", "label", "view_id", "source_app", "source_doctype",
                "source_name", "is_active", "expires_at", "last_accessed_at", "created_by"],
        order_by="creation desc",
        limit=int(limit),
        start=int(offset),
    )
    total = frappe.db.count("Dock Guest Session", filters)
    return {"items": items, "total": total}


@frappe.whitelist(allow_guest=True)
def log_activity(
    token: str,
    event_type: str = "viewed",
    view_id: str = None,
    metadata: dict = None,
) -> None:
    """
    Log a Dock Guest Activity. No Frappe auth required.
    Silently ignores invalid/revoked tokens.
    Updates Dock Guest Session.last_accessed_at on each call.
    Logs ip_address and user_agent from request context.
    """
    session_name = frappe.db.get_value("Dock Guest Session", {"token": token}, "name")
    if not session_name:
        return

    session = frappe.get_doc("Dock Guest Session", session_name)
    valid, _ = _token_is_valid(session)
    if not valid:
        return

    ip_address = frappe.local.request.remote_addr if frappe.local.request else None
    user_agent = None
    if frappe.local.request:
        ua = frappe.local.request.headers.get("User-Agent", "")
        user_agent = ua[:500] if ua else None

    import json
    metadata_str = json.dumps(metadata) if metadata else None

    frappe.get_doc({
        "doctype": "Dock Guest Activity",
        "session": session_name,
        "event_type": event_type,
        "view_id": view_id or session.view_id,
        "timestamp": frappe.utils.now_datetime(),
        "ip_address": ip_address,
        "user_agent": user_agent,
        "metadata": metadata_str,
    }).insert(ignore_permissions=True)

    frappe.db.set_value(
        "Dock Guest Session",
        session_name,
        "last_accessed_at",
        frappe.utils.now_datetime(),
        update_modified=False,
    )
