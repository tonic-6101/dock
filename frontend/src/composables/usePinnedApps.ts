// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { ref, type Ref } from 'vue'

const pinnedApps: Ref<string[]> = ref([])
let _initialized = false

function _csrf(): string {
  return (window as any).csrf_token ?? ''
}

async function _call(method: string, args: Record<string, string>): Promise<string[]> {
  const params = new URLSearchParams(args)
  const res = await fetch(`/api/method/dock.api.apps.${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Frappe-CSRF-Token': _csrf(),
    },
    body: params.toString(),
  })
  const data = await res.json()
  return data.message ?? []
}

export function usePinnedApps() {
  function init(bootPinned?: string[]) {
    if (_initialized) return
    if (bootPinned && Array.isArray(bootPinned)) {
      pinnedApps.value = bootPinned
    }
    _initialized = true
  }

  async function pinApp(app: string) {
    // Optimistic update
    if (!pinnedApps.value.includes(app) && pinnedApps.value.length < 6) {
      pinnedApps.value = [...pinnedApps.value, app]
    }
    pinnedApps.value = await _call('pin_app', { app })
  }

  async function unpinApp(app: string) {
    // Optimistic update
    pinnedApps.value = pinnedApps.value.filter(a => a !== app)
    pinnedApps.value = await _call('unpin_app', { app })
  }

  function isPinned(app: string): boolean {
    return pinnedApps.value.includes(app)
  }

  return { pinnedApps, init, pinApp, unpinApp, isPinned }
}
