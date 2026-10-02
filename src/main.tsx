import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import { getStoredAccessToken } from './lib/api-client';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
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
        <Route path="/dashboard" element={<App />} />
        <Route path="/updated-dashboard" element={<App />} />
        <Route path="/signin" element={<App />} />
        <Route path="/sign-in" element={<App />} />
        <Route path="/login" element={<App />} />
        <Route path="/sign-up" element={<App />} />
        <Route path="/profile" element={<App />} />
        <Route path="/about-us" element={<App />} />
        <Route path="/ultimate-mind" element={<App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
