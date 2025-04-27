// src/pages/LoginPage.tsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { User as UserIcon } from 'lucide-react';

export default function LoginPage() {
  const { users, switchUser, isLoading, error } = useContext(UserContext);
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="p-6">Loading users…</div>;
  }
  if (error) {
    return <div className="p-6 text-red-500">Error loading users</div>;
  }
  // guard that we have an actual array before mapping
  if (!Array.isArray(users)) {
    return <div className="p-6 text-red-500">No users to display</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center space-y-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Select a user to continue
        </h1>

        <ul className="space-y-4">
          {users.map((u) => {
            const initials = u.name
              .split(' ')
              .map((n) => n[0])
              .join('');

            return (
              <li key={u.id}>
                <button
                  onClick={() => {
                    switchUser(u);
                    navigate('/'); // go to dashboard
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200">
                    {initials || <UserIcon className="w-5 h-5" />}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      {u.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
