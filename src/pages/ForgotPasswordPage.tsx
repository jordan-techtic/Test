import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  useEffect(() => {
    document.title = 'Forgot Password | Agentwise';
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0b0b0b] px-4 text-center text-white">
      <h1 className="font-eb-garamond text-[38px] font-[500] leading-[49.59px]">Forgot your password?</h1>
      <p className="max-w-md font-almarai text-[16px] opacity-60">
        Password recovery is not available yet. Please contact support if you need help accessing your account.
      </p>
      <Link to="/login" className="font-almarai text-[16px] text-[#c8a47e] hover:opacity-90">
        Back to sign in
      </Link>
    </div>
  );
}
