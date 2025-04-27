// /frontend/src/utils/widgetLoader.ts
import type { WidgetManifest } from '../types/widget-manifest';

// 1) Dynamically import all TSX under /src/components/widgets/library
const modules = import.meta.glob('../components/widgets/library/**/*.tsx');

// 2) Fetch and parse the manifest
export async function getManifest(): Promise<WidgetManifest[]> {
  const res = await fetch('/widgets-manifest.json');
  if (!res.ok) throw new Error('Failed to load widget manifest');
  return (await res.json()) as WidgetManifest[];
}

// 3) Given an ID, load its component
export async function loadWidgetComponent(id: string): Promise<React.FC> {
  const manifest = await getManifest();
  const entry = manifest.find(w => w.id === id);
  if (!entry) throw new Error(`Unknown widget id=${id}`);

  // Build the glob key from the manifest.path
  // e.g. entry.path = "/widgets/library/weather/*" ->
  //   glob key "../components/widgets/library/weather/WeatherWidget.tsx"
  const folder = entry.path
    .replace(/^\/widgets\/library\//, '')
    .replace(/\*$/, '');
  
  // Find a matching module key
  const matchKey = Object.keys(modules).find(key =>
    key.includes(folder)
  );
  if (!matchKey) throw new Error(`No module found for widget '${id}'`);

  const loader = modules[matchKey] as () => Promise<{ default: React.FC }>;
  const mod = await loader();
  return mod.default;
}
