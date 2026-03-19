<!--
  SPDX-License-Identifier: AGPL-3.0-or-later
  Copyright (C) 2024-2026 Tonic
-->
<script lang="ts">
export default { name: 'DockAccountPage' }
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { User, Shield, Monitor, Camera, Trash2, Eye, EyeOff } from 'lucide-vue-next'
import { __ } from '@/composables/useTranslate'
import { callApi } from '@/composables/useApi'

// ── State ──────────────────────────────────────────────

interface AccountData {
  user: string
  first_name: string
  last_name: string
  full_name: string
  user_image: string
  twofactor_enabled: boolean
  twofactor_site_enabled: boolean
}

interface SessionData {
  sid: string
  device: string
  ip_address: string
  last_updated: string
  is_current: boolean
}

const account = ref<AccountData | null>(null)
const sessions = ref<SessionData[]>([])
const loading = ref(true)

// Profile edit
const firstName = ref('')
const lastName = ref('')
const profileSaving = ref(false)
const profileSaved = ref(false)

// Password change
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordError = ref('')
const passwordSaving = ref(false)
const passwordSaved = ref(false)
const showOldPassword = ref(false)
const showNewPassword = ref(false)

// Image upload
const fileInput = ref<HTMLInputElement | null>(null)
const uploadingImage = ref(false)

// Sessions
const revokingSid = ref('')

// ── Load ───────────────────────────────────────────────

async function loadAccount() {
  try {
    const data = await callApi<AccountData>('dock.api.account.get_account')
    account.value = data
    firstName.value = data.first_name
    lastName.value = data.last_name
  } catch (e) {
    console.error('Failed to load account', e)
  }
}

async function loadSessions() {
  try {
    sessions.value = await callApi<SessionData[]>('dock.api.account.get_sessions')
  } catch (e) {
    console.error('Failed to load sessions', e)
  }
}

onMounted(async () => {
  await Promise.all([loadAccount(), loadSessions()])
  loading.value = false
})

// ── Profile ────────────────────────────────────────────

async function saveProfile() {
  profileSaving.value = true
  profileSaved.value = false
  try {
    const result = await callApi<{ first_name: string; last_name: string; full_name: string }>(
      'dock.api.account.update_profile',
      { first_name: firstName.value, last_name: lastName.value },
    )
    if (account.value) {
      account.value.first_name = result.first_name
      account.value.last_name = result.last_name
      account.value.full_name = result.full_name
    }
    profileSaved.value = true
    setTimeout(() => (profileSaved.value = false), 2500)
  } finally {
    profileSaving.value = false
  }
}

// ── Image ──────────────────────────────────────────────

function triggerUpload() {
  fileInput.value?.click()
}

async function onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  uploadingImage.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('doctype', 'User')
    formData.append('docname', account.value?.user ?? '')
    formData.append('fieldname', 'user_image')
    formData.append('is_private', '0')

    const csrf =
      window.frappe?.csrf_token ??
      (window as any).csrf_token ??
      (window as any).dockBoot?.session?.csrf_token ??
      ''

    const res = await fetch('/api/method/upload_file', {
      method: 'POST',
      headers: { 'X-Frappe-CSRF-Token': csrf },
      body: formData,
    })

    const json = await res.json()
    if (res.ok && json.message?.file_url) {
      if (account.value) {
        account.value.user_image = json.message.file_url
      }
    }
  } finally {
    uploadingImage.value = false
    input.value = ''
  }
}

async function removeImage() {
  if (!account.value?.user_image) return
  await callApi('dock.api.account.remove_user_image')
  if (account.value) {
    account.value.user_image = ''
  }
}

// ── Password ───────────────────────────────────────────

async function changePassword() {
  passwordError.value = ''
  passwordSaved.value = false

  if (!oldPassword.value || !newPassword.value) {
    passwordError.value = __('Please fill in all password fields')
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = __('Passwords don\'t match')
    return
  }

  passwordSaving.value = true
  try {
    await callApi('dock.api.account.change_password', {
      old_password: oldPassword.value,
      new_password: newPassword.value,
    })
    oldPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    passwordSaved.value = true
    setTimeout(() => (passwordSaved.value = false), 3000)
  } catch (e: unknown) {
    passwordError.value = (e as Error).message || __('Failed to change password')
  } finally {
    passwordSaving.value = false
  }
}

// ── Sessions ───────────────────────────────────────────

async function revokeSession(sid: string) {
  revokingSid.value = sid
  try {
    await callApi('dock.api.account.revoke_session', { sid })
    sessions.value = sessions.value.filter(s => s.sid !== sid)
  } finally {
    revokingSid.value = ''
  }
}

