# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import json

import frappe


@frappe.whitelist()
def get_activity_feed(
    app: str = None,
    user: str = None,
    doctype: str = None,
    docname: str = None,
    activity_type: str = None,
    date_from: str = None,
    date_to: str = None,
    limit: int = 30,
    offset: int = 0,
) -> dict:
    """
    Aggregated activity feed from two sources:
    1. Frappe Version table (field-level changes on tracked doctypes)
    2. Direct document creation events (queries each source doctype's creation/modified)

    Filters to doctypes registered in dock_activity_sources hooks.

    Args:
        app: Filter to a single app (e.g. "dock", "orga")
        user: Filter to activities by a specific user email
        doctype: Filter to a specific DocType
        docname: Filter to a specific record (requires doctype)
        activity_type: Comma-separated activity types: create, update, insert, comment, discussion
        date_from: ISO date string, inclusive lower bound
        date_to: ISO date string, inclusive upper bound
        limit: Page size (default 30)
        offset: Pagination offset
    """
    limit = int(limit)
    offset = int(offset)

    # Parse activity_type filter
    allowed_types = None
    if activity_type:
        allowed_types = set(t.strip() for t in activity_type.split(",") if t.strip())

    # Get registered activity source doctypes
    source_doctypes = _get_source_doctypes(app)
    if not source_doctypes:
        return {"items": [], "has_more": False, "total": 0}

    # DocType filter — single value, comma-separated list, or with specific docname
    if doctype:
        requested_doctypes = set(d.strip() for d in doctype.split(",") if d.strip())
        source_doctypes = [dt for dt in source_doctypes if dt in requested_doctypes]
        if not source_doctypes:
            return {"items": [], "has_more": False, "total": 0}

    app_map = _get_doctype_app_map()
    source_labels = _get_source_labels()
    items = []
    seen = set()  # (doctype, docname, timestamp) to deduplicate

    # --- Source 1: Frappe Version table (field-level changes) ---
    if not allowed_types or allowed_types & {"update", "insert"}:
        version_filters = {"ref_doctype": ("in", source_doctypes)}
        if docname:
            version_filters["docname"] = docname
        if user:
            version_filters["owner"] = user
        if date_from and date_to:
            version_filters["creation"] = ("between", [date_from, date_to])
        elif date_from:
            version_filters["creation"] = (">=", date_from)
        elif date_to:
            version_filters["creation"] = ("<=", date_to)

        versions = frappe.get_all(
            "Version",
            filters=version_filters,
            fields=["name", "ref_doctype", "docname", "owner", "creation", "data"],
            order_by="creation DESC",
            limit_page_length=limit * 2,
        )

        for v in versions:
            field_changes = []
            try:
                data = json.loads(v.data) if isinstance(v.data, str) else v.data
                changed = data.get("changed", []) if data else []
                for change in changed:
                    if len(change) >= 3:
                        field_changes.append({
                            "field": change[0],
                            "old": str(change[1]) if change[1] is not None else "",
                            "new": str(change[2]) if change[2] is not None else "",
                        })
            except (json.JSONDecodeError, TypeError, AttributeError):
                pass

            action = "update"
            if not field_changes and data and data.get("added"):
                action = "insert"

            if allowed_types and action not in allowed_types:
                continue

            key = (v.ref_doctype, v.docname, str(v.creation))
            seen.add(key)

            # Resolve human-readable display name for the referenced document
            version_display = _resolve_display_name(v.ref_doctype, v.docname)
            dt_label = source_labels.get(v.ref_doctype, v.ref_doctype)

            items.append({
                "type": action,
                "doctype": v.ref_doctype,
                "doctype_label": dt_label,
                "docname": v.docname,
                "display_name": version_display,
                "app": app_map.get(v.ref_doctype, ""),
                "user": v.owner,
                "user_fullname": frappe.utils.get_fullname(v.owner),
                "user_image": frappe.db.get_value("User", v.owner, "user_image"),
                "timestamp": str(v.creation),
                "summary": _build_summary(dt_label, version_display, action, field_changes),
                "field_changes": field_changes,
            })

    # --- Source 2: Direct document creation/modification events ---
    want_create = not allowed_types or "create" in allowed_types
    want_update = not allowed_types or "update" in allowed_types

    if want_create or want_update:
        for dt in source_doctypes:
            if docname and doctype != dt:
                continue
            try:
                dt_filters = {}
                if docname:
                    dt_filters["name"] = docname
                if user:
                    dt_filters["owner"] = user

                display_field = _get_display_field(dt)
                fields = ["name", "owner", "creation", "modified", "modified_by"]
                if display_field and display_field not in fields:
                    fields.append(display_field)

                docs = frappe.get_all(
                    dt,
                    filters=dt_filters,
                    fields=fields,
                    order_by="modified DESC",
                    limit_page_length=limit,
                )

                source_app = app_map.get(dt, "")
                dt_label = source_labels.get(dt, dt)

                for doc in docs:
                    raw_display = doc.get(display_field) if display_field else None
                    display_name = _truncate(raw_display) if raw_display else doc.name

                    # Creation event
                    if want_create:
                        ts = str(doc.creation)
                        in_range = True
                        if date_from and ts < date_from:
                            in_range = False
                        if date_to and ts > date_to + " 23:59:59":
                            in_range = False
                        create_key = (dt, doc.name, ts)
                        if in_range and create_key not in seen:
                            seen.add(create_key)
                            items.append({
                                "type": "create",
                                "doctype": dt,
                                "doctype_label": dt_label,
                                "docname": doc.name,
                                "display_name": display_name or doc.name,
                                "app": source_app,
                                "user": doc.owner,
                                "user_fullname": frappe.utils.get_fullname(doc.owner),
                                "user_image": frappe.db.get_value("User", doc.owner, "user_image"),
                                "timestamp": ts,
                                "summary": f"created {dt_label} {display_name or doc.name}",
                                "field_changes": [],
                            })

                    # Modification event (only if different from creation)
                    if want_update and str(doc.modified) != str(doc.creation):
                        ts = str(doc.modified)
                        in_range = True
                        if date_from and ts < date_from:
                            in_range = False
                        if date_to and ts > date_to + " 23:59:59":
                            in_range = False
                        mod_key = (dt, doc.name, ts)
                        if in_range and mod_key not in seen:
                            seen.add(mod_key)
                            items.append({
                                "type": "update",
                                "doctype": dt,
                                "doctype_label": dt_label,
                                "docname": doc.name,
                                "display_name": display_name or doc.name,
                                "app": source_app,
                                "user": doc.modified_by,
                                "user_fullname": frappe.utils.get_fullname(doc.modified_by),
                                "user_image": frappe.db.get_value("User", doc.modified_by, "user_image"),
                                "timestamp": ts,
                                "summary": f"updated {dt_label} {display_name or doc.name}",
                                "field_changes": [],
                            })
            except Exception:
                continue

    # Sort all items by timestamp descending
    items.sort(key=lambda x: x["timestamp"], reverse=True)

    total = len(items)
    paginated = items[offset : offset + limit]

    return {
        "items": paginated,
        "has_more": (offset + limit) < total,
        "total": total,
    }


