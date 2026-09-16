import { ApiError, getApiErrorMessage } from "@/lib/api/errors";

describe("getApiErrorMessage", () => {
  it("keeps invalid-credential copy instead of a session-expired message", () => {
    const error = new ApiError(
      "Invalid email or username or password.",
      401,
      "INVALID_CREDENTIALS",
      [{ field: "email_or_username", message: "Invalid email or username or password." }],
    );
    expect(getApiErrorMessage(error)).toBe("Invalid email or username or password.");
  });

  it("maps expired sessions to a sign-in prompt", () => {
    const error = new ApiError("Unauthorized", 401, "UNAUTHORIZED", []);
    expect(getApiErrorMessage(error)).toBe("Your session may have expired. Please sign in again.");
  });
});
