export function DashboardStubPage() {
  return (
    <div
      className="relative flex min-h-[40vh] w-full flex-col items-center justify-center p-[40px]"
      style={{ backgroundColor: '#0b0b0b' }}
    >
      <h1 className="font-eb-garamond text-[48px] font-[500] capitalize text-[#ffffff]">Dashboard</h1>
      <p className="mt-4 font-almarai text-[18px] text-[#ffffff] opacity-[0.6]">Sign in to access your dashboard.</p>
      <a href="/login" className="mt-8 font-almarai text-[18px] text-[#c8a47e] no-underline hover:opacity-90">
        Sign in
      </a>
    </div>
  );
}
