import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface AppState {
  sidebarCollapsed: boolean
}

interface AppContextValue {
  state: AppState
  setSidebarCollapsed: (collapsed: boolean) => void
}

const AppContext = createContext<AppContextValue | null>(null)

const initialState: AppState = {
  sidebarCollapsed: false,
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState)

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      setSidebarCollapsed: (collapsed) =>
        setState((current) => ({ ...current, sidebarCollapsed: collapsed })),
    }),
    [state],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
