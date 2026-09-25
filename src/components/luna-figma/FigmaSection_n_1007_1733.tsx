/** luna-spec-codegen: owned-layout */
import { type FormEvent, useState } from 'react';

import { useSignup } from '../../hooks/useSignup';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function FigmaSection_n_1007_1733() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const { mutate, isPending, error, fieldErrors, isSuccess } = useSignup();

  const canSubmit = termsAccepted && !isPending;

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (!firstName.trim()) {
      next.first_name = 'First name is required.';
    }
    if (!lastName.trim()) {
      next.last_name = 'Last name is required.';
    }
    if (!email.trim()) {
      next.email = 'Email is required.';
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    if (!password) {
      next.password = 'Password is required.';
    } else if (password.length < 8) {
      next.password = 'Password must be at least 8 characters.';
    }
    if (!termsAccepted) {
      next.terms_accepted = 'You must accept the terms to sign up.';
    }

    setClientErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      await mutate({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password,
        terms_accepted: termsAccepted,
      });
    } catch {
      // Errors surfaced via sr-only region from hook state.
    }
  };

  const mergedFieldError = (field: string): string | undefined => {
    return clientErrors[field] ?? fieldErrors[field]?.[0];
  };

  const statusMessage = isPending
    ? 'Submitting sign up form.'
    : isSuccess
      ? 'Account created successfully.'
      : error ?? Object.values(clientErrors)[0] ?? Object.values(fieldErrors).flat()[0] ?? '';

  return (
    <form
      data-figma-node="1007:1733"
      id="signup-form"
      noValidate
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      className="absolute box-border left-[100px] top-[105.5px] w-[461px] h-[639px] flex flex-col items-center gap-7"
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </div>
      <img
        data-figma-node="1007:1734"
        src="/assets/figma/1007-1734.png"
        alt="Group 33654336"
        className="box-border w-[164px] h-[55px] max-w-none object-cover object-top"
      />
      <div data-figma-node="1915:2241" className="box-border w-[461px] h-[130px] relative gap-2.5">
        <h1
          data-figma-node="1007:1847"
          className="box-border w-[461px] h-[100px] absolute left-[0px] top-[0px] font-eb-garamond text-[38px] font-[500] leading-[49.59px] text-center text-[#ffffff]"
        >
          Great Marketing Made Easier. Specifically for Agents
        </h1>
        <p
          data-figma-node="1915:2239"
          className="box-border w-[204px] h-[20px] absolute left-[128.5px] top-[110px] opacity-[0.6] font-almarai text-[18px] font-[400] leading-[20.09px] text-center whitespace-nowrap text-[#ffffff]"
        >
          Create your account today
        </p>
      </div>
      <div data-figma-node="1007:1848" className="box-border w-[461px] h-[236px] relative gap-5">
        <div data-figma-node="1007:1849" className="box-border w-[461px] h-[52px] absolute left-[0px] top-[0px] gap-5">
          <div
            data-figma-node="1007:1850"
            className="box-border w-[220px] h-[52px] whitespace-nowrap absolute left-[0px] top-[0px] rounded-full border border-[rgba(200,164,126,0.05)] pr-[20px] pl-[20px]"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <input
              data-figma-node="1007:1856"
              type="text"
              name="first_name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="First Name"
              aria-label="First Name"
              aria-invalid={Boolean(mergedFieldError('first_name'))}
              autoComplete="given-name"
              className="box-border w-[180.5px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] border-0 bg-transparent shadow-none ring-0 px-0 focus-visible:ring-0 focus-visible:outline-none text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[15.62px] text-left whitespace-nowrap"
            />
          </div>
          <div
            data-figma-node="1007:1861"
            className="box-border w-[220px] h-[52px] whitespace-nowrap absolute left-[240px] top-[0px] rounded-full border border-[rgba(200,164,126,0.05)] pr-[20px] pl-[20px]"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <input
              data-figma-node="1007:1867"
              type="text"
              name="last_name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Last Name"
              aria-label="Last Name"
              aria-invalid={Boolean(mergedFieldError('last_name'))}
              autoComplete="family-name"
              className="box-border w-[180.5px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] border-0 bg-transparent shadow-none ring-0 px-0 focus-visible:ring-0 focus-visible:outline-none text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[15.62px] text-left whitespace-nowrap"
            />
          </div>
        </div>
        <div
          data-figma-node="1007:1872"
          className="box-border w-[461px] h-[52px] absolute left-[0px] top-[72px] rounded-full pr-[20px] pl-[20px]"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          <input
            data-figma-node="1007:1878"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            aria-label="Email"
            aria-invalid={Boolean(mergedFieldError('email'))}
            autoComplete="email"
            className="box-border w-[421px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] border-0 bg-transparent shadow-none ring-0 px-0 focus-visible:ring-0 focus-visible:outline-none text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[15.62px] text-left whitespace-nowrap"
          />
        </div>
        <div
          data-figma-node="1007:1899"
          className="box-border w-[461px] h-[52px] absolute left-[0px] top-[144px] rounded-full pr-[20px] pl-[20px]"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          <input
            data-figma-node="1007:1905"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a Password"
            aria-label="Create a Password"
            aria-invalid={Boolean(mergedFieldError('password'))}
            autoComplete="new-password"
            className="box-border w-[421px] h-[16px] absolute left-[20px] top-[18px] opacity-[0.6] border-0 bg-transparent shadow-none ring-0 px-0 focus-visible:ring-0 focus-visible:outline-none text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[15.62px] text-left whitespace-nowrap"
          />
          <div data-figma-node="1007:1906" className="box-border w-[40px] h-[40px] absolute left-[411px] top-[6px]">
            <button
              type="button"
              data-figma-node="1007:1907"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((current) => !current)}
              className="box-border w-[40px] h-[40px] absolute left-[0px] top-[0px] rounded-[500px] border-0 bg-transparent p-0 cursor-pointer"
            >
              <div data-figma-node="1007:1908" className="box-border w-[24px] h-[24px] absolute left-[8px] top-[8px]" />
            </button>
          </div>
        </div>
        <div data-figma-node="1007:1915" className="box-border w-[461px] h-[20px] absolute left-[0px] top-[216px] gap-2">
          <div className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px]">
            <input
              type="checkbox"
              id="terms-accepted"
              name="terms_accepted"
              data-figma-node="1007:1916"
              aria-label="Checkbox"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
              aria-invalid={Boolean(mergedFieldError('terms_accepted'))}
              className="absolute z-10 pointer-events-auto opacity-100 box-border w-[20px] h-[20px] left-[0px] top-[0px] rounded-[4px] border border-[#ffffff] bg-transparent appearance-none checked:bg-[#c8a47e] checked:border-[#c8a47e] cursor-pointer"
            />
            <div data-figma-node="1007:1917" className="box-border w-[17px] h-[17px] absolute left-[2px] top-[2px] rounded-[4px] pointer-events-none z-0" />
            <div data-figma-node="1007:1918" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px] pointer-events-none z-0">
              <div data-figma-node="1007:1919" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px] pointer-events-none z-0" />
            </div>
          </div>
          <input
            data-figma-node="1007:1922"
            type="text"
            placeholder="I have read and agree to the Terms of Use and Privacy Policy."
            aria-label="I have read and agree to the Terms of Use and Privacy Policy."
            readOnly
            tabIndex={-1}
            className="box-border w-[433px] h-[16px] absolute left-[28px] top-[2px] opacity-[0.6] border-0 bg-transparent shadow-none ring-0 px-0 focus-visible:ring-0 focus-visible:outline-none text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[15.62px] text-left whitespace-nowrap pointer-events-none"
          />
        </div>
      </div>
      <button
        data-figma-node="1007:1923"
        type="submit"
        disabled={!canSubmit}
        aria-busy={isPending}
        className={`box-border w-[461px] h-[52px] rounded-full inline-flex items-center justify-center whitespace-nowrap pt-[10px] pr-[24px] pb-[10px] pl-[24px] text-[#ffffff] ${canSubmit ? 'hover:opacity-90' : 'pointer-events-none opacity-50'}`}
        style={{ backgroundColor: 'rgba(200, 164, 126, 0.5)' }}
      >
        <span className="font-almarai text-[18px] font-[400] leading-[20.09px] text-left whitespace-nowrap text-[#ffffff] whitespace-nowrap">
          Sign Up
        </span>
      </button>
      <div
        data-figma-node="1007:1925"
        className="box-border w-[461px] h-[1px]"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      />
      <div id="sign-in" className="box-border w-[461px] h-[16px]">
        <input
          data-figma-node="1007:1926"
          type="text"
          placeholder="Already have an account? Sign in"
          aria-label="Already have an account? Sign in"
          readOnly
          tabIndex={-1}
          className="box-border w-[461px] h-[16px] opacity-[0.6] border-0 bg-transparent shadow-none ring-0 px-0 focus-visible:ring-0 focus-visible:outline-none text-[#ffffff] placeholder:text-[#ffffff] font-almarai text-[14px] font-[400] leading-[15.62px] text-center whitespace-nowrap"
        />
      </div>
    </form>
  );
}
