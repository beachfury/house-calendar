// src/components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import {
  Home,
  Calendar,
  ListChecks,
  Coffee,
  DollarSign,
  FileText,
  Users,
  Settings,
  ShoppingCart,
  StickyNote,
} from 'lucide-react';

const navItems = [
  { to: '/',         label: 'Dashboard', icon: Home },
  { to: '/calendar', label: 'Calendar',  icon: Calendar },
  { to: '/chores',   label: 'Chores',    icon: ListChecks },
  { to: '/paid-chores',label: 'Paid Chores',icon: DollarSign },
  { to: '/meals', label: 'Meals', icon: Coffee },
  { to: '/shopping', label: 'Shopping', icon: ShoppingCart},
  { to: '/budget',   label: 'Budget',    icon: DollarSign },
  { to: '/todo', label: 'Todo', icon: StickyNote},
  { to: '/notes',    label: 'Notes',     icon: FileText },
  { to: '/users',    label: 'Users',     icon: Users },
  { to: '/settings', label: 'Settings',  icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Home className="w-6 h-6 text-blue-600 dark:text-yellow-400 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Home‑Cal
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              [
                'flex items-center px-3 py-2 rounded-md',
                'text-gray-700 dark:text-gray-300',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                isActive && 'bg-gray-200 dark:bg-gray-700 font-semibold',
              ]
                .filter(Boolean)
                .join(' ')
            }
          >
            <Icon className="w-5 h-5 mr-3" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
