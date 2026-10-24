/** luna-spec-codegen: owned-layout */
import "./figma-fonts.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { FigmaOverlayCanvas } from "./FigmaOverlayCanvas";
import { FigmaSection_n_3330_1780 } from "./FigmaSection_n_3330_1780";
import { FigmaSection_n_2295_3500 } from "./FigmaSection_n_2295_3500";
import { FigmaSection_n_2270_14191 } from "./FigmaSection_n_2270_14191";
import { FigmaSection_n_2270_14193 } from "./FigmaSection_n_2270_14193";
import { FigmaSection_n_2270_14699 } from "./FigmaSection_n_2270_14699";
import { FigmaSection_n_3654_11564 } from "./FigmaSection_n_3654_11564";
import { FigmaSection_n_2295_3505 } from "./FigmaSection_n_2295_3505";
import { FigmaSection_n_2729_13112 } from "./FigmaSection_n_2729_13112";
import { FigmaSection_n_2270_16773 } from "./FigmaSection_n_2270_16773";

export function FigmaScreenPage() {
  return (
    <div
      className="relative flex w-full flex-col"
      style={{ backgroundColor: "#0e0d0d" }}
    >
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1920} frameHeight={6943} nodeId="frame">
        <FigmaSection_n_3330_1780 />
        <FigmaSection_n_2295_3500 />
        <FigmaSection_n_2270_14191 />
        <FigmaSection_n_2270_14193 />
        <FigmaSection_n_2270_14699 />
        <FigmaSection_n_3654_11564 />
        <FigmaSection_n_2295_3505 />
        <FigmaSection_n_2729_13112 />
        <FigmaSection_n_2270_16773 />
        </FigmaFrameShell>
      </main>
      <FigmaOverlayCanvas canvasHeight={6943} frameWidth={1920} zIndex={0}>
        <div data-figma-node="2289:17290" className="box-border w-[1964px] h-[2875px] absolute left-[-44px] top-[1929px] block">
          <div data-figma-node="2289:17245" className="box-border w-[1955px] h-[2875px] absolute left-[0px] top-[0px] overflow-hidden opacity-[0.24]">
            <div data-figma-node="2289:17246" className="box-border w-[1925px] h-[3503px] absolute left-[44px] top-[0px] bg-[#000000]"></div>
            <div data-figma-node="2295:3501" className="box-border w-[1920px] h-[3511px] absolute left-[44px] top-[0px] bg-[#000000]"></div>
            <div data-figma-node="2295:3507" className="box-border w-[1256px] h-[1541px] absolute left-[-141px] top-[1955px] rounded-[535px]" style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}></div>
          </div>
          <img data-figma-node="2264:10404" src="/assets/figma/2264-10404.png" alt="Rectangle 2" className="box-border w-[1920px] h-[2875px] absolute left-[44px] top-[0px] max-w-none object-cover object-top" />
        </div>
        <p data-figma-node="2264:10451" className="box-border w-[1394px] h-[110px] absolute left-[263px] top-[2009px] font-eb-garamond text-[84px] font-[400] leading-[110px] text-center whitespace-nowrap text-[#ffffff]">Stunning marketing, in three simple steps</p>
      </FigmaOverlayCanvas>
    </div>
  );
}
