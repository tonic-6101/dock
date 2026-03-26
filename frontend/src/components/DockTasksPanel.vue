<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Task quick-add panel — create Orga Tasks from anywhere.

  Opens from the Tasks icon in the top bar. Lets you create a task
  without leaving the current page. Context is auto-detected from
  the URL when possible.
-->
<script lang="ts">
export default { name: 'DockTasksPanel' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Plus, CheckCircle, ExternalLink } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { useDockPanels } from '@/composables/useDockPanels'
import DockPanelShell from './DockPanelShell.vue'

const { closePanel } = useDockPanels()

// ── State ──────────────────────────────────────────────

const subject = ref('')
const priority = ref('Medium')
const dueDate = ref('')
const project = ref('')
const saving = ref(false)
const justCreated = ref<{ name: string; subject: string } | null>(null)
const recentTasks = ref<Array<{ name: string; subject: string; status: string; priority: string }>>([])
const loadingRecent = ref(false)
const projects = ref<Array<{ name: string; project_name: string }>>([])

const priorities = ['Low', 'Medium', 'High', 'Urgent']

// ── Context detection ──────────────────────────────────

interface TaskContext {
  type: 'project' | 'home_property'
  name: string
  /** Additional Home fields to auto-fill on Orga Task custom fields */
  homeRoom?: string
  homeItem?: string
}

const currentContext = computed<TaskContext | null>(() => {
  const path = window.location.pathname

  // Detect /orga/projects/<name>
  const projectMatch = path.match(/^\/orga\/projects\/([^/]+)/)
  if (projectMatch) {
    return { type: 'project', name: decodeURIComponent(projectMatch[1]) }
  }

  // Detect /home (property dashboard) or /home/property/<name>
  // Home is a single-property app — the property name is in the page state, not always the URL.
  // We detect Home context from /home/* paths and read the property from Frappe's boot or page meta.
  if (path.startsWith('/home')) {
    // Try reading property from URL query or page meta
    const params = new URLSearchParams(window.location.search)
    const propFromQuery = params.get('property')

    // Detect /home/items/<item> for item context
    const itemMatch = path.match(/^\/home\/items\/([^/]+)/)

    // Try to get property from the DOM (Home stores it in a data attribute or global)
    const propEl = document.querySelector('[data-home-property]')
    const propFromDom = propEl?.getAttribute('data-home-property') || ''

    const propertyName = propFromQuery || propFromDom || ''

    if (propertyName) {
      return {
        type: 'home_property',
        name: propertyName,
        homeItem: itemMatch ? decodeURIComponent(itemMatch[1]) : undefined,
      }
    }
  }

  return null
})

const contextLabel = computed(() => {
  if (!currentContext.value) return null
  if (currentContext.value.type === 'project') {
    return currentContext.value.name
  }
  if (currentContext.value.type === 'home_property') {
    return `${currentContext.value.name}${currentContext.value.homeItem ? ' / ' + currentContext.value.homeItem : ''}`
  }
  return null
})

// ── Load data ──────────────────────────────────────────

async function loadRecentTasks() {
  loadingRecent.value = true
  try {
    const result = await callApi<{ tasks: Array<{ name: string; subject: string; status: string; priority: string }> }>(
      'orga.orga.api.task.get_my_tasks',
      { filters: JSON.stringify({}), limit: 5, offset: 0 }
    )
    recentTasks.value = result?.tasks ?? []
  } catch {
    // Silently fail — panel still works for creation
  } finally {
    loadingRecent.value = false
  }
}

async function loadProjects() {
  try {
    const result = await callApi<Array<{ name: string; project_name: string }>>(
      'frappe.client.get_list',
      {
        doctype: 'Orga Project',
        fields: JSON.stringify(['name', 'project_name']),
        filters: JSON.stringify({ status: ['not in', ['Completed', 'Cancelled']] }),
        order_by: 'modified desc',
        limit_page_length: 20,
      }
    )
    projects.value = result ?? []
  } catch {
    // Silently fail
  }
}

onMounted(() => {
  loadRecentTasks()
  loadProjects()
  // Auto-fill project from context
  if (currentContext.value?.type === 'project') {
    project.value = currentContext.value.name
  }
})

// ── Create task ────────────────────────────────────────

const canCreate = computed(() => subject.value.trim().length > 0 && !saving.value)

async function createTask() {
  if (!canCreate.value) return

  saving.value = true
  justCreated.value = null

  try {
    const data: Record<string, unknown> = {
      subject: subject.value.trim(),
      priority: priority.value,
    }
    if (dueDate.value) data.due_date = dueDate.value
    if (project.value) data.project = project.value

    // Pass Home custom fields when creating from Home context
    const ctx = currentContext.value
    if (ctx?.type === 'home_property') {
      data.home_property = ctx.name
      if (ctx.homeRoom) data.home_room = ctx.homeRoom
      if (ctx.homeItem) data.home_item = ctx.homeItem
    }

    const task = await callApi<{ name: string; subject: string }>(
      'orga.orga.api.task.create_task',
      { data: JSON.stringify(data) }
    )

    justCreated.value = task
    subject.value = ''
    dueDate.value = ''
    priority.value = 'Medium'

    // Refresh recent tasks
    loadRecentTasks()

    // Auto-clear success message after 3s
    setTimeout(() => { justCreated.value = null }, 3000)
  } catch (err) {
    // Error is shown by Frappe's global error handler
  } finally {
    saving.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    createTask()
  }
}

// ── Priority colors ────────────────────────────────────

