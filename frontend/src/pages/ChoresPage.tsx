// src/pages/ChoresPage.tsx
import { useState } from 'react';
import {
  CheckSquare,
  Repeat,
  ChevronRight,
  PlusCircle,
} from 'lucide-react';

interface Chore {
  id: number;
  title: string;
  nextRun: string;    // e.g. “Today at 5PM”
  recurrence: string; // e.g. “Weekly”
  completed: boolean;
}

const sampleChores: Chore[] = [
  { id: 1, title: 'Take out trash',    nextRun: 'Today at 6 PM',    recurrence: 'Daily',     completed: false },
  { id: 2, title: 'Vacuum living room', nextRun: 'Tomorrow',          recurrence: 'Weekly',    completed: false },
  { id: 3, title: 'Laundry',           nextRun: 'Sat, May 3',        recurrence: 'Weekly',    completed: true  },
  // …etc
];

export default function ChoresPage() {
  const [chores, setChores] = useState(sampleChores);
  const [filter, setFilter] = useState<'All'|'Active'|'Completed'>('All');

  const filtered = chores.filter(c =>
    filter === 'All'      ? true :
    filter === 'Active'   ? !c.completed :
    /* 'Completed' */      c.completed
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header: Title + Add button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Chores
        </h1>
        <button className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <PlusCircle className="w-5 h-5" />
          <span>Add Chore</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 text-sm">
        {(['All','Active','Completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1 rounded-full ${
              filter === tab
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            } transition`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chore List */}
      <ul className="space-y-4">
        {filtered.map(chore => (
          <li
            key={chore.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between"
          >
            {/* Left: checkbox + info */}
            <div className="flex items-start space-x-4">
              <CheckSquare
                className={`w-6 h-6 mt-1 ${
                  chore.completed
                    ? 'text-green-500'
                    : 'text-gray-300 hover:text-green-500 cursor-pointer'
                }`}
                onClick={() =>
                  setChores(ch =>
                    ch.map(x =>
                      x.id === chore.id ? { ...x, completed: !x.completed } : x
                    )
                  )
                }
              />
              <div>
                <div
                  className={`text-lg font-medium ${
                    chore.completed
                      ? 'line-through text-gray-400 dark:text-gray-600'
                      : 'text-gray-800 dark:text-gray-100'
                  }`}
                >
                  {chore.title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {chore.nextRun} · {chore.recurrence}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{chore.nextRun}</span>
                    <Repeat className='w-4 h-4'/>
                    <span>{chore.recurrence}</span>
                </div>
              </div>
            </div>

            {/* Right: action icon */}
            <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition cursor-pointer" />
          </li>
        ))}
      </ul>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No chores to show.
        </div>
      )}
    </div>
  );
}
