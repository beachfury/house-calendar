// frontend/src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { SettingsProvider } from './context/SettingsContext';
import { UserProvider, useUser } from './context/UserProvider';
import { WidgetRegistryProvider } from './context/WidgetRegistryProvider';
import './index.css';

const queryClient = new QueryClient();

function Root() {
  const { currentUser, isLoading } = useUser();
  if (isLoading || !currentUser) return <div>Loading…</div>;
  return (
    <SettingsProvider userId={currentUser.id}>
      <App />
    </SettingsProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WidgetRegistryProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Root />
        </UserProvider>
      </QueryClientProvider>
    </WidgetRegistryProvider>
  </React.StrictMode>
);
