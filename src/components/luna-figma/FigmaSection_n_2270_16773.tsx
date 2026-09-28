/** luna-spec-codegen: owned-layout */
export interface FigmaSection_n_2270_16773Props {
  privacyPolicyLink?: string;
  termsOfServiceLink?: string;
  contactEmail?: string;
  phone?: string;
  visitorHomeError?: string | null;
  visitorHomeLoading?: boolean;
}

export function FigmaSection_n_2270_16773({
  privacyPolicyLink = '/privacy-policy',
  termsOfServiceLink = '/terms-of-service',
  contactEmail = 'hello@agentwisemarketing.com',
  phone,
  visitorHomeError,
  visitorHomeLoading,
}: FigmaSection_n_2270_16773Props = {}) {
  return (
    <section data-figma-node="2270:16773" className="absolute box-border left-[0px] top-[6619px] w-[1920px] h-[324px] block bg-[#000000] z-[4]">
      <div data-figma-node="2270:16774" className="box-border w-[1920px] h-[324px] absolute left-[0px] top-[0px] bg-[#000000]"></div>
      <div data-figma-node="2270:16775" className="box-border w-[495px] h-[25px] absolute left-[210px] top-[187px] gap-9">
        <a data-figma-node="2270:16776" href="#about" className="box-border w-[57px] h-[25px] absolute left-[0px] top-[0px] font-almarai text-[22px] font-[400] leading-[25px] text-left whitespace-nowrap text-[#ffffff]">About</a>
        <a data-figma-node="2270:16777" href="#content" className="box-border w-[77px] h-[25px] absolute left-[93px] top-[0px] font-almarai text-[22px] font-[400] leading-[25px] text-left whitespace-nowrap text-[#ffffff]">Content</a>
        <a data-figma-node="2270:16778" href="#pricing" className="box-border w-[67px] h-[25px] absolute left-[206px] top-[0px] font-almarai text-[22px] font-[400] leading-[25px] text-left whitespace-nowrap text-[#ffffff]">Pricing</a>
        <a data-figma-node="2270:16780" href="#blog" className="box-border w-[44px] h-[25px] absolute left-[309px] top-[0px] font-almarai text-[22px] font-[400] leading-[25px] text-left whitespace-nowrap text-[#ffffff]">Blog</a>
        <a data-figma-node="2270:16781" href="#contact" className="box-border w-[106px] h-[25px] absolute left-[389px] top-[0px] font-almarai text-[22px] font-[400] leading-[25px] text-left whitespace-nowrap text-[#ffffff]">Contact Us</a>
      </div>
      <img data-figma-node="2270:16782" src="/assets/figma/2270-16782.png" alt="Group 33654336" className="box-border w-[233px] h-[78px] absolute left-[210px] top-[70px] max-w-none object-cover object-top" />
      <p data-figma-node="2270:16895" className="box-border w-[330px] h-[27px] absolute left-[1380px] top-[186px] font-almarai text-[24px] font-[400] leading-[27px] text-right whitespace-nowrap text-[#ffffff]">
        {phone ? `${contactEmail} · ${phone}` : contactEmail}
      </p>
      <img data-figma-node="2270:16896" src="/assets/figma/2270-16896.png" alt="List" className="box-border w-[186px] h-[54px] absolute left-[1524px] top-[82px] max-w-none object-cover object-top" />
      <div data-figma-node="2270:16913" className="box-border w-[1500px] h-[1px] absolute left-[210px] top-[270px]" style={{backgroundColor: "rgba(224, 224, 224, 0.5)"}} />
      <div data-figma-node="2270:16914" className="box-border w-[245px] h-[18px] absolute left-[1465px] top-[290px] opacity-[0.6] gap-4">
        <a data-figma-node="2270:16915" href={termsOfServiceLink} className="box-border w-[116px] h-[18px] absolute left-[0px] top-[0px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff] hover:opacity-90">Terms of Service</a>
        <div data-figma-node="2270:16916" className="box-border w-[1px] h-[17px] absolute left-[132px] top-[0px] bg-[#e0e0e0]" />
        <a data-figma-node="2270:16917" href={privacyPolicyLink} className="box-border w-[97px] h-[18px] absolute left-[148px] top-[0px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff] hover:opacity-90">Privacy Policy</a>
      </div>
      <p data-figma-node="2270:16918" className="box-border w-[269px] h-[18px] absolute left-[210px] top-[290px] opacity-[0.6] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">© 2026 Agentwise. All Rights Reserved.</p>
      {visitorHomeLoading ? (
        <p role="status" className="absolute left-[210px] top-[250px] font-almarai text-[12px] text-[#ffffff] opacity-60">
          Loading…
        </p>
      ) : null}
      {visitorHomeError ? (
        <p role="status" className="absolute left-[210px] top-[250px] font-almarai text-[12px] text-[#ffffff] opacity-60">
          {visitorHomeError}
        </p>
      ) : null}
    </section>
  );
}
