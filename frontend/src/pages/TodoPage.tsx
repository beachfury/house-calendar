// src/pages/TodoPage.tsx
import { useState } from 'react';
import {
  PlusCircle,
  CheckSquare,
  Square,
  CalendarClock,
} from 'lucide-react';

interface Todo {
  id: number;
  title: string;
  due: string;      // e.g. “Apr25,2025”
  completed: boolean;
}

const sampleTodos: Todo[] = [
  { id: 1, title: 'Finish report',      due: 'Apr 22, 2025', completed: false },
  { id: 2, title: 'Call plumber',       due: 'Apr 20, 2025', completed: true  },
  { id: 3, title: 'Book vet appointment', due: 'Apr 30, 2025', completed: false },
];

export default function TodoPage() {
  const [filter, setFilter] = useState<'All'|'Active'|'Completed'>('All');

  const visible = sampleTodos.filter(t =>
    filter === 'All'       ? true :
    filter === 'Active'    ? !t.completed :
    /* 'Completed' */        t.completed
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          To‑Do List
        </h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          <PlusCircle className="w-5 h-5" />
          <span>Add To‑Do</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 text-sm">
        {(['All','Active','Completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full transition ${
              filter === f
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 font-medium'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* To‑do items */}
      <ul className="space-y-4">
        {visible.map(todo => (
          <li
            key={todo.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between hover:shadow-md transition"
          >
            <div className="flex items-center space-x-4">
              {todo.completed
                ? <CheckSquare className="w-6 h-6 text-green-500 cursor-pointer" />
                : <Square      className="w-6 h-6 text-gray-400 cursor-pointer" />}
              <div>
                <div className={`text-lg font-medium ${
                  todo.completed
                    ? 'line-through text-gray-400 dark:text-gray-600'
                    : 'text-gray-800 dark:text-gray-100'
                }`}>
                  {todo.title}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <CalendarClock className="w-4 h-4 mr-1" />
                  <span>Due {todo.due}</span>
                </div>
              </div>
            </div>
            {/* placeholder for drag handle or chevron */}
            <CalendarClock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </li>
        ))}
      </ul>

      {/* Empty state */}
      {visible.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No to‑dos to show.
        </div>
      )}
    </div>
  );
}
