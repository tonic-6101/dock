# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import json

import frappe
from frappe import _


@frappe.whitelist()
def create_discussion(
    title: str,
    content: str,
    discussion_type: str = "General",
    linked_records: str = None,
    participants: str = None,
    source_app: str = None,
) -> dict:
    """Create a new Dock Discussion with optional linked records and participants."""
    doc = frappe.get_doc({
        "doctype": "Dock Discussion",
        "title": title,
        "content": content,
        "discussion_type": discussion_type,
        "source_app": source_app,
    })

    # Parse linked_records from JSON string
    if linked_records:
        if isinstance(linked_records, str):
            linked_records = json.loads(linked_records)
        for record in linked_records:
            doc.append("linked_records", {
                "reference_doctype": record.get("doctype"),
                "reference_name": record.get("name"),
            })

    # Parse participants from JSON string (list of email strings)
    if participants:
        if isinstance(participants, str):
            participants = json.loads(participants)
        for user_email in participants:
            doc.append("participants", {
                "user": user_email,
                "role": "Participant",
            })

    doc.insert()
    return _enrich_discussion(doc)


@frappe.whitelist()
def get_discussion(name: str) -> dict:
    """Get discussion with linked records, participants, and unread state."""
    doc = frappe.get_doc("Dock Discussion", name)
    result = _enrich_discussion(doc)

    # Unread tracking
    current_user = frappe.session.user
    participant = None
    for p in doc.participants:
        if p.user == current_user:
            participant = p
            break

    result["has_unread"] = False
    result["unread_count"] = 0
    if participant and doc.last_reply_at:
        if not participant.last_read_at or participant.last_read_at < doc.last_reply_at:
            result["has_unread"] = True
            if participant.last_read_at:
                result["unread_count"] = frappe.db.count("Dock Comment", {
                    "reference_doctype": "Dock Discussion",
                    "reference_name": name,
                    "creation": (">", participant.last_read_at),
                })
            else:
                result["unread_count"] = doc.reply_count

    return result


@frappe.whitelist()
def list_discussions(
    status: str = None,
    discussion_type: str = None,
    source_app: str = None,
    reference_doctype: str = None,
    reference_name: str = None,
    participant: str = None,
    search: str = None,
    limit: int = 20,
    offset: int = 0,
) -> dict:
    """List discussions with filtering."""
    limit = int(limit)
    offset = int(offset)

    filters = {}
    if status:
        filters["status"] = status
    if discussion_type:
        filters["discussion_type"] = discussion_type
    if source_app:
        filters["source_app"] = source_app

    # Filter by linked record (subquery on child table)
    extra_conditions = []
    if reference_doctype and reference_name:
        extra_conditions.append(
            f"""`tabDock Discussion`.name IN (
                SELECT parent FROM `tabDock Discussion Link`
                WHERE reference_doctype = {frappe.db.escape(reference_doctype)}
                AND reference_name = {frappe.db.escape(reference_name)}
            )"""
        )

    # Filter by participant (subquery on child table)
    if participant:
        extra_conditions.append(
            f"""`tabDock Discussion`.name IN (
                SELECT parent FROM `tabDock Discussion Participant`
                WHERE user = {frappe.db.escape(participant)}
            )"""
        )

    # Text search on title
    if search:
        filters["title"] = ("like", f"%{search}%")

    # Build conditions string for subqueries (child table filtering)
    conditions = " AND ".join(extra_conditions) if extra_conditions else None

    fields = ["name", "title", "discussion_type", "status", "created_by",
              "source_app", "is_pinned", "reply_count",
              "last_reply_at", "last_reply_by", "creation", "resolved_summary"]

    if conditions:
        # Use raw SQL when child-table subqueries are needed
        total = _count_with_conditions(filters, conditions)
        discussions = _query_with_conditions(filters, conditions, fields,
                                             "is_pinned DESC, last_reply_at DESC, creation DESC",
                                             limit, offset)
    else:
        total = frappe.db.count("Dock Discussion", filters=filters)
        discussions = frappe.get_all(
            "Dock Discussion",
            filters=filters,
            fields=fields,
            order_by="is_pinned DESC, last_reply_at DESC, creation DESC",
            limit_page_length=limit,
            limit_start=offset,
        )

    for d in discussions:
        d["created_by_fullname"] = frappe.utils.get_fullname(d["created_by"])
        # Fetch linked records
        d["linked_records"] = frappe.get_all(
            "Dock Discussion Link",
            filters={"parent": d["name"]},
            fields=["reference_doctype", "reference_name", "link_label"],
        )
        # Fetch participant count
        d["participant_count"] = frappe.db.count(
            "Dock Discussion Participant", {"parent": d["name"]}
        )

    return {
        "discussions": discussions,
        "has_more": (offset + limit) < (total or 0),
        "total": total or 0,
    }