@frappe.whitelist()
def get_record_activity(
    reference_doctype: str,
    reference_name: str,
    limit: int = 20,
    offset: int = 0,
) -> dict:
    """Activity for a specific record: Version changes + Dock Comments + linked Discussions."""
    limit = int(limit)
    offset = int(offset)

    items = []

    # Version entries (field changes)
    versions = frappe.get_all(
        "Version",
        filters={"ref_doctype": reference_doctype, "docname": reference_name},
        fields=["name", "owner", "creation", "data"],
        order_by="creation DESC",
        limit_page_length=limit,
        limit_start=offset,
    )
    for v in versions:
        field_changes = []
        try:
            data = json.loads(v.data) if isinstance(v.data, str) else v.data
            changed = data.get("changed", []) if data else []
            for change in changed:
                if len(change) >= 3:
                    field_changes.append({
                        "field": change[0],
                        "old": str(change[1]) if change[1] is not None else "",
                        "new": str(change[2]) if change[2] is not None else "",
                    })
        except (json.JSONDecodeError, TypeError, AttributeError):
            pass

        items.append({
            "type": "update" if field_changes else "insert",
            "user": v.owner,
            "user_fullname": frappe.utils.get_fullname(v.owner),
            "timestamp": str(v.creation),
            "field_changes": field_changes,
        })

    # Linked discussions
    if frappe.db.exists("DocType", "Dock Discussion Link"):
        discussions = frappe.get_all(
            "Dock Discussion Link",
            filters={"reference_doctype": reference_doctype, "reference_name": reference_name},
            fields=["parent"],
        )
        for d in discussions:
            try:
                disc = frappe.get_doc("Dock Discussion", d.parent)
                items.append({
                    "type": "discussion",
                    "name": disc.name,
                    "title": disc.title,
                    "discussion_type": disc.discussion_type,
                    "status": disc.status,
                    "user": disc.created_by,
                    "user_fullname": frappe.utils.get_fullname(disc.created_by),
                    "timestamp": str(disc.creation),
                    "reply_count": disc.reply_count or 0,
                })
            except Exception:
                continue

    # Sort all items by timestamp descending
    items.sort(key=lambda x: x["timestamp"], reverse=True)

    total = len(items)
    return {
        "items": items[:limit],
        "has_more": total > limit,
        "total": total,
    }


