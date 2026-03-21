// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { __ } from '@/composables/useTranslate'

describe('useTranslate', () => {
  beforeEach(() => {
    // Reset the global __ mock to identity function
    ;(window as any).__ = (s: string) => s
  })

  it('returns the original string when no translation available', () => {
    ;(window as any).__ = undefined
    expect(__('Search...')).toBe('Search...')
  })

  it('delegates to window.__ when available', () => {
    const mockTranslate = vi.fn().mockReturnValue('Suchen...')
    ;(window as any).__ = mockTranslate
    expect(__('Search...')).toBe('Suchen...')
    expect(mockTranslate).toHaveBeenCalledWith('Search...', undefined)
  })

  it('passes args to the translation function', () => {
    const mockTranslate = vi.fn().mockReturnValue('Hallo Welt')
    ;(window as any).__ = mockTranslate
    __('Hello {0}', { '0': 'World' })
    expect(mockTranslate).toHaveBeenCalledWith('Hello {0}', { '0': 'World' })
  })
})