@frappe.whitelist()
def get_record_discussions(
    reference_doctype: str,
    reference_name: str,
    limit: int = 10,
) -> list:
    """Get all discussions linked to a specific record."""
    limit = int(limit)
    discussion_names = frappe.get_all(
        "Dock Discussion Link",
        filters={
            "reference_doctype": reference_doctype,
            "reference_name": reference_name,
        },
        pluck="parent",
        limit_page_length=limit,
    )
    if not discussion_names:
        return []

    return frappe.get_all(
        "Dock Discussion",
        filters={"name": ("in", discussion_names)},
        fields=["name", "title", "discussion_type", "status", "created_by",
                "reply_count", "last_reply_at", "creation", "resolved_summary"],
        order_by="creation DESC",
    )


@frappe.whitelist()
def resolve_discussion(name: str, resolved_summary: str) -> None:
    """Resolve a discussion with a summary of the outcome/decision."""
    frappe.db.set_value("Dock Discussion", name, {
        "status": "Resolved",
        "resolved_summary": resolved_summary,
        "resolved_by": frappe.session.user,
        "resolved_at": frappe.utils.now_datetime(),
    })


@frappe.whitelist()
def reopen_discussion(name: str) -> None:
    """Reopen a resolved discussion."""
    frappe.db.set_value("Dock Discussion", name, {
        "status": "Open",
        "resolved_summary": None,
        "resolved_by": None,
        "resolved_at": None,
    })


@frappe.whitelist()
def add_linked_record(
    discussion_name: str,
    reference_doctype: str,
    reference_name: str,
) -> None:
    """Link an additional record to an existing discussion."""
    doc = frappe.get_doc("Dock Discussion", discussion_name)
    # Check for duplicates
    for link in doc.linked_records:
        if link.reference_doctype == reference_doctype and link.reference_name == reference_name:
            frappe.throw(_("This record is already linked to this discussion"))
    doc.append("linked_records", {
        "reference_doctype": reference_doctype,
        "reference_name": reference_name,
    })
    doc.save(ignore_permissions=True)


@frappe.whitelist()
def remove_linked_record(
    discussion_name: str,
    reference_doctype: str,
    reference_name: str,
) -> None:
    """Remove a record link from a discussion."""
    doc = frappe.get_doc("Dock Discussion", discussion_name)
    doc.linked_records = [
        link for link in doc.linked_records
        if not (link.reference_doctype == reference_doctype and link.reference_name == reference_name)
    ]
    doc.save(ignore_permissions=True)


@frappe.whitelist()
def promote_to_discussion(
    reference_doctype: str,
    reference_name: str,
    title: str,
    discussion_type: str = "General",
    include_comments: bool = True,
) -> dict:
    """Create a discussion from an existing comment thread on a record."""
    if isinstance(include_comments, str):
        include_comments = include_comments.lower() == "true"

    # Build opening post content
    content_parts = []

    if include_comments:
        comments = frappe.get_all(
            "Dock Comment",
            filters={
                "reference_doctype": reference_doctype,
                "reference_name": reference_name,
                "parent_comment": ("is", "not set"),
            },
            fields=["content", "user", "creation"],
            order_by="creation ASC",
            limit_page_length=20,
        )
        if comments:
            content_parts.append("<h3>Previous comments</h3>")
            for c in comments:
                fullname = frappe.utils.get_fullname(c["user"])
                content_parts.append(
                    f"<blockquote><strong>{fullname}</strong> "
                    f"({frappe.utils.format_datetime(c['creation'], 'short')})"
                    f"<br>{c['content']}</blockquote>"
                )

    content = "\n".join(content_parts) if content_parts else ""

    doc = frappe.get_doc({
        "doctype": "Dock Discussion",
        "title": title,
        "content": content,
        "discussion_type": discussion_type,
        "linked_records": [{
            "reference_doctype": reference_doctype,
            "reference_name": reference_name,
        }],
    })
    doc.insert()

    # Add a system comment on the original record
    frappe.get_doc({
        "doctype": "Dock Comment",
        "reference_doctype": reference_doctype,
        "reference_name": reference_name,
        "content": f'<p>Continued in Discussion: <a href="/dock/discussions/{doc.name}">{doc.title}</a></p>',
        "note_type": "System",
        "visibility": "Team",
    }).insert(ignore_permissions=True)

    return _enrich_discussion(doc)


