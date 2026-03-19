<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockPersonPage' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft, Mail, Phone, User, Activity, Clock, Globe,
  MoreHorizontal, ExternalLink, Copy, Check, CheckSquare, MapPin,
  Edit3, FileText, MessageSquare, Tag, Camera, Cake, Calendar,
  Linkedin, Twitter, Github, Link as LinkIcon, X, Plus,
  Archive, ArchiveRestore, ShieldAlert, Pin, PinOff, Trash2, Send,
  Paperclip, Upload, Download, Filter,
} from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'
import { relativeTime } from '@/composables/useRelativeTime'
import DockPersonContextPanel from '@/components/people/DockPersonContextPanel.vue'

// --- Types ---

interface EmailEntry { email: string; is_primary: number }
interface PhoneEntry { phone: string; is_primary: number; label?: string }
interface AddressInfo {
  name: string
  address_type: string
  address_line1: string
  address_line2: string
  city: string
  state: string
  country: string
  pincode: string
  is_primary_address: boolean
  display: string
}
interface ActivityInfo { type: string; subject: string; date: string }

interface Contact {
  name: string
  full_name: string
  company_name?: string
  designation?: string
  image?: string
  status?: string
  source?: string
  department?: string
  email_ids: EmailEntry[]
  phone_nos: PhoneEntry[]
  owner: string
  owner_name?: string
  modified?: string
  tags?: string[]
  addresses: AddressInfo[]
  last_activity?: ActivityInfo | null
  dock_birthday?: string
  dock_linkedin?: string
  dock_twitter?: string
  dock_github?: string
  dock_website?: string
  dock_archived?: boolean
  dock_do_not_contact?: boolean
  user?: string
}

interface ContextPanel {
  app: string
  label: string
  icon?: string
  link?: string
  fields?: { label: string; value: string }[]
}

// --- Router ---

let route: ReturnType<typeof useRoute> | undefined
let router: ReturnType<typeof useRouter> | undefined
try { route = useRoute(); router = useRouter() } catch { /* outside router context */ }

// --- State ---

const contact = ref<Contact | null>(null)
const panels = ref<ContextPanel[]>([])
const loading = ref(true)
const hasError = ref(false)
const showOverflow = ref(false)
const activeTab = ref<'activity' | 'details' | 'notes' | 'context' | 'files'>('activity')
const copiedField = ref<string | null>(null)

// Inline editing state
const editingField = ref<string | null>(null)
const editValue = ref('')
const editSaving = ref(false)

// Photo upload
const fileInput = ref<HTMLInputElement | null>(null)
const uploadingPhoto = ref(false)

// Address form state
const ADDRESS_TYPES = ['Personal', 'Office', 'Billing', 'Shipping', 'Other'] as const
const showAddressForm = ref(false)
const editingAddress = ref<string | null>(null) // address name being edited, or null for new
const addressForm = ref({
  address_type: 'Personal' as string,
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
  is_primary: 0,
})
const addressSaving = ref(false)

// Country search
const countryQuery = ref('')
const countrySuggestions = ref<{ name: string; code: string }[]>([])
const showCountryDropdown = ref(false)
let countrySearchTimer: ReturnType<typeof setTimeout> | null = null

function onCountryInput(val: string) {
  countryQuery.value = val
  addressForm.value.country = val
  if (countrySearchTimer) clearTimeout(countrySearchTimer)
  if (val.length < 2) {
    countrySuggestions.value = []
    showCountryDropdown.value = false
    return
  }
  countrySearchTimer = setTimeout(async () => {
    try {
      const results = await callApi<{ name: string; code: string }[]>(
        'dock.api.people.search_countries',
        { query: val, limit: 8 },
      )
      countrySuggestions.value = results
      showCountryDropdown.value = results.length > 0
    } catch {
      countrySuggestions.value = []
      showCountryDropdown.value = false
    }
  }, 200)
}

function selectCountry(name: string) {
  addressForm.value.country = name
  countryQuery.value = name
  showCountryDropdown.value = false
}

function delayCloseCountryDropdown() {
  setTimeout(() => { showCountryDropdown.value = false }, 200)
}


// --- Computed ---

const contactName = computed(() => {
  if (route?.params?.name) return route.params.name as string
  const match = window.location.pathname.match(/\/people\/([^/]+)/)
  return match?.[1] ?? ''
})

const session = (window as any).frappe?.session ?? (window as any).dockBoot?.session
const isOwner = computed(() => contact.value?.owner === session?.user)
const isSystemManager = computed(() => {
  const deskRoles = ((window as any).frappe?.boot?.user?.roles ?? []) as string[]
  if (deskRoles.includes('System Manager')) return true
  return Boolean((window as any).dockBoot?.is_system_manager)
})
const canEdit = computed(() => isOwner.value || isSystemManager.value)

const primaryEmail = computed(() =>
  contact.value?.email_ids.find(e => e.is_primary)?.email ?? contact.value?.email_ids[0]?.email,
)
const secondaryEmails = computed(() =>
  contact.value?.email_ids.filter(e => !e.is_primary) ?? [],
)
const primaryPhone = computed(() =>
  contact.value?.phone_nos.find(p => p.is_primary)?.phone ?? contact.value?.phone_nos[0]?.phone,
)
const primaryPhoneLabel = computed(() => {
  const p = contact.value?.phone_nos.find(p => p.is_primary) ?? contact.value?.phone_nos[0]
  return p?.label || ''
})
const secondaryPhones = computed(() =>
  contact.value?.phone_nos.filter(p => !p.is_primary) ?? [],
)

const initials = computed(() => {
  const n = contact.value?.full_name || '?'
  return n.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
})

const isArchived = computed(() => Boolean(contact.value?.dock_archived))
const isDoNotContact = computed(() => Boolean(contact.value?.dock_do_not_contact))
const isInternal = computed(() => Boolean(contact.value?.user))

const lastActivityText = computed(() => {
  if (contact.value?.last_activity) {
    const a = contact.value.last_activity
    const ago = relativeTime(a.date)
    const label = a.subject ? `${a.type} — ${a.subject}` : a.type
    return `${ago} — ${label}`
  }
  if (contact.value?.modified) {
    return `${relativeTime(contact.value.modified)} — ${__('Modified')}`
  }
  return __('No activity')
})

const visibleTags = computed(() => (contact.value?.tags ?? []).slice(0, 5))
const overflowTagCount = computed(() => Math.max(0, (contact.value?.tags?.length ?? 0) - 5))
const showAllTags = ref(false)
const showTagInput = ref(false)
const newTagValue = ref('')
const tagSaving = ref(false)

// Birthday helpers
const birthdayDisplay = computed(() => {
  if (!contact.value?.dock_birthday) return ''
  const d = new Date(contact.value.dock_birthday + 'T00:00:00')
  return d.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
})

const isBirthdaySoon = computed(() => {
  if (!contact.value?.dock_birthday) return false
  const today = new Date()
  const bd = new Date(contact.value.dock_birthday + 'T00:00:00')
  bd.setFullYear(today.getFullYear())
  if (bd < today) bd.setFullYear(today.getFullYear() + 1)
  const diffDays = Math.ceil((bd.getTime() - today.getTime()) / 86_400_000)
  return diffDays >= 0 && diffDays <= 14
})

// Social profiles — only show populated ones
const socialLinks = computed(() => {
  if (!contact.value) return []
  const links: { key: string; url: string; icon: any; label: string }[] = []
  if (contact.value.dock_linkedin)
    links.push({ key: 'linkedin', url: contact.value.dock_linkedin, icon: Linkedin, label: 'LinkedIn' })
  if (contact.value.dock_twitter)
    links.push({ key: 'twitter', url: contact.value.dock_twitter, icon: Twitter, label: 'Twitter / X' })
  if (contact.value.dock_github)
    links.push({ key: 'github', url: contact.value.dock_github, icon: Github, label: 'GitHub' })
  if (contact.value.dock_website)
    links.push({ key: 'website', url: contact.value.dock_website, icon: Globe, label: 'Website' })
  return links
})

const hasSocialLinks = computed(() => socialLinks.value.length > 0)

// --- Data fetching ---

async function fetchContact() {
  loading.value = true
  hasError.value = false
  try {
    const [c, ctx] = await Promise.all([
      callApi<Contact>('dock.api.people.get_contact', { contact_name: contactName.value }),
      callApi<ContextPanel[]>('dock.api.people.get_contact_context', { contact_name: contactName.value }),
    ])
    contact.value = c
    panels.value = ctx
    if (ctx.length && !c.last_activity) {
      activeTab.value = 'context'
    }
    // Fetch notes, timeline, and files in background (non-blocking)
    fetchNotes()
    fetchTimeline(true)
    fetchFiles()
  } catch {
    hasError.value = true
  } finally {
    loading.value = false
  }
}

