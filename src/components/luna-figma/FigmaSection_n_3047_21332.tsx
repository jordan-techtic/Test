/** luna-spec-codegen: owned-layout */
import { useContentLibrary } from '../../contentLibraryContext';

export function FigmaSection_n_3047_21332() {
  const { filteredItems, isEmpty } = useContentLibrary();
  const resultsLabel = isEmpty ? '0 Results' : `${filteredItems.length} Results`;

  return (
    <section
      data-figma-node="3047:21332"
      className="absolute box-border left-[272px] top-[173px] mt-[19px] w-[1128px] h-[40px] flex flex-row items-center justify-between gap-[624px] z-[5]"
    >
      <p
        data-figma-node="3047:21333"
        className="box-border w-[70px] h-[22px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[22px] text-left whitespace-nowrap text-[#ffffff]"
      >
        {resultsLabel}
      </p>
      <div
        data-figma-node="3047:21334"
        className="box-border w-[673px] h-[40px] relative gap-5"
      >
        <div
          data-figma-node="3047:21335"
          className="box-border w-[185px] h-[40px] absolute left-[316px] top-[0px] gap-5"
        >
          <div
            data-figma-node="3047:21336"
            className="box-border w-[185px] h-[38px] absolute left-[0px] top-[1px] rounded-[6px] gap-2.5 pr-[16px] pl-[16px]"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div
              data-figma-node="3047:21337"
              className="box-border w-[20px] h-[20px] absolute left-[16px] top-[9px]"
            >
              <div
                data-figma-node="3047:21339"
                className="box-border w-[12px] h-[12px] absolute left-[4px] top-[4px]"
              />
            </div>
            <p
              data-figma-node="3047:21346"
              className="box-border w-[93px] h-[22px] absolute left-[46px] top-[8px] font-almarai text-[14px] font-[400] leading-[22px] text-left whitespace-nowrap text-[#ffffff]"
            >
              Instagram Reel
            </p>
            <div
              data-figma-node="3047:21347"
              className="box-border w-[20px] h-[20px] absolute left-[149px] top-[9px]"
            />
          </div>
        </div>
        <div
          data-figma-node="3047:21390"
          className="box-border w-[152px] h-[40px] absolute left-[521px] top-[0px] gap-5"
        >
          <div
            data-figma-node="3047:21391"
            className="box-border w-[152px] h-[38px] absolute left-[0px] top-[1px] rounded-[6px] gap-2.5 pr-[16px] pl-[16px]"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <p
              data-figma-node="3047:21395"
              className="box-border w-[90px] h-[22px] absolute left-[16px] top-[8px] font-almarai text-[14px] font-[400] leading-[22px] text-left whitespace-nowrap text-[#ffffff]"
            >
              Sort by newest
            </p>
            <div
              data-figma-node="3047:21396"
              className="box-border w-[20px] h-[20px] absolute left-[116px] top-[9px]"
            />
          </div>
        </div>
      </div>
      {isEmpty ? (
        <p className="sr-only">No content matches your search. Clear the search field to see all items.</p>
      ) : null}
    </section>
  );
}