function priorityColor(p: string): string {
  switch (p) {
    case 'Urgent': return '#ef4444'
    case 'High': return '#f97316'
    case 'Medium': return '#eab308'
    case 'Low': return '#6b7280'
    default: return '#6b7280'
  }
}
</script>

<template>
  <DockPanelShell
    :title="__('Tasks')"
    link="/orga/my-tasks"
    :link-label="__('All tasks')"
    :aria-label="__('Task quick-add panel')"
    @close="closePanel"
  >
    <div :style="{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }">
      <!-- Context indicator -->
      <div v-if="contextLabel" :style="{ fontSize: '0.75rem', color: 'var(--dock-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }">
        {{ currentContext?.type === 'home_property' ? __('Property:') : __('In project:') }}
        <strong>{{ contextLabel }}</strong>
      </div>

      <!-- Subject input -->
      <input
        v-model="subject"
        type="text"
        :placeholder="__('What needs to be done?')"
        :style="{
          width: '100%',
          padding: '0.5rem 0.75rem',
          border: '1px solid var(--dock-border)',
          borderRadius: '0.375rem',
          background: 'var(--dock-bg)',
          color: 'var(--dock-text)',
          fontSize: '0.875rem',
          outline: 'none',
        }"
        @keydown="handleKeydown"
      />

      <!-- Options row -->
      <div :style="{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }">
        <!-- Priority -->
        <select
          v-model="priority"
          :style="{
            flex: '1',
            minWidth: '6rem',
            padding: '0.375rem 0.5rem',
            border: '1px solid var(--dock-border)',
            borderRadius: '0.375rem',
            background: 'var(--dock-bg)',
            color: 'var(--dock-text)',
            fontSize: '0.75rem',
          }"
        >
          <option v-for="p in priorities" :key="p" :value="p">{{ __(p) }}</option>
        </select>

        <!-- Due date -->
        <input
          v-model="dueDate"
          type="date"
          :style="{
            flex: '1',
            minWidth: '8rem',
            padding: '0.375rem 0.5rem',
            border: '1px solid var(--dock-border)',
            borderRadius: '0.375rem',
            background: 'var(--dock-bg)',
            color: 'var(--dock-text)',
            fontSize: '0.75rem',
          }"
        />

        <!-- Project -->
        <select
          v-model="project"
          :style="{
            flex: '1',
            minWidth: '8rem',
            padding: '0.375rem 0.5rem',
            border: '1px solid var(--dock-border)',
            borderRadius: '0.375rem',
            background: 'var(--dock-bg)',
            color: 'var(--dock-text)',
            fontSize: '0.75rem',
          }"
        >
          <option value="">{{ __('No project') }}</option>
          <option v-for="p in projects" :key="p.name" :value="p.name">{{ p.project_name }}</option>
        </select>
      </div>

      <!-- Create button -->
      <button
        :disabled="!canCreate"
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.375rem',
          width: '100%',
          padding: '0.5rem',
          borderRadius: '0.375rem',
          border: 'none',
          background: canCreate ? 'var(--dock-accent, #16a34a)' : 'var(--dock-border)',
          color: canCreate ? '#fff' : 'var(--dock-muted)',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: canCreate ? 'pointer' : 'not-allowed',
          transition: 'opacity 0.15s',
        }"
        @click="createTask"
      >
        <Plus :style="{ width: '1rem', height: '1rem' }" />
        {{ saving ? __('Creating...') : __('Create task') }}
      </button>

      <!-- Success message -->
      <div
        v-if="justCreated"
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          background: 'rgba(34, 197, 94, 0.1)',
          color: '#16a34a',
          fontSize: '0.75rem',
        }"
      >
        <CheckCircle :style="{ width: '1rem', height: '1rem', flexShrink: '0' }" />
        <span :style="{ flex: '1' }">{{ justCreated.name }}</span>
        <a
          :href="'/orga/my-tasks'"
          :style="{ color: '#16a34a', display: 'flex' }"
          :title="__('Open in Orga')"
        >
          <ExternalLink :style="{ width: '0.875rem', height: '0.875rem' }" />
        </a>
      </div>

      <!-- Hint -->
      <div :style="{ fontSize: '0.625rem', color: 'var(--dock-muted)', textAlign: 'center' }">
        {{ __('Cmd+Enter to create') }}
      </div>

      <!-- Divider -->
      <div :style="{ borderTop: '1px solid var(--dock-border)', margin: '0.25rem 0' }" />

      <!-- Recent tasks -->
      <div :style="{ flex: '1', overflow: 'auto' }">
        <div :style="{ fontSize: '0.6875rem', fontWeight: '600', color: 'var(--dock-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }">
          {{ __('Recent tasks') }}
        </div>

        <div v-if="loadingRecent" :style="{ fontSize: '0.75rem', color: 'var(--dock-muted)' }">
          {{ __('Loading...') }}
        </div>

        <div v-else-if="recentTasks.length === 0" :style="{ fontSize: '0.75rem', color: 'var(--dock-muted)' }">
          {{ __('No tasks yet') }}
        </div>

        <div v-else :style="{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }">
          <div
            v-for="task in recentTasks"
            :key="task.name"
            :style="{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              color: 'var(--dock-text)',
              cursor: 'default',
            }"
          >
            <div
              :style="{
                width: '0.375rem',
                height: '0.375rem',
                borderRadius: '50%',
                background: priorityColor(task.priority),
                flexShrink: '0',
              }"
            />
            <span :style="{ flex: '1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }">
              {{ task.subject }}
            </span>
            <span :style="{ fontSize: '0.625rem', color: 'var(--dock-muted)', flexShrink: '0' }">
              {{ task.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </DockPanelShell>
</template>
