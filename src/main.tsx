import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FigmaScreenPage } from './components/luna-figma/FigmaScreenPage';
import { getStoredAccessToken } from './lib/api/token';
import './components/luna-figma/figma-fonts.css';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!getStoredAccessToken()) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}

function HomeRedirect() {
  if (getStoredAccessToken()) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/sign-in" replace />;
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/sign-in" element={<FigmaScreenPage />} />
        <Route path="/login" element={<Navigate to="/sign-in" replace />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <FigmaScreenPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <FigmaScreenPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
