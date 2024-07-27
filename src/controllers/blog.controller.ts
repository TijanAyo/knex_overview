import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { BlogService } from "../services";

@injectable()
export class BlogController {
  constructor(private readonly _blogService: BlogService) {}

  public async addPost(req: Request, res: Response) {
    try {
      const response = await this._blogService.createPost();
      return res.status(201).json(response);
    } catch (e) {
      console.log("addPostError==>", e);
      return res
        .status(500)
        .json({ success: false, message: "An internal error has occurred " });
    }
  }

  public async updatePost(req: Request, res: Response) {
    try {
      const response = await this._blogService.updatePost();
      return res.status(201).json(response);
    } catch (e) {
      console.log("updatePostError==>", e);
      return res
        .status(500)
        .json({ success: false, message: "An internal error has occurred " });
    }
  }
}
