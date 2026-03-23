<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockActivityFeed' }
</script>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { __ } from '@/composables/useTranslate'
import { useActivityFeed } from '@/composables/useActivityFeed'
import { useDockPanels } from '@/composables/useDockPanels'
import type { ActivityFeedItem } from '@/types/dock'

const props = withDefaults(defineProps<{
  /** Pass filter dict from parent (page-level mode) */
  filters?: Record<string, unknown>
  /** Or pass items directly (parent-managed mode) */
  items?: ActivityFeedItem[]
  total?: number
  hasMore?: boolean
  loading?: boolean
  /** Legacy individual props for embedded use */
  app?: string
  doctype?: string
  docname?: string
  compact?: boolean
}>(), {
  compact: false,
})

const emit = defineEmits<{
  (e: 'load-more'): void
}>()

// --- Panel integration ---
const { openContextPanel } = useDockPanels()

function onItemClick(item: ActivityFeedItem) {
  if (!item.doctype || !item.docname) return
  openContextPanel({
    referenceDoctype: item.doctype,
    referenceName: item.docname,
    displayName: item.display_name || item.docname,
    doctypeLabel: item.doctype_label || item.doctype,
    app: item.app,
  })
}

// Determine mode: parent-managed (items prop) vs self-managed (composable)
const selfManaged = computed(() => props.items === undefined)

const feed = selfManaged.value ? useActivityFeed() : null

// Self-managed: build filters from individual props
const selfFilters = computed(() => {
  const f: Record<string, unknown> = {}
  if (props.app) f.app = props.app
  if (props.doctype) f.doctype = props.doctype
  if (props.docname) f.docname = props.docname
  return f
})

if (selfManaged.value && feed) {
  onMounted(() => feed.load(props.filters ?? selfFilters.value))
  watch(
    () => props.filters ?? selfFilters.value,
    (f) => feed.load(f),
    { deep: true }
  )
}

// Unified accessors
const displayItems = computed(() => props.items ?? feed?.items.value ?? [])
const displayTotal = computed(() => props.total ?? feed?.total.value ?? 0)
const displayHasMore = computed(() => props.hasMore ?? feed?.hasMore.value ?? false)
const displayLoading = computed(() => props.loading ?? feed?.loading.value ?? false)

function onLoadMore() {
  if (selfManaged.value && feed) {
    feed.loadMore(props.filters ?? selfFilters.value)
  } else {
    emit('load-more')
  }
}

// --- Date grouping ---
function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const itemDate = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const diff = today.getTime() - itemDate.getTime()
  const days = Math.floor(diff / 86400000)

  if (days === 0) return __('Today')
  if (days === 1) return __('Yesterday')
  if (days < 7) return d.toLocaleDateString(undefined, { weekday: 'long' })
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined })
}

function groupByDate(entries: ActivityFeedItem[]) {
  const groups: [string, string, ActivityFeedItem[]][] = [] // [dateKey, label, items]
  const map = new Map<string, ActivityFeedItem[]>()
  const order: string[] = []

  for (const item of entries) {
    const dateKey = new Date(item.timestamp).toISOString().slice(0, 10)
    if (!map.has(dateKey)) {
      map.set(dateKey, [])
      order.push(dateKey)
    }
    map.get(dateKey)!.push(item)
  }

  for (const key of order) {
    groups.push([key, formatDateLabel(key), map.get(key)!])
  }
  return groups
}

// --- Relative timestamps ---
function formatTime(ts: string): string {
  const d = new Date(ts)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 1) return __('just now')
  if (diffMin < 60) return `${diffMin}m`
  const diffHrs = Math.floor(diffMin / 60)
  if (diffHrs < 24) return `${diffHrs}h`
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// --- Action type icon ---
function actionIcon(type: string): string {
  switch (type) {
    case 'create': case 'insert': return '+'
    case 'update': return '~'
    case 'delete': return '-'
    default: return ''
  }
}

