// src/hooks/useWidgetRegistry.ts
import { useContext } from 'react';
import { WidgetRegistryContext, Registry } from '../context/WidgetRegistryContext';

export function useWidgetRegistry(): Registry {
  const ctx = useContext(WidgetRegistryContext);
  if (!ctx) throw new Error('WidgetRegistryContext not mounted');
  return ctx;
}
