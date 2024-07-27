import { injectable } from "tsyringe";
import {
  BlogRepository,
  CreatePostData,
  updatePostData,
  UserReposistory,
} from "../reposistory";

import _ from "lodash";

@injectable()
export class BlogService {
  constructor(
    private readonly _blogRepository: BlogRepository,
    private readonly _userRepository: UserReposistory
  ) {}

  public async createPost(userId: number, payload: CreatePostData) {
    try {
      const user = await this._userRepository.findById(userId);
      if (!user) {
        return { data: null, message: "No user found", success: false };
      }

      // create new post
      const newPost = await this._blogRepository.createPost({
        title: payload.title,
        content: payload.content,
        isPublished: payload.isPublished,
        user_id: userId,
      });

      if (newPost.success) {
        return {
          data: null,
          message: "Post created successfully",
          success: true,
        };
      } else {
        return {
          data: null,
          message: "An error has occurred",
          success: false,
        };
      }
    } catch (e) {
      console.error("createPostError==>", e);
      return {
        data: null,
        message: "An internal error has occurred",
        success: false,
      };
    }
  }

  public async viewAllPosts(userId: number) {
    try {
      const user = await this._userRepository.findById(userId);
      if (!user) {
        return { data: null, message: "No user found", success: false };
      }

      // retrive all published blog posts
      const blogs = await this._blogRepository.allBlogPosts();

      if (Array.isArray(blogs)) {
        const result = blogs.map((blog: any) => ({
          id: blog.id,
          title: blog.title,
          createdAt: blog.created_at,
        }));

        return {
          data: result,
          message: "Blogs retrieved successfully",
          success: true,
        };
      } else {
        return { success: false, message: "Failed to retrieve blogs" };
      }
    } catch (e) {
      console.error("viewAllBlogsError", e);
      return {
        data: null,
        message: "An internal error has occurred",
        success: false,
      };
    }
  }

  public async viewMyPosts(userId: number) {
    try {
      const user = await this._userRepository.findById(userId);
      if (!user) {
        return { data: null, message: "No user found", success: false };
      }

      const blogs = await this._blogRepository.myBlogPosts(userId);

      if (Array.isArray(blogs)) {
        const result = blogs.map((blog: any) => ({
          id: blog.id,
          title: blog.title,
          content: blog.content,
          isPublished: blog.isPublished,
          createdAt: blog.created_at,
        }));

        return {
          data: result,
          message: "Blogs retrieved successfully",
          success: true,
        };
      } else {
        return { success: false, message: "Failed to retrieve blogs" };
      }
    } catch (e) {
      console.error("viewAllBlogsError", e);
      return {
        data: null,
        message: "An internal error has occurred",
        success: false,
      };
    }
  }

  public async getPostById(userId: number, postId: string) {
    try {
      const user = await this._userRepository.findById(userId);
      if (!user) {
        return { data: null, message: "No user found", success: false };
      }

      const post = await this._blogRepository.getPostById(postId);

      if (!post) {
        return { data: null, message: "no post found", success: false };
      }

      const result = _.omit(post, ["user_id", "isPublished"]);

      return {
        data: result,
        message: "Post retrieved successfully",
        success: true,
      };
    } catch (e) {
      console.error("getPostByIdError", e);
      return {
        data: null,
        message: "An internal error has occurred",
        success: false,
      };
    }
  }

  public async updatePostById(
    userId: number,
    postId: string,
    payload: updatePostData
  ) {
    try {
      const user = await this._userRepository.findById(userId);
      if (!user) {
        return { data: null, message: "No user found", success: false };
      }

      const updatedPost = await this._blogRepository.updatePostById(
        postId,
        payload
      );

      if (updatedPost !== 1) {
        return { success: false, message: "post could not be updated" };
      }

      const post = await this._blogRepository.getPostById(postId);
      const result = _.omit(post, ["user_id", "isPublished"]);

      return {
        data: result,
        message: "Post updated successfully",
        success: true,
      };
    } catch (e) {
      console.error("updatePostByIdError", e);
      return {
        data: null,
        message: "An internal error has occurred",
        success: false,
      };
    }
  }

  public async deletePostById(userId: number, postId: string) {
    try {
      const user = await this._userRepository.findById(userId);
      if (!user) {
        return { data: null, message: "No user found", success: false };
      }

      const post = await this._blogRepository.deletePostById(postId);

      if (post !== 1) {
        return { success: false, message: "post could not be deleted" };
      }

      return {
        data: null,
        message: `Post with ID: ${postId} was deleted successfully`,
        success: true,
      };
    } catch (e) {
      console.error("deletePostByIdError", e);
      return {
        data: null,
        message: "An internal error has occurred",
        success: false,
      };
    }
  }
}
