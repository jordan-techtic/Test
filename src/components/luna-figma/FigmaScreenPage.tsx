/** luna-spec-codegen: owned-layout */
import "./figma-fonts.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { FigmaScreenDataProvider, figmaActionProps, useFigmaScreenData } from "./useFigmaScreenData";
import { resolveFigmaScreen } from "./resolve-screen";
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

export function FigmaScreenPage() {
  return (
    <FigmaScreenDataProvider>
      <FigmaScreenPageInner />
    </FigmaScreenDataProvider>
  );
}

function FigmaScreenPageInner() {
  const screen = resolveFigmaScreen(typeof window !== "undefined" ? window.location.pathname : "/profile");
  const screenData = useFigmaScreenData();

  if (screen === "dashboard") {
    const logoutProps = figmaActionProps("logout");
    return (
      <div data-figma-bound={screenData.bound} className="relative flex w-full flex-col" style={{ backgroundColor: "#0b0b0b" }}>
        <main className="relative z-10 flex w-full flex-col">
          <FigmaFrameShell frameWidth={1440} frameHeight={2628} nodeId="frame">
            <FigmaSection_n_4543_3497 />
            <FigmaSection_n_5364_6190 />
            <div className="pointer-events-none absolute inset-0 z-[8]">
              <div data-figma-node="3158:22263" className="pointer-events-auto box-border w-[240px] h-[840px] absolute left-[0px] top-[0px]">
                <div data-figma-node="I3158:22263;1237:2189" className="box-border w-[208px] h-[82px] absolute left-[16px] top-[548px] rounded-[10px] gap-4 pt-[16px] pr-[12px] pb-[16px] pl-[12px] border-[rgba(255,255,255,0.2)] border-[1px] bg-[#14100d]">
                  <div data-figma-node="I3158:22263;1237:2190" className="box-border w-[184px] h-[50px] absolute left-[12px] top-[16px] gap-2">
                    <div data-figma-node="I3158:22263;1237:2193" className="box-border w-[184px] h-[16px] absolute left-[0px] top-[22px] gap-2">
                      <p data-figma-node="I3158:22263;1237:2195" className="box-border w-[72px] h-[16px] absolute left-[112px] top-[0px] font-almarai text-[14px] font-[400] leading-[15.624px] text-left whitespace-nowrap text-[#ffffff]">{screenData.creditUsageText ?? "1,420 / 5,000"}</p>
                    </div>
                    <div data-figma-node="I3158:22263;1237:2196" className="box-border w-[183px] h-[4px] absolute left-[0px] top-[46px] rounded-full">
                      <div data-figma-node="I3158:22263;1237:2198" className="box-border w-[77px] h-[4px] absolute left-[0px] top-[0px] rounded-full bg-[#c8a47e]" style={{ width: `${screenData.creditProgressPx ?? 77}px` }}></div>
                    </div>
                  </div>
                </div>
                <p data-figma-node="I3158:22263;1226:1920" className="box-border w-[94px] h-[16px] absolute left-[54px] top-[653px] font-almarai text-[14px] font-[400] leading-[15.624px] text-left whitespace-nowrap text-[#ffffff]">{screenData.displayName}</p>
                <div data-figma-node="I3158:22263;1237:2201" className="box-border w-[192px] h-[44px] absolute left-[16px] top-[692px] rounded-[8px] pr-[8px] pl-[12px]" {...logoutProps}>
                  <p data-figma-node="I3158:22263;1237:2205" className="box-border w-[116px] h-[18px] absolute left-[52px] top-[13px] opacity-[0.6] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">Logout</p>
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
            <FigmaSection_n_1091_231 />
            <FigmaSection_n_1001_1326 />
            <FigmaSection_n_1001_1330 />
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
        </FigmaFrameShell>
      </main>
    </div>
  );
}
