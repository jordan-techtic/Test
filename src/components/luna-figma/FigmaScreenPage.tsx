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
import type { FigmaActionBinding } from "./figma-bindings";

const NAV_ITEM_CLASS = "box-border w-[208px] h-[44px] whitespace-nowrap rounded-[8px] pr-[8px] pl-[12px]";
const LOGOUT_ITEM_CLASS = "box-border w-[192px] h-[44px] whitespace-nowrap rounded-[8px] pr-[8px] pl-[12px]";
const CREDIT_STACK_CLASS = "box-border w-[184px] h-[50px] whitespace-nowrap";

type NavOverlayProps = {
  displayName: string;
  creditUsageText?: string;
  creditProgressPx?: number;
  logoutProps?: FigmaActionBinding;
};

function DashboardNavVertical({ displayName, creditUsageText, creditProgressPx, logoutProps }: NavOverlayProps) {
  const progressWidth = creditProgressPx ?? 77;
  return (
    <div data-figma-node="4543:3853" className="pointer-events-auto absolute left-[0px] top-[0px] z-[8] box-border h-[840px] w-[240px]">
      <img
        data-figma-node="I4543:3853;1237:1966"
        src="/assets/figma/I4543-3853-1237-1966.png"
        alt="stack"
        className="box-border absolute left-[0px] top-[0px] h-[80px] w-[240px] max-w-none object-cover object-top"
      />
      <div
        data-figma-node="I4543:3853;1237:2080"
        className="box-border absolute left-[0px] top-[80px] h-[736px] w-[240px] gap-4 pt-[16px] pr-[16px] pl-[16px]"
      >
        <div data-figma-node="I4543:3853;1237:2081" className="box-border absolute left-[16px] top-[16px] h-[404px] w-[208px] gap-2.5">
          <div data-figma-node="I4543:3853;1678:7481" className="box-border absolute left-[0px] top-[0px] h-[160px] w-[208px] gap-1">
            <p
              data-figma-node="I4543:3853;1678:7469"
              className="box-border absolute left-[0px] top-[0px] h-[16px] w-[208px] whitespace-nowrap font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff] opacity-[0.6]"
            >
              Studio
            </p>
            <div
              data-figma-node="I4543:3853;1237:2083"
              className={`absolute left-[0px] top-[20px] ${NAV_ITEM_CLASS} bg-[rgba(255,255,255,0.1)]`}
            >
              <div data-figma-node="I4543:3853;1237:2084" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px] opacity-[0.6]">
                <div data-figma-node="I4543:3853;1656:2137" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                  <div data-figma-node="I4543:3853;1656:2137;7:30534" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                    <img
                      data-figma-node="I4543:3853;1656:2137;7:30535"
                      src="/assets/figma/I4543-3853-1656-2137-7-30535.png"
                      alt=""
                      className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px] max-w-none object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              <div data-figma-node="I4543:3853;1237:2086" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px]">
                <p
                  data-figma-node="I4543:3853;1237:2087"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff]"
                >
                  Overview
                </p>
              </div>
            </div>
            <div data-figma-node="I4543:3853;1237:2102" className={`absolute left-[0px] top-[68px] ${NAV_ITEM_CLASS}`}>
              <div data-figma-node="I4543:3853;1237:2103" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px] opacity-[0.6]">
                <div data-figma-node="I4543:3853;1915:2281" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px] opacity-[0.6]">
                  <div data-figma-node="I4543:3853;1915:2281;7:27327" className="box-border absolute left-[4px] top-[2px] h-[20px] w-[16px]">
                    <div data-figma-node="I4543:3853;1915:2281;7:27328" className="box-border absolute left-[0px] top-[0px] h-[20px] w-[16px]" />
                  </div>
                </div>
              </div>
              <div data-figma-node="I4543:3853;1237:2105" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px] opacity-[0.6]">
                <p
                  data-figma-node="I4543:3853;1237:2106"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff]"
                >
                  Content Library
                </p>
              </div>
            </div>
            <div data-figma-node="I4543:3853;1589:4732" className={`absolute left-[0px] top-[116px] ${NAV_ITEM_CLASS}`}>
              <div data-figma-node="I4543:3853;1589:4733" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px]">
                <div data-figma-node="I4543:3853;1656:2052" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                  <div data-figma-node="I4543:3853;1656:2052;7:38434" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                    <div data-figma-node="I4543:3853;1656:2052;7:38435" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]" />
                  </div>
                </div>
              </div>
              <div data-figma-node="I4543:3853;1589:4735" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px]">
                <p
                  data-figma-node="I4543:3853;1589:4736"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
                >
                  Content Calendar
                </p>
              </div>
            </div>
          </div>
          <div data-figma-node="I4543:3853;1678:7576" className="box-border absolute left-[0px] top-[170px] h-[64px] w-[208px] gap-1">
            <p
              data-figma-node="I4543:3853;1678:7473"
              className="box-border absolute left-[0px] top-[0px] h-[16px] w-[208px] whitespace-nowrap font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff] opacity-[0.6]"
            >
              Tools
            </p>
            <div data-figma-node="I4543:3853;1237:2121" className={`absolute left-[0px] top-[20px] ${NAV_ITEM_CLASS}`}>
              <div data-figma-node="I4543:3853;1237:2122" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px]">
                <div data-figma-node="I4543:3853;1237:2123" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px] overflow-hidden" />
              </div>
              <div data-figma-node="I4543:3853;1237:2128" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px]">
                <p
                  data-figma-node="I4543:3853;1237:2129"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
                >
                  Ultimate Mind
                </p>
              </div>
            </div>
          </div>
          <div data-figma-node="I4543:3853;1678:7645" className="box-border absolute left-[0px] top-[244px] h-[160px] w-[208px] gap-1">
            <p
              data-figma-node="I4543:3853;1678:7477"
              className="box-border absolute left-[0px] top-[0px] h-[16px] w-[208px] whitespace-nowrap font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff] opacity-[0.6]"
            >
              Account
            </p>
            <div data-figma-node="I4543:3853;1237:2144" className={`absolute left-[0px] top-[20px] ${NAV_ITEM_CLASS}`}>
              <div data-figma-node="I4543:3853;1237:2145" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px]">
                <div data-figma-node="I4543:3853;1237:2146" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                  <div data-figma-node="I4543:3853;1660:2149" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px] overflow-hidden" />
                </div>
              </div>
              <div data-figma-node="I4543:3853;1237:2152" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px]">
                <p
                  data-figma-node="I4543:3853;1237:2153"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
                >
                  Announcements
                </p>
              </div>
            </div>
            <div data-figma-node="I4543:3853;1589:4789" className={`absolute left-[0px] top-[68px] ${NAV_ITEM_CLASS}`}>
              <img
                data-figma-node="I4543:3853;1589:4790"
                src="/assets/figma/I4543-3853-1589-4790.png"
                alt=""
                className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] max-w-none object-cover object-top"
              />
              <div data-figma-node="I4543:3853;1589:4797" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px]">
                <p
                  data-figma-node="I4543:3853;1589:4798"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
                >
                  New Features
                </p>
              </div>
            </div>
            <div data-figma-node="I4543:3853;1237:2170" className={`absolute left-[0px] top-[116px] ${NAV_ITEM_CLASS}`}>
              <div data-figma-node="I4543:3853;1237:2171" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px]">
                <div data-figma-node="I4543:3853;1660:2160" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                  <div data-figma-node="I4543:3853;1660:2160;7:31646" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                    <div data-figma-node="I4543:3853;1660:2160;7:31647" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]" />
                  </div>
                </div>
              </div>
              <div data-figma-node="I4543:3853;1237:2173" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px]">
                <p
                  data-figma-node="I4543:3853;1237:2174"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
                >
                  Subscription
                </p>
              </div>
            </div>
          </div>
        </div>
        <div data-figma-node="I4543:3853;1237:2168" className="box-border absolute left-[16px] top-[436px] h-[96px] w-[208px] gap-1" />
        <div
          data-figma-node="I4543:3853;1237:2189"
          className="absolute left-[16px] top-[548px] box-border h-[82px] w-[208px] rounded-[10px] border-[1px] border-[rgba(255,255,255,0.2)] bg-[#14100d] pt-[16px] pr-[12px] pb-[16px] pl-[12px]"
        >
          <div data-figma-node="I4543:3853;1237:2190" className={`absolute left-[12px] top-[16px] ${CREDIT_STACK_CLASS}`}>
            <div data-figma-node="I4543:3853;1237:2191" className="box-border absolute left-[0px] top-[0px] h-[14px] w-[89px] gap-2">
              <p
                data-figma-node="I4543:3853;1237:2192"
                className="box-border absolute left-[0px] top-[0px] h-[14px] w-[89px] whitespace-nowrap text-center font-public-sans text-[12px] font-[600] leading-[14px] text-[#ffffff]"
              >
                AI Credit Usage
              </p>
            </div>
            <div data-figma-node="I4543:3853;1237:2193" className="box-border absolute left-[0px] top-[22px] h-[16px] w-[184px] gap-2">
              <p
                data-figma-node="I4543:3853;1237:2194"
                className="box-border absolute left-[0px] top-[0px] h-[16px] w-[47px] whitespace-nowrap font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff]"
              >
                Current
              </p>
              <p
                data-figma-node="I4543:3853;1237:2195"
                className="box-border absolute left-[112px] top-[0px] h-[16px] w-[72px] whitespace-nowrap font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff]"
              >
                {creditUsageText ?? "1,420 / 5,000"}
              </p>
            </div>
            <div data-figma-node="I4543:3853;1237:2196" className="box-border absolute left-[0px] top-[46px] h-[4px] w-[183px] rounded-full">
              <div
                data-figma-node="I4543:3853;1237:2197"
                className="box-border absolute left-[0px] top-[0px] h-[4px] w-[183px] rounded-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              />
              <div
                data-figma-node="I4543:3853;1237:2198"
                className="box-border absolute left-[0px] top-[0px] h-[4px] rounded-full bg-[#c8a47e]"
                style={{ width: `${progressWidth}px` }}
              />
            </div>
          </div>
        </div>
        <div data-figma-node="I4543:3853;1226:1588" className="box-border absolute left-[16px] top-[646px] h-[30px] w-[208px] gap-2">
          <div data-figma-node="I4543:3853;1245:1514" className="box-border absolute left-[0px] top-[0px] h-[30px] w-[182px] gap-2">
            <div
              data-figma-node="I4543:3853;1226:1589"
              className="box-border absolute left-[0px] top-[0px] h-[30px] w-[30px] rounded-[50px] border-[1px] border-[#333333] pt-[2px] pr-[2px] pb-[2px] pl-[2px]"
            >
              <div
                data-figma-node="I4543:3853;1226:1590"
                className="box-border absolute left-[2px] top-[2px] h-[26px] w-[26px] overflow-hidden rounded-[500px]"
              >
                <img
                  data-figma-node="I4543:3853;1226:1592"
                  src="/assets/figma/I4543-3853-1226-1592.png"
                  alt=""
                  className="box-border absolute left-[-7px] top-[-7px] h-[40px] w-[40px] max-w-none rounded-[500px] object-cover object-top"
                />
              </div>
            </div>
            <p
              data-figma-node="I4543:3853;1226:1920"
              className="box-border absolute left-[38px] top-[7px] h-[16px] w-[94px] whitespace-nowrap font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff]"
            >
              {displayName}
            </p>
          </div>
          <div data-figma-node="I4543:3853;1226:1598" className="box-border absolute left-[190px] top-[5px] h-[20px] w-[20px] opacity-[0.6]" />
        </div>
        <div
          data-figma-node="I4543:3853;1237:2201"
          className={`absolute left-[16px] top-[692px] ${LOGOUT_ITEM_CLASS}`}
          {...logoutProps}
        >
          <div data-figma-node="I4543:3853;1237:2202" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px]">
            <div data-figma-node="I4543:3853;1660:2168" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
              <div data-figma-node="I4543:3853;1660:2168;7:11028" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                <div data-figma-node="I4543:3853;1660:2168;7:11029" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]" />
              </div>
            </div>
          </div>
          <div data-figma-node="I4543:3853;1237:2204" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[132px] pr-[16px]">
            <p
              data-figma-node="I4543:3853;1237:2205"
              className="box-border absolute left-[0px] top-[0px] h-[18px] w-[116px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileNavVertical({ displayName, creditUsageText, creditProgressPx, logoutProps }: NavOverlayProps) {
  const progressWidth = creditProgressPx ?? 77;
  return (
    <div data-figma-node="3158:22263" className="pointer-events-auto absolute left-[0px] top-[0px] z-[8] box-border h-[840px] w-[240px]">
      <img
        data-figma-node="I3158:22263;1237:1966"
        src="/assets/figma/I4543-3853-1237-1966.png"
        alt="stack"
        className="box-border absolute left-[0px] top-[0px] h-[80px] w-[240px] max-w-none object-cover object-top"
      />
      <div
        data-figma-node="I3158:22263;1237:2080"
        className="box-border absolute left-[0px] top-[80px] h-[736px] w-[240px] gap-4 pt-[16px] pr-[16px] pl-[16px]"
      >
        <div data-figma-node="I3158:22263;1237:2081" className="box-border absolute left-[16px] top-[16px] h-[404px] w-[208px] gap-2.5">
          <div data-figma-node="I3158:22263;1678:7481" className="box-border absolute left-[0px] top-[0px] h-[160px] w-[208px] gap-1">
            <p
              data-figma-node="I3158:22263;1678:7469"
              className="box-border absolute left-[0px] top-[0px] h-[16px] w-[208px] whitespace-nowrap font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff] opacity-[0.6]"
            >
              Studio
            </p>
            <div data-figma-node="I3158:22263;1237:2083" className={`absolute left-[0px] top-[20px] ${NAV_ITEM_CLASS}`}>
              <div data-figma-node="I3158:22263;1237:2084" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px] opacity-[0.6]">
                <div data-figma-node="I3158:22263;1656:2137" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                  <div data-figma-node="I3158:22263;1656:2137;7:30534" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                    <img
                      data-figma-node="I3158:22263;1656:2137;7:30535"
                      src="/assets/figma/I3158-22263-1656-2137-7-30535.png"
                      alt=""
                      className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px] max-w-none object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              <div data-figma-node="I3158:22263;1237:2086" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px]">
                <p
                  data-figma-node="I3158:22263;1237:2087"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
                >
                  Overview
                </p>
              </div>
            </div>
            <div data-figma-node="I3158:22263;1237:2102" className={`absolute left-[0px] top-[68px] ${NAV_ITEM_CLASS}`}>
              <div data-figma-node="I3158:22263;1237:2103" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px] opacity-[0.6]">
                <div data-figma-node="I3158:22263;1915:2281" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px] opacity-[0.6]">
                  <div data-figma-node="I3158:22263;1915:2281;7:27327" className="box-border absolute left-[4px] top-[2px] h-[20px] w-[16px]">
                    <div data-figma-node="I3158:22263;1915:2281;7:27328" className="box-border absolute left-[0px] top-[0px] h-[20px] w-[16px]" />
                  </div>
                </div>
              </div>
              <div data-figma-node="I3158:22263;1237:2105" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px] opacity-[0.6]">
                <p
                  data-figma-node="I3158:22263;1237:2106"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff]"
                >
                  Content Library
                </p>
              </div>
            </div>
            <div data-figma-node="I3158:22263;1589:4732" className={`absolute left-[0px] top-[116px] ${NAV_ITEM_CLASS}`}>
              <div data-figma-node="I3158:22263;1589:4733" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px]">
                <div data-figma-node="I3158:22263;1656:2052" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                  <div data-figma-node="I3158:22263;1656:2052;7:38434" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                    <div data-figma-node="I3158:22263;1656:2052;7:38435" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]" />
                  </div>
                </div>
              </div>
              <div data-figma-node="I3158:22263;1589:4735" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px]">
                <p
                  data-figma-node="I3158:22263;1589:4736"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
                >
                  Content Calendar
                </p>
              </div>
            </div>
          </div>
          <div data-figma-node="I3158:22263;1678:7576" className="box-border absolute left-[0px] top-[170px] h-[64px] w-[208px] gap-1">
            <p
              data-figma-node="I3158:22263;1678:7473"
              className="box-border absolute left-[0px] top-[0px] h-[16px] w-[208px] whitespace-nowrap font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff] opacity-[0.6]"
            >
              Tools
            </p>
            <div data-figma-node="I3158:22263;1237:2121" className={`absolute left-[0px] top-[20px] ${NAV_ITEM_CLASS}`}>
              <div data-figma-node="I3158:22263;1237:2122" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px]">
                <div data-figma-node="I3158:22263;1237:2123" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px] overflow-hidden" />
              </div>
              <div data-figma-node="I3158:22263;1237:2128" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px]">
                <p
                  data-figma-node="I3158:22263;1237:2129"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
                >
                  Ultimate Mind
                </p>
              </div>
            </div>
          </div>
          <div data-figma-node="I3158:22263;1678:7645" className="box-border absolute left-[0px] top-[244px] h-[160px] w-[208px] gap-1">
            <p
              data-figma-node="I3158:22263;1678:7477"
              className="box-border absolute left-[0px] top-[0px] h-[16px] w-[208px] whitespace-nowrap font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff] opacity-[0.6]"
            >
              Account
            </p>
            <div data-figma-node="I3158:22263;1237:2144" className={`absolute left-[0px] top-[20px] ${NAV_ITEM_CLASS}`}>
              <div data-figma-node="I3158:22263;1237:2145" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px]">
                <div data-figma-node="I3158:22263;1237:2146" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                  <div data-figma-node="I3158:22263;1660:2149" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px] overflow-hidden" />
                </div>
              </div>
              <div data-figma-node="I3158:22263;1237:2152" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px]">
                <p
                  data-figma-node="I3158:22263;1237:2153"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
                >
                  Announcements
                </p>
              </div>
            </div>
            <div data-figma-node="I3158:22263;1589:4789" className={`absolute left-[0px] top-[68px] ${NAV_ITEM_CLASS}`}>
              <img
                data-figma-node="I3158:22263;1589:4790"
                src="/assets/figma/I3158-22263-1589-4790.png"
                alt=""
                className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] max-w-none object-cover object-top"
              />
              <div data-figma-node="I3158:22263;1589:4797" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px]">
                <p
                  data-figma-node="I3158:22263;1589:4798"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
                >
                  New Features
                </p>
              </div>
            </div>
            <div data-figma-node="I3158:22263;1237:2170" className={`absolute left-[0px] top-[116px] ${NAV_ITEM_CLASS}`}>
              <div data-figma-node="I3158:22263;1237:2171" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px]">
                <div data-figma-node="I3158:22263;1660:2160" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                  <div data-figma-node="I3158:22263;1660:2160;7:31646" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                    <div data-figma-node="I3158:22263;1660:2160;7:31647" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]" />
                  </div>
                </div>
              </div>
              <div data-figma-node="I3158:22263;1237:2173" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[148px] pr-[16px]">
                <p
                  data-figma-node="I3158:22263;1237:2174"
                  className="box-border absolute left-[0px] top-[0px] h-[18px] w-[132px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
                >
                  Subscription
                </p>
              </div>
            </div>
          </div>
        </div>
        <div data-figma-node="I3158:22263;1237:2168" className="box-border absolute left-[16px] top-[436px] h-[96px] w-[208px] gap-1" />
        <div
          data-figma-node="I3158:22263;1237:2189"
          className="absolute left-[16px] top-[548px] box-border h-[82px] w-[208px] rounded-[10px] border-[1px] border-[rgba(255,255,255,0.2)] bg-[#14100d] pt-[16px] pr-[12px] pb-[16px] pl-[12px]"
        >
          <div data-figma-node="I3158:22263;1237:2190" className={`absolute left-[12px] top-[16px] ${CREDIT_STACK_CLASS}`}>
            <div data-figma-node="I3158:22263;1237:2191" className="box-border absolute left-[0px] top-[0px] h-[14px] w-[89px] gap-2">
              <p
                data-figma-node="I3158:22263;1237:2192"
                className="box-border absolute left-[0px] top-[0px] h-[14px] w-[89px] whitespace-nowrap text-center font-public-sans text-[12px] font-[600] leading-[14px] text-[#ffffff]"
              >
                AI Credit Usage
              </p>
            </div>
            <div data-figma-node="I3158:22263;1237:2193" className="box-border absolute left-[0px] top-[22px] h-[16px] w-[184px] gap-2">
              <p
                data-figma-node="I3158:22263;1237:2194"
                className="box-border absolute left-[0px] top-[0px] h-[16px] w-[47px] whitespace-nowrap font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff]"
              >
                Current
              </p>
              <p
                data-figma-node="I3158:22263;1237:2195"
                className="box-border absolute left-[112px] top-[0px] h-[16px] w-[72px] whitespace-nowrap font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff]"
              >
                {creditUsageText ?? "1,420 / 5,000"}
              </p>
            </div>
            <div data-figma-node="I3158:22263;1237:2196" className="box-border absolute left-[0px] top-[46px] h-[4px] w-[183px] rounded-full">
              <div
                data-figma-node="I3158:22263;1237:2197"
                className="box-border absolute left-[0px] top-[0px] h-[4px] w-[183px] rounded-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              />
              <div
                data-figma-node="I3158:22263;1237:2198"
                className="box-border absolute left-[0px] top-[0px] h-[4px] rounded-full bg-[#c8a47e]"
                style={{ width: `${progressWidth}px` }}
              />
            </div>
          </div>
        </div>
        <div data-figma-node="I3158:22263;1226:1588" className="box-border absolute left-[16px] top-[646px] h-[30px] w-[208px] gap-2">
          <div data-figma-node="I3158:22263;1245:1514" className="box-border absolute left-[0px] top-[0px] h-[30px] w-[182px] gap-2">
            <div
              data-figma-node="I3158:22263;1226:1589"
              className="box-border absolute left-[0px] top-[0px] h-[30px] w-[30px] rounded-[50px] border-[1px] border-[#333333] pt-[2px] pr-[2px] pb-[2px] pl-[2px]"
            >
              <div
                data-figma-node="I3158:22263;1226:1590"
                className="box-border absolute left-[2px] top-[2px] h-[26px] w-[26px] overflow-hidden rounded-[500px]"
              >
                <img
                  data-figma-node="I3158:22263;1226:1592"
                  src="/assets/figma/I3158-22263-1226-1592.png"
                  alt=""
                  className="box-border absolute left-[-7px] top-[-7px] h-[40px] w-[40px] max-w-none rounded-[500px] object-cover object-top"
                />
              </div>
            </div>
            <p
              data-figma-node="I3158:22263;1226:1920"
              className="box-border absolute left-[38px] top-[7px] h-[16px] w-[94px] whitespace-nowrap font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff]"
            >
              {displayName}
            </p>
          </div>
          <div data-figma-node="I3158:22263;1226:1598" className="box-border absolute left-[190px] top-[5px] h-[20px] w-[20px] opacity-[0.6]" />
        </div>
        <div
          data-figma-node="I3158:22263;1237:2201"
          className={`absolute left-[16px] top-[692px] ${LOGOUT_ITEM_CLASS}`}
          {...logoutProps}
        >
          <div data-figma-node="I3158:22263;1237:2202" className="box-border absolute left-[12px] top-[10px] h-[24px] w-[40px] pr-[16px]">
            <div data-figma-node="I3158:22263;1660:2168" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
              <div data-figma-node="I3158:22263;1660:2168;7:11028" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]">
                <div data-figma-node="I3158:22263;1660:2168;7:11029" className="box-border absolute left-[0px] top-[0px] h-[24px] w-[24px]" />
              </div>
            </div>
          </div>
          <div data-figma-node="I3158:22263;1237:2204" className="box-border absolute left-[52px] top-[13px] h-[18px] w-[132px] pr-[16px]">
            <p
              data-figma-node="I3158:22263;1237:2205"
              className="box-border absolute left-[0px] top-[0px] h-[18px] w-[116px] whitespace-nowrap font-almarai text-[16px] font-[400] leading-[18px] text-left text-[#ffffff] opacity-[0.6]"
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
            <DashboardNavVertical
              displayName={screenData.displayName}
              creditUsageText={screenData.creditUsageText}
              creditProgressPx={screenData.creditProgressPx}
              logoutProps={logoutProps}
            />
            <FigmaSection_n_4543_3497 />
            <FigmaSection_n_5364_6190 />
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

  const logoutProps = figmaActionProps("logout");

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
            <ProfileNavVertical
              displayName={screenData.displayName}
              creditUsageText={screenData.creditUsageText}
              creditProgressPx={screenData.creditProgressPx}
              logoutProps={logoutProps}
            />
          </div>
        </FigmaFrameShell>
      </main>
    </div>
  );
}
