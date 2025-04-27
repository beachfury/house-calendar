// src/pages/BudgetPage.tsx
import { useState } from 'react';
import {
  Lock,
  CreditCard,
  PieChart,
} from 'lucide-react';

interface Category {
  name: string;
  allocated: number;
  spent: number;
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
}

const sampleCategories: Category[] = [
  { name: 'Rent',         allocated: 1500, spent: 1500 },
  { name: 'Groceries',    allocated: 600,  spent: 450  },
  { name: 'Utilities',    allocated: 200,  spent: 180  },
  { name: 'Entertainment',allocated: 300,  spent: 120  },
];

const sampleTransactions: Transaction[] = [
  { id: 1, description: 'Supermarket',   amount:  75.32, date: '2025-04-18' },
  { id: 2, description: 'Electric Bill', amount: 120.00, date: '2025-04-15' },
  { id: 3, description: 'Movie Tickets', amount:  45.00, date: '2025-04-12' },
  { id: 4, description: 'Internet Bill', amount:  60.00, date: '2025-04-10' },
];

const fmt = (n: number) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);

export default function BudgetPage() {
  // for look-only, we can simulate an “active” period
  const [period] = useState<'Weekly'|'Monthly'|'Yearly'>('Weekly');

  const totalAllocated = sampleCategories.reduce((sum, c) => sum + c.allocated, 0);
  const totalSpent     = sampleCategories.reduce((sum, c) => sum + c.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  // map period to human-friendly slice
  const sliceLabel = period === 'Weekly'
    ? 'week'
    : period === 'Monthly'
      ? 'month'
      : 'year';

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
          <Lock className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <span>Budget (Admin Only)</span>
        </div>
        <button className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <PieChart className="w-5 h-5" />
          <span>View Reports</span>
        </button>
      </div>

      {/* Period toggle (look-only) */}
      <div className="flex space-x-4">
        {(['Weekly','Monthly','Yearly'] as const).map(p => (
          <button
            key={p}
            className={`px-3 py-1 rounded-full text-sm transition ${
              period === p
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Allocated', value: totalAllocated, color: 'bg-green-100 text-green-800' },
          { label: 'Spent',     value: totalSpent,     color: 'bg-red-100 text-red-800'   },
          { label: 'Remaining', value: totalRemaining, color: 'bg-yellow-100 text-yellow-800' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`p-4 rounded-lg shadow flex flex-col ${color}`}>
            <span className="text-sm uppercase">
              {label} this {sliceLabel}
            </span>
            <span className="mt-2 text-2xl font-semibold">{fmt(value)}</span>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          By Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleCategories.map(cat => {
            const pct = Math.min(100, Math.round((cat.spent / cat.allocated) * 100));
            return (
              <div
                key={cat.name}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {cat.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {pct}%
                  </span>
                </div>
                <div className="mt-2 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="h-2 bg-blue-600" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{fmt(cat.spent)} spent</span>
                  <span>{fmt(cat.allocated)} alloc</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent transactions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Recent Transactions
        </h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {sampleTransactions.map(tx => (
            <li
              key={tx.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-gray-800 dark:text-gray-100">{tx.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tx.date}</p>
                </div>
              </div>
              <span className="font-medium text-gray-800 dark:text-gray-100">
                {fmt(tx.amount)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
