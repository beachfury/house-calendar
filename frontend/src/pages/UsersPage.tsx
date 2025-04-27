// src/pages/UsersPage.tsx
import { useState } from 'react';
import {
  Lock,
  Users as UsersIcon,
  PlusCircle,
  Search,
  Edit2,
  Trash2,
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'member';
  status: 'active' | 'inactive';
  lastLogin: string;   // e.g. "Apr 20, 2025 09:15 AM"
  avatarUrl?: string;  // optional
}

// mock data
const sampleUsers: User[] = [
  { id:1, name:'Alice Johnson',  email:'alice@example.com',   role:'admin',  status:'active',   lastLogin:'Apr 20, 2025 09:15 AM' },
  { id:2, name:'Bob Smith',      email:'bob@example.com',     role:'member', status:'active',   lastLogin:'Apr 19, 2025 03:42 PM' },
  { id:3, name:'Carol Martinez', email:'carol@example.com',   role:'member', status:'inactive', lastLogin:'Apr 10, 2025 11:20 AM' },
  { id:4, name:'David Lee',      email:'david@example.com',   role:'admin',  status:'active',   lastLogin:'Apr 18, 2025 05:05 PM' },
];

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all'|'admin'|'member'>('all');
  const [statusFilter, setStatusFilter] = useState<'all'|'active'|'inactive'>('all');

  // apply filters
  const visible = sampleUsers.filter(u => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (statusFilter !== 'all' && u.status !== statusFilter) return false;
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const total   = sampleUsers.length;
  const admins  = sampleUsers.filter(u => u.role==='admin').length;
  const members = sampleUsers.filter(u => u.role==='member').length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
          <Lock className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <span>Users (Admin Only)</span>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <PlusCircle className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats */}
      <div className="flex space-x-6 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <UsersIcon className="inline w-5 h-5 mr-1 text-blue-500" />
          Total: <span className="font-semibold">{total}</span>
        </div>
        <div>Admins: <span className="font-semibold">{admins}</span></div>
        <div>Members: <span className="font-semibold">{members}</span></div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Role & Status Filters */}
      <div className="flex flex-wrap items-center space-x-2 mt-4">
        {(['all','admin','member'] as const).map(r => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              roleFilter === r
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {r === 'all' ? 'All Roles' : r.charAt(0).toUpperCase()+r.slice(1)}
          </button>
        ))}
        {(['all','active','inactive'] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              statusFilter === s
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-medium'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {s === 'all' ? 'All Status' : s.charAt(0).toUpperCase()+s.slice(1)}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="text-left text-gray-600 dark:text-gray-300">
              <th className="px-4 py-2 w-10">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Last Login</th>
              <th className="px-4 py-2 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(u => (
              <tr key={u.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{u.id}</td>
                <td className="px-4 py-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300">
                    {u.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </div>
                  <span className="text-gray-800 dark:text-gray-100">{u.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{u.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      u.role === 'admin'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    }`}
                  >
                    {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      u.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                  >
                    {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm">
                  {u.lastLogin}
                </td>
                <td className="px-4 py-3 flex items-center space-x-2">
                  <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <Edit2 className="w-5 h-5"/>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5"/>
                  </button>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
