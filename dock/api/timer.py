# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe

_UNAVAILABLE = {"state": "unavailable"}


def _watch_installed() -> bool:
    return "watch" in frappe.get_installed_apps()


def _push_realtime(state: dict) -> None:
    frappe.publish_realtime("dock_timer_update", state, user=frappe.session.user)


def _get_watch_state() -> dict:
    """Fetch current timer state from Watch and map to Dock's frontend shape."""
    try:
        raw = frappe.call("watch.api.timer.get_timer_state")
    except Exception:
        return {"state": "stopped"}

    if not raw:
        return {"state": "stopped"}

    entry_name = raw.get("active_entry") or None
    started_at = raw.get("started_at")
    if hasattr(started_at, "isoformat"):
        started_at = started_at.isoformat()
    result = {
        "state": raw.get("state") or "stopped",
        "elapsed_seconds": raw.get("elapsed_seconds") or 0,
        "started_at": started_at,
        "context_label": raw.get("description") or None,
        "entry_name": entry_name,
        "entry_type": None,
        "tags": [],
        # Context fields from Watch
        "contact": raw.get("contact"),
        "contact_name": raw.get("contact_name"),
        "context_type": raw.get("context_type"),
        "context_name": raw.get("context_name"),
        "context_display": raw.get("context_display"),
    }

    # Fetch tags and entry_type from the active time entry
    if entry_name and frappe.db.exists("Watch Entry", entry_name):
        entry = frappe.get_doc("Watch Entry", entry_name)
        result["entry_type"] = entry.get("entry_type") or "billable"
        result["tags"] = [row.tag for row in (entry.get("tags") or [])]

    return result


@frappe.whitelist()
def get_state() -> dict:
    """Returns current timer state for the session user."""
    if not _watch_installed():
        return _UNAVAILABLE

    return _get_watch_state()


@frappe.whitelist()
def start(
    context_label: str = None,
    description: str = None,
    tags: str = None,
    entry_type: str = None,
    contact: str = None,
    context_type: str = None,
    context_name: str = None,
    # Legacy params — accepted for backward compat, no longer enriched by Dock
    context_app: str = None,
    context_doctype: str = None,
) -> dict:
    """Start the timer. Proxies watch.api.timer.start_timer."""
    if not _watch_installed():
        return _UNAVAILABLE

    desc = description or context_label
    kwargs: dict = {"description": desc}
    if tags:
        kwargs["tags"] = tags
    if entry_type:
        kwargs["entry_type"] = entry_type
    if contact:
        kwargs["contact"] = contact
    if context_type:
        kwargs["context_type"] = context_type
    if context_name:
        kwargs["context_name"] = context_name
    frappe.call("watch.api.timer.start_timer", **kwargs)
    state = _get_watch_state()
    _push_realtime(state)
    return state


@frappe.whitelist()
def pause() -> dict:
    """Pause the running timer."""
    if not _watch_installed():
        return _UNAVAILABLE

    frappe.call("watch.api.timer.pause_timer")
    state = _get_watch_state()
    _push_realtime(state)
    return state


@frappe.whitelist()
def resume() -> dict:
    """Resume a paused timer."""
    if not _watch_installed():
        return _UNAVAILABLE

    frappe.call("watch.api.timer.resume_timer")
    state = _get_watch_state()
    _push_realtime(state)
    return state


@frappe.whitelist()
def stop(notes: str = None) -> dict:
    """Stop the timer and save a time entry."""
    if not _watch_installed():
        return _UNAVAILABLE

    result = frappe.call("watch.api.timer.stop_timer", notes=notes)
    state = _get_watch_state()
    # Include the saved entry name from stop result
    entry = result.get("entry") if isinstance(result, dict) else None
    if entry and isinstance(entry, dict):
        state["entry_name"] = entry.get("name")
    _push_realtime(state)
    return state


@frappe.whitelist()
def update_context(
    context_label: str = None,
    description: str = None,
    tags: str = None,
    entry_type: str = None,
    contact: str = None,
    context_type: str = None,
    context_name: str = None,
    # Legacy params — accepted for backward compat
    context_app: str = None,
    context_doctype: str = None,
) -> dict:
    """Update context of a running/paused timer."""
    if not _watch_installed():
        return _UNAVAILABLE

    desc = description or context_label
    kwargs: dict = {}
    if desc is not None:
        kwargs["description"] = desc
    if tags:
        kwargs["tags"] = tags
    if entry_type:
        kwargs["entry_type"] = entry_type
    if contact is not None:
        kwargs["contact"] = contact
    if context_type is not None:
        kwargs["context_type"] = context_type
    if context_name is not None:
        kwargs["context_name"] = context_name
    frappe.call("watch.api.timer.update_timer", **kwargs)
    state = _get_watch_state()
    _push_realtime(state)
    return state


@frappe.whitelist()
def get_daily_summary(date: str = None) -> dict:
    """Proxy to watch.api.time_entry.get_daily_summary."""
    if not _watch_installed():
        return {"entries": [], "total_hours": 0, "billable_hours": 0}

    if not date:
        from datetime import date as dt_date
        date = dt_date.today().isoformat()

    return frappe.call("watch.api.time_entry.get_daily_summary", date=date)


@frappe.whitelist()
def start_focus(
    description: str = None,
    tags: str = None,
    entry_type: str = "billable",
    sessions: int = 4,
    work_minutes: int = 25,
    break_minutes: int = 5,
    contact: str = None,
    context_type: str = None,
    context_name: str = None,
) -> dict:
    """Start a Pomodoro focus session. Proxies watch.api.timer.start_focus."""
    if not _watch_installed():
        return _UNAVAILABLE

    kwargs: dict = {}
    if description:
        kwargs["description"] = description
    if tags:
        kwargs["tags"] = tags
    if entry_type:
        kwargs["entry_type"] = entry_type
    kwargs["sessions"] = sessions
    kwargs["work_minutes"] = work_minutes
    kwargs["break_minutes"] = break_minutes
    if contact:
        kwargs["contact"] = contact
    if context_type:
        kwargs["context_type"] = context_type
    if context_name:
        kwargs["context_name"] = context_name
    frappe.call("watch.api.timer.start_focus", **kwargs)
    state = _get_watch_state()
    _push_realtime(state)
    return state


@frappe.whitelist()
def get_context_options() -> list[dict]:
    """Returns available timer context types from Watch."""
    if not _watch_installed():
        return []
    return frappe.call("watch.api.timer.get_context_options")


@frappe.whitelist()
def search_context(doctype: str, query: str, limit: int = 8) -> list[dict]:
    """Search for context records by doctype.

    Uses the context options from Watch to determine which fields to search
    and display. Runs server-side to avoid frappe.client.get_list field
    permission issues.
    """
    if not _watch_installed():
        return []

    options = frappe.call("watch.api.timer.get_context_options")
    opt = next((o for o in options if o["doctype"] == doctype), None)
    if not opt:
        return []

    if not frappe.has_permission(doctype, "read"):
        return []

    search_field = opt["search_fields"][0] if opt.get("search_fields") else "name"
    display_field = opt.get("display_field") or "name"

    fields = ["name"]
    if display_field != "name":
        fields.append(display_field)

    results = frappe.get_list(
        doctype,
        filters={search_field: ["like", f"%{query}%"]},
        fields=fields,
        limit_page_length=limit,
    )

    return [
        {"name": r.name, "display": r.get(display_field) or r.name}
        for r in results
    ]
