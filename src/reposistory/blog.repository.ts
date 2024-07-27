import { injectable } from "tsyringe";
import { KNEX } from "../db";

export interface CreatePostData {
  title: string;
  content: string;
  isPublished: boolean;
  user_id: number;
}

export interface updatePostData {
  title: string;
  content: string;
  isPublished: boolean;
}

@injectable()
export class BlogRepository {
  constructor() {}

  async createPost(data: CreatePostData) {
    const trx = await KNEX.transaction();
    try {
      await trx("blogs").insert({
        title: data.title,
        content: data.content,
        isPublished: data.isPublished,
        user_id: data.user_id,
      });

      await trx.commit();

      return { success: true };
    } catch (e) {
      console.log("createPostError==>", e);
      await trx.rollback();
      return { success: false, message: "An unexpected error has occurred" };
    }
  }

  async allBlogPosts() {
    try {
      return await KNEX("blogs")
        .select("*")
        .where("isPublished", 1)
        .orderBy("created_at", "desc");
    } catch (e) {
      console.log("allBlogPostError", e);
      return { success: false, message: "An unexpected error has occurred" };
    }
  }

  async myBlogPosts(userId: number) {
    try {
      return await KNEX("blogs")
        .where("user_id", userId)
        .orderBy("created_at", "desc");
    } catch (e) {
      console.log("myBlogPostsError", e);
      return { success: false, message: "An unexpected error has occurred" };
    }
  }

  async getPostById(postId: string) {
    try {
      return await KNEX("blogs").select("*").where("id", postId).first();
    } catch (e) {
      console.log("getPostByIdError", e);
      return { success: false, message: "An unexpected error has occurred" };
    }
  }

  async updatePostById(postId: string, data: updatePostData) {
    try {
      return await KNEX("blogs").where("id", postId).update({
        title: data.title,
        content: data.content,
        isPublished: data.isPublished,
      });
    } catch (e) {
      console.log("updatePostByIdError", e);
      return { success: false, message: "An unexpected error has occurred" };
    }
  }

  async deletePostById(postId: string) {
    try {
      return await KNEX("blogs").where("id", postId).del();
    } catch (e) {
      console.log("deletePostByIdError", e);
      return { success: false, message: "An unexpected error has occurred" };
    }
  }
}
