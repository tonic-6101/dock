# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

import frappe
from dock import __version__
from dock.api.messages import get_message_channels, get_unread_counts
from dock.api.settings import _get_merged_settings


def extend_bootinfo(bootinfo):
    """Inject frappe.boot.dock — available client-side as window.frappe.boot.dock."""
    if not frappe.db.exists("DocType", "Dock Settings"):
        # Guard: not fully installed yet (e.g. mid-migration)
        return

    merged = _get_merged_settings(frappe.session.user)
    watch_installed = "watch" in frappe.get_installed_apps()

    bootinfo.dock = {
        "installed": True,
        "version": __version__,
        "settings": merged,
        "registered_apps": _get_registered_apps(),
        # calendar_sources — seeded at boot to drive sidebar toggles + create picker
        "calendar_sources": _get_calendar_sources(),
        # user_calendars — owned + shared calendars for sidebar grouping
        "user_calendars": _get_user_calendars(),
        # notification_types: dict keyed by type for O(1) icon/label resolution
        "notification_types": _get_notification_types(),
        # Muted notification types — user's personal mute list
        "muted_notification_types": _get_muted_notification_types(),
        # Bell badge — avoids extra API call on mount
        "unread_notifications": frappe.db.count(
            "Dock Notification",
            {"for_user": frappe.session.user, "read": 0},
        ),
        # Timer — soft dependency on watch (formerly frappe_time)
        "watch_installed": watch_installed,
        "timer_state": _get_timer_state() if watch_installed else None,
        "timer_context_options": _get_timer_context_options() if watch_installed else [],
        "focus_defaults": _get_focus_defaults() if watch_installed else {},
        "stale_threshold_hours": _get_stale_threshold() if watch_installed else 4,
        # Recent items + bookmarks — seeded at boot to avoid extra API calls on mount
        "recent_items": _get_recent_items(merged),
        "bookmarks": _get_bookmarks(merged),
        # Search sections per app — drives second-level scope tabs in the search modal
        "search_sections": _get_search_sections(),
        # Guest views — collected from dock_guest_views hooks; used by Guest Portal shell
        "guest_views": _get_guest_views(),
        # Settings sections — collected from dock_settings_sections hooks; drives sidebar
        "settings_sections": _get_settings_sections(),
        # Bridges — collected from dock_bridges hooks; drives Integrations dashboard
        "bridges": _get_bridges(),
        # Activity sources — collected from dock_activity_sources hooks; drives activity feed filters
        "activity_sources": _get_activity_sources(),
        # Messages (#52) — unified communication channels + aggregated unread counts
        "message_channels": get_message_channels(),
        "unread_counts": get_unread_counts(),
        # Backward compat (v0.3.x) — deprecated, use unread_counts.channels.discussions
        "unread_discussions": _get_unread_discussions_count(),
        # Note actions — collected from dock_note_actions hooks; drives note context menus
        "note_actions": _get_note_actions(),
        "bin_count": _get_bin_count(),
        "pinned_apps": _get_pinned_apps(),
    }


