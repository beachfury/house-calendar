// frontend/src/components/Sidebar.tsx

/**
 * Sidebar.tsx — updated for theme-only settings
 *
 * - Uses CSS variables and Tailwind dark: is no longer needed.
 * - Highlights active links with the "primary" accent color.
 */

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
  { to: '/',         label: 'Dashboard',  icon: Home },
  { to: '/calendar', label: 'Calendar',   icon: Calendar },
  { to: '/chores',   label: 'Chores',     icon: ListChecks },
  { to: '/paid-chores', label: 'Paid Chores', icon: DollarSign },
  { to: '/meals',    label: 'Meals',      icon: Coffee },
  { to: '/shopping', label: 'Shopping',   icon: ShoppingCart },
  { to: '/budget',   label: 'Budget',     icon: DollarSign },
  { to: '/todo',     label: 'Todo',       icon: StickyNote },
  { to: '/notes',    label: 'Notes',      icon: FileText },
  { to: '/users',    label: 'Users',      icon: Users },
  { to: '/settings', label: 'Settings',   icon: Settings },
];

export default function Sidebar() {
  return (
    <aside
      className="
        w-64
        bg-[var(--bg-color)] text-[var(--text-color)]
        border-r border-primary
        p-4 flex flex-col
      "
    >
      {/* Logo */}
      <div className="flex items-center mb-8">
        <Home className="w-6 h-6 text-primary mr-2" />
        <h2 className="text-2xl font-bold">Home-Cal</h2>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              [
                'flex items-center px-3 py-2 rounded-md',
                isActive
                  // active link: primary background + white text
                  ? 'bg-primary text-white'
                  // inactive: theme-color hover, default text-color
                  : 'text-[var(--text-color)] hover:bg-[var(--theme-color)/10]',
              ]
              .filter(Boolean)
              .join(' ')
            }
          >
            {/* Icon no longer needs isActive; it inherits text-color from the link */}
            <Icon className="w-5 h-5 mr-3" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
