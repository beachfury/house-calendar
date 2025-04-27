// src/context/WidgetRegistryContext.ts
import { createContext } from 'react';
import type { WidgetManifest } from '../types/widget-manifest';

export interface Registry {
  list: WidgetManifest[];
  load: (id: string) => Promise<React.FC>;
}

export const WidgetRegistryContext = createContext<Registry | null>(null);
