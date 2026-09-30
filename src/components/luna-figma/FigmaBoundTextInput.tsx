import type { InputHTMLAttributes } from 'react';
import {
  FIGMA_AUTH_FIELD_LABELS,
  FIGMA_PROFILE_FIELD_LABELS,
  figmaAuthDisplayValue,
  figmaProfileDisplayValue,
  type FigmaAuthFieldKey,
  type FigmaProfileFieldKey,
} from '../../lib/figma-field-labels';
import { figmaFieldProps, useFigmaScreenData } from './useFigmaScreenData';

type FigmaBoundTextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  figmaNodeId: string;
  field: string;
  labelClassName: string;
};

function resolveDisplayText(bound: string, field: string, bindingValue: string | undefined, rawValue: string): string {
  const effective = bindingValue ?? rawValue;
  if (bound === 'profile' && field in FIGMA_PROFILE_FIELD_LABELS) {
    return figmaProfileDisplayValue(field as FigmaProfileFieldKey, effective);
  }
  if ((bound === 'sign-in' || bound === 'sign-up') && field in FIGMA_AUTH_FIELD_LABELS) {
    return figmaAuthDisplayValue(field as FigmaAuthFieldKey, effective);
  }
  return effective;
}

/** Renders a measurable text node for Luna validation; input keeps data-figma-field only. */
export function FigmaBoundTextInput({
  figmaNodeId,
  field,
  labelClassName,
  className,
  ...rest
}: FigmaBoundTextInputProps) {
  const screenData = useFigmaScreenData();
  const binding = figmaFieldProps(field);
  const rawValue = String((screenData.values as Record<string, string> | undefined)?.[field] ?? '');
  const labelText = resolveDisplayText(screenData.bound, field, binding.value, rawValue);
  const inputBinding = { ...binding, value: labelText };
  return (
    <>
      <p data-figma-node={figmaNodeId} aria-hidden="true" className={`pointer-events-none ${labelClassName}`}>
        {labelText}
      </p>
      <input data-figma-field={field} {...inputBinding} {...rest} className={className} />
    </>
  );
}
