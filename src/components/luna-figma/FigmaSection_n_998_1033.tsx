/** luna-spec-codegen: owned-layout */
import { figmaActionProps, figmaFieldProps } from "./useFigmaScreenData";

export function FigmaSection_n_998_1033() {
  const submitProps = figmaActionProps("submit");

  return (
    <section data-figma-node="998:1033" id="contact" className="absolute box-border left-[100px] top-[152px] w-[461px] h-[545px] pr-[4px] pl-[4px] flex flex-col items-center gap-[30px] z-[3]">
      <img data-figma-node="1001:1195" src="/assets/figma/1001-1195.png" alt="Group 33654336" className="box-border w-[164px] h-[55px] max-w-none object-cover object-top" />
      <p data-figma-node="1001:1194" className="box-border w-[351px] h-[50px] font-eb-garamond text-[38px] font-[500] leading-[50px] text-center whitespace-nowrap text-[#ffffff]">Welcome to Agentwise</p>
      <p data-figma-node="1018:1276" className="box-border w-[453px] h-[28px] opacity-[0.6] font-almarai text-[18px] font-[400] leading-[28px] text-center whitespace-nowrap text-[#ffffff]">Everything you need to create standout real estate content.</p>
      <div data-figma-node="998:1097" className="box-border w-[461px] h-[164px] relative gap-5">
        <div data-figma-node="998:1132" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
          <input data-figma-node="998:1138" name="email" data-figma-field="email" {...figmaFieldProps("email")} type="email" placeholder="Email" aria-label="Email" className="box-border w-[421px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
        </div>
        <div data-figma-node="998:1148" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[72px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
          <input data-figma-node="998:1154" name="password" data-figma-field="password" {...figmaFieldProps("password")} type="text" placeholder="Password" aria-label="Password" className="box-border w-[421px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
          <div data-figma-node="998:1155" className="box-border w-[40px] h-[40px] absolute left-[411px] top-[6px]">
            <div data-figma-node="998:1156" className="box-border w-[40px] h-[40px] absolute left-[0px] top-[0px] rounded-[500px]">
              <div data-figma-node="998:1157" className="box-border w-[24px] h-[24px] absolute left-[8px] top-[8px]"></div>
            </div>
          </div>
        </div>
        <div data-figma-node="1001:1033" className="box-border w-[461px] h-[20px] absolute left-[0px] top-[144px] gap-2">
          <div data-figma-node="1001:1026" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px]">
            <div data-figma-node="1001:1027" className="box-border w-[17px] h-[17px] absolute left-[2px] top-[2px] rounded-[4.17px]"></div>
            <div data-figma-node="1001:1028" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px]">
              <div data-figma-node="1001:1029" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px]"></div>
            </div>
          </div>
          <p data-figma-node="1001:1025" className="box-border w-[286px] h-[16px] absolute left-[28px] top-[2px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap text-[#ffffff]">Remember me</p>
          <p data-figma-node="1001:1034" className="box-border w-[139px] h-[16px] absolute left-[322px] top-[2px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-right whitespace-nowrap text-[#ffffff]">Forgot your password?</p>
        </div>
      </div>
      <a data-figma-node="998:1335" href="/login" className="box-border w-[461px] h-[52px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90" style={{backgroundColor: "rgba(200, 164, 126, 0.5)"}} {...submitProps}><span className="font-almarai text-[18px] font-[400] leading-[20px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">Sign In</span></a>
      <div data-figma-node="1001:1035" className="box-border w-[461px] h-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.2)"}} />
      <p data-figma-node="1001:1036" className="box-border w-[461px] h-[16px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-center whitespace-nowrap text-[#ffffff]"><span className="text-[#ffffff]">Not a member yet? </span><span className="text-[#c8a47e]">Sign up here.</span></p>
    </section>
  );
}
