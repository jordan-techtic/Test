/** luna-spec-codegen: owned-layout */
import { useContentLibrary } from '../../contentLibraryContext';

export function FigmaSection_n_3047_21443() {
  const { loadMore, hasMore, isEmpty } = useContentLibrary();

  if (isEmpty || !hasMore) {
    return (
      <section
        data-figma-node="3047:21443"
        className="absolute box-border left-[748px] top-[2479px] mt-[1596px] w-[144px] h-[48px] pt-[10px] pr-[20px] pb-[10px] pl-[20px] flex flex-row items-center justify-center gap-1.5 z-[7] pointer-events-none opacity-40"
        aria-hidden="true"
      >
        <div
          data-figma-node="3047:21444"
          className="box-border w-[24px] h-[24px] overflow-hidden relative"
        />
        <p
          data-figma-node="3047:21446"
          className="box-border w-[74px] h-[18px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]"
        >
          Load more
        </p>
      </section>
    );
  }

  return (
    <section
      data-figma-node="3047:21443"
      className="absolute box-border left-[748px] top-[2479px] mt-[1596px] w-[144px] h-[48px] pt-[10px] pr-[20px] pb-[10px] pl-[20px] flex flex-row items-center justify-center gap-1.5 z-[7]"
    >
      <button
        type="button"
        onClick={loadMore}
        className="box-border absolute inset-0 flex flex-row items-center justify-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer hover:opacity-90"
        aria-label="Load more"
      >
        <div
          data-figma-node="3047:21444"
          className="box-border w-[24px] h-[24px] overflow-hidden relative pointer-events-none"
        />
        <p
          data-figma-node="3047:21446"
          className="box-border w-[74px] h-[18px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff] pointer-events-none"
        >
          Load more
        </p>
      </button>
    </section>
  );
}
