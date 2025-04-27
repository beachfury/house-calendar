// src/context/SettingsContext.tsx
/**
 * SettingsContext
 *
 * - Fetches /api/settings/:userId on mount
 * - Exposes settings, loading state, error, and updateSettings()
 * - Call updateSettings({ darkMode: true }) to persist immediately
 *
 * Wrap your <App> in <SettingsProvider userId={currentUser.id}>.
 */
import React, { createContext, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useQuery, useMutation, QueryObserverResult } from 'react-query';

// shape returned by backend
export interface UserSettings {
  darkMode: boolean;
  themeColor: string;
  fontFamily: string;
  fontSize: string;
  backgroundImageUrl: string;
  themeName: string;
}

export interface SettingsContextValue {
  settings?: UserSettings;
  isLoading: boolean;
  error: Error | null;
  updateSettings: (patch: Partial<UserSettings>) => Promise<UserSettings>;
    
}

export interface Settings {
  darkMode: boolean
  themeColor: string
  fontFamily: string
  fontSize: string
  backgroundImageUrl: string
  // + calendarView: string
  // + …
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
  // 1) fetch current settings
  const { data, isLoading, error, refetch } = useQuery<UserSettings, Error>(
    ['settings', userId],
    () => axios.get(`/api/settings/${userId}`).then(res => res.data)
  );

  // 2) mutation to PATCH settings
  const mutation = useMutation<UserSettings, Error, Partial<UserSettings>>(
    patch => axios.put(`/api/settings/${userId}`, patch).then(res => res.data),
    {
      onSuccess: () => void refetch(), // re-fetch after update
    }
  );

  return (
    <SettingsContext.Provider
      value={{
        settings: data,
        isLoading,
        error,
        updateSettings: mutation.mutateAsync,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

/** hook for consuming settings in any component */
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return ctx;
}
