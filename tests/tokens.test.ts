import { theme } from "@/theme/tokens";

describe("theme tokens", () => {
  it("uses the project primary brand color", () => {
    expect(theme.colors.primary).toBe("#900018");
    expect(theme.typography.fontSize).toBe("16px");
    expect(theme.spacing.medium).toBe("16px");
  });
});
