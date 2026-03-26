# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

"""
Messages API — unified communication entry point (Feature #52).

Processes the dock_message_channels hook from all installed apps and
provides aggregated unread counts for the Messages icon badge.
"""

import frappe
from frappe import _

_REQUIRED_CHANNEL_FIELDS = {"key", "label", "app", "badge_method"}


def get_message_channels():
    """Collect dock_message_channels from all installed apps.

    Returns a sorted list of channel dicts. Deduplicates by key (first wins).
    Follows the same pattern as _get_notification_types() in boot.py.
    """
    installed_apps = frappe.get_installed_apps()
    channels = []
    seen_keys = set()

    for app in installed_apps:
        for decl in frappe.get_hooks("dock_message_channels", app_name=app):
            items = decl if isinstance(decl, list) else [decl]
            for item in items:
                if not isinstance(item, dict):
                    continue
                # Unwrap Frappe's list normalization for single-value keys
                unwrapped = {
                    k: v[0] if isinstance(v, list) and len(v) == 1 else v
                    for k, v in item.items()
                }
                missing = _REQUIRED_CHANNEL_FIELDS - set(unwrapped.keys())
                if missing:
                    frappe.log_error(
                        f"dock: {app} dock_message_channels entry missing fields: {missing}",
                        "Dock Hook Validation",
                    )
                    continue
                key = unwrapped["key"]
                if key in seen_keys:
                    frappe.log_error(
                        f"dock: {app} dock_message_channels duplicate key '{key}' — skipped",
                        "Dock Hook Validation",
                    )
                    continue
                seen_keys.add(key)
                channels.append(unwrapped)

    channels.sort(key=lambda c: c.get("sort_order", 99))
    return channels


@frappe.whitelist()
def get_unread_counts() -> dict:
    """Aggregate unread counts from all registered message channels.

    Calls each channel's badge_method and returns a combined result.

    Returns:
        {
            "total": 7,
            "channels": {
                "discussions": 4,
                "inbox": 3,
            }
        }
    """
    channels = get_message_channels()
    counts = {}
    total = 0

    for channel in channels:
        badge_method = channel.get("badge_method")
        if not badge_method:
            continue
        try:
            count = frappe.call(badge_method) or 0
            count = int(count)
        except Exception:
            frappe.log_error(
                f"dock: failed to call badge_method '{badge_method}' for channel '{channel['key']}'",
                "Dock Messages Badge",
            )
            count = 0
        counts[channel["key"]] = count
        total += count

    return {"total": total, "channels": counts}
