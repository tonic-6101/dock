# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import json
import frappe
from frappe import _

_REGISTRY_CACHE_KEY = "dock:app_registry"
_REGISTRY_TTL = 86_400  # 24 hours
_REGISTRY_URL = "https://registry.tonic.dev/apps.json"


def _fetch_registry() -> list:
    """Fetch Tonic app registry, using Redis cache when available."""
    cached = frappe.cache.get_value(_REGISTRY_CACHE_KEY)
    if cached:
        return json.loads(cached) if isinstance(cached, str) else cached
    return _refresh_registry_cache()


def _refresh_registry_cache() -> list:
    """Force-fetch from remote and update cache. Returns [] on network failure."""
    try:
        import requests
        resp = requests.get(_REGISTRY_URL, timeout=5)
        resp.raise_for_status()
        data = resp.json()
        frappe.cache.set_value(_REGISTRY_CACHE_KEY, json.dumps(data), expires_in_sec=_REGISTRY_TTL)
        return data
    except Exception:
        frappe.log_error("dock: failed to fetch Tonic app registry", "Dock Ecosystem")
        return []


def _get_fm_url() -> str | None:
    """Returns configured Frappe Manager URL, or None if not configured."""
    if not frappe.db.exists("DocType", "Dock Settings"):
        return None
    settings = frappe.get_single("Dock Settings")
    return settings.get("frappe_manager_url") or None


def _fm_post(path: str, payload: dict) -> dict:
    """POST to Frappe Manager API. Raises ValidationError if not configured."""
    import requests
    fm_url = _get_fm_url()
    if not fm_url:
        frappe.throw(
            _("Frappe Manager URL is not configured in Dock Settings."),
            frappe.ValidationError,
        )
    resp = requests.post(f"{fm_url.rstrip('/')}{path}", json=payload, timeout=30)
    resp.raise_for_status()
    return resp.json()


def _fm_get(path: str) -> dict:
    """GET from Frappe Manager API."""
    import requests
    fm_url = _get_fm_url()
    if not fm_url:
        frappe.throw(
            _("Frappe Manager URL is not configured in Dock Settings."),
            frappe.ValidationError,
        )
    resp = requests.get(f"{fm_url.rstrip('/')}{path}", timeout=10)
    resp.raise_for_status()
    return resp.json()


@frappe.whitelist()
def get_apps() -> dict:
    """
    Returns installed, available, and other apps with version info.
    {
        "installed": [...],   # ecosystem apps (Tonic registry or dock_app_registry)
        "available": [...],   # ecosystem apps not yet installed
        "other": [...],       # installed apps outside the ecosystem
        "fm_url": str | None  # whether FM is configured (used by frontend)
    }
    """
    registry = _fetch_registry()
    registry_by_name = {r["name"]: r for r in registry}
    installed_app_names = set(frappe.get_installed_apps())

    # Apps to always exclude from listings
    _HIDDEN_APPS = {"frappe"}

    installed = []
    other = []
    for app_name in frappe.get_installed_apps():
        if app_name in _HIDDEN_APPS:
            continue

        registry_entry = registry_by_name.get(app_name)
        dock_registry = frappe.get_hooks("dock_app_registry", app_name=app_name)
        is_ecosystem = bool(registry_entry or dock_registry)

        try:
            installed_version = frappe.get_attr(f"{app_name}.__version__")
        except Exception:
            installed_version = None

        latest_version = registry_entry.get("latest_version") if registry_entry else None
        update_available = bool(
            latest_version and installed_version and latest_version != installed_version
        )

        # Merge display fields: Tonic registry > dock_app_registry hook > fallback
        label = app_name.replace("_", " ").title()
        description = ""
        color = "#6b7280"
        github_url = ""
        has_pro = False

        if registry_entry:
            label = registry_entry.get("label", label)
            description = registry_entry.get("description", description)
            color = registry_entry.get("color", color)
            github_url = registry_entry.get("github_url", github_url)
            has_pro = registry_entry.get("has_pro", False)
        elif dock_registry:
            entry = dock_registry if isinstance(dock_registry, dict) else dock_registry[0]
            if isinstance(entry, dict):
                label = entry.get("label", label)
                color = entry.get("color", color)

        app_entry = {
            "name": app_name,
            "label": label,
            "description": description,
            "color": color,
            "installed_version": installed_version,
            "latest_version": latest_version,
            "update_available": update_available,
            "has_pro": has_pro,
            "github_url": github_url,
        }

        if is_ecosystem:
            installed.append(app_entry)
        else:
            other.append(app_entry)

    # Available — Tonic registry apps not currently installed
    available = []
    for entry in registry:
        if entry["name"] not in installed_app_names:
            available.append({
                "name": entry["name"],
                "label": entry.get("label", entry["name"]),
                "description": entry.get("description", ""),
                "color": entry.get("color", "#6b7280"),
                "installed_version": None,
                "latest_version": entry.get("latest_version"),
                "update_available": False,
                "has_pro": entry.get("has_pro", False),
                "github_url": entry.get("github_url", ""),
            })

    return {
        "installed": installed,
        "available": available,
        "other": other,
        "fm_url": _get_fm_url(),
    }


@frappe.whitelist()
def refresh_registry() -> dict:
    """Force-refresh the Tonic app registry cache. System Manager only."""
    frappe.only_for("System Manager")
    data = _refresh_registry_cache()
    return {"count": len(data)}


@frappe.whitelist()
def update_app(app: str) -> dict:
    """Trigger app update via Frappe Manager API. System Manager only."""
    frappe.only_for("System Manager")
    return _fm_post("/api/app/update", {"app": app})


@frappe.whitelist()
def install_app(app: str) -> dict:
    """Trigger app install via Frappe Manager API. System Manager only."""
    frappe.only_for("System Manager")
    return _fm_post("/api/app/install", {"app": app})


@frappe.whitelist()
def remove_app(app: str) -> dict:
    """Trigger app removal via Frappe Manager API. System Manager only."""
    frappe.only_for("System Manager")
    return _fm_post("/api/app/remove", {"app": app})


@frappe.whitelist()
def get_job_status(job_id: str) -> dict:
    """Poll FM job status. Returns { job_id, status, log }."""
    return _fm_get(f"/api/job/{job_id}")
