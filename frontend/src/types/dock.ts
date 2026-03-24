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
  calendar: string | null
  attendees?: DockEventAttendee[]
  context_panels?: DockContextPanel[]
}

export interface DockCalendar {
  name: string
  title: string
  color: string
  is_default?: 0 | 1
  owner_user: string
  owner_name?: string
  role?: 'View' | 'Edit' | 'Manage'
}

export interface DockCalendarMember {
  user: string
  user_name?: string
  user_image?: string | null
  role: 'View' | 'Edit' | 'Manage'
}

export interface DockContextPanel {
  label: string
  icon?: string
  fields?: { label: string; value: string }[]
  link?: string
  link_label?: string
}

// ── Activity & Discussions (#40-42) ─────────────────────────────────

export interface DockComment {
  name: string
  reference_doctype: string
  reference_name: string
  content: string
  user: string
  user_fullname: string
  user_image: string | null
  parent_comment: string | null
  note_type: 'General' | 'Note' | 'Decision' | 'Protocol' | 'System'
  visibility: 'Internal' | 'Team' | 'Public'
  is_resolved: 0 | 1
  resolved_by: string | null
  resolved_at: string | null
  is_pinned: 0 | 1
  pinned_by: string | null
  pinned_at: string | null
  reply_count: number
  creation: string
}

export interface DockReactionSummary {
  acknowledge: { count: number; users: string[]; current_user: boolean }
  celebrate: { count: number; users: string[]; current_user: boolean }
  seen: { count: number; users: string[]; current_user: boolean }
  flag: { count: number; users: string[]; current_user: boolean }
}

export interface DockDiscussion {
  name: string
  title: string
  content: string
  discussion_type: 'General' | 'Decision' | 'Meeting Protocol' | 'Retrospective' | 'Proposal'
  status: 'Open' | 'Resolved' | 'Archived'
  created_by: string
  created_by_fullname: string
  source_app: string | null
  is_pinned: 0 | 1
  resolved_summary: string | null
  resolved_by: string | null
  resolved_at: string | null
  reply_count: number
  last_reply_at: string | null
  last_reply_by: string | null
  creation: string
  linked_records: DockDiscussionLink[]
  participants: DockDiscussionParticipant[]
  has_unread?: boolean
  unread_count?: number
}

export interface DockDiscussionLink {
  reference_doctype: string
  reference_name: string
  link_label: string | null
}

export interface DockDiscussionParticipant {
  user: string
  role: 'Author' | 'Participant' | 'Mentioned'
  user_fullname?: string
  last_read_at: string | null
}

export interface ActivityFeedItem {
  type: 'insert' | 'update' | 'create' | 'delete' | 'comment' | 'discussion'
  doctype?: string
  doctype_label?: string
  docname?: string
  display_name?: string
  app?: string
  name?: string
  title?: string
  user: string
  user_fullname: string
  user_image?: string | null
  timestamp: string
  summary?: string
  field_changes?: { field: string; old: string; new: string }[]
  comment_count?: number
  discussion_count?: number
  discussion_type?: string
  status?: string
  reply_count?: number
}
