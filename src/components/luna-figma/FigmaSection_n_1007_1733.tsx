/** luna-spec-codegen: owned-layout */
import { useSignUp } from '../../features/auth/useSignUp';

const SIGNUP_TERMS_ID = 'signup-terms-accept';

export function FigmaSection_n_1007_1733() {
  const { termsAccepted, setTermsAccepted, submit, canSubmit } = useSignUp();

  return (
    <section data-figma-node="1007:1733" id="contact" className="absolute box-border left-[100px] top-[106px] mt-[8px] w-[461px] h-[639px] pr-[149px] pl-[148px] flex flex-col items-center gap-[30px] z-[4]">
      <img data-figma-node="1007:1734" src="/assets/figma/1007-1734.png" alt="Group 33654336" className="box-border w-[164px] h-[55px] max-w-none object-cover object-top" />
      <div data-figma-node="1915:2241" className="box-border w-[461px] h-[130px] relative gap-2.5">
        <p data-figma-node="1007:1847" className="box-border w-[461px] h-[100px] absolute left-[0px] top-[0px] font-eb-garamond text-[38px] font-[500] leading-[50px] text-center text-[#ffffff]">Great Marketing Made Easier. Specifically for Agents</p>
        <p data-figma-node="1915:2239" className="box-border w-[204px] h-[20px] absolute left-[128px] top-[110px] opacity-[0.6] font-almarai text-[18px] font-[400] leading-[20px] text-center whitespace-nowrap text-[#ffffff]">Create your account today</p>
      </div>
      <div data-figma-node="1007:1848" className="box-border w-[461px] h-[236px] relative gap-5">
        <div data-figma-node="1007:1849" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[0px] gap-5">
          <div data-figma-node="1007:1850" className="box-border w-[220px] h-[52px] absolute left-[0px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <input data-figma-node="1007:1856" type="text" placeholder="First Name" aria-label="First Name" className="box-border w-[180px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
          </div>
          <div data-figma-node="1007:1861" className="box-border w-[220px] h-[52px] absolute left-[240px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <input data-figma-node="1007:1867" type="text" placeholder="Last Name" aria-label="Last Name" className="box-border w-[180px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
          </div>
        </div>
        <div data-figma-node="1007:1872" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[72px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
          <input data-figma-node="1007:1878" type="email" placeholder="Email" aria-label="Email" className="box-border w-[421px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
        </div>
        <div data-figma-node="1007:1899" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[144px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
          <input data-figma-node="1007:1905" type="text" placeholder="Create a Password" aria-label="Create a Password" className="box-border w-[421px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
          <div data-figma-node="1007:1906" className="box-border w-[40px] h-[40px] absolute left-[411px] top-[6px]">
            <div data-figma-node="1007:1907" className="box-border w-[40px] h-[40px] absolute left-[0px] top-[0px] rounded-[500px]">
              <div data-figma-node="1007:1908" className="box-border w-[24px] h-[24px] absolute left-[8px] top-[8px]"></div>
            </div>
          </div>
        </div>
        <div data-figma-node="1007:1915" className="box-border w-[461px] h-[20px] absolute left-[0px] top-[216px] flex items-start gap-2">
          <input
            id={SIGNUP_TERMS_ID}
            type="checkbox"
            data-figma-node="1007:1917"
            aria-label="Checkbox"
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
            className="box-border mt-[2px] h-[17px] w-[17px] shrink-0 rounded-[4.17px] border border-[rgba(200,164,126,0.05)] bg-transparent accent-[#c8a47e]"
          />
          <label
            htmlFor={SIGNUP_TERMS_ID}
            data-figma-node="1007:1922"
            className="box-border w-[433px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-left text-[#ffffff]"
          >
            I have read and agree to the Terms of Use and Privacy Policy.
          </label>
        </div>
      </div>
      <button
        type="button"
        data-figma-node="1007:1923"
        disabled={!canSubmit}
        onClick={() => void submit()}
        className="box-border w-[461px] h-[52px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        style={{backgroundColor: "rgba(200, 164, 126, 0.5)"}}
      >
        <span className="font-almarai text-[18px] font-[400] leading-[20px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">
          Sign Up
        </span>
      </button>
      <div data-figma-node="1007:1925" className="box-border w-[461px] h-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.2)"}} />
      <p data-figma-node="1007:1926" className="box-border w-[461px] h-[16px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-center whitespace-nowrap text-[#ffffff]"><span className="text-[#ffffff]">Already have an account? </span><span className="text-[#c8a47e]">Sign in</span></p>
    </section>
  );
}
