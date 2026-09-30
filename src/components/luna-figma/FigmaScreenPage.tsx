/** luna-spec-codegen: owned-layout */
import "./figma-fonts.css";
import type { FigmaScreenKind } from "./resolve-screen";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { figmaActionProps, useFigmaScreenData } from "./useFigmaScreenData";
import { FigmaSection_n_1091_231 } from "./FigmaSection_n_1091_231";
import { FigmaSection_n_1001_1326 } from "./FigmaSection_n_1001_1326";
import { FigmaSection_n_1001_1330 } from "./FigmaSection_n_1001_1330";
import { FigmaSection_n_998_1033 } from "./FigmaSection_n_998_1033";
import { FigmaSection_n_1001_1328 } from "./FigmaSection_n_1001_1328";
import { FigmaSection_n_2779_25547 } from "./FigmaSection_n_2779_25547";
import { FigmaSection_n_1006_1334 } from "./FigmaSection_n_1006_1334";
import { FigmaSection_n_1006_1336 } from "./FigmaSection_n_1006_1336";
import { FigmaSection_n_1006_1338 } from "./FigmaSection_n_1006_1338";
import { FigmaSection_n_1007_1733 } from "./FigmaSection_n_1007_1733";
import { FigmaSection_n_3158_22054 } from "./FigmaSection_n_3158_22054";
import { FigmaSection_n_3158_22259 } from "./FigmaSection_n_3158_22259";
import { FigmaSection_n_3158_22262 } from "./FigmaSection_n_3158_22262";
import { FigmaSection_n_3158_22607 } from "./FigmaSection_n_3158_22607";
import { FigmaSection_n_3158_22895 } from "./FigmaSection_n_3158_22895";
import { FigmaSection_n_3158_23028 } from "./FigmaSection_n_3158_23028";
import { FigmaSection_n_4543_3497 } from "./FigmaSection_n_4543_3497";
import { FigmaSection_n_5364_6190 } from "./FigmaSection_n_5364_6190";

type FigmaScreenPageProps = {
  screen: FigmaScreenKind;
};

export function FigmaScreenPage({ screen }: FigmaScreenPageProps) {
  const screenData = useFigmaScreenData();

  if (screen === "dashboard") {
    const logoutProps = figmaActionProps("logout");
    return (
      <div data-figma-bound={screenData.bound} className="relative flex w-full flex-col" style={{ backgroundColor: "#0b0b0b" }}>
        <main className="relative z-10 flex w-full flex-col">
          <FigmaFrameShell frameWidth={1440} frameHeight={2628} nodeId="frame">
            <div data-figma-node="4543:3853" className="pointer-events-auto absolute left-[0px] top-[0px] z-[8] box-border h-[840px] w-[240px]">
              <img
                data-figma-node="I4543:3853;1237:1966"
                src="/assets/figma/I4543-3853-1237-1966.png"
                alt="stack"
                className="box-border absolute left-[0px] top-[0px] h-[80px] w-[240px] max-w-none object-cover object-top"
              />
            </div>
            <FigmaSection_n_4543_3497 />
            <FigmaSection_n_5364_6190 />
            <div className="pointer-events-none absolute inset-0 z-[9]">
              <div data-figma-node="3158:22263" className="pointer-events-auto absolute left-[0px] top-[0px] box-border h-[840px] w-[240px]">
                <div
                  data-figma-node="I3158:22263;1237:2189"
                  className="absolute left-[16px] top-[548px] box-border h-[82px] w-[208px] rounded-[10px] border-[1px] border-[rgba(255,255,255,0.2)] bg-[#14100d] pt-[16px] pr-[12px] pb-[16px] pl-[12px]"
                >
                  <p
                    data-figma-node="I3158:22263;1237:2195"
                    className="absolute left-[112px] top-[38px] font-almarai text-[14px] font-[400] leading-[16px] text-[#ffffff]"
                  >
                    {screenData.creditUsageText ?? "1,420 / 5,000"}
                  </p>
                </div>
                <p
                  data-figma-node="I3158:22263;1226:1920"
                  className="absolute left-[54px] top-[653px] font-almarai text-[14px] font-[400] leading-[16px] text-[#ffffff]"
                >
                  {screenData.displayName}
                </p>
                <div
                  data-figma-node="I3158:22263;1237:2201"
                  className="absolute left-[16px] top-[692px] box-border h-[44px] w-[192px] rounded-[8px] pl-[12px] pr-[8px]"
                  {...logoutProps}
                >
                  <p
                    data-figma-node="I3158:22263;1237:2205"
                    className="absolute left-[52px] top-[13px] font-almarai text-[16px] font-[400] leading-[18px] text-[#ffffff] opacity-[0.6]"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </FigmaFrameShell>
        </main>
      </div>
    );
  }

  if (screen === "sign-in") {
    return (
      <div data-figma-bound={screenData.bound} className="relative flex w-full flex-col" style={{ backgroundColor: "#0b0b0b" }}>
        <main className="relative z-10 flex w-full flex-col">
          <FigmaFrameShell frameWidth={1440} frameHeight={850} nodeId="frame">
            <FigmaSection_n_1001_1326 />
            <FigmaSection_n_1001_1330 />
            <FigmaSection_n_1091_231 />
            <FigmaSection_n_998_1033 />
            <FigmaSection_n_1001_1328 />
          </FigmaFrameShell>
        </main>
      </div>
    );
  }

  if (screen === "sign-up") {
    return (
      <div data-figma-bound={screenData.bound} className="relative flex w-full flex-col" style={{ backgroundColor: "#0b0b0b" }}>
        <main className="relative z-10 flex w-full flex-col">
          <FigmaFrameShell frameWidth={1440} frameHeight={850} nodeId="frame">
            <FigmaSection_n_2779_25547 />
            <FigmaSection_n_1006_1334 />
            <FigmaSection_n_1006_1336 />
            <FigmaSection_n_1006_1338 />
            <FigmaSection_n_1007_1733 />
          </FigmaFrameShell>
        </main>
      </div>
    );
  }

  return (
    <div data-figma-bound={screenData.bound} className="relative flex w-full flex-col" style={{ backgroundColor: "#0b0b0b" }}>
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={1218} nodeId="frame">
          <FigmaSection_n_3158_22054 />
          <FigmaSection_n_3158_22259 />
          <FigmaSection_n_3158_22262 />
          <FigmaSection_n_3158_22607 />
          <FigmaSection_n_3158_22895 />
          <FigmaSection_n_3158_23028 />
          <div className="pointer-events-none absolute inset-0 z-[8]">
            <div data-figma-node="3158:22263" className="pointer-events-auto absolute left-[0px] top-[0px] box-border h-[840px] w-[240px]">
              <img
                data-figma-node="I3158:22263;1237:1966"
                src="/assets/figma/I3158-22263-1237-1966.png"
                alt="stack"
                className="box-border absolute left-[0px] top-[0px] h-[80px] w-[240px] max-w-none object-cover object-top"
              />
            </div>
          </div>
        </FigmaFrameShell>
      </main>
    </div>
  );
}
