// src/pages/CalendarPage.tsx
import { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subMonths,
  addMonths,
  format,
  isSameMonth,
  isToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd   = endOfMonth(monthStart);
  const startDate  = startOfWeek(monthStart);
  const endDate    = endOfWeek(monthEnd);

  // Build a 2D array of weeks
  const weeks: Date[][] = [];
  let day = startDate;
  while (day <= endDate) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    weeks.push(week);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Card container */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </header>

        {/* Weekdays */}
        <div className="grid grid-cols-7 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-center text-sm font-medium">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
            <div key={d} className="py-2">{d}</div>
          ))}
        </div>

        {/* Dates grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-100 dark:bg-gray-700">
          {weeks.flat().map(date => {
            const inMonth = isSameMonth(date, monthStart);
            const today   = isToday(date);

            return (
              <div
                key={date.toString()}
                className={`
                  min-h-[90px] p-2 bg-white dark:bg-gray-800
                  ${inMonth ? '' : 'opacity-50'}
                  ${today ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''}
                  hover:bg-gray-50 dark:hover:bg-gray-700
                  transition
                `}
              >
                <div className={`
                  w-6 h-6 flex items-center justify-center
                  ${today ? 'bg-indigo-500 text-white rounded-full' : 'text-gray-800 dark:text-gray-100'}
                  font-medium
                `}>
                  {format(date, 'd')}
                </div>

                {/* Events placeholder */}
                <ul className="mt-1 space-y-1 text-xs">
                  {/* <li className="bg-green-100 text-green-800 rounded px-1">🍽 Dinner</li> */}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
