import express, { Router } from "express";
import { BlogController } from "../controllers";
import { container } from "tsyringe";
import { Authorize } from "../middleware";

const router: Router = express.Router();
const blogController = container.resolve(BlogController);

router.post(
  "/create-post",
  Authorize,
  blogController.addPost.bind(blogController)
);

router.get(
  "/all-posts",
  Authorize,
  blogController.allPosts.bind(blogController)
);

router.get(
  "/my-posts",
  Authorize,
  blogController.myBlogPosts.bind(blogController)
);

router.get(
  "/my-posts/:postId",
  Authorize,
  blogController.getPostById.bind(blogController)
);

router.patch(
  "/update-post/:postId",
  Authorize,
  blogController.updatePost.bind(blogController)
);

router.delete(
  "/delete-post/:postId",
  Authorize,
  blogController.deletePost.bind(blogController)
);

export { router as blogRoute };
