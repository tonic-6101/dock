# Installation

## Requirements

- Frappe v15 or later
- Python 3.10+
- MariaDB 10.6+

## Install

```bash
bench get-app dock https://github.com/tonic/dock
bench --site <your-site> install-app dock
bench --site <your-site> migrate
```

## Configure

After installation, open **Dock Settings** in the Frappe desk to configure:

- **Site label** — name shown in the guest portal header
- **Theme** — default theme (system / light / dark)
- **Timezone** — default timezone for all users
- **Week starts on** — Monday or Sunday
- **Date format** — display format for dates
- **Guest session default expiry** — default link lifetime in days (0 = no expiry)

Users can override theme, timezone, and date format in their own preferences at `/dock/settings`.

## Uninstall

```bash
bench --site <your-site> uninstall-app dock
```

Orphaned Dock records (notifications, bookmarks, recent items, guest sessions) are kept in the database and marked inactive. To remove them entirely, drop the Dock DocType tables manually after uninstall.
