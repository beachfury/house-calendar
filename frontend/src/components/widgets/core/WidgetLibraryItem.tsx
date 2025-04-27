import React from 'react';
import type { WidgetManifest } from '../../../types/widget-manifest';

interface WidgetLibraryItemProps {
  widget: Pick<WidgetManifest, 'id' | 'title' | 'description' | 'icon'>;
  onSelect: () => void;
}

export default function WidgetLibraryItem({
  widget,
  onSelect,
}: WidgetLibraryItemProps) {
  return (
    <button
      onClick={onSelect}
      className="
        flex flex-col items-start p-4 border rounded-lg
        hover:shadow-md bg-white dark:bg-gray-800 transition
      "
    >
      {/* Icon */}
      <img src={widget.icon} alt={widget.title} className="w-6 h-6 mb-2" />

      {/* Title & Description */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {widget.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {widget.description}
      </p>
    </button>
  );
}
