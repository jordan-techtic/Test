/** luna-spec-codegen: data-hook — wire API data here; do not restyle. */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  ApiClientError,
  deleteDashboardNotification,
  getDashboard,
  getProfile,
  getUltimateMindSuggestions,
  login,
  logout,
  postDashboardNotification,
  putDashboardSubscription,
  signup,
  updateProfile,
} from '../../lib/api-client';
import { clearStoredAccessToken, setStoredAccessToken } from '../../lib/api-base';
import type {
  ApiSuccessEnvelope,
  DashboardOverviewData,
  ProfileData,
  UpdateProfileRequest,
} from '../../types/api';

export type FigmaFieldBinding = {
  value?: string;
  defaultValue?: string;
  onChange?: (event: { target: { value: string } }) => void;
  onClick?: (event: { preventDefault: () => void }) => void;
  role?: string;
  'aria-selected'?: boolean;
  disabled?: boolean;
};

export type FigmaActionBinding = {
  onClick?: (event: { preventDefault: () => void }) => void;
  disabled?: boolean;
  'aria-busy'?: boolean;
};

type ScreenRoute = 'dashboard' | 'sign-up' | 'sign-in' | 'profile' | 'other';

function resolveRoute(path: string): ScreenRoute {
  if (path === '' || path === 'dashboard' || path === 'updated-dashboard') {
    return 'dashboard';
  }
  if (path === 'sign-up' || path === 'signup') {
    return 'sign-up';
  }
  if (path === 'sign-in') {
    return 'sign-in';
  }
  if (path === 'profile') {
    return 'profile';
  }
  return 'other';
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const SIGNUP_API_FIELD_TO_FIGMA: Record<string, string> = {
  first_name: 'first-name',
  last_name: 'last-name',
  password: 'create-a-password',
};

const PROFILE_API_FIELD_TO_FIGMA: Record<string, string> = {
  first_name: 'first-name',
  last_name: 'last-name',
  mobile_number: 'mobile-number',
  time_zone: 'time-zone-in-washington-dc-usa-gmt-4',
};

function profileScalarString(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }
  return '';
}

function flattenApiDetails(details: Record<string, string[]>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(details).map(([key, messages]) => [key, messages[0] ?? 'Invalid value']),
  );
}

function formatCredits(current: number, total: number): string {
  const formatter = new Intl.NumberFormat('en-US');
  return `${formatter.format(current)} / ${formatter.format(total)}`;
}

function greetingFromName(fullName: string): string {
  const first = fullName.trim().split(/\s+/)[0] ?? fullName;
  return first ? `Good morning, ${first}.` : 'Good morning, Ava.';
}

function dashboardToDisplayText(data: DashboardOverviewData): Record<string, string> {
  const metrics = data.analytics.analytics_data;
  const announcement = data.announcements[0];
  const fullName = data.profile.full_name || data.analytics.full_name;
  return {
    'I4543:3853;1226:1920': fullName,
    'I4543:3853;1237:2195': formatCredits(metrics.current_ai_credits, metrics.total_ai_credits),
    '4543:3510': greetingFromName(fullName),
    'I4559:6049;4559:5864':
      announcement?.announcement_title || announcement?.title || '',
    'I4559:6049;4559:5865':
      announcement?.announcement_content || announcement?.message || announcement?.description || '',
    '4543:3593': String(metrics.downloads),
    '4543:3603': String(metrics.content_generated),
  };
}

function unwrapSuggestionOptions(payload: ApiSuccessEnvelope<unknown>): Array<{ value: string; label: string }> {
  const data = payload.data;
  let rows: unknown[] = [];
  if (Array.isArray(data)) {
    rows = data;
  } else if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>;
    for (const key of ['items', 'results', 'suggestions', 'data'] as const) {
      const candidate = record[key];
      if (Array.isArray(candidate)) {
        rows = candidate;
        break;
      }
    }
  }
  return rows
    .map((row, index) => {
      if (typeof row === 'string') {
        return { value: row, label: row };
      }
      if (row && typeof row === 'object') {
        const item = row as Record<string, unknown>;
        const label =
          (typeof item.title === 'string' && item.title) ||
          (typeof item.message === 'string' && item.message) ||
          (typeof item.description === 'string' && item.description) ||
          (typeof item.id === 'string' && item.id) ||
          `Suggestion ${index + 1}`;
        const value =
          (typeof item.id === 'string' && item.id) ||
          (typeof item.title === 'string' && item.title) ||
          label;
        return { value, label };
      }
      return null;
    })
    .filter((item): item is { value: string; label: string } => item !== null);
}

