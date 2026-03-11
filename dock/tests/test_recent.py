# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
import frappe.tests.utils

from dock.api.recent import track, get, remove, clear


class TestRecent(frappe.tests.utils.FrappeTestCase):
    def setUp(self):
        frappe.set_user("Administrator")
        frappe.db.delete("Dock Recent Item", {"user": "Administrator"})
        # Ensure recent items are enabled in Dock Settings
        if not frappe.db.exists("Dock Settings"):
            frappe.get_doc({"doctype": "Dock Settings"}).insert(ignore_permissions=True)
        frappe.db.set_single_value("Dock Settings", "enable_recent_items", 1)
        frappe.db.set_single_value("Dock Settings", "recent_items_limit", 20)

    def tearDown(self):
        frappe.db.delete("Dock Recent Item", {"user": "Administrator"})
        frappe.set_user("Administrator")

    # ------------------------------------------------------------------
    # track
    # ------------------------------------------------------------------

    def test_track_creates_item(self):
        track(app="orga", doctype="Orga Project", docname="PROJ-001", label="Project 1")
        count = frappe.db.count("Dock Recent Item", {"user": "Administrator"})
        self.assertEqual(count, 1)

    def test_track_upserts_existing(self):
        track(app="orga", doctype="Orga Project", docname="PROJ-001", label="Project 1")
        track(app="orga", doctype="Orga Project", docname="PROJ-001", label="Project 1 Updated")
        count = frappe.db.count("Dock Recent Item", {"user": "Administrator"})
        self.assertEqual(count, 1)
        items = get()
        self.assertEqual(items[0]["label"], "Project 1 Updated")

    def test_track_noop_when_disabled(self):
        frappe.db.set_single_value("Dock Settings", "enable_recent_items", 0)
        track(app="orga", doctype="Orga Project", docname="PROJ-001", label="Project 1")
        count = frappe.db.count("Dock Recent Item", {"user": "Administrator"})
        self.assertEqual(count, 0)

    def test_track_trims_to_limit(self):
        frappe.db.set_single_value("Dock Settings", "recent_items_limit", 3)
        for i in range(5):
            track(app="orga", doctype="Orga Project", docname=f"PROJ-{i:03d}", label=f"P{i}")
        count = frappe.db.count("Dock Recent Item", {"user": "Administrator"})
        self.assertLessEqual(count, 3)

    # ------------------------------------------------------------------
    # get
    # ------------------------------------------------------------------

    def test_get_returns_items_newest_first(self):
        track(app="orga", doctype="Orga Project", docname="PROJ-001", label="P1")
        track(app="orga", doctype="Orga Project", docname="PROJ-002", label="P2")
        items = get()
        self.assertGreaterEqual(len(items), 2)
        # Most recent (PROJ-002) should be first
        self.assertEqual(items[0]["docname"], "PROJ-002")

    def test_get_returns_empty_when_disabled(self):
        frappe.db.set_single_value("Dock Settings", "enable_recent_items", 0)
        track(app="orga", doctype="Orga Project", docname="PROJ-001", label="P1")
        items = get()
        self.assertEqual(items, [])

    # ------------------------------------------------------------------
    # remove
    # ------------------------------------------------------------------

    def test_remove_deletes_item(self):
        track(app="orga", doctype="Orga Project", docname="PROJ-001", label="P1")
        items = get()
        self.assertEqual(len(items), 1)
        remove(items[0]["name"])
        self.assertEqual(len(get()), 0)

    def test_remove_rejects_other_user_item(self):
        track(app="orga", doctype="Orga Project", docname="PROJ-001", label="P1")
        item_name = get()[0]["name"]
        frappe.set_user("Guest")
        with self.assertRaises(frappe.PermissionError):
            remove(item_name)
        frappe.set_user("Administrator")

    # ------------------------------------------------------------------
    # clear
    # ------------------------------------------------------------------

    def test_clear_removes_all_user_items(self):
        track(app="orga", doctype="Orga Project", docname="PROJ-001", label="P1")
        track(app="orga", doctype="Orga Project", docname="PROJ-002", label="P2")
        clear()
        self.assertEqual(len(get()), 0)
