// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// Minimal Frappe API caller — works on both Desk (window.frappe.csrf_token)
// and standalone /dock pages (dockBoot.session.csrf_token).

function getCsrf(): string {
  return (
    window.frappe?.csrf_token ??
    (window as any).dockBoot?.session?.csrf_token ??
    ''
  )
}

export async function callApi<T = unknown>(
  method: string,
  args: Record<string, unknown> = {},
): Promise<T> {
  const res = await fetch('/api/method/' + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Frappe-CSRF-Token': getCsrf(),
    },
    body: JSON.stringify(args),
  })

  const json = await res.json()

  if (!res.ok) {
    const msg = json?._server_messages
      ? JSON.parse(json._server_messages)?.[0]?.message
      : json?.exc_type ?? 'Server error'
    throw new Error(msg ?? 'Request failed')
  }

  return json.message as T
}
