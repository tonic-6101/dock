<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Today's entries summary shown at the bottom of the timer panel.
  Fetched on panel open, refreshed after timer stop.
-->
<script lang="ts">
export default { name: 'DockTimerDailySummary' }
</script>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockTimer } from '@/composables/useDockTimer'

interface DailyEntry {
  name: string
  description?: string
  duration_hours: number
  entry_type?: string
  is_running?: number
  contact?: string | null
  contact_name?: string | null
  context_type?: string | null
  context_name?: string | null
  context_display?: string | null
}

interface DailySummary {
  entries: DailyEntry[]
  total_hours: number
  billable_hours: number
}

const { stoppedEntry } = useDockTimer()

const summary = ref<DailySummary | null>(null)
const loadError = ref(false)

function formatDuration(hours: number): string {
  const totalMinutes = Math.round(hours * 60)
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`
  return `${m}m`
}

async function load() {
  loadError.value = false
  try {
    const today = new Date().toISOString().slice(0, 10)
    const result = await callApi<DailySummary>('dock.api.timer.get_daily_summary', { date: today })
    summary.value = result
  } catch {
    loadError.value = true
  }
}

onMounted(load)

// Refresh after a timer stop
watch(stoppedEntry, (entry) => {
  if (entry) load()
})
</script>

<template>
  <div v-if="summary && summary.entries.length > 0" class="dock-daily-summary">
    <div class="dock-daily-header">
      <span class="dock-daily-label">{{ __('Today') }}</span>
      <span class="dock-daily-total">{{ formatDuration(summary.total_hours) }}</span>
    </div>
    <div class="dock-daily-divider" />
    <div
      v-for="entry in summary.entries"
      :key="entry.name"
      class="dock-daily-entry-row"
    >
      <div class="dock-daily-entry">
        <span class="dock-daily-duration">{{ formatDuration(entry.duration_hours) }}</span>
        <span class="dock-daily-desc">{{ entry.description || '—' }}</span>
        <span
          v-if="entry.name === stoppedEntry"
          class="dock-daily-new"
        >NEW</span>
      </div>
      <div
        v-if="entry.contact_name || entry.context_display"
        class="dock-daily-context"
      >
        <span v-if="entry.contact_name" class="dock-daily-context-item">{{ entry.contact_name }}</span>
        <span v-if="entry.contact_name && entry.context_display"> · </span>
        <span v-if="entry.context_display" class="dock-daily-context-item">{{ entry.context_display }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dock-daily-summary {
  border-top: 1px solid var(--dock-border);
  padding: 0.75rem 1rem;
}

.dock-daily-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.dock-daily-label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--dock-icon);
}

.dock-daily-total {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--dock-text);
}

.dock-daily-divider {
  height: 1px;
  background: var(--dock-border);
  margin-bottom: 0.5rem;
}

.dock-daily-entry-row {
  padding: 0.25rem 0;
}

.dock-daily-entry {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.dock-daily-context {
  margin-left: 4rem;
  font-size: 0.625rem;
  color: var(--dock-icon);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dock-daily-context-item {
  color: var(--dock-icon);
}

.dock-daily-duration {
  flex-shrink: 0;
  width: 3.5rem;
  font-variant-numeric: tabular-nums;
  color: var(--dock-text);
  font-weight: 500;
}

.dock-daily-desc {
  flex: 1;
  color: var(--dock-icon);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dock-daily-new {
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #16a34a;
  padding: 0.0625rem 0.25rem;
  border-radius: 0.25rem;
  background: color-mix(in srgb, #16a34a 10%, transparent);
}
:root.dark .dock-daily-new {
  color: #4ade80;
  background: color-mix(in srgb, #4ade80 10%, transparent);
}
</style>
