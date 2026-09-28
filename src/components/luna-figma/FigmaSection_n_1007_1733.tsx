/** luna-spec-codegen: owned-layout */
import { useState, type FormEvent } from 'react';
import { signUp } from '../../api/signup';
import { ApiError } from '../../lib/api-client';
import { validateSignUpFields } from '../../lib/signup-validation';
import { OffCanvasFormStatus } from './OffCanvasFormStatus';

export function FigmaSection_n_1007_1733() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const submitDisabled = loading || !termsAccepted;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage('');

    const payload = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      password,
      terms_accepted: termsAccepted,
    };

    const clientErrors = validateSignUpFields(payload);
    const errorMessages = Object.values(clientErrors);
    if (errorMessages.length > 0) {
      setStatusMessage(errorMessages[0] ?? 'Please fix the highlighted fields');
      return;
    }

    setLoading(true);
    try {
      await signUp(payload);
      setStatusMessage('Account created successfully. You can sign in now.');
    } catch (error) {
      if (error instanceof ApiError) {
        const fieldError = error.body?.errors
          ? Object.values(error.body.errors)[0]?.[0]
          : undefined;
        setStatusMessage(fieldError ?? error.message);
      } else if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage('Sign up failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <OffCanvasFormStatus loading={loading} statusMessage={statusMessage} />
      <form
        data-figma-node="1007:1733"
        id="contact"
        className="absolute box-border left-[100px] top-[105.5px] mt-[20px] w-[461px] h-[639px] pr-[149px] pl-[148px] flex flex-col items-center gap-[30px] z-[4]"
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
        noValidate
      >
        <img data-figma-node="1007:1734" src="/assets/figma/1007-1734.png" alt="Group 33654336" className="box-border w-[164px] h-[55px] max-w-none object-cover object-top" />
        <div data-figma-node="1915:2241" className="box-border w-[461px] h-[130px] relative gap-[10px]">
          <p data-figma-node="1007:1847" className="box-border w-[461px] h-[100px] absolute left-[0px] top-[0px] font-eb-garamond text-[38px] font-[500] leading-[49.59px] text-center capitalize text-[#ffffff]">Great Marketing Made Easier. Specifically for Agents</p>
          <p data-figma-node="1915:2239" className="box-border w-[204px] h-[20px] absolute left-[128px] top-[110px] opacity-[0.6] font-almarai text-[18px] font-[400] leading-[20.09px] text-center whitespace-nowrap text-[#ffffff]">Create your account today</p>
        </div>
        <div data-figma-node="1007:1848" className="box-border w-[461px] h-[236px] relative gap-5">
          <div data-figma-node="1007:1849" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[0px] gap-5">
            <div data-figma-node="1007:1850" className="box-border w-[220.5px] h-[52px] absolute left-[0px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <input data-figma-node="1007:1856" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" aria-label="First Name" autoComplete="given-name" required className="box-border w-[180.5px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[15.62px] text-left whitespace-nowrap" />
            </div>
            <div data-figma-node="1007:1861" className="box-border w-[220.5px] h-[52px] absolute left-[240.5px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <input data-figma-node="1007:1867" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" aria-label="Last Name" autoComplete="family-name" required className="box-border w-[180.5px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[15.62px] text-left whitespace-nowrap" />
            </div>
          </div>
          <div data-figma-node="1007:1872" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[72px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <input data-figma-node="1007:1878" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" aria-label="Email" autoComplete="email" required className="box-border w-[421px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[15.62px] text-left whitespace-nowrap" />
          </div>
          <div data-figma-node="1007:1899" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[144px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <input data-figma-node="1007:1905" name="password" value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Create a Password" aria-label="Create a Password" autoComplete="new-password" required className="box-border w-[421px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[15.62px] text-left whitespace-nowrap" />
            <div data-figma-node="1007:1906" className="box-border w-[40px] h-[40px] absolute left-[411px] top-[6px]">
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((prev) => !prev)}
                className="box-border w-[40px] h-[40px] absolute left-[0px] top-[0px] rounded-[500px] border-0 bg-transparent p-0 cursor-pointer"
              >
                <div data-figma-node="1007:1907" className="box-border w-[40px] h-[40px] absolute left-[0px] top-[0px] rounded-[500px] pointer-events-none">
                  <div data-figma-node="1007:1908" className="box-border w-[24px] h-[24px] absolute left-[8px] top-[8px]">
                    <svg data-figma-node="1007:1910" viewBox="0 0 20 16" preserveAspectRatio="none" aria-hidden="true" className="box-border w-[20px] h-[16px] absolute left-[2px] top-[4px] overflow-visible"><path d="M7.75 8C7.75 7.40326 7.98705 6.83097 8.40901 6.40901C8.83097 5.98705 9.40326 5.75 10 5.75C10.5967 5.75 11.169 5.98705 11.591 6.40901C12.0129 6.83097 12.25 7.40326 12.25 8C12.25 8.59674 12.0129 9.16903 11.591 9.59099C11.169 10.0129 10.5967 10.25 10 10.25C9.40326 10.25 8.83097 10.0129 8.40901 9.59099C7.98705 9.16903 7.75 8.59674 7.75 8Z" fill="#828282" /><path d="M0 8C0 9.64 0.425 10.191 1.275 11.296C2.972 13.5 5.818 16 10 16C14.182 16 17.028 13.5 18.725 11.296C19.575 10.192 20 9.639 20 8C20 6.36 19.575 5.809 18.725 4.704C17.028 2.5 14.182 0 10 0C5.818 0 2.972 2.5 1.275 4.704C0.425 5.81 0 6.361 0 8ZM10 4.25C9.00544 4.25 8.05161 4.64509 7.34835 5.34835C6.64509 6.05161 6.25 7.00544 6.25 8C6.25 8.99456 6.64509 9.94839 7.34835 10.6517C8.05161 11.3549 9.00544 11.75 10 11.75C10.9946 11.75 11.9484 11.3549 12.6517 10.6517C13.3549 9.94839 13.75 8.99456 13.75 8C13.75 7.00544 13.3549 6.05161 12.6517 5.34835C11.9484 4.64509 10.9946 4.25 10 4.25Z" fill="#828282" fillRule="evenodd" /></svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div data-figma-node="1007:1915" className="box-border w-[461px] h-[20px] absolute left-[0px] top-[216px] gap-2">
            <div data-figma-node="1007:1916" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px]">
              <input
                type="checkbox"
                name="terms_accepted"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                aria-label="I have read and agree to the Terms of Use and Privacy Policy."
                className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px] opacity-0 cursor-pointer"
              />
              <div data-figma-node="1007:1918" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px] pointer-events-none">
                <div data-figma-node="1007:1919" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px]">
                  <svg data-figma-node="1007:1920" viewBox="0 0 17.92 17.92" preserveAspectRatio="none" aria-hidden="true" className="box-border w-[18px] h-[18px] absolute left-[1px] top-[1px] overflow-visible"><path d="M11.4583 17.9167L6.45833 17.9167C1.93333 17.9167 0 15.9833 0 11.4583L0 6.45833C0 1.93333 1.93333 0 6.45833 0L11.4583 0C15.9833 0 17.9167 1.93333 17.9167 6.45833L17.9167 11.4583C17.9167 15.9833 15.9833 17.9167 11.4583 17.9167ZM6.45833 1.25C2.61667 1.25 1.25 2.61667 1.25 6.45833L1.25 11.4583C1.25 15.3 2.61667 16.6667 6.45833 16.6667L11.4583 16.6667C15.3 16.6667 16.6667 15.3 16.6667 11.4583L16.6667 6.45833C16.6667 2.61667 15.3 1.25 11.4583 1.25L6.45833 1.25Z" fill="#838383" /></svg>
                </div>
              </div>
              <div data-figma-node="1007:1917" className="box-border w-[17px] h-[17px] absolute left-[2px] top-[2px] rounded-[4.17px]"></div>
            </div>
            <p data-figma-node="1007:1922" className="box-border w-[433px] h-[16px] absolute left-[28px] top-[2px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[15.62px] text-left whitespace-nowrap text-[#ffffff]">I have read and agree to the Terms of Use and Privacy Policy.</p>
          </div>
        </div>
        <button
          data-figma-node="1007:1923"
          type="submit"
          disabled={submitDisabled}
          className="box-border w-[461px] h-[52px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed border-0 cursor-pointer pt-[10px] pb-[10px] pr-[24px] pl-[24px]"
          style={{backgroundColor: "rgba(200, 164, 126, 0.5)"}}
        >
          <span className="font-almarai text-[18px] font-[400] leading-[20.09px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">Sign Up</span>
        </button>
        <div data-figma-node="1007:1925" className="box-border w-[461px] h-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.2)"}} />
        <p data-figma-node="1007:1926" className="box-border w-[461px] h-[16px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[15.62px] text-center whitespace-nowrap text-[#ffffff]"><span className="text-[#ffffff]">Already have an account? </span><a href="/login" className="text-[#c8a47e] no-underline hover:opacity-90">Sign in</a></p>
      </form>
    </>
  );
}