@frappe.whitelist()
def get_boot():
    """Return dock boot data for domain-app SPAs that bypass Frappe's standard boot."""
    if not frappe.db.exists("DocType", "Dock Settings"):
        return {"installed": False}

    merged = _get_merged_settings(frappe.session.user)
    watch_installed = "watch" in frappe.get_installed_apps()

    return {
        "installed": True,
        "version": __version__,
        "settings": merged,
        "registered_apps": _get_registered_apps(),
        "calendar_sources": _get_calendar_sources(),
        "user_calendars": _get_user_calendars(),
        "notification_types": _get_notification_types(),
        "muted_notification_types": _get_muted_notification_types(),
        "unread_notifications": frappe.db.count(
            "Dock Notification",
            {"for_user": frappe.session.user, "read": 0},
        ),
        "watch_installed": watch_installed,
        "timer_state": _get_timer_state() if watch_installed else None,
        "timer_context_options": _get_timer_context_options() if watch_installed else [],
        "focus_defaults": _get_focus_defaults() if watch_installed else {},
        "stale_threshold_hours": _get_stale_threshold() if watch_installed else 4,
        "recent_items": _get_recent_items(merged),
        "bookmarks": _get_bookmarks(merged),
        "search_sections": _get_search_sections(),
        "guest_views": _get_guest_views(),
        "settings_sections": _get_settings_sections(),
        "bridges": _get_bridges(),
        "activity_sources": _get_activity_sources(),
        "message_channels": get_message_channels(),
        "unread_counts": get_unread_counts(),
        "unread_discussions": _get_unread_discussions_count(),
        "note_actions": _get_note_actions(),
        "bin_count": _get_bin_count(),
        "pinned_apps": _get_pinned_apps(),
    }


_REQUIRED_APP_REGISTRY_FIELDS = {"label", "color", "route"}

# Apps excluded from Tier 3 auto-discovery (they're handled explicitly)
_INTERNAL_APPS = {"frappe", "dock"}


def _get_registered_apps():
    """Return all apps visible to the current user, grouped by tier.

    Tier 1 (ecosystem): apps declaring dock_app_registry in hooks.py
    Tier 2 (platform):  Frappe Desk — always present, visibility-controlled
    Tier 3 (external):  other installed apps, auto-discovered
    """
    installed = frappe.get_installed_apps()
    registered_app_names = set()
    registered = []
    user = frappe.session.user
    is_system_manager = "System Manager" in frappe.get_roles(user)

    # — Tier 1: Ecosystem apps (declare dock_app_registry) —
    for app in installed:
        registry = frappe.get_hooks("dock_app_registry", app_name=app)
        if not registry:
            continue
        # get_hooks may return the raw dict or a list-wrapped dict
        entry = registry if isinstance(registry, dict) else registry[0]
        # Frappe normalizes hook values to lists — unwrap single-item lists
        unwrapped = {k: v[0] if isinstance(v, list) and len(v) == 1 else v for k, v in entry.items()}
        missing = _REQUIRED_APP_REGISTRY_FIELDS - set(unwrapped.keys())
        if missing:
            frappe.log_error(
                f"dock: {app} dock_app_registry missing required fields: {missing}",
                "Dock Hook Validation",
            )
            continue
        # Permission check (existing behavior)
        if not is_system_manager:
            has_perm_fn = unwrapped.get("has_permission")
            if has_perm_fn and not frappe.call(has_perm_fn):
                continue
        registered.append({"app": app, "tier": "ecosystem", **unwrapped})
        registered_app_names.add(app)

    # — Tier 2: Frappe Desk —
    if _is_app_visible("frappe", user, is_system_manager):
        registered.append({
            "app": "frappe",
            "label": "Desk",
            "icon": "/assets/frappe/images/frappe-framework-logo.svg",
            "color": "#0089FF",
            "route": "/app",
            "tier": "platform",
        })
    registered_app_names.add("frappe")

    # — Tier 3: Other installed apps (auto-discovered) —
    # Sort by usage frequency for this user (last 30 days)
    tier3_apps = [a for a in installed if a not in registered_app_names and a not in _INTERNAL_APPS]
    visit_counts = _get_app_visit_counts(user, tier3_apps) if tier3_apps else {}
    for app in tier3_apps:
        if not _is_app_visible(app, user, is_system_manager):
            continue
        resolved = _resolve_external_app(app)
        resolved["visit_count"] = visit_counts.get(app, 0)
        registered.append({"app": app, "tier": "external", **resolved})

    # Sort Tier 3 by usage frequency (most-used first), then alphabetical
    ecosystem_and_platform = [a for a in registered if a["tier"] != "external"]
    external = sorted(
        [a for a in registered if a["tier"] == "external"],
        key=lambda a: (-a.get("visit_count", 0), a.get("label", "")),
    )
    # Remove visit_count from payload (internal only)
    for a in external:
        a.pop("visit_count", None)

    return ecosystem_and_platform + external


