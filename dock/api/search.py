# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe

# Frappe core sections — always searched last, regardless of installed apps.
# Domain apps declare their own sections via dock_search_sections in hooks.py.
# NOTE: Contact is intentionally omitted here — Dock registers it via
# dock_search_sections with the dock_shared visibility filter applied,
# so contacts appear under "People" with correct privacy enforcement.
BUILT_IN_SECTIONS = [
    {
        "label": "Files",
        "app": "frappe",
        "doctype": "File",
        "search_fields": ["file_name"],
        "display_field": "file_name",
        "route_template": "/app/file/{name}",
    },
]


@frappe.whitelist()
def global_search(
    query: str,
    app: str = None,
    section: str = None,
    per_section: int = 5,
) -> list:
    """
    Search across all registered dock_search_sections and Frappe core sections.

    - query:       search string (min 2 chars enforced)
    - app:         filter to a specific app key (None = all apps)
    - section:     filter to a specific section label (None = all sections)
    - per_section: max results per section (default 5)

    Sort order: domain apps (alphabetical) → Frappe core built-ins last.
    Guest sessions always return [].
    Permissions applied automatically via frappe.db.get_list().
    Sections may declare visibility_fn + extra_fields for post-fetch filtering.
    """
    if frappe.session.user == "Guest":
        return []

    if not query or len(query.strip()) < 2:
        return []

    query = query.strip()
    per_section = max(1, int(per_section))
    results = []

    # 1. Domain app sections — alphabetical by app name, built-ins excluded
    for installed_app in sorted(frappe.get_installed_apps()):
        if installed_app == "frappe":
            continue
        if app and installed_app != app:
            continue

        hook_sections = frappe.get_hooks("dock_search_sections", app_name=installed_app)
        for section_list in hook_sections:
            items = section_list if isinstance(section_list, list) else [section_list]
            for s in items:
                if section and s.get("label") != section:
                    continue
                results.extend(_search_section(installed_app, s, query, per_section))

    # 2. Frappe core built-in sections — always last
    if not app or app == "frappe":
        for s in BUILT_IN_SECTIONS:
            if section and s.get("label") != section:
                continue
            results.extend(_search_section("frappe", s, query, per_section))

    return results


def _search_section(app_name: str, section: dict, query: str, per_section: int) -> list:
    """Execute a search against one section using frappe.db.get_list() for automatic permissions.

    Sections may declare:
      extra_fields:  list of additional field names to fetch (used by visibility_fn, stripped from output)
      visibility_fn: dotted path to a function(rows: list[dict]) -> list[dict] for post-fetch filtering
    """
    doctype = section.get("doctype")
    search_fields = section.get("search_fields") or ["name"]
    display_field = section.get("display_field") or "name"
    route_template = section.get("route_template") or ""
    extra_fields = section.get("extra_fields") or []
    visibility_fn = section.get("visibility_fn")

    if not doctype or not frappe.db.exists("DocType", doctype):
        return []

    q = f"%{query}%"
    or_filters = [[f, "like", q] for f in search_fields]
    fields = list({display_field, "name"} | set(extra_fields))

    try:
        rows = frappe.db.get_list(
            doctype,
            or_filters=or_filters,
            fields=fields,
            limit=per_section,
        )
    except Exception:
        frappe.log_error(f"dock search failed for {doctype}")
        return []

    # Apply section-level visibility filter (e.g. dock_shared for People)
    if visibility_fn:
        try:
            rows = frappe.get_attr(visibility_fn)(rows)
        except Exception:
            frappe.log_error(f"dock search visibility_fn failed: {visibility_fn}")

    q_lower = query.lower()
    results = []
    for row in rows:
        label = row.get(display_field) or row["name"]
        route = route_template.replace("{name}", row["name"])
        results.append({
            "label": label,
            "route": route,
            "app": app_name,
            "section": section.get("label") or doctype,
            "doctype": doctype,
            "name": row["name"],
            "_score": 2 if str(label).lower().startswith(q_lower) else 1,
        })

    results.sort(key=lambda r: r["_score"], reverse=True)
    return [{k: v for k, v in r.items() if k != "_score"} for r in results]
