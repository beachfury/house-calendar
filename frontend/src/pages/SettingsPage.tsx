// src/pages/SettingsPage.tsx

import React, { ChangeEvent, useEffect, useContext } from 'react'
import { useSettings } from '../context/SettingsContext'
import { UserContext } from '../context/UserContext'
import {
  User as UserIcon,
  Image as ImageIcon,
  Sun,
  Moon,
  Calendar,
  Bell,
  MapPin,
  Link2,
  Key,
  ShieldOff,
  Home,
  Droplet,
  Repeat,
  Users,
  Mail,
  Database,
  ToggleLeft,
  Clock,
} from 'lucide-react'

/**
 * SettingsPage
 *
 * - Fetches and displays user settings via SettingsContext
 * - Allows updating darkMode, themeName, themeColor, fontFamily,
 *   fontSize, backgroundImageUrl
 * - Syncs <html> class when darkMode changes
 * - Renders Member Settings for all users, Admin Settings only for admins
 */

export default function SettingsPage() {
  // ───────────────────────────────────────────────────────────────
  // 1) Grab settings + mutation from context
  // ───────────────────────────────────────────────────────────────
  const { settings, isLoading, error, updateSettings } = useSettings()
  const { currentUser } = useContext(UserContext)

  // ───────────────────────────────────────────────────────────────
  // 3) Early returns for loading / error
  // ───────────────────────────────────────────────────────────────
  if (isLoading) return <p>Loading settings…</p>
  if (error)     return <p className="text-red-500">Error: {error.message}</p>
  if (!settings) return null

  // ───────────────────────────────────────────────────────────────
  // 4) Generic field updater
  //    call updateSettings({ [key]: value })
  // ───────────────────────────────────────────────────────────────
  const handleChange = <K extends keyof typeof settings>(
    key: K,
    value: typeof settings[K]
  ) => {
    updateSettings({ [key]: value } as Partial<typeof settings>)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Settings
      </h1>

      {/* ───────────────────────────────────────────────────────────────
            MEMBER SETTINGS
          ─────────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Member Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile (stub—needs backend support) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            {/* TODO: wire displayName once backend has `displayName` */}
          </div>

          {/* Appearance */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <Sun className="w-6 h-6 mr-2 text-yellow-500" />
              <Moon className="w-6 h-6 mr-2 text-gray-500" />
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                Appearance
              </h3>
            </div>
            <div className="space-y-4">
              {/* Dark mode toggle */}
              <label className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Dark mode</span>
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('darkMode', e.target.checked)
                  }
                  className="ml-auto form-checkbox"
                />
              </label>

              {/* App skin selector */}
              <label className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">App skin</span>
                <select
                  className="ml-auto rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  value={settings.themeName}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleChange('themeName', e.target.value)
                  }
                >
                  <option value="default">Default</option>
                  <option value="space">Space</option>
                  <option value="anime">Anime</option>
                  {/* TODO: more skins */}
                </select>
              </label>

              {/* Accent color */}
              <label className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Accent Color</span>
                <input
                  type="color"
                  className="ml-auto h-8 w-12 p-0 border-0"
                  value={settings.themeColor}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('themeColor', e.target.value)
                  }
                />
              </label>

              {/* Font family */}
              <label className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Font</span>
                <select
                  className="ml-auto rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  value={settings.fontFamily}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleChange('fontFamily', e.target.value)
                  }
                >
                  <option value="sans">Sans</option>
                  <option value="serif">Serif</option>
                  <option value="mono">Monospace</option>
                </select>
              </label>

              {/* Font size */}
              <label className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Font Size</span>
                <select
                  className="ml-auto rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  value={settings.fontSize}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleChange('fontSize', e.target.value)
                  }
                >
                  <option value="sm">Small</option>
                  <option value="base">Base</option>
                  <option value="lg">Large</option>
                </select>
              </label>

              {/* Background image URL */}
              <label className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Background Image</span>
                <input
                  type="text"
                  readOnly
                  className="ml-auto rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  value={settings.backgroundImageUrl}
                  placeholder="upload below"
                />
              </label>
              <input
                type="file"
                accept="image/*"
                className="mt-2"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    // TODO: upload to backend → return URL
                    const url = URL.createObjectURL(file)
                    handleChange('backgroundImageUrl', url)
                  }
                }}
              />
            </div>
          </div>

          {/* Calendar View (TODO) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 mr-2 text-indigo-500" />
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                Calendar View
              </h3>
            </div>
            <div className="space-y-4">{/* TODO */}</div>
          </div>

          {/* Notifications (TODO) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <Bell className="w-6 h-6 mr-2 text-pink-500" />
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                Notifications
              </h3>
            </div>
            <div className="space-y-4">{/* TODO */}</div>
          </div>

          {/* Time Zone & Locale (TODO) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 mr-2 text-teal-500" />
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                Time Zone & Locale
              </h3>
            </div>
            <div className="space-y-4">{/* TODO */}</div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────
            ADMIN SETTINGS
          ─────────────────────────────────────────────────────────────── */}
      {currentUser?.role === 'admin' && (
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Admin-Only Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* House-Wide Defaults (TODO) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"></div>
          {/* Task Type Colors (TODO) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"></div>
          {/* Recurrence Defaults (TODO) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"></div>
          {/* Roles & Permissions (TODO) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"></div>
          {/* SMTP Settings (TODO) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"></div>
          {/* Backup & Retention (TODO) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"></div>
          {/* Feature Toggles (TODO) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"></div>
          {/* Audit & Logs (TODO) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"></div>
        </div>
      </section>
      )}
    </div>
  )
}
