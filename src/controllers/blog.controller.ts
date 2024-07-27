import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { BlogService } from "../services";

@injectable()
export class BlogController {
  constructor(private readonly _blogService: BlogService) {}

  public async addPost(req: Request, res: Response) {
    const user = req.user;
    try {
      const response = await this._blogService.createPost(user.id, req.body);
      return res.status(201).json(response);
    } catch (e) {
      console.log("addPostError==>", e);
      return res
        .status(500)
        .json({ success: false, message: "An internal error has occurred " });
    }
  }

  public async allPosts(req: Request, res: Response) {
    const user = req.user;
    try {
      const response = await this._blogService.viewAllPosts(user.id);
      return res.status(200).json(response);
    } catch (e) {
      console.log("allBlogsError==>", e);
      return res
        .status(500)
        .json({ success: false, message: "An internal error has occurred " });
    }
  }

  public async myBlogPosts(req: Request, res: Response) {
    const user = req.user;
    try {
      const response = await this._blogService.viewMyPosts(user.id);
      return res.status(200).json(response);
    } catch (e) {
      console.log("viewMypostError==>", e);
      return res
        .status(500)
        .json({ success: false, message: "An internal error has occurred " });
    }
  }

  public async getPostById(req: Request, res: Response) {
    const user = req.user;
    const { postId } = req.params;
    try {
      const response = await this._blogService.getPostById(user.id, postId);
      return res.status(200).json(response);
    } catch (e) {
      console.log("viewMypostError==>", e);
      return res
        .status(500)
        .json({ success: false, message: "An internal error has occurred " });
    }
  }

  public async updatePost(req: Request, res: Response) {
    const user = req.user;
    const { postId } = req.params;
    const body = req.body;
    try {
      const response = await this._blogService.updatePostById(
        user.id,
        postId,
        body
      );
      return res.status(200).json(response);
    } catch (e) {
      console.log("updatePostError==>", e);
      return res
        .status(500)
        .json({ success: false, message: "An internal error has occurred " });
    }
  }

  public async deletePost(req: Request, res: Response) {
    const user = req.user;
    const { postId } = req.params;
    try {
      const response = await this._blogService.deletePostById(user.id, postId);
      return res.status(200).json(response);
    } catch (e) {
      console.log("deletePostError==>", e);
      return res
        .status(500)
        .json({ success: false, message: "An internal error has occurred " });
    }
  }
}
