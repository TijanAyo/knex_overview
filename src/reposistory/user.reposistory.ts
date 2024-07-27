import { injectable } from "tsyringe";
import { KNEX } from "../db";

@injectable()
export class UserReposistory {
  async findById(id: number) {
    try {
      const user = await KNEX("users").where({ id }).first();
      return user;
    } catch (e) {
      console.log("findbyIdError==>", e);
      return {
        data: null,
        success: false,
        message: "An unexpected error has occurred",
      };
    }
  }

  async findByUserName(username: string) {
    try {
      const user = await KNEX("users").where({ username }).first();
      return user;
    } catch (e) {
      console.log("findbyUsernameError==>", e);
      return { success: false, message: "An unexpected error has occurred" };
    }
  }

  async createUser(data: {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
  }) {
    try {
      const user = await KNEX("users").insert({
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        password: data.password,
      });

      if (!user) {
        console.log("An error occurred while inserting new user");
        return { success: false, message: "An unexpected error occurred" };
      }

      return user;
    } catch (e) {
      console.log("createUserError==>", e);
      return { success: false, message: "An unexpected error has occurred" };
    }
  }
}
