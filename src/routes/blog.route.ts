import express, { Router } from "express";
import { BlogController } from "../controllers";
import { container } from "tsyringe";

const router: Router = express.Router();
const blogController = container.resolve(BlogController);

router.post("/create-post", blogController.addPost.bind(blogController));
router.patch("/update-post", blogController.updatePost.bind(blogController));

export { router as blogRoute };
