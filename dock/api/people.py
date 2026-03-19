# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe.query_builder import DocType
from frappe.query_builder.functions import Count


def _visibility_condition(Contact, user: str, filter_mine: bool, filter_shared: bool):
    """Return the frappe.qb WHERE condition for dock_shared visibility."""
    if filter_mine:
        return Contact.owner == user
    if filter_shared:
        return Contact.dock_shared == 1
    # Default: own contacts OR shared contacts
    return (Contact.dock_shared == 1) | (Contact.owner == user)


@frappe.whitelist()
def get_list(
    limit: int = 50,
    offset: int = 0,
    query: str = None,
    filter_mine: bool = False,
    filter_shared: bool = False,
    sort: str = "modified",
) -> dict:
    """
    Paginated contact list respecting the dock_shared permission model.
    filter_mine=True: only contacts owned by the current user.
    filter_shared=True: only contacts with dock_shared=1.
    sort: "modified" (default, desc) or "name" (alphabetical asc).
    Returns { items, total } where total is the true count across all pages.
    """
    user = frappe.session.user
    Contact = DocType("Contact")

    visibility = _visibility_condition(Contact, user, bool(filter_mine), bool(filter_shared))

    # Build full WHERE condition
    if query and query.strip():
        q = f"%{query.strip()}%"
        search_cond = (
            Contact.full_name.like(q)
            | Contact.email_id.like(q)
            | Contact.phone.like(q)
        )
        where_cond = visibility & search_cond
    else:
        where_cond = visibility

    try:
        # True total count (across all pages)
        total_row = (
            frappe.qb.from_(Contact)
            .select(Count("*").as_("total"))
            .where(where_cond)
            .run(as_dict=True)
        )
        total = total_row[0].get("total", 0) if total_row else 0

        # Paged items
        order_field = Contact.full_name.asc() if sort == "name" else Contact.modified.desc()
        items = (
            frappe.qb.from_(Contact)
            .select(
                Contact.name,
                Contact.full_name,
                Contact.email_id,
                Contact.phone,
                Contact.company_name,
                Contact.image,
                Contact.dock_shared,
                Contact.owner,
            )
            .where(where_cond)
            .orderby(order_field)
            .limit(int(limit))
            .offset(int(offset))
            .run(as_dict=True)
        )
    except Exception:
        frappe.log_error("dock.api.people.get_list failed")
        return {"items": [], "total": 0}

    return {"items": items, "total": total}


@frappe.whitelist()
def get_list_context(contact_names: list) -> dict:
    """
    Batch endpoint: given a list of contact names, return a dict mapping
    contact_name → list of app names that have context data for it.
    Used to render app-context badges on the people list view.
    """
    result: dict[str, list[str]] = {n: [] for n in contact_names}
    for app in frappe.get_installed_apps():
        hook = frappe.get_hooks("dock_people_context", app_name=app)
        if not hook:
            continue
        for contact_name in contact_names:
            try:
                data = frappe.get_attr(hook[0])(contact_name)
                if data:
                    result[contact_name].append(app)
            except Exception:
                frappe.log_error(f"dock_people_context batch failed for app {app}")
    return result


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


def search_visibility_filter(rows: list) -> list:
    """
    Post-fetch filter for global search results on the Contact doctype.
    Removes contacts that are neither shared nor owned by the current user.
    Called via the visibility_fn key in dock_search_sections.
    """
    user = frappe.session.user
    return [r for r in rows if r.get("dock_shared") or r.get("owner") == user]


@frappe.whitelist()
def search_users(query: str = "", limit: int = 8) -> list:
    """
    Search Frappe Users by name or email. Used by the calendar attendee picker.
    Returns [{user, full_name}] — lightweight, no Contact data.
    """
    if not query or len(query) < 2:
        return []

    User = DocType("User")
    q = (
        frappe.qb.from_(User)
        .select(User.name.as_("user"), User.full_name)
        .where(User.enabled == 1)
        .where(User.user_type == "System User")
        .where(User.name != frappe.session.user)
        .where(
            (User.full_name.like(f"%{query}%"))
            | (User.name.like(f"%{query}%"))
        )
        .orderby(User.full_name)
        .limit(int(limit))
    )

    return q.run(as_dict=True)
