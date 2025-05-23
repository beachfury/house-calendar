// src/pages/Dashboard.tsx

import React, { useState, useContext, useEffect, useCallback } from 'react';
import AddWidgetModal from '../components/widgets/core/AddWidgetModal';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Layout } from 'react-grid-layout';
import WidgetLayoutGrid, {
  WidgetInstance,
} from '../components/widgets/core/WidgetLayoutGrid';
import { useWidgetRegistry } from '../hooks/useWidgetRegistry';

export default function Dashboard() {
  const { currentUser } = useContext(UserContext);
  const { list: manifests, load: loadWidget } = useWidgetRegistry();

  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [widgets, setWidgets] = useState<WidgetInstance[]>([]);

  const loadLayoutFromServer = useCallback(async () => {
    if (!currentUser) return;

    try {
      const res = await axios.get<Layout[]>(
        `/api/dashboard-layouts/${currentUser.id}`
      );
      const savedLayouts = res.data;

      const restored = await Promise.all(
        savedLayouts.map(async (layout) => {
          const m = manifests.find((w) =>
            layout.i.startsWith(w.id)
          );
          if (!m) return null;

          const Component = (await loadWidget(m.id)) as React.ComponentType<{
            userId: string;
            instanceId: string;
          }>;
          const instanceId = layout.i;

          return {
            key: instanceId,
            component: () => (
              <Component
                userId={currentUser.id}
                instanceId={instanceId}
              />
            ),
            defaultLayout: { ...layout },
          } as WidgetInstance;
        })
      );

      setWidgets(restored.filter(Boolean) as WidgetInstance[]);
    } catch (err) {
      console.warn('Failed to load saved layout:', err);
      setWidgets([]);
    }
  }, [currentUser, manifests, loadWidget]);

  useEffect(() => {
    loadLayoutFromServer();
  }, [currentUser, loadLayoutFromServer]);

  const handleAddWidget = async (widgetId: string) => {
    if (!currentUser) return;
    const m = manifests.find((w) => w.id === widgetId);
    if (!m) return;

    const uniqueKey = `${widgetId}-${Date.now()}`;
    const newLayout = { ...m.defaultLayout, i: uniqueKey, x: 0, y: Infinity };

    try {
      const updatedLayouts = [
        ...widgets.map((w) => w.defaultLayout),
        newLayout,
      ];
      await axios.put(
        `/api/dashboard-layouts/${currentUser.id}`,
        { layout: updatedLayouts }
      );
      await loadLayoutFromServer();
    } catch (err) {
      console.error('Failed to add widget:', err);
    }

    setShowModal(false);
  };

  const handleLayoutUpdate = async (newLayout: Layout[]) => {
    if (!currentUser) return;
    try {
      await axios.put(
        `/api/dashboard-layouts/${currentUser.id}`,
        { layout: newLayout }
      );
      await loadLayoutFromServer();
    } catch (err) {
      console.error('Failed to save layout:', err);
    }
  };

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Title uses CSS-variable driven text color */}
        <h1 className="text-3xl font-extrabold text-[var(--text-color)]">
          Dashboard
        </h1>

        <div className="flex gap-2">
          {/* "+ Add Widget" button uses your primary accent */}
          <button
            onClick={() => setShowModal(true)}
            className="
              px-4 py-1 text-white
              bg-primary
              rounded
              hover:bg-primary/90
            "
          >
            + Add Widget
          </button>

          {/* "Edit Layout" button also uses primary accent */}
          <button
            onClick={() => setEditMode((e) => !e)}
            className="
              px-4 py-1 text-white
              bg-primary
              rounded
              hover:bg-primary/90
            "
          >
            {editMode ? 'Done' : 'Edit Layout'}
          </button>
        </div>
      </div>

      {/* Grid */}
      <WidgetLayoutGrid
        editMode={editMode}
        widgets={widgets}
        onLayoutChange={handleLayoutUpdate}
      />

      {/* Modal */}
      {showModal && (
        <AddWidgetModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddWidget}
        />
      )}
    </div>
  );
}
