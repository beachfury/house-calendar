// src/components/widgets/PlaceholderWidget.tsx

interface PlaceholderWidgetProps {
  label: string;
  onClick?: () => void;
}

export default function PlaceholderWidget({
  label,
  onClick,
}: PlaceholderWidgetProps) {
  return (
    <button
      onClick={onClick}
      className="
        bg-white dark:bg-gray-800
        p-4 rounded-lg shadow
        flex items-center justify-center
        text-gray-400 dark:text-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-700
        transition
      "
    >
      {label}
    </button>
  );
}
