/** luna-spec-codegen: owned-layout */
type ContentCardProps = {
  frameNode: string;
  dayNode: string;
  day: string;
  typeNode: string;
  typeLabel: string;
  imgNode: string;
  imgSrc: string;
  captionNode: string;
  caption: string;
  lineNode: string;
  tagNode: string;
  tag: string;
  left: string;
};

function ContentWeekCard({
  frameNode,
  dayNode,
  day,
  typeNode,
  typeLabel,
  imgNode,
  imgSrc,
  captionNode,
  caption,
  lineNode,
  tagNode,
  tag,
  left,
}: ContentCardProps) {
  return (
    <div
      data-figma-node={frameNode}
      className={`box-border absolute ${left} top-[0px] h-[447px] w-[250px] rounded-[10px] border-[1px] border-[rgba(200,164,126,0.05)] pt-[16px] pr-[16px] pb-[16px] pl-[16px]`}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <div data-figma-node={`${frameNode}-hdr`} className="box-border relative h-[83px] w-[218px]">
        <p
          data-figma-node={dayNode}
          className="absolute left-[0px] top-[17px] font-almarai text-[14px] font-[400] leading-[16px] text-[#828282]"
        >
          {day}
        </p>
        <p
          data-figma-node={typeNode}
          className="absolute right-[0px] top-[0px] font-almarai text-[16px] font-[400] leading-[18px] text-[#c8a47e]"
        >
          {typeLabel}
        </p>
      </div>
      <div className="absolute left-[16px] top-[50px] box-border h-[381px] w-[218px]">
        <img
          data-figma-node={imgNode}
          src={imgSrc}
          alt=""
          className="absolute left-[0px] top-[0px] h-[381px] w-[218px] max-w-none rounded-[10px] object-cover object-top"
        />
        <div
          className="absolute left-[3px] top-[357px] box-border w-[211px] rounded-[4px] bg-[#ffffff] pt-[8px] pr-[7px] pb-[8px] pl-[7px]"
        >
          <p
            data-figma-node={captionNode}
            className="font-almarai text-[14px] font-[400] leading-[16px] text-[#000000]"
          >
            {caption}
          </p>
          <div
            data-figma-node={lineNode}
            className="box-border mt-[8px] h-[1px] w-[197px] bg-[#e0e0e0]"
          />
          <p data-figma-node={tagNode} className="mt-[8px] font-almarai text-[10px] font-[300] leading-[11px] text-[#000000]">
            {tag}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FigmaSection_n_4543_3497() {
  return (
    <section data-figma-node="4543:3497" id="content" className="absolute box-border left-[240px] top-[0px] w-[1190px] h-[2628px] block z-[0]">
      <div data-figma-node="4543:3498" className="box-border w-[1190px] h-[1866px] absolute left-[0px] top-[10px] rounded-[16px_16px_0px_0px] shadow-[-3px_0px_25px_0px_rgba(0,0,0,0.1)] gap-[30px] pt-[30px] pr-[30px] pb-[30px] pl-[30px]" style={{backgroundImage: "linear-gradient(180.0deg, rgba(200, 164, 126, 0.2) 0.0%, rgba(98, 80, 62, 0) 100.0%)"}}></div>
      <div data-figma-node="4543:3507" className="box-border w-[1130px] h-[2548px] absolute left-[30px] top-[40px] gap-[30px]">
        <img data-figma-node="4644:5834" src="/assets/figma/4644-5834.png" alt="Group 33654450" className="box-border w-[1113px] h-[522px] absolute left-[8px] top-[66px] max-w-none object-cover object-top" />
        <h1 data-figma-node="4543:3510" className="box-border w-[345px] h-[55px] absolute left-[0px] top-[0px] font-eb-garamond text-[42px] font-[500] leading-[55px] text-left whitespace-nowrap text-[#ffffff]">Good morning, Ava.</h1>
        <div data-figma-node="4543:3508" className="box-border w-[1130px] h-[487px] absolute left-[0px] top-[85px] rounded-[16px] gap-5 pt-[24px] pr-[24px] pb-[24px] pl-[24px]" style={{backgroundColor: "rgba(26, 26, 25, 0.5)"}}>
          <div data-figma-node="4559:6049" className="box-border w-[1106px] h-[439px] absolute left-[24px] top-[24px] gap-5">
            <div data-figma-node="I4559:6049;4559:6109" className="box-border w-[1106px] h-[415px] absolute left-[0px] top-[0px]">
              <div data-figma-node="I4559:6049;4559:5861" className="box-border w-[710px] h-[415px] absolute left-[0px] top-[0px] gap-5">
                <div data-figma-node="I4559:6049;4559:5862" className="box-border w-[710px] h-[302px] absolute left-[0px] top-[57px] gap-8">
                  <div data-figma-node="I4559:6049;4559:5863" className="box-border w-[710px] h-[148px] absolute left-[0px] top-[0px] gap-4">
                    <p data-figma-node="I4559:6049;4559:5864" className="box-border w-[710px] h-[60px] absolute left-[0px] top-[0px] font-eb-garamond text-[24px] font-[500] leading-[30px] text-left text-[#c8a47e]">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <p data-figma-node="I4559:6049;4559:5865" className="box-border w-[710px] h-[72px] absolute left-[0px] top-[76px] opacity-[0.6] font-almarai text-[16px] font-[400] leading-[24px] text-left text-[#ffffff]">Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.</p>
                  </div>
                  <div data-figma-node="I4559:6049;4559:5866" className="box-border w-[710px] h-[122px] absolute left-[0px] top-[180px] gap-6">
                    <div data-figma-node="I4559:6049;4559:5867" className="box-border w-[710px] h-[50px] absolute left-[0px] top-[0px] rounded-[10px] gap-2.5 pr-[20px] pl-[20px]" style={{backgroundColor: "rgba(255, 255, 255, 0.1)"}}>
                      <p data-figma-node="I4559:6049;4559:5870" className="box-border w-[533px] h-[16px] absolute left-[48px] top-[17px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap text-[#ffffff]">Generate captions, listing descriptions, email blasts, and Reels scripts in your brand voice.</p>
                    </div>
                    <div data-figma-node="I4559:6049;4559:5871" className="box-border w-[396px] h-[48px] absolute left-[0px] top-[74px] gap-2.5">
                      <a data-figma-node="I4559:6049;4559:5872" href="#contact" className="box-border w-[169px] h-[48px] absolute left-[0px] top-[0px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90" style={{backgroundColor: "rgba(200, 164, 126, 0.5)"}}><span data-figma-node="I4559:6049;4559:5879" className="font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">Plan My Week</span></a>
                      <a data-figma-node="I4559:6049;4559:5888" href="#contact" className="box-border w-[217px] h-[48px] absolute left-[179px] top-[0px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90" style={{backgroundColor: "rgba(255, 255, 255, 0.3)"}}><span data-figma-node="I4559:6049;4559:5902" className="font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">My Content Calendar</span></a>
                    </div>
                  </div>
                </div>
              </div>
              <div data-figma-node="I4559:6049;4559:5903" className="box-border w-[326px] h-[415px] absolute left-[780px] top-[0px] overflow-hidden gap-2.5">
                <div data-figma-node="I4559:6049;4559:5904" className="box-border w-[326px] h-[24px] absolute left-[0px] top-[0px] gap-2.5 pr-[24px]">
                  <p data-figma-node="I4559:6049;4559:5905" className="box-border w-[114px] h-[24px] absolute left-[0px] top-[0px] font-almarai text-[16px] font-[400] leading-[24px] text-left whitespace-nowrap text-[#ffffff]">Announcements</p>
                  <div data-figma-node="I4559:6049;4559:5906" className="box-border w-[50px] h-[20px] absolute left-[252px] top-[2px] gap-2.5">
                    <div data-figma-node="I4559:6049;4559:5907" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px] opacity-[0.6]"></div>
                    <div data-figma-node="I4559:6049;4559:5910" className="box-border w-[20px] h-[20px] absolute left-[30px] top-[0px] opacity-[0.6]"></div>
                  </div>
                </div>
                <div data-figma-node="I4559:6049;4559:5913" className="box-border w-[326px] h-[381px] absolute left-[0px] top-[34px] overflow-hidden gap-4">
                  <img data-figma-node="I4559:6049;4559:5914" src="/assets/figma/I4559-6049-4559-5914.png" alt="attLgjgQKNGEFOHWZ-large-IMG_6232 5" className="box-border w-[219px] h-[381px] absolute left-[0px] top-[0px] rounded-[10px] max-w-none object-cover object-top" />
                  <img data-figma-node="I4559:6049;4559:5915" src="/assets/figma/I4559-6049-4559-5915.png" alt="attLgjgQKNGEFOHWZ-large-IMG_6232 7" className="box-border w-[219px] h-[381px] absolute left-[235px] top-[0px] rounded-[10px] max-w-none object-cover object-top" />
                </div>
                <div data-figma-node="I4559:6049;4559:5916" className="box-border w-[71px] h-[451px] absolute left-[286px] top-[-4px] blur-[25px] pointer-events-none bg-[#1b1b1b]"></div>
              </div>
            </div>
            <div data-figma-node="I4559:6049;4559:6100" className="box-border w-[108px] h-[4px] absolute left-[499px] top-[435px] gap-1.5">
              <div data-figma-node="I4559:6049;4559:6101" className="box-border w-[32px] h-[4px] absolute left-[0px] top-[0px] rounded-full bg-[#c8a47e]"></div>
              <div data-figma-node="I4559:6049;4559:6102" className="box-border w-[32px] h-[4px] absolute left-[38px] top-[0px] rounded-full opacity-[0.6] bg-[#ffffff]"></div>
              <div data-figma-node="I4559:6049;4559:6103" className="box-border w-[32px] h-[4px] absolute left-[76px] top-[0px] rounded-full opacity-[0.6] bg-[#ffffff]"></div>
            </div>
          </div>
        </div>
        <div data-figma-node="4543:4207" className="absolute left-[0px] top-[602px] box-border h-[506px] w-[1130px] overflow-hidden">
          <div data-figma-node="4543:4208" className="relative box-border h-[83px] w-[1130px]">
            <p
              data-figma-node="4543:4210"
              className="absolute left-[0px] top-[0px] font-eb-garamond text-[30px] font-[500] leading-[39px] text-[#ffffff]"
            >
              New Content This Week
            </p>
            <p
              data-figma-node="4543:4212"
              className="absolute left-[1058px] top-[10px] font-almarai text-[16px] font-[400] leading-[18px] text-[#ffffff]"
            >
              Browse all
            </p>
          </div>
          <div data-figma-node="4543:4213" className="absolute left-[0px] top-[59px] box-border h-[447px] w-[1130px]">
            <ContentWeekCard
              frameNode="4543:4214"
              dayNode="4543:4216"
              day="Mon"
              typeNode="4543:4217"
              typeLabel="Reels"
              imgNode="4543:4218"
              imgSrc="/assets/figma/4543-4218.png"
              captionNode="I4543:4219;741:2399"
              caption="Hates to see me coming"
              lineNode="I4543:4219;741:2400"
              tagNode="I4543:4219;741:2402"
              tag="Instagram Feed"
              left="left-[0px]"
            />
            <ContentWeekCard
              frameNode="4543:4278"
              dayNode="4543:4280"
              day="Tue"
              typeNode="4543:4281"
              typeLabel="Reels"
              imgNode="4543:4283"
              imgSrc="/assets/figma/4543-4283.png"
              captionNode="I4543:4284;741:2399"
              caption="[City Name win], hallelujah | Justin Bieber Trend"
              lineNode="I4543:4284;741:2400"
              tagNode="I4543:4284;741:2402"
              tag="Instagram Reel"
              left="left-[260px]"
            />
            <ContentWeekCard
              frameNode="4543:4220"
              dayNode="4543:4222"
              day="Wed"
              typeNode="4543:4223"
              typeLabel="Story"
              imgNode="4543:4232"
              imgSrc="/assets/figma/4543-4232.png"
              captionNode="I4543:4233;741:2399"
              caption="Story"
              lineNode="I4543:4233;741:2400"
              tagNode="I4543:4233;741:2402"
              tag="Instagram Stories"
              left="left-[521px]"
            />
            <ContentWeekCard
              frameNode="4543:4234"
              dayNode="4543:4236"
              day="Thu"
              typeNode="4543:4237"
              typeLabel="Email"
              imgNode="4543:4239"
              imgSrc="/assets/figma/4543-4239.png"
              captionNode="I4543:4240;741:2399"
              caption="Things I consider perfect | [City Name] edition"
              lineNode="I4543:4240;741:2400"
              tagNode="I4543:4240;741:2402"
              tag="Instagram Feed"
              left="left-[781px]"
            />
            <ContentWeekCard
              frameNode="4543:4241"
              dayNode="4543:4243"
              day="Fri"
              typeNode="4543:4244"
              typeLabel="Story"
              imgNode="4543:4246"
              imgSrc="/assets/figma/4543-4246.png"
              captionNode="I4543:4247;741:2399"
              caption="Story"
              lineNode="I4543:4247;741:2400"
              tagNode="I4543:4247;741:2402"
              tag="Instagram Stories"
              left="left-[1042px]"
            />
          </div>
        </div>
        <div data-figma-node="4543:3583" className="box-border w-[1130px] h-[133px] absolute left-[0px] top-[1138px] gap-5">
          <div data-figma-node="4543:3584" className="box-border w-[555px] h-[133px] absolute left-[0px] top-[0px] rounded-[10px] gap-2.5 pt-[24px] pr-[24px] pb-[24px] pl-[24px] border-[#383838] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <div data-figma-node="4543:3585" className="box-border w-[507px] h-[28px] absolute left-[24px] top-[24px] gap-[75px]">
              <div data-figma-node="4543:3586" className="box-border w-[412px] h-[28px] absolute left-[0px] top-[0px] gap-2.5">
                <div data-figma-node="4543:3587" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[2px] opacity-[0.6]">
                  <div data-figma-node="I4543:3587;7:11114" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[0px]">
                    <div data-figma-node="I4543:3587;7:11115" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[0px]"></div>
                  </div>
                </div>
                <div data-figma-node="4543:3588" className="box-border w-[378px] h-[28px] absolute left-[34px] top-[0px]">
                  <p data-figma-node="4543:3589" className="box-border w-[88px] h-[28px] absolute left-[0px] top-[0px] opacity-[0.6] font-almarai text-[18px] font-[400] leading-[28px] text-left whitespace-nowrap text-[#ffffff]">Downloads</p>
                </div>
              </div>
              <div data-figma-node="4543:3590" className="box-border w-[20px] h-[20px] absolute left-[487px] top-[4px] opacity-[0.98]"></div>
            </div>
            <p data-figma-node="4543:3593" className="box-border w-[507px] h-[47px] absolute left-[24px] top-[62px] font-eb-garamond text-[36px] font-[600] leading-[47px] text-left whitespace-nowrap text-[#c8a47e]">312</p>
          </div>
          <div data-figma-node="4543:3594" className="box-border w-[555px] h-[133px] absolute left-[575px] top-[0px] rounded-[10px] gap-2.5 pt-[24px] pr-[24px] pb-[24px] pl-[24px] border-[#383838] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <div data-figma-node="4543:3595" className="box-border w-[507px] h-[28px] absolute left-[24px] top-[24px] gap-[75px]">
              <div data-figma-node="4543:3596" className="box-border w-[412px] h-[28px] absolute left-[0px] top-[0px] gap-2.5">
                <div data-figma-node="4543:3597" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[2px] opacity-[0.6]">
                  <div data-figma-node="I4543:3597;7:38957" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[0px]">
                    <div data-figma-node="I4543:3597;7:38958" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[0px]"></div>
                  </div>
                </div>
                <div data-figma-node="4543:3598" className="box-border w-[378px] h-[28px] absolute left-[34px] top-[0px]">
                  <p data-figma-node="4543:3599" className="box-border w-[150px] h-[28px] absolute left-[0px] top-[0px] opacity-[0.6] font-almarai text-[18px] font-[400] leading-[28px] text-left whitespace-nowrap text-[#ffffff]">Content Generated</p>
                </div>
              </div>
              <div data-figma-node="4543:3600" className="box-border w-[20px] h-[20px] absolute left-[487px] top-[4px] opacity-[0.98]"></div>
            </div>
            <p data-figma-node="4543:3603" className="box-border w-[507px] h-[47px] absolute left-[24px] top-[62px] font-eb-garamond text-[36px] font-[600] leading-[47px] text-left whitespace-nowrap text-[#c8a47e]">247</p>
          </div>
        </div>
        <div data-figma-node="4543:3604" className="box-border w-[1130px] h-[258px] absolute left-[0px] top-[1302px] gap-5">
          <div data-figma-node="4543:3605" className="box-border w-[1130px] h-[63px] absolute left-[0px] top-[0px] gap-5">
            <div data-figma-node="4543:3606" className="box-border w-[1130px] h-[63px] absolute left-[0px] top-[0px] gap-1.5">
              <p data-figma-node="4543:3607" className="box-border w-[128px] h-[39px] absolute left-[0px] top-[0px] font-eb-garamond text-[30px] font-[500] leading-[39px] text-left whitespace-nowrap text-[#ffffff]">Your tools</p>
              <p data-figma-node="4543:3608" className="box-border w-[180px] h-[18px] absolute left-[0px] top-[45px] opacity-[0.6] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">Two places to do the work.</p>
            </div>
          </div>
          <div data-figma-node="4543:3609" className="box-border w-[1130px] h-[175px] absolute left-[0px] top-[83px] gap-5">
            <div data-figma-node="4543:3610" className="box-border w-[1130px] h-[175px] absolute left-[0px] top-[0px] overflow-hidden rounded-[16px] gap-5 pt-[24px] pr-[24px] pb-[24px] pl-[24px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <img data-figma-node="4543:3611" src="/assets/figma/4543-3611.png" alt="Group 33654420" className="box-border w-[52px] h-[52px] absolute left-[24px] top-[24px] max-w-none object-cover object-top" />
              <div data-figma-node="4543:3621" className="box-border w-[1010px] h-[127px] absolute left-[96px] top-[24px] gap-5">
                <div data-figma-node="4543:3622" className="box-border w-[1010px] h-[59px] absolute left-[0px] top-[0px] gap-2.5">
                  <div data-figma-node="4543:3623" className="box-border w-[1010px] h-[31px] absolute left-[0px] top-[0px] gap-[815px]">
                    <p data-figma-node="4543:3624" className="box-border w-[248px] h-[31px] absolute left-[0px] top-[0px] font-eb-garamond text-[24px] font-[500] leading-[31px] text-left whitespace-nowrap text-[#ffffff]">Agentwise Ultimate Mind</p>
                  </div>
                  <p data-figma-node="4543:3626" className="box-border w-[1010px] h-[18px] absolute left-[0px] top-[41px] opacity-[0.6] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">Agentwise Ultimate Mind is your strategic advisor and business partner customized for your business - not just a generic chatbot.</p>
                </div>
                <a data-figma-node="4543:3627" href="#contact" className="box-border w-[168px] h-[48px] absolute left-[0px] top-[79px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90" style={{backgroundColor: "rgba(200, 164, 126, 0.5)"}}><span className="font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">Start a session</span></a>
              </div>
            </div>
          </div>
        </div>
        <div data-figma-node="4543:3655" className="absolute left-[0px] top-[1590px] box-border h-[530px] w-[1130px] overflow-hidden">
          <div data-figma-node="4543:3656" className="relative box-border h-[83px] w-[1130px]">
            <p
              data-figma-node="4543:3658"
              className="absolute left-[0px] top-[0px] font-eb-garamond text-[30px] font-[500] leading-[39px] text-[#ffffff]"
            >
              Your content calendar
            </p>
            <p
              data-figma-node="4543:3659"
              className="absolute left-[0px] top-[45px] font-almarai text-[16px] font-[400] leading-[18px] text-[#ffffff] opacity-[0.6]"
            >
              A gentle rhythm to keep your brand consistent.
            </p>
            <p
              data-figma-node="4543:3660"
              className="absolute left-[1058px] top-[22px] font-almarai text-[16px] font-[400] leading-[18px] text-[#ffffff]"
            >
              Browse all
            </p>
          </div>
          <div data-figma-node="4543:3661" className="absolute left-[0px] top-[83px] box-border h-[447px] w-[1130px]">
            <ContentWeekCard
              frameNode="4543:3662"
              dayNode="4543:3664"
              day="Mon"
              typeNode="4543:3665"
              typeLabel="Reels"
              imgNode="4543:3666"
              imgSrc="/assets/figma/4543-3666.png"
              captionNode="I4543:3667;741:2399"
              caption="Hates to see me coming"
              lineNode="I4543:3667;741:2400"
              tagNode="I4543:3667;741:2402"
              tag="Instagram Feed"
              left="left-[0px]"
            />
            <ContentWeekCard
              frameNode="4543:3670"
              dayNode="4543:3672"
              day="Tue"
              typeNode="4543:3673-label"
              typeLabel="Reels"
              imgNode="4543:3673"
              imgSrc="/assets/figma/4543-3673.png"
              captionNode="I4543:3674;741:2399"
              caption="[City Name win], hallelujah | Justin Bieber Trend"
              lineNode="I4543:3674;741:2400"
              tagNode="I4543:3674;741:2402"
              tag="Instagram Reel"
              left="left-[260px]"
            />
            <ContentWeekCard
              frameNode="4543:3676"
              dayNode="4543:3678"
              day="Wed"
              typeNode="4543:3679"
              typeLabel="Story"
              imgNode="4543:3680"
              imgSrc="/assets/figma/4543-3680.png"
              captionNode="I4543:3681;741:2399"
              caption="Story"
              lineNode="I4543:3681;741:2400"
              tagNode="I4543:3681;741:2402"
              tag="Instagram Stories"
              left="left-[521px]"
            />
            <ContentWeekCard
              frameNode="4543:3683"
              dayNode="4543:3685"
              day="Thu"
              typeNode="4543:3686"
              typeLabel="Email"
              imgNode="4543:3687"
              imgSrc="/assets/figma/4543-3687.png"
              captionNode="I4543:3688;741:2399"
              caption="Things I consider perfect | [City Name] edition"
              lineNode="I4543:3688;741:2400"
              tagNode="I4543:3688;741:2402"
              tag="Instagram Feed"
              left="left-[781px]"
            />
            <ContentWeekCard
              frameNode="4543:3690"
              dayNode="4543:3691"
              day="Fri"
              typeNode="4543:3692"
              typeLabel="Story"
              imgNode="4543:3694"
              imgSrc="/assets/figma/4543-3694.png"
              captionNode="I4543:3695;741:2399"
              caption="Story"
              lineNode="I4543:3695;741:2400"
              tagNode="I4543:3695;741:2402"
              tag="Instagram Stories"
              left="left-[1042px]"
            />
          </div>
        </div>
        <div data-figma-node="4543:3696" className="box-border w-[1130px] h-[398px] absolute left-[0px] top-[2150px] gap-5">
          <div data-figma-node="4543:3796" className="box-border w-[555px] h-[398px] absolute left-[0px] top-[0px] gap-2.5">
            <div data-figma-node="4543:3797" className="box-border w-[555px] h-[398px] absolute left-[0px] top-[0px] overflow-hidden rounded-[16px] gap-5 pt-[24px] pr-[24px] pb-[24px] pl-[24px] border-[rgba(255,255,255,0.2)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <div data-figma-node="4543:3798" className="box-border w-[507px] h-[34px] absolute left-[24px] top-[24px] gap-[815px]">
                <div data-figma-node="4543:3799" className="box-border w-[342px] h-[34px] absolute left-[0px] top-[0px] gap-2.5">
                  <div data-figma-node="4543:3800" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[5px]"></div>
                  <p data-figma-node="4543:3806" className="box-border w-[163px] h-[34px] absolute left-[34px] top-[0px] font-eb-garamond text-[26px] font-[500] leading-[34px] text-left whitespace-nowrap text-[#ffffff]">Prompt Library</p>
                </div>
              </div>
              <div data-figma-node="4543:3808" className="box-border w-[507px] h-[300px] absolute left-[24px] top-[78px] gap-2.5">
                <div data-figma-node="4543:3809" className="box-border w-[507px] h-[78px] absolute left-[0px] top-[0px] overflow-hidden rounded-[10px] gap-2.5 pt-[14px] pr-[20px] pb-[14px] pl-[20px] border-[rgba(200,164,126,0.1)] border-[1px]" style={{backgroundColor: "rgba(200, 164, 126, 0.1)"}}>
                  <p data-figma-node="4543:3810" className="box-border w-[467px] h-[16px] absolute left-[20px] top-[14px] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap text-[#c8a47e]">Post</p>
                  <div data-figma-node="4543:3811" className="box-border w-[467px] h-[24px] absolute left-[20px] top-[40px] gap-2.5">
                    <div data-figma-node="4543:3812" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[0px] overflow-hidden"></div>
                    <div data-figma-node="4543:3818" className="box-border w-[433px] h-[18px] absolute left-[34px] top-[3px] gap-2.5">
                      <p data-figma-node="4543:3819" className="box-border w-[433px] h-[18px] absolute left-[0px] top-[0px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">What should I post this week to stand out in Austin?</p>
                    </div>
                  </div>
                </div>
                <div data-figma-node="4543:3820" className="box-border w-[507px] h-[78px] absolute left-[0px] top-[88px] overflow-hidden rounded-[10px] gap-2.5 pt-[14px] pr-[20px] pb-[14px] pl-[20px] border-[rgba(200,164,126,0.1)] border-[1px]" style={{backgroundColor: "rgba(200, 164, 126, 0.1)"}}>
                  <p data-figma-node="4543:3821" className="box-border w-[467px] h-[16px] absolute left-[20px] top-[14px] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap text-[#c8a47e]">Post</p>
                  <div data-figma-node="4543:3822" className="box-border w-[467px] h-[24px] absolute left-[20px] top-[40px] gap-2.5">
                    <div data-figma-node="4543:3823" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[0px] overflow-hidden"></div>
                    <div data-figma-node="4543:3829" className="box-border w-[433px] h-[18px] absolute left-[34px] top-[3px] gap-2.5">
                      <p data-figma-node="4543:3830" className="box-border w-[433px] h-[18px] absolute left-[0px] top-[0px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">Draft a positioning statement for my luxury buyer niche.</p>
                    </div>
                  </div>
                </div>
                <div data-figma-node="4543:3831" className="box-border w-[507px] h-[78px] absolute left-[0px] top-[176px] overflow-hidden rounded-[10px] gap-2.5 pt-[14px] pr-[20px] pb-[14px] pl-[20px] border-[rgba(200,164,126,0.1)] border-[1px]" style={{backgroundColor: "rgba(200, 164, 126, 0.1)"}}>
                  <p data-figma-node="4543:3832" className="box-border w-[467px] h-[16px] absolute left-[20px] top-[14px] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap text-[#c8a47e]">Post</p>
                  <div data-figma-node="4543:3833" className="box-border w-[467px] h-[24px] absolute left-[20px] top-[40px] gap-2.5">
                    <div data-figma-node="4543:3834" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[0px] overflow-hidden"></div>
                    <div data-figma-node="4543:3840" className="box-border w-[433px] h-[18px] absolute left-[34px] top-[3px] gap-2.5">
                      <p data-figma-node="4543:3841" className="box-border w-[433px] h-[18px] absolute left-[0px] top-[0px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">How do I price the new Travis Heights listing?</p>
                    </div>
                  </div>
                </div>
                <div data-figma-node="4543:3842" className="box-border w-[507px] h-[78px] absolute left-[0px] top-[264px] overflow-hidden rounded-[10px] gap-2.5 pt-[14px] pr-[20px] pb-[14px] pl-[20px] border-[rgba(200,164,126,0.1)] border-[1px]" style={{backgroundColor: "rgba(200, 164, 126, 0.1)"}}>
                  <p data-figma-node="4543:3843" className="box-border w-[467px] h-[16px] absolute left-[20px] top-[14px] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap text-[#c8a47e]">Post</p>
                  <div data-figma-node="4543:3844" className="box-border w-[467px] h-[24px] absolute left-[20px] top-[40px] gap-2.5">
                    <div data-figma-node="4543:3845" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[0px] overflow-hidden"></div>
                    <div data-figma-node="4543:3851" className="box-border w-[433px] h-[18px] absolute left-[34px] top-[3px] gap-2.5">
                      <p data-figma-node="4543:3852" className="box-border w-[433px] h-[18px] absolute left-[0px] top-[0px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">Build me a 30-day content plan around relocations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div data-figma-node="4543:3697" className="relative z-[10] box-border w-[555px] h-[398px] absolute left-[575px] top-[0px] gap-2.5">
            <div data-figma-node="4543:3698" className="box-border w-[555px] h-[398px] absolute left-[0px] top-[0px] rounded-[16px] gap-5 pt-[24px] pr-[24px] pb-[24px] pl-[24px] border-[rgba(255,255,255,0.2)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <div data-figma-node="4543:3699" className="box-border w-[507px] h-[34px] absolute left-[24px] top-[24px] gap-[815px]">
                <div data-figma-node="4543:3700" className="box-border w-[324px] h-[34px] absolute left-[0px] top-[0px] gap-2.5">
                  <div data-figma-node="4543:3701" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[5px]">
                    <div data-figma-node="4543:3707" className="box-border w-[24px] h-[24px] absolute left-[0px] top-[0px] overflow-hidden"></div>
                  </div>
                  <p data-figma-node="4543:3708" className="relative z-[30] box-border w-[171px] h-[34px] absolute left-[34px] top-[0px] font-eb-garamond text-[26px] font-[500] leading-[34px] text-left whitespace-nowrap text-[#ffffff]">Announcements</p>
                </div>
                <p data-figma-node="4543:3709" className="box-border w-[53px] h-[18px] absolute left-[454px] top-[8px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#c8a47e]">View all</p>
              </div>
              <div data-figma-node="4543:3710" className="box-border w-[507px] h-[290px] absolute left-[24px] top-[78px] gap-2.5">
                <div data-figma-node="4543:3711" className="box-border w-[507px] h-[50px] absolute left-[0px] top-[0px] rounded-[10px] pr-[20px] pl-[20px] border-[rgba(200,164,126,0.1)] border-[1px]" style={{backgroundColor: "rgba(200, 164, 126, 0.1)"}}>
                  <p data-figma-node="4543:3712" className="box-border w-[230px] h-[18px] absolute left-[20px] top-[16px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">Spring listing template pack is live</p>
                  <p data-figma-node="4543:3713" className="box-border w-[237px] h-[16px] absolute left-[250px] top-[17px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-right whitespace-nowrap text-[#ffffff]">2h ago</p>
                </div>
                <div data-figma-node="4543:3728" className="box-border w-[507px] h-[50px] absolute left-[0px] top-[60px] rounded-[10px] pr-[20px] pl-[20px] border-[rgba(200,164,126,0.1)] border-[1px]" style={{backgroundColor: "rgba(200, 164, 126, 0.1)"}}>
                  <p data-figma-node="4543:3729" className="box-border w-[251px] h-[18px] absolute left-[20px] top-[16px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">AI Assistant now writes Reels scripts</p>
                  <p data-figma-node="4543:3730" className="box-border w-[216px] h-[16px] absolute left-[271px] top-[17px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-right whitespace-nowrap text-[#ffffff]">Yesterday</p>
                </div>
                <div data-figma-node="4543:3745" className="box-border w-[507px] h-[50px] absolute left-[0px] top-[120px] rounded-[10px] pr-[20px] pl-[20px] border-[rgba(200,164,126,0.1)] border-[1px]" style={{backgroundColor: "rgba(200, 164, 126, 0.1)"}}>
                  <p data-figma-node="4543:3746" className="box-border w-[265px] h-[18px] absolute left-[20px] top-[16px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">Live workshop · Building a luxury brand</p>
                  <p data-figma-node="4543:3747" className="box-border w-[202px] h-[16px] absolute left-[285px] top-[17px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-right whitespace-nowrap text-[#ffffff]">May 18</p>
                </div>
                <div data-figma-node="4543:3762" className="box-border w-[507px] h-[50px] absolute left-[0px] top-[180px] rounded-[10px] pr-[20px] pl-[20px] border-[rgba(200,164,126,0.1)] border-[1px]" style={{backgroundColor: "rgba(200, 164, 126, 0.1)"}}>
                  <p data-figma-node="4543:3763" className="box-border w-[292px] h-[18px] absolute left-[20px] top-[16px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">Just Listed — Modern Minimal reels scripts</p>
                  <p data-figma-node="4543:3764" className="box-border w-[175px] h-[16px] absolute left-[312px] top-[17px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-right whitespace-nowrap text-[#ffffff]">May 10</p>
                </div>
                <div data-figma-node="4543:3779" className="box-border w-[507px] h-[50px] absolute left-[0px] top-[240px] rounded-[10px] pr-[20px] pl-[20px] border-[rgba(200,164,126,0.1)] border-[1px]" style={{backgroundColor: "rgba(200, 164, 126, 0.1)"}}>
                  <p data-figma-node="4543:3780" className="box-border w-[234px] h-[18px] absolute left-[20px] top-[16px] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">Spring listing template pack is live</p>
                  <p data-figma-node="4543:3781" className="box-border w-[234px] h-[16px] absolute left-[254px] top-[17px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-right whitespace-nowrap text-[#ffffff]">Apr 28</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
