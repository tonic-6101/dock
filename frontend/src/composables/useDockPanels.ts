// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

import { ref, readonly } from 'vue'

/**
 * Shared panel state for layout-level contextual panels.
 *
 * Provides mutual exclusion: only one panel can be open at a time.
 * Each feature decides when and how to open its panel — this composable
 * only manages the shared state.
 *
 * Also integrates with useDropdownExclusion: opening a panel closes
 * any open dropdown (and vice versa, handled by the dropdown composable).
 */

export type PanelType = 'people' | 'calendar' | 'notifications' | 'timer' | 'context' | 'notes'

const activePanel = ref<PanelType | null>(null)

/** Context panel data — set when opening a 'context' panel for a specific record. */
export interface ContextPanelData {
  referenceDoctype: string
  referenceName: string
  displayName?: string
  doctypeLabel?: string
  app?: string
}
const contextPanelData = ref<ContextPanelData | null>(null)

// Callback for cross-system notification (set by useDropdownExclusion)
let onPanelOpenCallback: (() => void) | null = null

/** Called by useDropdownExclusion to register its close-all handler. */
export function _registerDropdownCloseHandler(fn: () => void) {
  onPanelOpenCallback = fn
}

/** Called by useDropdownExclusion when a dropdown opens — close any panel. */
export function _onDropdownOpened() {
  activePanel.value = null
}

export function useDockPanels() {
  function openPanel(type: PanelType) {
    // Close any open dropdown first
    onPanelOpenCallback?.()
    activePanel.value = type
  }

  function closePanel() {
    activePanel.value = null
    contextPanelData.value = null
  }

  function togglePanel(type: PanelType) {
    if (activePanel.value === type) {
      closePanel()
    } else {
      openPanel(type)
    }
  }

  function isPanelOpen(type: PanelType): boolean {
    return activePanel.value === type
  }

  /** Open the contextual panel for a specific record (from activity feed, etc.) */
  function openContextPanel(data: ContextPanelData) {
    onPanelOpenCallback?.()
    contextPanelData.value = data
    activePanel.value = 'context'
  }

  return {
    activePanel: readonly(activePanel),
    contextPanelData: readonly(contextPanelData),
    openPanel,
    closePanel,
    togglePanel,
    isPanelOpen,
    openContextPanel,
  }
}
