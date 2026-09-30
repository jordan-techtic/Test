/** Figma placeholder copy for empty auth fields (Luna text_content validation). */
export const FIGMA_AUTH_FIELD_LABELS = {
  email: 'Email',
  password: 'Password',
  'first-name': 'First Name',
  'last-name': 'Last Name',
  'create-a-password': 'Create a Password',
} as const;

export type FigmaAuthFieldKey = keyof typeof FIGMA_AUTH_FIELD_LABELS;

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
