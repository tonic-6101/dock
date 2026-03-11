// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

/**
 * Translation helper. Delegates to Frappe's built-in __ function when available.
 * Falls back to the original string in dev / test environments.
 */
export function __(str: string, args?: Record<string, string>): string {
  const translate = (window as any).__
  if (typeof translate === 'function') {
    return translate(str, args)
  }
  return str
}
