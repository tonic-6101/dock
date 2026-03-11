<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockNotificationRow' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ExternalLink, X } from 'lucide-vue-next'
import { relativeTime } from '@/composables/useRelativeTime'

interface Notification {
  name: string
  from_app: string
  notification_type: string
  title: string
  message?: string
  action_url?: string
  read: 0 | 1
  creation: string
}

const props = defineProps<{
  notification: Notification
  typeInfo?: { label: string; icon: string; app: string }
  appColor?: string
}>()

const emit = defineEmits<{
  markRead: [name: string]
  navigate: [notification: Notification]
}>()

const unread = computed(() => !props.notification.read)
const time   = computed(() => relativeTime(props.notification.creation))
</script>

<template>
  <div
    role="menuitem"
    class="group relative flex gap-3 items-start px-3 py-2.5
           hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
    @click="emit('navigate', notification)"
  >
    <!-- Type icon dot colored by app brand -->
    <div
      class="w-2 h-2 rounded-full mt-1.5 shrink-0"
      :style="{ backgroundColor: appColor ?? 'var(--dock-icon)' }"
    />

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <p
        class="text-sm truncate"
        :class="unread ? 'font-semibold text-[var(--dock-text)]' : 'font-normal text-[var(--dock-text)]'"
      >{{ notification.title }}</p>
      <p v-if="notification.message" class="text-xs text-[var(--dock-icon)] truncate mt-0.5">
        {{ notification.message }}
      </p>
    </div>

    <!-- Meta: app + time -->
    <div class="shrink-0 flex flex-col items-end gap-0.5 pt-0.5">
      <span class="text-[10px] text-[var(--dock-icon)] capitalize">{{ notification.from_app }}</span>
      <span class="text-[10px] text-[var(--dock-icon)]">{{ time }}</span>
    </div>

    <!-- Hover actions -->
    <div class="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-1">
      <a
        v-if="notification.action_url"
        :href="notification.action_url"
        target="_blank"
        rel="noopener"
        class="w-6 h-6 flex items-center justify-center rounded bg-[var(--dock-bg)] shadow-sm
               text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
        @click.stop
      >
        <ExternalLink class="w-3 h-3" />
      </a>
      <button
        v-if="unread"
        class="w-6 h-6 flex items-center justify-center rounded bg-[var(--dock-bg)] shadow-sm
               text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
        @click.stop="emit('markRead', notification.name)"
      >
        <X class="w-3 h-3" />
      </button>
    </div>
  </div>
</template>
