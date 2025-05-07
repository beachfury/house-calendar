/**
 * SettingsContext
 *
 * - Fetches GET /api/settings/:userId on mount
 * - Exposes settings, loading state, error, and updateSettings()
 * - Only handles themeId and themeVariant (no more CSS-variable logic)
 * - Toggles <html>.dark based on themeVariant === 'dark'
 * - Injects a <link> to /themes/{themeId}/{themeVariant}.css
 */

import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

// New shape: only themeId + variant
export interface UserSettings {
  themeId: string;             // folder under /public/themes/
  themeVariant: 'light' | 'dark';
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
  updateSettings: () =>
    Promise.reject(new Error('SettingsProvider not mounted')),
});

interface Props {
  userId: string;
  children: ReactNode;
}

export function SettingsProvider({ userId, children }: Props) {
  // 1) Load settings
  const {
    data: settings,
    isLoading,
    error,
    refetch,
  } = useQuery<UserSettings, Error>(
    ['settings', userId],
    () => axios.get(`/api/settings/${userId}`).then((res) => res.data)
  );

  // 2) Patch settings
  const mutation = useMutation<UserSettings, Error, Partial<UserSettings>>(
    (patch) =>
      axios.put(`/api/settings/${userId}`, patch).then((res) => res.data),
    { onSuccess: () => void refetch() }
  );

  // 3) Toggle .dark class based on themeVariant
  useEffect(() => {
    if (settings) {
      document.documentElement.classList.toggle(
        'dark',
        settings.themeVariant === 'dark'
      );
    }
  }, [settings?.themeVariant]);

  // 4) Inject or update the <link> to the theme’s CSS file
  useEffect(() => {
    if (!settings) return;
    const { themeId, themeVariant } = settings;
    const href = `/themes/${themeId}/${themeVariant}.css`;
    const LINK_ID = 'user-theme-css';

    let linkEl = document.getElementById(LINK_ID) as HTMLLinkElement | null;
    if (linkEl) {
      linkEl.href = href;               // swap href on variant change
    } else {
      linkEl = document.createElement('link');
      linkEl.id = LINK_ID;
      linkEl.rel = 'stylesheet';
      linkEl.href = href;
      document.head.appendChild(linkEl);
    }
  }, [settings?.themeId, settings?.themeVariant]);

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
