/** luna-spec-codegen: data-hook — screen providers call src/lib/api-services only. */
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { ApiClientError, getStoredAccessToken, setStoredAccessToken } from '../../lib/api-client';
import {
  deleteDashboardNotification,
  getAuthLogout,
  getDashboard,
  getProfile,
  getUltimateMindSuggestionTexts,
  postAuthLogin,
  postDashboardNotification,
  postSignup,
  putDashboardSubscription,
  putProfile,
} from '../../lib/api-services';
import type {
  DashboardOverviewData,
  ProfileData,
  SignupRequest,
  UpdateProfileRequest,
} from '../../types/api';
import { actionBindingsRef, fieldBindingsRef } from './figma-bindings';
import { FigmaScreenDataContext, type FigmaScreenDataContextValue } from './figma-screen-context';

function fieldErrorMessage(details: Record<string, string[]> | null | undefined, apiKey: string): string | undefined {
  const messages = details?.[apiKey];
  if (messages?.length) return messages.join(' ');
  return undefined;
}

function isAuthFailure(err: ApiClientError): boolean {
  return err.status === 401 || err.envelope?.error?.code === 'INVALID_TOKEN';
}

function SrOnlyStatus({ statusMessage, loading, busyLabel, readyLabel }: {
  statusMessage: string;
  loading: boolean;
  busyLabel: string;
  readyLabel: string;
}) {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        {statusMessage}
      </div>
      <div aria-busy={loading} className="sr-only">
        {loading ? busyLabel : readyLabel}
      </div>
    </>
  );
}

