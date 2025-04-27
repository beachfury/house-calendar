// src/components/widgets/widgetRegistry.ts
import { ReactNode } from "react";
import QuickAddWidget from "../library/quickadd/QuickAddWidget";
import TasksWidget from "../library/tasks/TasksWidget";
import WeatherWidget from "../library/weather/WeatherWidget";

export interface WidgetDefinition {
  id: string;
  title: string;
  description?: string;
  icon?: string; // 🌟 URL or local import
  category?: string; // e.g. "utilities", "time", "weather"
  component: () => React.ReactNode; // ✅ instead of JSX.Element
  defaultLayout: {
    w: number;
    h: number;
    minW?: number;
    maxW?: number;
    minH?: number;
    maxH?: number;
  };
}

export const widgetRegistry: WidgetDefinition[] = [
  {
    id: 'weather',
    title: 'Weather',
    component: WeatherWidget,
    defaultLayout: { w: 4, h: 3, minW: 3, maxW: 6, minH: 2 },
    description: ""
  },
  {
    id: 'clock',
    title: 'Clock',
    component: ClockWidget,
    defaultLayout: { w: 3, h: 2, minW: 2 },
    description: ""
  },
  {
    id: 'tasks',
    title: 'Tasks',
    component: TasksWidget,
    defaultLayout: { w: 4, h: 4, minH: 3 },
    description: ""
  },
  {
    id: 'quickadd',
    title: 'Quick Add',
    component: QuickAddWidget,
    defaultLayout: { w: 3, h: 2 },
    description: ""
  },
];
function ClockWidget(): ReactNode {
  throw new Error("Function not implemented.");
}

