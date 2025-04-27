import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface WidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function WidgetModal({ isOpen, onClose, children }: WidgetModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
