<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockEcosystemAppsPage' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RefreshCw, ExternalLink, Copy, CheckCircle, AlertCircle, Loader2 } from 'lucide-vue-next'
import { callApi } from '@/composables/useApi'
import { __ } from '@/composables/useTranslate'

interface AppEntry {
  name: string
  label: string
  description: string
  color: string
  installed_version: string | null
  latest_version: string | null
  update_available: boolean
  has_pro: boolean
  github_url: string
}

interface AppsData {
  installed: AppEntry[]
  available: AppEntry[]
  other: AppEntry[]
  fm_url: string | null
}

type JobStatus = 'queued' | 'running' | 'done' | 'failed' | 'restarting'

interface JobState {
  job_id: string
  status: JobStatus
  log: string
}

const data        = ref<AppsData | null>(null)
const loadError   = ref<string | null>(null)
const loading     = ref(true)

// job states keyed by app name
const jobStates   = ref<Record<string, JobState>>({})
// which Pro badge inline panel is open
const openProPanel = ref<string | null>(null)
// copied CLI text state
const copiedApp   = ref<string | null>(null)

let pollTimers: Record<string, ReturnType<typeof setInterval>> = {}
let restartPoll: ReturnType<typeof setInterval> | null = null

// ── Admin detection ────────────────────────────────────────────────────────

const isAdmin = computed(() => {
  const deskRoles = ((window as any).frappe?.boot?.user?.roles ?? []) as string[]
  if (deskRoles.includes('System Manager')) return true
  return Boolean((window as any).dockBoot?.is_dock_manager)
})

const fmUrl = computed(() => data.value?.fm_url ?? null)

// ── Load data ──────────────────────────────────────────────────────────────

async function load() {
  loading.value = true
  loadError.value = null
  try {
    data.value = await callApi<AppsData>('dock.api.ecosystem.get_apps', {})
  } catch (e) {
    loadError.value = (e as Error).message || __('Failed to load apps')
  } finally {
    loading.value = false
  }
}

// ── Job polling ────────────────────────────────────────────────────────────

function startJobPoll(appName: string, jobId: string) {
  pollTimers[appName] = setInterval(async () => {
    try {
      const s = await callApi<{ status: string; log: string }>(
        'dock.api.ecosystem.get_job_status',
        { job_id: jobId },
      )
      const status = s.status as JobStatus
      jobStates.value[appName] = { ...jobStates.value[appName], status, log: s.log ?? '' }
      if (status === 'done') {
        clearInterval(pollTimers[appName])
        delete pollTimers[appName]
        jobStates.value[appName].status = 'restarting'
        startRestartPoll()
      } else if (status === 'failed') {
        clearInterval(pollTimers[appName])
        delete pollTimers[appName]
      }
    } catch {}
  }, 2000)
}

function startRestartPoll() {
  if (restartPoll) return
  restartPoll = setInterval(async () => {
    try {
      const r = await fetch('/api/method/frappe.ping')
      if (r.ok) {
        clearInterval(restartPoll!)
        restartPoll = null
        window.location.reload()
      }
    } catch {}
  }, 3000)
}

// ── Actions ────────────────────────────────────────────────────────────────

async function triggerAction(
  action: 'update' | 'install' | 'remove',
  app: AppEntry,
) {
  const methodMap = {
    update:  'dock.api.ecosystem.update_app',
    install: 'dock.api.ecosystem.install_app',
    remove:  'dock.api.ecosystem.remove_app',
  }
  jobStates.value[app.name] = { job_id: '', status: 'queued', log: '' }
  try {
    const res = await callApi<{ job_id: string; status: string }>(
      methodMap[action],
      { app: app.name },
    )
    jobStates.value[app.name].job_id = res.job_id
    startJobPoll(app.name, res.job_id)
  } catch (e) {
    jobStates.value[app.name] = {
      job_id: '',
      status: 'failed',
      log: (e as Error).message || __('Action failed'),
    }
  }
}

function confirmUpdate(app: AppEntry) {
  const msg = __('Update {0} from v{1} to {2}? This will restart Frappe.')
    .replace('{0}', app.label)
    .replace('{1}', app.installed_version ?? '?')
    .replace('{2}', app.latest_version ?? '?')
  if (confirm(msg)) triggerAction('update', app)
}

