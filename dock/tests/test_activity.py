# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
import frappe.tests.utils

from dock.api.activity import get_activity_feed


class TestDockActivity(frappe.tests.utils.FrappeTestCase):
    def setUp(self):
        frappe.set_user("Administrator")

    def tearDown(self):
        frappe.set_user("Administrator")

    # ------------------------------------------------------------------
    # get_activity_feed
    # ------------------------------------------------------------------

    def test_feed_returns_structure(self):
        result = get_activity_feed()
        self.assertIn("items", result)
        self.assertIn("has_more", result)
        self.assertIn("total", result)
        self.assertIsInstance(result["items"], list)

    def test_feed_empty_when_no_sources(self):
        # With no matching source doctypes, should return empty
        result = get_activity_feed(app="nonexistent_app_xyz")
        self.assertEqual(result["items"], [])
        self.assertEqual(result["total"], 0)

    def test_feed_respects_limit(self):
        result = get_activity_feed(limit=5)
        self.assertLessEqual(len(result["items"]), 5)

    def test_feed_filters_by_user(self):
        result = get_activity_feed(user="Administrator")
        for item in result["items"]:
            self.assertEqual(item["user"], "Administrator")

    def test_feed_filters_by_date_range(self):
        from frappe.utils import today, add_days
        result = get_activity_feed(
            date_from=add_days(today(), -7),
            date_to=today(),
        )
        self.assertIn("items", result)

    def test_feed_filters_by_activity_type(self):
        result = get_activity_feed(activity_type="create")
        for item in result["items"]:
            self.assertIn(item["type"], ("create", "insert"))

    def test_feed_pagination(self):
        result = get_activity_feed(limit=2, offset=0)
        self.assertLessEqual(len(result["items"]), 2)
