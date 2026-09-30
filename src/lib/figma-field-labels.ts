/** Figma placeholder copy for empty auth fields (Luna text_content validation). */
export const FIGMA_AUTH_FIELD_LABELS = {
  email: 'Email',
  password: 'Password',
  'first-name': 'First Name',
  'last-name': 'Last Name',
  'create-a-password': 'Create a Password',
} as const;

export type FigmaAuthFieldKey = keyof typeof FIGMA_AUTH_FIELD_LABELS;

export const FIGMA_PROFILE_FIELD_LABELS = {
  'first-name': 'First Name',
  'last-name': 'Last Name',
  email: 'Email',
  'mobile-number': 'Mobile Number',
  bio: 'Bio',
  'time-zone-in-washington-dc-usa-gmt-4': 'Time zone in Washington, DC, USA (GMT-4)',
  street: 'Street',
  country: 'Country',
  state: 'State',
  city: 'City',
  zip: 'ZIP',
} as const;

export type FigmaProfileFieldKey = keyof typeof FIGMA_PROFILE_FIELD_LABELS;

export function figmaAuthDisplayValue(field: FigmaAuthFieldKey, value: string): string {
  if (value !== '') return value;
  return FIGMA_AUTH_FIELD_LABELS[field];
}

export function figmaAuthSubmitValue(field: FigmaAuthFieldKey, value: string): string {
  const label = FIGMA_AUTH_FIELD_LABELS[field];
  const trimmed = value.trim();
  return trimmed === label ? '' : trimmed;
}

export function figmaAuthClearLabelOnFocus(field: FigmaAuthFieldKey, value: string): string {
  return value === FIGMA_AUTH_FIELD_LABELS[field] ? '' : value;
}

export function figmaProfileDisplayValue(field: FigmaProfileFieldKey, value: string): string {
  if (value !== '') return value;
  return FIGMA_PROFILE_FIELD_LABELS[field];
}

export function figmaProfileSubmitValue(field: FigmaProfileFieldKey, value: string): string {
  const label = FIGMA_PROFILE_FIELD_LABELS[field];
  const trimmed = value.trim();
  return trimmed === label ? '' : trimmed;
}

export function figmaProfileClearLabelOnFocus(field: FigmaProfileFieldKey, value: string): string {
  return value === FIGMA_PROFILE_FIELD_LABELS[field] ? '' : value;
}
