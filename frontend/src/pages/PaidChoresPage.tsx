// src/pages/PaidChoresPage.tsx
import { useState } from 'react';
import { ChevronRight, DollarSign, PlusCircle } from 'lucide-react';

// --- 1) Define the PaidChore type ---
interface PaidChore {
  id: number;
  title: string;
  dueDate: string;    // e.g. “May 5, 2025”
  amount: string;     // e.g. “$25”
  completed: boolean;
}

// --- 2) Sample data for mocking ---
const samplePaidChores: PaidChore[] = [
  { id: 1, title: 'Mow the lawn',     dueDate: 'May 4, 2025',  amount: '$30',  completed: false },
  { id: 2, title: 'Dog walking',      dueDate: 'May 6, 2025',  amount: '$15',  completed: true  },
  { id: 3, title: 'Paint the garage', dueDate: 'May 10, 2025', amount: '$100', completed: false },
];

// --- 3) The component ---
export default function PaidChoresPage() {
  // State typed with PaidChore[]
  const [chores] = useState<PaidChore[]>(samplePaidChores);
  const [filter, setFilter] = useState<'All'|'Pending'|'Paid'>('All');

  // Filter the mock data
  const filtered = chores.filter(c =>
    filter === 'All'     ? true
  : filter === 'Pending' ? !c.completed
  : /* 'Paid' */         c.completed
  );

  return (
<>      {/* Main paid‑chores UI */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Paid Chores
          </h1>
          <button className="flex items-center space-x-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            <PlusCircle className="w-5 h-5" />
            <span>Add Paid Chore</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 text-sm">
          {(['All','Pending','Paid'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-full transition
                ${filter === tab
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <ul className="space-y-4">
          {filtered.map(chore => (
            <li
              key={chore.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between"
            >
              {/* Left: icon + info */}
              <div className="flex items-center space-x-4">
                <DollarSign
                  className={`w-6 h-6 ${
                    chore.completed ? 'text-green-500' : 'text-yellow-500'
                  }`}
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
                    Due {chore.dueDate}
                  </div>
                </div>
              </div>

              {/* Right: amount badge + chevron */}
              <div className="flex items-center space-x-3">
                <span
                  className="px-2 py-1 text-sm font-semibold rounded-full text-white"
                  style={{ backgroundColor: 'var(--color-paid-chore)' }}
                >
                  {chore.amount}
                </span>
                <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition cursor-pointer" />
              </div>
            </li>
          ))}
        </ul>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No paid chores to show.
          </div>
        )}
      </div>
    </>
  );
}