def _resolve_external_app(app):
    """Resolve label, icon, color, and route for an unregistered app."""
    # Label: app_title hook -> humanized name
    app_title = frappe.get_hooks("app_title", app_name=app)
    label = app_title[0] if app_title else app.replace("_", " ").title()

    # Icon: app_logo_url hook -> None (frontend renders squircle)
    app_logo = frappe.get_hooks("app_logo_url", app_name=app)
    icon = app_logo[0] if app_logo else ""

    # Route: cascading probe
    route = _resolve_app_route(app)

    return {"label": label, "icon": icon, "color": "", "route": route}


def _resolve_app_route(app):
    """Cascading route resolution for apps without dock_app_registry.

    Priority:
    1. add_to_apps_screen hook (explicit Frappe registration)
    2. app_home hook (legacy explicit)
    3. website_route_rules containing /{app}/ (SPA convention)
    4. First workspace linked to the app's module
    5. /app fallback (Frappe desk)
    """
    # 1. add_to_apps_screen hook
    apps_screen = frappe.get_hooks("add_to_apps_screen", app_name=app)
    if apps_screen:
        entry = apps_screen[0] if isinstance(apps_screen, list) else apps_screen
        if isinstance(entry, dict):
            route = entry.get("route")
            if isinstance(route, list):
                route = route[0]
            if route:
                return route

    # 2. app_home hook
    app_home = frappe.get_hooks("app_home", app_name=app)
    if app_home:
        home = app_home[0] if isinstance(app_home, list) else app_home
        if home:
            return home

    # 3. website_route_rules containing /{app_name}/
    route_rules = frappe.get_hooks("website_route_rules", app_name=app)
    if route_rules:
        for rule in route_rules:
            if isinstance(rule, list):
                for r in rule:
                    if isinstance(r, dict) and f"/{app}" in r.get("from_route", ""):
                        return f"/{app}"
            elif isinstance(rule, dict) and f"/{app}" in rule.get("from_route", ""):
                return f"/{app}"

    # 4. First workspace linked to the app's module
    try:
        workspace = frappe.db.get_value(
            "Workspace",
            {"module": app.replace("_", " ").title()},
            "name",
        )
        if workspace:
            return f"/app/{frappe.scrub(workspace)}"
    except Exception:
        pass

    # 5. Fallback
    return "/app"


def _is_app_visible(app, user, is_system_manager):
    """Check if an app should be visible to the given user.

    Layer 1: System Manager always sees all
    Layer 2: Admin override from Dock Settings (if configured)
    Layer 3: Auto-detection from app's user_roles hook
    Layer 4: Default to visible
    """
    if is_system_manager:
        return True

    # Check admin override (Dock App Visibility child table)
    override = _get_visibility_override(app)
    if override:
        if override["mode"] == "Hidden":
            return False
        if override["mode"] == "Everyone":
            return True
        if override["mode"] == "By Role":
            user_roles = set(frappe.get_roles(user))
            return bool(user_roles & set(override.get("roles", [])))
        # "Auto" falls through to auto-detection below

    # Auto-detect from app's user_roles hook
    user_roles_hook = frappe.get_hooks("user_roles", app_name=app)
    if user_roles_hook:
        declared_roles = set()
        for entry in user_roles_hook:
            if isinstance(entry, list):
                declared_roles.update(entry)
            elif isinstance(entry, dict):
                declared_roles.update(entry.values())
            else:
                declared_roles.add(entry)
        if declared_roles:
            user_roles = set(frappe.get_roles(user))
            return bool(user_roles & declared_roles)

    # Default: visible to all
    return True


