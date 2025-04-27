// src/components/widgets/core/WidgetWrapper.tsx
import React from 'react';
import { GripVertical, Trash2 } from 'lucide-react';

interface WidgetWrapperProps {
  title?: string;
  children: React.ReactNode;
  showHandle?: boolean;
  onRemove?: () => void;
}

export default function WidgetWrapper({
  title,
  children,
  showHandle = true,
  onRemove,
}: WidgetWrapperProps) {
  return (
    <div className="h-full relative">
      {showHandle && (
        <div
          className="absolute top-0 left-0 right-0 h-8 px-2 flex items-center justify-between z-20"
          aria-label={title}
        >
          {/* only this icon is draggable */}
          <GripVertical
            size={16}
            className="widget-drag text-gray-400 cursor-move"
          />

          {onRemove && (
            <button
              onClick={onRemove}
              onPointerDown={(e: React.PointerEvent<HTMLButtonElement>) => {
                e.stopPropagation();
              }}
              className="text-red-400 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}

      {/* reserve space for that 8px-high bar, then render the widget’s card */}
      <div className="widget-inner h-full pt-8 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
