import { FigmaScreenPage } from "./components/luna-figma/FigmaScreenPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Toaster } from '@/components/ui/sonner';
import DashboardPage from '@/pages/DashboardPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SignUpPage from '@/pages/SignUpPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FigmaScreenPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
