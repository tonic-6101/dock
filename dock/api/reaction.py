# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe


@frappe.whitelist()
def toggle_reaction(
    reference_doctype: str,
    reference_name: str,
    reaction_type: str,
) -> dict:
    """Toggle a reaction. Creates if not exists, deletes if exists. Returns updated summary."""
    user = frappe.session.user
    existing = frappe.db.get_value("Dock Reaction", {
        "reference_doctype": reference_doctype,
        "reference_name": reference_name,
        "user": user,
        "reaction_type": reaction_type,
    })
    if existing:
        frappe.delete_doc("Dock Reaction", existing, force=True)
    else:
        frappe.get_doc({
            "doctype": "Dock Reaction",
            "reference_doctype": reference_doctype,
            "reference_name": reference_name,
            "user": user,
            "reaction_type": reaction_type,
        }).insert(ignore_permissions=True)

    return get_reactions(reference_doctype, reference_name)


@frappe.whitelist()
def get_reactions(
    reference_doctype: str,
    reference_name: str,
) -> dict:
    """Get reaction summary grouped by type with counts and user lists."""
    reactions = frappe.get_all(
        "Dock Reaction",
        filters={
            "reference_doctype": reference_doctype,
            "reference_name": reference_name,
        },
        fields=["reaction_type", "user"],
    )

    current_user = frappe.session.user
    summary = {}
    for r_type in ("acknowledge", "celebrate", "seen", "flag"):
        users = [r["user"] for r in reactions if r["reaction_type"] == r_type]
        summary[r_type] = {
            "count": len(users),
            "users": users,
            "current_user": current_user in users,
        }
    return summary
