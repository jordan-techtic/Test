/** luna-spec-codegen: owned-layout */
import './figma-fonts.css';

import type { VisitorHomeContent } from '../../types/visitor-home';
import { FigmaFrameShell } from './FigmaFrameShell';
import { FigmaSection_n_2270_14191 } from './FigmaSection_n_2270_14191';
import { FigmaSection_n_2270_14193 } from './FigmaSection_n_2270_14193';
import { FigmaSection_n_2270_14699 } from './FigmaSection_n_2270_14699';
import { FigmaSection_n_2270_16773 } from './FigmaSection_n_2270_16773';
import { FigmaSection_n_2295_3500 } from './FigmaSection_n_2295_3500';
import { FigmaSection_n_2295_3505 } from './FigmaSection_n_2295_3505';
import { FigmaSection_n_2729_13112 } from './FigmaSection_n_2729_13112';
import { FigmaSection_n_3330_1780 } from './FigmaSection_n_3330_1780';
import { FigmaSection_n_3654_11564 } from './FigmaSection_n_3654_11564';

type VisitorHomeStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

interface FigmaHomePageProps {
  visitorHome: VisitorHomeContent | null;
  apiStatus: VisitorHomeStatus;
  apiError: string | null;
}

export function FigmaHomePage({ visitorHome, apiStatus, apiError }: FigmaHomePageProps) {
  const contactEmail = visitorHome?.contact_email ?? 'hello@agentwisemarketing.com';
  const termsLink = visitorHome?.terms_of_service_link ?? '#';
  const privacyLink = visitorHome?.privacy_policy_link ?? '#';
  const phone = visitorHome?.phone ?? '';

  return (
    <div className="relative flex w-full flex-col bg-[#000000]">
      {apiStatus === 'error' && apiError ? (
        <div
          role="alert"
          className="relative z-20 w-full bg-[#2f271f] px-4 py-2 text-center font-almarai text-[14px] text-[#ffffff]"
        >
          Unable to load latest content.
        </div>
      ) : null}
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1920} frameHeight={6943} nodeId="2241:1459">
          <FigmaSection_n_3330_1780 />
          <section
            id="content"
            data-figma-node="2264:10403"
            className="absolute box-border left-[-22px] top-[1010px] w-[1964px] h-[2875px] overflow-hidden block"
          >
            <div
              data-figma-node="2264:10404"
              className="box-border w-[1964px] h-[2875px] absolute left-[0px] top-[0px] overflow-hidden"
            >
              <img
                data-figma-node="2264:10404"
                src="/assets/figma/2264-10404.png"
                alt=""
                className="box-border w-[1964px] h-[2875px] absolute left-[0px] top-[0px] max-w-none object-cover object-top"
              />
              <img
                data-figma-node="I2295-3482-65-2286"
                src="/assets/figma/I2295-3482-65-2286.png"
                alt=""
                className="box-border w-[317px] h-[553px] absolute left-[0px] top-[186px] max-w-none object-cover object-top"
              />
              <img
                data-figma-node="I2295-3482-65-2287"
                src="/assets/figma/I2295-3482-65-2287.png"
                alt=""
                className="box-border w-[317px] h-[553px] absolute left-[317px] top-[186px] max-w-none object-cover object-top"
              />
              <img
                data-figma-node="I2295-3482-65-2288"
                src="/assets/figma/I2295-3482-65-2288.png"
                alt=""
                className="box-border w-[316px] h-[551px] absolute left-[634px] top-[186px] max-w-none object-cover object-top"
              />
              <img
                data-figma-node="I2295-3482-65-2289"
                src="/assets/figma/I2295-3482-65-2289.png"
                alt=""
                className="box-border w-[317px] h-[553px] absolute left-[951px] top-[186px] max-w-none object-cover object-top"
              />
              <img
                data-figma-node="I2295-3482-65-2291"
                src="/assets/figma/I2295-3482-65-2291.png"
                alt=""
                className="box-border w-[317px] h-[553px] absolute left-[1268px] top-[186px] max-w-none object-cover object-top"
              />
              <img
                data-figma-node="I2295-3482-323-1642"
                src="/assets/figma/I2295-3482-323-1642.png"
                alt=""
                className="box-border w-[317px] h-[553px] absolute left-[323px] top-[739px] max-w-none object-cover object-top"
              />
              <img
                data-figma-node="I2295-3482-323-1647"
                src="/assets/figma/I2295-3482-323-1647.png"
                alt=""
                className="box-border w-[317px] h-[553px] absolute left-[640px] top-[739px] max-w-none object-cover object-top"
              />
            </div>
          </section>
          <div
            data-figma-node="2264:10405"
            className="box-border w-[1394px] h-[110px] absolute left-[263px] top-[2009px] bg-[#ffffff]"
          >
            <p
              data-figma-node="2264:10451"
              className="box-border w-[1394px] h-[110px] font-eb-garamond text-[84px] font-[400] leading-[110px] text-center whitespace-nowrap text-[#ffffff]"
            >
              Stunning marketing, in three simple steps
            </p>
          </div>
          <FigmaSection_n_2295_3500 />
          <FigmaSection_n_2270_14191 />
          <FigmaSection_n_2270_14193 />
          <FigmaSection_n_2270_14699 />
          <FigmaSection_n_3654_11564 />
          <FigmaSection_n_2295_3505 />
          <FigmaSection_n_2729_13112 />
          <FigmaSection_n_2270_16773
            contactEmail={contactEmail}
            phone={phone}
            termsLink={termsLink}
            privacyLink={privacyLink}
          />
        </FigmaFrameShell>
      </main>
    </div>
  );
}