function formatSessionTime(ts: string): string {
  if (!ts) return ''
  try {
    const date = new Date(ts)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 1) return __('Active now')
    if (diffMin < 60) return `${diffMin}m ${__('ago')}`
    const diffHr = Math.floor(diffMin / 60)
    if (diffHr < 24) return `${diffHr}h ${__('ago')}`
    const diffDay = Math.floor(diffHr / 24)
    return `${diffDay}d ${__('ago')}`
  } catch {
    return ts
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-6 py-8 space-y-10">
    <h1 class="text-xl font-semibold text-gray-900 dark:text-white">{{ __('My Account') }}</h1>

    <!-- Loading -->
    <div v-if="loading" class="text-sm text-gray-400">{{ __('Loading...') }}</div>

    <template v-else-if="account">
      <!-- ── Profile Header ─────────────────────────── -->
      <section class="space-y-5">
        <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <User class="w-4 h-4" />
          <h2 class="text-sm font-semibold uppercase tracking-wide">{{ __('Profile') }}</h2>
        </div>

        <!-- Avatar + identity -->
        <div class="flex items-center gap-5">
          <div class="relative group">
            <div
              class="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden"
            >
              <img
                v-if="account.user_image"
                :src="account.user_image"
                :alt="account.full_name"
                class="w-16 h-16 object-cover"
              />
              <User v-else class="w-8 h-8 text-gray-400" />
            </div>
            <button
              class="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              :title="__('Upload photo')"
              @click="triggerUpload"
            >
              <Camera class="w-5 h-5 text-white" />
            </button>
          </div>

          <div class="flex-1 min-w-0">
            <p class="text-lg font-medium text-gray-900 dark:text-white truncate">
              {{ account.full_name || account.user }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ account.user }}</p>
            <div class="flex gap-3 mt-1.5">
              <button
                class="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors underline underline-offset-2"
                :disabled="uploadingImage"
                @click="triggerUpload"
              >
                {{ uploadingImage ? __('Uploading...') : __('Upload photo') }}
              </button>
              <button
                v-if="account.user_image"
                class="text-xs text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors underline underline-offset-2"
                @click="removeImage"
              >
                {{ __('Remove') }}
              </button>
            </div>
          </div>
        </div>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileSelected"
        />

        <!-- Name fields -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ __('First Name') }}
            </label>
            <input
              v-model="firstName"
              type="text"
              class="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ __('Last Name') }}
            </label>
            <input
              v-model="lastName"
              type="text"
              class="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="px-4 py-1.5 text-sm font-medium rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
            :disabled="profileSaving"
            @click="saveProfile"
          >
            {{ profileSaving ? __('Saving...') : __('Save') }}
          </button>
          <span v-if="profileSaved" class="text-xs text-green-600 dark:text-green-400">
            {{ __('Saved') }}
          </span>
        </div>
      </section>

      <hr class="border-gray-100 dark:border-gray-700" />

      <!-- ── Security ───────────────────────────────── -->
      <section class="space-y-5">
        <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Shield class="w-4 h-4" />
          <h2 class="text-sm font-semibold uppercase tracking-wide">{{ __('Security') }}</h2>
        </div>

        <!-- Change password -->
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">{{ __('Change Password') }}</h3>

          <div class="max-w-xs space-y-2">
            <div class="relative">
              <input
                v-model="oldPassword"
                :type="showOldPassword ? 'text' : 'password'"
                :placeholder="__('Current password')"
                class="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 pr-9 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
              />
              <button
                type="button"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                @click="showOldPassword = !showOldPassword"
              >
                <EyeOff v-if="showOldPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>

            <div class="relative">
              <input
                v-model="newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                :placeholder="__('New password')"
                class="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 pr-9 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
              />
              <button
                type="button"
                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                @click="showNewPassword = !showNewPassword"
              >
                <EyeOff v-if="showNewPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>

            <input
              v-model="confirmPassword"
              type="password"
              :placeholder="__('Confirm new password')"
              class="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
          </div>

          <p v-if="passwordError" class="text-xs text-red-600 dark:text-red-400">{{ passwordError }}</p>

          <div class="flex items-center gap-3">
            <button
              class="px-4 py-1.5 text-sm font-medium rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
              :disabled="passwordSaving || !oldPassword || !newPassword"
              @click="changePassword"
            >
              {{ passwordSaving ? __('Updating...') : __('Update password') }}
            </button>
            <span v-if="passwordSaved" class="text-xs text-green-600 dark:text-green-400">
              {{ __('Password updated') }}
            </span>
          </div>
        </div>

        <hr class="border-gray-50 dark:border-gray-800" />

        <!-- 2FA -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">
            {{ __('Two-Factor Authentication') }}
          </h3>

          <template v-if="account.twofactor_site_enabled">
            <div class="flex items-center gap-2">
              <span
                class="inline-block px-2 py-0.5 text-xs font-medium rounded-full"
                :class="account.twofactor_enabled
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'"
              >
                {{ account.twofactor_enabled ? __('Enabled') : __('Not configured') }}
              </span>
            </div>
            <p class="text-xs text-gray-400">
              {{ __('To manage two-factor authentication, use the security settings in your Frappe user profile.') }}
            </p>
          </template>

          <p v-else class="text-xs text-gray-400">
            {{ __('Two-factor authentication is not enabled on this site. Contact your administrator.') }}
          </p>
        </div>
      </section>

      <hr class="border-gray-100 dark:border-gray-700" />

      <!-- ── Sessions ───────────────────────────────── -->
      <section class="space-y-5">
        <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Monitor class="w-4 h-4" />
          <h2 class="text-sm font-semibold uppercase tracking-wide">{{ __('Sessions') }}</h2>
        </div>

        <div v-if="sessions.length === 0" class="text-sm text-gray-400">
          {{ __('No active sessions found') }}
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="s in sessions"
            :key="s.sid"
            class="flex items-center justify-between rounded-lg border border-gray-100 dark:border-gray-700 px-4 py-3"
          >
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-900 dark:text-white truncate">
                  {{ s.device || __('Unknown device') }}
                </span>
                <span
                  v-if="s.is_current"
                  class="inline-block px-1.5 py-0.5 text-[10px] font-medium rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                >
                  {{ __('Current') }}
                </span>
              </div>
              <p class="text-xs text-gray-400 mt-0.5">
                {{ s.ip_address }}
                <span v-if="s.last_updated"> · {{ formatSessionTime(s.last_updated) }}</span>
              </p>
            </div>
            <button
              v-if="!s.is_current"
              class="text-xs text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors underline underline-offset-2 ml-4 shrink-0"
              :disabled="revokingSid === s.sid"
              @click="revokeSession(s.sid)"
            >
              {{ revokingSid === s.sid ? __('Revoking...') : __('Revoke') }}
            </button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
