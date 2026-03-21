// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { describe, it, expect, vi, afterEach } from 'vitest'
import { relativeTime } from '@/composables/useRelativeTime'

describe('relativeTime', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns "1m" for just now', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-19T12:00:00Z'))
    expect(relativeTime('2026-03-19T12:00:00Z')).toBe('1m')
  })

  it('returns minutes for < 1 hour', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-19T12:30:00Z'))
    expect(relativeTime('2026-03-19T12:00:00Z')).toBe('30m')
  })

  it('returns hours for 1-24 hours', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-19T15:00:00Z'))
    expect(relativeTime('2026-03-19T12:00:00Z')).toBe('3h')
  })

  it('returns date for > 24 hours', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-21T12:00:00Z'))
    const result = relativeTime('2026-03-19T12:00:00Z')
    // Format depends on locale, but should contain "Mar" and "19"
    expect(result).toContain('19')
  })

  it('clamps minimum to 1m', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-19T12:00:05Z'))
    // 5 seconds ago → floor to 0 minutes → clamped to 1m
    expect(relativeTime('2026-03-19T12:00:00Z')).toBe('1m')
  })
})
