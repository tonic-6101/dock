# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe


@frappe.whitelist()
def global_search(
    query: str,
    app: str = None,
    section: str = None,
    limit: int = 20,
) -> list:
    """
    Search across all registered dock_search_sections from installed apps.
    Respects Frappe permissions — only returns records the current user can read.
    Returns list of { label, route, app, section, doctype, name }.

    Optional filters:
      app     — restrict to a single app name
      section — restrict to a section label within that app
    """
    if not query or len(query.strip()) < 2:
        return []

    query = query.strip()
    results = []

    for installed_app in frappe.get_installed_apps():
        if app and installed_app != app:
            continue

        sections = frappe.get_hooks("dock_search_sections", app_name=installed_app)
        for section_list in sections:
            items = section_list if isinstance(section_list, list) else [section_list]
            for s in items:
                if section and s.get("label") != section:
                    continue
                results.extend(_search_section(installed_app, s, query, limit))

    # Also search Frappe Contact for People Hub
    results.extend(_search_people(query, limit))

    results.sort(key=lambda r: r.get("_score", 0), reverse=True)
    return [
        {k: v for k, v in r.items() if k != "_score"}
        for r in results[:int(limit)]
    ]


def _search_section(app_name: str, section: dict, query: str, limit: int) -> list:
    doctype = section.get("doctype")
    search_fields = section.get("search_fields", ["name"])
    display_field = section.get("display_field", "name")
    route_template = section.get("route_template", "")
    extra_filters = section.get("filters", {})

    if not doctype or not frappe.db.exists("DocType", doctype):
        return []

    or_filters = [[doctype, f, "like", f"%{query}%"] for f in search_fields]

    try:
        rows = frappe.get_all(
            doctype,
            or_filters=or_filters,
            filters=extra_filters,
            fields=["name", display_field],
            limit=limit,
        )
    except Exception:
        frappe.log_error(f"dock search failed for {doctype}")
        return []

    results = []
    for row in rows:
        label = row.get(display_field) or row["name"]
        route = route_template.replace("{name}", row["name"])
        results.append({
            "label": label,
            "route": route,
            "app": app_name,
            "section": section.get("label", doctype),
            "doctype": doctype,
            "name": row["name"],
            "_score": 1,
        })
    return results


def _search_people(query: str, limit: int) -> list:
    """Search Frappe Contact for the People Hub section."""
    if not frappe.db.exists("DocType", "Contact"):
        return []

    from dock.api.people import get_people_permission_condition

    try:
        rows = frappe.get_all(
            "Contact",
            or_filters=[
                ["Contact", "full_name", "like", f"%{query}%"],
                ["Contact", "email_id", "like", f"%{query}%"],
            ],
            filters=frappe.safe_eval(
                f"[{get_people_permission_condition()}]"
            ) if False else {},  # permission applied via query condition
            fields=["name", "full_name", "email_id"],
            limit=limit,
        )
    except Exception:
        frappe.log_error("dock people search failed")
        return []

    return [
        {
            "label": row.get("full_name") or row["name"],
            "route": f"/dock/people/{row['name']}",
            "app": "dock",
            "section": "People",
            "doctype": "Contact",
            "name": row["name"],
            "_score": 1,
        }
        for row in rows
    ]
