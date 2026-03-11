# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
import frappe.tests.utils

from dock.api.guest import (
    create_session,
    validate_token,
    revoke_session,
    get_sessions,
    log_activity,
    _generate_token,
    _token_is_valid,
)


class TestGuest(frappe.tests.utils.FrappeTestCase):
    def setUp(self):
        frappe.set_user("Administrator")
        # Ensure Dock Settings exists
        if not frappe.db.exists("Dock Settings"):
            frappe.get_doc({"doctype": "Dock Settings"}).insert(ignore_permissions=True)

    def tearDown(self):
        frappe.db.delete("Dock Guest Activity", {})
        frappe.db.delete("Dock Guest Session", {})
        frappe.set_user("Administrator")

    # ------------------------------------------------------------------
    # _generate_token
    # ------------------------------------------------------------------

    def test_generate_token_format(self):
        token = _generate_token()
        self.assertTrue(token.startswith("dgs_"))
        self.assertGreater(len(token), 10)

    def test_generate_token_unique(self):
        tokens = {_generate_token() for _ in range(50)}
        self.assertEqual(len(tokens), 50)

    # ------------------------------------------------------------------
    # _token_is_valid
    # ------------------------------------------------------------------

    def test_token_is_valid_active(self):
        doc = frappe.get_doc({
            "doctype": "Dock Guest Session",
            "token": _generate_token(),
            "view_id": "test_view",
            "source_app": "test",
            "source_doctype": "Test",
            "source_name": "TEST-001",
            "label": "Test",
            "created_by": "Administrator",
            "is_active": 1,
            "expires_at": None,
        })
        doc.insert(ignore_permissions=True)
        valid, reason = _token_is_valid(doc)
        self.assertTrue(valid)
        self.assertEqual(reason, "ok")

    def test_token_is_valid_revoked(self):
        doc = frappe.get_doc({
            "doctype": "Dock Guest Session",
            "token": _generate_token(),
            "view_id": "test_view",
            "source_app": "test",
            "source_doctype": "Test",
            "source_name": "TEST-001",
            "label": "Test",
            "created_by": "Administrator",
            "is_active": 0,
        })
        doc.insert(ignore_permissions=True)
        valid, reason = _token_is_valid(doc)
        self.assertFalse(valid)
        self.assertEqual(reason, "revoked")

    def test_token_is_valid_expired(self):
        past = frappe.utils.add_days(frappe.utils.now_datetime(), -1)
        doc = frappe.get_doc({
            "doctype": "Dock Guest Session",
            "token": _generate_token(),
            "view_id": "test_view",
            "source_app": "test",
            "source_doctype": "Test",
            "source_name": "TEST-001",
            "label": "Test",
            "created_by": "Administrator",
            "is_active": 1,
            "expires_at": past,
        })
        doc.insert(ignore_permissions=True)
        valid, reason = _token_is_valid(doc)
        self.assertFalse(valid)
        self.assertEqual(reason, "expired")

    # ------------------------------------------------------------------
    # create_session
    # ------------------------------------------------------------------

    def test_create_session_returns_token_and_url(self):
        result = create_session(
            view_id="orga_project",
            source_app="orga",
            source_doctype="Orga Project",
            source_name="TEST-001",
            label="Test Project",
            expires_in_days=7,
        )
        self.assertIn("token", result)
        self.assertIn("url", result)
        self.assertIn("session_name", result)
        self.assertTrue(result["token"].startswith("dgs_"))
        self.assertIn("/dock/guest/", result["url"])
        self.assertIsNotNone(result["expires_at"])

    def test_create_session_no_expiry(self):
        result = create_session(
            view_id="orga_project",
            source_app="orga",
            source_doctype="Orga Project",
            source_name="TEST-002",
            label="Test Project",
            expires_in_days=0,
        )
        self.assertIsNone(result["expires_at"])

    def test_create_session_stored_in_db(self):
        result = create_session(
            view_id="orga_project",
            source_app="orga",
            source_doctype="Orga Project",
            source_name="TEST-003",
            label="Test Project",
            expires_in_days=30,
        )
        doc = frappe.get_doc("Dock Guest Session", result["session_name"])
        self.assertEqual(doc.token, result["token"])
        self.assertEqual(doc.source_name, "TEST-003")
        self.assertEqual(doc.is_active, 1)

    # ------------------------------------------------------------------
    # validate_token
    # ------------------------------------------------------------------

    def test_validate_token_valid(self):
        result = create_session(
            view_id="orga_project",
            source_app="orga",
            source_doctype="Orga Project",
            source_name="TEST-004",
            label="Test Project",
            expires_in_days=7,
        )
        resp = validate_token(result["token"])
        self.assertTrue(resp["valid"])
        self.assertEqual(resp["view_id"], "orga_project")
        self.assertEqual(resp["source_name"], "TEST-004")

    def test_validate_token_not_found(self):
        resp = validate_token("dgs_does_not_exist_at_all_12345")
        self.assertFalse(resp["valid"])
        self.assertEqual(resp["reason"], "not_found")

    def test_validate_token_revoked(self):
        result = create_session(
            view_id="orga_project",
            source_app="orga",
            source_doctype="Orga Project",
            source_name="TEST-005",
            label="Test Project",
            expires_in_days=7,
        )
        revoke_session(result["session_name"])
        resp = validate_token(result["token"])
        self.assertFalse(resp["valid"])
        self.assertEqual(resp["reason"], "revoked")

    # ------------------------------------------------------------------
    # revoke_session
    # ------------------------------------------------------------------

    def test_revoke_session(self):
        result = create_session(
            view_id="orga_project",
            source_app="orga",
            source_doctype="Orga Project",
            source_name="TEST-006",
            label="Test Project",
            expires_in_days=7,
        )
        resp = revoke_session(result["session_name"])
        self.assertTrue(resp["revoked"])
        doc = frappe.get_doc("Dock Guest Session", result["session_name"])
        self.assertEqual(doc.is_active, 0)

    def test_revoke_session_permission_denied_for_other_user(self):
        result = create_session(
            view_id="orga_project",
            source_app="orga",
            source_doctype="Orga Project",
            source_name="TEST-007",
            label="Test Project",
            expires_in_days=7,
        )
        # Try revoking as a different user (Guest has no Dock Manager role)
        frappe.set_user("Guest")
        with self.assertRaises(frappe.PermissionError):
            revoke_session(result["session_name"])
        frappe.set_user("Administrator")

    # ------------------------------------------------------------------
    # get_sessions
    # ------------------------------------------------------------------

    def test_get_sessions_returns_list(self):
        create_session(
            view_id="orga_project",
            source_app="orga",
            source_doctype="Orga Project",
            source_name="TEST-008",
            label="Test Project",
            expires_in_days=7,
        )
        result = get_sessions()
        self.assertIn("items", result)
        self.assertIn("total", result)
        self.assertGreaterEqual(len(result["items"]), 1)

    def test_get_sessions_includes_token_field(self):
        r = create_session(
            view_id="orga_project",
            source_app="orga",
            source_doctype="Orga Project",
            source_name="TEST-009",
            label="Token Field Test",
            expires_in_days=7,
        )
        sessions = get_sessions()
        match = next((s for s in sessions["items"] if s["name"] == r["session_name"]), None)
        self.assertIsNotNone(match)
        self.assertEqual(match["token"], r["token"])

    # ------------------------------------------------------------------
    # log_activity
    # ------------------------------------------------------------------

    def test_log_activity_creates_record(self):
        result = create_session(
            view_id="orga_project",
            source_app="orga",
            source_doctype="Orga Project",
            source_name="TEST-010",
            label="Activity Test",
            expires_in_days=7,
        )
        log_activity(token=result["token"], event_type="viewed")
        count = frappe.db.count("Dock Guest Activity", {"session": result["session_name"]})
        self.assertEqual(count, 1)

    def test_log_activity_updates_last_accessed_at(self):
        result = create_session(
            view_id="orga_project",
            source_app="orga",
            source_doctype="Orga Project",
            source_name="TEST-011",
            label="Activity Test 2",
            expires_in_days=7,
        )
        log_activity(token=result["token"], event_type="viewed")
        last = frappe.db.get_value(
            "Dock Guest Session", result["session_name"], "last_accessed_at"
        )
        self.assertIsNotNone(last)

    def test_log_activity_ignores_invalid_token(self):
        # Should not raise, should just be a no-op
        log_activity(token="dgs_invalid_token_xyz", event_type="viewed")
        count = frappe.db.count("Dock Guest Activity", {})
        self.assertEqual(count, 0)
