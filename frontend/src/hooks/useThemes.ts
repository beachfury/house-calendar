/**
 * useThemes
 *
 * Fetches the generated /themes-manifest.json which lists
 * all installed themes and their variants.
 */

import { useState, useEffect } from 'react';

export interface ThemeManifest {
  id: string;                   // e.g. "default", "minecraft"
  name: string;                 // display name
  variants: ('light' | 'dark')[]; 
  category?: string;            // e.g. "Games", "Anime"
  previewImage?: string;        // optional URL for UI thumbnails
}

export function useThemes() {
  const [themes, setThemes] = useState<ThemeManifest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('/themes-manifest.json')
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data: ThemeManifest[]) => setThemes(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return { themes, isLoading, error };
}
