<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic

  Discussions panel tab content — shown inside DockMessagesPanel.
  Lists the current user's open discussions.
-->
<script lang="ts">
export default { name: 'DockDiscussionsPanel' }
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { __ } from '@/composables/useTranslate'
import { MessageSquare } from 'lucide-vue-next'

const props = defineProps<{
  close: () => void
  openFullPage: () => void
}>()

const router = useRouter()
const discussions = ref<any[]>([])
const loading = ref(true)

async function loadDiscussions() {
  loading.value = true
  try {
    const user = (window as any).frappe?.session?.user ?? ''
    const params = new URLSearchParams({
      participant: user,
      status: 'Open',
      limit: '15',
      offset: '0',
    })
    const res = await fetch(
      `/api/method/dock.api.discussion.list_discussions?${params}`,
      {
        method: 'GET',
        headers: { 'X-Frappe-CSRF-Token': (window as any).csrf_token ?? '' },
      }
    )
    const data = await res.json()
    discussions.value = data.message?.discussions ?? []
  } catch {
    discussions.value = []
  } finally {
    loading.value = false
  }
}

function navigateTo(name: string) {
  router.push(`/discussions/${name}`)
  props.close()
}

function newDiscussion() {
  router.push('/discussions/new')
  props.close()
}

onMounted(loadDiscussions)
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
    </div>

    <!-- Empty state -->
    <div v-else-if="discussions.length === 0" class="px-4 py-12 text-center">
      <MessageSquare class="w-8 h-8 mx-auto mb-3 text-gray-300" />
      <p class="text-sm text-gray-500">{{ __('No open discussions') }}</p>
    </div>

    <!-- Discussion list -->
    <template v-else>
      <button
        v-for="d in discussions"
        :key="d.name"
        class="w-full text-left px-4 py-3 border-b border-[var(--dock-border)]
               hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        @click="navigateTo(d.name)"
      >
        <div class="text-sm font-medium text-[var(--dock-text)] truncate">{{ d.title }}</div>
        <div class="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span>{{ d.discussion_type }}</span>
          <span v-if="d.reply_count">· {{ d.reply_count }} {{ d.reply_count === 1 ? 'reply' : 'replies' }}</span>
        </div>
      </button>
    </template>

    <!-- Footer -->
    <div class="px-4 py-3 border-t border-[var(--dock-border)]">
      <button
        class="w-full text-center text-sm font-medium text-[var(--dock-accent)] hover:underline"
        @click="newDiscussion"
      >
        + {{ __('New Discussion') }}
      </button>
    </div>
  </div>
</template>
