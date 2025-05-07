/**
 * SettingsPage
 *
 * - Uses useSettings() to load/persist themeId & themeVariant
 * - Uses useThemes() to list all installed themes
 * - Renders two dropdowns: Theme + Variant
 */

import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { useThemes } from '../hooks/useThemes';

export default function SettingsPage() {
  const { settings, isLoading, error, updateSettings } = useSettings();
  const {
    themes,
    isLoading: themesLoading,
    error: themesError,
  } = useThemes();

  // Loading & error states
  if (isLoading || themesLoading) return <p>Loading settings…</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (themesError)
    return (
      <p className="text-red-500">
        Error loading themes: {themesError.message}
      </p>
    );
  if (!settings) return null;

  // Find current theme manifest
  const currentTheme =
    themes.find((t) => t.id === settings.themeId) || themes[0];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Appearance</h1>

      <div className="space-y-4">
        {/* Theme selector */}
        <label className="block">
          <span className="text-sm">Theme</span>
          <select
            className="mt-1 block w-full rounded border-gray-300"
            value={settings.themeId}
            onChange={(e) =>
              updateSettings({ themeId: e.target.value })
            }
          >
            {themes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        {/* Variant selector */}
        <label className="block">
          <span className="text-sm">Variant</span>
          <select
            className="mt-1 block w-full rounded border-gray-300"
            value={settings.themeVariant}
            onChange={(e) =>
              updateSettings({
                themeVariant: e.target.value as 'light' | 'dark',
              })
            }
          >
            {currentTheme.variants.map((v) => (
              <option key={v} value={v}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
