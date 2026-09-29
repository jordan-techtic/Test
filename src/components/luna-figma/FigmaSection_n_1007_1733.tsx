/** luna-spec-codegen: owned-layout */
import { Link } from 'react-router-dom';
import { OffCanvasLiveRegion } from '../OffCanvasLiveRegion';
import { useSignUp } from '../../features/auth/useSignUp';

export function FigmaSection_n_1007_1733() {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    termsAccepted,
    setTermsAccepted,
    showPassword,
    setShowPassword,
    fieldErrors,
    status,
    statusMessage,
    submit,
    canSubmit,
  } = useSignUp();

  const isSubmitting = status === 'submitting';

  return (
    <section data-figma-node="1007:1733" id="contact" className="absolute box-border left-[100px] top-[105.5px] w-[461px] h-[638.74951171875px] pr-[149px] pl-[148px] flex flex-col items-center gap-[30px] z-[4]">
      <OffCanvasLiveRegion message={statusMessage} />
      <img data-figma-node="1007:1734" src="/assets/figma/1007-1734.png" alt="Group 33654336" className="box-border w-[164px] h-[55px] max-w-none object-cover object-top" />
      <div data-figma-node="1915:2241" className="box-border w-[461px] h-[130px] relative gap-2.5">
        <p data-figma-node="1007:1847" className="box-border w-[461px] h-[100px] absolute left-[0px] top-[0px] font-eb-garamond text-[38px] font-[500] leading-[50px] text-center text-[#ffffff]">Great Marketing Made Easier. Specifically for Agents</p>
        <p data-figma-node="1915:2239" className="box-border w-[204px] h-[20px] absolute left-[128px] top-[110px] opacity-[0.6] font-almarai text-[18px] font-[400] leading-[20px] text-center whitespace-nowrap text-[#ffffff]">Create your account today</p>
      </div>
      <form
        className="box-border w-[461px] flex flex-col items-center gap-[30px]"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <div data-figma-node="1007:1848" className="box-border w-[461px] h-[236px] relative gap-5">
          <div data-figma-node="1007:1849" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[0px] gap-5">
            <div data-figma-node="1007:1850" className="box-border w-[220.5px] h-[52px] absolute left-[0px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <input
                data-figma-node="1007:1856"
                type="text"
                placeholder="First Name"
                aria-label="First Name"
                aria-invalid={fieldErrors.first_name ? true : undefined}
                aria-describedby={fieldErrors.first_name ? 'signup-first-name-error' : undefined}
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                disabled={isSubmitting}
                className="box-border w-[180.5px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap"
              />
            </div>
            <div data-figma-node="1007:1861" className="box-border w-[220.5px] h-[52px] absolute left-[240.5px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
              <input
                data-figma-node="1007:1867"
                type="text"
                placeholder="Last Name"
                aria-label="Last Name"
                aria-invalid={fieldErrors.last_name ? true : undefined}
                aria-describedby={fieldErrors.last_name ? 'signup-last-name-error' : undefined}
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                disabled={isSubmitting}
                className="box-border w-[180.5px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap"
              />
            </div>
          </div>
          <div data-figma-node="1007:1872" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[72px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <input
              data-figma-node="1007:1878"
              type="email"
              placeholder="Email"
              aria-label="Email"
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={fieldErrors.email ? 'signup-email-error' : undefined}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
              className="box-border w-[421px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap"
            />
          </div>
          <div data-figma-node="1007:1899" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[144px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <input
              data-figma-node="1007:1905"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a Password"
              aria-label="Create a Password"
              aria-invalid={fieldErrors.password ? true : undefined}
              aria-describedby={fieldErrors.password ? 'signup-password-error' : undefined}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isSubmitting}
              className="box-border w-[421px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap"
            />
            <div data-figma-node="1007:1906" className="box-border w-[40px] h-[40px] absolute left-[411px] top-[6px]">
              <button
                type="button"
                data-figma-node="1007:1907"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                disabled={isSubmitting}
                onClick={() => setShowPassword((value) => !value)}
                className="box-border w-[40px] h-[40px] absolute left-[0px] top-[0px] rounded-[500px] bg-transparent border-0 p-0 cursor-pointer"
              >
                <div data-figma-node="1007:1908" className="box-border w-[24px] h-[24px] absolute left-[8px] top-[8px]" />
              </button>
            </div>
          </div>
          <div data-figma-node="1007:1915" className="box-border w-[461px] h-[20px] absolute left-[0px] top-[216px] gap-2">
            <div data-figma-node="1007:1916" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px]">
              <input
                id="signup-terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
                disabled={isSubmitting}
                aria-invalid={fieldErrors.terms_accepted ? true : undefined}
                aria-describedby={fieldErrors.terms_accepted ? 'signup-terms-error' : undefined}
                className="sr-only"
              />
              <label htmlFor="signup-terms" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px] cursor-pointer">
                <div data-figma-node="1007:1917" className="box-border w-[17px] h-[17px] absolute left-[2px] top-[2px] rounded-[4.17px]" />
                <div data-figma-node="1007:1918" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px]">
                  <div data-figma-node="1007:1919" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px]" />
                </div>
              </label>
            </div>
            <p data-figma-node="1007:1922" className="box-border w-[433px] h-[16px] absolute left-[28px] top-[2px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap text-[#ffffff]">I have read and agree to the Terms of Use and Privacy Policy.</p>
          </div>
        </div>
        {fieldErrors.first_name ? <p id="signup-first-name-error" className="sr-only">{fieldErrors.first_name}</p> : null}
        {fieldErrors.last_name ? <p id="signup-last-name-error" className="sr-only">{fieldErrors.last_name}</p> : null}
        {fieldErrors.email ? <p id="signup-email-error" className="sr-only">{fieldErrors.email}</p> : null}
        {fieldErrors.password ? <p id="signup-password-error" className="sr-only">{fieldErrors.password}</p> : null}
        {fieldErrors.terms_accepted ? <p id="signup-terms-error" className="sr-only">{fieldErrors.terms_accepted}</p> : null}
        {fieldErrors._form ? <p className="sr-only">{fieldErrors._form}</p> : null}
        <button
          type="submit"
          data-figma-node="1007:1923"
          disabled={!canSubmit}
          aria-busy={isSubmitting}
          className="box-border w-[461px] h-[52px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90 disabled:opacity-60"
          style={{backgroundColor: "rgba(200, 164, 126, 0.5)"}}
        >
          <span data-figma-node="1007:1924" className="font-almarai text-[18px] font-[400] leading-[20px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">Sign Up</span>
        </button>
        <div data-figma-node="1007:1925" className="box-border w-[461px] h-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.2)"}} />
        <p data-figma-node="1007:1926" className="box-border w-[461px] h-[16px] opacity-[0.6] font-almarai text-[14px] font-[400] leading-[16px] text-center whitespace-nowrap text-[#ffffff]">
          <span className="text-[#ffffff]">Already have an account? </span>
          <Link to="/sign-in" className="text-[#c8a47e] hover:opacity-90">Sign in</Link>
        </p>
      </form>
    </section>
  );
}
