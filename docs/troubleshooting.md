# Troubleshooting

## Common issues

### Dock Settings shows "DocType not found" or "not a Single DocType"

**Symptom:** After `bench migrate`, Dock Settings cannot be opened. The desk shows an error about the DocType not being single.

**Cause:** Frappe v16 sometimes does not sync the `issingle` flag during migration.

**Fix:**

```bash
bench --site your-site.localhost console
```

```python
frappe.db.sql("UPDATE `tabDocType` SET issingle=1 WHERE name='Dock Settings'")
frappe.db.commit()
```

Then clear cache:

```bash
bench --site your-site.localhost clear-cache
```

### DockNavbar doesn't appear on the desk

**Check 1:** Verify Dock is installed:

```bash
bench --site your-site.localhost list-apps
```

**Check 2:** Verify assets are built:

```bash
bench build --app dock
```

**Check 3:** Check browser console for `frappe.boot.dock`. If it's `undefined`, the boot hook isn't running. Clear cache and reload:

```bash
bench --site your-site.localhost clear-cache
```

### Domain app can't import DockNavbar

**Symptom:** `import { DockNavbar } from '/assets/dock/js/dock-navbar.esm.js'` fails with 404.

**Fix:** Rebuild Dock assets. The ESM file is generated during `bench build`:

```bash
bench build --app dock
```

Verify the file exists:

```bash
ls sites/assets/dock/js/dock-navbar.esm.js
```

### Timer widget shows "Watch not installed" or is hidden

This is expected behaviour. The timer widget only appears when the Watch app is installed and `enable_global_timer` is enabled in Dock Settings. Dock never hard-depends on Watch.

### Guest portal link returns "Invalid or expired"

**Check 1:** Session may have expired. Check the `expires_at` field on the Dock Guest Session record.

**Check 2:** Session may have been revoked. Check `is_active` on the session record.

**Check 3:** Token format. Valid tokens start with `dgs_` and are 32+ characters.

### Notifications not appearing in real time

**Check 1:** WebSocket connection. Open browser dev tools → Network → WS. You should see an active socket.io connection.

**Check 2:** The publishing app must declare the notification type in `dock_notification_types` hook. Unregistered types are rejected.

**Check 3:** Verify the target user has `Dock User` role.

### Search returns no results for my app

**Check 1:** Verify your app declares `dock_search_sections` in `hooks.py`.

**Check 2:** The search requires at least 2 characters.

**Check 3:** If your section has a `visibility_fn`, make sure that function returns `True` for the current user.

**Check 4:** Clear cache after changing hooks:

```bash
bench --site your-site.localhost clear-cache
```

### Calendar events from other apps don't appear

**Check 1:** The app must declare `dock_calendar_sources` in `hooks.py` with a `get_events` function.

**Check 2:** The `get_events` function must accept `start`, `end`, and `user` parameters and return a list of event dicts.

**Check 3:** Check the browser console for API errors.

### Soft-deleted items not appearing in Bin

Your app must declare `dock_bin_doctypes` in `hooks.py` with `list_endpoint`, `restore_endpoint`, and `delete_endpoint`.

### "Permission denied" errors on Dock records

Dock uses two roles:

- **Dock User** — required for all regular users. Add it via User → Roles.
- **Dock Manager** — required for admin operations (settings, seeing all sessions, etc.)

### Build fails with duplicate Vue runtime

If your domain app bundles its own Vue, you'll get runtime conflicts. Externalize Vue to Dock's shared runtime in your Vite config:

```typescript
// your-app/frontend/vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      vue: '/assets/dock/js/vendor/vue.esm.js',
      'vue-router': '/assets/dock/js/vendor/vue-router.esm.js',
    },
  },
})
```

## Frappe v16 breaking changes

These affect all apps, not just Dock:

| Change | Impact |
|--------|--------|
| Default sort is `creation` not `modified` | Always specify sort explicitly in queries |
| `has_permission` must return `True` | Truthy values no longer work — return explicit `True` |
| `frappe.flags.in_test` deprecated | Use `frappe.in_test` instead |
| `/app` routes redirect to `/desk` | Update any hardcoded `/app/` URLs |
| State-changing methods require POST | GET requests to whitelisted methods that modify data will fail |

## Getting help

- **Issues:** [GitHub Issues](https://github.com/tonic-6101/dock/issues)
- **Discussions:** [GitHub Discussions](https://github.com/tonic-6101/dock/discussions)
