<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockPersonRow' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, Phone, CalendarDays } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'

interface Contact {
  name: string
  full_name: string
  email_id?: string
  phone?: string
  company_name?: string
  image?: string
  owner: string
  user?: string
  is_internal?: boolean
  tags?: string[]
}

const props = defineProps<{
  contact: Contact
  appBadges?: string[]   // app names that have context data for this contact
}>()
const emit = defineEmits<{}>()

// useRouter() may return undefined when this component is loaded via the ESM
// bundle inside a domain app (bundled vue-router has a different inject key).
let router: ReturnType<typeof useRouter> | undefined
try { router = useRouter() } catch { /* outside router context */ }

function navigate(to: { name: string; params?: Record<string, string> } | string) {
  if (router) {
    router.push(to)
  } else {
    const base = window.location.pathname.replace(/\/(people|calendar|bookmarks|notifications)\/?.*$/, '')
    const path = typeof to === 'string' ? to : `/${to.name === 'dock-person' ? 'people/' + to.params?.name : to.name.replace('dock-', '')}`
    window.location.href = base + path
  }
}

const initials = computed(() => {
  const n = props.contact.full_name || '?'
  return n.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
})

const isInternal = computed(() => Boolean(props.contact.is_internal || props.contact.user))
const visibleTags = computed(() => (props.contact.tags ?? []).slice(0, 3))
const overflowTagCount = computed(() => Math.max(0, (props.contact.tags?.length ?? 0) - 3))

const session = (window as any).frappe?.session ?? (window as any).dockBoot?.session
const isOwner = computed(() => props.contact.owner === session?.user)
</script>

<template>
  <div
    class="group flex items-center gap-3 px-4 py-3 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]
           cursor-pointer transition-colors"
    @click="navigate({ name: 'dock-person', params: { name: contact.name } })"
  >
    <!-- Avatar -->
    <div
      class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center
             bg-[var(--dock-accent)]/15 text-[var(--dock-accent)] text-sm font-semibold overflow-hidden"
    >
      <img v-if="contact.image" :src="contact.image" :alt="contact.full_name" class="w-9 h-9 object-cover" />
      <span v-else>{{ initials }}</span>
    </div>

    <!-- Name + meta -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <p class="text-sm font-medium text-[var(--dock-text)] truncate">{{ contact.full_name }}</p>
        <!-- Internal/External badge -->
        <span
          v-if="isInternal"
          class="dock-person-type-badge flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-medium
                 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          :title="__('Internal — has a user account')"
        >{{ __('Internal') }}</span>
        <span
          v-else
          class="dock-person-type-badge flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-medium
                 bg-sky-500/10 text-sky-600 dark:text-sky-400"
          :title="__('External — no user account')"
        >{{ __('External') }}</span>
        <!-- App-context badges -->
        <span
          v-for="app in appBadges"
          :key="app"
          class="dock-person-app-badge px-1.5 py-0.5 rounded text-[9px] font-medium uppercase tracking-wide
                 bg-black/[0.06] dark:bg-white/[0.06] text-[var(--dock-icon)]"
        >{{ app }}</span>
      </div>
      <div class="flex items-center gap-1.5 min-w-0">
        <p v-if="contact.company_name" class="text-xs text-[var(--dock-icon)] truncate">{{ contact.company_name }}</p>
        <!-- Tag pills -->
        <template v-if="visibleTags.length">
          <span class="dock-person-tags flex items-center gap-1">
            <span
              v-for="tag in visibleTags"
              :key="tag"
              class="px-1.5 py-0 rounded-full text-[9px] font-medium
                     bg-black/[0.05] dark:bg-white/[0.08] text-[var(--dock-icon)]"
            >{{ tag }}</span>
            <span
              v-if="overflowTagCount > 0"
              class="text-[9px] text-[var(--dock-icon)]"
            >+{{ overflowTagCount }}</span>
          </span>
        </template>
      </div>
    </div>

    <!-- Email + phone (md+ via media query, not Tailwind — avoids cross-bundle cascade) -->
    <div class="dock-person-meta items-center gap-4 flex-shrink-0">
      <span v-if="contact.email_id" class="flex items-center gap-1 text-xs text-[var(--dock-icon)]">
        <Mail class="w-3 h-3" />
        {{ contact.email_id }}
      </span>
      <span v-if="contact.phone" class="flex items-center gap-1 text-xs text-[var(--dock-icon)]">
        <Phone class="w-3 h-3" />
        {{ contact.phone }}
      </span>
    </div>

    <!-- Hover quick actions -->
    <div
      class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
      @click.stop
    >
      <!-- Compose email -->
      <a
        v-if="contact.email_id"
        :href="`mailto:${contact.email_id}`"
        class="w-7 h-7 flex items-center justify-center rounded text-[var(--dock-icon)]
               hover:text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        :title="__('Compose email')"
      >
        <Mail class="w-3.5 h-3.5" />
      </a>

      <!-- Open calendar -->
      <a
        href="/dock/calendar"
        class="w-7 h-7 flex items-center justify-center rounded text-[var(--dock-icon)]
               hover:text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        :title="__('Open calendar')"
        @click.prevent="navigate('/calendar')"
      >
        <CalendarDays class="w-3.5 h-3.5" />
      </a>

    </div>
  </div>
</template>

<style>
/* Responsive display rules using plain CSS to avoid cross-bundle Tailwind cascade conflicts.
   These classes are namespaced with dock-person- to prevent collisions. */
.dock-person-meta { display: none; }
.dock-person-app-badge { display: none; }
.dock-person-type-badge { display: none; }
.dock-person-tags { display: none; }

@media (min-width: 768px) {
  .dock-person-meta { display: flex; }
  .dock-person-tags { display: flex; }
}
@media (min-width: 640px) {
  .dock-person-app-badge { display: inline-flex; }
  .dock-person-type-badge { display: inline-flex; }
}
</style>
