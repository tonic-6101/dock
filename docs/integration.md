# Integrating Your App with Dock

Dock is optional. Your app must work without it. Never add `dock` to `install_requires`.

## Step 1 — Register your app in hooks.py

```python
# In your_app/hooks.py

# Required: register in the app switcher
dock_app_registry = {
    "label": "Your App",          # Display name in switcher
    "icon": "grid",               # Lucide icon name
    "color": "#16a34a",           # Brand colour (hex, Tailwind 500)
    "route": "/your-app",         # SPA entry route
    "description": "Short description shown in tooltips",
}

# Optional: register searchable content sections
dock_search_sections = [
    {
        "label": "Records",
        "doctype": "Your DocType",
        "search_fields": ["title", "description"],
        "display_field": "title",
        "route_template": "/your-app/records/{name}",
    },
]

# Optional: declare notification types your app can publish
dock_notification_types = [
    {"type": "record_updated", "label": "Record Updated", "icon": "bell"},
]
```

## Step 2 — Load DockNavbar in your Vue app

Replace your app's own top bar with `DockNavbar` when Dock is installed. Fall back to your own header when it isn't.

```typescript
// In your_app/frontend/src/App.vue
import { defineAsyncComponent } from 'vue'

const dockInstalled = !!(window as any).frappe?.boot?.dock?.installed

const DockNavbar = dockInstalled
  ? defineAsyncComponent(() =>
      // @ts-ignore — runtime URL, resolved by browser when Dock is installed
      import('/assets/dock/js/dock-navbar.esm.js').then((m: any) => m.DockNavbar)
    )
  : null
```

```html
<!-- In your template -->
<component v-if="DockNavbar" :is="DockNavbar" />
<YourOwnNavbar v-else />
```

## Step 3 — Track navigation for recent items

Dispatch a `dock:trackVisit` event when users navigate to a record so Dock can surface it in recent items and bookmarks:

```typescript
window.dispatchEvent(new CustomEvent('dock:trackVisit', {
  detail: {
    app: 'your_app',
    doctype: 'Your DocType',
    docname: 'RECORD-001',
    label: 'Human-readable record name',
    icon: 'file',          // optional Lucide icon name
  }
}))
```

## Step 4 — Publish cross-app notifications

Call the Dock notification API from your Python code to push notifications to users:

```python
import frappe

# Only call when Dock is installed
if "dock" in frappe.get_installed_apps():
    frappe.call(
        "dock.api.notifications.publish",
        for_user="user@example.com",
        from_app="your_app",
        notification_type="record_updated",
        title="Record was updated",
        message="Optional detail message",
        reference_doctype="Your DocType",
        reference_name="RECORD-001",
        action_url="/your-app/records/RECORD-001",
    )
```

## Step 5 — Guest Portal (share records publicly)

Use `<DockGuestShareButton />` to add a "Share with client" button to any record view:

```html
<DockGuestShareButton
  view-id="your_app_record"
  source-app="your_app"
  source-doctype="Your DocType"
  source-name="RECORD-001"
  label="Record Title"
/>
```

The component is a no-op when Dock is not installed.

Register your guest views in `hooks.py` so Dock knows which URL to render in the portal iframe:

```python
dock_guest_views = [
    {
        "view_id": "your_app_record",
        "label": "Record",
        "route": "/your-app/records/{name}",
    },
]
```

## Checking if Dock is installed (frontend)

```typescript
const dockInstalled = !!(window as any).frappe?.boot?.dock?.installed
const dockVersion = (window as any).frappe?.boot?.dock?.version  // e.g. "0.1.0"
```

## Checking if Dock is installed (Python)

```python
if "dock" in frappe.get_installed_apps():
    # Dock-specific behaviour
    pass
```
