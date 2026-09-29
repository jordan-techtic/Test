/** luna-spec-codegen: owned-layout */
import { type FormEvent } from 'react';
import { OffCanvasLiveRegion } from '../OffCanvasLiveRegion';
import { useForgotPassword } from '../../features/auth/useForgotPassword';

export function FigmaSection_n_1018_1107() {
  const { email, setEmail, fieldErrors, status, statusMessage, submit } = useForgotPassword();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit();
  };

  const isSubmitting = status === 'submitting';

  return (
    <section data-figma-node="1018:1107" className="absolute box-border left-[100px] top-[232px] w-[461px] h-[385px] pr-[114px] pl-[114px] flex flex-col items-center gap-[30px] z-[3]">
      <OffCanvasLiveRegion message={statusMessage} />
      {fieldErrors.email ? (
        <p className="sr-only" id="forgot-password-email-error">
          {fieldErrors.email}
        </p>
      ) : null}
      <form
        className="box-border flex w-[461px] flex-col items-center gap-[30px]"
        onSubmit={handleSubmit}
        noValidate
      >
        <img data-figma-node="1018:1108" src="/assets/figma/1018-1108.png" alt="Group 33654336" className="box-border w-[164px] h-[55px] max-w-none object-cover object-top" />
        <p data-figma-node="1018:1221" className="box-border w-[232px] h-[50px] font-eb-garamond text-[38px] font-[500] leading-[50px] text-center whitespace-nowrap text-[#ffffff]">Reset Password</p>
        <p data-figma-node="1018:1279" className="box-border w-[461px] h-[56px] opacity-[0.6] font-almarai text-[18px] font-[400] leading-[28px] text-center text-[#ffffff]">Enter the email address you used to create your account and we’ll send you a link to reset your password.</p>
        <div data-figma-node="1018:1222" className="box-border w-[461px] h-[52px] relative gap-[20px]">
          <div data-figma-node="1018:1223" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[0px] rounded-full pr-[20px] pl-[20px] border-[rgba(200,164,126,0.05)] border-[1px]" style={{backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
            <input
              data-figma-node="1018:1229"
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Email"
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={fieldErrors.email ? 'forgot-password-email-error' : undefined}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
              className="box-border w-[421px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none border-0 bg-transparent px-0 text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap"
            />
          </div>
        </div>
        <button
          data-figma-node="1018:1259"
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="box-border w-[461px] h-[52px] rounded-full inline-flex items-center justify-center whitespace-nowrap hover:opacity-90 disabled:opacity-60"
          style={{backgroundColor: "rgba(200, 164, 126, 0.5)"}}
        >
          <span className="font-almarai text-[18px] font-[400] leading-[20px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">Send me a link</span>
        </button>
      </form>
    </section>
  );
}
