// frontend/src/hooks/useUsers.ts
import axios from 'axios';
import { useQuery } from 'react-query';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'member';
}

export function useUsers() {
  return useQuery<User[], Error>(
    ['users'],
    () => axios.get('/api/users').then(res => res.data),
    { staleTime: 5 * 60 * 1000 }
  );
}