// --- Inline editing ---

function startEdit(field: string) {
  if (!canEdit.value || editSaving.value) return
  editingField.value = field
  editValue.value = (contact.value as any)?.[field] ?? ''
}

async function saveEdit() {
  if (!contact.value || !editingField.value || editSaving.value) return
  const field = editingField.value
  const value = editValue.value
  editSaving.value = true
  try {
    await callApi('dock.api.people.update_contact', {
      contact_name: contact.value.name,
      field,
      value,
    })
    // Optimistic update
    ;(contact.value as any)[field] = value
    editingField.value = null
  } catch {
    // Keep editing open on failure
  } finally {
    editSaving.value = false
  }
}

function cancelEdit() {
  editingField.value = null
  editValue.value = ''
}

function onEditKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') saveEdit()
  else if (e.key === 'Escape') cancelEdit()
}

async function toggleArchived() {
  if (!contact.value || editSaving.value) return
  editSaving.value = true
  try {
    const newVal = !contact.value.dock_archived
    await callApi('dock.api.people.update_contact', {
      contact_name: contact.value.name,
      field: 'dock_archived',
      value: newVal ? 1 : 0,
    })
    contact.value.dock_archived = newVal
  } finally {
    editSaving.value = false
  }
}

async function toggleDoNotContact() {
  if (!contact.value || editSaving.value) return
  editSaving.value = true
  try {
    const newVal = !contact.value.dock_do_not_contact
    await callApi('dock.api.people.update_contact', {
      contact_name: contact.value.name,
      field: 'dock_do_not_contact',
      value: newVal ? 1 : 0,
    })
    contact.value.dock_do_not_contact = newVal
  } finally {
    editSaving.value = false
  }
}

// --- Internal/External toggle ---

const showUserLinkInput = ref(false)
const userLinkQuery = ref('')
const userLinkSuggestions = ref<{ user: string; full_name: string }[]>([])
const showUserLinkDropdown = ref(false)
let userLinkTimer: ReturnType<typeof setTimeout> | null = null

function onUserLinkInput(val: string) {
  userLinkQuery.value = val
  if (userLinkTimer) clearTimeout(userLinkTimer)
  if (val.length < 2) {
    userLinkSuggestions.value = []
    showUserLinkDropdown.value = false
    return
  }
  userLinkTimer = setTimeout(async () => {
    try {
      const results = await callApi<{ user: string; full_name: string }[]>(
        'dock.api.people.search_users',
        { query: val, limit: 8 },
      )
      userLinkSuggestions.value = results
      showUserLinkDropdown.value = results.length > 0
    } catch {
      userLinkSuggestions.value = []
      showUserLinkDropdown.value = false
    }
  }, 200)
}

async function linkUser(userId: string) {
  if (!contact.value || editSaving.value) return
  editSaving.value = true
  try {
    await callApi('dock.api.people.update_contact', {
      contact_name: contact.value.name,
      field: 'user',
      value: userId,
    })
    contact.value.user = userId
  } finally {
    editSaving.value = false
    showUserLinkInput.value = false
    userLinkQuery.value = ''
    userLinkSuggestions.value = []
    showUserLinkDropdown.value = false
  }
}

async function unlinkUser() {
  if (!contact.value || editSaving.value) return
  editSaving.value = true
  try {
    await callApi('dock.api.people.update_contact', {
      contact_name: contact.value.name,
      field: 'user',
      value: '',
    })
    contact.value.user = ''
  } finally {
    editSaving.value = false
  }
}

// --- Photo upload ---

function triggerPhotoUpload() {
  if (!canEdit.value) return
  fileInput.value?.click()
}

async function onPhotoSelected(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !contact.value) return

  uploadingPhoto.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('contact_name', contact.value.name)

    const csrf = (window as any).frappe?.csrf_token
      ?? (window as any).csrf_token
      ?? (window as any).dockBoot?.session?.csrf_token
      ?? ''

    const res = await fetch('/api/method/dock.api.people.upload_image', {
      method: 'POST',
      headers: { 'X-Frappe-CSRF-Token': csrf },
      body: formData,
    })
    const json = await res.json()
    if (res.ok && json.message?.image) {
      contact.value.image = json.message.image
    }
  } finally {
    uploadingPhoto.value = false
    input.value = ''
  }
}

// --- Clipboard ---

async function copyToClipboard(text: string, fieldId: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedField.value = fieldId
    setTimeout(() => { copiedField.value = null }, 2000)
  } catch { /* clipboard not available */ }
}

// --- Address management ---

function openAddressForm(addr?: AddressInfo) {
  if (addr) {
    editingAddress.value = addr.name
    addressForm.value = {
      address_type: addr.address_type,
      address_line1: addr.address_line1,
      address_line2: addr.address_line2,
      city: addr.city,
      state: addr.state,
      country: addr.country,
      pincode: addr.pincode,
      is_primary: addr.is_primary_address ? 1 : 0,
    }
    countryQuery.value = addr.country
  } else {
    editingAddress.value = null
    addressForm.value = {
      address_type: 'Personal',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      is_primary: 0,
    }
    countryQuery.value = ''
  }
  showCountryDropdown.value = false
  showAddressForm.value = true
}

function closeAddressForm() {
  showAddressForm.value = false
  editingAddress.value = null
}

async function saveAddress() {
  if (!contact.value || addressSaving.value) return
  addressSaving.value = true
  try {
    if (editingAddress.value) {
      const updated = await callApi<AddressInfo>('dock.api.people.update_address', {
        contact_name: contact.value.name,
        address_name: editingAddress.value,
        ...addressForm.value,
      })
      const idx = contact.value.addresses.findIndex(a => a.name === editingAddress.value)
      if (idx >= 0) contact.value.addresses[idx] = updated
    } else {
      const created = await callApi<AddressInfo>('dock.api.people.create_address', {
        contact_name: contact.value.name,
        ...addressForm.value,
      })
      contact.value.addresses.push(created)
    }
    closeAddressForm()
  } finally {
    addressSaving.value = false
  }
}

async function deleteAddress(addrName: string) {
  if (!contact.value) return
  try {
    await callApi('dock.api.people.delete_address', {
      contact_name: contact.value.name,
      address_name: addrName,
    })
    contact.value.addresses = contact.value.addresses.filter(a => a.name !== addrName)
  } catch { /* silent */ }
}

// --- Notes ---

interface Note {
  name: string
  content: string
  reference_doctype: string
  reference_name: string
  reference_label: string
  pinned: boolean
  owner: string
  owner_name: string
  creation: string
  modified: string
}

const notes = ref<Note[]>([])
const notesTotal = ref(0)
const notesLoading = ref(false)
const newNoteContent = ref('')
const noteSaving = ref(false)
const showNoteInput = ref(false)

async function fetchNotes() {
  if (!contact.value) return
  notesLoading.value = true
  try {
    const res = await callApi<{ items: Note[]; total: number }>('dock.api.notes.get_list', {
      reference_doctype: 'Contact',
      reference_name: contact.value.name,
      limit: 50,
    })
    notes.value = res.items
    notesTotal.value = res.total
  } catch {
    // silent
  } finally {
    notesLoading.value = false
  }
}

async function createNote() {
  if (!contact.value || !newNoteContent.value.trim() || noteSaving.value) return
  noteSaving.value = true
  try {
    const note = await callApi<Note>('dock.api.notes.create', {
      content: newNoteContent.value.trim(),
      reference_doctype: 'Contact',
      reference_name: contact.value.name,
    })
    notes.value.unshift(note)
    notesTotal.value++
    newNoteContent.value = ''
    showNoteInput.value = false
  } finally {
    noteSaving.value = false
  }
}

async function toggleNotePin(noteName: string) {
  try {
    const updated = await callApi<Note>('dock.api.notes.toggle_pin', { name: noteName })
    const idx = notes.value.findIndex(n => n.name === noteName)
    if (idx >= 0) notes.value[idx] = updated
    // Re-sort: pinned first
    notes.value.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
  } catch { /* silent */ }
}

async function deleteNote(noteName: string) {
  try {
    await callApi('dock.api.notes.delete', { name: noteName })
    notes.value = notes.value.filter(n => n.name !== noteName)
    notesTotal.value--
  } catch { /* silent */ }
}

// --- Activity Timeline ---

interface TimelineEntry {
  name: string
  type: string
  icon: string
  subject: string
  sender: string
  date: string
  content: string
  source: string
}

const timeline = ref<TimelineEntry[]>([])
const timelineTotal = ref(0)
const timelineLoading = ref(false)
const timelineFilter = ref<string | null>(null)
const timelineOffset = ref(0)

