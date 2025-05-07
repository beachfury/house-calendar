// frontend/src/components/Header.tsx

/**
 * Header.tsx — updated for theme-only settings
 *
 * - Uses SettingsContext.themeVariant (not darkMode)
 * - Toggles between "light" and "dark" variants via updateSettings
 * - Applies CSS variables for bg/text and uses border-primary for accent
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
  // 1) Pull themeVariant from settings
  const { settings, updateSettings } = useSettings();
  const variant = settings?.themeVariant ?? 'light';
  const isDark = variant === 'dark';

  // 2) Toggle between light/dark variant
  const toggleTheme = () => {
    updateSettings({ themeVariant: isDark ? 'light' : 'dark' });
  };

  // 3) Page title & breadcrumb
  const location = useLocation();
  const pageTitle = titleFromPath(location.pathname);

  // 4) Live clock
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 5) User menu
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
    <header
      className="
        flex items-center justify-between
        bg-[var(--bg-color)] text-[var(--text-color)]
        border-b border-primary
        px-6 py-3
      "
    >
      {/* Title & Breadcrumb */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
        <nav className="text-sm opacity-70">
          <Link to="/">Home</Link> &rsaquo; {pageTitle}
        </nav>
      </div>

      {/* Search Box */}
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" />
        <input
          type="text"
          placeholder="Search tasks…"
          className="
            w-full pl-10 pr-4 py-1 rounded-md
            border border-[var(--theme-color)] bg-transparent
            text-[var(--text-color)] focus:outline-none
            focus:ring-2 focus:ring-[var(--theme-color)]
          "
        />
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Clock */}
        <div className="text-sm text-[var(--text-color)] text-center">
          <div>{format(now, 'EEEE, MMM do')}</div>
          <div className="font-mono">{format(now, 'hh:mm:ss a')}</div>
        </div>

        {/* Quick-Add */}
        <button className="flex items-center space-x-1 px-3 py-1 bg-primary text-white rounded hover:opacity-90">
          <Plus className="w-4 h-4" />
          <span className="text-sm">Add</span>
        </button>

        {/* Notifications */}
        <button className="p-2 rounded hover:bg-[var(--theme-color)/10]">
          <Bell className="w-5 h-5 text-[var(--text-color)]" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-[var(--theme-color)/10]"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-[var(--text-color)]" />
          )}
        </button>

        {/* Help */}
        <button className="p-2 rounded hover:bg-[var(--theme-color)/10]">
          <HelpCircle className="w-5 h-5 text-[var(--text-color)]" />
        </button>

        {/* User Menu */}
        <div className="relative" ref={containerRef}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="
              w-8 h-8 rounded-full
              bg-[var(--theme-color)/20] text-[var(--text-color)]
              flex items-center justify-center hover:opacity-75
            "
          >
            {initials || <UserIcon className="w-5 h-5" />}
          </button>
          {open && users && (
            <ul className="absolute right-0 mt-2 w-44 bg-[var(--bg-color)] rounded-lg shadow-lg z-20">
              {users.map((u) => (
                <li key={u.id}>
                  <button
                    onClick={() => {
                      switchUser(u);
                      setOpen(false);
                    }}
                    className={`
                      w-full text-left px-4 py-2 hover:bg-[var(--theme-color)/10]
                      ${currentUser?.id === u.id ? 'font-semibold' : ''}
                    `}
                  >
                    {u.name}{' '}
                    <span className="text-xs opacity-70">({u.role})</span>
                  </button>
                </li>
              ))}
              <li>
                <hr className="border-t border-[var(--theme-color)/30] my-1" />
              </li>
              <li>
                <button
                  onClick={() => {
                    switchUser(null);
                    setOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-left text-red-600 hover:bg-[var(--theme-color)/10]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Loading / Error for UserContext */}
      {isLoading && (
        <div className="absolute right-4 top-3 text-sm opacity-70">
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
