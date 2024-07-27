import { injectable } from "tsyringe";
import { UserReposistory } from "../reposistory";
import { compareHash, generateAccessToken, hashPayload } from "../utils";

@injectable()
export class AuthService {
  constructor(private readonly _userReposistory: UserReposistory) {}

  public async register(payload: {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
  }) {
    try {
      const usernameExist = await this._userReposistory.findByUserName(
        payload.username
      );
      if (usernameExist) {
        return {
          success: false,
          message: "Username already associated with another user",
        };
      }

      const hashedPassword = await hashPayload(payload.password);

      // Create new user
      const user = await this._userReposistory.createUser({
        username: payload.username,
        first_name: payload.first_name,
        last_name: payload.last_name,
        password: hashedPassword,
      });

      console.log("User output==>", user);

      return {
        data: null,
        success: true,
        message: "User created successfully",
      };
    } catch (e) {
      console.log("registerError==>", e);
      return { success: false, message: "an internal error has occurred" };
    }
  }

  public async login(payload: { username: string; password: string }) {
    try {
      const user = await this._userReposistory.findByUserName(payload.username);
      if (!user) {
        return {
          success: false,
          message: "Username is not associated with another user",
        };
      }

      const dehash = await compareHash(payload.password, user.password);
      if (!dehash) {
        return {
          success: false,
          message: "Invalid username or password",
        };
      }

      // generate access token
      const token = await generateAccessToken(user.id);

      return {
        data: token,
        message: "Authorization successful",
        success: true,
      };
    } catch (e) {
      console.log("loginError==>", e);
      return { success: false, message: "An internal error has occurred" };
    }
  }
}
