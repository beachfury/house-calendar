// backend/src/dashboard-layouts/default-widgets.ts
import { LayoutItemDto } from '@/dashboard-layouts/dto/layout-item';
import { LayoutItem } from '../routes/dashboardLayouts';

export interface DefaultWidget extends LayoutItem {
  i: any;
  /** 
   * any JSON-serializable defaults your widget needs 
   * (e.g. { showTemperature: true, units: 'F' } )
   */
  defaultSettings?: Record<string, any>;
}

export const DEFAULT_WIDGETS: DefaultWidget[] = [
  {
    i: 'weather',   // note: you’ll append “-<userId>” server-side
    x: 0, y: 0, w: 4, h: 3,
    defaultSettings: { units: 'F', location: 'San Diego' }
  },
  {
    i: 'clock',
    x: 4, y: 0, w: 3, h: 2,
    defaultSettings: { timezone: 'America/Los_Angeles' }
  },
  // …and so on for each “built-in” widget
];
