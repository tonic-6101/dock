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
import { Mail, Phone, Share2, CalendarDays } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'

interface Contact {
  name: string
  full_name: string
  email_id?: string
  phone?: string
  company_name?: string
  image?: string
  dock_shared: number | boolean
  owner: string
}

const props = defineProps<{
  contact: Contact
  appBadges?: string[]   // app names that have context data for this contact
}>()
const emit = defineEmits<{ toggleShared: [name: string, value: boolean] }>()

const router = useRouter()

const initials = computed(() => {
  const n = props.contact.full_name || '?'
  return n.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
})

const isShared = computed(() => Boolean(props.contact.dock_shared))

const session = (window as any).frappe?.session ?? (window as any).dockBoot?.session
const isOwner = computed(() => props.contact.owner === session?.user)
</script>

<template>
  <div
    class="group flex items-center gap-3 px-4 py-3 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]
           cursor-pointer transition-colors"
    @click="router.push(`/people/${contact.name}`)"
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
        <!-- App-context badges -->
        <span
          v-for="app in appBadges"
          :key="app"
          class="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium uppercase tracking-wide
                 bg-black/[0.06] dark:bg-white/[0.06] text-[var(--dock-icon)]"
        >{{ app }}</span>
      </div>
      <p v-if="contact.company_name" class="text-xs text-[var(--dock-icon)] truncate">{{ contact.company_name }}</p>
    </div>

    <!-- Email + phone (md+) -->
    <div class="hidden md:flex items-center gap-4 flex-shrink-0">
      <span v-if="contact.email_id" class="flex items-center gap-1 text-xs text-[var(--dock-icon)]">
        <Mail class="w-3 h-3" />
        {{ contact.email_id }}
      </span>
      <span v-if="contact.phone" class="flex items-center gap-1 text-xs text-[var(--dock-icon)]">
        <Phone class="w-3 h-3" />
        {{ contact.phone }}
      </span>
    </div>

    <!-- Shared badge (visible, not on hover) -->
    <span
      v-if="isShared"
      class="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium
             bg-[var(--dock-accent)]/10 text-[var(--dock-accent)]"
      :title="__('Shared with team')"
    >
      <Share2 class="w-2.5 h-2.5" />
      {{ __('Shared') }}
    </span>

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
        @click.prevent="router.push('/calendar')"
      >
        <CalendarDays class="w-3.5 h-3.5" />
      </a>

      <!-- Share toggle (owner only) -->
      <button
        v-if="isOwner"
        class="w-7 h-7 flex items-center justify-center rounded transition-colors"
        :class="isShared
          ? 'text-[var(--dock-accent)] hover:bg-[var(--dock-accent)]/10'
          : 'text-[var(--dock-icon)] hover:text-[var(--dock-text)] hover:bg-black/5 dark:hover:bg-white/10'"
        :title="isShared ? __('Remove from shared') : __('Share with team')"
        @click="emit('toggleShared', contact.name, !isShared)"
      >
        <Share2 class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
</template>
