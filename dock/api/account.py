# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe import _


@frappe.whitelist()
def get_account() -> dict:
    """Return current user's account details for the My Account page."""
    user = frappe.session.user
    doc = frappe.get_doc("User", user)

    # 2FA status
    twofactor_enabled = False
    twofactor_site_enabled = bool(
        frappe.db.get_single_value("System Settings", "enable_two_factor_auth")
    )
    if twofactor_site_enabled and doc.two_factor_method:
        twofactor_enabled = True

    return {
        "user": user,
        "first_name": doc.first_name or "",
        "last_name": doc.last_name or "",
        "full_name": doc.full_name or "",
        "user_image": doc.user_image or "",
        "twofactor_enabled": twofactor_enabled,
        "twofactor_site_enabled": twofactor_site_enabled,
    }


@frappe.whitelist()
def update_profile(first_name: str = None, last_name: str = None) -> dict:
    """Update current user's name fields."""
    user = frappe.session.user
    doc = frappe.get_doc("User", user)

    if first_name is not None:
        doc.first_name = first_name.strip()
    if last_name is not None:
        doc.last_name = last_name.strip()

    doc.save(ignore_permissions=True)
    return {"first_name": doc.first_name, "last_name": doc.last_name, "full_name": doc.full_name}


@frappe.whitelist()
def change_password(old_password: str, new_password: str) -> dict:
    """Change current user's password after verifying the old one."""
    from frappe.utils.password import check_password, update_password

    user = frappe.session.user
    try:
        check_password(user, old_password)
    except frappe.AuthenticationError:
        frappe.throw(_("Current password is incorrect"), frappe.AuthenticationError)

    update_password(user, new_password)
    return {"success": True}


@frappe.whitelist()
def get_sessions() -> list[dict]:
    """Return active sessions for the current user."""
    user = frappe.session.user
    current_sid = frappe.session.sid

    sessions = frappe.db.get_all(
        "Sessions",
        filters={"user": user, "status": "Active"},
        fields=["sid", "device", "ip_address", "last_updated"],
        order_by="last_updated desc",
        limit=20,
    )

    result = []
    for s in sessions:
        result.append({
            "sid": s.sid,
            "device": s.get("device") or "",
            "ip_address": _mask_ip(s.get("ip_address") or ""),
            "last_updated": str(s.last_updated) if s.last_updated else "",
            "is_current": s.sid == current_sid,
        })
    return result


@frappe.whitelist()
def revoke_session(sid: str) -> dict:
    """Revoke (delete) a session. Cannot revoke current session."""
    user = frappe.session.user

    if sid == frappe.session.sid:
        frappe.throw(_("Cannot revoke your current session"))

    # Verify the session belongs to this user
    session_user = frappe.db.get_value("Sessions", sid, "user")
    if session_user != user:
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    frappe.db.delete("Sessions", {"sid": sid})
    frappe.db.commit()
    return {"success": True}


@frappe.whitelist()
def remove_user_image() -> dict:
    """Remove the current user's profile image."""
    user = frappe.session.user
    frappe.db.set_value("User", user, "user_image", "")
    return {"success": True}


def _mask_ip(ip: str) -> str:
    """Mask the last octet of an IP for privacy. 192.168.1.100 → 192.168.1.xxx"""
    parts = ip.split(".")
    if len(parts) == 4:
        parts[-1] = "xxx"
        return ".".join(parts)
    return ip
