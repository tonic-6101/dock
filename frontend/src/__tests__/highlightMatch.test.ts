// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { describe, it, expect } from 'vitest'
import { highlightMatch } from '@/utils/highlightMatch'

describe('highlightMatch', () => {
  it('returns escaped text when query is empty', () => {
    expect(highlightMatch('Hello <World>', '')).toBe('Hello &lt;World&gt;')
  })

  it('wraps matching substring in <mark>', () => {
    const result = highlightMatch('Orga Project', 'proj')
    expect(result).toContain('<mark')
    expect(result).toContain('Proj')
    expect(result).toContain('</mark>')
  })

  it('is case-insensitive', () => {
    const result = highlightMatch('Apollo Rebrand', 'apollo')
    expect(result).toContain('<mark')
    expect(result).toContain('Apollo')
  })

  it('highlights multiple occurrences', () => {
    const result = highlightMatch('test the test case', 'test')
    const markCount = (result.match(/<mark/g) || []).length
    expect(markCount).toBe(2)
  })

  it('escapes HTML in the original text', () => {
    const result = highlightMatch('<script>alert("xss")</script>', 'script')
    expect(result).not.toContain('<script>')
    expect(result).toContain('&lt;')
  })

  it('handles regex special characters in query', () => {
    const result = highlightMatch('price is $100.00', '$100')
    expect(result).toContain('<mark')
    expect(result).toContain('$100')
  })

  it('returns escaped text when query has no match', () => {
    expect(highlightMatch('Hello World', 'xyz')).toBe('Hello World')
  })
})
