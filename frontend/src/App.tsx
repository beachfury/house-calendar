// src/App.tsx

/**
 * App
 *
 * - Shows a login screen until UserContext + SettingsContext are ready
 * - Applies user settings (darkMode, accent color, fonts, background) to <html>
 * - Renders Sidebar, Header and the page Routes
 */

import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar          from './components/SideBar'
import Header           from './components/header'
import LoginPage        from './pages/LoginPage'
import Dashboard        from './pages/Dashboard'
import CalendarPage     from './pages/Calendar'
import ChoresPage       from './pages/ChoresPage'
import PaidChoresPage   from './pages/PaidChoresPage'
import MealsPage        from './pages/MealsPage'
import ShoppingListPage from './pages/ShoppingListPage'
import BudgetPage       from './pages/BudgetPage'
import TodoPage         from './pages/TodoPage'
import NotesPage        from './pages/NotesPage'
import UsersPage        from './pages/UsersPage'
import SettingsPage     from './pages/SettingsPage'
import { UserContext }  from './context/UserContext'
import { useSettings }  from './context/SettingsContext'

export default function App() {
  // ───────────────────────────────────────────────────────────────
  // 1) Get user + settings state
  // ───────────────────────────────────────────────────────────────
  const { isLoading: userLoading, initialized, currentUser } =
    useContext(UserContext)
  const { settings, isLoading: settingsLoading } = useSettings()

  // ───────────────────────────────────────────────────────────────
  // 2) Always run this effect (hook order stays stable)
  //    Applies dark mode class & CSS vars to <html>
  // ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!settings) return
    const html = document.documentElement

    // dark/light toggle
    html.classList.toggle('dark', settings.darkMode)

    // accent color
    html.style.setProperty('--theme-color', settings.themeColor)
    // font family
    html.style.setProperty('--font-family', settings.fontFamily)
    // font size
    const sizeMap: Record<string, string> = {
      sm:   '0.875rem',
      base: '1rem',
      lg:   '1.125rem',
    }
    html.style.setProperty(
      '--font-size',
      sizeMap[settings.fontSize] ?? sizeMap.base
    )
    // background image
    const bg = settings.backgroundImageUrl
      ? `url('${settings.backgroundImageUrl}') center/cover no-repeat`
      : 'none'
    html.style.setProperty('--background-image', bg)
  }, [settings])

  // ───────────────────────────────────────────────────────────────
  // 3) If still loading user *or* settings, show a loader
  // ───────────────────────────────────────────────────────────────
  if (userLoading || !initialized || settingsLoading) {
    return <div className="h-screen flex items-center justify-center">Loading…</div>
  }

  // ───────────────────────────────────────────────────────────────
  // 4) No user → force login screen
  // ───────────────────────────────────────────────────────────────
  if (!currentUser) {
    return <LoginPage />
  }

  // ───────────────────────────────────────────────────────────────
  // 5) Everything ready → render the main app shell
  // ───────────────────────────────────────────────────────────────
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto p-6">
            <Routes>
              <Route path="/"            element={<Dashboard />} />
              <Route path="/calendar"    element={<CalendarPage />} />
              <Route path="/chores"      element={<ChoresPage />} />
              <Route path="/paid-chores" element={<PaidChoresPage />} />
              <Route path="/meals"       element={<MealsPage />} />
              <Route path="/shopping"    element={<ShoppingListPage />} />
              <Route path="/budget"      element={<BudgetPage />} />
              <Route path="/todo"        element={<TodoPage />} />
              <Route path="/notes"       element={<NotesPage />} />
              <Route path="/users"       element={<UsersPage />} />
              <Route path="/settings"    element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
