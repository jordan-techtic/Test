import { breakpoints } from './breakpoints';
import { colors, radius, shadows, spacing, typography, type TypographyToken } from './tokens';

function cssTokenName(name: string): string {
  return name.replace('--', '-minus-');
}

export function buildRootCssVariables(): string {
  const lines: string[] = [];

  for (const [name, value] of Object.entries(colors)) {
    lines.push(`--color-${cssTokenName(name)}: ${value};`);
  }

  for (const [name, token] of Object.entries(typography) as [string, TypographyToken][]) {
    const key = cssTokenName(name);
    const fontFamily =
      token.fontFamily === 'Fellix' ? 'Fellix, Almarai, sans-serif' : token.fontFamily;
    lines.push(`--font-${key}: ${fontFamily};`);
    lines.push(`--fs-${key}: ${token.fontSize};`);
    lines.push(`--fw-${key}: ${String(token.fontWeight)};`);
    lines.push(`--lh-${key}: ${token.lineHeight};`);
    if (token.letterSpacing) {
      lines.push(`--ls-${key}: ${token.letterSpacing};`);
    }
  }

  for (const [name, value] of Object.entries(spacing)) {
    lines.push(`--${cssTokenName(name)}: ${value};`);
  }

  for (const [name, value] of Object.entries(radius)) {
    lines.push(`--${cssTokenName(name)}: ${value};`);
  }

  for (const [name, token] of Object.entries(shadows)) {
    lines.push(`--shadow-${cssTokenName(name)}-raw: ${JSON.stringify(token.raw)};`);
    lines.push(`--shadow-${cssTokenName(name)}: ${token.css};`);
  }

  lines.push(`--breakpoint-mobile: ${breakpoints.mobile};`);
  lines.push(`--breakpoint-tablet: ${breakpoints.tablet};`);
  lines.push(`--breakpoint-desktop: ${breakpoints.desktop};`);

  return lines.join('\n  ');
}
