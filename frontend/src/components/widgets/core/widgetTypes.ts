// frontend/src/components/widgets/core/widgetTypes.ts
import { ReactNode } from 'react';

export interface WidgetDefinition {
  id: string;
  title: string;
  description: string;
  icon?: string;
  category?: string;
  component: () => ReactNode;
  defaultLayout: {
    w: number;
    h: number;
    minW?: number;
    maxW?: number;
    minH?: number;
    maxH?: number;
  };
}
