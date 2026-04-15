# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2026 Tonic

"""Briefing API — aggregates data from all ``jana_briefing_source`` hooks.

Called by the DockBriefingPanel in the frontend.  Unlike Jana's
``get_briefing_data`` tool (which runs inside an LLM tool-call loop),
this endpoint returns raw structured data for direct rendering —
no LLM involved, instant, zero cost.
"""

from __future__ import annotations

import frappe
from frappe.utils import nowdate


@frappe.whitelist()
def get_briefing(date: str | None = None) -> dict:
	"""Collect briefing data from all installed ecosystem apps.

	Discovers briefing sources via the ``jana_briefing_source`` hook,
	calls each endpoint, and returns a per-app result dict.
	Failures in individual apps do not block the overall briefing.

	Returns::

	    {
	        "date": "2026-04-01",
	        "apps": {
	            "watch": { ... },
	            "orga": { ... },
	            ...
	        }
	    }
	"""
	date = date or nowdate()
	sources = frappe.get_hooks("jana_briefing_source") or []
	apps: dict = {}

	for source_path in sources:
		app_name = source_path.split(".")[0]
		try:
			fn = frappe.get_attr(source_path)
			apps[app_name] = fn(date=date)
		except Exception:
			frappe.log_error(title=f"Briefing: {app_name} failed")
			apps[app_name] = {"error": "Data collection failed"}

	return {"date": date, "apps": apps}


@frappe.whitelist()
def get_badge_count() -> int:
	"""Return the total count of actionable briefing items.

	Used by the navbar button badge.  Lightweight — only counts,
	no full data fetch.
	"""
	count = 0
	sources = frappe.get_hooks("jana_briefing_source") or []

	for source_path in sources:
		app_name = source_path.split(".")[0]
		try:
			fn = frappe.get_attr(source_path)
			data = fn(date=nowdate())
			count += _count_actionable(data)
		except Exception:
			pass  # Silent — badge is best-effort

	return count


def _count_actionable(data: dict) -> int:
	"""Count actionable items in a single app's briefing data."""
	count = 0
	for key, value in data.items():
		if key == "error":
			continue
		if isinstance(value, list):
			count += len(value)
		elif isinstance(value, dict):
			# Nested dicts (e.g., nudges.stale_leads, nudges.unanswered_offers)
			for sub_key, sub_value in value.items():
				if isinstance(sub_value, list):
					count += len(sub_value)
				elif isinstance(sub_value, int) and sub_key in (
					"unread_count", "active_leads", "entry_count",
				):
					count += sub_value
	return count