def _get_visibility_override(app):
    """Read admin override from Dock Settings child table, cached per request."""
    if not hasattr(frappe.local, "_dock_app_visibility"):
        overrides = {}
        try:
            rows = frappe.get_all(
                "Dock App Visibility",
                filters={"parenttype": "Dock Settings"},
                fields=["app", "mode", "roles"],
            )
            for row in rows:
                overrides[row["app"]] = {
                    "mode": row["mode"],
                    "roles": [r.strip() for r in (row.get("roles") or "").split(",") if r.strip()],
                }
        except Exception:
            pass
        frappe.local._dock_app_visibility = overrides
    return frappe.local._dock_app_visibility.get(app)


def _get_app_visit_counts(user, apps):
    """Count recent visits per app for usage-frequency ordering (Tier 3)."""
    if not apps:
        return {}
    try:
        result = frappe.db.sql("""
            SELECT app, COUNT(*) as visits
            FROM `tabDock Recent Item`
            WHERE user = %s AND visited_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
              AND app IN %s
            GROUP BY app
        """, (user, apps), as_dict=True)
        return {r["app"]: r["visits"] for r in result}
    except Exception:
        return {}


def _get_calendar_sources():
    """Returns apps that declare dock_calendar_sources, merged with registry color/label."""
    registered = {r["app"]: r for r in _get_registered_apps()}
    sources = []
    for app in frappe.get_installed_apps():
        decl = frappe.get_hooks("dock_calendar_sources", app_name=app)
        if not decl:
            continue
        # get_hooks may return a dict or a list — normalize
        entry = decl if isinstance(decl, dict) else decl[0]
        # Unwrap single-item list values (Frappe normalizes hook values to lists)
        entry = {k: v[0] if isinstance(v, list) and len(v) == 1 else v for k, v in entry.items()}
        reg = registered.get(app, {})
        sources.append({
            "app": app,
            "label": reg.get("label", app),
            "color": reg.get("color", "#6b7280"),
            "event_label": entry.get("event_label", "Event"),
            "create_route_template": entry.get("create_route_template"),
        })
    return sources


def _get_user_calendars():
    """Returns the current user's owned + shared calendars for sidebar rendering."""
    try:
        if not frappe.db.exists("DocType", "Dock Calendar"):
            return {"user_calendars": [], "shared_calendars": []}
        from dock.api.calendars import get_calendars
        return get_calendars()
    except Exception:
        return {"user_calendars": [], "shared_calendars": []}


_REQUIRED_NOTIFICATION_TYPE_FIELDS = {"type", "label", "icon"}


def _get_notification_types():
    """Returns dict keyed by notification type for O(1) frontend resolution."""
    types = {}
    for app in frappe.get_installed_apps():
        for t in frappe.get_hooks("dock_notification_types", app_name=app):
            items = t if isinstance(t, list) else [t]
            for item in items:
                if not isinstance(item, dict):
                    continue
                missing = _REQUIRED_NOTIFICATION_TYPE_FIELDS - set(item.keys())
                if missing:
                    frappe.log_error(
                        f"dock: {app} dock_notification_types entry missing fields: {missing}",
                        "Dock Hook Validation",
                    )
                    continue
                key = item["type"]
                if key in types:
                    frappe.log_error(
                        f"dock: duplicate notification type '{key}' declared by '{app}' "
                        f"(already registered by '{types[key]['app']}'). First declaration wins.",
                        "Dock Hook Validation",
                    )
                    continue
                types[key] = {
                    "label": item["label"],
                    "icon": item["icon"],
                    "app": app,
                }
    return types


def _get_recent_items(settings):
    if not settings.get("enable_recent_items"):
        return []
    items = frappe.get_all(
        "Dock Recent Item",
        filters={"user": frappe.session.user},
        fields=["name", "app", "ref_doctype as doctype", "docname", "label", "icon", "visited_at"],
        order_by="visited_at desc",
        limit=8,
    )
    for item in items:
        if hasattr(item.get("visited_at"), "isoformat"):
            item["visited_at"] = item["visited_at"].isoformat()
    return items


