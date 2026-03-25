# Frontend Events

Dock uses browser `CustomEvent` for lightweight communication between apps. These events require no imports — any app can dispatch or listen for them.

## Events dispatched by Dock

### `dock:toggleSidebar`

Fired when the user clicks the sidebar toggle button in the top bar.

```typescript
// Dock dispatches this — your app listens:
window.addEventListener('dock:toggleSidebar', () => {
  sidebarOpen.value = !sidebarOpen.value
})
```

If you use `DockSidebarShell` or `useDockSidebar`, this is handled automatically.

### `dock:jana-panel-mount`

Fired when the Jana assistant panel mounts inside DockNavbar.

```typescript
window.addEventListener('dock:jana-panel-mount', (e: CustomEvent) => {
  // e.detail.container is the HTMLElement where Jana should render
  mountJanaWidget(e.detail.container)
})
```

### `dock:jana-panel-unmount`

Fired when the Jana panel unmounts.

```typescript
window.addEventListener('dock:jana-panel-unmount', () => {
  cleanupJanaWidget()
})
```

## Events your app should dispatch

### `dock:trackVisit`

Dispatch this when users navigate to a record so Dock can track it in Recent Items and Bookmarks.

```typescript
window.dispatchEvent(new CustomEvent('dock:trackVisit', {
  detail: {
    app: 'your_app',            // App name
    doctype: 'Your DocType',    // DocType name
    docname: 'RECORD-001',      // Document name
    label: 'Human-readable',    // Display label
    icon: 'file',               // Optional: Lucide icon name
  }
}))
```

DockNavbar listens for this event and calls `dock.api.recent.track` automatically.

## Realtime events (Frappe publish_realtime)

Dock also publishes server-side realtime events via Frappe's WebSocket layer. These are used internally by the Dock frontend but can be observed by other apps:

| Event | When | Payload |
|-------|------|---------|
| `dock_notification` | New notification published | notification dict |
| `dock_settings_updated` | Org settings saved | — |
| `dock_calendar_shared` | Calendar shared with a user | `{calendar, role}` |
| `dock_rsvp_updated` | Attendee RSVP changed | `{event, user, status}` |
| `dock_time_proposed` | New time proposed for event | `{event, user, proposed_start, proposed_end}` |

Listen for these on the client:

```typescript
frappe.realtime.on('dock_notification', (data) => {
  // Handle new notification
})
```