function profileToFields(data: ProfileData): Record<string, string> {
  return {
    'first-name': data.first_name ?? '',
    'last-name': data.last_name ?? '',
    email: data.email ?? '',
    'mobile-number':
      profileScalarString(data.mobile_number) || profileScalarString(data.phone),
    bio: profileScalarString(data.bio) || profileScalarString(data.description),
    'time-zone-in-washington-dc-usa-gmt-4': profileScalarString(data.time_zone),
    street:
      profileScalarString(data.street) || profileScalarString(data.address_details?.street),
    country:
      profileScalarString(data.country) || profileScalarString(data.address_details?.country),
    state: profileScalarString(data.state) || profileScalarString(data.address_details?.state),
    city: profileScalarString(data.city) || profileScalarString(data.address_details?.city),
    zip: profileScalarString(data.zip) || profileScalarString(data.address_details?.zip),
  };
}

function profileToDisplayText(data: ProfileData): Record<string, string> {
  const fullName = data.full_name || data.name || `${data.first_name} ${data.last_name}`.trim();
  return {
    '3158:22834': fullName,
    'I3158:22263;1226:1920': fullName,
  };
}

type FigmaScreenContextValue = {
  bound: string;
  values: Record<string, string>;
  setField: (field: string, value: string) => void;
  submit: (action: string) => Promise<void>;
  loading: boolean;
  statusMessage: string;
  fieldErrors: Record<string, string>;
  displayText: Record<string, string>;
  suggestionOptions: Array<{ value: string; label: string }>;
};

const FigmaScreenContext = createContext<FigmaScreenContextValue | null>(null);

const FigmaExtrasContext = createContext<{
  termsAccepted: boolean;
  rememberMe: boolean;
  activeProfileTab: boolean;
  setActiveProfileTab: (value: boolean) => void;
} | null>(null);

function useFigmaScreenContext(): FigmaScreenContextValue {
  const ctx = useContext(FigmaScreenContext);
  if (!ctx) {
    return {
      bound: '',
      values: {},
      setField: () => {},
      submit: async () => {},
      loading: false,
      statusMessage: '',
      fieldErrors: {},
      displayText: {},
      suggestionOptions: [],
    };
  }
  return ctx;
}

