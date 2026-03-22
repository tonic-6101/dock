# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe.query_builder import DocType, Order
from frappe.query_builder.functions import Count


def _owner_filter(C, user: str, vis: str = None, filter_mine: bool = False):
    """Return optional owner filter. All contacts are visible by default (Frappe permissions apply)."""
    if vis == "mine" or filter_mine:
        return C.owner == user
    return None


@frappe.whitelist()
def get_list(
    limit: int = 50,
    offset: int = 0,
    query: str = None,
    contact_type: str = None,
    visibility: str = None,
    tags: str = None,
    company: str = None,
    status: str = "active",
    sort: str = "recent",
    # Legacy param
    filter_mine: bool = False,
) -> dict:
    """
    Paginated contact list. All contacts visible to all logged-in users (Frappe permissions apply).

    Filters (all optional, combine with AND):
      contact_type: "internal" (user IS NOT NULL) | "external" (user IS NULL) | None (all)
      visibility:   "mine" (owner=current_user) | None (all)
      tags:         JSON list of tag strings — contacts matching ANY tag (OR within tags)
      company:      exact match on company_name
      status:       "active" (default, excludes archived+DNC) | "archived" | "dnc"
      sort:         "recent" (modified desc) | "asc" (A→Z) | "desc" (Z→A)

    Returns { items, total, available_tags, available_companies }.
    """
    import json as _json

    user = frappe.session.user
    C = DocType("Contact")

    owner_cond = _owner_filter(C, user, vis=visibility, filter_mine=bool(filter_mine))
    where = owner_cond if owner_cond is not None else (C.name.isnotnull())

    # --- Status filter ---
    if status == "archived":
        where = where & (C.dock_archived == 1)
    elif status == "dnc":
        where = where & (C.dock_do_not_contact == 1)
    else:
        # "active" (default): exclude archived AND DNC
        where = where & ((C.dock_archived == 0) | (C.dock_archived.isnull()))
        where = where & ((C.dock_do_not_contact == 0) | (C.dock_do_not_contact.isnull()))

    # --- Contact type (internal / external) ---
    if contact_type == "internal":
        where = where & (C.user.isnotnull()) & (C.user != "")
    elif contact_type == "external":
        where = where & ((C.user.isnull()) | (C.user == ""))

    # --- Company filter ---
    if company and company.strip():
        where = where & (C.company_name == company.strip())

    # --- Free-text search (still used by global search integration) ---
    if query and query.strip():
        q = f"%{query.strip()}%"
        where = where & (
            C.full_name.like(q) | C.email_id.like(q) | C.phone.like(q)
        )

    # --- Tag filter (OR within tags) ---
    tag_list = None
    if tags:
        if isinstance(tags, str):
            try:
                tag_list = _json.loads(tags)
            except (ValueError, TypeError):
                tag_list = [t.strip() for t in tags.split(",") if t.strip()]
        elif isinstance(tags, list):
            tag_list = tags

    if tag_list:
        tag_names = set()
        for tag in tag_list:
            tagged = frappe.get_all(
                "Tag Link",
                filters={"document_type": "Contact", "tag": tag},
                pluck="document_name",
            )
            tag_names.update(tagged)
        if not tag_names:
            return {"items": [], "total": 0, "available_tags": [], "available_companies": []}
        where = where & C.name.isin(list(tag_names))

    try:
        # Total count
        total_row = (
            frappe.qb.from_(C)
            .select(Count("*").as_("total"))
            .where(where)
            .run(as_dict=True)
        )
        total = total_row[0].get("total", 0) if total_row else 0

        # Sort
        if sort == "asc":
            order_field, order_dir = C.full_name, Order.asc
        elif sort == "desc":
            order_field, order_dir = C.full_name, Order.desc
        elif sort == "name":
            # Legacy
            order_field, order_dir = C.full_name, Order.asc
        else:
            # "recent" (default)
            order_field, order_dir = C.modified, Order.desc

        items = (
            frappe.qb.from_(C)
            .select(
                C.name,
                C.full_name,
                C.email_id,
                C.phone,
                C.company_name,
                C.image,
                C.owner,
                C.user,
                C._user_tags,
            )
            .where(where)
            .orderby(order_field, order=order_dir)
            .limit(int(limit))
            .offset(int(offset))
            .run(as_dict=True)
        )

        # Parse tags and internal flag for each item
        for item in items:
            raw_tags = item.pop("_user_tags", "") or ""
            item["tags"] = [t.strip() for t in raw_tags.split(",") if t.strip()]
            item["is_internal"] = bool(item.get("user"))

    except Exception:
        frappe.log_error("dock.api.people.get_list failed")
        return {"items": [], "total": 0, "available_tags": [], "available_companies": []}

    # Available filter values for dropdown population
    available_tags = _get_available_tags(user)
    available_companies = _get_available_companies(user)

    return {
        "items": items,
        "total": total,
        "available_tags": available_tags,
        "available_companies": available_companies,
    }


