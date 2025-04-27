// frontend/src/types/widget-manifest.ts
export interface WidgetManifest {
    id: string;
    title: string;
    icon: string;
    description: string;
    category: string;
    path: string; // glob-style, e.g. "/widgets/library/weather/*"
    defaultLayout: {
      w: number;
      h: number;
      minW?: number;
      minH?: number;
      maxW?: number;
      maxH?: number;
    };
  }
  