# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from frappe import _
from frappe.query_builder import DocType, Order
from frappe.query_builder.functions import Count


@frappe.whitelist()
def get_list(
    reference_doctype: str = None,
    reference_name: str = None,
    limit: int = 20,
    offset: int = 0,
    pinned_first: bool = True,
) -> dict:
    """
    List notes, optionally filtered by reference.
    If no reference given, returns all notes for the current user.
    Returns { items, total }.
    """
    user = frappe.session.user
    N = DocType("Dock Note")

    where = (N.owner == user) & (N.deleted_at.isnull())

    if reference_doctype and reference_name:
        where = where & (N.reference_doctype == reference_doctype) & (N.reference_name == reference_name)

    try:
        total_row = (
            frappe.qb.from_(N)
            .select(Count("*").as_("total"))
            .where(where)
            .run(as_dict=True)
        )
        total = total_row[0].get("total", 0) if total_row else 0

        q = (
            frappe.qb.from_(N)
            .select(
                N.name,
                N.content,
                N.reference_doctype,
                N.reference_name,
                N.reference_label,
                N.pinned,
                N.owner,
                N.creation,
                N.modified,
            )
            .where(where)
            .limit(int(limit))
            .offset(int(offset))
        )

        if pinned_first:
            q = q.orderby(N.pinned, order=Order.desc).orderby(N.modified, order=Order.desc)
        else:
            q = q.orderby(N.modified, order=Order.desc)

        items = q.run(as_dict=True)

        # Add owner name for display
        for item in items:
            item["owner_name"] = frappe.db.get_value("User", item["owner"], "full_name") or item["owner"]
            item["creation"] = str(item["creation"])
            item["modified"] = str(item["modified"])

    except Exception:
        frappe.log_error("dock.api.notes.get_list failed")
        return {"items": [], "total": 0}

    return {"items": items, "total": total}


@frappe.whitelist()
def create(
    content: str,
    reference_doctype: str = None,
    reference_name: str = None,
) -> dict:
    """
    Create a new note. Optionally linked to a record.
    Returns the created note dict.
    """
    if not content or not content.strip():
        frappe.throw(_("Note content cannot be empty"))

    doc = frappe.new_doc("Dock Note")
    doc.content = content
    if reference_doctype and reference_name:
        doc.reference_doctype = reference_doctype
        doc.reference_name = reference_name
    doc.insert()

    return _format_note(doc)


@frappe.whitelist()
def update(name: str, content: str = None, pinned: int = None) -> dict:
    """
    Update a note's content and/or pinned state.
    Only the owner can update their notes.
    """
    doc = frappe.get_doc("Dock Note", name)
    _check_owner(doc)

    if content is not None:
        doc.content = content
    if pinned is not None:
        doc.pinned = int(pinned)
    doc.save()

    return _format_note(doc)


@frappe.whitelist()
def delete(name: str) -> dict:
    """
    Soft-delete a note (sets deleted_at). Only the owner can delete.
    """
    doc = frappe.get_doc("Dock Note", name)
    _check_owner(doc)

    doc.deleted_at = frappe.utils.now_datetime()
    doc.save()

    return {"deleted": name}


@frappe.whitelist()
def toggle_pin(name: str) -> dict:
    """Toggle a note's pinned state. Returns the updated note."""
    doc = frappe.get_doc("Dock Note", name)
    _check_owner(doc)

    doc.pinned = 0 if doc.pinned else 1
    doc.save()

    return _format_note(doc)


def _check_owner(doc):
    """Ensure current user owns this note."""
    if doc.owner != frappe.session.user and "System Manager" not in frappe.get_roles():
        frappe.throw(_("You can only edit your own notes"), frappe.PermissionError)


def _format_note(doc) -> dict:
    """Format a Dock Note doc for API response."""
    return {
        "name": doc.name,
        "content": doc.content,
        "reference_doctype": doc.reference_doctype or "",
        "reference_name": doc.reference_name or "",
        "reference_label": doc.reference_label or "",
        "pinned": bool(doc.pinned),
        "owner": doc.owner,
        "owner_name": frappe.db.get_value("User", doc.owner, "full_name") or doc.owner,
        "creation": str(doc.creation),
        "modified": str(doc.modified),
    }
