import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface AppContextValue {
  demoMessage: string;
  setDemoMessage: (message: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [demoMessage, setDemoMessage] = useState('Marketing Content Calendar');

  const value = useMemo(
    () => ({
      demoMessage,
      setDemoMessage,
    }),
    [demoMessage],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