def _get_bookmarks(settings):
    if not settings.get("enable_bookmarks"):
        return []
    return frappe.get_all(
        "Dock Bookmark",
        filters={"user": frappe.session.user},
        fields=["name", "app", "doctype", "docname", "label", "icon", "color", "sort_order"],
        order_by="sort_order asc",
        limit=12,
    )


def _get_timer_state():
    try:
        from dock.api.timer import get_state
        return get_state()
    except Exception:
        return {"state": "unavailable"}


def _get_timer_context_options():
    try:
        from dock.api.timer import get_context_options
        return get_context_options()
    except Exception:
        return []


def _get_focus_defaults():
    """Return focus/Pomodoro defaults from Watch User Settings (per-user) or Watch Settings (org)."""
    try:
        user = frappe.session.user
        if frappe.db.exists("Watch User Settings", user):
            doc = frappe.get_doc("Watch User Settings", user)
            return {
                "sessions": doc.get("focus_sessions") or 4,
                "work_minutes": doc.get("focus_work_minutes") or 25,
                "break_minutes": doc.get("focus_break_minutes") or 5,
            }
        return {"sessions": 4, "work_minutes": 25, "break_minutes": 5}
    except Exception:
        return {"sessions": 4, "work_minutes": 25, "break_minutes": 5}


def _get_stale_threshold():
    """Return stale timer threshold in hours from Watch Settings."""
    try:
        val = frappe.db.get_single_value("Watch Settings", "auto_stop_timer_after") or 0
        return int(val) if int(val) > 0 else 4
    except Exception:
        return 4


def _get_guest_views():
    """
    Collects dock_guest_views from all installed apps.
    Shape: [{ "view_id": "orga.project_status", "label": "...", "route": "...", "app": "orga" }, ...]
    Used by the Guest Portal shell to resolve the iframe URL for a session's view_id.
    """
    views = []
    for app in frappe.get_installed_apps():
        hook_views = frappe.get_hooks("dock_guest_views", app_name=app)
        for view_list in hook_views:
            items = view_list if isinstance(view_list, list) else [view_list]
            for v in items:
                views.append({
                    "view_id": v.get("view_id"),
                    "label": v.get("label"),
                    "route": v.get("route"),
                    "app": app,
                })
    return views


def _get_settings_sections():
    """
    Collects dock_settings_sections from all installed apps.
    Each app declares its settings UI via hooks.py — Dock renders them in the
    sidebar and loads the app's settings component at runtime.

    Shape: [{
        "app": "orga",
        "label": "Orga",
        "icon": "briefcase",
        "route": "orga",
        "component": "OrgaSettings",
        "bundle": "/assets/orga/js/orga-settings.esm.js",
        "permission": "Orga Settings",  # optional
        "sections": [{"label": "General", "key": "general"}, ...]  # optional
    }, ...]
    """
    sections = []
    declared_apps = set()
    for app in frappe.get_installed_apps():
        hook_sections = frappe.get_hooks("dock_settings_sections", app_name=app)
        if not hook_sections:
            continue
        for entry in hook_sections:
            items = entry if isinstance(entry, list) else [entry]
            for item in items:
                if not isinstance(item, dict):
                    continue
                # Permission check — only include if user has required role
                perm = item.get("permission")
                if perm:
                    if isinstance(perm, list):
                        perm = perm[0]
                    user_roles = frappe.get_roles(frappe.session.user)
                    if perm not in user_roles and "System Manager" not in user_roles:
                        continue
                # Unwrap single-item list values (Frappe normalizes hook values to lists)
                unwrapped = {}
                for k, v in item.items():
                    if isinstance(v, list) and len(v) == 1 and k != "sections":
                        unwrapped[k] = v[0]
                    else:
                        unwrapped[k] = v
                # Unwrap nested sections list values
                if "sections" in unwrapped:
                    clean_sections = []
                    raw_sections = unwrapped["sections"]
                    if isinstance(raw_sections, list):
                        for s in raw_sections:
                            if isinstance(s, dict):
                                clean_sections.append({
                                    sk: sv[0] if isinstance(sv, list) and len(sv) == 1 else sv
                                    for sk, sv in s.items()
                                })
                    unwrapped["sections"] = clean_sections
                sections.append({"app": app, **unwrapped})
                declared_apps.add(app)

    # Auto-generate entries for registered apps that don't declare their own settings
    for reg in _get_registered_apps():
        app = reg["app"]
        if app in declared_apps or app == "dock":
            continue
        sections.append({
            "app": app,
            "label": reg.get("label", app.title()),
            "icon": reg.get("icon", ""),
            "icon_url": reg.get("icon", ""),
            "route": app,
        })

    return sections


