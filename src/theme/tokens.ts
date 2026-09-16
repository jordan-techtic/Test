/** Design tokens from the project UI preference. Re-theme here only. */
export const theme = {
  colors: {
    primary: "#003078",
    secondary: "#8C8C8C",
    accent: "#909090",
    background: "#F7F8FA",
    surface: "#FFFFFF",
    textPrimary: "#111827",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    error: "#DC2626",
    success: "#16A34A",
    warning: "#D97706",
  },
  typography: {
    fontFamily: "Inter",
    fontSize: "16px",
    headingSize: "28px",
    headingLineHeight: "36px",
    bodyLineHeight: "24px",
  },
  spacing: {
    small: "8px",
    medium: "16px",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
} as const;
