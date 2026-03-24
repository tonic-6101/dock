# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

"""
Unified Bin API — aggregates soft-deleted items from all ecosystem apps.

Dock never writes to another app's doctypes. It queries `deleted=1` on registered
doctypes and proxies restore/permanent-delete to the owning app's endpoints.
"""

import frappe
from frappe import _


def _get_bin_doctypes():
    """Collect dock_bin_doctypes from all installed apps."""
    _REQUIRED = {"doctype", "label_field", "icon", "restore_endpoint", "delete_endpoint"}
    result = []
    for app in frappe.get_installed_apps():
        for decl in frappe.get_hooks("dock_bin_doctypes", app_name=app):
            items = decl if isinstance(decl, list) else [decl]
            for item in items:
                if not isinstance(item, dict):
                    continue
                unwrapped = {
                    k: v[0] if isinstance(v, list) and len(v) == 1 else v
                    for k, v in item.items()
                }
                missing = _REQUIRED - set(unwrapped.keys())
                if missing:
                    frappe.log_error(
                        f"dock: {app} dock_bin_doctypes entry missing fields: {missing}",
                        "Dock Hook Validation",
                    )
                    continue
                if not frappe.db.exists("DocType", unwrapped["doctype"]):
                    continue
                result.append({"app": app, **unwrapped})
    return result


def _get_retention_days():
    """Get bin retention days from Dock Settings."""
    try:
        return int(frappe.db.get_single_value("Dock Settings", "bin_retention_days") or 30)
    except Exception:
        return 30


@frappe.whitelist()
def get_items(
    app: str = None,
    search: str = None,
    sort_by: str = "deleted_on",
    sort_order: str = "desc",
    limit: int = 20,
    offset: int = 0,
) -> dict:
    """
    Returns paginated bin items across all registered apps.
    Filters by app (optional) and search query (optional).
    Respects user permissions — only returns items the user can read.
    """
    limit = int(limit)
    offset = int(offset)
    retention_days = _get_retention_days()

    all_items = []
    counts_by_app = {}

    for reg in _get_bin_doctypes():
        dt = reg["doctype"]
        reg_app = reg["app"]

        # Skip if filtering by app and this isn't it
        if app and reg_app != app:
            # Still count for the pills
            try:
                count = frappe.db.count(dt, {"deleted": 1})
                if count:
                    counts_by_app[reg_app] = counts_by_app.get(reg_app, 0) + count
            except Exception:
                pass
            continue

        label_field = reg["label_field"]
        search_fields = reg.get("search_fields", [label_field])
        if isinstance(search_fields, str):
            search_fields = [search_fields]
        if label_field not in search_fields:
            search_fields = [label_field] + search_fields

        filters = {"deleted": 1}

        if search:
            or_filters = [{f: ["like", f"%{search}%"]} for f in search_fields]
            # Use frappe.get_all with or_filters
            items = frappe.get_all(
                dt,
                filters=filters,
                or_filters=or_filters,
                fields=["name", f"{label_field} as label", "deleted_by", "deleted_on", "deletion_reason"],
                order_by=f"{sort_by} {sort_order}",
                limit_page_length=0,  # get all for accurate count, then paginate
            )
        else:
            items = frappe.get_all(
                dt,
                filters=filters,
                fields=["name", f"{label_field} as label", "deleted_by", "deleted_on", "deletion_reason"],
                order_by=f"{sort_by} {sort_order}",
                limit_page_length=0,
            )

        count = len(items)
        counts_by_app[reg_app] = counts_by_app.get(reg_app, 0) + count

        for item in items:
            days_until_purge = retention_days
            if item.get("deleted_on"):
                deleted_date = frappe.utils.get_datetime(item["deleted_on"])
                expires = frappe.utils.add_days(deleted_date, retention_days)
                days_until_purge = max(0, frappe.utils.date_diff(expires, frappe.utils.now()))
            all_items.append({
                "name": item["name"],
                "doctype": dt,
                "app": reg_app,
                "label": item.get("label") or item["name"],
                "icon": reg["icon"],
                "deleted_by": item.get("deleted_by"),
                "deleted_on": str(item["deleted_on"]) if item.get("deleted_on") else None,
                "deletion_reason": item.get("deletion_reason"),
                "days_until_purge": days_until_purge,
            })

    # Sort across all doctypes
    reverse = sort_order.lower() == "desc"
    if sort_by == "deleted_on":
        all_items.sort(key=lambda x: x.get("deleted_on") or "", reverse=reverse)
    elif sort_by == "label":
        all_items.sort(key=lambda x: (x.get("label") or "").lower(), reverse=reverse)

    total = len(all_items)
    paginated = all_items[offset:offset + limit]

    return {
        "items": paginated,
        "total": total,
        "counts_by_app": counts_by_app,
    }


