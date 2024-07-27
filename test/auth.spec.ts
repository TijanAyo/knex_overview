import "reflect-metadata";

import { AuthService } from "../src/services";
import { UserReposistory } from "../src/reposistory";
import { jest } from "@jest/globals";

jest.mock("../src/reposistory");

describe("AuthService", () => {
  let authService: AuthService;
  let userReposistory: UserReposistory;

  beforeEach(async () => {
    userReposistory = new UserReposistory();
    authService = new AuthService(userReposistory);
  });

  it("Should register a new user successfully", async () => {
    const payload = {
      first_name: "John",
      last_name: "doe",
      username: "johndoe",
      password: "password123",
    };

    jest.spyOn(userReposistory, "findByUserName").mockResolvedValue(null);
    jest.spyOn(userReposistory, "createUser").mockResolvedValue([1]);

    const result = await authService.register(payload);

    expect(result).toEqual({
      success: true,
      message: "User created successfully",
    });
  });

  it("should return an error if username already exist", async () => {
    const payload = {
      first_name: "John",
      last_name: "doe",
      username: "user4",
      password: "password123",
    };

    jest
      .spyOn(userReposistory, "findByUserName")
      .mockResolvedValue({ ...payload });

    const result = await authService.register(payload);

    expect(result).toEqual({
      success: false,
      message: "Username already associated with another user",
    });
  });
});
