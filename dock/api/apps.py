# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import json

import frappe


MAX_PINNED_APPS = 6


@frappe.whitelist()
def pin_app(app: str):
    """Add an app to the current user's pinned apps list."""
    user = frappe.session.user
    pinned = _get_pinned(user)

    if app in pinned:
        return pinned

    if len(pinned) >= MAX_PINNED_APPS:
        frappe.throw(f"Maximum {MAX_PINNED_APPS} pinned apps allowed.")

    pinned.append(app)
    _save_pinned(user, pinned)
    return pinned


@frappe.whitelist()
def unpin_app(app: str):
    """Remove an app from the current user's pinned apps list."""
    user = frappe.session.user
    pinned = _get_pinned(user)

    if app not in pinned:
        return pinned

    pinned.remove(app)
    _save_pinned(user, pinned)
    return pinned


@frappe.whitelist()
def reorder_pinned_apps(order: str):
    """Reorder the pinned apps list. Expects a JSON array of app names."""
    user = frappe.session.user
    new_order = json.loads(order)

    if not isinstance(new_order, list):
        frappe.throw("Expected a JSON array of app names.")

    # Only keep apps that were already pinned
    current = set(_get_pinned(user))
    validated = [a for a in new_order if a in current][:MAX_PINNED_APPS]
    _save_pinned(user, validated)
    return validated


def _get_pinned(user: str) -> list:
    try:
        raw = frappe.db.get_value("Dock User Preference", user, "pinned_apps")
        if raw:
            parsed = json.loads(raw)
            if isinstance(parsed, list):
                return parsed[:MAX_PINNED_APPS]
    except Exception:
        pass
    return []


def _save_pinned(user: str, pinned: list):
    if not frappe.db.exists("Dock User Preference", user):
        doc = frappe.new_doc("Dock User Preference")
        doc.user = user
        doc.pinned_apps = json.dumps(pinned)
        doc.insert(ignore_permissions=True)
    else:
        frappe.db.set_value(
            "Dock User Preference", user, "pinned_apps",
            json.dumps(pinned),
            update_modified=False,
        )
    frappe.db.commit()
