import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomeRedirect, ProtectedRoute } from './components/auth/ProtectedRoute';
import { FigmaScreenPage } from './components/luna-figma/FigmaScreenPage';
import './components/luna-figma/figma-fonts.css';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
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
