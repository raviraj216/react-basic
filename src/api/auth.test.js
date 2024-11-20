import axios from "axios";
import { authorize, getUserSettings } from "./auth";

jest.mock("axios");

describe("Authentication API functions", () => {
  const jwt = "your-jwt";
  const name = "your-username";
  const password = "your-password";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should authorize user", async () => {
    const userData = { response: "mock" };
    const response = { data: userData };
    axios.post.mockResolvedValue(response);

    const result = await authorize(name, password);

    expect(axios.post).toHaveBeenCalledWith("/auth/local", {
      identifier: name,
      password: password,
    });
    expect(result).toEqual(userData);
  });

  it("should get user settings", async () => {
    const userSettingsData = { response: "mock" };
    const response = { data: { data: userSettingsData } };
    axios.get.mockResolvedValue(response);

    const result = await getUserSettings(jwt);

    expect(axios.get).toHaveBeenCalledWith("/settings", {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    expect(result).toEqual(userSettingsData);
  });
});