def _get_search_sections():
    """
    Returns a dict of app → list of section labels/doctypes.
    Used by the frontend search modal to render second-level section tabs.
    Shape: { "orga": [{ "label": "Projects", "doctype": "Orga Project" }, ...], ... }
    """
    result = {}
    for app in frappe.get_installed_apps():
        if app == "frappe":
            continue
        hook_sections = frappe.get_hooks("dock_search_sections", app_name=app)
        if not hook_sections:
            continue
        sections = []
        for section_list in hook_sections:
            items = section_list if isinstance(section_list, list) else [section_list]
            for s in items:
                entry = {
                    "label": s.get("label"),
                    "doctype": s.get("doctype"),
                }
                # Include route_template so frontend can resolve URL slug → DocType
                rt = s.get("route_template")
                if rt:
                    entry["route_template"] = rt
                sections.append(entry)
        if sections:
            result[app] = sections
    return result


_REQUIRED_BRIDGE_FIELDS = {"label", "target_app", "source_doctype", "direction"}


def _get_bridges():
    """
    Collects dock_bridges from all installed apps.
    Each app declares its Frappe/ERPNext integration bridges — Dock renders
    them in the Integrations dashboard and proxies status/sync calls.

    Shape: [{
        "app": "watch",
        "label": "ERPNext Timesheet Sync",
        "target_app": "erpnext",
        "target_doctype": "Timesheet",
        "source_doctype": "Watch Entry",
        "direction": "one_way",          # one_way | two_way
        "target_installed": True,
        "status_endpoint": "watch.api.erpnext_bridge.get_sync_status",
        "sync_endpoint": "watch.api.erpnext_bridge.bulk_sync",
        "settings_route": "/watch/settings#erpnext",
    }, ...]
    """
    installed_apps = frappe.get_installed_apps()
    bridges = []
    for app in installed_apps:
        for decl in frappe.get_hooks("dock_bridges", app_name=app):
            items = decl if isinstance(decl, list) else [decl]
            for item in items:
                if not isinstance(item, dict):
                    continue
                # Unwrap single-item list values (Frappe normalizes hook values to lists)
                unwrapped = {
                    k: v[0] if isinstance(v, list) and len(v) == 1 else v
                    for k, v in item.items()
                }
                missing = _REQUIRED_BRIDGE_FIELDS - set(unwrapped.keys())
                if missing:
                    frappe.log_error(
                        f"dock: {app} dock_bridges entry missing required fields: {missing}",
                        "Dock Hook Validation",
                    )
                    continue
                target_installed = unwrapped["target_app"] in installed_apps
                bridges.append({
                    "app": app,
                    "target_installed": target_installed,
                    **unwrapped,
                })
    return bridges


