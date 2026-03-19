<p align="center">
  <img src=".github/logo.png" alt="Dock" width="80" />
</p>

<h1 align="center">Dock</h1>

<p align="center">
  The coordination layer for the Tonic ecosystem.<br />
  A unified shell that ties your Frappe apps together.
</p>

<p align="center">
  <a href="#features">Features</a> &middot;
  <a href="#installation">Installation</a> &middot;
  <a href="#integration">Integration</a> &middot;
  <a href="#contributing">Contributing</a> &middot;
  <a href="#license">License</a>
</p>

---

## What is Dock?

Dock is an open-source Frappe app that gives your Tonic ecosystem a single, consistent experience. Instead of jumping between isolated apps, Dock provides a shared top bar, global search, cross-app notifications, and a people hub &mdash; so every app feels like part of one product.

Dock is **infrastructure, not a domain app**. It owns the shell; your apps own the content. Every Tonic app works without Dock installed &mdash; but with Dock, the experience is seamless.

```
Layer 0  Frappe Core
Layer 1  Dock          ← you are here
Layer 2  Domain Apps   (Orga, Micro, Home, Tender, Faktura)
Layer 3  Service Apps  (Frame, Repo, Jana)
```

## Features

### Top Bar &amp; App Switcher
A shared navbar across all apps with one-click switching between Orga, Micro, Home, and every other app in the ecosystem. Each app gets its own accent color, label, and icon &mdash; configured through a simple hook.

### Global Search
Search across every registered app from one place. People, files, calendar events, and any content your apps expose through `dock_search_sections`.

### Cross-App Notifications
A single notification bell that aggregates events from all apps. Never miss a mention, assignment, or update regardless of which app triggered it.

### Timer Widget
Displays the active timer from [Watch](https://github.com/tonic-6101/watch) in the top bar. Start timing in one app, see it everywhere. Hidden automatically when Watch is not installed.

### People Hub
A shared contact directory with privacy controls. See colleagues and contacts across the ecosystem without duplicating records in every app.

### Calendar
Unified calendar events with attendee management. Apps can push events into a single view so you always know what's coming up.

### Guest Portal
Secure, token-based access for external users. Share specific views with guests without giving them full system access.

### Bookmarks &amp; Recent Items
Pin frequently used records and automatically track recently visited pages across all apps.

### Ecosystem Settings
Organization-wide defaults (timezone, week start, date format, theme) with per-user overrides. Set once, applied everywhere.

## Installation

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app https://github.com/tonic-6101/dock --branch main
bench --site your-site.localhost install-app dock
bench --site your-site.localhost migrate
```

## Integration

Any Frappe app can register itself with Dock through hooks &mdash; no imports required.

```python
# your_app/hooks.py

dock_app_registry = {
    "label": "Your App",
    "icon": "layout-grid",
    "color": "#6366f1",
    "route": "/your-app",
}

dock_search_sections = [
    {
        "label": "Projects",
        "doctype": "Your DocType",
        "search_fields": ["name", "title"],
    },
]

dock_notification_types = [
    {
        "type": "task_assigned",
        "label": "Task Assigned",
        "icon": "check-circle",
    },
]
```

Dock reads these hooks at runtime from all installed apps. Your app never imports from Dock directly.

For full integration docs, see [docs/integration.md](docs/integration.md).

## Tech Stack

| Layer | Stack |
|-------|-------|
| Backend | Python 3.10+, Frappe v15+ |
| Frontend | Vue 3, TypeScript, Tailwind CSS, Frappe UI |
| Database | MariaDB |

## Contributing

This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```bash
cd apps/dock
pre-commit install
```

Pre-commit runs the following tools:

- ruff
- eslint
- prettier
- pyupgrade

### Development Setup

```bash
# Enter the Frappe Manager container
fm shell dock.localhost

# Run migrations
bench --site dock.localhost migrate

# Start the frontend dev server
cd apps/dock/frontend
npm install
npm run dev
```

## License

This project is licensed under the [GNU Affero General Public License v3.0](license.txt).

```
SPDX-License-Identifier: AGPL-3.0-or-later
Copyright (C) 2024-2026 Tonic
```
