# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe


def after_app_install(app_name: str):
    """Clear bootinfo cache so the newly installed app's dock_app_registry is picked up immediately."""
    frappe.cache.delete_keys("bootinfo")


def after_app_uninstall(app_name: str):
    """Clear bootinfo cache so the removed app disappears from the app switcher."""
    frappe.cache.delete_keys("bootinfo")
