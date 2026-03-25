# Dock — Repository Guidelines

Dock is the coordination layer (Layer 1) for the Tonic ecosystem. It provides the shared top bar, global search, cross-app notifications, and people hub. Dock is infrastructure — it owns the shell; domain apps own the content.

```
Layer 0  Frappe Core (Contact, File, Event...)
Layer 1  Dock          ← this app
Layer 2  Domain Apps   (Watch, Orga, Micro, Home)
Layer 3  Service Apps  (Drive, Repo, Jana)
```

## Stack

- **Backend:** Frappe v16+, Python 3.14+, MariaDB
- **Frontend:** Vue 3 SPA + TypeScript + Tailwind CSS + FrappeUI
- **Key export:** `<DockNavbar />` Vue component (importable by ecosystem apps via ESM)

## Project Structure

```
dock/
├── dock/                      ← Python backend
│   ├── dock/                  ← DocTypes
│   ├── api/                   ← Whitelisted API endpoints
│   ├── hooks.py               ← Frappe hooks
│   └── translations/          ← i18n CSV files
├── frontend/                  ← Vue 3 SPA
│   ├── src/
│   │   ├── components/        ← Vue components
│   │   ├── composables/       ← Vue composables
│   │   ├── pages/             ← Route views
│   │   └── utils/             ← Shared utilities
│   ├── package.json
│   └── vite.config.ts
├── bump_version.py            ← Version management script
├── VERSION                    ← Canonical version source
└── pyproject.toml
```

## Build & Development Commands

```bash
# Frontend development (HMR, no chunk hashing, instant feedback)
cd frontend && npm install && npm run dev

# Production build (only before pushing)
bench build --app dock

# Backend
bench --site <site> migrate
bench run-tests --app dock
bench --site <site> clear-cache
```

**During development, always use `npm run dev`.** Only run `bench build` when preparing to push.

## Coding Style

### TypeScript (mandatory for frontend)

All new code in `frontend/src/` must be TypeScript (`.ts` or `<script lang="ts">`).

### License Headers

All source files must include AGPL-3.0 headers:

```python
# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic
```

```typescript
// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
```

```vue
<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
```

Exceptions: JSON, Markdown, config files (`vite.config.ts`, `tsconfig.json`), auto-generated files.

### Translation (i18n)

All user-facing strings must be wrapped for translation:

```typescript
import { __ } from '@/composables/useTranslate'
// {{ __('Search...') }}
```

```python
from frappe import _
frappe.throw(_("Dock is not installed"))
```

After adding strings, update all CSV files in `dock/translations/`.

## Commit Guidelines

Use conventional commits:

```
feat(scope): description
fix(scope): description
docs(scope): description
refactor(scope): description
```

## Git Workflow

- Remote: `upstream` (sole remote)
- Default branch: `develop`
- **Always** specify remote and branch explicitly: `git push upstream develop`
- **Always** pull before push: `git pull upstream develop --rebase`
- **Never** force push unless explicitly requested

### Preparing a Push

Every push with functional changes must include a version bump and (if frontend changed) a production build:

```bash
# 1. Build frontend (if changed)
bench build --app dock

# 2. Clear site cache
bench --site <site> clear-cache

# 3. Bump version
python3 bump_version.py patch    # 0.3.1 → 0.3.2

# 4. Stage, commit, push
git add -A
git commit -m "feat(scope): description"
git pull upstream develop --rebase
git push upstream develop
```

Version bump levels:
- `patch` — bug fixes, minor features, asset rebuilds
- `minor` — significant new features or breaking UI changes
- `major` — discussed with maintainer first

### Version Files

`bump_version.py` updates all of these — never edit just one:

| File | What it controls |
|------|-----------------|
| `VERSION` | Canonical source of truth |
| `dock/__init__.py` | `__version__` |
| `pyproject.toml` | `version` |
| `frontend/package.json` | `"version"` |

## Hook Integration — How to Register Your App with Dock

Ecosystem apps integrate with Dock by declaring hooks in their own `hooks.py`. **No import of Dock code is needed.**

```python
# In your app's hooks.py

dock_app_registry = {
    "label": "App Name",
    "icon": "icon-name",
    "color": "#hex",
    "route": "/app-route",
}

dock_search_sections = [
    {"label": "Section", "doctype": "App DocType", "search_fields": ["field"]},
]

dock_notification_types = [
    {"type": "event_key", "label": "Human Label", "icon": "icon-name"},
]
```

Dock reads these hooks at runtime from all installed apps.

### Soft Dependency Pattern

When Dock reads from another app, always check if that app is installed:

```python
if "watch" not in frappe.get_installed_apps():
    return None
# safe to proceed
```

## Architecture Rules

**DO:**
- Keep Dock as pure infrastructure — no business logic, no business data
- Always provide fallback when Dock is absent (every ecosystem app must work without it)
- Read other apps' hooks at runtime, never import from them directly

**DON'T:**
- Store business data in Dock DocTypes
- Import Dock code directly from domain apps (use the hook system above)

## Frappe v16 — Known Issues

### Single DocType `issingle` flag

After `bench migrate`, Single DocTypes may have `issingle=0` in the database. Fix:

```python
frappe.db.sql("UPDATE `tabDocType` SET issingle=1 WHERE name='<DocType Name>'")
frappe.db.commit()
```

### Breaking changes from v15

- Default sort order is `creation` (not `modified`) — always specify sort explicitly
- `has_permission` hooks must return explicit `True` (not just truthy)
- `/app` routes redirect to `/desk`
- State-changing methods require POST (not GET)

## Multi-Agent Safety

When multiple agents work concurrently:

- Do **not** create, apply, or drop `git stash` entries unless explicitly requested
- Do **not** switch branches unless explicitly requested
- When you see unrecognized files from another agent, focus on your changes and leave theirs untouched

## Dependency Safety

- Any dependency with patches must use an exact version (no `^` or `~`)
- Patching dependencies requires explicit maintainer approval
- When adding or upgrading dependencies, check for compatibility across the ecosystem

## Bug Investigation

- Read source code of relevant dependencies and all related local code before concluding
- Aim for high-confidence root cause — do not stop at surface-level fixes
- Verify the fix addresses the root cause, not just the symptom
