# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
import frappe.tests.utils

from dock.api.reaction import toggle_reaction, get_reactions


class TestDockReaction(frappe.tests.utils.FrappeTestCase):
    def setUp(self):
        frappe.set_user("Administrator")
        frappe.db.delete("Dock Reaction", {})

    def tearDown(self):
        frappe.db.delete("Dock Reaction", {})
        frappe.set_user("Administrator")

    def _ref(self):
        return {"reference_doctype": "DocType", "reference_name": "User"}

    # ------------------------------------------------------------------
    # toggle_reaction
    # ------------------------------------------------------------------

    def test_toggle_creates_reaction(self):
        result = toggle_reaction(**self._ref(), reaction_type="acknowledge")
        self.assertEqual(result["acknowledge"]["count"], 1)
        self.assertTrue(result["acknowledge"]["current_user"])

    def test_toggle_removes_existing(self):
        toggle_reaction(**self._ref(), reaction_type="acknowledge")
        result = toggle_reaction(**self._ref(), reaction_type="acknowledge")
        self.assertEqual(result["acknowledge"]["count"], 0)
        self.assertFalse(result["acknowledge"]["current_user"])

    def test_toggle_different_types_independent(self):
        toggle_reaction(**self._ref(), reaction_type="acknowledge")
        result = toggle_reaction(**self._ref(), reaction_type="celebrate")
        self.assertEqual(result["acknowledge"]["count"], 1)
        self.assertEqual(result["celebrate"]["count"], 1)

    # ------------------------------------------------------------------
    # get_reactions
    # ------------------------------------------------------------------

    def test_get_returns_all_types(self):
        result = get_reactions(**self._ref())
        for key in ("acknowledge", "celebrate", "seen", "flag"):
            self.assertIn(key, result)
            self.assertEqual(result[key]["count"], 0)
            self.assertFalse(result[key]["current_user"])
            self.assertEqual(result[key]["users"], [])

    def test_get_returns_correct_counts(self):
        toggle_reaction(**self._ref(), reaction_type="celebrate")
        toggle_reaction(**self._ref(), reaction_type="flag")
        result = get_reactions(**self._ref())
        self.assertEqual(result["celebrate"]["count"], 1)
        self.assertEqual(result["flag"]["count"], 1)
        self.assertEqual(result["acknowledge"]["count"], 0)
        self.assertEqual(result["seen"]["count"], 0)

    def test_get_includes_user_list(self):
        toggle_reaction(**self._ref(), reaction_type="seen")
        result = get_reactions(**self._ref())
        self.assertIn("Administrator", result["seen"]["users"])
