export const theme = {
  colors: {
    primary: "#900018",
    secondary: "#901818",
    accent: "#F0F0D8",
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
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    fontSize: "16px",
    headingSize: "28px",
    headingWeight: 600,
    headingLineHeight: "36px",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
} as const;