export function FigmaScreenDataProvider({
  routePath,
  children,
}: {
  routePath: string;
  children: ReactNode;
}) {
  const route = resolveRoute(routePath);
  const [values, setValues] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState(true);
  const [profileSnapshot, setProfileSnapshot] = useState<Record<string, string>>({});
  const [displayText, setDisplayText] = useState<Record<string, string>>({});
  const [suggestionOptions, setSuggestionOptions] = useState<Array<{ value: string; label: string }>>(
    [],
  );
  const [primaryNotificationId, setPrimaryNotificationId] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setStatusMessage('Loading profile');
    try {
      const res = await getProfile();
      const mapped = profileToFields(res.data);
      setValues(mapped);
      setProfileSnapshot(mapped);
      setDisplayText((prev) => ({ ...prev, ...profileToDisplayText(res.data) }));
      setStatusMessage(res.message || 'Profile loaded');
      setFieldErrors({});
    } catch (err) {
      if (err instanceof ApiClientError && err.status === 401) {
        return;
      }
      const message = err instanceof ApiClientError ? err.message : 'Failed to load profile';
      setStatusMessage(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setStatusMessage('Loading dashboard');
    try {
      const res = await getDashboard();
      setDisplayText(dashboardToDisplayText(res.data));
      setPrimaryNotificationId(res.data.announcements[0]?.id ?? null);
      setStatusMessage(res.message || 'Dashboard loaded');
      setFieldErrors({});
    } catch (err) {
      if (err instanceof ApiClientError && err.status === 401) {
        return;
      }
      const message = err instanceof ApiClientError ? err.message : 'Failed to load dashboard';
      setStatusMessage(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSuggestions = useCallback(async () => {
    try {
      const res = await getUltimateMindSuggestions();
      setSuggestionOptions(unwrapSuggestionOptions(res));
    } catch (err) {
      if (err instanceof ApiClientError && err.status === 401) {
        return;
      }
      const message =
        err instanceof ApiClientError ? err.message : 'Failed to load Ultimate Mind suggestions';
      setStatusMessage(message);
    }
  }, []);

  const setField = useCallback((field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!(field in prev)) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  useEffect(() => {
    if (route !== 'sign-in') {
      return;
    }
    const remembered = localStorage.getItem('agentwise_remember_email');
    if (remembered) {
      setValues((prev) => ({ ...prev, email: remembered }));
      setRememberMe(true);
    }
  }, [route]);

  useEffect(() => {
    if (route !== 'profile') {
      return;
    }
    void loadProfile();
  }, [loadProfile, route]);

  useEffect(() => {
    if (route !== 'dashboard') {
      return;
    }
    void loadDashboard();
    void loadSuggestions();
  }, [loadDashboard, loadSuggestions, route]);

  const submit = useCallback(
    async (action: string) => {
      setFieldErrors({});
      setStatusMessage('');

      if (action === 'terms-toggle') {
        setTermsAccepted((prev) => {
          const next = !prev;
          setStatusMessage(next ? 'Terms accepted' : 'Terms not accepted');
          return next;
        });
        return;
      }

      if (action === 'remember-toggle') {
        setRememberMe((prev) => !prev);
        return;
      }

      if (action === 'auth-logout') {
        setLoading(true);
        setStatusMessage('Signing out');
        try {
          await logout();
          setStatusMessage('Signed out');
        } catch (err) {
          if (err instanceof ApiClientError && err.status === 401) {
            return;
          }
          const message = err instanceof ApiClientError ? err.message : 'Sign out failed';
          setStatusMessage(message);
        } finally {
          clearStoredAccessToken();
          setLoading(false);
          window.location.assign('/sign-in');
        }
        return;
      }

      if (action === 'sign-in-submit') {
        const email = values.email?.trim() ?? '';
        const password = values.password ?? '';
        const errors: Record<string, string> = {};
        if (!email) {
          errors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
          errors.email = 'Enter a valid email';
        }
        if (!password) {
          errors.password = 'Password is required';
        }
        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          setStatusMessage('Fix sign-in fields');
          return;
        }
        setLoading(true);
        setStatusMessage('Signing in');
        try {
          const res = await login({ email, password });
          setStoredAccessToken(res.data.accessToken || res.data.token);
          if (rememberMe) {
            localStorage.setItem('agentwise_remember_email', email);
          } else {
            localStorage.removeItem('agentwise_remember_email');
          }
          setStatusMessage(res.message || 'Signed in');
          window.location.assign('/dashboard');
        } catch (err) {
          const message = err instanceof ApiClientError ? err.message : 'Sign in failed';
          setStatusMessage(message);
          if (err instanceof ApiClientError && err.details) {
            setFieldErrors(flattenApiDetails(err.details));
          }
        } finally {
          setLoading(false);
        }
        return;
      }

      if (action === 'sign-up-submit') {
        const firstName = values['first-name']?.trim() ?? '';
        const lastName = values['last-name']?.trim() ?? '';
        const email = values.email?.trim() ?? '';
        const password = values['create-a-password'] ?? '';
        const errors: Record<string, string> = {};
        if (!firstName) {
          errors['first-name'] = 'First name is required';
        }
        if (!lastName) {
          errors['last-name'] = 'Last name is required';
        }
        if (!email) {
          errors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
          errors.email = 'Enter a valid email';
        }
        if (!password || password.length < 8) {
          errors['create-a-password'] = 'Password must be at least 8 characters';
        }
        if (!termsAccepted) {
          setStatusMessage('Accept terms to continue');
          return;
        }
        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          setStatusMessage('Fix sign-up fields');
          return;
        }
        setLoading(true);
        setStatusMessage('Creating account');
        try {
          const res = await signup({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            terms_accepted: true,
          });
          setStatusMessage(res.message || 'Account created');
          window.location.assign('/sign-in');
        } catch (err) {
          const message = err instanceof ApiClientError ? err.message : 'Sign up failed';
          setStatusMessage(message);
          if (err instanceof ApiClientError && err.details) {
            const flat = flattenApiDetails(err.details);
            const mapped: Record<string, string> = {};
            for (const [key, msg] of Object.entries(flat)) {
              mapped[SIGNUP_API_FIELD_TO_FIGMA[key] ?? key] = msg;
            }
            setFieldErrors(mapped);
          }
        } finally {
          setLoading(false);
        }
        return;
      }

      if (action === 'profile-save') {
        const payload: UpdateProfileRequest = {
          first_name: values['first-name']?.trim() ?? '',
          last_name: values['last-name']?.trim() ?? '',
          email: values.email?.trim() ?? '',
          mobile_number: values['mobile-number']?.trim() || null,
          phone: values['mobile-number']?.trim() || null,
          bio: values.bio?.trim() || null,
          time_zone: values['time-zone-in-washington-dc-usa-gmt-4']?.trim() || null,
          street: values.street?.trim() || null,
          country: values.country?.trim() || null,
          state: values.state?.trim() || null,
          city: values.city?.trim() || null,
          zip: values.zip?.trim() || null,
        };
        const errors: Record<string, string> = {};
        if (!payload.first_name) {
          errors['first-name'] = 'First name is required';
        }
        if (!payload.last_name) {
          errors['last-name'] = 'Last name is required';
        }
        if (!payload.email) {
          errors.email = 'Email is required';
        } else if (!isValidEmail(payload.email)) {
          errors.email = 'Enter a valid email';
        }
        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          setStatusMessage('Fix profile fields');
          return;
        }
        setLoading(true);
        setStatusMessage('Saving profile');
        try {
          await updateProfile(payload);
          await loadProfile();
          setStatusMessage('Profile saved');
        } catch (err) {
          if (err instanceof ApiClientError && err.status === 401) {
            return;
          }
          const message = err instanceof ApiClientError ? err.message : 'Save failed';
          setStatusMessage(message);
          if (err instanceof ApiClientError && err.details) {
            const flat = flattenApiDetails(err.details);
            const mapped: Record<string, string> = {};
            for (const [key, msg] of Object.entries(flat)) {
              mapped[PROFILE_API_FIELD_TO_FIGMA[key] ?? key] = msg;
            }
            setFieldErrors(mapped);
          }
        } finally {
          setLoading(false);
        }
        return;
      }

      if (action === 'profile-cancel') {
        setValues(profileSnapshot);
        setFieldErrors({});
        setStatusMessage('Changes discarded');
        return;
      }

      if (action === 'dashboard-start-session') {
        const sessionValue = values['start-a-session']?.trim() ?? '';
        if (!sessionValue) {
          setStatusMessage('Select a session to start');
          return;
        }
        setLoading(true);
        setStatusMessage('Starting session');
        try {
          await postDashboardNotification({});
          await putDashboardSubscription({ 'start-a-session': sessionValue });
          await loadDashboard();
          setStatusMessage('Session started');
        } catch (err) {
          if (err instanceof ApiClientError && err.status === 401) {
            return;
          }
          const message = err instanceof ApiClientError ? err.message : 'Session start failed';
          setStatusMessage(message);
        } finally {
          setLoading(false);
        }
        return;
      }

      if (action === 'dashboard-delete-notification') {
        if (!primaryNotificationId) {
          setStatusMessage('No notification to dismiss');
          return;
        }
        setLoading(true);
        setStatusMessage('Removing notification');
        try {
          await deleteDashboardNotification(primaryNotificationId);
          await loadDashboard();
          setStatusMessage('Notification removed');
        } catch (err) {
          if (err instanceof ApiClientError && err.status === 401) {
            return;
          }
          const message = err instanceof ApiClientError ? err.message : 'Notification removal failed';
          setStatusMessage(message);
        } finally {
          setLoading(false);
        }
        return;
      }

      document.documentElement.setAttribute('data-figma-action-fired', action);
    },
    [
      loadDashboard,
      loadProfile,
      primaryNotificationId,
      profileSnapshot,
      rememberMe,
      termsAccepted,
      values,
    ],
  );

  const bound =
    route === 'dashboard'
      ? 'dashboard'
      : route === 'profile' && Object.keys(profileSnapshot).length > 0
        ? 'profile'
        : route;

  const contextValue = useMemo(
    () => ({
      bound,
      values,
      setField,
      submit,
      loading,
      statusMessage,
      fieldErrors,
      displayText,
      suggestionOptions,
    }),
    [
      bound,
      displayText,
      fieldErrors,
      loading,
      setField,
      statusMessage,
      submit,
      suggestionOptions,
      values,
    ],
  );

  const extrasValue = useMemo(
    () => ({
      termsAccepted,
      rememberMe,
      activeProfileTab,
      setActiveProfileTab,
    }),
    [activeProfileTab, rememberMe, termsAccepted],
  );

  return (
    <FigmaScreenContext.Provider value={contextValue}>
      <FigmaExtrasContext.Provider value={extrasValue}>{children}</FigmaExtrasContext.Provider>
    </FigmaScreenContext.Provider>
  );
}

export function FigmaScreenStatusAnnouncer() {
  const { statusMessage, loading, fieldErrors } = useFigmaScreenContext();
  const errorSummary = Object.values(fieldErrors).join('. ');
  return (
    <div className="luna-sr-only" aria-live="polite" aria-atomic="true">
      {loading ? 'Loading' : ''}
      {statusMessage}
      {errorSummary}
    </div>
  );
}

export function figmaFieldProps(field: string): FigmaFieldBinding {
  const ctx = useFigmaScreenContext();
  const extras = useContext(FigmaExtrasContext);
  const resolvedField = field === 'frame-386' ? 'bio' : field;

  if (field === 'profile' && extras) {
    return {
      role: 'tab',
      'aria-selected': extras.activeProfileTab,
      onClick: (event) => {
        event.preventDefault();
        extras.setActiveProfileTab(true);
      },
    };
  }

  const value = ctx.values[resolvedField] ?? '';
  if (field === 'start-a-session') {
    return {
      value,
      onChange: (event) => {
        const next = event.target.value;
        ctx.setField(field, next);
        if (next) {
          void ctx.submit('dashboard-start-session');
        }
      },
      disabled: ctx.loading,
    };
  }
  return {
    value,
    onChange: (event) => {
      ctx.setField(resolvedField, event.target.value);
    },
    disabled: ctx.loading,
  };
}

export function useFigmaDisplayText(nodeId: string, fallback: string): string {
  const ctx = useFigmaScreenContext();
  const fromApi = ctx.displayText[nodeId];
  return fromApi && fromApi.length > 0 ? fromApi : fallback;
}

export function useFigmaSuggestionOptions(): Array<{ value: string; label: string }> {
  const ctx = useFigmaScreenContext();
  return ctx.suggestionOptions;
}

export function figmaActionProps(action: string): FigmaActionBinding {
  const ctx = useFigmaScreenContext();
  return {
    onClick: (event) => {
      event.preventDefault();
      void ctx.submit(action);
    },
    disabled: ctx.loading,
    'aria-busy': ctx.loading,
  };
}

export function useFigmaScreenData() {
  const ctx = useFigmaScreenContext();
  return {
    bound: ctx.bound,
    values: ctx.values,
    submit: ctx.submit,
    loading: ctx.loading,
    statusMessage: ctx.statusMessage,
    fieldErrors: ctx.fieldErrors,
  };
}
