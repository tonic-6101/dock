# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import re

import frappe
from frappe import _


@frappe.whitelist()
def add_comment(
    reference_doctype: str,
    reference_name: str,
    content: str,
    parent_comment: str = None,
    note_type: str = "General",
    visibility: str = "Team",
) -> dict:
    """Create a Dock Comment on any record. Returns the created comment with user info.

    Parses @mentions from content, creates Dock Comment Mention child rows,
    and publishes a Dock Notification to each mentioned user.
    """
    doc = frappe.get_doc({
        "doctype": "Dock Comment",
        "reference_doctype": reference_doctype,
        "reference_name": reference_name,
        "content": content,
        "parent_comment": parent_comment,
        "note_type": note_type,
        "visibility": visibility,
    })
    doc.insert()

    # Parse mentions and notify
    mentioned_users = _extract_mentions(content)
    current_user = frappe.session.user

    for user_email in mentioned_users:
        if user_email == current_user:
            continue  # Don't notify yourself

        # Add child row to Dock Comment Mention
        doc.append("mentions", {"user": user_email})

        # Publish notification
        try:
            from dock.api.notifications import publish
            author_name = frappe.utils.get_fullname(current_user)
            publish(
                for_user=user_email,
                from_app="dock",
                notification_type="comment_mention",
                title=_("{0} mentioned you in a comment").format(author_name),
                message=_truncate_for_notification(content),
                reference_doctype=reference_doctype,
                reference_name=reference_name,
            )
        except Exception:
            # Don't fail the comment if notification fails
            frappe.log_error(f"Failed to notify {user_email} about mention")

    if mentioned_users:
        doc.save(ignore_permissions=True)

    return _enrich_comment(doc)


def _extract_mentions(content: str) -> list[str]:
    """Extract mentioned user emails from comment HTML content.

    Looks for two patterns:
    1. <span class="mention" data-mention="Full Name">@Full Name</span>
    2. Plain @Full Name (fallback)

    Returns list of user email addresses (deduplicated).
    """
    mentioned_names = set()

    # Pattern 1: HTML span with data-mention attribute
    for match in re.finditer(r'data-mention="([^"]+)"', content):
        mentioned_names.add(match.group(1).strip())

    # Pattern 2: Plain @Name (word boundary, supports multi-word names)
    for match in re.finditer(r'@([\w][\w\s]*?)(?=\s@|<|$|[.,!?;])', content):
        mentioned_names.add(match.group(1).strip())

    if not mentioned_names:
        return []

    # Resolve full names to email addresses
    emails = []
    for name in mentioned_names:
        user = frappe.db.get_value(
            "User",
            {"full_name": name, "enabled": 1},
            "name",
        )
        if user:
            emails.append(user)

    return list(set(emails))


def _truncate_for_notification(content: str, max_len: int = 100) -> str:
    """Strip HTML and truncate for notification message."""
    text = re.sub(r"<[^>]+>", "", content).strip()
    if len(text) > max_len:
        return text[:max_len].rstrip() + "…"
    return text


@frappe.whitelist()
def get_comments(
    reference_doctype: str,
    reference_name: str,
    limit: int = 20,
    offset: int = 0,
    include_resolved: bool = False,
) -> dict:
    """Fetch top-level comments for a record. Pinned first, then by creation desc."""
    limit = int(limit)
    offset = int(offset)
    # Handle string "true"/"false" from form_dict
    if isinstance(include_resolved, str):
        include_resolved = include_resolved.lower() == "true"

    filters = {
        "reference_doctype": reference_doctype,
        "reference_name": reference_name,
        "parent_comment": ("is", "not set"),
    }
    if not include_resolved:
        filters["is_resolved"] = 0

    total = frappe.db.count("Dock Comment", filters)

    comments = frappe.get_all(
        "Dock Comment",
        filters=filters,
        fields=["name", "content", "user", "note_type", "visibility",
                "is_resolved", "resolved_by", "resolved_at",
                "is_pinned", "pinned_by", "pinned_at",
                "parent_comment", "creation"],
        order_by="is_pinned DESC, creation DESC",
        limit_page_length=limit,
        limit_start=offset,
    )

    resolved_count = frappe.db.count("Dock Comment", {
        "reference_doctype": reference_doctype,
        "reference_name": reference_name,
        "parent_comment": ("is", "not set"),
        "is_resolved": 1,
    })

    for c in comments:
        c["reply_count"] = frappe.db.count("Dock Comment", {"parent_comment": c["name"]})
        c["user_fullname"] = frappe.utils.get_fullname(c["user"])
        c["user_image"] = frappe.db.get_value("User", c["user"], "user_image")

    return {
        "comments": comments,
        "has_more": (offset + limit) < total,
        "total": total,
        "resolved_count": resolved_count,
    }