function confirmRemove(app: AppEntry) {
  const msg = __('Remove {0}? This will uninstall the app and may affect data.')
    .replace('{0}', app.label)
  if (confirm(msg)) triggerAction('remove', app)
}

function installApp(app: AppEntry) {
  triggerAction('install', app)
}

// ── CLI instructions ───────────────────────────────────────────────────────

function cliCmd(action: 'update' | 'install' | 'remove', app: AppEntry): string {
  if (action === 'update') return `bench update --app ${app.name}`
  if (action === 'install') {
    const src = app.github_url || app.name
    return `bench get-app ${src} && bench --site <site> install-app ${app.name}`
  }
  return `bench --site <site> uninstall-app ${app.name}`
}

async function copyCmd(action: 'update' | 'install' | 'remove', app: AppEntry) {
  try {
    await navigator.clipboard.writeText(cliCmd(action, app))
    copiedApp.value = `${action}:${app.name}`
    setTimeout(() => { copiedApp.value = null }, 2000)
  } catch {}
}

// ── Status helpers ─────────────────────────────────────────────────────────

function versionBadgeClass(app: AppEntry): string {
  if (!app.installed_version) return 'text-[var(--dock-icon)]'
  if (app.update_available) return 'text-amber-600 dark:text-amber-400'
  return 'text-green-600 dark:text-green-400'
}

function versionBadgeText(app: AppEntry): string {
  if (!app.installed_version) return __('not installed')
  if (app.update_available) return `↑ ${app.latest_version} ${__('available')}`
  return `✓ ${__('Up to date')}`
}

function jobLabel(state: JobState): string {
  if (state.status === 'queued') return __('Queued…')
  if (state.status === 'running') return __('Updating…')
  if (state.status === 'done') return `${__('Updated')} ✓`
  if (state.status === 'restarting') return __('Restarting…')
  if (state.status === 'failed') return `${__('Failed')}: ${state.log}`
  return ''
}

