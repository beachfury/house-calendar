// src/context/UserProvider.tsx
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useUsers, User } from '../hooks/useUsers';
import { UserContext, UserContextValue } from './UserContext';

const STORAGE_KEY = 'hc_currentUserId';

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  // 1) Get users via your react-query hook
  const { data: users, isLoading, error } = useUsers();
  // Our extra state:
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  // 2) When users arrive, restore from localStorage
  useEffect(() => {
    if (users && users.length > 0) {
      const savedId = localStorage.getItem(STORAGE_KEY);
      if (savedId) {
        const found = users.find((u) => u.id === savedId);
        if (found) setCurrentUser(found);
      }
      setInitialized(true);
    }
  }, [users]);

  // 3) Persist any user change (after first init)
  const didPersistRef = useRef(false);
  useEffect(() => {
    if (!initialized) return;
    if (!didPersistRef.current) {
      didPersistRef.current = true;
      return;
    }
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY, currentUser.id);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser, initialized]);

  // 4) Build & provide the context value
  const value: UserContextValue = {
    users,
    currentUser,
    switchUser: setCurrentUser,
    isLoading,
    error: error ?? null,
    initialized,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/** Hook to consume the user‐context elsewhere */
export const useUser = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (ctx === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
};
