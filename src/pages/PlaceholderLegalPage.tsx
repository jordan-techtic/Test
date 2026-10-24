type PlaceholderLegalPageProps = {
  title: string;
};

export function PlaceholderLegalPage({ title }: PlaceholderLegalPageProps) {
  return (
    <div
      className="relative flex min-h-[40vh] w-full flex-col items-center justify-center p-[40px]"
      style={{ backgroundColor: '#0b0b0b' }}
    >
      <h1 className="font-eb-garamond text-[48px] font-[500] capitalize text-[#ffffff]">{title}</h1>
      <p className="mt-4 font-almarai text-[18px] text-[#ffffff] opacity-[0.6]">
        Content for this page will be published here.
      </p>
      <a href="/" className="mt-8 font-almarai text-[18px] text-[#c8a47e] no-underline hover:opacity-90">
        Back to home
      </a>
    </div>
  );
}
