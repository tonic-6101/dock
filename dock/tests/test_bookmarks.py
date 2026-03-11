# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
import frappe.tests.utils

from dock.api.bookmarks import add, remove, get, reorder, _MAX_BOOKMARKS


class TestBookmarks(frappe.tests.utils.FrappeTestCase):
    def setUp(self):
        frappe.set_user("Administrator")
        frappe.db.delete("Dock Bookmark", {"user": "Administrator"})

    def tearDown(self):
        frappe.db.delete("Dock Bookmark", {"user": "Administrator"})
        frappe.set_user("Administrator")

    # ------------------------------------------------------------------
    # add
    # ------------------------------------------------------------------

    def test_add_creates_bookmark(self):
        name = add(app="orga", doctype="Orga Project", docname="PROJ-001", label="Project 1")
        self.assertTrue(frappe.db.exists("Dock Bookmark", name))

    def test_add_is_idempotent(self):
        name1 = add(app="orga", doctype="Orga Project", docname="PROJ-001", label="Project 1")
        name2 = add(app="orga", doctype="Orga Project", docname="PROJ-001", label="Project 1")
        self.assertEqual(name1, name2)
        count = frappe.db.count("Dock Bookmark", {"user": "Administrator"})
        self.assertEqual(count, 1)

    def test_add_sets_sort_order(self):
        add(app="orga", doctype="Orga Project", docname="PROJ-001", label="P1")
        add(app="orga", doctype="Orga Project", docname="PROJ-002", label="P2")
        items = get()
        self.assertEqual(items[0]["sort_order"], 0)
        self.assertEqual(items[1]["sort_order"], 1)

    def test_add_raises_at_limit(self):
        for i in range(_MAX_BOOKMARKS):
            add(app="orga", doctype="Orga Project", docname=f"PROJ-{i:03d}", label=f"P{i}")
        with self.assertRaises(frappe.ValidationError):
            add(app="orga", doctype="Orga Project", docname=f"PROJ-{_MAX_BOOKMARKS:03d}", label="Over limit")

    # ------------------------------------------------------------------
    # remove
    # ------------------------------------------------------------------

    def test_remove_deletes_bookmark(self):
        name = add(app="orga", doctype="Orga Project", docname="PROJ-001", label="P1")
        remove(name)
        self.assertFalse(frappe.db.exists("Dock Bookmark", name))

    # ------------------------------------------------------------------
    # get
    # ------------------------------------------------------------------

    def test_get_returns_user_bookmarks(self):
        add(app="orga", doctype="Orga Project", docname="PROJ-001", label="P1")
        add(app="orga", doctype="Orga Project", docname="PROJ-002", label="P2")
        items = get()
        self.assertEqual(len(items), 2)
        self.assertIn("name", items[0])
        self.assertIn("label", items[0])

    def test_get_returns_empty_when_none(self):
        items = get()
        self.assertEqual(items, [])

    # ------------------------------------------------------------------
    # reorder
    # ------------------------------------------------------------------

    def test_reorder_updates_sort_order(self):
        n1 = add(app="orga", doctype="Orga Project", docname="PROJ-001", label="P1")
        n2 = add(app="orga", doctype="Orga Project", docname="PROJ-002", label="P2")
        n3 = add(app="orga", doctype="Orga Project", docname="PROJ-003", label="P3")
        # Reverse order
        reorder([n3, n2, n1])
        items = get()
        names_in_order = [i["name"] for i in items]
        self.assertEqual(names_in_order, [n3, n2, n1])

    def test_reorder_rejects_foreign_names(self):
        add(app="orga", doctype="Orga Project", docname="PROJ-001", label="P1")
        with self.assertRaises(frappe.PermissionError):
            reorder(["fake-bookmark-name-that-does-not-belong"])

    def test_reorder_accepts_json_string(self):
        import json
        n1 = add(app="orga", doctype="Orga Project", docname="PROJ-001", label="P1")
        n2 = add(app="orga", doctype="Orga Project", docname="PROJ-002", label="P2")
        reorder(json.dumps([n2, n1]))  # Pass as JSON string (as Frappe would from HTTP)
        items = get()
        self.assertEqual(items[0]["name"], n2)