async function fetchTimeline(reset = false) {
  if (!contact.value) return
  if (reset) { timelineOffset.value = 0; timeline.value = [] }
  timelineLoading.value = true
  try {
    const res = await callApi<{ items: TimelineEntry[]; total: number }>(
      'dock.api.people.get_activity_timeline',
      {
        contact_name: contact.value.name,
        limit: 20,
        offset: timelineOffset.value,
        activity_type: timelineFilter.value || undefined,
      }
    )
    timeline.value = reset ? res.items : [...timeline.value, ...res.items]
    timelineTotal.value = res.total
    timelineOffset.value += res.items.length
  } catch {
    // silent
  } finally {
    timelineLoading.value = false
  }
}

function setTimelineFilter(f: string | null) {
  timelineFilter.value = f
  fetchTimeline(true)
}

const timelineIconMap: Record<string, any> = {
  mail: Mail,
  phone: Phone,
  'message-square': MessageSquare,
}

// --- Files ---

interface AttachedFile {
  name: string
  file_name: string
  file_url: string
  file_size: number
  is_private: number
  creation: string
}

const files = ref<AttachedFile[]>([])
const filesLoading = ref(false)
const attachInput = ref<HTMLInputElement | null>(null)
const uploadingFile = ref(false)

async function fetchFiles() {
  if (!contact.value) return
  filesLoading.value = true
  try {
    files.value = await callApi<AttachedFile[]>(
      'dock.api.people.get_files',
      { contact_name: contact.value.name }
    )
  } catch {
    // silent
  } finally {
    filesLoading.value = false
  }
}

function triggerFileUpload() {
  if (!canEdit.value) return
  attachInput.value?.click()
}

async function onFileSelected(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length || !contact.value) return
  uploadingFile.value = true
  try {
    const form = new FormData()
    form.append('file', input.files[0])
    form.append('contact_name', contact.value.name)

    const csrf = (window as any).frappe?.csrf_token
      ?? (window as any).csrf_token
      ?? (window as any).dockBoot?.session?.csrf_token ?? ''

    const res = await fetch('/api/method/dock.api.people.upload_file', {
      method: 'POST',
      headers: { 'X-Frappe-CSRF-Token': csrf },
      body: form,
    })
    const json = await res.json()
    if (json.message) files.value.unshift(json.message)
  } catch {
    // silent
  } finally {
    uploadingFile.value = false
    input.value = ''
  }
}

async function deleteFile(fileName: string) {
  if (!contact.value) return
  try {
    await callApi('dock.api.people.delete_file', {
      contact_name: contact.value.name,
      file_name: fileName,
    })
    files.value = files.value.filter(f => f.name !== fileName)
  } catch { /* silent */ }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// --- Tags ---

async function addTag() {
  const tag = newTagValue.value.trim()
  if (!tag || !contact.value || tagSaving.value) return
  tagSaving.value = true
  try {
    const result = await callApi<{ tags: string[] }>('dock.api.people.add_tag', {
      contact_name: contact.value.name,
      tag,
    })
    contact.value.tags = result.tags
    newTagValue.value = ''
    showTagInput.value = false
  } finally {
    tagSaving.value = false
  }
}

async function removeTag(tag: string) {
  if (!contact.value || tagSaving.value) return
  tagSaving.value = true
  try {
    const result = await callApi<{ tags: string[] }>('dock.api.people.remove_tag', {
      contact_name: contact.value.name,
      tag,
    })
    contact.value.tags = result.tags
  } finally {
    tagSaving.value = false
  }
}

function onTagKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') addTag()
  else if (e.key === 'Escape') { showTagInput.value = false; newTagValue.value = '' }
}

// --- Navigation ---

function goBack() {
  if (router) {
    router.push({ name: 'dock-people' })
  } else {
    window.location.href = window.location.pathname.replace(/\/people\/.*$/, '/people')
  }
}

function closeOverflow() {
  if (showOverflow.value) showOverflow.value = false
}

onMounted(() => {
  fetchContact()
  document.addEventListener('click', closeOverflow)
})
onUnmounted(() => {
  document.removeEventListener('click', closeOverflow)
})
</script>