def _get_source_doctypes(app=None):
    """Get all doctypes registered via dock_activity_sources hooks.
    app can be a single app name or comma-separated list (e.g. "watch,orga").
    """
    allowed_apps = None
    if app:
        allowed_apps = set(a.strip() for a in app.split(",") if a.strip())

    doctypes = []
    for installed_app in frappe.get_installed_apps():
        if allowed_apps and installed_app not in allowed_apps:
            continue
        for source_list in frappe.get_hooks("dock_activity_sources", app_name=installed_app):
            items = source_list if isinstance(source_list, list) else [source_list]
            for item in items:
                if isinstance(item, dict) and item.get("doctype"):
                    dt = item["doctype"]
                    if isinstance(dt, list):
                        dt = dt[0]
                    doctypes.append(dt)
    return doctypes


def _get_doctype_app_map():
    """Build a mapping of doctype to app name from activity sources."""
    result = {}
    for installed_app in frappe.get_installed_apps():
        for source_list in frappe.get_hooks("dock_activity_sources", app_name=installed_app):
            items = source_list if isinstance(source_list, list) else [source_list]
            for item in items:
                if isinstance(item, dict) and item.get("doctype"):
                    dt = item["doctype"]
                    if isinstance(dt, list):
                        dt = dt[0]
                    result[dt] = installed_app
    return result


def _get_source_labels():
    """Build a mapping of doctype to human-readable label from activity sources."""
    result = {}
    for installed_app in frappe.get_installed_apps():
        for source_list in frappe.get_hooks("dock_activity_sources", app_name=installed_app):
            items = source_list if isinstance(source_list, list) else [source_list]
            for item in items:
                if isinstance(item, dict) and item.get("doctype"):
                    dt = item["doctype"]
                    if isinstance(dt, list):
                        dt = dt[0]
                    label = item.get("label", dt)
                    if isinstance(label, list):
                        label = label[0]
                    result[dt] = label
    return result


def _get_display_fields_from_hooks():
    """Build a mapping of doctype to display_field declared in dock_activity_sources hooks."""
    result = {}
    for installed_app in frappe.get_installed_apps():
        for source_list in frappe.get_hooks("dock_activity_sources", app_name=installed_app):
            items = source_list if isinstance(source_list, list) else [source_list]
            for item in items:
                if isinstance(item, dict) and item.get("doctype") and item.get("display_field"):
                    dt = item["doctype"]
                    if isinstance(dt, list):
                        dt = dt[0]
                    df = item["display_field"]
                    if isinstance(df, list):
                        df = df[0]
                    result[dt] = df
    return result


# Cache hook-declared display fields per request
_hook_display_fields = None


def _get_display_field(dt):
    """Get the best display field for a doctype.

    Priority:
    1. display_field declared in dock_activity_sources hook
    2. DocType title_field
    3. Common field name fallback chain
    """
    global _hook_display_fields
    if _hook_display_fields is None:
        _hook_display_fields = _get_display_fields_from_hooks()

    # Hook-declared display field takes priority
    if dt in _hook_display_fields:
        return _hook_display_fields[dt]

    try:
        meta = frappe.get_meta(dt)
        if meta.title_field:
            return meta.title_field
        # Expanded fallback chain
        for f in ["title", "subject", "full_name", "label", "name1",
                   "description", "reference_label", "content"]:
            if meta.has_field(f):
                return f
    except Exception:
        pass
    return None


_display_name_cache = {}


def _resolve_display_name(dt, docname):
    """Look up the display field value for a document. Uses per-request cache."""
    cache_key = (dt, docname)
    if cache_key in _display_name_cache:
        return _display_name_cache[cache_key]

    display_field = _get_display_field(dt)
    result = docname  # fallback
    if display_field:
        try:
            val = frappe.db.get_value(dt, docname, display_field)
            if val:
                result = _truncate(str(val))
        except Exception:
            pass

    _display_name_cache[cache_key] = result
    return result


def _truncate(text, max_len=60):
    """Truncate text to max_len, strip newlines, add ellipsis."""
    if not text:
        return text
    # Take first line only
    text = str(text).split("\n")[0].strip()
    if len(text) > max_len:
        return text[:max_len].rstrip() + "…"
    return text


def _build_summary(ref_doctype, docname, action, field_changes):
    """Build a human-readable summary of the change."""
    if action == "insert":
        return f"created {ref_doctype} {docname}"
    if field_changes:
        parts = []
        for fc in field_changes[:3]:
            parts.append(f"{fc['field']}: {fc['old']} → {fc['new']}")
        summary = ", ".join(parts)
        if len(field_changes) > 3:
            summary += f" (+{len(field_changes) - 3} more)"
        return summary
    return f"updated {ref_doctype} {docname}"


def _count_discussions_for_record(ref_doctype, docname):
    """Count discussions linked to a specific record."""
    if not frappe.db.exists("DocType", "Dock Discussion Link"):
        return 0
    return frappe.db.count("Dock Discussion Link", {
        "reference_doctype": ref_doctype,
        "reference_name": docname,
    })
