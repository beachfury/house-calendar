// src/context/WidgetRegistryProvider.tsx
import React, { useEffect, useState } from 'react';
import { WidgetRegistryContext, Registry } from './WidgetRegistryContext';
import { getManifest, loadWidgetComponent } from '../utils/widgetLoader';

export const WidgetRegistryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [list, setList] = useState<Registry['list']>([]);

  useEffect(() => {
    getManifest().then(setList).catch(console.error);
  }, []);

  const load = (id: string) => loadWidgetComponent(id);

  return (
    <WidgetRegistryContext.Provider value={{ list, load }}>
      {children}
    </WidgetRegistryContext.Provider>
  );
};
