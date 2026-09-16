export const theme = {
  colors: {
    primary: '#D80000',
    secondary: '#9C9C00',
    accent: '#180000',
    background: '#F7F8FA',
    surface: '#FFFFFF',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    error: '#DC2626',
    success: '#16A34A',
    warning: '#D97706',
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '16px',
    lineHeight: '24px',
    heading: {
      fontSize: '28px',
      fontWeight: 600,
      lineHeight: '36px',
    },
    body: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    label: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
    },
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
} as const
