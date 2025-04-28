/**
 * SettingsContext
 *
 * - Fetches /api/settings/:userId on mount
 * - Exposes settings, loading state, error, and updateSettings()
 * - Synchronizes:
 *    • `dark` class on <html> for light/dark mode
 *    • CSS variables (--theme-color, --font-family, --font-size, --background-image, data-theme) on <html>
 *
 * Wrap your entire <App> in <SettingsProvider userId={...}> so these side-effects run once.
 */

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

// shape returned by backend
export interface UserSettings {
  darkMode: boolean;           // true = dark, false = light
  themeColor: string;          // primary accent (hex)
  fontFamily: string;          // e.g. "sans", "serif", "mono"
  fontSize: string;            // e.g. "sm", "base", "lg"
  backgroundImageUrl: string;  // fullscreen background image URL
  themeName: string;           // named skin, e.g. "default", "space", "anime"
}

export interface SettingsContextValue {
  settings?: UserSettings;
  isLoading: boolean;
  error: Error | null;
  updateSettings: (patch: Partial<UserSettings>) => Promise<UserSettings>;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: undefined,
  isLoading: false,
  error: null,
  updateSettings: () => Promise.reject(new Error('SettingsProvider not mounted')),
});

interface Props {
  userId: string;
  children: ReactNode;
}

export function SettingsProvider({ userId, children }: Props) {
  // 1) Fetch current settings
  const {
    data: settings,
    isLoading,
    error,
    refetch,
  } = useQuery<UserSettings, Error>(
    ['settings', userId],
    () => axios.get(`/api/settings/${userId}`).then(res => res.data)
  );

  // 2) Mutation to PUT updates
  const mutation = useMutation<UserSettings, Error, Partial<UserSettings>>(
    patch => axios.put(`/api/settings/${userId}`, patch).then(res => res.data),
    { onSuccess: () => void refetch() }
  );

  // ───────────────────────────────────────────────────────────────
  // 3) Sync `.dark` class on <html> as soon as settings.darkMode is known
  // ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (settings !== undefined) {
      document.documentElement.classList.toggle('dark', settings.darkMode);
    }
  }, [settings?.darkMode]);

  // ───────────────────────────────────────────────────────────────
  // 4) Write CSS vars & data-attrs for theme
  // ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!settings) return;

    document.documentElement.style.setProperty(
      '--theme-color',
      settings.themeColor
    );
    document.documentElement.style.setProperty(
      '--font-family',
      settings.fontFamily
    );
    document.documentElement.style.setProperty(
      '--font-size',
      settings.fontSize
    );
    // background-image
    document.documentElement.style.setProperty(
      '--background-image',
      settings.backgroundImageUrl
        ? `url(${settings.backgroundImageUrl})`
        : 'none'
    );
    // named skin for more complex theming
    document.documentElement.setAttribute('data-theme', settings.themeName);
  }, [
    settings?.themeColor,
    settings?.fontFamily,
    settings?.fontSize,
    settings?.backgroundImageUrl,
    settings?.themeName,
  ]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        error,
        updateSettings: mutation.mutateAsync,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return ctx;
}
