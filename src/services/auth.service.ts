import { injectable } from "tsyringe";
import { UserReposistory } from "../reposistory";

@injectable()
export class AuthService {
  constructor(private readonly _userReposistory: UserReposistory) {}

  public async register() {
    // logic goes here
  }

  public async login() {
    // logic goes here
  }
}
