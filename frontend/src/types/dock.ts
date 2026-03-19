// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic

export interface DockEventAttendee {
  name?: string
  user: string
  user_name?: string
  rsvp_status: 'Pending' | 'Accepted' | 'Declined' | 'Tentative'
  required: 0 | 1
}

export interface DockEvent {
  name: string
  title: string
  start_datetime: string
  end_datetime: string | null
  all_day: 0 | 1
  event_type: string
  color: string | null
  status: 'Scheduled' | 'Completed' | 'Cancelled'
  location: string | null
  meeting_url: string | null
  url: string
  source_app: string
  source_doctype: string
  source_name: string
  description: string | null
  user: string
  attendees?: DockEventAttendee[]
  context_panels?: DockContextPanel[]
}

export interface DockContextPanel {
  label: string
  icon?: string
  fields?: { label: string; value: string }[]
  link?: string
  link_label?: string
}
