// src/components/widgets/core/AddWidgetModal.tsx
import React from 'react';
import { X } from 'lucide-react';
import WidgetLibraryItem from './WidgetLibraryItem';
import { useWidgetRegistry } from '../../../hooks/useWidgetRegistry';

interface AddWidgetModalProps {
  onClose: () => void;
  onAdd: (widgetId: string) => void;
}

export default function AddWidgetModal({ onClose, onAdd }: AddWidgetModalProps) {
  const { list: manifests } = useWidgetRegistry();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Add a Widget
        </h2>

        {/* Grid of available widgets */}
        <div className="grid grid-cols-2 gap-4">
          {manifests.map((m) => ( 
            <WidgetLibraryItem
              key={m.id}
              widget={{
                id: m.id,
                title: m.title,
                description: m.description ?? 'No description',
                icon: m.icon,
              }}
              onSelect={() => onAdd(m.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
