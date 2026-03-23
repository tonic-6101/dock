<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Contextual side panel for viewing record details, comments, and discussions.
  Opens from the activity feed when clicking an item.
  Uses DockPanelShell for consistent chrome (header, close, focus trap).
-->
<script lang="ts">
export default { name: 'DockContextPanel' }
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useDockPanels } from '@/composables/useDockPanels'
import DockPanelShell from './DockPanelShell.vue'
import DockCommentThread from './comments/DockCommentThread.vue'
import DockDiscussionList from './discussions/DockDiscussionList.vue'
import DockActivityRecordFeed from './activity/DockActivityRecordFeed.vue'

const { contextPanelData, closePanel } = useDockPanels()

const activeTab = ref<'comments' | 'discussions' | 'activity'>('comments')

// Reset tab when a new record is opened
watch(() => contextPanelData.value?.referenceName, () => {
  activeTab.value = 'comments'
})

const panelTitle = computed(() => {
  if (!contextPanelData.value) return ''
  const { displayName, doctypeLabel } = contextPanelData.value
  if (displayName && doctypeLabel) return `${doctypeLabel}: ${displayName}`
  return displayName || doctypeLabel || ''
})

const tabs = [
  { key: 'comments' as const, label: 'Comments' },
  { key: 'discussions' as const, label: 'Discussions' },
  { key: 'activity' as const, label: 'Activity' },
]

// Tab bar inline styles (immune to cascade)
const tabBarStyle = {
  display: 'flex',
  borderBottom: '1px solid var(--dock-border, #e5e7eb)',
  padding: '0 1rem',
  flexShrink: '0',
}

const tabStyle = {
  padding: '0.5rem 0.75rem',
  fontSize: '0.75rem',
  fontWeight: '500',
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  color: 'var(--dock-icon, #9ca3af)',
  borderBottom: '2px solid transparent',
  transition: 'color 0.15s, border-color 0.15s',
}

const tabActiveStyle = {
  ...tabStyle,
  color: 'var(--dock-accent, #2563eb)',
  borderBottom: '2px solid var(--dock-accent, #2563eb)',
}

const contentPadStyle = {
  padding: '0.75rem 1rem',
  flex: '1',
  overflowY: 'auto' as const,
}
</script>

<template>
  <DockPanelShell
    v-if="contextPanelData"
    :title="panelTitle"
    aria-label="Record context panel"
    @close="closePanel"
  >
    <!-- Tab bar -->
    <div :style="tabBarStyle">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :style="activeTab === tab.key ? tabActiveStyle : tabStyle"
        @click="activeTab = tab.key"
      >
        {{ __(tab.label) }}
      </button>
    </div>

    <!-- Tab content -->
    <div :style="contentPadStyle">
      <DockCommentThread
        v-if="activeTab === 'comments'"
        :reference-doctype="contextPanelData.referenceDoctype"
        :reference-name="contextPanelData.referenceName"
        :show-notes="true"
        compact
      />

      <DockDiscussionList
        v-else-if="activeTab === 'discussions'"
        :reference-doctype="contextPanelData.referenceDoctype"
        :reference-name="contextPanelData.referenceName"
      />

      <DockActivityRecordFeed
        v-else-if="activeTab === 'activity'"
        :reference-doctype="contextPanelData.referenceDoctype"
        :reference-name="contextPanelData.referenceName"
      />
    </div>
  </DockPanelShell>
</template>
