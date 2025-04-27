// src/pages/NotesPage.tsx
import { useState } from 'react';
import {
  PlusCircle,
  Search,
  FileText,
  CalendarClock,
} from 'lucide-react';

interface Note {
  id: number;
  title: string;
  content: string;
  updated: string; // e.g. “Apr18,2025”
}

const sampleNotes: Note[] = [
  {
    id: 1,
    title: 'Grocery List',
    content: 'Milk, eggs, bread, spinach, chicken breasts, rice, olive oil…',
    updated: 'Apr 19, 2025',
  },
  {
    id: 2,
    title: 'Project Ideas',
    content: '– Home calendar v1: add recurring chores\n– Meal planner integration with API…',
    updated: 'Apr 17, 2025',
  },
  {
    id: 3,
    title: 'Vacation Plan',
    content: 'Book flights to Hawaii; reserve AirBnB; plan snorkeling trip and luau…',
    updated: 'Apr 15, 2025',
  },
  {
    id: 4,
    title: 'Books to Read',
    content: '“The Pragmatic Programmer”, “Deep Work”, “Clean Code”, “Eloquent JavaScript”…',
    updated: 'Apr 12, 2025',
  },
];

export default function NotesPage() {
  const [search, setSearch] = useState('');

  // filter notes by title or content
  const visible = sampleNotes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Notes
          </h1>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          <PlusCircle className="w-5 h-5" />
          <span>Add Note</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map(note => (
          <div
            key={note.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {note.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex-1 overflow-hidden">
              {note.content.length > 100
                ? `${note.content.slice(0, 100)}…`
                : note.content}
            </p>
            <div className="mt-4 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <CalendarClock className="w-4 h-4 mr-1" />
              <span>Last updated {note.updated}</span>
            </div>
          </div>
        ))}

        {visible.length === 0 && (
          <div className="text-center col-span-full text-gray-500 dark:text-gray-400">
            No notes match your search.
          </div>
        )}
      </div>
    </div>
  );
}