onMounted(load)
onUnmounted(() => {
  Object.values(pollTimers).forEach(clearInterval)
  if (restartPoll) clearInterval(restartPoll)
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">

    <!-- Page header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-lg font-semibold text-[var(--dock-text)]">{{ __('Ecosystem Apps') }}</h1>
      <button
        v-if="isAdmin"
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg
               border border-[var(--dock-border)] text-[var(--dock-icon)]
               hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        @click="load"
      >
        <RefreshCw class="w-3.5 h-3.5" :class="{ 'animate-spin': loading }" />
        {{ __('Refresh') }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading && !data" class="flex items-center justify-center h-32">
      <Loader2 class="w-6 h-6 text-[var(--dock-icon)] animate-spin" />
    </div>

    <!-- Error -->
    <div
      v-else-if="loadError"
      class="px-4 py-3 rounded-lg border border-red-200 dark:border-red-800
             bg-red-50 dark:bg-red-950/30 text-sm text-red-700 dark:text-red-300"
    >
      {{ loadError }}
    </div>

    <template v-else-if="data">

      <!-- Installed -->
      <section v-if="data.installed.length">
        <h2 class="text-xs font-semibold uppercase tracking-wide text-[var(--dock-icon)] mb-3">
          {{ __('Installed') }}
        </h2>
        <div class="space-y-3 mb-8">
          <div
            v-for="app in data.installed" :key="app.name"
            role="article"
            :aria-label="`${app.label} — ${versionBadgeText(app)}`"
            class="rounded-xl border border-[var(--dock-border)] bg-[var(--dock-bg)] p-4"
          >
            <div class="flex items-start gap-3">
              <!-- Color dot -->
              <span
                class="w-3 h-3 rounded-full shrink-0 mt-0.5"
                :style="{ backgroundColor: app.color }"
              />

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-sm font-semibold text-[var(--dock-text)]">{{ app.label }}</span>
                  <span class="text-xs text-[var(--dock-icon)]">v{{ app.installed_version }}</span>
                  <span class="text-xs font-medium" :class="versionBadgeClass(app)">
                    {{ versionBadgeText(app) }}
                  </span>
                  <!-- Pro badge -->
                  <button
                    v-if="app.has_pro"
                    class="text-[10px] font-semibold px-1.5 py-0.5 rounded
                           bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400
                           hover:opacity-80 transition-opacity"
                    @click="openProPanel = openProPanel === app.name ? null : app.name"
                  >{{ __('Pro available') }}</button>
                </div>
                <p v-if="app.description" class="text-xs text-[var(--dock-icon)] mt-0.5">
                  {{ app.description }}
                </p>

                <!-- Pro panel -->
                <div
                  v-if="openProPanel === app.name"
                  class="mt-3 p-3 rounded-lg border border-amber-200 dark:border-amber-800
                         bg-amber-50 dark:bg-amber-900/20 text-xs text-amber-800 dark:text-amber-300"
                >
                  <p class="font-semibold mb-1">{{ app.label }} Pro</p>
                  <a
                    href="https://tonic.dev"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center gap-1 underline hover:opacity-80"
                  >{{ __('Learn more') }} <ExternalLink class="w-3 h-3" /></a>
                </div>

                <!-- Job progress -->
                <div v-if="jobStates[app.name]" class="mt-3">
                  <div
                    class="text-xs font-medium mb-1"
                    :class="jobStates[app.name].status === 'failed' ? 'text-red-600' : 'text-[var(--dock-icon)]'"
                    aria-live="polite"
                    role="progressbar"
                  >
                    <Loader2
                      v-if="['queued','running','restarting'].includes(jobStates[app.name].status)"
                      class="w-3 h-3 inline animate-spin mr-1"
                    />
                    <CheckCircle
                      v-else-if="jobStates[app.name].status === 'done'"
                      class="w-3 h-3 inline mr-1 text-green-500"
                    />
                    <AlertCircle
                      v-else-if="jobStates[app.name].status === 'failed'"
                      class="w-3 h-3 inline mr-1"
                    />
                    {{ jobLabel(jobStates[app.name]) }}
                  </div>
                </div>

                <!-- FM CLI fallback (no fm_url, admin only) -->
                <div
                  v-else-if="isAdmin && !fmUrl && app.update_available"
                  class="mt-3 p-3 rounded-lg border border-[var(--dock-border)] bg-black/5 dark:bg-white/5"
                >
                  <p class="text-xs text-[var(--dock-icon)] mb-1">
                    {{ __('To update {0}, run:').replace('{0}', app.label) }}
                  </p>
                  <div class="flex items-center gap-2">
                    <code class="text-xs font-mono text-[var(--dock-text)] bg-black/5 dark:bg-white/5 px-2 py-1 rounded flex-1 truncate">
                      {{ cliCmd('update', app) }}
                    </code>
                    <button
                      class="p-1 text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
                      :aria-label="__('Copy command')"
                      @click="copyCmd('update', app)"
                    >
                      <CheckCircle v-if="copiedApp === `update:${app.name}`" class="w-4 h-4 text-green-500" />
                      <Copy v-else class="w-4 h-4" />
                    </button>
                  </div>
                  <p class="text-[10px] text-[var(--dock-icon)] mt-2">
                    {{ __('Configure Frappe Manager to enable one-click updates.') }}
                    <a href="/dock/settings" class="underline">{{ __('Dock Settings') }}</a>
                  </p>
                </div>
              </div>

              <!-- Action buttons (admin, FM available, no active job) -->
              <div v-if="isAdmin && !jobStates[app.name]" class="flex items-center gap-2 shrink-0 flex-wrap">
                <a
                  :href="`/${app.name}`"
                  class="px-3 py-1.5 text-xs rounded-lg border border-[var(--dock-border)]
                         text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  :aria-label="`${__('Open')} ${app.label}`"
                >{{ __('Open') }}</a>
                <button
                  v-if="app.update_available && fmUrl"
                  class="px-3 py-1.5 text-xs rounded-lg bg-amber-500 text-white
                         hover:bg-amber-600 transition-colors font-medium"
                  :aria-label="`${__('Update')} ${app.label} ${__('to version')} ${app.latest_version}`"
                  @click="confirmUpdate(app)"
                >{{ __('Update to {0}').replace('{0}', app.latest_version ?? '') }}</button>
                <button
                  v-if="fmUrl"
                  class="px-3 py-1.5 text-xs rounded-lg border border-red-300 dark:border-red-700
                         text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  :aria-label="`${__('Remove')} ${app.label}`"
                  @click="confirmRemove(app)"
                >{{ __('Remove') }}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Available -->
      <section v-if="data.available.length">
        <h2 class="text-xs font-semibold uppercase tracking-wide text-[var(--dock-icon)] mb-3">
          {{ __('Available') }}
        </h2>
        <div class="space-y-3">
          <div
            v-for="app in data.available" :key="app.name"
            role="article"
            :aria-label="`${app.label} — ${__('not installed')}`"
            class="rounded-xl border border-[var(--dock-border)] bg-[var(--dock-bg)] p-4"
          >
            <div class="flex items-start gap-3">
              <span
                class="w-3 h-3 rounded-full shrink-0 mt-0.5"
                :style="{ backgroundColor: app.color }"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-sm font-semibold text-[var(--dock-text)]">{{ app.label }}</span>
                  <span class="text-xs text-[var(--dock-icon)]">{{ __('not installed') }}</span>
                  <button
                    v-if="app.has_pro"
                    class="text-[10px] font-semibold px-1.5 py-0.5 rounded
                           bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400
                           hover:opacity-80 transition-opacity"
                    @click="openProPanel = openProPanel === app.name ? null : app.name"
                  >{{ __('Pro available') }}</button>
                </div>
                <p v-if="app.description" class="text-xs text-[var(--dock-icon)] mt-0.5">
                  {{ app.description }}
                </p>

                <!-- Pro panel -->
                <div
                  v-if="openProPanel === app.name"
                  class="mt-3 p-3 rounded-lg border border-amber-200 dark:border-amber-800
                         bg-amber-50 dark:bg-amber-900/20 text-xs text-amber-800 dark:text-amber-300"
                >
                  <p class="font-semibold mb-1">{{ app.label }} Pro</p>
                  <a
                    href="https://tonic.dev"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center gap-1 underline hover:opacity-80"
                  >{{ __('Learn more') }} <ExternalLink class="w-3 h-3" /></a>
                </div>

                <!-- Job progress (install) -->
                <div v-if="jobStates[app.name]" class="mt-3">
                  <div
                    class="text-xs font-medium mb-1"
                    :class="jobStates[app.name].status === 'failed' ? 'text-red-600' : 'text-[var(--dock-icon)]'"
                    aria-live="polite"
                    role="progressbar"
                  >
                    <Loader2
                      v-if="['queued','running','restarting'].includes(jobStates[app.name].status)"
                      class="w-3 h-3 inline animate-spin mr-1"
                    />
                    <CheckCircle
                      v-else-if="jobStates[app.name].status === 'done'"
                      class="w-3 h-3 inline mr-1 text-green-500"
                    />
                    <AlertCircle
                      v-else-if="jobStates[app.name].status === 'failed'"
                      class="w-3 h-3 inline mr-1"
                    />
                    {{ jobLabel(jobStates[app.name]) }}
                  </div>
                </div>

                <!-- CLI fallback for install -->
                <div
                  v-else-if="isAdmin && !fmUrl"
                  class="mt-3 p-3 rounded-lg border border-[var(--dock-border)] bg-black/5 dark:bg-white/5"
                >
                  <p class="text-xs text-[var(--dock-icon)] mb-1">
                    {{ __('To install {0}, run:').replace('{0}', app.label) }}
                  </p>
                  <div class="flex items-center gap-2">
                    <code class="text-xs font-mono text-[var(--dock-text)] bg-black/5 dark:bg-white/5 px-2 py-1 rounded flex-1 truncate">
                      {{ cliCmd('install', app) }}
                    </code>
                    <button
                      class="p-1 text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
                      :aria-label="__('Copy command')"
                      @click="copyCmd('install', app)"
                    >
                      <CheckCircle v-if="copiedApp === `install:${app.name}`" class="w-4 h-4 text-green-500" />
                      <Copy v-else class="w-4 h-4" />
                    </button>
                  </div>
                  <p class="text-[10px] text-[var(--dock-icon)] mt-2">
                    {{ __('Configure Frappe Manager to enable one-click updates.') }}
                    <a href="/dock/settings" class="underline">{{ __('Dock Settings') }}</a>
                  </p>
                </div>
              </div>

              <!-- Install button (admin, FM available, no active job) -->
              <div v-if="isAdmin && fmUrl && !jobStates[app.name]" class="shrink-0">
                <button
                  class="px-3 py-1.5 text-xs rounded-lg bg-[var(--dock-icon)] text-white
                         hover:opacity-90 transition-opacity font-medium"
                  :aria-label="`${__('Install')} ${app.label}`"
                  @click="installApp(app)"
                >{{ __('Install') }}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Other (non-ecosystem installed apps) -->
      <section v-if="data.other.length">
        <h2 class="text-xs font-semibold uppercase tracking-wide text-[var(--dock-icon)] mb-3">
          {{ __('Other') }}
        </h2>
        <div class="space-y-3 mb-8">
          <div
            v-for="app in data.other" :key="app.name"
            role="article"
            :aria-label="app.label"
            class="rounded-xl border border-[var(--dock-border)] bg-[var(--dock-bg)] p-4 opacity-75"
          >
            <div class="flex items-start gap-3">
              <span
                class="w-3 h-3 rounded-full shrink-0 mt-0.5 bg-[var(--dock-icon)]"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-sm font-semibold text-[var(--dock-text)]">{{ app.label }}</span>
                  <span v-if="app.installed_version" class="text-xs text-[var(--dock-icon)]">v{{ app.installed_version }}</span>
                </div>
                <p v-if="app.description" class="text-xs text-[var(--dock-icon)] mt-0.5">
                  {{ app.description }}
                </p>

                <!-- Job progress (remove) -->
                <div v-if="jobStates[app.name]" class="mt-3">
                  <div
                    class="text-xs font-medium mb-1"
                    :class="jobStates[app.name].status === 'failed' ? 'text-red-600' : 'text-[var(--dock-icon)]'"
                    aria-live="polite"
                    role="progressbar"
                  >
                    <Loader2
                      v-if="['queued','running','restarting'].includes(jobStates[app.name].status)"
                      class="w-3 h-3 inline animate-spin mr-1"
                    />
                    <CheckCircle
                      v-else-if="jobStates[app.name].status === 'done'"
                      class="w-3 h-3 inline mr-1 text-green-500"
                    />
                    <AlertCircle
                      v-else-if="jobStates[app.name].status === 'failed'"
                      class="w-3 h-3 inline mr-1"
                    />
                    {{ jobLabel(jobStates[app.name]) }}
                  </div>
                </div>

                <!-- CLI fallback for remove -->
                <div
                  v-else-if="isAdmin && !fmUrl"
                  class="mt-3 p-3 rounded-lg border border-[var(--dock-border)] bg-black/5 dark:bg-white/5"
                >
                  <p class="text-xs text-[var(--dock-icon)] mb-1">
                    {{ __('To remove {0}, run:').replace('{0}', app.label) }}
                  </p>
                  <div class="flex items-center gap-2">
                    <code class="text-xs font-mono text-[var(--dock-text)] bg-black/5 dark:bg-white/5 px-2 py-1 rounded flex-1 truncate">
                      {{ cliCmd('remove', app) }}
                    </code>
                    <button
                      class="p-1 text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
                      :aria-label="__('Copy command')"
                      @click="copyCmd('remove', app)"
                    >
                      <CheckCircle v-if="copiedApp === `remove:${app.name}`" class="w-4 h-4 text-green-500" />
                      <Copy v-else class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Remove button (admin, FM available, no active job) -->
              <div v-if="isAdmin && !jobStates[app.name]" class="flex items-center gap-2 shrink-0">
                <a
                  :href="`/${app.name}`"
                  class="px-3 py-1.5 text-xs rounded-lg border border-[var(--dock-border)]
                         text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  :aria-label="`${__('Open')} ${app.label}`"
                >{{ __('Open') }}</a>
                <button
                  v-if="fmUrl"
                  class="px-3 py-1.5 text-xs rounded-lg border border-red-300 dark:border-red-700
                         text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  :aria-label="`${__('Remove')} ${app.label}`"
                  @click="confirmRemove(app)"
                >{{ __('Remove') }}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Empty state -->
      <div
        v-if="!data.installed.length && !data.available.length && !data.other.length"
        class="flex flex-col items-center justify-center h-32 text-sm text-[var(--dock-icon)]"
      >
        {{ __('No apps found') }}
      </div>

    </template>
  </div>
</template>
