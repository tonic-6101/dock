// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { ref, watch, type Ref } from 'vue'

/**
 * Shared dropdown mutual-exclusion state.
 * Only one dropdown can be open at a time across the entire navbar.
 * When a new one opens, the previously open one closes automatically.
 *
 * Also handles focus return (WCAG 2.4.3): when a dropdown closes,
 * focus returns to the trigger element that opened it.
 */

type DropdownId = string

const activeDropdown = ref<DropdownId | null>(null)

export function useDropdownExclusion(
  id: DropdownId,
  triggerRef: Ref<HTMLElement | null | undefined>,
) {
  const open = ref(false)

  function setOpen(value: boolean) {
    if (value) {
      activeDropdown.value = id
      open.value = true
    } else if (open.value) {
      open.value = false
      if (activeDropdown.value === id) activeDropdown.value = null
      // WCAG 2.4.3: return focus to trigger
      triggerRef.value?.focus()
    }
  }

  function toggle() {
    setOpen(!open.value)
  }

  function close() {
    setOpen(false)
  }

  // Close when another dropdown takes over
  watch(activeDropdown, (newId) => {
    if (newId !== id && open.value) {
      open.value = false
      // Don't steal focus — the newly opened dropdown owns it
    }
  })

  return { open, toggle, close }
}