@frappe.whitelist()
def get_replies(comment_name: str, limit: int = 20) -> list:
    """Fetch replies to a specific comment, ordered by creation asc."""
    limit = int(limit)
    replies = frappe.get_all(
        "Dock Comment",
        filters={"parent_comment": comment_name},
        fields=["name", "content", "user", "note_type", "visibility",
                "is_resolved", "is_pinned", "creation"],
        order_by="creation ASC",
        limit_page_length=limit,
    )
    for r in replies:
        r["user_fullname"] = frappe.utils.get_fullname(r["user"])
        r["user_image"] = frappe.db.get_value("User", r["user"], "user_image")
        r["reply_count"] = frappe.db.count("Dock Comment", {"parent_comment": r["name"]})
    return replies


@frappe.whitelist()
def delete_comment(comment_name: str) -> None:
    """Delete a comment and all its replies. Author or Dock Manager only."""
    doc = frappe.get_doc("Dock Comment", comment_name)
    if doc.user != frappe.session.user:
        roles = frappe.get_roles(frappe.session.user)
        if "System Manager" not in roles and "Dock Manager" not in roles:
            frappe.throw(_("You can only delete your own comments"), frappe.PermissionError)
    frappe.delete_doc("Dock Comment", comment_name, force=True)


@frappe.whitelist()
def resolve_comment(comment_name: str) -> None:
    """Mark a comment thread as resolved."""
    frappe.db.set_value("Dock Comment", comment_name, {
        "is_resolved": 1,
        "resolved_by": frappe.session.user,
        "resolved_at": frappe.utils.now_datetime(),
    }, update_modified=False)


@frappe.whitelist()
def unresolve_comment(comment_name: str) -> None:
    """Reopen a resolved comment thread."""
    frappe.db.set_value("Dock Comment", comment_name, {
        "is_resolved": 0,
        "resolved_by": None,
        "resolved_at": None,
    }, update_modified=False)


@frappe.whitelist()
def pin_comment(comment_name: str) -> None:
    """Pin a comment to the top. Unpins any previous pin for the same reference."""
    doc = frappe.get_doc("Dock Comment", comment_name)
    # Unpin any existing pinned comment for the same reference
    frappe.db.sql("""
        UPDATE `tabDock Comment`
        SET is_pinned = 0, pinned_by = NULL, pinned_at = NULL
        WHERE reference_doctype = %s
          AND reference_name = %s
          AND is_pinned = 1
          AND name != %s
    """, (doc.reference_doctype, doc.reference_name, comment_name))

    frappe.db.set_value("Dock Comment", comment_name, {
        "is_pinned": 1,
        "pinned_by": frappe.session.user,
        "pinned_at": frappe.utils.now_datetime(),
    }, update_modified=False)


@frappe.whitelist()
def unpin_comment(comment_name: str) -> None:
    """Remove pin from a comment."""
    frappe.db.set_value("Dock Comment", comment_name, {
        "is_pinned": 0,
        "pinned_by": None,
        "pinned_at": None,
    }, update_modified=False)


@frappe.whitelist()
def get_users_for_mention(search: str = "", limit: int = 10) -> list:
    """Autocomplete list for @mention dropdown."""
    limit = int(limit)
    filters = {"enabled": 1, "user_type": "System User"}
    if search:
        filters["full_name"] = ("like", f"%{search}%")
    users = frappe.get_all(
        "User",
        filters=filters,
        or_filters={"email": ("like", f"%{search}%")} if search else None,
        fields=["name as id", "full_name as label", "user_image"],
        limit_page_length=limit,
        order_by="full_name ASC",
    )
    return users


def _enrich_comment(doc) -> dict:
    """Add user display info to a comment doc."""
    return {
        "name": doc.name,
        "user": doc.user,
        "user_fullname": frappe.utils.get_fullname(doc.user),
        "user_image": frappe.db.get_value("User", doc.user, "user_image"),
        "content": doc.content,
        "note_type": doc.note_type,
        "visibility": doc.visibility,
        "creation": str(doc.creation),
        "parent_comment": doc.parent_comment,
        "reply_count": 0,
    }