<template>
  <div class="dock-person-page max-w-5xl mx-auto">
    <!-- Back -->
    <button
      class="flex items-center gap-1.5 text-sm text-[var(--dock-icon)] hover:text-[var(--dock-text)]
             transition-colors mb-6"
      @click="goBack"
    >
      <ArrowLeft class="w-4 h-4" />
      {{ __('People') }}
    </button>

    <!-- Archived / Do Not Contact banners -->
    <div
      v-if="!loading && contact?.dock_archived"
      class="flex items-center gap-2 px-4 py-2.5 mb-4 rounded-lg
             bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
    >
      <Archive class="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
      <span class="text-sm text-amber-700 dark:text-amber-300 flex-1">{{ __('This contact is archived and hidden from the People list.') }}</span>
      <button
        v-if="canEdit"
        class="text-xs font-medium text-amber-700 dark:text-amber-300 hover:underline flex-shrink-0"
        @click="toggleArchived"
      >
        {{ __('Restore') }}
      </button>
    </div>
    <div
      v-if="!loading && contact?.dock_do_not_contact"
      class="flex items-center gap-2 px-4 py-2.5 mb-4 rounded-lg
             bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
    >
      <ShieldAlert class="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
      <span class="text-sm text-red-700 dark:text-red-300 flex-1">{{ __('This person is marked as Do Not Contact.') }}</span>
      <button
        v-if="canEdit"
        class="text-xs font-medium text-red-700 dark:text-red-300 hover:underline flex-shrink-0"
        @click="toggleDoNotContact"
      >
        {{ __('Remove') }}
      </button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="space-y-4">
      <div class="flex items-center gap-4">
        <div class="w-20 h-20 rounded-full bg-black/10 dark:bg-white/10 animate-pulse flex-shrink-0" />
        <div class="space-y-2 flex-1">
          <div class="h-6 w-56 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
          <div class="h-4 w-40 bg-black/[0.06] dark:bg-white/[0.06] rounded animate-pulse" />
          <div class="h-4 w-32 bg-black/[0.06] dark:bg-white/[0.06] rounded animate-pulse" />
        </div>
      </div>
      <div class="h-10 w-full bg-black/[0.04] dark:bg-white/[0.04] rounded animate-pulse mt-4" />
      <div class="space-y-2 mt-4">
        <div v-for="i in 5" :key="i" class="h-12 bg-black/[0.04] dark:bg-white/[0.04] rounded animate-pulse" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="hasError" class="text-center py-12">
      <p class="text-sm text-[var(--dock-icon)] mb-3">{{ __('Could not load contact') }}</p>
      <button class="text-xs text-[var(--dock-accent)] hover:underline" @click="fetchContact">{{ __('Retry') }}</button>
    </div>

    <template v-else-if="contact">
      <!-- ============================== -->
      <!-- ZONE 1 — Identity Header       -->
      <!-- ============================== -->
      <div class="mb-6">
        <div class="flex items-start gap-4">
          <!-- Avatar with upload -->
          <div class="relative flex-shrink-0 group/avatar">
            <div
              class="w-20 h-20 rounded-full flex items-center justify-center
                     bg-[var(--dock-accent)]/15 text-[var(--dock-accent)] text-2xl font-semibold overflow-hidden"
              :class="{ 'opacity-60': uploadingPhoto }"
            >
              <img v-if="contact.image" :src="contact.image" :alt="contact.full_name" class="w-20 h-20 object-cover" />
              <span v-else>{{ initials }}</span>
            </div>
            <!-- Upload overlay -->
            <button
              v-if="canEdit"
              class="absolute inset-0 w-20 h-20 rounded-full flex items-center justify-center
                     bg-black/50 text-white opacity-0 group-hover/avatar:opacity-100
                     transition-opacity cursor-pointer"
              :title="__('Change photo')"
              @click="triggerPhotoUpload"
            >
              <Camera class="w-5 h-5" />
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onPhotoSelected"
            />
          </div>

          <div class="flex-1 min-w-0 pt-0.5">
            <!-- Name row with overflow menu -->
            <div class="flex items-start gap-2">
              <!-- Inline-editable name -->
              <div class="flex-1 min-w-0">
                <h1
                  v-if="editingField !== 'full_name'"
                  class="text-2xl font-semibold text-[var(--dock-text)] truncate"
                  :class="{ 'cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/[0.05] rounded px-1 -mx-1': canEdit }"
                  @click="startEdit('full_name')"
                >
                  {{ contact.full_name }}
                </h1>
                <input
                  v-else
                  v-model="editValue"
                  class="w-full text-2xl font-semibold text-[var(--dock-text)] bg-transparent
                         border-b-2 border-[var(--dock-accent)] outline-none px-1 -mx-1"
                  @keydown="onEditKeydown"
                  @blur="saveEdit"
                  autofocus
                />
              </div>

              <!-- Overflow menu -->
              <div class="relative flex-shrink-0">
                <button
                  class="p-1.5 rounded-md text-[var(--dock-icon)] hover:text-[var(--dock-text)]
                         hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  @click.stop="showOverflow = !showOverflow"
                >
                  <MoreHorizontal class="w-5 h-5" />
                </button>
                <div
                  v-if="showOverflow"
                  class="absolute right-0 top-full mt-1 w-48 bg-[var(--dock-bg)] border border-[var(--dock-border)]
                         rounded-lg shadow-lg z-50 py-1 overflow-hidden"
                >
                  <a
                    :href="`/app/contact/${contact.name}`"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center gap-2 px-3 py-2 text-sm text-[var(--dock-text)]
                           hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink class="w-4 h-4 text-[var(--dock-icon)]" />
                    {{ __('Open in Desk') }}
                  </a>
                  <div v-if="canEdit" class="border-t border-[var(--dock-border)] my-1" />
                  <button
                    v-if="canEdit"
                    class="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--dock-text)]
                           hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-left"
                    @click="toggleDoNotContact(); showOverflow = false"
                  >
                    <ShieldAlert class="w-4 h-4" :class="isDoNotContact ? 'text-red-500' : 'text-[var(--dock-icon)]'" />
                    {{ isDoNotContact ? __('Remove Do Not Contact') : __('Mark Do Not Contact') }}
                  </button>
                  <button
                    v-if="canEdit"
                    class="w-full flex items-center gap-2 px-3 py-2 text-sm
                           hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-left"
                    :class="isArchived ? 'text-[var(--dock-text)]' : 'text-amber-600 dark:text-amber-400'"
                    @click="toggleArchived(); showOverflow = false"
                  >
                    <ArchiveRestore v-if="isArchived" class="w-4 h-4 text-[var(--dock-icon)]" />
                    <Archive v-else class="w-4 h-4" />
                    {{ isArchived ? __('Restore from archive') : __('Archive contact') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Designation (inline-editable) -->
            <p
              v-if="editingField !== 'designation' && contact.designation"
              class="text-sm text-[var(--dock-icon)] truncate"
              :class="{ 'cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/[0.05] rounded px-1 -mx-1': canEdit }"
              @click="startEdit('designation')"
            >
              {{ contact.designation }}
            </p>
            <p
              v-else-if="editingField !== 'designation' && canEdit && !contact.designation"
              class="text-sm text-[var(--dock-icon)]/40 cursor-pointer hover:text-[var(--dock-icon)] px-1 -mx-1"
              @click="startEdit('designation')"
            >
              {{ __('Add job title') }}
            </p>
            <input
              v-if="editingField === 'designation'"
              v-model="editValue"
              :placeholder="__('Job title')"
              class="w-full text-sm text-[var(--dock-icon)] bg-transparent
                     border-b-2 border-[var(--dock-accent)] outline-none px-1 -mx-1"
              @keydown="onEditKeydown"
              @blur="saveEdit"
              autofocus
            />

            <!-- Company (inline-editable, clickable link when not editing) -->
            <p
              v-if="editingField !== 'company_name' && contact.company_name"
              class="text-sm text-[var(--dock-icon)] truncate"
              :class="{ 'cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/[0.05] rounded px-1 -mx-1': canEdit }"
              @click="startEdit('company_name')"
            >
              {{ contact.company_name }}
            </p>
            <p
              v-else-if="editingField !== 'company_name' && canEdit && !contact.company_name"
              class="text-sm text-[var(--dock-icon)]/40 cursor-pointer hover:text-[var(--dock-icon)] px-1 -mx-1"
              @click="startEdit('company_name')"
            >
              {{ __('Add company') }}
            </p>
            <input
              v-if="editingField === 'company_name'"
              v-model="editValue"
              :placeholder="__('Company')"
              class="w-full text-sm text-[var(--dock-icon)] bg-transparent
                     border-b-2 border-[var(--dock-accent)] outline-none px-1 -mx-1"
              @keydown="onEditKeydown"
              @blur="saveEdit"
              autofocus
            />

            <!-- Badges + Tags row -->
            <div class="flex items-center gap-1.5 mt-2 flex-wrap">
              <!-- Archived badge -->
              <span
                v-if="isArchived"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                       bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
              >
                <Archive class="w-3 h-3" />
                {{ __('Archived') }}
              </span>
              <!-- Do Not Contact badge -->
              <span
                v-if="isDoNotContact"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                       bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
              >
                <ShieldAlert class="w-3 h-3" />
                {{ __('Do Not Contact') }}
              </span>
              <!-- Tags (interactive) -->
              <span
                v-for="tag in (showAllTags ? (contact.tags ?? []) : visibleTags)"
                :key="tag"
                class="inline-flex items-center gap-1 pl-2 rounded-full text-xs font-medium
                       bg-[var(--dock-accent)]/10 text-[var(--dock-accent)] group/tag"
                :class="canEdit ? 'pr-1 py-0.5' : 'pr-2 py-0.5'"
              >
                <Tag class="w-3 h-3" />
                {{ tag }}
                <button
                  v-if="canEdit"
                  class="p-0.5 rounded-full hover:bg-[var(--dock-accent)]/20 opacity-0 group-hover/tag:opacity-100
                         transition-opacity"
                  :title="__('Remove tag')"
                  @click="removeTag(tag)"
                >
                  <X class="w-3 h-3" />
                </button>
              </span>
              <!-- Show all / collapse toggle -->
              <button
                v-if="!showAllTags && overflowTagCount > 0"
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs
                       bg-black/5 dark:bg-white/10 text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
                @click="showAllTags = true"
              >
                +{{ overflowTagCount }}
              </button>
              <button
                v-if="showAllTags && (contact.tags?.length ?? 0) > 5"
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs
                       text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
                @click="showAllTags = false"
              >
                {{ __('Show less') }}
              </button>
              <!-- Add tag -->
              <span v-if="canEdit && showTagInput" class="inline-flex items-center">
                <input
                  v-model="newTagValue"
                  class="w-24 text-xs bg-transparent border-b border-[var(--dock-accent)] outline-none
                         text-[var(--dock-text)] placeholder-[var(--dock-icon)]/40 px-1"
                  :placeholder="__('New tag')"
                  @keydown="onTagKeydown"
                  @blur="() => { if (!newTagValue.trim()) showTagInput = false }"
                  autofocus
                />
              </span>
              <button
                v-if="canEdit && !showTagInput"
                class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs
                       text-[var(--dock-icon)] hover:text-[var(--dock-accent)] hover:bg-[var(--dock-accent)]/5
                       transition-colors"
                @click="showTagInput = true"
              >
                <Plus class="w-3 h-3" />
                {{ __('Tag') }}
              </button>
            </div>

            <!-- Social links row -->
            <div v-if="hasSocialLinks" class="flex items-center gap-2 mt-2">
              <a
                v-for="s in socialLinks"
                :key="s.key"
                :href="s.url"
                target="_blank"
                rel="noopener noreferrer"
                class="p-1.5 rounded-md text-[var(--dock-icon)] hover:text-[var(--dock-text)]
                       hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                :title="s.label"
              >
                <component :is="s.icon" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Actions Row -->
        <div class="dock-person-actions flex items-center gap-2 mt-4">
          <a
            v-if="primaryEmail && !isDoNotContact"
            :href="`mailto:${primaryEmail}`"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                   bg-[var(--dock-accent)] text-white hover:opacity-90 transition-opacity"
          >
            <Mail class="w-4 h-4" />
            {{ __('Email') }}
          </a>
          <a
            v-if="primaryPhone && !isDoNotContact"
            :href="`tel:${primaryPhone}`"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                   border border-[var(--dock-border)] text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Phone class="w-4 h-4" />
            {{ __('Call') }}
          </a>
          <button
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                   border border-[var(--dock-border)] text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            @click="activeTab = 'notes'; showNoteInput = true"
          >
            <MessageSquare class="w-4 h-4" />
            {{ __('Note') }}
          </button>
          <button
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                   border border-[var(--dock-border)] text-[var(--dock-text)]
                   hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <CheckSquare class="w-4 h-4" />
            {{ __('Task') }}
          </button>
        </div>
      </div>

      <!-- ============================== -->
      <!-- ZONE 2 — Key Properties        -->
      <!-- ============================== -->
      <dl class="border border-[var(--dock-border)] rounded-lg divide-y divide-[var(--dock-border)] overflow-hidden mb-6">
        <!-- Primary Email -->
        <div v-if="primaryEmail" class="flex items-center gap-3 px-4 py-3 group">
          <Mail class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Email') }}</dt>
            <dd class="text-sm text-[var(--dock-text)]">
              <a :href="`mailto:${primaryEmail}`" class="hover:underline">{{ primaryEmail }}</a>
            </dd>
            <div v-if="secondaryEmails.length" class="mt-1 space-y-0.5">
              <span v-for="e in secondaryEmails" :key="e.email" class="block text-xs text-[var(--dock-icon)]">
                <a :href="`mailto:${e.email}`" class="hover:underline">{{ e.email }}</a>
              </span>
            </div>
          </div>
          <button
            class="flex-shrink-0 p-1.5 rounded text-[var(--dock-icon)] opacity-0 group-hover:opacity-100
                   hover:text-[var(--dock-text)] transition-all"
            :title="__('Copy')"
            @click="copyToClipboard(primaryEmail!, 'email')"
          >
            <Check v-if="copiedField === 'email'" class="w-4 h-4 text-green-500" />
            <Copy v-else class="w-4 h-4" />
          </button>
        </div>

        <!-- Primary Phone -->
        <div v-if="primaryPhone" class="flex items-center gap-3 px-4 py-3 group">
          <Phone class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">
              {{ __('Phone') }}
              <span v-if="primaryPhoneLabel" class="ml-1 normal-case">({{ primaryPhoneLabel }})</span>
            </dt>
            <dd class="text-sm text-[var(--dock-text)]">
              <a :href="`tel:${primaryPhone}`" class="hover:underline">{{ primaryPhone }}</a>
            </dd>
            <div v-if="secondaryPhones.length" class="mt-1 space-y-0.5">
              <span v-for="p in secondaryPhones" :key="p.phone" class="block text-xs text-[var(--dock-icon)]">
                <a :href="`tel:${p.phone}`" class="hover:underline">{{ p.phone }}</a>
                <span v-if="p.label" class="ml-1">({{ p.label }})</span>
              </span>
            </div>
          </div>
          <button
            class="flex-shrink-0 p-1.5 rounded text-[var(--dock-icon)] opacity-0 group-hover:opacity-100
                   hover:text-[var(--dock-text)] transition-all"
            :title="__('Copy')"
            @click="copyToClipboard(primaryPhone!, 'phone')"
          >
            <Check v-if="copiedField === 'phone'" class="w-4 h-4 text-green-500" />
            <Copy v-else class="w-4 h-4" />
          </button>
        </div>

        <!-- Birthday -->
        <div v-if="contact.dock_birthday || canEdit" class="flex items-center gap-3 px-4 py-3">
          <Cake class="w-4 h-4 flex-shrink-0" :class="isBirthdaySoon ? 'text-pink-500' : 'text-[var(--dock-icon)]'" />
          <div class="flex-1 min-w-0">
            <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Birthday') }}</dt>
            <dd v-if="editingField !== 'dock_birthday'">
              <span
                v-if="contact.dock_birthday"
                class="text-sm text-[var(--dock-text)]"
                :class="{ 'cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/[0.05] rounded px-1 -mx-1': canEdit }"
                @click="startEdit('dock_birthday')"
              >
                {{ birthdayDisplay }}
                <span v-if="isBirthdaySoon" class="ml-1.5 text-xs text-pink-500 font-medium">{{ __('Coming up!') }}</span>
              </span>
              <span
                v-else-if="canEdit"
                class="text-sm text-[var(--dock-icon)]/40 cursor-pointer hover:text-[var(--dock-icon)]"
                @click="startEdit('dock_birthday')"
              >
                {{ __('Add birthday') }}
              </span>
            </dd>
            <input
              v-else
              v-model="editValue"
              type="date"
              class="text-sm text-[var(--dock-text)] bg-transparent border-b-2 border-[var(--dock-accent)] outline-none"
              @keydown="onEditKeydown"
              @blur="saveEdit"
              autofocus
            />
          </div>
        </div>

        <!-- Addresses -->
        <div
          v-for="addr in contact.addresses"
          :key="addr.name"
          class="flex items-center gap-3 px-4 py-3 group"
        >
          <MapPin class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">
              {{ addr.address_type }}
              <span v-if="addr.is_primary_address" class="ml-1 text-[var(--dock-accent)]">{{ __('Primary') }}</span>
            </dt>
            <dd class="text-sm text-[var(--dock-text)]">
              {{ addr.city && addr.country ? `${addr.address_line1}, ${addr.city}, ${addr.country}` : addr.display }}
            </dd>
          </div>
          <button
            v-if="canEdit"
            class="flex-shrink-0 p-1.5 rounded text-[var(--dock-icon)] opacity-0 group-hover:opacity-100
                   hover:text-[var(--dock-text)] transition-all"
            :title="__('Edit')"
            @click="openAddressForm(addr)"
          >
            <Edit3 class="w-4 h-4" />
          </button>
          <button
            class="flex-shrink-0 p-1.5 rounded text-[var(--dock-icon)] opacity-0 group-hover:opacity-100
                   hover:text-[var(--dock-text)] transition-all"
            :title="__('Copy')"
            @click="copyToClipboard(addr.display, `address-${addr.name}`)"
          >
            <Check v-if="copiedField === `address-${addr.name}`" class="w-4 h-4 text-green-500" />
            <Copy v-else class="w-4 h-4" />
          </button>
        </div>
        <!-- Add address (shown when no addresses or as extra row) -->
        <div v-if="canEdit" class="flex items-center gap-3 px-4 py-3">
          <MapPin class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
          <button
            class="text-sm text-[var(--dock-icon)]/40 hover:text-[var(--dock-icon)] transition-colors"
            @click="openAddressForm()"
          >
            {{ contact.addresses.length ? __('Add another address') : __('Add address') }}
          </button>
        </div>

        <!-- Source -->
        <div v-if="contact.source" class="flex items-center gap-3 px-4 py-3">
          <LinkIcon class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
          <div class="min-w-0">
            <dt class="text-[10px] text-[var(--dock-icon)] uppercase tracking-wide">{{ __('Source') }}</dt>
            <dd class="text-sm text-[var(--dock-text)]">{{ contact.source }}</dd>
          </div>
        </div>

        <!-- Contact Type (Internal / External) -->
        <div class="flex items-center gap-3 px-4 py-2.5 group">
          <Globe class="w-3.5 h-3.5 text-[var(--dock-icon)] flex-shrink-0 opacity-60" />
          <div class="flex-1 min-w-0">
            <dt class="text-[10px] text-[var(--dock-icon)]/60 uppercase tracking-wide">{{ __('Type') }}</dt>
            <dd class="text-xs">
              <!-- Internal: show linked user with option to unlink -->
              <div v-if="isInternal && !showUserLinkInput" class="flex items-center gap-2">
                <span class="px-1.5 py-0.5 rounded text-[10px] font-medium
                             bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {{ __('Internal') }}
                </span>
                <span class="text-[10px] text-[var(--dock-icon)]">{{ contact.user }}</span>
                <button
                  v-if="canEdit"
                  class="text-[10px] text-[var(--dock-icon)] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  :title="__('Unlink user — make external')"
                  @click="unlinkUser"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
              <!-- External: show badge with option to link a user -->
              <div v-else-if="!showUserLinkInput" class="flex items-center gap-2">
                <span class="px-1.5 py-0.5 rounded text-[10px] font-medium
                             bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  {{ __('External') }}
                </span>
                <button
                  v-if="canEdit"
                  class="text-[10px] text-[var(--dock-accent)] hover:underline opacity-0 group-hover:opacity-100 transition-all"
                  @click="showUserLinkInput = true"
                >
                  {{ __('Link user account') }}
                </button>
              </div>
              <!-- User search input -->
              <div v-if="showUserLinkInput" class="relative mt-1">
                <input
                  :value="userLinkQuery"
                  type="text"
                  class="w-full text-sm text-[var(--dock-text)] bg-transparent border-b-2 border-[var(--dock-accent)] outline-none pr-6"
                  :placeholder="__('Search user by name or email…')"
                  @input="onUserLinkInput(($event.target as HTMLInputElement).value)"
                  @keydown.escape="showUserLinkInput = false; userLinkQuery = ''"
                  autofocus
                />
                <button
                  class="absolute right-0 top-0 p-1 text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
                  @click="showUserLinkInput = false; userLinkQuery = ''"
                >
                  <X class="w-3 h-3" />
                </button>
                <div
                  v-if="showUserLinkDropdown && userLinkSuggestions.length"
                  class="absolute left-0 top-full mt-1 z-30 w-full max-h-48 overflow-y-auto
                         bg-[var(--dock-bg)] border border-[var(--dock-border)] rounded-lg shadow-lg py-1"
                >
                  <button
                    v-for="u in userLinkSuggestions"
                    :key="u.user"
                    class="w-full flex flex-col px-3 py-1.5 text-left hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    @click="linkUser(u.user)"
                  >
                    <span class="text-sm text-[var(--dock-text)]">{{ u.full_name }}</span>
                    <span class="text-xs text-[var(--dock-icon)]">{{ u.user }}</span>
                  </button>
                </div>
              </div>
            </dd>
          </div>
        </div>
      </dl>

      <!-- Address Form (inline panel) -->
      <div
        v-if="showAddressForm"
        class="border border-[var(--dock-border)] rounded-lg p-4 mb-6 bg-[var(--dock-bg)]"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-medium text-[var(--dock-text)]">
            {{ editingAddress ? __('Edit address') : __('Add address') }}
          </h3>
          <button
            class="text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
            @click="closeAddressForm"
          >
            {{ __('Cancel') }}
          </button>
        </div>
        <div class="dock-person-form-grid gap-3">
          <!-- Address type -->
          <div>
            <label class="block text-xs text-[var(--dock-icon)] mb-1">{{ __('Type') }}</label>
            <select
              v-model="addressForm.address_type"
              class="w-full text-sm border border-[var(--dock-border)] rounded-md px-2.5 py-1.5
                     bg-transparent text-[var(--dock-text)] outline-none focus:border-[var(--dock-accent)]"
            >
              <option v-for="t in ADDRESS_TYPES" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <!-- Primary toggle -->
          <div class="flex items-end gap-2 pb-1">
            <label class="flex items-center gap-2 text-sm text-[var(--dock-text)] cursor-pointer">
              <input
                type="checkbox"
                :checked="addressForm.is_primary === 1"
                class="rounded border-[var(--dock-border)]"
                @change="addressForm.is_primary = ($event.target as HTMLInputElement).checked ? 1 : 0"
              />
              {{ __('Primary address') }}
            </label>
          </div>
          <!-- Address line 1 -->
          <div class="dock-person-full-width">
            <label class="block text-xs text-[var(--dock-icon)] mb-1">{{ __('Address line 1') }} *</label>
            <input
              v-model="addressForm.address_line1"
              class="w-full text-sm border border-[var(--dock-border)] rounded-md px-2.5 py-1.5
                     bg-transparent text-[var(--dock-text)] outline-none focus:border-[var(--dock-accent)]"
              :placeholder="__('Street, number')"
            />
          </div>
          <!-- Address line 2 -->
          <div class="dock-person-full-width">
            <label class="block text-xs text-[var(--dock-icon)] mb-1">{{ __('Address line 2') }}</label>
            <input
              v-model="addressForm.address_line2"
              class="w-full text-sm border border-[var(--dock-border)] rounded-md px-2.5 py-1.5
                     bg-transparent text-[var(--dock-text)] outline-none focus:border-[var(--dock-accent)]"
              :placeholder="__('Apartment, suite, etc.')"
            />
          </div>
          <!-- City -->
          <div>
            <label class="block text-xs text-[var(--dock-icon)] mb-1">{{ __('City') }} *</label>
            <input
              v-model="addressForm.city"
              class="w-full text-sm border border-[var(--dock-border)] rounded-md px-2.5 py-1.5
                     bg-transparent text-[var(--dock-text)] outline-none focus:border-[var(--dock-accent)]"
            />
          </div>
          <!-- State -->
          <div>
            <label class="block text-xs text-[var(--dock-icon)] mb-1">{{ __('State / Province') }}</label>
            <input
              v-model="addressForm.state"
              class="w-full text-sm border border-[var(--dock-border)] rounded-md px-2.5 py-1.5
                     bg-transparent text-[var(--dock-text)] outline-none focus:border-[var(--dock-accent)]"
            />
          </div>
          <!-- Country (searchable) -->
          <div class="relative">
            <label class="block text-xs text-[var(--dock-icon)] mb-1">{{ __('Country') }} *</label>
            <input
              :value="countryQuery"
              class="w-full text-sm border border-[var(--dock-border)] rounded-md px-2.5 py-1.5
                     bg-transparent text-[var(--dock-text)] outline-none focus:border-[var(--dock-accent)]"
              :placeholder="__('Type to search...')"
              @input="onCountryInput(($event.target as HTMLInputElement).value)"
              @focus="countryQuery.length >= 2 && (showCountryDropdown = countrySuggestions.length > 0)"
              @blur="delayCloseCountryDropdown"
            />
            <div
              v-if="showCountryDropdown"
              class="absolute left-0 right-0 top-full mt-1 bg-[var(--dock-bg)] border border-[var(--dock-border)]
                     rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto py-1"
            >
              <button
                v-for="c in countrySuggestions"
                :key="c.name"
                type="button"
                class="w-full text-left px-3 py-1.5 text-sm text-[var(--dock-text)]
                       hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                @mousedown.prevent="selectCountry(c.name)"
              >
                {{ c.name }}
              </button>
            </div>
          </div>
          <!-- Postal code -->
          <div>
            <label class="block text-xs text-[var(--dock-icon)] mb-1">{{ __('Postal code') }}</label>
            <input
              v-model="addressForm.pincode"
              class="w-full text-sm border border-[var(--dock-border)] rounded-md px-2.5 py-1.5
                     bg-transparent text-[var(--dock-text)] outline-none focus:border-[var(--dock-accent)]"
            />
          </div>
        </div>
        <!-- Form actions -->
        <div class="flex items-center gap-2 mt-4">
          <button
            class="px-3 py-1.5 rounded-md text-sm font-medium bg-[var(--dock-accent)] text-white
                   hover:opacity-90 transition-opacity disabled:opacity-50"
            :disabled="addressSaving || !addressForm.address_line1 || !addressForm.city || !addressForm.country"
            @click="saveAddress"
          >
            {{ addressSaving ? __('Saving...') : (editingAddress ? __('Update') : __('Add')) }}
          </button>
          <button
            v-if="editingAddress"
            class="px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50
                   dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
            @click="deleteAddress(editingAddress!); closeAddressForm()"
          >
            {{ __('Delete') }}
          </button>
        </div>
      </div>

      <!-- ============================== -->
      <!-- ZONE 3 — Tabbed Detail Area    -->
      <!-- ============================== -->
      <div>
        <!-- Tab bar -->
        <div class="flex items-center gap-1 border-b border-[var(--dock-border)] mb-4 overflow-x-auto">
          <button
            v-for="tab in ([
              { id: 'activity', label: __('Activity'), icon: Activity },
              { id: 'details', label: __('Details'), icon: FileText },
              { id: 'notes', label: __('Notes'), icon: MessageSquare },
              ...(panels.length ? [{ id: 'context', label: __('Context'), icon: Globe }] : []),
              { id: 'files', label: __('Files'), icon: Paperclip },
            ] as const)"
            :key="tab.id"
            class="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 -mb-px
                   transition-colors whitespace-nowrap"
            :class="activeTab === tab.id
              ? 'border-[var(--dock-accent)] text-[var(--dock-accent)]'
              : 'border-transparent text-[var(--dock-icon)] hover:text-[var(--dock-text)] hover:border-[var(--dock-border)]'"
            @click="activeTab = tab.id as any"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            {{ tab.label }}
          </button>
        </div>

        <!-- Activity tab — timeline -->
        <div v-if="activeTab === 'activity'" class="space-y-3">
          <!-- Filter row -->
          <div class="flex items-center gap-2 mb-2">
            <button
              v-for="f in ([
                { value: null, label: __('All') },
                { value: 'email', label: __('Email') },
                { value: 'call', label: __('Call') },
                { value: 'comment', label: __('Comment') },
              ] as { value: string | null; label: string }[])"
              :key="f.value ?? 'all'"
              class="px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors"
              :class="timelineFilter === f.value
                ? 'bg-[var(--dock-accent)] text-white'
                : 'text-[var(--dock-icon)] hover:bg-black/5 dark:hover:bg-white/10 border border-[var(--dock-border)]'"
              @click="setTimelineFilter(f.value)"
            >
              {{ f.label }}
            </button>
          </div>

          <!-- Loading -->
          <div v-if="timelineLoading && !timeline.length" class="space-y-2">
            <div v-for="i in 4" :key="i" class="h-14 bg-black/[0.04] dark:bg-white/[0.04] rounded-lg animate-pulse" />
          </div>

          <!-- Timeline entries -->
          <div
            v-for="entry in timeline"
            :key="entry.name"
            class="flex items-start gap-3 px-3 py-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]"
          >
            <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                 :class="entry.type === 'email' ? 'bg-blue-100 dark:bg-blue-900/30' :
                          entry.type === 'phone' ? 'bg-green-100 dark:bg-green-900/30' :
                          'bg-gray-100 dark:bg-gray-800/30'">
              <component
                :is="timelineIconMap[entry.icon] ?? MessageSquare"
                class="w-4 h-4"
                :class="entry.type === 'email' ? 'text-blue-600 dark:text-blue-400' :
                         entry.type === 'phone' ? 'text-green-600 dark:text-green-400' :
                         'text-[var(--dock-icon)]'"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-[var(--dock-text)]">
                <span class="font-medium capitalize">{{ entry.type }}</span>
                <span v-if="entry.subject" class="text-[var(--dock-icon)]"> — {{ entry.subject }}</span>
              </p>
              <p v-if="entry.sender" class="text-xs text-[var(--dock-icon)]">{{ entry.sender }}</p>
              <p class="text-xs text-[var(--dock-icon)] mt-0.5">{{ relativeTime(entry.date) }}</p>
            </div>
          </div>

          <!-- Load more -->
          <div v-if="timeline.length < timelineTotal" class="text-center">
            <button
              class="text-xs text-[var(--dock-accent)] hover:underline disabled:opacity-50"
              :disabled="timelineLoading"
              @click="fetchTimeline(false)"
            >
              {{ timelineLoading ? __('Loading…') : __('Load more') }}
            </button>
          </div>

          <!-- Empty state -->
          <div v-if="!timelineLoading && !timeline.length" class="text-center py-12">
            <Activity class="w-8 h-8 text-[var(--dock-icon)] mx-auto mb-3 opacity-50" />
            <p class="text-sm text-[var(--dock-icon)]">{{ __('No activity yet') }}</p>
            <p class="text-xs text-[var(--dock-icon)] mt-1">{{ __('Send an email or add a note to get started.') }}</p>
          </div>
        </div>

        <!-- Details tab -->
        <div v-if="activeTab === 'details'" class="space-y-6">
          <!-- Editable detail fields -->
          <dl class="dock-person-detail-grid gap-x-6 gap-y-4">
            <div
              v-for="f in ([
                { key: 'full_name', label: __('Full name') },
                { key: 'designation', label: __('Job title') },
                { key: 'company_name', label: __('Company') },
                { key: 'department', label: __('Department') },
                { key: 'source', label: __('Source') },
                { key: 'status', label: __('Status'), readonly: true },
              ] as { key: string; label: string; readonly?: boolean }[])"
              :key="f.key"
            >
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ f.label }}</dt>
              <dd v-if="editingField !== f.key || f.readonly">
                <span
                  v-if="(contact as any)[f.key]"
                  class="text-sm text-[var(--dock-text)]"
                  :class="{ 'cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/[0.05] rounded px-1 -mx-1 inline-block': canEdit && !f.readonly }"
                  @click="!f.readonly && startEdit(f.key)"
                >
                  {{ (contact as any)[f.key] }}
                </span>
                <span
                  v-else-if="canEdit && !f.readonly"
                  class="text-sm text-[var(--dock-icon)]/40 cursor-pointer hover:text-[var(--dock-icon)]"
                  @click="startEdit(f.key)"
                >
                  {{ __('Add') }}
                </span>
                <span v-else class="text-sm text-[var(--dock-icon)]/40">—</span>
              </dd>
              <input
                v-else
                v-model="editValue"
                class="w-full text-sm text-[var(--dock-text)] bg-transparent border-b-2 border-[var(--dock-accent)] outline-none"
                @keydown="onEditKeydown"
                @blur="saveEdit"
                autofocus
              />
            </div>

            <!-- Birthday in details -->
            <div>
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Birthday') }}</dt>
              <dd v-if="editingField !== 'dock_birthday'">
                <span
                  v-if="contact.dock_birthday"
                  class="text-sm text-[var(--dock-text)]"
                  :class="{ 'cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/[0.05] rounded px-1 -mx-1 inline-block': canEdit }"
                  @click="startEdit('dock_birthday')"
                >
                  {{ birthdayDisplay }}
                </span>
                <span
                  v-else-if="canEdit"
                  class="text-sm text-[var(--dock-icon)]/40 cursor-pointer hover:text-[var(--dock-icon)]"
                  @click="startEdit('dock_birthday')"
                >
                  {{ __('Add') }}
                </span>
                <span v-else class="text-sm text-[var(--dock-icon)]/40">—</span>
              </dd>
              <input
                v-else
                v-model="editValue"
                type="date"
                class="text-sm text-[var(--dock-text)] bg-transparent border-b-2 border-[var(--dock-accent)] outline-none"
                @keydown="onEditKeydown"
                @blur="saveEdit"
                autofocus
              />
            </div>

            <!-- Owner (read-only) -->
            <div>
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Owner') }}</dt>
              <dd class="text-sm text-[var(--dock-text)]">
                {{ isOwner ? __('You') : (contact.owner_name || contact.owner) }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Last activity') }}</dt>
              <dd class="text-sm text-[var(--dock-text)]">{{ lastActivityText }}</dd>
            </div>
            <div v-if="contact.modified">
              <dt class="text-xs text-[var(--dock-icon)] mb-0.5">{{ __('Last modified') }}</dt>
              <dd class="text-sm text-[var(--dock-text)]">
                {{ new Date(contact.modified).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) }}
              </dd>
            </div>
          </dl>

          <!-- Social profiles (editable) -->
          <div>
            <h3 class="text-xs text-[var(--dock-icon)] font-medium uppercase tracking-wide mb-3">{{ __('Social profiles') }}</h3>
            <dl class="dock-person-detail-grid gap-x-6 gap-y-3">
              <div
                v-for="s in ([
                  { key: 'dock_linkedin', label: 'LinkedIn', icon: Linkedin },
                  { key: 'dock_twitter', label: 'Twitter / X', icon: Twitter },
                  { key: 'dock_github', label: 'GitHub', icon: Github },
                  { key: 'dock_website', label: __('Website'), icon: Globe },
                ] as const)"
                :key="s.key"
              >
                <dt class="flex items-center gap-1.5 text-xs text-[var(--dock-icon)] mb-0.5">
                  <component :is="s.icon" class="w-3.5 h-3.5" />
                  {{ s.label }}
                </dt>
                <dd v-if="editingField !== s.key">
                  <span
                    v-if="(contact as any)[s.key] && canEdit"
                    class="text-sm text-[var(--dock-accent)] hover:underline truncate block cursor-pointer"
                    @click="startEdit(s.key)"
                  >
                    {{ (contact as any)[s.key] }}
                  </span>
                  <a
                    v-else-if="(contact as any)[s.key]"
                    :href="(contact as any)[s.key]"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-[var(--dock-accent)] hover:underline truncate block"
                  >
                    {{ (contact as any)[s.key] }}
                  </a>
                  <span
                    v-else-if="canEdit"
                    class="text-sm text-[var(--dock-icon)]/40 cursor-pointer hover:text-[var(--dock-icon)]"
                    @click="startEdit(s.key)"
                  >
                    {{ __('Add') }}
                  </span>
                  <span v-else class="text-sm text-[var(--dock-icon)]/40">—</span>
                </dd>
                <input
                  v-else
                  v-model="editValue"
                  :placeholder="`https://...`"
                  class="w-full text-sm text-[var(--dock-text)] bg-transparent border-b-2 border-[var(--dock-accent)] outline-none"
                  @keydown="onEditKeydown"
                  @blur="saveEdit"
                  autofocus
                />
              </div>
            </dl>
          </div>

          <!-- All emails -->
          <div v-if="contact.email_ids.length">
            <h3 class="text-xs text-[var(--dock-icon)] font-medium uppercase tracking-wide mb-2">{{ __('Email addresses') }}</h3>
            <div class="space-y-1">
              <div v-for="e in contact.email_ids" :key="e.email" class="flex items-center gap-2 text-sm">
                <a :href="`mailto:${e.email}`" class="text-[var(--dock-text)] hover:underline">{{ e.email }}</a>
                <span v-if="e.is_primary" class="text-[10px] px-1.5 py-0.5 rounded bg-[var(--dock-accent)]/10 text-[var(--dock-accent)]">{{ __('Primary') }}</span>
              </div>
            </div>
          </div>

          <!-- All phones -->
          <div v-if="contact.phone_nos.length">
            <h3 class="text-xs text-[var(--dock-icon)] font-medium uppercase tracking-wide mb-2">{{ __('Phone numbers') }}</h3>
            <div class="space-y-1">
              <div v-for="p in contact.phone_nos" :key="p.phone" class="flex items-center gap-2 text-sm">
                <a :href="`tel:${p.phone}`" class="text-[var(--dock-text)] hover:underline">{{ p.phone }}</a>
                <span v-if="p.label" class="text-xs text-[var(--dock-icon)]">({{ p.label }})</span>
                <span v-if="p.is_primary" class="text-[10px] px-1.5 py-0.5 rounded bg-[var(--dock-accent)]/10 text-[var(--dock-accent)]">{{ __('Primary') }}</span>
              </div>
            </div>
          </div>

          <!-- Addresses (full display) -->
          <div v-if="contact.addresses.length">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xs text-[var(--dock-icon)] font-medium uppercase tracking-wide">{{ __('Addresses') }}</h3>
              <button
                v-if="canEdit"
                class="text-xs text-[var(--dock-accent)] hover:underline"
                @click="openAddressForm()"
              >
                {{ __('Add') }}
              </button>
            </div>
            <div class="space-y-3">
              <div
                v-for="addr in contact.addresses"
                :key="addr.name"
                class="border border-[var(--dock-border)] rounded-lg px-3 py-2.5 group"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <span class="text-xs font-medium text-[var(--dock-icon)]">
                      {{ addr.address_type }}
                      <span v-if="addr.is_primary_address" class="ml-1 text-[var(--dock-accent)]">{{ __('Primary') }}</span>
                    </span>
                    <p class="text-sm text-[var(--dock-text)] whitespace-pre-line mt-0.5">{{ addr.display }}</p>
                  </div>
                  <button
                    v-if="canEdit"
                    class="p-1 rounded text-[var(--dock-icon)] opacity-0 group-hover:opacity-100
                           hover:text-[var(--dock-text)] transition-all flex-shrink-0"
                    @click="openAddressForm(addr)"
                  >
                    <Edit3 class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="canEdit">
            <h3 class="text-xs text-[var(--dock-icon)] font-medium uppercase tracking-wide mb-2">{{ __('Addresses') }}</h3>
            <button
              class="text-sm text-[var(--dock-icon)]/40 hover:text-[var(--dock-icon)]"
              @click="openAddressForm()"
            >
              {{ __('Add address') }}
            </button>
          </div>
        </div>

        <!-- Notes tab -->
        <div v-if="activeTab === 'notes'" class="space-y-3">
          <!-- New note input -->
          <div v-if="showNoteInput" class="border border-[var(--dock-border)] rounded-lg p-3">
            <textarea
              v-model="newNoteContent"
              class="w-full text-sm text-[var(--dock-text)] bg-transparent outline-none resize-none min-h-[80px]
                     placeholder:text-[var(--dock-icon)]/40"
              :placeholder="__('Write a note...')"
              @keydown.meta.enter="createNote"
              @keydown.ctrl.enter="createNote"
            />
            <div class="flex items-center justify-between mt-2">
              <span class="text-[10px] text-[var(--dock-icon)]">{{ __('Cmd+Enter to save') }}</span>
              <div class="flex items-center gap-2">
                <button
                  class="text-xs text-[var(--dock-icon)] hover:text-[var(--dock-text)]"
                  @click="showNoteInput = false; newNoteContent = ''"
                >
                  {{ __('Cancel') }}
                </button>
                <button
                  class="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium
                         bg-[var(--dock-accent)] text-white hover:opacity-90 transition-opacity
                         disabled:opacity-50"
                  :disabled="!newNoteContent.trim() || noteSaving"
                  @click="createNote"
                >
                  <Send class="w-3 h-3" />
                  {{ noteSaving ? __('Saving...') : __('Save') }}
                </button>
              </div>
            </div>
          </div>
          <button
            v-else
            class="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-dashed
                   border-[var(--dock-border)] text-sm text-[var(--dock-icon)]
                   hover:border-[var(--dock-accent)] hover:text-[var(--dock-accent)] transition-colors"
            @click="showNoteInput = true"
          >
            <Plus class="w-4 h-4" />
            {{ __('Add a note') }}
          </button>

          <!-- Loading -->
          <div v-if="notesLoading && !notes.length" class="space-y-2">
            <div v-for="i in 3" :key="i" class="h-16 bg-black/[0.04] dark:bg-white/[0.04] rounded-lg animate-pulse" />
          </div>

          <!-- Notes list -->
          <div
            v-for="note in notes"
            :key="note.name"
            class="group border border-[var(--dock-border)] rounded-lg px-4 py-3"
            :class="note.pinned ? 'border-[var(--dock-accent)]/30 bg-[var(--dock-accent)]/[0.02]' : ''"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div class="text-sm text-[var(--dock-text)] prose prose-sm max-w-none" v-html="note.content" />
              </div>
              <!-- Actions (visible on hover) -->
              <div class="flex items-center gap-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  class="p-1 rounded text-[var(--dock-icon)] hover:text-[var(--dock-accent)] transition-colors"
                  :title="note.pinned ? __('Unpin') : __('Pin')"
                  @click="toggleNotePin(note.name)"
                >
                  <PinOff v-if="note.pinned" class="w-3.5 h-3.5" />
                  <Pin v-else class="w-3.5 h-3.5" />
                </button>
                <button
                  class="p-1 rounded text-[var(--dock-icon)] hover:text-red-500 transition-colors"
                  :title="__('Delete')"
                  @click="deleteNote(note.name)"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <!-- Meta -->
            <div class="flex items-center gap-2 mt-2 text-[10px] text-[var(--dock-icon)]">
              <span>{{ note.owner_name }}</span>
              <span>&middot;</span>
              <span>{{ relativeTime(note.creation) }}</span>
              <span v-if="note.pinned" class="flex items-center gap-0.5 text-[var(--dock-accent)]">
                <Pin class="w-2.5 h-2.5" />
                {{ __('Pinned') }}
              </span>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="!notesLoading && !notes.length && !showNoteInput" class="text-center py-8">
            <MessageSquare class="w-8 h-8 text-[var(--dock-icon)] mx-auto mb-3 opacity-50" />
            <p class="text-sm text-[var(--dock-icon)]">{{ __('No notes yet') }}</p>
            <p class="text-xs text-[var(--dock-icon)] mt-1">{{ __('Add a note to keep track of details about this contact.') }}</p>
          </div>
        </div>

        <!-- Context tab -->
        <div v-if="activeTab === 'context' && panels.length" class="space-y-3">
          <DockPersonContextPanel
            v-for="panel in panels"
            :key="panel.app"
            :panel="panel"
          />
        </div>

        <!-- Files tab -->
        <div v-if="activeTab === 'files'" class="space-y-3">
          <!-- Upload button -->
          <div v-if="canEdit" class="flex items-center gap-2">
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                     border border-dashed border-[var(--dock-border)] text-[var(--dock-icon)]
                     hover:border-[var(--dock-accent)] hover:text-[var(--dock-accent)] transition-colors"
              :disabled="uploadingFile"
              @click="triggerFileUpload"
            >
              <Upload class="w-3.5 h-3.5" />
              {{ uploadingFile ? __('Uploading…') : __('Upload file') }}
            </button>
            <input
              ref="attachInput"
              type="file"
              class="hidden"
              @change="onFileSelected"
            />
          </div>

          <!-- Loading -->
          <div v-if="filesLoading && !files.length" class="space-y-2">
            <div v-for="i in 3" :key="i" class="h-12 bg-black/[0.04] dark:bg-white/[0.04] rounded-lg animate-pulse" />
          </div>

          <!-- File list -->
          <div
            v-for="f in files"
            :key="f.name"
            class="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-[var(--dock-border)]
                   hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
          >
            <Paperclip class="w-4 h-4 text-[var(--dock-icon)] flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <a
                :href="f.file_url"
                target="_blank"
                rel="noopener"
                class="text-sm text-[var(--dock-text)] hover:text-[var(--dock-accent)] hover:underline truncate block"
              >
                {{ f.file_name }}
              </a>
              <p class="text-[10px] text-[var(--dock-icon)]">
                {{ formatFileSize(f.file_size) }} · {{ relativeTime(f.creation) }}
              </p>
            </div>
            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                :href="f.file_url"
                :download="f.file_name"
                class="p-1 rounded text-[var(--dock-icon)] hover:text-[var(--dock-text)] transition-colors"
                :title="__('Download')"
              >
                <Download class="w-3.5 h-3.5" />
              </a>
              <button
                v-if="canEdit"
                class="p-1 rounded text-[var(--dock-icon)] hover:text-red-500 transition-colors"
                :title="__('Delete')"
                @click="deleteFile(f.name)"
              >
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="!filesLoading && !files.length" class="text-center py-12">
            <Paperclip class="w-8 h-8 text-[var(--dock-icon)] mx-auto mb-3 opacity-50" />
            <p class="text-sm text-[var(--dock-icon)]">{{ __('No files attached') }}</p>
            <p v-if="canEdit" class="text-xs text-[var(--dock-icon)] mt-1">
              {{ __('Upload files like contracts, proposals, or documents.') }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Responsive layout — plain CSS to avoid Tailwind cascade conflicts in consuming apps */
.dock-person-page {
  padding: 1.5rem 1rem; /* py-6 px-4 */
}
.dock-person-form-grid,
.dock-person-detail-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
@media (min-width: 640px) {
  .dock-person-page {
    padding: 2rem 1.5rem; /* sm:py-8 sm:px-6 */
  }
  .dock-person-actions {
    padding-left: 6rem; /* sm:pl-24 */
  }
  .dock-person-form-grid,
  .dock-person-detail-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .dock-person-full-width {
    grid-column: span 2 / span 2;
  }
}
</style>
