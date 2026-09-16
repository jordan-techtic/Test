/** Design tokens from the project UI preference. Re-theme here only. */
export const theme = {
  colors: {
    primary: "#003078",
    primaryForeground: "#FFFFFF",
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
    muted: "#F3F4F6",
    sidebarAccent: "#E8EEF6",
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

export const cssVariables: Record<string, string> = {
  "--background": theme.colors.background,
  "--foreground": theme.colors.textPrimary,
  "--card": theme.colors.surface,
  "--card-foreground": theme.colors.textPrimary,
  "--popover": theme.colors.surface,
  "--popover-foreground": theme.colors.textPrimary,
  "--primary": theme.colors.primary,
  "--primary-foreground": theme.colors.primaryForeground,
  "--secondary": theme.colors.secondary,
  "--secondary-foreground": theme.colors.primaryForeground,
  "--muted": theme.colors.muted,
  "--muted-foreground": theme.colors.textSecondary,
  "--accent": theme.colors.accent,
  "--accent-foreground": theme.colors.textPrimary,
  "--destructive": theme.colors.error,
  "--destructive-foreground": theme.colors.primaryForeground,
  "--border": theme.colors.border,
  "--input": theme.colors.border,
  "--ring": theme.colors.primary,
  "--success": theme.colors.success,
  "--warning": theme.colors.warning,
  "--sidebar": theme.colors.surface,
  "--sidebar-foreground": theme.colors.textPrimary,
  "--sidebar-accent": theme.colors.sidebarAccent,
  "--sidebar-accent-foreground": theme.colors.primary,
  "--sidebar-border": theme.colors.border,
  "--scrollbar-thumb": theme.colors.textSecondary,
  "--scrollbar-track": theme.colors.background,
  "--radius": theme.radius.md,
  "--theme-radius-sm": theme.radius.sm,
  "--theme-radius-md": theme.radius.md,
  "--theme-radius-lg": theme.radius.lg,
  "--theme-font-family": theme.typography.fontFamily,
  "--font-size-base": theme.typography.fontSize,
  "--heading-size": theme.typography.headingSize,
  "--heading-line-height": theme.typography.headingLineHeight,
  "--body-line-height": theme.typography.bodyLineHeight,
};

export function applyTheme(target: CSSStyleDeclaration = document.documentElement.style): void {
  for (const [name, value] of Object.entries(cssVariables)) {
    target.setProperty(name, value);
  }
}

export function rootCss(): string {
  const declarations = Object.entries(cssVariables)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
  return `:root {\n${declarations}\n}\n`;
}

