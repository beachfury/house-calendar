// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import Sidebar           from './components/SideBar';
import LoginPage         from './pages/LoginPage';
import Dashboard         from './pages/Dashboard';
import CalendarPage      from './pages/Calendar';
import ChoresPage        from './pages/ChoresPage';
import PaidChoresPage    from './pages/PaidChoresPage';
import MealsPage         from './pages/MealsPage';
import ShoppingListPage  from './pages/ShoppingListPage';
import BudgetPage        from './pages/BudgetPage';
import TodoPage          from './pages/TodoPage';
import NotesPage         from './pages/NotesPage';
import UsersPage         from './pages/UsersPage';
import SettingsPage      from './pages/SettingsPage';
import { UserContext }   from './context/UserContext';
import Header from './components/header';


export default function App() {
  const { isLoading, initialized, currentUser } = useContext(UserContext);

  // 1) still loading users or restoring from storage?
  if (isLoading || !initialized) {
    return <div className="p-6 text-center">Loading…</div>;
  }

  // 2) no user selected yet → show login screen
  if (!currentUser) {
    return <LoginPage />;
  }

  // 3) user is set → show the app
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
  );
}
