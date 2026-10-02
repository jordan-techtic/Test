import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import App from './App';
import { getStoredAccessToken } from './lib/api-client';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const token = getStoredAccessToken();
  if (!token) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />;
  }
  return children;
}

function RootRedirect() {
  if (getStoredAccessToken()) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/sign-in" replace />;
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        />
        <Route
          path="/updated-dashboard"
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        />
        <Route path="/signin" element={<App />} />
        <Route path="/sign-in" element={<App />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        />
        <Route path="/about-us" element={<App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
