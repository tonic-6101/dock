<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2026 Tonic

  Daily Briefing panel — shows structured data from all installed apps.
  No LLM involved: instant, zero cost, always available.
  "Discuss with Jana" CTA at the bottom opens the Jana chat panel.
-->
<script lang="ts">
export default { name: 'DockBriefingPanel' }
</script>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import {
  ListChecks, Briefcase, Home,
  AlertTriangle, CalendarDays, Milestone, MessageSquare, Bell,
} from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { useDockPanels } from '@/composables/useDockPanels'
import { useDockBriefing } from '@/composables/useDockBriefing'
import DockPanelShell from './DockPanelShell.vue'

const { closePanel, openPanel } = useDockPanels()
const { data, loading, error, fetchBriefing, getAppData, activeApps } = useDockBriefing()

onMounted(() => {
  fetchBriefing()
})

// ── Derived sections ───────────────────────────────────

const watchData = computed(() => getAppData('watch'))
const orgaData = computed(() => getAppData('orga'))
const microData = computed(() => getAppData('micro'))
const homeData = computed(() => getAppData('home'))
const janaInstalled = computed(() => {
  return 'jana' in ((window as any).frappe?.boot?.versions ?? {})
})

function openJana() {
  openPanel('jana')
  // Dispatch event so Jana panel auto-selects Daily Briefing agent
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('dock:jana-briefing', {
      detail: { agent: 'Daily Briefing', prompt: 'Generate my morning briefing for today.' },
    }))
  }, 300)
}

// ── Alerts (cross-app) ───────────────────────────────
const alerts = computed(() => {
  const items: Array<{ key: string; label: string; detail: string }> = []
  if (watchData.value && Array.isArray(watchData.value.budget_alerts)) {
    for (const a of watchData.value.budget_alerts as any[]) {
      items.push({
        key: `budget-${a.tag}`,
        label: a.tag,
        detail: `${a.usage_percent}% ${__('of budget')}`,
      })
    }
  }
  return items
})

// Inline styles for section cards
const sectionStyle = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid var(--dock-border)',
}

const sectionTitleStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.8125rem',
  fontWeight: '600',
  color: 'var(--dock-text)',
  marginBottom: '0.5rem',
}

const itemStyle = {
  fontSize: '0.8125rem',
  color: 'var(--dock-text)',
  opacity: '0.85',
  padding: '0.2rem 0',
  lineHeight: '1.4',
}

const highlightStyle = {
  fontWeight: '600',
  color: 'var(--dock-text)',
}

const warningStyle = {
  color: '#d97706',
  fontWeight: '600',
}

const mutedStyle = {
  fontSize: '0.75rem',
  color: 'var(--dock-icon)',
}

const ctaStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  width: '100%',
  padding: '0.625rem 1rem',
  border: 'none',
  borderRadius: '0.5rem',
  fontSize: '0.8125rem',
  fontWeight: '600',
  color: 'white',
  background: '#7c3aed',
  cursor: 'pointer',
}

const emptyStyle = {
  padding: '2rem 1rem',
  textAlign: 'center' as const,
  fontSize: '0.8125rem',
  color: 'var(--dock-icon)',
}
</script>