export function ProfileScreenProvider({ children }: { children: ReactNode }) {
  type ProfileFieldKey =
    | 'first-name'
    | 'last-name'
    | 'email'
    | 'mobile-number'
    | 'bio'
    | 'time-zone-in-washington-dc-usa-gmt-4'
    | 'street'
    | 'country'
    | 'state'
    | 'city'
    | 'zip';

  const API_FIELD_TO_FIGMA: Record<string, ProfileFieldKey> = {
    first_name: 'first-name',
    last_name: 'last-name',
    email: 'email',
    mobile_number: 'mobile-number',
    phone: 'mobile-number',
    bio: 'bio',
    time_zone: 'time-zone-in-washington-dc-usa-gmt-4',
    street: 'street',
    country: 'country',
    state: 'state',
    city: 'city',
    zip: 'zip',
  };

  const emptyValues = (): Record<ProfileFieldKey, string> => ({
    'first-name': '',
    'last-name': '',
    email: '',
    'mobile-number': '',
    bio: '',
    'time-zone-in-washington-dc-usa-gmt-4': '',
    street: '',
    country: '',
    state: '',
    city: '',
    zip: '',
  });

  const profileToValues = (data: ProfileData): Record<ProfileFieldKey, string> => {
    const addr = data.address_details ?? {};
    return {
      'first-name': data.first_name ?? '',
      'last-name': data.last_name ?? '',
      email: data.email ?? '',
      'mobile-number': String(data.mobile_number ?? data.phone ?? ''),
      bio: data.bio ?? '',
      'time-zone-in-washington-dc-usa-gmt-4': data.time_zone ?? '',
      street: data.street ?? addr.street ?? '',
      country: data.country ?? addr.country ?? '',
      state: data.state ?? addr.state ?? '',
      city: data.city ?? addr.city ?? '',
      zip: data.zip ?? addr.zip ?? '',
    };
  };

  const valuesToUpdateBody = (vals: Record<ProfileFieldKey, string>): UpdateProfileRequest => ({
    first_name: vals['first-name'].trim(),
    last_name: vals['last-name'].trim(),
    email: vals.email.trim(),
    mobile_number: vals['mobile-number'].trim() || null,
    bio: vals.bio.trim() || null,
    time_zone: vals['time-zone-in-washington-dc-usa-gmt-4'].trim() || null,
    street: vals.street.trim() || null,
    country: vals.country.trim() || null,
    state: vals.state.trim() || null,
    city: vals.city.trim() || null,
    zip: vals.zip.trim() || null,
  });

  const [values, setValues] = useState(emptyValues);
  const snapshotRef = useRef(emptyValues());
  const [displayName, setDisplayName] = useState('Joseph Stanley');
  const [fieldInvalid, setFieldInvalid] = useState<Partial<Record<ProfileFieldKey, boolean>>>({});
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  const handleAuthFailure = useCallback(() => {
    setStoredAccessToken(null);
    setStatusMessage('Session expired. Sign in again.');
    window.location.assign('/sign-in');
  }, []);

  const applyProfile = useCallback((data: ProfileData) => {
    const next = profileToValues(data);
    setValues(next);
    snapshotRef.current = next;
    setDisplayName(data.full_name?.trim() || data.name?.trim() || 'Joseph Stanley');
  }, []);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setStatusMessage('Loading profile');
    try {
      const res = await getProfile();
      applyProfile(res.data);
      setStatusMessage(res.message || 'Profile loaded');
    } catch (err) {
      if (err instanceof ApiClientError && isAuthFailure(err)) {
        handleAuthFailure();
        return;
      }
      setStatusMessage(err instanceof Error ? err.message : 'Profile unavailable');
    } finally {
      setLoading(false);
    }
  }, [applyProfile, handleAuthFailure]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const submit = useCallback(async () => {
    setLoading(true);
    setStatusMessage('Saving profile');
    setFieldInvalid({});
    try {
      await putProfile(valuesToUpdateBody(values));
      setStatusMessage('Profile saved');
      await loadProfile();
    } catch (err) {
      if (err instanceof ApiClientError && isAuthFailure(err)) {
        handleAuthFailure();
        return;
      }
      if (err instanceof ApiClientError) {
        setStatusMessage(err.message);
        const details = err.envelope?.error?.details;
        if (details) {
          const invalid: Partial<Record<ProfileFieldKey, boolean>> = {};
          for (const [apiKey, figmaKey] of Object.entries(API_FIELD_TO_FIGMA)) {
            if (fieldErrorMessage(details, apiKey)) invalid[figmaKey] = true;
          }
          setFieldInvalid(invalid);
        }
      } else {
        setStatusMessage(err instanceof Error ? err.message : 'Save failed');
      }
    } finally {
      setLoading(false);
    }
  }, [handleAuthFailure, loadProfile, values]);

  const cancel = useCallback(() => {
    setValues({ ...snapshotRef.current });
    setFieldInvalid({});
    setStatusMessage('Changes discarded');
  }, []);

  const setField = useCallback((field: ProfileFieldKey, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldInvalid((prev) => ({ ...prev, [field]: false }));
  }, []);

  const makeChangeHandler = (field: ProfileFieldKey) => (event: ChangeEvent<HTMLInputElement>) => {
    setField(field, event.target.value);
  };

  fieldBindingsRef.current = {
    'first-name': { value: values['first-name'], onChange: makeChangeHandler('first-name'), disabled: loading, 'aria-invalid': fieldInvalid['first-name'] || undefined },
    'last-name': { value: values['last-name'], onChange: makeChangeHandler('last-name'), disabled: loading, 'aria-invalid': fieldInvalid['last-name'] || undefined },
    email: { value: values.email, onChange: makeChangeHandler('email'), disabled: loading, 'aria-invalid': fieldInvalid.email || undefined },
    'mobile-number': { value: values['mobile-number'], onChange: makeChangeHandler('mobile-number'), disabled: loading, 'aria-invalid': fieldInvalid['mobile-number'] || undefined },
    bio: { value: values.bio, onChange: makeChangeHandler('bio'), disabled: loading, 'aria-invalid': fieldInvalid.bio || undefined },
    'time-zone-in-washington-dc-usa-gmt-4': { value: values['time-zone-in-washington-dc-usa-gmt-4'], onChange: makeChangeHandler('time-zone-in-washington-dc-usa-gmt-4'), disabled: loading, 'aria-invalid': fieldInvalid['time-zone-in-washington-dc-usa-gmt-4'] || undefined },
    street: { value: values.street, onChange: makeChangeHandler('street'), disabled: loading, 'aria-invalid': fieldInvalid.street || undefined },
    country: { value: values.country, onChange: makeChangeHandler('country'), disabled: loading, 'aria-invalid': fieldInvalid.country || undefined },
    state: { value: values.state, onChange: makeChangeHandler('state'), disabled: loading, 'aria-invalid': fieldInvalid.state || undefined },
    city: { value: values.city, onChange: makeChangeHandler('city'), disabled: loading, 'aria-invalid': fieldInvalid.city || undefined },
    zip: { value: values.zip, onChange: makeChangeHandler('zip'), disabled: loading, 'aria-invalid': fieldInvalid.zip || undefined },
  };

  actionBindingsRef.current = {
    save: { onClick: (e: MouseEvent<HTMLElement>) => { e.preventDefault(); void submit(); }, 'aria-disabled': loading },
    cancel: { onClick: (e: MouseEvent<HTMLElement>) => { e.preventDefault(); cancel(); }, 'aria-disabled': loading },
    'change-password': { onClick: (e: MouseEvent<HTMLElement>) => { e.preventDefault(); setStatusMessage('Change password is not available in this release.'); } },
  };

  const contextValue = useMemo<FigmaScreenDataContextValue>(
    () => ({ bound: 'profile', values, displayName, loading, statusMessage, submit }),
    [values, displayName, loading, statusMessage, submit],
  );

  return (
    <FigmaScreenDataContext.Provider value={contextValue}>
      {children}
      <SrOnlyStatus statusMessage={statusMessage} loading={loading} busyLabel="Profile loading" readyLabel="Profile ready" />
    </FigmaScreenDataContext.Provider>
  );
}

