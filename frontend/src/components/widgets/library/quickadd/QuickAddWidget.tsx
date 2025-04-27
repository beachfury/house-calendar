import { useState } from 'react';
import WidgetWrapper from '../../core/WidgetWrapper';

export default function QuickAddWidget() {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    console.log('Quick add:', input);
    setInput('');
  };

  return (
    <WidgetWrapper title="Quick Add">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-2 py-1 border rounded text-sm bg-white dark:bg-gray-900 dark:border-gray-700"
          placeholder="Type something..."
        />
        <button
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 text-sm rounded"
        >
          Add
        </button>
      </div>
    </WidgetWrapper>
  );
}
