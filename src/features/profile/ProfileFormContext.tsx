import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ApiClientError } from '../../lib/apiClient';
import { mapApiValidationErrors } from '../auth/mapApiValidationErrors';
import { getProfile, putProfile } from './profileApi';
import type { ProfileData, ProfileUpdateRequest } from './profileTypes';
import { validateProfileFields } from './validateProfile';

export type ProfileFormStatus = 'loading' | 'idle' | 'submitting' | 'success' | 'error';

interface ProfileFormContextValue {
  displayName: string;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  mobileNumber: string;
  setMobileNumber: (value: string) => void;
  bio: string;
  setBio: (value: string) => void;
  timeZone: string;
  setTimeZone: (value: string) => void;
  street: string;
  setStreet: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  state: string;
  setStateValue: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  zip: string;
  setZip: (value: string) => void;
  status: ProfileFormStatus;
  statusMessage: string;
  save: () => Promise<void>;
  cancel: () => void;
  beginPasswordChange: () => void;
  submitPasswordChange: (newPassword: string) => Promise<void>;
  passwordChangeOpen: boolean;
}

const ProfileFormContext = createContext<ProfileFormContextValue | null>(null);

function applyProfileData(data: ProfileData, apply: (values: ProfileUpdateRequest) => void): void {
  apply({
    first_name: data.first_name ?? '',
    last_name: data.last_name ?? '',
    email: data.email ?? '',
    mobile_number: data.mobile_number ?? '',
    bio: data.bio ?? '',
    street: data.street ?? '',
    city: data.city ?? '',
    state: data.state ?? '',
    zip: data.zip ?? '',
    country: data.country ?? '',
    time_zone: data.time_zone ?? '',
  });
}

export function ProfileFormProvider({ children }: { children: ReactNode }) {
  const snapshotRef = useRef<ProfileUpdateRequest | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bio, setBio] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [street, setStreet] = useState('');
  const [country, setCountry] = useState('');
  const [state, setStateValue] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState<ProfileFormStatus>('loading');
  const [statusMessage, setStatusMessage] = useState('');
  const [passwordChangeOpen, setPasswordChangeOpen] = useState(false);

  const currentPayload = useCallback(
    (): ProfileUpdateRequest => ({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      mobile_number: mobileNumber.trim(),
      bio: bio.trim(),
      street: street.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      country: country.trim(),
      time_zone: timeZone.trim(),
    }),
    [bio, city, country, email, firstName, lastName, mobileNumber, state, street, timeZone, zip],
  );

  const loadProfile = useCallback(async () => {
    setStatus('loading');
    setStatusMessage('Loading profile…');
    try {
      const response = await getProfile();
      const data = response.data ?? {};
      applyProfileData(data, (values) => {
        setFirstName(values.first_name);
        setLastName(values.last_name);
        setEmail(values.email);
        setMobileNumber(values.mobile_number);
        setBio(values.bio);
        setStreet(values.street);
        setCity(values.city);
        setStateValue(values.state);
        setZip(values.zip);
        setCountry(values.country);
        setTimeZone(values.time_zone);
        snapshotRef.current = values;
      });
      setStatus('idle');
      setStatusMessage('');
    } catch (error) {
      setStatus('error');
      if (error instanceof ApiClientError && error.status === 401) {
        setStatusMessage('Sign in to view your profile.');
      } else {
        setStatusMessage('Could not load profile.');
      }
    }
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const save = useCallback(async () => {
    const payload = currentPayload();
    const errors = validateProfileFields(payload);
    if (Object.keys(errors).length > 0) {
      setStatus('error');
      setStatusMessage(Object.values(errors)[0] ?? 'Fix validation errors.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('Saving profile…');
    try {
      await putProfile(payload);
      snapshotRef.current = payload;
      setStatus('success');
      setStatusMessage('Profile saved.');
      setStatus('idle');
    } catch (error) {
      const mapped = mapApiValidationErrors(error);
      setStatus('error');
      setStatusMessage(mapped._form ?? 'Could not save profile.');
    }
  }, [currentPayload]);

  const cancel = useCallback(() => {
    if (snapshotRef.current) {
      const values = snapshotRef.current;
      setFirstName(values.first_name);
      setLastName(values.last_name);
      setEmail(values.email);
      setMobileNumber(values.mobile_number);
      setBio(values.bio);
      setStreet(values.street);
      setCity(values.city);
      setStateValue(values.state);
      setZip(values.zip);
      setCountry(values.country);
      setTimeZone(values.time_zone);
    }
    setStatus('idle');
    setStatusMessage('Changes discarded.');
  }, []);

  const beginPasswordChange = useCallback(() => {
    setPasswordChangeOpen(true);
    setStatusMessage('Enter a new password in the password field, then confirm.');
  }, []);

  const submitPasswordChange = useCallback(async (newPassword: string) => {
    if (newPassword.length === 0) {
      setStatus('error');
      setStatusMessage('Password is required.');
      return;
    }
    setStatus('submitting');
    setStatusMessage('Updating password…');
    try {
      await putProfile({ ...currentPayload(), password: newPassword });
      setPasswordChangeOpen(false);
      setStatus('success');
      setStatusMessage('Password updated.');
      setStatus('idle');
    } catch (error) {
      const mapped = mapApiValidationErrors(error);
      setStatus('error');
      setStatusMessage(mapped._form ?? 'Could not update password.');
    }
  }, [currentPayload]);

  const displayName = useMemo(() => {
    const composed = `${firstName} ${lastName}`.trim();
    return composed.length > 0 ? composed : 'Joseph Stanley';
  }, [firstName, lastName]);

  const value: ProfileFormContextValue = {
    displayName,
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
    statusMessage,
    save,
    cancel,
    beginPasswordChange,
    submitPasswordChange,
    passwordChangeOpen,
  };

  return <ProfileFormContext.Provider value={value}>{children}</ProfileFormContext.Provider>;
}

export function useProfileForm(): ProfileFormContextValue {
  const ctx = useContext(ProfileFormContext);
  if (!ctx) {
    throw new Error('useProfileForm must be used within ProfileFormProvider');
  }
  return ctx;
}
