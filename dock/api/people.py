# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe


def get_people_permission_condition(user: str = None) -> str:
    """
    SQL WHERE condition for People list.
    Shows: contacts the user owns, plus all shared contacts (dock_shared=1).
    """
    user = user or frappe.session.user
    return f"(`tabContact`.`dock_shared` = 1 OR `tabContact`.`owner` = {frappe.db.escape(user)})"


@frappe.whitelist()
def get_list(
    limit: int = 50,
    offset: int = 0,
    query: str = None,
    filter_mine: bool = False,
    filter_shared: bool = False,
) -> dict:
    """
    Paginated contact list respecting the dock_shared permission model.
    filter_mine=True: only contacts owned by the current user.
    filter_shared=True: only contacts with dock_shared=1.
    """
    user = frappe.session.user

    or_filters = []
    if query:
        q = f"%{query.strip()}%"
        or_filters = [
            ["Contact", "full_name", "like", q],
            ["Contact", "email_id", "like", q],
            ["Contact", "phone", "like", q],
        ]

    # Build base filter respecting visibility
    if filter_mine:
        filters = {"owner": user}
    elif filter_shared:
        filters = {"dock_shared": 1}
    else:
        # Default: user's own + shared
        filters = {}

    try:
        items = frappe.get_all(
            "Contact",
            filters=filters,
            or_filters=or_filters if or_filters else None,
            fields=["name", "full_name", "email_id", "phone", "company_name",
                    "image", "dock_shared", "owner"],
            order_by="modified desc",
            limit=int(limit),
            start=int(offset),
        )
        # Apply permission filter manually (dock_shared or own)
        items = [
            c for c in items
            if c.get("dock_shared") or c.get("owner") == user
        ]
        total = len(items)
    except Exception:
        frappe.log_error("dock.api.people.get_list failed")
        return {"items": [], "total": 0}

    return {"items": items, "total": total}


@frappe.whitelist()
def get_contact(contact_name: str) -> dict:
    """Return a single contact's fields."""
    doc = frappe.get_doc("Contact", contact_name)
    user = frappe.session.user
    if not doc.dock_shared and doc.owner != user and "System Manager" not in frappe.get_roles():
        frappe.throw(frappe._("Not permitted"), frappe.PermissionError)

    return {
        "name": doc.name,
        "full_name": doc.full_name,
        "company_name": doc.company_name,
        "designation": doc.designation,
        "image": doc.image,
        "email_ids": [{"email": e.email_id, "is_primary": e.is_primary} for e in doc.email_ids],
        "phone_nos": [{"phone": p.phone, "is_primary": p.is_primary} for p in doc.phone_nos],
        "dock_shared": bool(doc.dock_shared),
        "owner": doc.owner,
    }


@frappe.whitelist()
def get_contact_context(contact_name: str) -> list:
    """
    Returns cross-app context panels for a contact.
    Calls dock_people_context hook for each installed app.
    Errors in individual providers are logged and skipped.
    """
    panels = []
    for app in frappe.get_installed_apps():
        hook = frappe.get_hooks("dock_people_context", app_name=app)
        if not hook:
            continue
        try:
            result = frappe.get_attr(hook[0])(contact_name)
            if result:
                panels.append({"app": app, **result})
        except Exception:
            frappe.log_error(f"dock_people_context failed for app {app}")
    return panels


@frappe.whitelist()
def create_contact(
    full_name: str,
    email: str = None,
    phone: str = None,
    designation: str = None,
    company_name: str = None,
) -> dict:
    """
    Create a Frappe Contact. Owner = session user. dock_shared defaults to 0 (private).
    Returns { name, full_name }.
    """
    doc = frappe.new_doc("Contact")
    doc.full_name = full_name
    doc.company_name = company_name or ""
    doc.designation = designation or ""
    doc.dock_shared = 0

    if email:
        doc.append("email_ids", {"email_id": email, "is_primary": 1})
    if phone:
        doc.append("phone_nos", {"phone": phone, "is_primary": 1})

    doc.insert()
    return {"name": doc.name, "full_name": doc.full_name}


@frappe.whitelist()
def update_shared(contact_name: str, dock_shared: int) -> dict:
    """
    Toggle dock_shared flag on a contact.
    Only the owner or System Manager may change this.
    """
    doc = frappe.get_doc("Contact", contact_name)
    user = frappe.session.user
    if doc.owner != user and "System Manager" not in frappe.get_roles():
        frappe.throw(frappe._("Only the contact owner can change sharing"), frappe.PermissionError)

    frappe.db.set_value("Contact", contact_name, "dock_shared", int(dock_shared))
    return {"dock_shared": bool(int(dock_shared))}