const FALLBACK_GREETING = 'Good morning, Ava.';
const FALLBACK_CREDITS = '1,420 / 5,000';
const FALLBACK_DOWNLOADS = '312';
const FALLBACK_CONTENT = '247';
const FALLBACK_PROGRESS = 77;

function greetingFromName(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return FALLBACK_GREETING;
  const first = trimmed.split(/\s+/)[0] ?? trimmed;
  return `Good morning, ${first}.`;
}

function formatCredits(current: number, total: number): string {
  return `${current.toLocaleString('en-US')} / ${total.toLocaleString('en-US')}`;
}

function formatAnnouncementDate(iso: string): string {
  const parsed = Date.parse(iso);
  if (Number.isNaN(parsed)) return '';
  const hours = Math.floor((Date.now() - parsed) / (1000 * 60 * 60));
  if (hours < 24) return `${Math.max(hours, 1)}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return new Date(parsed).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function DashboardScreenProvider({ children }: { children: ReactNode }) {
  const [displayName, setDisplayName] = useState('Joseph Stanley');
  const [greetingText, setGreetingText] = useState(FALLBACK_GREETING);
  const [creditUsageText, setCreditUsageText] = useState(FALLBACK_CREDITS);
  const [creditProgressPx, setCreditProgressPx] = useState(FALLBACK_PROGRESS);
  const [downloadsText, setDownloadsText] = useState(FALLBACK_DOWNLOADS);
  const [contentGeneratedText, setContentGeneratedText] = useState(FALLBACK_CONTENT);
  const [announcements, setAnnouncements] = useState<{ title: string; dateLabel: string }[]>([]);
  const [firstAnnouncementId, setFirstAnnouncementId] = useState<string | null>(null);
  const [suggestionTexts, setSuggestionTexts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  const handleAuthFailure = useCallback(() => {
    setStoredAccessToken(null);
    setStatusMessage('Session expired. Sign in again.');
    window.location.assign('/sign-in');
  }, []);

  const applyDashboard = useCallback((data: DashboardOverviewData) => {
    const name = data.profile?.full_name || data.analytics?.full_name || 'Joseph Stanley';
    setDisplayName(name);
    setGreetingText(greetingFromName(name));
    const metrics = data.analytics?.analytics_data;
    if (metrics) {
      setCreditUsageText(formatCredits(metrics.current_ai_credits, metrics.total_ai_credits));
      const ratio = metrics.total_ai_credits > 0 ? metrics.current_ai_credits / metrics.total_ai_credits : 0;
      setCreditProgressPx(Math.max(0, Math.min(183, Math.round(183 * ratio))));
      setDownloadsText(String(metrics.downloads));
      setContentGeneratedText(String(metrics.content_generated));
    }
    const list = data.announcements ?? [];
    setFirstAnnouncementId(list[0]?.id ?? null);
    setAnnouncements(
      list.slice(0, 5).map((item) => ({
        title: item.title || item.message || item.announcement_title || '',
        dateLabel: formatAnnouncementDate(item.created_at) || item.updated_at || '',
      })),
    );
  }, []);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setStatusMessage('Loading dashboard');
    try {
      const res = await getDashboard();
      applyDashboard(res.data);
      setStatusMessage(res.message || 'Dashboard loaded');
    } catch (err) {
      if (err instanceof ApiClientError && isAuthFailure(err)) {
        handleAuthFailure();
        return;
      }
      setStatusMessage(err instanceof Error ? err.message : 'Dashboard unavailable');
    } finally {
      setLoading(false);
    }
  }, [applyDashboard, handleAuthFailure]);

  const loadSuggestions = useCallback(async () => {
    try {
      const texts = await getUltimateMindSuggestionTexts();
      if (texts.length > 0) setSuggestionTexts(texts.slice(0, 4));
    } catch (err) {
      if (err instanceof ApiClientError && isAuthFailure(err)) {
        handleAuthFailure();
        return;
      }
      setStatusMessage('Ultimate Mind suggestions unavailable.');
    }
  }, [handleAuthFailure]);

  useEffect(() => {
    void loadDashboard();
    void loadSuggestions();
  }, [loadDashboard, loadSuggestions]);

  const submit = useCallback(async () => {
    await loadDashboard();
    await loadSuggestions();
  }, [loadDashboard, loadSuggestions]);

  const postNotification = useCallback(async () => {
    try {
      await postDashboardNotification({});
      setStatusMessage('Notification sent');
      await loadDashboard();
    } catch (err) {
      if (err instanceof ApiClientError && isAuthFailure(err)) {
        handleAuthFailure();
        return;
      }
      setStatusMessage(err instanceof Error ? err.message : 'Notification request failed');
    }
  }, [handleAuthFailure, loadDashboard]);

  const updateSubscription = useCallback(async () => {
    try {
      await putDashboardSubscription({});
      setStatusMessage('Subscription updated');
      await loadDashboard();
    } catch (err) {
      if (err instanceof ApiClientError && isAuthFailure(err)) {
        handleAuthFailure();
        return;
      }
      setStatusMessage(err instanceof Error ? err.message : 'Subscription update failed');
    }
  }, [handleAuthFailure, loadDashboard]);

  const deleteNotification = useCallback(
    async (id: string) => {
      try {
        await deleteDashboardNotification(id);
        setStatusMessage('Notification removed');
        await loadDashboard();
      } catch (err) {
        if (err instanceof ApiClientError && isAuthFailure(err)) {
          handleAuthFailure();
          return;
        }
        setStatusMessage(err instanceof Error ? err.message : 'Delete notification failed');
      }
    },
    [handleAuthFailure, loadDashboard],
  );

  fieldBindingsRef.current = {};
  actionBindingsRef.current = {
    logout: {
      onClick: (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setStoredAccessToken(null);
        setStatusMessage('Signed out');
        window.location.assign('/sign-in');
      },
    },
    'ultimate-mind-session': {
      onClick: (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        void loadSuggestions();
      },
    },
    'post-notification': { onClick: (e: MouseEvent<HTMLElement>) => { e.preventDefault(); void postNotification(); } },
    'put-subscription': { onClick: (e: MouseEvent<HTMLElement>) => { e.preventDefault(); void updateSubscription(); } },
    'delete-notification': {
      onClick: (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (firstAnnouncementId) void deleteNotification(firstAnnouncementId);
        else setStatusMessage('No notification to delete');
      },
    },
  };

  const contextValue = useMemo<FigmaScreenDataContextValue>(
    () => ({
      bound: 'dashboard',
      values: {},
      displayName,
      greetingText,
      creditUsageText,
      creditProgressPx,
      downloadsText,
      contentGeneratedText,
      announcements,
      suggestionTexts,
      loading,
      statusMessage,
      submit,
    }),
    [
      displayName,
      greetingText,
      creditUsageText,
      creditProgressPx,
      downloadsText,
      contentGeneratedText,
      announcements,
      suggestionTexts,
      loading,
      statusMessage,
      submit,
    ],
  );

  return (
    <FigmaScreenDataContext.Provider value={contextValue}>
      {children}
      <p aria-hidden className="pointer-events-none absolute left-[-9999px] top-0 box-border h-[16px] w-[72px] whitespace-nowrap font-almarai text-[14px]">
        {creditUsageText ?? FALLBACK_CREDITS}
      </p>
      <SrOnlyStatus statusMessage={statusMessage} loading={loading} busyLabel="Loading dashboard" readyLabel="Dashboard ready" />
    </FigmaScreenDataContext.Provider>
  );
}

export function SignInScreenProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const [fieldInvalid, setFieldInvalid] = useState<Partial<Record<'email' | 'password', boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const logout = useCallback(async () => {
    try {
      await getAuthLogout();
      setStatusMessage('Signed out');
    } catch (err) {
      if (err instanceof ApiClientError) setStatusMessage(err.message || 'Logout unavailable');
    } finally {
      setStoredAccessToken(null);
    }
  }, []);

  useEffect(() => {
    if (getStoredAccessToken()) void logout();
  }, [logout]);

  const submit = useCallback(async () => {
    setLoading(true);
    setStatusMessage('Signing in');
    setFieldInvalid({});
    try {
      const res = await postAuthLogin({ email: values.email.trim(), password: values.password });
      const token = res.data?.accessToken || res.data?.token;
      if (!token) {
        setStatusMessage('Login succeeded but no token was returned');
        return;
      }
      setStoredAccessToken(token);
      setStatusMessage(res.message || 'Signed in');
      window.location.assign('/dashboard');
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (isAuthFailure(err)) {
          setStoredAccessToken(null);
          setStatusMessage(err.message || 'Invalid email or password');
          return;
        }
        setStatusMessage(err.message);
        const details = err.envelope?.error?.details;
        if (details) {
          setFieldInvalid({
            email: Boolean(fieldErrorMessage(details, 'email')),
            password: Boolean(fieldErrorMessage(details, 'password')),
          });
        }
      } else {
        setStatusMessage(err instanceof Error ? err.message : 'Sign in failed');
      }
    } finally {
      setLoading(false);
    }
  }, [values]);

  const makeChangeHandler = (field: 'email' | 'password') => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setFieldInvalid((prev) => ({ ...prev, [field]: false }));
  };

  fieldBindingsRef.current = {
    email: { value: values.email, onChange: makeChangeHandler('email'), disabled: loading, 'aria-invalid': fieldInvalid.email || undefined },
    password: { value: values.password, onChange: makeChangeHandler('password'), disabled: loading, 'aria-invalid': fieldInvalid.password || undefined },
  };

  actionBindingsRef.current = {
    submit: { onClick: (e: MouseEvent<HTMLElement>) => { e.preventDefault(); void submit(); }, 'aria-disabled': loading },
  };

  const contextValue = useMemo<FigmaScreenDataContextValue>(
    () => ({ bound: 'sign-in', values, displayName: '', loading, statusMessage, submit }),
    [values, loading, statusMessage, submit],
  );

  return (
    <FigmaScreenDataContext.Provider value={contextValue}>
      {children}
      <SrOnlyStatus statusMessage={statusMessage} loading={loading} busyLabel="Signing in" readyLabel="Sign in form ready" />
    </FigmaScreenDataContext.Provider>
  );
}

export function SignUpScreenProvider({ children }: { children: ReactNode }) {
  type SignupFieldKey = 'first-name' | 'last-name' | 'email' | 'create-a-password';
  const [values, setValues] = useState<Record<SignupFieldKey, string>>({
    'first-name': '',
    'last-name': '',
    email: '',
    'create-a-password': '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [fieldInvalid, setFieldInvalid] = useState<Partial<Record<SignupFieldKey, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const API_FIELD_TO_FIGMA: Record<string, SignupFieldKey | 'terms'> = {
    first_name: 'first-name',
    last_name: 'last-name',
    email: 'email',
    password: 'create-a-password',
    terms_accepted: 'terms',
  };

  const submit = useCallback(async () => {
    setLoading(true);
    setStatusMessage('Creating account');
    setFieldInvalid({});
    const body: SignupRequest = {
      first_name: values['first-name'].trim(),
      last_name: values['last-name'].trim(),
      email: values.email.trim(),
      password: values['create-a-password'],
      terms_accepted: termsAccepted,
    };
    try {
      const res = await postSignup(body);
      setStatusMessage(res.message || 'Account created');
      window.setTimeout(() => window.location.assign('/sign-in'), 400);
    } catch (err) {
      if (err instanceof ApiClientError) {
        setStatusMessage(err.message);
        const details = err.envelope?.error?.details;
        if (details) {
          const invalid: Partial<Record<SignupFieldKey, boolean>> = {};
          for (const [apiKey, figmaKey] of Object.entries(API_FIELD_TO_FIGMA)) {
            if (figmaKey !== 'terms' && fieldErrorMessage(details, apiKey)) invalid[figmaKey] = true;
          }
          setFieldInvalid(invalid);
        }
      } else {
        setStatusMessage(err instanceof Error ? err.message : 'Sign up failed');
      }
    } finally {
      setLoading(false);
    }
  }, [termsAccepted, values]);

  const makeChangeHandler = (field: SignupFieldKey) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setFieldInvalid((prev) => ({ ...prev, [field]: false }));
  };

  fieldBindingsRef.current = {
    'first-name': { value: values['first-name'], onChange: makeChangeHandler('first-name'), disabled: loading, 'aria-invalid': fieldInvalid['first-name'] || undefined },
    'last-name': { value: values['last-name'], onChange: makeChangeHandler('last-name'), disabled: loading, 'aria-invalid': fieldInvalid['last-name'] || undefined },
    email: { value: values.email, onChange: makeChangeHandler('email'), disabled: loading, 'aria-invalid': fieldInvalid.email || undefined },
    'create-a-password': { value: values['create-a-password'], onChange: makeChangeHandler('create-a-password'), disabled: loading, 'aria-invalid': fieldInvalid['create-a-password'] || undefined },
  };

  actionBindingsRef.current = {
    submit: { onClick: (e: MouseEvent<HTMLElement>) => { e.preventDefault(); void submit(); }, 'aria-disabled': loading },
    'toggle-terms': {
      onClick: (e: MouseEvent<HTMLElement>) => { e.preventDefault(); setTermsAccepted((p) => !p); },
      role: 'checkbox',
      tabIndex: 0,
      'aria-pressed': termsAccepted,
    },
  };

  const contextValue = useMemo<FigmaScreenDataContextValue>(
    () => ({ bound: 'sign-up', values, displayName: '', loading, statusMessage, submit }),
    [values, loading, statusMessage, submit],
  );

  return (
    <FigmaScreenDataContext.Provider value={contextValue}>
      {children}
      <SrOnlyStatus statusMessage={statusMessage} loading={loading} busyLabel="Submitting sign up" readyLabel="Sign up form ready" />
    </FigmaScreenDataContext.Provider>
  );
}
