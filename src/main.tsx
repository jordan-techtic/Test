import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/sign-in" element={<FigmaScreenPage />} />
        <Route path="/login" element={<Navigate to="/sign-in" replace />} />
        <Route path="/dashboard" element={<FigmaScreenPage />} />
        <Route path="/profile" element={<FigmaScreenPage />} />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
