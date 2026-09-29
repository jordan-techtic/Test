import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0e0d0d] px-4 text-center text-white">
      <h1 className="font-eb-garamond text-[48px] font-[500] leading-[56px]">Page not found</h1>
      <p className="font-almarai text-[16px] opacity-60">The page you requested does not exist.</p>
      <Link to="/" className="font-almarai text-[16px] text-[#c8a47e] hover:opacity-90">
        Return home
      </Link>
    </div>
  );
}
