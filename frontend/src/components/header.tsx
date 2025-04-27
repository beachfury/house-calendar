/**
 * Header.tsx
 *
 * - Renders the top app bar with:
 *    • Page title & breadcrumb (based on react-router path)
 *    • Live date/time clock
 *    • Search box
 *    • Quick-add, notifications, help icons
 *    • Theme toggle (sun/moon) that reads & writes `darkMode` in SettingsContext
 *    • User menu with switch-user and logout
 * - Applies/removes `class="dark"` on <html> whenever `settings.darkMode` changes
 */

import React, { useContext, useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Bell,
  Plus,
  Sun,
  Moon,
  Search,
  HelpCircle,
  User as UserIcon,
  LogOut,
} from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { titleFromPath } from '../utils/routeTitles';
import { useSettings } from '../context/SettingsContext';

export default function Header() {
  // ───────────────────────────────────────────────────────────────
  // 1) Theme (darkMode) from user settings
  // ───────────────────────────────────────────────────────────────
  const { settings, updateSettings } = useSettings();
  const dark = settings?.darkMode ?? false;

  // When `dark` flips, add/remove `class="dark"` on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // Toggle between light/dark and persist
  const toggleTheme = () => {
    updateSettings({ darkMode: !dark });
  };

  // ───────────────────────────────────────────────────────────────
  // 2) Page title & breadcrumb
  // ───────────────────────────────────────────────────────────────
  const location = useLocation();
  const pageTitle = titleFromPath(location.pathname);

  // ───────────────────────────────────────────────────────────────
  // 3) Live clock state
  // ───────────────────────────────────────────────────────────────
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ───────────────────────────────────────────────────────────────
  // 4) User menu state & outside-click handling
  // ───────────────────────────────────────────────────────────────
  const { users, currentUser, switchUser, isLoading, error } =
    useContext(UserContext);
  const initials =
    currentUser?.name
      .split(' ')
      .map((n) => n[0])
      .join('') ?? '';
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-3">
      {/* ───────────────────────────────────────────────────────────────
            Title & Breadcrumb
          ─────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {pageTitle}
        </h1>
        <nav className="text-sm text-gray-500 dark:text-gray-400">
          <Link to="/">Home</Link> &rsaquo; {pageTitle}
        </nav>
      </div>

      {/* ───────────────────────────────────────────────────────────────
            Search Box
          ─────────────────────────────────────────────────────────────── */}
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks…"
          className="w-full pl-10 pr-4 py-1 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ───────────────────────────────────────────────────────────────
            Right-side Controls
          ─────────────────────────────────────────────────────────────── */}
      <div className="flex items-center space-x-4">
        {/* Clock */}
        <div className="text-gray-700 dark:text-gray-300 text-sm text-center">
          <div>{format(now, 'EEEE, MMM do')}</div>
          <div className="font-mono">{format(now, 'hh:mm:ss a')}</div>
        </div>

        {/* Quick-Add */}
        <button className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add</span>
        </button>

        {/* Notifications */}
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {dark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Help */}
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* User Menu */}
        <div className="relative" ref={containerRef}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          >
            {initials || <UserIcon className="w-5 h-5" />}
          </button>
          {open && users && (
            <ul className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-20">
              {users.map((u) => (
                <li key={u.id}>
                  <button
                    onClick={() => {
                      switchUser(u);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                      currentUser?.id === u.id
                        ? 'font-semibold bg-gray-100 dark:bg-gray-700'
                        : ''
                    }`}
                  >
                    {u.name}{' '}
                    <span className="text-xs text-gray-500">({u.role})</span>
                  </button>
                </li>
              ))}
              <li>
                <hr className="border-t border-gray-200 dark:border-gray-700 my-1" />
              </li>
              <li>
                <button
                  onClick={() => {
                    switchUser(null);
                    setOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────
            Loading / Error Indicators for UserContext
          ─────────────────────────────────────────────────────────────── */}
      {isLoading && (
        <div className="absolute right-4 top-3 text-sm text-gray-500">
          Loading…
        </div>
      )}
      {error && (
        <div className="absolute right-4 top-3 text-sm text-red-500">
          Error loading users
        </div>
      )}
    </header>
  );
}
