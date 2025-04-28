// frontend/src/hooks/useWidgetSettings.ts

import { useState, useEffect, useCallback } from 'react';

export function useWidgetSettings(
  userId: string,
  instanceId: string,
  defaultSettings: Record<string, any>
) {
  const [settings, setSettings] = useState<Record<string, any> | null>(null);

  const saveSettings = useCallback(
    (newSettings: Record<string, any>) => {
      fetch(`/api/widget-settings/${userId}/${instanceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: newSettings }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to save widget settings: ${res.statusText}`);
          }
          return res.json();
        })
        .then(() => setSettings(newSettings))
        .catch((err) => console.error(err));
    },
    [userId, instanceId]
  );

  useEffect(() => {
    fetch(`/api/widget-settings/${userId}/${instanceId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load widget settings: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          // nothing saved yet → bootstrap defaults
          saveSettings(defaultSettings);
        } else {
          setSettings(data);
        }
      })
      .catch((err) => {
        console.error('Error loading widget settings:', err);
        saveSettings(defaultSettings);
      });
  }, [userId, instanceId, defaultSettings, saveSettings]);

  return { settings, saveSettings };
}
