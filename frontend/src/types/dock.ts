// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

export interface DockEvent {
  name: string
  title: string
  start_datetime: string
  end_datetime: string | null
  all_day: 0 | 1
  event_type: string
  color: string | null
  url: string
  source_app: string
  source_doctype: string
  source_name: string
  description: string | null
  user: string
}
