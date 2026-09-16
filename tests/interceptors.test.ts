import axios, { AxiosError } from "axios";
import { setupInterceptors } from "@/lib/api/interceptors";
import { emitUnauthorized, persistSession, rejectSession } from "@/lib/auth/storage";

jest.mock("@/lib/auth/storage", () => {
  const actual = jest.requireActual("@/lib/auth/storage");
  return {
    ...actual,
    emitUnauthorized: jest.fn(),
  };
});

const emitUnauthorizedMock = emitUnauthorized as jest.MockedFunction<typeof emitUnauthorized>;

function createClient(status: number, url: string) {
  const client = axios.create();
  setupInterceptors(client);
  client.defaults.adapter = async (config) => {
    const requestUrl = config.url ?? url;
    const response = {
      data: {
        success: false,
        message: "Unauthorized",
        error: { code: "UNAUTHORIZED" },
      },
      status,
      statusText: "Unauthorized",
      headers: {},
      config: { ...config, url: requestUrl },
    };
    throw new AxiosError(
      "Request failed",
      "ERR_BAD_REQUEST",
      { ...config, url: requestUrl },
      null,
      response,
    );
  };
  return client;
}

describe("auth interceptors", () => {
  beforeEach(() => {
    window.localStorage.clear();
    emitUnauthorizedMock.mockClear();
    persistSession({
      accessToken: "access-token",
      refreshToken: "refresh-token",
      user: { id: "1", email: "a@b.com", username: "alex", role: "marketing" },
    });
  });

  it("emits unauthorized and does not retry on a 401 for protected routes", async () => {
    const client = createClient(401, "/api/v1/marketing-team-member/calendar");
    await expect(client.get("/api/v1/marketing-team-member/calendar")).rejects.toBeDefined();
    expect(emitUnauthorizedMock).toHaveBeenCalledTimes(1);
  });

  it("does not emit unauthorized for login 401", async () => {
    rejectSession();
    const client = createClient(401, "/api/v1/marketing-team-member/login");
    await expect(
      client.post("/api/v1/marketing-team-member/login", { email_or_username: "a", password: "b" }),
    ).rejects.toBeDefined();
    expect(emitUnauthorizedMock).not.toHaveBeenCalled();
  });
});
