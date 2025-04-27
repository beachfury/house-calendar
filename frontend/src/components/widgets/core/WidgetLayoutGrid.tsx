// src/components/widgets/core/WidgetLayoutGrid.tsx
import { JSX } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { widgetRegistry } from './widgetRegistry';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import WidgetWrapper from './WidgetWrapper';

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface WidgetInstance {
  key: string;
  component: () => JSX.Element;
  defaultLayout: Layout & {
    minW?: number;
    maxW?: number;
    minH?: number;
    maxH?: number;
  };
}

interface Props {
  editMode: boolean;
  widgets: WidgetInstance[];
  onLayoutChange: (layout: Layout[]) => void;
}

export default function WidgetLayoutGrid({ editMode, widgets, onLayoutChange }: Props) {
  useContext(UserContext);
  const [layout, setLayout] = useState<Layout[]>([]);

  useEffect(() => {
    setLayout(
      widgets.map((w) => ({
        ...w.defaultLayout,
        x: w.defaultLayout.x ?? 0,
        y: w.defaultLayout.y ?? 0,
        w: w.defaultLayout.w ?? 3,
        h: w.defaultLayout.h ?? 3,
      }))
    );
  }, [widgets]);

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    onLayoutChange(newLayout);
  };

  const removeWidget = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this widget?')) return;
    const newLayout = layout.filter((l) => l.i !== id);
    setLayout(newLayout);
    onLayoutChange(newLayout);
  };

  return (
    <div className="overflow-x-auto">
      <div className={`min-w-[1200px] mx-auto ${editMode ? 'grid-background rounded-md p-4' : ''}`}>
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
          rowHeight={30}
          isDraggable={editMode}
          isResizable={editMode}
          draggableHandle=".widget-drag"
          onLayoutChange={handleLayoutChange}
          compactType={null}
          preventCollision
        >
        {widgets.map((widget) => {
          const gridData = layout.find((l) => l.i === widget.defaultLayout.i);
          if (!gridData) return null;
          const registryEntry = widgetRegistry.find((w) =>
            widget.defaultLayout.i.startsWith(w.id)
          );

          return (
            <div key={widget.key} data-grid={gridData}>
              <WidgetWrapper
                title={registryEntry?.title}
                showHandle={editMode}
                onRemove={() => removeWidget(widget.defaultLayout.i)}
              >
                {/* render the widget’s own card */}
                {widget.component()}
              </WidgetWrapper>
            </div>
          );
        })}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
