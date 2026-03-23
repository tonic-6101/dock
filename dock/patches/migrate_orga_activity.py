# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic
#
# Migration patch: Orga Activity → Dock Comment/Reaction
#
# Migrates:
#   Orga Activity Comment       → Dock Comment
#   Orga Activity Comment Mention → Dock Comment Mention (child table)
#   Orga Activity Reaction      → Dock Reaction
#
# This patch is idempotent — safe to run multiple times.
# It skips if Orga is not installed or source tables don't exist.

import frappe


BATCH_SIZE = 500


def execute():
    # Guard: skip if Orga's activity doctypes don't exist
    if not frappe.db.exists("DocType", "Orga Activity Comment"):
        print("Orga Activity Comment DocType not found — skipping migration")
        return

    if not frappe.db.sql("SHOW TABLES LIKE 'tabOrga Activity Comment'"):
        print("tabOrga Activity Comment table not found — skipping migration")
        return

    source_count = frappe.db.count("Orga Activity Comment")
    if source_count == 0:
        print("No Orga Activity Comment records to migrate")
        _migrate_reactions()
        return

    print(f"Migrating {source_count} Orga Activity Comment records → Dock Comment")

    # Phase 1: Migrate comments (top-level first, then replies)
    name_map = {}  # old_name → new_name (for parent_comment remapping)

    # Top-level comments (no parent_comment)
    _migrate_comments_batch(
        filters={"parent_comment": ("is", "not set")},
        name_map=name_map,
        label="top-level",
    )

    # Threaded replies (have parent_comment)
    _migrate_comments_batch(
        filters={"parent_comment": ("is", "set")},
        name_map=name_map,
        label="replies",
    )

    # Phase 2: Remap parent_comment references in migrated Dock Comments
    _remap_parent_comments(name_map)

    # Phase 3: Migrate reactions
    _migrate_reactions()

    frappe.db.commit()
    print("Migration complete!")


def _migrate_comments_batch(filters, name_map, label):
    """Migrate Orga Activity Comments matching filters to Dock Comment."""
    offset = 0
    migrated = 0

    while True:
        comments = frappe.get_all(
            "Orga Activity Comment",
            filters=filters,
            fields=[
                "name", "reference_doctype", "reference_name",
                "content", "user", "parent_comment",
                "note_type", "visibility",
                "is_resolved", "resolved_by", "resolved_at",
                "is_pinned", "pinned_by", "pinned_at",
                "creation", "modified", "owner",
            ],
            limit_page_length=BATCH_SIZE,
            limit_start=offset,
            order_by="creation ASC",
        )
        if not comments:
            break

        for c in comments:
            # Skip if already migrated (idempotent check)
            existing = frappe.db.exists("Dock Comment", {
                "reference_doctype": c.reference_doctype,
                "reference_name": c.reference_name,
                "user": c.user,
                "creation": c.creation,
            })
            if existing:
                name_map[c.name] = existing
                continue

            # Map note_type: Orga has Due Diligence/Offer which Dock maps to Note
            note_type = _map_note_type(c.note_type)

            doc = frappe.get_doc({
                "doctype": "Dock Comment",
                "reference_doctype": c.reference_doctype,
                "reference_name": c.reference_name,
                "content": c.content,
                "user": c.user,
                "parent_comment": c.parent_comment,  # Will be remapped later
                "note_type": note_type,
                "visibility": c.visibility or "Team",
                "is_resolved": c.is_resolved,
                "resolved_by": c.resolved_by,
                "resolved_at": c.resolved_at,
                "is_pinned": c.is_pinned,
                "pinned_by": c.pinned_by,
                "pinned_at": c.pinned_at,
            })

            # Preserve original timestamps
            doc.flags.ignore_permissions = True
            doc.flags.ignore_validate = True
            doc.insert(ignore_permissions=True)

            # Overwrite creation/modified to preserve original dates
            frappe.db.set_value(
                "Dock Comment", doc.name,
                {"creation": c.creation, "modified": c.modified},
                update_modified=False,
            )

            name_map[c.name] = doc.name

            # Migrate mentions for this comment
            _migrate_mentions(c.name, doc.name)

            migrated += 1

        offset += BATCH_SIZE

        if migrated % 100 == 0 and migrated > 0:
            frappe.db.commit()
            print(f"  ... migrated {migrated} {label} comments")

    print(f"  Migrated {migrated} {label} comments")


