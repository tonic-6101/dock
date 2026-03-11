# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe

_UNAVAILABLE = {"state": "unavailable"}


def _frappe_time_installed() -> bool:
    return "frappe_time" in frappe.get_installed_apps()


def _push_realtime(state: dict) -> None:
    frappe.publish_realtime("dock_timer_update", state, user=frappe.session.user)


@frappe.whitelist()
def get_state() -> dict:
    """
    Returns current timer state for the session user.
    state: "stopped" | "running" | "paused" | "unavailable"
    """
    if not _frappe_time_installed():
        return _UNAVAILABLE

    ft = frappe.get_single("FT Timer")
    if ft.user != frappe.session.user:
        return {"state": "stopped"}

    return {
        "state": ft.state or "stopped",
        "elapsed_seconds": ft.elapsed_seconds or 0,
        "started_at": str(ft.started_at) if ft.started_at else None,
        "context_app": ft.context_app or None,
        "context_doctype": ft.context_doctype or None,
        "context_name": ft.context_name or None,
        "context_label": ft.context_label or None,
    }


@frappe.whitelist()
def start(
    context_app: str = None,
    context_doctype: str = None,
    context_name: str = None,
    context_label: str = None,
) -> dict:
    """Start or resume the timer. Returns updated state."""
    if not _frappe_time_installed():
        return _UNAVAILABLE

    state = frappe.call(
        "frappe_time.api.timer.start",
        context_app=context_app,
        context_doctype=context_doctype,
        context_name=context_name,
        context_label=context_label,
    )
    _push_realtime(state)
    return state


@frappe.whitelist()
def pause() -> dict:
    """Pause the running timer. Returns updated state with elapsed_seconds."""
    if not _frappe_time_installed():
        return _UNAVAILABLE

    state = frappe.call("frappe_time.api.timer.pause")
    _push_realtime(state)
    return state


@frappe.whitelist()
def stop(notes: str = None) -> dict:
    """
    Stop the timer and save an FT Time Entry.
    Returns { state: "stopped", elapsed_seconds: int, entry_name: str }.
    """
    if not _frappe_time_installed():
        return _UNAVAILABLE

    state = frappe.call("frappe_time.api.timer.stop", notes=notes)
    _push_realtime(state)
    return state


@frappe.whitelist()
def update_context(
    context_app: str = None,
    context_doctype: str = None,
    context_name: str = None,
    context_label: str = None,
) -> dict:
    """Update context of a running/paused timer without stopping it."""
    if not _frappe_time_installed():
        return _UNAVAILABLE

    state = frappe.call(
        "frappe_time.api.timer.update_context",
        context_app=context_app,
        context_doctype=context_doctype,
        context_name=context_name,
        context_label=context_label,
    )
    _push_realtime(state)
    return state