@frappe.whitelist()
def mark_read(name: str) -> None:
    """Update current user's last_read_at on the discussion."""
    user = frappe.session.user
    # Find the participant row for this user
    participant_name = frappe.db.get_value("Dock Discussion Participant", {
        "parent": name,
        "user": user,
    })
    if participant_name:
        frappe.db.set_value(
            "Dock Discussion Participant",
            participant_name,
            "last_read_at",
            frappe.utils.now_datetime(),
            update_modified=False,
        )


def _enrich_discussion(doc) -> dict:
    """Build a rich response dict from a discussion document."""
    return {
        "name": doc.name,
        "title": doc.title,
        "content": doc.content,
        "discussion_type": doc.discussion_type,
        "status": doc.status,
        "created_by": doc.created_by,
        "created_by_fullname": frappe.utils.get_fullname(doc.created_by),
        "source_app": doc.source_app,
        "is_pinned": doc.is_pinned,
        "resolved_summary": doc.resolved_summary,
        "resolved_by": doc.resolved_by,
        "resolved_at": str(doc.resolved_at) if doc.resolved_at else None,
        "reply_count": doc.reply_count or 0,
        "last_reply_at": str(doc.last_reply_at) if doc.last_reply_at else None,
        "last_reply_by": doc.last_reply_by,
        "creation": str(doc.creation),
        "linked_records": [
            {
                "reference_doctype": link.reference_doctype,
                "reference_name": link.reference_name,
                "link_label": link.link_label,
            }
            for link in (doc.linked_records or [])
        ],
        "participants": [
            {
                "user": p.user,
                "role": p.role,
                "user_fullname": frappe.utils.get_fullname(p.user),
                "last_read_at": str(p.last_read_at) if p.last_read_at else None,
            }
            for p in (doc.participants or [])
        ],
    }


def _build_where_clause(filters, conditions=None):
    """Build WHERE clause from filters dict + optional extra SQL conditions."""
    where_parts = []
    for key, value in filters.items():
        if isinstance(value, tuple):
            op, val = value
            where_parts.append(f"`tabDock Discussion`.`{key}` {op} {frappe.db.escape(val)}")
        else:
            where_parts.append(f"`tabDock Discussion`.`{key}` = {frappe.db.escape(value)}")
    if conditions:
        where_parts.append(conditions)
    return " AND ".join(where_parts) if where_parts else "1=1"


def _count_with_conditions(filters, conditions):
    """Count with extra SQL conditions."""
    where_clause = _build_where_clause(filters, conditions)
    result = frappe.db.sql(f"SELECT COUNT(*) FROM `tabDock Discussion` WHERE {where_clause}")
    return result[0][0] if result else 0


def _query_with_conditions(filters, conditions, fields, order_by, limit, offset):
    """Query with extra SQL conditions (for child-table subqueries)."""
    where_clause = _build_where_clause(filters, conditions)
    field_str = ", ".join(f"`tabDock Discussion`.`{f}`" for f in fields)
    rows = frappe.db.sql(
        f"""SELECT {field_str}
            FROM `tabDock Discussion`
            WHERE {where_clause}
            ORDER BY {order_by}
            LIMIT {int(limit)} OFFSET {int(offset)}""",
        as_dict=True,
    )
    return rows
