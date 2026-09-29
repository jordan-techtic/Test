/** luna-spec-codegen: owned-layout */
import { useContentLibrary } from '../../contentLibraryContext';

export function FigmaSection_n_3047_21439() {
  const { searchQuery, setSearchQuery } = useContentLibrary();

  return (
    <section
      data-figma-node="3047:21439"
      className="absolute box-border left-[1100px] top-[47px] w-[300px] h-[44px] gap-2.5 z-[6]"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      <label htmlFor="content-library-search" className="sr-only">
        Search content library
      </label>
      <input
        id="content-library-search"
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="box-border absolute left-[0px] top-[0px] w-[300px] h-[44px] bg-transparent border-0 px-[48px] font-almarai text-[16px] font-[400] leading-[18px] text-[#ffffff] placeholder:text-[#ffffff] placeholder:opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none"
        placeholder="Search"
      />
      <p
        data-figma-node="3047:21442"
        className="box-border w-[50px] h-[18px] absolute left-[48px] top-[13px] opacity-[0.6] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff] pointer-events-none"
        aria-hidden="true"
      >
        Search
      </p>
    </section>
  );
}
