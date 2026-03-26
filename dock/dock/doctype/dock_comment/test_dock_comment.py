# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
import frappe.tests.utils

from dock.api.comment import (
    add_comment,
    get_comments,
    get_replies,
    delete_comment,
    resolve_comment,
    unresolve_comment,
    pin_comment,
    unpin_comment,
    get_users_for_mention,
)


class TestDockComment(frappe.tests.utils.FrappeTestCase):
    def setUp(self):
        frappe.set_user("Administrator")
        frappe.db.delete("Dock Comment", {})
        frappe.db.delete("Dock Comment Mention", {})

    def tearDown(self):
        frappe.db.delete("Dock Comment", {})
        frappe.db.delete("Dock Comment Mention", {})
        frappe.set_user("Administrator")

    def _ref(self):
        return {"reference_doctype": "DocType", "reference_name": "User"}

    # ------------------------------------------------------------------
    # add_comment
    # ------------------------------------------------------------------

    def test_add_creates_comment(self):
        result = add_comment(**self._ref(), content="<p>Hello</p>")
        self.assertTrue(frappe.db.exists("Dock Comment", result["name"]))
        self.assertEqual(result["content"], "<p>Hello</p>")
        self.assertEqual(result["user"], "Administrator")
        self.assertEqual(result["note_type"], "General")
        self.assertEqual(result["visibility"], "Team")
        self.assertEqual(result["reply_count"], 0)

    def test_add_with_note_type(self):
        result = add_comment(**self._ref(), content="<p>Note</p>", note_type="Decision")
        self.assertEqual(result["note_type"], "Decision")

    def test_add_with_visibility(self):
        result = add_comment(**self._ref(), content="<p>Secret</p>", visibility="Internal")
        self.assertEqual(result["visibility"], "Internal")

    def test_add_reply(self):
        parent = add_comment(**self._ref(), content="<p>Parent</p>")
        reply = add_comment(**self._ref(), content="<p>Reply</p>", parent_comment=parent["name"])
        self.assertEqual(reply["parent_comment"], parent["name"])

    # ------------------------------------------------------------------
    # get_comments
    # ------------------------------------------------------------------

    def test_get_returns_comments(self):
        add_comment(**self._ref(), content="<p>One</p>")
        add_comment(**self._ref(), content="<p>Two</p>")
        result = get_comments(**self._ref())
        self.assertEqual(result["total"], 2)
        self.assertEqual(len(result["comments"]), 2)
        self.assertFalse(result["has_more"])

    def test_get_excludes_replies(self):
        parent = add_comment(**self._ref(), content="<p>Parent</p>")
        add_comment(**self._ref(), content="<p>Reply</p>", parent_comment=parent["name"])
        result = get_comments(**self._ref())
        self.assertEqual(result["total"], 1)

    def test_get_excludes_resolved_by_default(self):
        c = add_comment(**self._ref(), content="<p>Test</p>")
        resolve_comment(c["name"])
        result = get_comments(**self._ref())
        self.assertEqual(result["total"], 0)

    def test_get_includes_resolved_when_asked(self):
        c = add_comment(**self._ref(), content="<p>Test</p>")
        resolve_comment(c["name"])
        result = get_comments(**self._ref(), include_resolved=True)
        self.assertEqual(result["total"], 1)

    def test_get_pagination(self):
        for i in range(5):
            add_comment(**self._ref(), content=f"<p>Comment {i}</p>")
        result = get_comments(**self._ref(), limit=2, offset=0)
        self.assertEqual(len(result["comments"]), 2)
        self.assertTrue(result["has_more"])
        self.assertEqual(result["total"], 5)

    def test_get_pinned_first(self):
        c1 = add_comment(**self._ref(), content="<p>Normal</p>")
        c2 = add_comment(**self._ref(), content="<p>Pinned</p>")
        pin_comment(c2["name"])
        result = get_comments(**self._ref())
        self.assertEqual(result["comments"][0]["name"], c2["name"])

    def test_get_enriches_user_info(self):
        add_comment(**self._ref(), content="<p>Test</p>")
        result = get_comments(**self._ref())
        comment = result["comments"][0]
        self.assertIn("user_fullname", comment)
        self.assertIn("user_image", comment)
        self.assertIn("reply_count", comment)

    # ------------------------------------------------------------------
    # get_replies
    # ------------------------------------------------------------------

    def test_get_replies_returns_children(self):
        parent = add_comment(**self._ref(), content="<p>Parent</p>")
        add_comment(**self._ref(), content="<p>Reply 1</p>", parent_comment=parent["name"])
        add_comment(**self._ref(), content="<p>Reply 2</p>", parent_comment=parent["name"])
        replies = get_replies(parent["name"])
        self.assertEqual(len(replies), 2)

    def test_get_replies_ordered_asc(self):
        parent = add_comment(**self._ref(), content="<p>Parent</p>")
        r1 = add_comment(**self._ref(), content="<p>First</p>", parent_comment=parent["name"])
        r2 = add_comment(**self._ref(), content="<p>Second</p>", parent_comment=parent["name"])
        replies = get_replies(parent["name"])
        self.assertEqual(replies[0]["name"], r1["name"])
        self.assertEqual(replies[1]["name"], r2["name"])

    # ------------------------------------------------------------------
    # delete_comment
    # ------------------------------------------------------------------

    def test_delete_removes_comment(self):
        c = add_comment(**self._ref(), content="<p>Delete me</p>")
        delete_comment(c["name"])
        self.assertFalse(frappe.db.exists("Dock Comment", c["name"]))

    def test_delete_cascades_replies(self):
        parent = add_comment(**self._ref(), content="<p>Parent</p>")
        reply = add_comment(**self._ref(), content="<p>Reply</p>", parent_comment=parent["name"])
        delete_comment(parent["name"])
        self.assertFalse(frappe.db.exists("Dock Comment", reply["name"]))

    # ------------------------------------------------------------------
    # resolve / unresolve
    # ------------------------------------------------------------------

    def test_resolve_sets_flags(self):
        c = add_comment(**self._ref(), content="<p>Test</p>")
        resolve_comment(c["name"])
        doc = frappe.get_doc("Dock Comment", c["name"])
        self.assertTrue(doc.is_resolved)
        self.assertEqual(doc.resolved_by, "Administrator")
        self.assertIsNotNone(doc.resolved_at)

    def test_unresolve_clears_flags(self):
        c = add_comment(**self._ref(), content="<p>Test</p>")
        resolve_comment(c["name"])
        unresolve_comment(c["name"])
        doc = frappe.get_doc("Dock Comment", c["name"])
        self.assertFalse(doc.is_resolved)
        self.assertIsNone(doc.resolved_by)
        self.assertIsNone(doc.resolved_at)

    # ------------------------------------------------------------------
    # pin / unpin
    # ------------------------------------------------------------------

    def test_pin_sets_flags(self):
        c = add_comment(**self._ref(), content="<p>Test</p>")
        pin_comment(c["name"])
        doc = frappe.get_doc("Dock Comment", c["name"])
        self.assertTrue(doc.is_pinned)
        self.assertEqual(doc.pinned_by, "Administrator")
        self.assertIsNotNone(doc.pinned_at)

    def test_pin_unpins_previous(self):
        c1 = add_comment(**self._ref(), content="<p>First</p>")
        c2 = add_comment(**self._ref(), content="<p>Second</p>")
        pin_comment(c1["name"])
        pin_comment(c2["name"])
        doc1 = frappe.get_doc("Dock Comment", c1["name"])
        doc2 = frappe.get_doc("Dock Comment", c2["name"])
        self.assertFalse(doc1.is_pinned)
        self.assertTrue(doc2.is_pinned)

    def test_unpin_clears_flags(self):
        c = add_comment(**self._ref(), content="<p>Test</p>")
        pin_comment(c["name"])
        unpin_comment(c["name"])
        doc = frappe.get_doc("Dock Comment", c["name"])
        self.assertFalse(doc.is_pinned)
        self.assertIsNone(doc.pinned_by)

    # ------------------------------------------------------------------
    # get_users_for_mention
    # ------------------------------------------------------------------

    def test_get_users_returns_list(self):
        users = get_users_for_mention()
        self.assertIsInstance(users, list)
        if users:
            self.assertIn("id", users[0])
            self.assertIn("label", users[0])

    def test_get_users_search_filter(self):
        users = get_users_for_mention(search="Administrator")
        emails = [u["id"] for u in users]
        self.assertIn("Administrator", emails)
