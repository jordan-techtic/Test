import type { ChangeEvent, FocusEvent, MouseEvent } from 'react';

export type FigmaFieldBinding = {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  'aria-invalid'?: boolean;
};

export type FigmaActionBinding = {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  'aria-disabled'?: boolean;
  role?: string;
  tabIndex?: number;
  'aria-pressed'?: boolean;
};

export const fieldBindingsRef: { current: Record<string, FigmaFieldBinding> } = { current: {} };
export const actionBindingsRef: { current: Record<string, FigmaActionBinding> } = { current: {} };

export function figmaFieldProps(field: string): FigmaFieldBinding {
  return fieldBindingsRef.current[field] ?? {};
}

export function figmaActionProps(action: string): FigmaActionBinding {
  return actionBindingsRef.current[action] ?? {};
}
