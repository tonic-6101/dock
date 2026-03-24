// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

/**
 * Upload a file to Frappe's File API.
 * Returns the file_url on success, or null on failure.
 */
export async function uploadFile(
  file: File,
  options: {
    doctype?: string
    docname?: string
    isPrivate?: boolean
  } = {},
): Promise<string | null> {
  const csrf =
    window.frappe?.csrf_token ??
    (window as any).csrf_token ??
    (window as any).dockBoot?.session?.csrf_token ??
    ''

  const formData = new FormData()
  formData.append('file', file)
  formData.append('is_private', options.isPrivate !== false ? '1' : '0')
  formData.append('folder', 'Home')
  // Only pass doctype+docname together — doctype alone triggers a write permission
  // check that may fail if the user doesn't have explicit create rights.
  if (options.doctype && options.docname) {
    formData.append('doctype', options.doctype)
    formData.append('docname', options.docname)
  }

  try {
    const res = await fetch('/api/method/upload_file', {
      method: 'POST',
      headers: { 'X-Frappe-CSRF-Token': csrf },
      body: formData,
    })
    const json = await res.json()
    if (res.ok && json.message?.file_url) {
      return json.message.file_url as string
    }
    // Log the error so it's visible in the browser console
    console.error('[Dock] File upload failed:', res.status, json)
    return null
  } catch (err) {
    console.error('[Dock] File upload error:', err)
    return null
  }
}

/**
 * Open a file picker dialog and return the selected files.
 */
export function pickFiles(accept = 'image/*'): Promise<File[]> {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    input.multiple = true
    input.style.display = 'none'
    document.body.appendChild(input)
    input.addEventListener('change', () => {
      const files = input.files ? Array.from(input.files) : []
      document.body.removeChild(input)
      resolve(files)
    })
    input.addEventListener('cancel', () => {
      document.body.removeChild(input)
      resolve([])
    })
    input.click()
  })
}
