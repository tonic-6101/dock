# Installation

## Requirements

- Frappe Framework v16 or later
- Python 3.14+
- Node.js 24+
- MariaDB 10.6+

## Install

```bash
# Get the app
bench get-app dock https://github.com/tonic-6101/dock.git

# Install on your site
bench --site your-site.localhost install-app dock

# Run migrations
bench --site your-site.localhost migrate

# Build frontend assets
bench build --app dock
```

After installation, access Dock at `https://your-site.localhost/dock`.

## Configure

Open **Dock Settings** in the Frappe desk (`/app/dock-settings`) to configure:

| Setting | Description | Default |
|---------|-------------|---------|
| Site label | Name shown in the top bar and guest portal header | — |
| Default app | Route of the app to open on login (e.g. `/orga`) | — |
| Theme | Default theme for all users | `system` |
| Timezone | IANA timezone string (e.g. `Europe/Berlin`) | — |
| Week starts on | First day of the week | Monday |
| Date format | Display format for dates | `dd/mm/yyyy` |

### Feature toggles

| Setting | Description | Default |
|---------|-------------|---------|
| Enable global timer | Show the Watch timer widget in the top bar | On |
| Enable bookmarks | Allow users to pin records | On |
| Enable recent items | Track recently visited pages | On |
| Recent items limit | Max recent items per user | 20 |

### Notifications

| Setting | Description | Default |
|---------|-------------|---------|
| Notification retention days | Days to keep read notifications before cleanup | 90 |

### Guest Portal

| Setting | Description | Default |
|---------|-------------|---------|
| Guest session default expiry days | Default link lifetime in days (0 = no expiry) | 30 |
| Privacy policy URL | Shown in Guest Portal footer (GDPR Art. 13) | — |

### Advanced (System Manager only)

| Setting | Description | Default |
|---------|-------------|---------|
| Frappe Manager URL | Base URL of Frappe Manager API (for ecosystem management) | — |
| Sync log retention days | Days to keep Dock Sync Log entries (0 = forever) | 90 |
| Bin retention days | Days to keep soft-deleted items (0 = forever) | 30 |
| Auto-purge enabled | Automatically purge expired bin items daily | On |
| App order | Drag-and-drop ordering of apps in the top bar | — |

### Per-user overrides

Users can override theme, timezone, week start, and date format at `/dock/settings`. Their preferences cascade on top of the org defaults.

## Update

```bash
cd apps/dock
git pull upstream develop
bench --site your-site.localhost migrate
bench build --app dock
```

## Uninstall

```bash
bench --site your-site.localhost uninstall-app dock
```

Orphaned Dock records (notifications, bookmarks, recent items, guest sessions) are kept in the database and marked inactive. To remove them entirely, drop the Dock DocType tables manually after uninstall.
