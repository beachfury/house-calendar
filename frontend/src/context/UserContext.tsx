// src/context/UserContext.tsx
import { createContext } from 'react';
import type { User } from '../hooks/useUsers';

/** The shape of our user‐context value */
export interface UserContextValue {
  users: User[] | undefined;
  currentUser: User | null;
  switchUser: (u: User | null) => void;
  isLoading: boolean;
  error: Error | null;
  initialized: boolean;
}

/** Default, “empty” context (will be overwritten by the provider) */
export const UserContext = createContext<UserContextValue>({
  users: undefined,
  currentUser: null,
  switchUser: () => {},
  isLoading: false,
  error: null,
  initialized: false,
});
