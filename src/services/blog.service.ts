import { injectable } from "tsyringe";

@injectable()
export class BlogService {
  constructor() {}

  public async createPost() {
    return "Create post service";
  }

  public async updatePost() {
    return "updatepost service";
  }
}
