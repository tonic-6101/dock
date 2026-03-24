// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

/**
 * Composable for showing "Moved to Bin. [Undo]" toast after delete actions.
 * Exported via Dock ESM bundle so domain apps can use it.
 */
export function useBinToast() {
  function showDeleteToast(label: string, onUndo: () => void) {
    const toast = document.createElement('div')
    toast.className =
      'fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 ' +
      'px-4 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 ' +
      'rounded-xl shadow-xl text-sm font-medium transition-opacity duration-300'
    toast.setAttribute('role', 'alert')
    toast.setAttribute('aria-live', 'polite')

    const text = document.createElement('span')
    text.textContent = `Moved to Bin.`
    toast.appendChild(text)

    const undoBtn = document.createElement('button')
    undoBtn.textContent = 'Undo'
    undoBtn.className =
      'px-2 py-1 rounded bg-white/20 dark:bg-black/10 hover:bg-white/30 ' +
      'dark:hover:bg-black/20 text-sm font-medium transition-colors'
    undoBtn.addEventListener('click', () => {
      onUndo()
      toast.remove()
    })
    toast.appendChild(undoBtn)

    document.body.appendChild(toast)

    setTimeout(() => {
      toast.style.opacity = '0'
      setTimeout(() => toast.remove(), 300)
    }, 5000)
  }

  return { showDeleteToast }
}