def _migrate_mentions(old_comment_name, new_comment_name):
    """Migrate Orga Activity Comment Mention → Dock Comment Mention."""
    if not frappe.db.sql("SHOW TABLES LIKE 'tabOrga Activity Comment Mention'"):
        return

    mentions = frappe.get_all(
        "Orga Activity Comment Mention",
        filters={"parent": old_comment_name},
        fields=["user"],
    )

    for m in mentions:
        # Check if already exists
        existing = frappe.db.exists("Dock Comment Mention", {
            "parent": new_comment_name,
            "user": m.user,
        })
        if existing:
            continue

        frappe.db.sql("""
            INSERT INTO `tabDock Comment Mention`
            (name, parent, parenttype, parentfield, idx, user)
            VALUES (%s, %s, 'Dock Comment', 'mentions',
                    (SELECT COALESCE(MAX(idx), 0) + 1 FROM `tabDock Comment Mention` dcm
                     WHERE dcm.parent = %s),
                    %s)
        """, (frappe.generate_hash(length=10), new_comment_name, new_comment_name, m.user))


def _remap_parent_comments(name_map):
    """Update parent_comment references from old Orga names to new Dock names."""
    remapped = 0
    for old_name, new_name in name_map.items():
        # Find Dock Comments that reference the old name as parent_comment
        children = frappe.get_all(
            "Dock Comment",
            filters={"parent_comment": old_name},
            pluck="name",
        )
        for child_name in children:
            frappe.db.set_value(
                "Dock Comment", child_name,
                "parent_comment", new_name,
                update_modified=False,
            )
            remapped += 1

    if remapped:
        print(f"  Remapped {remapped} parent_comment references")


def _migrate_reactions():
    """Migrate Orga Activity Reaction → Dock Reaction."""
    if not frappe.db.exists("DocType", "Orga Activity Reaction"):
        return
    if not frappe.db.sql("SHOW TABLES LIKE 'tabOrga Activity Reaction'"):
        return

    source_count = frappe.db.count("Orga Activity Reaction")
    if source_count == 0:
        print("No Orga Activity Reaction records to migrate")
        return

    print(f"Migrating {source_count} Orga Activity Reaction records → Dock Reaction")

    offset = 0
    migrated = 0

    while True:
        reactions = frappe.get_all(
            "Orga Activity Reaction",
            fields=["reference_doctype", "reference_name", "user", "reaction_type"],
            limit_page_length=BATCH_SIZE,
            limit_start=offset,
        )
        if not reactions:
            break

        for r in reactions:
            # Skip duplicates (idempotent)
            existing = frappe.db.exists("Dock Reaction", {
                "reference_doctype": r.reference_doctype,
                "reference_name": r.reference_name,
                "user": r.user,
                "reaction_type": r.reaction_type,
            })
            if existing:
                continue

            frappe.get_doc({
                "doctype": "Dock Reaction",
                "reference_doctype": r.reference_doctype,
                "reference_name": r.reference_name,
                "user": r.user,
                "reaction_type": r.reaction_type,
            }).insert(ignore_permissions=True)
            migrated += 1

        offset += BATCH_SIZE

        if migrated % 100 == 0 and migrated > 0:
            frappe.db.commit()

    print(f"  Migrated {migrated} reactions")


def _map_note_type(orga_type):
    """Map Orga note_type values to Dock Comment note_type values."""
    mapping = {
        "General": "General",
        "Due Diligence": "Note",
        "Offer": "Note",
        "Decision": "Decision",
        "System": "System",
    }
    return mapping.get(orga_type, "General")
