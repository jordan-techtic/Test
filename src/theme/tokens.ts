/**
 * Theme token constants mirroring CSS variables in src/index.css.
 * Update index.css for visual changes; keep these in sync for programmatic use.
 */
export const theme = {
  colors: {
    background: '#F7F8FA',
    foreground: '#111827',
    primary: '#D80000',
    primaryForeground: '#FFFFFF',
    secondary: '#9C9C00',
    accent: '#180000',
    destructive: '#DC2626',
    success: '#16A34A',
    warning: '#D97706',
    border: '#E5E7EB',
    mutedForeground: '#6B7280',
    card: '#FFFFFF',
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '16px',
    lineHeight: '24px',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
} as const;
