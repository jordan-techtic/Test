/** luna-spec-codegen: owned-layout */
import { useRef } from 'react';
import { useProfileForm } from '../../features/profile/ProfileFormContext';

export function FigmaSection_n_3158_23028() {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    bio,
    setBio,
    timeZone,
    setTimeZone,
    street,
    setStreet,
    country,
    setCountry,
    state,
    setStateValue,
    city,
    setCity,
    zip,
    setZip,
    status,
    save,
    cancel,
    beginPasswordChange,
    submitPasswordChange,
    passwordChangeOpen,
  } = useProfileForm();

  const isBusy = status === 'submitting' || status === 'loading';

  return (
    <section data-figma-node="3158:23028" id="contact" className="absolute box-border left-[272px] top-[359px] w-[1128px] h-[819px] pt-[24px] pr-[24px] pb-[24px] pl-[24px] flex flex-col items-start gap-6 z-[1]">
      {passwordChangeOpen ? (
        <div className="sr-only">
          <label htmlFor="profile-new-password">New password</label>
          <input
            ref={passwordInputRef}
            id="profile-new-password"
            type="password"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                void submitPasswordChange(passwordInputRef.current?.value ?? '');
              }
            }}
          />
          <button
            type="button"
            onClick={() => void submitPasswordChange(passwordInputRef.current?.value ?? '')}
          >
            Confirm password change
          </button>
        </div>
      ) : null}
      <div className="relative box-border w-[1128px] h-[819px] flex flex-col items-start gap-6" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
        <div data-figma-node="3158:23030" className="box-border w-[1080px] h-[301px] relative gap-6">
          <div data-figma-node="3158:23032" className="box-border w-[157px] h-[31px] absolute left-[0px] top-[0px] gap-3.5">
            <p data-figma-node="3158:23033" className="box-border w-[157px] h-[31px] absolute left-[0px] top-[0px] font-eb-garamond text-[24px] font-[600] leading-[31px] text-left whitespace-nowrap text-[#ffffff]">Personal details</p>
          </div>
          <div data-figma-node="3158:23251" className="box-border w-[1080px] h-[246px] absolute left-[0px] top-[55px] gap-4">
            <div data-figma-node="3158:23159" className="box-border w-[1080px] h-[52px] absolute left-[0px] top-[0px] gap-4">
              <div data-figma-node="3158:23160" className="box-border w-[532px] h-[52px] absolute left-[0px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
                <input data-figma-node="3158:23166" type="text" placeholder="First Name" aria-label="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} disabled={isBusy} className="box-border w-[492px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
              </div>
              <div data-figma-node="3158:23171" className="box-border w-[532px] h-[52px] absolute left-[548px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
                <input data-figma-node="3158:23177" type="text" placeholder="Last Name" aria-label="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} disabled={isBusy} className="box-border w-[492px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
              </div>
            </div>
            <div data-figma-node="3158:23182" className="box-border w-[1080px] h-[52px] absolute left-[0px] top-[68px] gap-4">
              <div data-figma-node="3158:23183" className="box-border w-[532px] h-[52px] absolute left-[0px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
                <input data-figma-node="3158:23189" type="email" placeholder="Email" aria-label="Email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={isBusy} className="box-border w-[492px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
              </div>
              <div data-figma-node="3158:23194" className="box-border w-[532px] h-[52px] absolute left-[548px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
                <input data-figma-node="3158:23200" type="text" placeholder="Mobile Number" aria-label="Mobile Number" value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value)} disabled={isBusy} className="box-border w-[492px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
              </div>
            </div>
            <div data-figma-node="3158:23493" className="box-border w-[1080px] h-[110px] absolute left-[0px] top-[136px] rounded-[10px] pt-[20px] pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <input data-figma-node="3158:23499" type="text" placeholder="Bio" aria-label="Bio" value={bio} onChange={(event) => setBio(event.target.value)} disabled={isBusy} className="box-border w-[1040px] h-[16px] absolute left-[20px] top-[20px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
            </div>
          </div>
        </div>
        <div data-figma-node="3158:23687" className="box-border w-[1080px] h-[107px] relative gap-6">
          <p data-figma-node="3158:23686" className="box-border w-[1080px] h-[31px] absolute left-[0px] top-[0px] font-eb-garamond text-[24px] font-[600] leading-[31px] text-left whitespace-nowrap text-[#ffffff]">Time Zone</p>
          <div data-figma-node="3158:23685" className="box-border w-[1080px] h-[52px] absolute left-[0px] top-[55px] gap-4">
            <div data-figma-node="3158:23420" className="box-border w-[1080px] h-[52px] absolute left-[0px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <input data-figma-node="3158:23426" type="text" placeholder="Time zone in Washington, DC, USA (GMT-4)" aria-label="Time zone in Washington, DC, USA (GMT-4)" value={timeZone} onChange={(event) => setTimeZone(event.target.value)} disabled={isBusy} className="box-border w-[1026px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
            </div>
          </div>
        </div>
        <div data-figma-node="3526:5331" className="box-border w-[1080px] h-[243px] relative gap-6">
          <p data-figma-node="3526:5332" className="box-border w-[1080px] h-[31px] absolute left-[0px] top-[0px] font-eb-garamond text-[24px] font-[600] leading-[31px] text-left whitespace-nowrap text-[#ffffff]">Address</p>
          <div data-figma-node="3526:5333" className="box-border w-[1080px] h-[188px] absolute left-[0px] top-[55px] gap-4">
            <div data-figma-node="3526:5334" className="box-border w-[1080px] h-[52px] absolute left-[0px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <input data-figma-node="3526:5340" type="text" placeholder="Street" aria-label="Street" value={street} onChange={(event) => setStreet(event.target.value)} disabled={isBusy} className="box-border w-[1040px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
            </div>
            <div data-figma-node="3526:5345" className="box-border w-[1080px] h-[52px] absolute left-[0px] top-[68px] gap-4">
              <div data-figma-node="3526:5346" className="box-border w-[532px] h-[52px] absolute left-[0px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
                <input data-figma-node="3526:5352" type="text" placeholder="Country" aria-label="Country" value={country} onChange={(event) => setCountry(event.target.value)} disabled={isBusy} className="box-border w-[49px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
              </div>
              <div data-figma-node="3526:5358" className="box-border w-[532px] h-[52px] absolute left-[548px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
                <input data-figma-node="3526:5364" type="text" placeholder="State" aria-label="State" value={state} onChange={(event) => setStateValue(event.target.value)} disabled={isBusy} className="box-border w-[478px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
              </div>
            </div>
            <div data-figma-node="3526:5370" className="box-border w-[1080px] h-[52px] absolute left-[0px] top-[136px] gap-4">
              <div data-figma-node="3526:5371" className="box-border w-[532px] h-[52px] absolute left-[0px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
                <input data-figma-node="3526:5377" type="text" placeholder="City" aria-label="City" value={city} onChange={(event) => setCity(event.target.value)} disabled={isBusy} className="box-border w-[25px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
              </div>
              <div data-figma-node="3526:5382" className="box-border w-[532px] h-[52px] absolute left-[548px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
                <input data-figma-node="3526:5388" type="text" placeholder="ZIP" aria-label="ZIP" value={zip} onChange={(event) => setZip(event.target.value)} disabled={isBusy} className="box-border w-[478px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap" />
              </div>
            </div>
          </div>
        </div>
        <div data-figma-node="3526:5330" className="box-border w-[1080px] h-[48px] relative gap-6">
          <button
            type="button"
            data-figma-node="3158:23669"
            disabled={isBusy}
            onClick={() => {
              beginPasswordChange();
              passwordInputRef.current?.focus();
            }}
            className="box-border w-[167px] h-[48px] absolute left-[0px] top-[0px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90 disabled:opacity-60 border-0 cursor-pointer"
            style={{backgroundColor: "rgba(255, 255, 255, 0.3)"}}
          >
            <span className="font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">Change Password</span>
          </button>
          <div data-figma-node="3526:5325" className="box-border w-[181px] h-[48px] absolute left-[899px] top-[0px] gap-4">
            <button
              type="button"
              data-figma-node="3526:5326"
              disabled={isBusy}
              aria-busy={status === 'submitting'}
              onClick={() => void save()}
              className="box-border w-[76px] h-[48px] absolute left-[0px] top-[0px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90 disabled:opacity-60 border-0 cursor-pointer"
              style={{backgroundColor: "rgba(200, 164, 126, 0.5)"}}
            >
              <span className="font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">Save</span>
            </button>
            <button
              type="button"
              data-figma-node="3526:5328"
              disabled={isBusy}
              onClick={cancel}
              className="box-border w-[89px] h-[48px] absolute left-[92px] top-[0px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90 disabled:opacity-60 border-0 cursor-pointer"
              style={{backgroundColor: "rgba(255, 255, 255, 0.3)"}}
            >
              <span className="font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
