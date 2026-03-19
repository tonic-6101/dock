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
    context_app: str = None,
    context_doctype: str = None,
    context_name: str = None,
    context_label: str = None,
    tags: str = None,
    entry_type: str = None,
) -> dict:
    """Start the timer. Proxies watch.api.timer.start_timer."""
    if not _watch_installed():
        return _UNAVAILABLE

    kwargs: dict = {"description": context_label}
    if tags:
        kwargs["tags"] = tags
    if entry_type:
        kwargs["entry_type"] = entry_type
    frappe.call("watch.api.timer.start_timer", **kwargs)
    state = _get_watch_state()
    state.update({
        "context_app": context_app,
        "context_doctype": context_doctype,
        "context_name": context_name,
        "context_label": context_label,
    })
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
    context_app: str = None,
    context_doctype: str = None,
    context_name: str = None,
    context_label: str = None,
    tags: str = None,
    entry_type: str = None,
) -> dict:
    """Update context of a running/paused timer."""
    if not _watch_installed():
        return _UNAVAILABLE

    kwargs: dict = {"description": context_label}
    if tags:
        kwargs["tags"] = tags
    if entry_type:
        kwargs["entry_type"] = entry_type
    frappe.call("watch.api.timer.update_timer", **kwargs)
    state = _get_watch_state()
    state.update({
        "context_app": context_app,
        "context_doctype": context_doctype,
        "context_name": context_name,
        "context_label": context_label,
    })
    _push_realtime(state)
    return state