@frappe.whitelist()
def get_count() -> dict:
    """Returns total bin item count for current user. Used for account menu badge."""
    total = 0
    for reg in _get_bin_doctypes():
        try:
            total += frappe.db.count(reg["doctype"], {"deleted": 1})
        except Exception:
            pass
    return {"total": total}


@frappe.whitelist(methods=["POST"])
def restore(doctype: str, names) -> dict:
    """Proxies restore to the owning app's restore_endpoint."""
    import json as _json
    if isinstance(names, str):
        names = _json.loads(names)

    reg = _find_registration(doctype)
    if not reg:
        frappe.throw(_("DocType {0} is not registered for Dock Bin").format(doctype))

    result = frappe.call(reg["restore_endpoint"], **{
        _get_names_param(reg["restore_endpoint"]): names,
    })
    return result or {"restored": len(names), "failed": []}


@frappe.whitelist(methods=["POST"])
def delete_permanently(doctype: str, names) -> dict:
    """Proxies permanent delete to the owning app's delete_endpoint."""
    import json as _json
    if isinstance(names, str):
        names = _json.loads(names)

    reg = _find_registration(doctype)
    if not reg:
        frappe.throw(_("DocType {0} is not registered for Dock Bin").format(doctype))

    result = frappe.call(reg["delete_endpoint"], **{
        _get_names_param(reg["delete_endpoint"]): names,
    })
    return result or {"deleted": len(names), "failed": []}


@frappe.whitelist(methods=["POST"])
def empty_bin() -> dict:
    """Permanently deletes ALL bin items across ALL apps for current user."""
    total_deleted = 0
    for reg in _get_bin_doctypes():
        dt = reg["doctype"]
        names = frappe.get_all(dt, filters={"deleted": 1}, pluck="name")
        if not names:
            continue
        try:
            result = frappe.call(reg["delete_endpoint"], **{
                _get_names_param(reg["delete_endpoint"]): names,
            })
            total_deleted += (result or {}).get("deleted", len(names))
        except Exception as e:
            frappe.log_error(f"dock: empty_bin failed for {dt}: {e}", "Dock Bin")
    return {"deleted": total_deleted}


def _find_registration(doctype: str) -> dict | None:
    """Find the hook registration for a given doctype."""
    for reg in _get_bin_doctypes():
        if reg["doctype"] == doctype:
            return reg
    return None


def _get_names_param(endpoint: str) -> str:
    """Detect the parameter name for the names list in the app's endpoint.

    Repo uses 'explorer_entry_ids', but the standard is 'names'.
    We inspect the function signature to determine the correct param name.
    """
    try:
        import inspect
        parts = endpoint.rsplit(".", 1)
        mod = frappe.get_module(parts[0])
        func = getattr(mod, parts[1])
        sig = inspect.signature(func)
        params = list(sig.parameters.keys())
        # Return first param (skip 'self' if present)
        for p in params:
            if p != "self":
                return p
        return "names"
    except Exception:
        return "names"
