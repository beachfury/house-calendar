// frontend/src/components/widgets/core/WidgetWrapper.tsx

import React from 'react';
import { GripVertical, Trash2 } from 'lucide-react';
import { widgetRegistry }      from './widgetRegistry';
import { useWidgetSettings } from '../../../hooks/useWidgetSettings';

interface WidgetWrapperProps {
  userId: string;
  instanceId: string;
  widgetType: string;
  showHandle?: boolean;
  onRemove?: () => void;
  children: React.ReactElement<any>;
}

export default function WidgetWrapper({
  userId,
  instanceId,
  widgetType,
  showHandle = true,
  onRemove,
  children,
}: WidgetWrapperProps) {
  const manifest = widgetRegistry.find((w) => w.id === widgetType);
  if (!manifest) {
    return <div>Unknown widget type: {widgetType}</div>;
  }

  const { settings, saveSettings } = useWidgetSettings(
    userId,
    instanceId,
    manifest.defaultSettings
  );

  if (settings === null) {
    return <div>Loading widget…</div>;
  }

  return (
    <div className="relative bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      {showHandle && (
        <div className="absolute top-1 right-1 flex space-x-2 cursor-move">
          <GripVertical />
          {onRemove && (
            <Trash2
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="text-red-400 hover:text-red-600"
            />
          )}
        </div>
      )}
      <div className="p-4">
        {/* inject settings into the actual widget */}
        {React.cloneElement(children, { settings, saveSettings })}
      </div>
    </div>
  );
}