function actionColor(type: string): string {
  switch (type) {
    case 'create': case 'insert': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
    case 'update': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
    case 'delete': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
    default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800'
  }
}
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="displayLoading && !displayItems.length" class="py-12 text-center text-sm text-[var(--dock-icon,theme(colors.gray.400))]">
      <div class="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mb-2" />
      <p>{{ __('Loading activity...') }}</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="!displayItems.length" class="py-12 text-center">
      <div class="text-3xl mb-3 opacity-30">&#9678;</div>
      <p class="text-sm text-[var(--dock-icon,theme(colors.gray.500))]">{{ __('No activity found') }}</p>
      <p class="mt-1 text-xs text-[var(--dock-icon,theme(colors.gray.400))]">
        {{ __('Try adjusting your filters or check back later.') }}
      </p>
    </div>

    <!-- Feed content -->
    <div v-else>
      <div v-for="[dateKey, dateLabel, groupItems] in groupByDate(displayItems)" :key="dateKey" class="mb-6">
        <h4 class="text-xs font-medium uppercase tracking-wider mb-2 px-1 text-[var(--dock-icon,theme(colors.gray.500))]">
          {{ dateLabel }}
        </h4>
        <div class="space-y-0.5">
          <div
            v-for="item in groupItems"
            :key="item.timestamp + (item.docname || '') + (item.type || '')"
            class="flex gap-3 py-2.5 px-3 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors group cursor-pointer"
            @click="onItemClick(item)"
          >
            <!-- Avatar -->
            <div class="flex-shrink-0 relative">
              <img
                v-if="item.user_image"
                :src="item.user_image"
                class="w-7 h-7 rounded-full"
                :alt="item.user_fullname"
              />
              <div
                v-else
                class="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium"
              >
                {{ (item.user_fullname || '?')[0] }}
              </div>
              <!-- Action badge -->
              <span
                v-if="actionIcon(item.type)"
                class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-[8px] font-bold flex items-center justify-center border border-white dark:border-gray-900"
                :class="actionColor(item.type)"
              >{{ actionIcon(item.type) }}</span>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="text-sm leading-snug">
                <span class="font-medium text-[var(--dock-text,theme(colors.gray.900))]">
                  {{ item.user_fullname }}
                </span>
                <span class="text-[var(--dock-icon,theme(colors.gray.400))]">
                  {{ ' ' }}{{ item.type === 'create' || item.type === 'insert' ? __('created') : item.type === 'update' ? __('updated') : item.type }}{{ ' ' }}
                </span>
                <span class="font-medium text-[var(--dock-text,theme(colors.gray.900))]">
                  {{ item.display_name || item.docname }}
                </span>
                <span v-if="item.doctype_label" class="text-[var(--dock-icon,theme(colors.gray.400))]">
                  {{ ' ' }}({{ item.doctype_label }})
                </span>
                <span v-if="item.app" class="text-xs text-[var(--dock-icon,theme(colors.gray.400))] ml-1 capitalize">
                  &middot; {{ item.app }}
                </span>
              </div>

              <!-- Field changes -->
              <div v-if="item.field_changes?.length" class="mt-1.5 space-y-0.5">
                <div
                  v-for="(fc, i) in item.field_changes.slice(0, 3)"
                  :key="i"
                  class="text-xs text-[var(--dock-icon,theme(colors.gray.500))]"
                >
                  <span class="font-medium">{{ fc.field }}</span>:
                  <span class="line-through text-red-400/70">{{ fc.old || __('(empty)') }}</span>
                  <span class="mx-0.5">&rarr;</span>
                  <span class="text-green-600 dark:text-green-400">{{ fc.new || __('(empty)') }}</span>
                </div>
                <div v-if="item.field_changes.length > 3" class="text-xs text-[var(--dock-icon,theme(colors.gray.400))]">
                  +{{ item.field_changes.length - 3 }} {{ __('more changes') }}
                </div>
              </div>
            </div>

            <!-- Timestamp -->
            <div class="text-xs whitespace-nowrap pt-0.5 text-[var(--dock-icon,theme(colors.gray.400))] opacity-70 group-hover:opacity-100">
              {{ formatTime(item.timestamp) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Load more -->
      <div v-if="displayHasMore" class="py-3 text-center">
        <button
          class="text-xs font-medium text-[var(--dock-accent,theme(colors.blue.600))] hover:underline disabled:opacity-50"
          :disabled="displayLoading"
          @click="onLoadMore"
        >
          {{ displayLoading ? __('Loading...') : __('Load more') }}
        </button>
      </div>
    </div>
  </div>
</template>
