import { Routes, Route } from 'react-router-dom';
import Home from '@/components/features/Home';
import NotFound from '@/components/features/NotFound';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
