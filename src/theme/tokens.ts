export const theme = {
  colors: {
    primary: "#900018",
    secondary: "#901818",
    accent: "#F0F0D8",
    background: "#F7F8FA",
    surface: "#FFFFFF",
    foreground: "#111827",
    mutedForeground: "#6B7280",
    border: "#E5E7EB",
    destructive: "#DC2626",
    success: "#16A34A",
    warning: "#D97706",
  },
  typography: {
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    fontSize: "16px",
    heading: {
      fontSize: "28px",
      fontWeight: 600,
      lineHeight: "36px",
    },
    body: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
    },
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