<template>
  <DockPanelShell title="Daily Briefing" @close="closePanel">
    <!-- Loading -->
    <div v-if="loading" :style="emptyStyle">
      {{ __('Loading briefing...') }}
    </div>

    <!-- Error -->
    <div v-else-if="error" :style="emptyStyle">
      {{ __('Could not load briefing data.') }}
      <button
        :style="{ ...ctaStyle, marginTop: '0.75rem', background: 'var(--dock-icon)' }"
        @click="fetchBriefing()"
      >{{ __('Retry') }}</button>
    </div>

    <!-- Empty -->
    <div v-else-if="activeApps.length === 0" :style="emptyStyle">
      {{ __('No briefing data available.') }}
    </div>

    <!-- Data sections -->
    <template v-else>
      <!-- Alerts (cross-app) -->
      <div v-if="alerts.length > 0" :style="sectionStyle">
        <div :style="sectionTitleStyle">
          <Bell class="w-4 h-4" style="color: #dc2626" />
          {{ __('Alerts') }}
        </div>
        <div v-for="alert in alerts" :key="alert.key" :style="itemStyle">
          <span :style="warningStyle">
            <AlertTriangle class="w-3 h-3 inline" />
            {{ alert.label }}:
          </span>
          {{ alert.detail }}
        </div>
      </div>

      <!-- Orga: Tasks & Calendar -->
      <div v-if="orgaData" :style="sectionStyle">
        <div :style="sectionTitleStyle">
          <ListChecks class="w-4 h-4" style="color: #16a34a" />
          {{ __('Tasks') }}
        </div>
        <div v-if="Array.isArray(orgaData.overdue_tasks) && orgaData.overdue_tasks.length > 0" :style="itemStyle">
          <span :style="warningStyle">{{ (orgaData.overdue_tasks as any[]).length }} {{ __('overdue') }}</span>
          — {{ __('oldest') }}: {{ (orgaData.overdue_tasks as any[])[0].subject }}
        </div>
        <div v-else :style="{ ...itemStyle, ...mutedStyle }">{{ __('No overdue tasks') }}</div>

        <div v-if="Array.isArray(orgaData.today_appointments) && orgaData.today_appointments.length > 0" :style="itemStyle">
          <CalendarDays class="w-3 h-3 inline" style="color: #16a34a" />
          {{ (orgaData.today_appointments as any[]).length }} {{ __('appointments today') }}
        </div>

        <div v-if="Array.isArray(orgaData.milestones_this_week) && orgaData.milestones_this_week.length > 0" :style="itemStyle">
          <Milestone class="w-3 h-3 inline" style="color: #16a34a" />
          {{ (orgaData.milestones_this_week as any[]).length }} {{ __('milestones this week') }}
        </div>
      </div>

      <!-- Micro: Sales -->
      <div v-if="microData" :style="sectionStyle">
        <div :style="sectionTitleStyle">
          <Briefcase class="w-4 h-4" style="color: #2563eb" />
          {{ __('Sales') }}
        </div>
        <div v-if="(microData.nudges as any)?.stale_leads?.length > 0" :style="itemStyle">
          <span :style="warningStyle">{{ (microData.nudges as any).stale_leads.length }} {{ __('stale leads') }}</span>
          {{ __('(no activity in 7+ days)') }}
        </div>
        <div v-if="(microData.nudges as any)?.unanswered_offers?.length > 0" :style="itemStyle">
          <span :style="warningStyle">{{ (microData.nudges as any).unanswered_offers.length }} {{ __('unanswered offers') }}</span>
        </div>
        <div v-if="microData.kpis" :style="itemStyle">
          {{ __('This month') }}:
          <span :style="highlightStyle">{{ (microData.kpis as any).won_this_month }} {{ __('won') }}</span>,
          {{ (microData.kpis as any).lost_this_month }} {{ __('lost') }}
        </div>
        <div v-if="microData.pipeline" :style="{ ...itemStyle, ...mutedStyle }">
          {{ (microData.pipeline as any).active_leads }} {{ __('active leads') }}
        </div>
      </div>

      <!-- Home: Household -->
      <div v-if="homeData && ((homeData.expiring_warranties as any[])?.length > 0 || (homeData.overdue_bills as any[])?.length > 0)" :style="sectionStyle">
        <div :style="sectionTitleStyle">
          <Home class="w-4 h-4" style="color: #ea580c" />
          {{ __('Home') }}
        </div>
        <div v-if="(homeData.expiring_warranties as any[])?.length > 0" :style="itemStyle">
          <span :style="warningStyle">{{ (homeData.expiring_warranties as any[]).length }} {{ __('warranties expiring soon') }}</span>
        </div>
        <div v-if="(homeData.overdue_bills as any[])?.length > 0" :style="itemStyle">
          <span :style="warningStyle">{{ (homeData.overdue_bills as any[]).length }} {{ __('overdue bills') }}</span>
        </div>
      </div>

      <!-- CTA: Discuss with Jana -->
      <div v-if="janaInstalled" :style="{ padding: '1rem' }">
        <button :style="ctaStyle" class="dock-briefing-cta" @click="openJana">
          <MessageSquare class="w-4 h-4" />
          {{ __('Discuss with Jana') }}
        </button>
        <div :style="{ ...mutedStyle, textAlign: 'center', marginTop: '0.375rem' }">
          {{ __('"Tell me more about my overdue tasks..."') }}
        </div>
      </div>
    </template>
  </DockPanelShell>
</template>

<style>
.dock-briefing-cta:hover {
  opacity: 0.9 !important;
}
</style>
