// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024-2026 Tonic
//
// dock-collab.esm.js entry — domain apps import collaboration components from this bundle.
//
// Usage in a domain app:
//   import { DockCommentThread, DockDiscussionList } from '/assets/dock/js/dock-collab.esm.js'

// Comment components
export { default as DockCommentThread } from './components/comments/DockCommentThread.vue'
export { default as DockCommentInput } from './components/comments/DockCommentInput.vue'
export { default as DockCommentCard } from './components/comments/DockCommentCard.vue'
export { default as DockPromoteToDiscussion } from './components/comments/DockPromoteToDiscussion.vue'

// Reaction components
export { default as DockReactionBar } from './components/reactions/DockReactionBar.vue'

// Discussion components
export { default as DockDiscussionList } from './components/discussions/DockDiscussionList.vue'
export { default as DockDiscussionCard } from './components/discussions/DockDiscussionCard.vue'
export { default as DockDiscussionBadge } from './components/discussions/DockDiscussionBadge.vue'

// Activity components
export { default as DockActivityFeed } from './components/activity/DockActivityFeed.vue'