def _get_activity_sources():
    """
    Collects dock_activity_sources from all installed apps.
    Shape: [{ "app": "orga", "doctype": "Orga Task", "label": "Task", "icon": "check-square" }, ...]
    Used by the activity feed to determine which doctypes generate visible activity.
    """
    sources = []
    for app in frappe.get_installed_apps():
        for source_list in frappe.get_hooks("dock_activity_sources", app_name=app):
            items = source_list if isinstance(source_list, list) else [source_list]
            for item in items:
                if not isinstance(item, dict):
                    continue
                unwrapped = {
                    k: v[0] if isinstance(v, list) and len(v) == 1 else v
                    for k, v in item.items()
                }
                sources.append({"app": app, **unwrapped})
    return sources


def _get_unread_discussions_count():
    """Count discussions where the current user is a participant with unread replies."""
    user = frappe.session.user
    if not frappe.db.exists("DocType", "Dock Discussion"):
        return 0
    try:
        result = frappe.db.sql("""
            SELECT COUNT(DISTINCT dd.name)
            FROM `tabDock Discussion` dd
            INNER JOIN `tabDock Discussion Participant` ddp
                ON ddp.parent = dd.name AND ddp.user = %s
            WHERE dd.status = 'Open'
              AND dd.last_reply_at IS NOT NULL
              AND (ddp.last_read_at IS NULL OR ddp.last_read_at < dd.last_reply_at)
        """, (user,))
        return result[0][0] if result else 0
    except Exception:
        return 0


_REQUIRED_NOTE_ACTION_FIELDS = {"action", "label", "icon", "handler"}


def _get_note_actions():
    """
    Collects dock_note_actions from all installed apps.
    Each app declares actions that can be performed on a Dock Note
    (e.g. "Convert to Task").

    Shape: [{
        "action": "convert_to_task",
        "label": "Convert to Task",
        "icon": "check-square",
        "handler": "orga.orga.integrations.dock_notes.convert_to_task",
        "app": "orga",
    }, ...]
    """
    installed_apps = frappe.get_installed_apps()
    actions = []
    for app in installed_apps:
        for decl in frappe.get_hooks("dock_note_actions", app_name=app):
            items = decl if isinstance(decl, list) else [decl]
            for item in items:
                if not isinstance(item, dict):
                    continue
                unwrapped = {
                    k: v[0] if isinstance(v, list) and len(v) == 1 else v
                    for k, v in item.items()
                }
                missing = _REQUIRED_NOTE_ACTION_FIELDS - set(unwrapped.keys())
                if missing:
                    frappe.log_error(
                        f"dock: {app} dock_note_actions entry missing fields: {missing}",
                        "Dock Hook Validation",
                    )
                    continue
                actions.append({"app": app, **unwrapped})
    return actions


def _get_bin_count():
    """Total bin item count across all registered apps."""
    total = 0
    for app in frappe.get_installed_apps():
        for decl in frappe.get_hooks("dock_bin_doctypes", app_name=app):
            items = decl if isinstance(decl, list) else [decl]
            for item in items:
                if not isinstance(item, dict):
                    continue
                dt = item.get("doctype")
                if isinstance(dt, list):
                    dt = dt[0]
                if dt and frappe.db.exists("DocType", dt):
                    try:
                        total += frappe.db.count(dt, {"deleted": 1})
                    except Exception:
                        pass
    return total


def _get_pinned_apps():
    """Return the current user's pinned app names list."""
    import json as _json
    user = frappe.session.user
    try:
        raw = frappe.db.get_value("Dock User Preference", user, "pinned_apps")
        if raw:
            parsed = _json.loads(raw)
            if isinstance(parsed, list):
                return parsed[:6]  # Max 6 pinned apps
    except Exception:
        pass
    return []


def _get_muted_notification_types():
    """Return the current user's muted notification type keys."""
    import json as _json

    user = frappe.session.user
    try:
        raw = frappe.db.get_value("Dock User Preference", user, "muted_notification_types")
        if raw:
            parsed = _json.loads(raw)
            if isinstance(parsed, list):
                return parsed
    except Exception:
        pass
    return []
