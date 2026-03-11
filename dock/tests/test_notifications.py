# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
import frappe.tests.utils

from dock.api.notifications import publish, get_recent, get_list, mark_read, mark_all_read, delete


class TestNotifications(frappe.tests.utils.FrappeTestCase):
    def setUp(self):
        frappe.set_user("Administrator")
        frappe.db.delete("Dock Notification", {"for_user": "Administrator"})

    def tearDown(self):
        frappe.db.delete("Dock Notification", {"for_user": "Administrator"})
        frappe.set_user("Administrator")

    # ------------------------------------------------------------------
    # publish
    # ------------------------------------------------------------------

    def test_publish_creates_notification(self):
        name = publish(
            for_user="Administrator",
            from_app="orga",
            notification_type="task_assigned",
            title="You have a new task",
        )
        self.assertTrue(frappe.db.exists("Dock Notification", name))

    def test_publish_stores_all_fields(self):
        name = publish(
            for_user="Administrator",
            from_app="orga",
            notification_type="task_assigned",
            title="Task assigned",
            message="Review the spec",
            reference_doctype="Orga Task",
            reference_name="TASK-001",
            action_url="/orga/tasks/TASK-001",
        )
        doc = frappe.get_doc("Dock Notification", name)
        self.assertEqual(doc.from_app, "orga")
        self.assertEqual(doc.notification_type, "task_assigned")
        self.assertEqual(doc.message, "Review the spec")
        self.assertEqual(doc.reference_name, "TASK-001")
        self.assertEqual(doc.read, 0)

    # ------------------------------------------------------------------
    # get_recent
    # ------------------------------------------------------------------

    def test_get_recent_returns_notifications(self):
        publish(
            for_user="Administrator",
            from_app="orga",
            notification_type="task_assigned",
            title="Notif 1",
        )
        publish(
            for_user="Administrator",
            from_app="orga",
            notification_type="task_assigned",
            title="Notif 2",
        )
        items = get_recent()
        self.assertGreaterEqual(len(items), 2)

    def test_get_recent_respects_limit(self):
        for i in range(5):
            publish(
                for_user="Administrator",
                from_app="orga",
                notification_type="task_assigned",
                title=f"Notif {i}",
            )
        items = get_recent(limit=3)
        self.assertLessEqual(len(items), 3)

    # ------------------------------------------------------------------
    # get_list
    # ------------------------------------------------------------------

    def test_get_list_returns_paginated(self):
        for i in range(3):
            publish(
                for_user="Administrator",
                from_app="orga",
                notification_type="task_assigned",
                title=f"Notif {i}",
            )
        result = get_list(limit=2, offset=0)
        self.assertIn("items", result)
        self.assertIn("total", result)
        self.assertEqual(len(result["items"]), 2)
        self.assertEqual(result["total"], 3)

    def test_get_list_unread_only_filter(self):
        n = publish(
            for_user="Administrator",
            from_app="orga",
            notification_type="task_assigned",
            title="Unread",
        )
        mark_read([n])
        result = get_list(unread_only=True)
        names = [i["name"] for i in result["items"]]
        self.assertNotIn(n, names)

    # ------------------------------------------------------------------
    # mark_read
    # ------------------------------------------------------------------

    def test_mark_read_sets_flag(self):
        n = publish(
            for_user="Administrator",
            from_app="orga",
            notification_type="task_assigned",
            title="Mark me",
        )
        mark_read([n])
        doc = frappe.get_doc("Dock Notification", n)
        self.assertEqual(doc.read, 1)
        self.assertIsNotNone(doc.read_at)

    def test_mark_read_accepts_json_string(self):
        import json
        n = publish(
            for_user="Administrator",
            from_app="orga",
            notification_type="task_assigned",
            title="JSON test",
        )
        mark_read(json.dumps([n]))
        doc = frappe.get_doc("Dock Notification", n)
        self.assertEqual(doc.read, 1)

    # ------------------------------------------------------------------
    # mark_all_read
    # ------------------------------------------------------------------

    def test_mark_all_read(self):
        for i in range(3):
            publish(
                for_user="Administrator",
                from_app="orga",
                notification_type="task_assigned",
                title=f"Notif {i}",
            )
        mark_all_read()
        result = get_list(unread_only=True)
        self.assertEqual(result["total"], 0)

    def test_mark_all_read_with_app_filter(self):
        publish(
            for_user="Administrator",
            from_app="orga",
            notification_type="task_assigned",
            title="Orga notif",
        )
        publish(
            for_user="Administrator",
            from_app="micro",
            notification_type="invoice_overdue",
            title="Micro notif",
        )
        mark_all_read(app="orga")
        result = get_list(unread_only=True)
        # micro notification should still be unread
        names_unread_apps = [i["from_app"] for i in result["items"]]
        self.assertIn("micro", names_unread_apps)
        self.assertNotIn("orga", names_unread_apps)

    # ------------------------------------------------------------------
    # delete
    # ------------------------------------------------------------------

    def test_delete_removes_notifications(self):
        n1 = publish(
            for_user="Administrator",
            from_app="orga",
            notification_type="task_assigned",
            title="Delete me",
        )
        n2 = publish(
            for_user="Administrator",
            from_app="orga",
            notification_type="task_assigned",
            title="Delete me too",
        )
        delete([n1, n2])
        self.assertFalse(frappe.db.exists("Dock Notification", n1))
        self.assertFalse(frappe.db.exists("Dock Notification", n2))

    def test_delete_accepts_json_string(self):
        import json
        n = publish(
            for_user="Administrator",
            from_app="orga",
            notification_type="task_assigned",
            title="JSON delete",
        )
        delete(json.dumps([n]))
        self.assertFalse(frappe.db.exists("Dock Notification", n))