def _get_available_tags(user: str) -> list:
    """Return distinct tags on all contacts (all visible to all users)."""
    try:
        rows = frappe.db.sql("""
            SELECT DISTINCT tl.tag
            FROM `tabTag Link` tl
            WHERE tl.document_type = 'Contact'
            ORDER BY tl.tag
        """, as_dict=True)
        return [r["tag"] for r in rows if r.get("tag")]
    except Exception:
        return []


def _get_available_companies(user: str) -> list:
    """Return distinct company names from all contacts."""
    try:
        rows = frappe.db.sql("""
            SELECT DISTINCT c.company_name
            FROM `tabContact` c
            WHERE c.company_name IS NOT NULL
              AND c.company_name != ''
            ORDER BY c.company_name
        """, as_dict=True)
        return [r["company_name"] for r in rows if r.get("company_name")]
    except Exception:
        return []


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
    # Frappe's standard permissions apply — no extra dock_shared check needed

    # Owner full name for display
    owner_name = frappe.db.get_value("User", doc.owner, "full_name") or doc.owner

    # Tags (Frappe stores tags as _user_tags comma-separated)
    tags = [t.strip() for t in (doc.get("_user_tags") or "").split(",") if t.strip()]

    # All addresses linked to this contact via Dynamic Link
    addresses = _get_contact_addresses(doc.name)

    # Last activity: most recent Comment or Communication
    last_activity = None
    comm = frappe.db.get_value(
        "Communication",
        {"reference_doctype": "Contact", "reference_name": doc.name},
        ["communication_type", "subject", "creation"],
        order_by="creation desc",
        as_dict=True,
    )
    if comm:
        last_activity = {
            "type": comm.communication_type or "Communication",
            "subject": comm.subject or "",
            "date": str(comm.creation),
        }

    return {
        "name": doc.name,
        "full_name": doc.full_name,
        "company_name": doc.company_name,
        "designation": doc.designation,
        "image": doc.image,
        "status": doc.get("status") or "",
        "source": doc.get("source") or "",
        "department": doc.get("department") or "",
        "email_ids": [{"email": e.email_id, "is_primary": e.is_primary} for e in doc.email_ids],
        "phone_nos": [
            {"phone": p.phone, "is_primary": p.is_primary_phone, "label": p.get("phone_type") or ""}
            for p in doc.phone_nos
        ],
        "owner": doc.owner,
        "owner_name": owner_name,
        "modified": str(doc.modified),
        "tags": tags,
        "addresses": addresses,
        "last_activity": last_activity,
        # Dock custom fields
        "dock_birthday": doc.get("dock_birthday") or "",
        "dock_linkedin": doc.get("dock_linkedin") or "",
        "dock_twitter": doc.get("dock_twitter") or "",
        "dock_github": doc.get("dock_github") or "",
        "dock_website": doc.get("dock_website") or "",
        "dock_archived": bool(doc.get("dock_archived")),
        "dock_do_not_contact": bool(doc.get("dock_do_not_contact")),
        "user": doc.get("user") or "",
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
def get_activity_timeline(
    contact_name: str,
    limit: int = 20,
    offset: int = 0,
    activity_type: str = None,
) -> dict:
    """
    Reverse-chronological activity timeline for a contact.
    Combines Communications and Comments linked to this Contact.

    activity_type: "email" | "call" | "comment" | None (all)
    Returns { items: [...], total: int }
    """
    filters = {"reference_doctype": "Contact", "reference_name": contact_name}

    # Communications (emails, calls, etc.)
    comm_filters = dict(filters)
    if activity_type == "email":
        comm_filters["communication_type"] = "Communication"
        comm_filters["communication_medium"] = "Email"
    elif activity_type == "call":
        comm_filters["communication_type"] = "Communication"
        comm_filters["communication_medium"] = "Phone"

    items = []

    if activity_type not in ("comment",):
        comms = frappe.get_all(
            "Communication",
            filters=comm_filters,
            fields=["name", "communication_type", "communication_medium", "subject",
                     "sender", "creation", "content"],
            order_by="creation desc",
            limit_page_length=int(limit),
            limit_start=int(offset),
        )
        for c in comms:
            medium = c.get("communication_medium") or ""
            if medium == "Email":
                icon = "mail"
            elif medium == "Phone":
                icon = "phone"
            else:
                icon = "message-square"
            items.append({
                "name": c.name,
                "type": medium.lower() or c.communication_type.lower(),
                "icon": icon,
                "subject": c.subject or "",
                "sender": c.sender or "",
                "date": str(c.creation),
                "content": (c.content or "")[:200],
                "source": "Communication",
            })

    if activity_type not in ("email", "call"):
        comments = frappe.get_all(
            "Comment",
            filters={
                "reference_doctype": "Contact",
                "reference_name": contact_name,
                "comment_type": "Comment",
            },
            fields=["name", "comment_by", "content", "creation"],
            order_by="creation desc",
            limit_page_length=int(limit),
            limit_start=int(offset),
        )
        for c in comments:
            items.append({
                "name": c.name,
                "type": "comment",
                "icon": "message-square",
                "subject": "",
                "sender": c.comment_by or "",
                "date": str(c.creation),
                "content": (c.content or "")[:200],
                "source": "Comment",
            })

    # Sort combined results by date descending
    items.sort(key=lambda x: x["date"], reverse=True)
    items = items[:int(limit)]

    # Total count
    total_comms = frappe.db.count("Communication", filters) if activity_type not in ("comment",) else 0
    total_comments = frappe.db.count("Comment", {
        "reference_doctype": "Contact", "reference_name": contact_name, "comment_type": "Comment",
    }) if activity_type not in ("email", "call") else 0

    return {"items": items, "total": total_comms + total_comments}


@frappe.whitelist()
def get_files(contact_name: str) -> list:
    """
    Return files attached to a Contact.
    Returns [{name, file_name, file_url, file_size, is_private, creation}].
    """
    files = frappe.get_all(
        "File",
        filters={
            "attached_to_doctype": "Contact",
            "attached_to_name": contact_name,
        },
        fields=["name", "file_name", "file_url", "file_size", "is_private", "creation"],
        order_by="creation desc",
    )
    return files


@frappe.whitelist()
def upload_file(contact_name: str) -> dict:
    """
    Upload a file attachment to a Contact.
    Expects a multipart file upload. Returns the file dict.
    """
    _check_contact_edit_permission(contact_name)

    files = frappe.request.files
    if not files or "file" not in files:
        frappe.throw(frappe._("No file uploaded"))

    uploaded = files["file"]
    file_doc = frappe.get_doc({
        "doctype": "File",
        "file_name": uploaded.filename,
        "content": uploaded.read(),
        "attached_to_doctype": "Contact",
        "attached_to_name": contact_name,
        "is_private": 0,
    })
    file_doc.save(ignore_permissions=True)

    return {
        "name": file_doc.name,
        "file_name": file_doc.file_name,
        "file_url": file_doc.file_url,
        "file_size": file_doc.file_size,
        "is_private": file_doc.is_private,
        "creation": str(file_doc.creation),
    }


@frappe.whitelist()
def delete_file(contact_name: str, file_name: str) -> dict:
    """Delete a file attached to a contact."""
    _check_contact_edit_permission(contact_name)
    frappe.delete_doc("File", file_name)
    return {"deleted": file_name}


@frappe.whitelist()
def create_contact(
    full_name: str,
    email: str = None,
    phone: str = None,
    designation: str = None,
    company_name: str = None,
) -> dict:
    """
    Create a Frappe Contact. Owner = session user.
    Returns { name, full_name }.
    """
    doc = frappe.new_doc("Contact")
    doc.full_name = full_name
    doc.company_name = company_name or ""
    doc.designation = designation or ""

    if email:
        doc.append("email_ids", {"email_id": email, "is_primary": 1})
    if phone:
        doc.append("phone_nos", {"phone": phone, "is_primary": 1})

    doc.insert()
    return {"name": doc.name, "full_name": doc.full_name}


EDITABLE_FIELDS = {
    "full_name", "company_name", "designation", "source", "department", "user",
    "dock_birthday", "dock_linkedin", "dock_twitter", "dock_github", "dock_website",
    "dock_archived", "dock_do_not_contact",
}


@frappe.whitelist()
def update_contact(contact_name: str, field: str, value) -> dict:
    """
    Inline-edit a single field on a contact.
    Only the owner or System Manager may edit.
    Returns the updated field value.
    """
    if field not in EDITABLE_FIELDS:
        frappe.throw(frappe._("Field '{0}' is not editable").format(field))

    doc = frappe.get_doc("Contact", contact_name)
    user = frappe.session.user
    if doc.owner != user and "System Manager" not in frappe.get_roles():
        frappe.throw(frappe._("Only the contact owner can edit this contact"), frappe.PermissionError)

    # Type coercion for Check fields
    if field in ("dock_archived", "dock_do_not_contact"):
        value = int(value)

    frappe.db.set_value("Contact", contact_name, field, value)
    return {"field": field, "value": value}


@frappe.whitelist()
def upload_image(contact_name: str) -> dict:
    """
    Upload or replace the contact's avatar image.
    Expects a file upload (multipart form). Only the owner or System Manager may upload.
    Returns { image: <file_url> }.
    """
    doc = frappe.get_doc("Contact", contact_name)
    user = frappe.session.user
    if doc.owner != user and "System Manager" not in frappe.get_roles():
        frappe.throw(frappe._("Only the contact owner can change the photo"), frappe.PermissionError)

    files = frappe.request.files
    if not files or "file" not in files:
        frappe.throw(frappe._("No file uploaded"))

    uploaded = files["file"]
    file_doc = frappe.get_doc(
        {
            "doctype": "File",
            "file_name": uploaded.filename,
            "content": uploaded.read(),
            "attached_to_doctype": "Contact",
            "attached_to_name": contact_name,
            "attached_to_field": "image",
            "is_private": 0,
        }
    )
    file_doc.save(ignore_permissions=True)

    frappe.db.set_value("Contact", contact_name, "image", file_doc.file_url)
    return {"image": file_doc.file_url}


@frappe.whitelist()
def add_tag(contact_name: str, tag: str) -> dict:
    """Add a tag to a contact. Returns updated tags list."""
    _check_contact_edit_permission(contact_name)
    tag = tag.strip()
    if not tag:
        frappe.throw(frappe._("Tag cannot be empty"))

    from frappe.desk.doctype.tag.tag import add_tag as _add_tag
    _add_tag(tag=tag, dt="Contact", dn=contact_name)

    doc = frappe.get_doc("Contact", contact_name)
    tags = [t.strip() for t in (doc.get("_user_tags") or "").split(",") if t.strip()]
    return {"tags": tags}


@frappe.whitelist()
def remove_tag(contact_name: str, tag: str) -> dict:
    """Remove a tag from a contact. Returns updated tags list."""
    _check_contact_edit_permission(contact_name)

    from frappe.desk.doctype.tag.tag import remove_tag as _remove_tag
    _remove_tag(tag=tag, dt="Contact", dn=contact_name)

    doc = frappe.get_doc("Contact", contact_name)
    tags = [t.strip() for t in (doc.get("_user_tags") or "").split(",") if t.strip()]
    return {"tags": tags}


def _get_contact_addresses(contact_name: str) -> list:
    """Return all addresses linked to a contact via Dynamic Link, sorted primary-first."""
    address_names = frappe.get_all(
        "Dynamic Link",
        filters={"link_doctype": "Contact", "link_name": contact_name, "parenttype": "Address"},
        pluck="parent",
    )
    if not address_names:
        return []

    addresses = []
    for aname in set(address_names):
        try:
            addr = frappe.get_doc("Address", aname)
            if addr.disabled:
                continue
            addresses.append(_format_address(addr))
        except Exception:
            continue

    # Primary first, then alphabetical by type
    addresses.sort(key=lambda a: (not a["is_primary_address"], a["address_type"]))
    return addresses


_address_template_checked = False


def _ensure_address_template():
    """Create a default Address Template if none exists. Idempotent, cached per process."""
    global _address_template_checked
    if _address_template_checked:
        return
    _address_template_checked = True

    if frappe.db.exists("Address Template", {"is_default": 1}):
        return

    frappe.get_doc({
        "doctype": "Address Template",
        "country": frappe.db.get_default("country") or "United States",
        "is_default": 1,
        "template": (
            "{{ address_line1 }}<br>"
            "{% if address_line2 %}{{ address_line2 }}<br>{% endif %}"
            "{{ city }}{% if state %}, {{ state }}{% endif %} {{ pincode }}<br>"
            "{{ country }}"
        ),
    }).insert(ignore_permissions=True)
    frappe.db.commit()


def _format_address(addr) -> dict:
    """Format an Address doc into the API response dict."""
    # get_display() requires an Address Template. Fall back to manual formatting.
    try:
        display = addr.get_display()
    except Exception:
        parts = [addr.address_line1 or ""]
        if addr.address_line2:
            parts.append(addr.address_line2)
        city_line = ", ".join(filter(None, [addr.city, addr.state, addr.pincode]))
        if city_line:
            parts.append(city_line)
        if addr.country:
            parts.append(addr.country)
        display = "\n".join(parts)

    return {
        "name": addr.name,
        "address_type": addr.address_type or "Other",
        "address_line1": addr.address_line1 or "",
        "address_line2": addr.address_line2 or "",
        "city": addr.city or "",
        "state": addr.state or "",
        "country": addr.country or "",
        "pincode": addr.pincode or "",
        "is_primary_address": bool(addr.is_primary_address),
        "display": display,
    }


def _check_contact_edit_permission(contact_name: str):
    """Check the current user can edit this contact. Raises on failure."""
    doc = frappe.get_doc("Contact", contact_name)
    user = frappe.session.user
    if doc.owner != user and "System Manager" not in frappe.get_roles():
        frappe.throw(frappe._("Only the contact owner can edit this contact"), frappe.PermissionError)
    return doc


@frappe.whitelist()
def search_countries(query: str = "", limit: int = 10) -> list:
    """
    Search Country doctype for the address form country picker.
    Returns [{name, code}] — name is the display label and the Link value.
    """
    Country = DocType("Country")
    q = frappe.qb.from_(Country).select(Country.name, Country.code).orderby(Country.name).limit(int(limit))
    if query and query.strip():
        q = q.where(Country.name.like(f"%{query.strip()}%"))
    return q.run(as_dict=True)


@frappe.whitelist()
def create_address(
    contact_name: str,
    address_type: str = "Personal",
    address_line1: str = "",
    address_line2: str = "",
    city: str = "",
    state: str = "",
    country: str = "",
    pincode: str = "",
    is_primary: int = 0,
) -> dict:
    """
    Create a new Address linked to a Contact.
    Returns the new address dict matching the get_contact addresses format.
    """
    _check_contact_edit_permission(contact_name)

    if not address_line1 or not city or not country:
        frappe.throw(frappe._("Address line 1, city, and country are required"))

    # Validate country exists in the Country doctype (Link field)
    if not frappe.db.exists("Country", country):
        frappe.throw(frappe._("Country '{0}' not found. Please select a valid country.").format(country))

    # Ensure a default Address Template exists (required by Frappe for address display)
    _ensure_address_template()

    full_name = frappe.db.get_value("Contact", contact_name, "full_name") or contact_name
    addr = frappe.new_doc("Address")
    addr.address_title = full_name
    addr.address_type = address_type
    addr.address_line1 = address_line1
    addr.address_line2 = address_line2 or ""
    addr.city = city
    addr.state = state or ""
    addr.country = country
    addr.pincode = pincode or ""
    addr.is_primary_address = int(is_primary)
    addr.append("links", {"link_doctype": "Contact", "link_name": contact_name})
    addr.flags.ignore_mandatory = False
    addr.insert()

    return _format_address(addr)


@frappe.whitelist()
def update_address(
    contact_name: str,
    address_name: str,
    address_type: str = None,
    address_line1: str = None,
    address_line2: str = None,
    city: str = None,
    state: str = None,
    country: str = None,
    pincode: str = None,
    is_primary: int = None,
) -> dict:
    """
    Update an existing Address linked to a Contact.
    Only provided (non-None) fields are updated.
    Returns the updated address dict.
    """
    _check_contact_edit_permission(contact_name)

    addr = frappe.get_doc("Address", address_name)

    # Verify this address is actually linked to the contact
    linked = any(
        link.link_doctype == "Contact" and link.link_name == contact_name
        for link in addr.links
    )
    if not linked:
        frappe.throw(frappe._("Address is not linked to this contact"))

    if address_type is not None:
        addr.address_type = address_type
    if address_line1 is not None:
        addr.address_line1 = address_line1
    if address_line2 is not None:
        addr.address_line2 = address_line2
    if city is not None:
        addr.city = city
    if state is not None:
        addr.state = state
    if country is not None:
        addr.country = country
    if pincode is not None:
        addr.pincode = pincode
    if is_primary is not None:
        addr.is_primary_address = int(is_primary)

    addr.save()
    return _format_address(addr)


@frappe.whitelist()
def delete_address(contact_name: str, address_name: str) -> dict:
    """Delete an address linked to a contact."""
    _check_contact_edit_permission(contact_name)
    frappe.delete_doc("Address", address_name)
    return {"deleted": address_name}


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


@frappe.whitelist()
def search_contacts(query: str = "", limit: int = 8) -> list:
    """
    Search Frappe Contacts by first name, last name, full name, or email.
    Used by the timer contact picker.
    Returns [{name, full_name, email_id, image}].
    """
    if not query or len(query) < 1:
        return []

    C = DocType("Contact")
    q = (
        frappe.qb.from_(C)
        .select(C.name, C.full_name, C.first_name, C.last_name, C.email_id, C.image)
        .where(
            (C.first_name.like(f"%{query}%"))
            | (C.last_name.like(f"%{query}%"))
            | (C.full_name.like(f"%{query}%"))
            | (C.email_id.like(f"%{query}%"))
        )
        .orderby(C.full_name)
        .limit(int(limit))
    )

    return q.run(as_dict=True)
