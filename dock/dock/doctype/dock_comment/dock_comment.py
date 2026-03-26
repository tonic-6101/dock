# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import re

import frappe
from frappe import _
from frappe.model.document import Document


class DockComment(Document):
    def before_insert(self):
        self.user = frappe.session.user
        self._validate_reference_access()
        self._parse_mentions()

    def on_trash(self):
        """Cascade delete: remove replies and reactions."""
        # Delete all direct replies (they cascade their own children via on_trash)
        replies = frappe.get_all(
            "Dock Comment",
            filters={"parent_comment": self.name},
            pluck="name",
        )
        for reply_name in replies:
            frappe.delete_doc("Dock Comment", reply_name, force=True)

        # Delete reactions on this comment
        frappe.db.delete("Dock Reaction", {
            "reference_doctype": "Dock Comment",
            "reference_name": self.name,
        })

    def _validate_reference_access(self):
        """Ensure the user has read access to the referenced record."""
        if self.reference_doctype and self.reference_name:
            if not frappe.has_permission(
                self.reference_doctype, "read", self.reference_name
            ):
                frappe.throw(
                    _("You do not have permission to comment on this record"),
                    frappe.PermissionError,
                )

    def _parse_mentions(self):
        """Extract @user mentions from HTML content and populate the mentions child table."""
        if not self.content:
            return

        # Match data-id attribute from Tiptap mention nodes, or @email patterns
        mention_pattern = re.compile(
            r'data-id="([^"]+)"'  # Tiptap mention node
            r"|@([\w.+-]+@[\w.-]+)"  # @email pattern
        )
        seen = set()
        for match in mention_pattern.finditer(self.content):
            user_id = match.group(1) or match.group(2)
            if not user_id or user_id in seen:
                continue
            if not frappe.db.exists("User", user_id):
                continue
            seen.add(user_id)
            self.append("mentions", {"user": user_id})

    def after_insert(self):
        """Send notifications for mentions and update discussion stats if applicable."""
        self._notify_mentions()
        self._update_discussion_stats()

    def _notify_mentions(self):
        """Publish a Dock Notification for each mentioned user."""
        for mention in self.mentions:
            if mention.user == self.user:
                continue  # Don't notify self
            try:
                from dock.api.notifications import publish
                publish(
                    for_user=mention.user,
                    from_app="dock",
                    notification_type="comment_mention",
                    title=_("{0} mentioned you in a comment").format(
                        frappe.utils.get_fullname(self.user)
                    ),
                    message=self.content[:200] if self.content else "",
                    reference_doctype=self.reference_doctype,
                    reference_name=self.reference_name,
                    action_url=f"/dock/discussions/{self.reference_name}"
                    if self.reference_doctype == "Dock Discussion"
                    else None,
                )
            except Exception:
                frappe.log_error(
                    f"Failed to notify {mention.user} of mention in {self.name}",
                    "Dock Comment Mention Notification",
                )

    def _update_discussion_stats(self):
        """If this comment is a reply to a Dock Discussion, update its counters."""
        if self.reference_doctype != "Dock Discussion":
            return
        try:
            discussion = frappe.get_doc("Dock Discussion", self.reference_name)
            discussion.db_set("last_reply_at", self.creation, update_modified=False)
            discussion.db_set("last_reply_by", self.user, update_modified=False)
            discussion.db_set(
                "reply_count",
                frappe.db.count("Dock Comment", {
                    "reference_doctype": "Dock Discussion",
                    "reference_name": self.reference_name,
                }),
                update_modified=False,
            )
            # Add commenter as participant if not already
            existing = frappe.db.exists("Dock Discussion Participant", {
                "parent": self.reference_name,
                "user": self.user,
            })
            if not existing:
                discussion.append("participants", {
                    "user": self.user,
                    "role": "Participant",
                })
                discussion.save(ignore_permissions=True)
            # Notify participants of unread update (Messages #52)
            self._publish_unread_update(discussion)
        except Exception:
            frappe.log_error(
                f"Failed to update discussion stats for {self.reference_name}",
                "Dock Comment Discussion Stats",
            )

    def _publish_unread_update(self, discussion):
        """Publish dock_unread_update realtime event to all participants except the author."""
        for participant in (discussion.participants or []):
            if participant.user == self.user:
                continue
            try:
                from dock.api.discussion import get_unread_count
                # Temporarily switch user context to get their count
                original_user = frappe.session.user
                frappe.set_user(participant.user)
                count = get_unread_count()
                frappe.set_user(original_user)
                frappe.publish_realtime(
                    "dock_unread_update",
                    {"channel": "discussions", "count": count},
                    user=participant.user,
                )
            except Exception:
                pass


def get_permission_query_conditions(user=None):
    if not user:
        user = frappe.session.user
    roles = frappe.get_roles(user)
    if "System Manager" in roles or "Dock Manager" in roles:
        return None
    escaped = frappe.db.escape(user)
    return (
        f"(`tabDock Comment`.`visibility` = 'Public'"
        f" OR (`tabDock Comment`.`visibility` = 'Team')"
        f" OR (`tabDock Comment`.`visibility` = 'Internal'"
        f"     AND `tabDock Comment`.`user` = {escaped}))"
    )


def has_permission(doc, ptype="read", user=None):
    user = user or frappe.session.user
    roles = frappe.get_roles(user)
    if "System Manager" in roles or "Dock Manager" in roles:
        return True
    if ptype == "read":
        if doc.visibility == "Public":
            return True
        if doc.visibility == "Team":
            return True  # All system users with Dock User role
        if doc.visibility == "Internal" and doc.user == user:
            return True
        return False
    if ptype == "delete" and doc.user == user:
        return True
    return False
