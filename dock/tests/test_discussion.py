# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
import frappe.tests.utils

from dock.api.discussion import (
    create_discussion,
    get_discussion,
    list_discussions,
    resolve_discussion,
    reopen_discussion,
    mark_read,
)


class TestDockDiscussion(frappe.tests.utils.FrappeTestCase):
    def setUp(self):
        frappe.set_user("Administrator")
        frappe.db.delete("Dock Discussion Participant", {})
        frappe.db.delete("Dock Discussion Link", {})
        frappe.db.delete("Dock Comment", {})
        frappe.db.delete("Dock Discussion", {})

    def tearDown(self):
        frappe.db.delete("Dock Discussion Participant", {})
        frappe.db.delete("Dock Discussion Link", {})
        frappe.db.delete("Dock Comment", {})
        frappe.db.delete("Dock Discussion", {})
        frappe.set_user("Administrator")

    # ------------------------------------------------------------------
    # create_discussion
    # ------------------------------------------------------------------

    def test_create_basic(self):
        d = create_discussion(title="Test Discussion", content="<p>Body</p>")
        self.assertTrue(frappe.db.exists("Dock Discussion", d["name"]))
        self.assertEqual(d["title"], "Test Discussion")
        self.assertEqual(d["status"], "Open")
        self.assertEqual(d["discussion_type"], "General")
        self.assertEqual(d["created_by"], "Administrator")

    def test_create_with_type(self):
        d = create_discussion(
            title="Architecture Decision",
            content="<p>REST vs GraphQL</p>",
            discussion_type="Decision",
        )
        self.assertEqual(d["discussion_type"], "Decision")

    def test_create_adds_author_as_participant(self):
        d = create_discussion(title="Test", content="<p>Body</p>")
        participants = frappe.get_all(
            "Dock Discussion Participant",
            filters={"parent": d["name"]},
            fields=["user", "role"],
        )
        author = [p for p in participants if p["role"] == "Author"]
        self.assertEqual(len(author), 1)
        self.assertEqual(author[0]["user"], "Administrator")

    def test_create_with_linked_records(self):
        import json
        d = create_discussion(
            title="Cross-record",
            content="<p>Linking</p>",
            linked_records=json.dumps([{"doctype": "DocType", "name": "User"}]),
        )
        links = frappe.get_all(
            "Dock Discussion Link",
            filters={"parent": d["name"]},
            fields=["reference_doctype", "reference_name"],
        )
        self.assertEqual(len(links), 1)
        self.assertEqual(links[0]["reference_doctype"], "DocType")
        self.assertEqual(links[0]["reference_name"], "User")

    def test_create_with_source_app(self):
        d = create_discussion(
            title="From Orga",
            content="<p>Body</p>",
            source_app="orga",
        )
        self.assertEqual(d.get("source_app"), "orga")

    # ------------------------------------------------------------------
    # get_discussion
    # ------------------------------------------------------------------

    def test_get_returns_full_object(self):
        created = create_discussion(title="Get Test", content="<p>Body</p>")
        d = get_discussion(created["name"])
        self.assertEqual(d["title"], "Get Test")
        self.assertIn("participants", d)
        self.assertIn("linked_records", d)
        self.assertIn("reply_count", d)

    # ------------------------------------------------------------------
    # list_discussions
    # ------------------------------------------------------------------

    def test_list_returns_open_by_default(self):
        create_discussion(title="Open 1", content="<p>A</p>")
        create_discussion(title="Open 2", content="<p>B</p>")
        result = list_discussions()
        self.assertEqual(result["total"], 2)

    def test_list_filters_by_status(self):
        d = create_discussion(title="To Resolve", content="<p>Body</p>")
        resolve_discussion(d["name"], resolved_summary="Done")
        open_result = list_discussions(status="Open")
        resolved_result = list_discussions(status="Resolved")
        self.assertEqual(open_result["total"], 0)
        self.assertEqual(resolved_result["total"], 1)

    def test_list_filters_by_type(self):
        create_discussion(title="General", content="<p>A</p>", discussion_type="General")
        create_discussion(title="Decision", content="<p>B</p>", discussion_type="Decision")
        result = list_discussions(discussion_type="Decision")
        self.assertEqual(result["total"], 1)
        self.assertEqual(result["discussions"][0]["title"], "Decision")

    def test_list_pagination(self):
        for i in range(5):
            create_discussion(title=f"D{i}", content=f"<p>{i}</p>")
        result = list_discussions(limit=2, offset=0)
        self.assertEqual(len(result["discussions"]), 2)
        self.assertTrue(result["has_more"])

    # ------------------------------------------------------------------
    # resolve / reopen
    # ------------------------------------------------------------------

    def test_resolve_sets_status(self):
        d = create_discussion(title="Resolve Me", content="<p>Body</p>")
        resolve_discussion(d["name"], resolved_summary="Decided: use REST")
        doc = frappe.get_doc("Dock Discussion", d["name"])
        self.assertEqual(doc.status, "Resolved")
        self.assertEqual(doc.resolved_summary, "Decided: use REST")
        self.assertEqual(doc.resolved_by, "Administrator")
        self.assertIsNotNone(doc.resolved_at)

    def test_reopen_clears_resolution(self):
        d = create_discussion(title="Reopen Me", content="<p>Body</p>")
        resolve_discussion(d["name"], resolved_summary="Done")
        reopen_discussion(d["name"])
        doc = frappe.get_doc("Dock Discussion", d["name"])
        self.assertEqual(doc.status, "Open")

    # ------------------------------------------------------------------
    # mark_read
    # ------------------------------------------------------------------

    def test_mark_read_updates_participant(self):
        d = create_discussion(title="Read Test", content="<p>Body</p>")
        mark_read(d["name"])
        participant = frappe.get_value(
            "Dock Discussion Participant",
            {"parent": d["name"], "user": "Administrator"},
            "last_read_at",
        )
        self.assertIsNotNone(participant)
