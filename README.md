# <img src=".github/dock-icon.svg" alt="" width="28" height="28" /> Dock

**Coordination Layer for Tonic's Ecosystem**

[![Version](https://img.shields.io/badge/version-0.3.3-blue.svg)](https://github.com/tonic-6101/dock/releases)
[![Frappe](https://img.shields.io/badge/frappe-v16+-green.svg)](https://frappeframework.com)
[![License](https://img.shields.io/badge/license-AGPL--3.0-orange.svg)](license.txt)

Dock is the coordination layer that gives the Tonic ecosystem a single, consistent experience. Instead of jumping between isolated apps, Dock provides a shared top bar, global search, cross-app notifications, and a people hub — so every app feels like part of one product.

```
Layer 0  Frappe Core
Layer 1  Dock          ← you are here
Layer 2  Domain Apps   (Watch, Orga, Micro, Home)
Layer 3  Service Apps  (Drive, Repo, Jana)
```

Dock is **infrastructure, not a domain app**. It owns the shell; your apps own the content. Every Tonic app works without Dock installed — but with Dock, the experience is seamless.

---

## Features

### Top Bar & App Switcher

A shared navbar across all apps with one-click switching between Orga, Micro, Home, and every other app in the ecosystem. Each app gets its own accent color, label, and icon — configured through a simple hook.

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

### Bookmarks & Recent Items

Pin frequently used records and automatically track recently visited pages across all apps.

### Ecosystem Settings

Organization-wide defaults (timezone, week start, date format, theme) with per-user overrides. Set once, applied everywhere.

---

## Installation

### Prerequisites

- Frappe Framework v16 or higher
- Python 3.14+
- Node.js 24+
- MariaDB 10.6+

### Install via Bench

```bash
# Get the app
bench get-app dock https://github.com/tonic-6101/dock.git

# Install on your site
bench --site your-site.localhost install-app dock

# Run migrations
bench --site your-site.localhost migrate

# Build assets
bench build --app dock
```

### Access the Application

After installation, access Dock at: `https://your-site.localhost/dock`

---

## Integration

Any Frappe app can register itself with Dock through hooks — no imports required.

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

---

## Technology Stack

- **Backend**: Frappe Framework, Python 3.14+
- **Frontend**: Vue 3, TypeScript, Tailwind CSS
- **UI Components**: FrappeUI
- **Database**: MariaDB

---

## Contributing

We welcome contributions! This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

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

---

## Documentation

| Guide | Description |
|-------|-------------|
| [Installation](docs/installation.md) | Install, configure, update, uninstall |
| [Architecture](docs/architecture.md) | Layer model, boot data, ESM exports, build outputs |
| [Integration](docs/integration.md) | Step-by-step guide for connecting your app to Dock |
| [Hook Reference](docs/hooks.md) | All hook types your app can declare |
| [API Reference](docs/api.md) | 119 whitelisted methods across 17 modules |
| [Configuration](docs/configuration.md) | Dock Settings & User Preference fields |
| [Frontend Events](docs/events.md) | CustomEvent bus for cross-app communication |
| [Troubleshooting](docs/troubleshooting.md) | Known issues, FAQ, Frappe v16 gotchas |
| [Changelog](docs/changelog.md) | Version history |

## Support

- **Issues**: [GitHub Issues](https://github.com/tonic-6101/dock/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tonic-6101/dock/discussions)

---

## License

GNU Affero General Public License v3.0 (AGPL-3.0)

See [LICENSE](license.txt) for details.

---

## Acknowledgments

Built with [Frappe Framework](https://frappeframework.com) and [FrappeUI](https://github.com/frappe/frappe-ui).
