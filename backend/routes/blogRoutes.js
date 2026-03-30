import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../utilities/multerConfig.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/all/:id", getBlogById);
blogRouter.post("/delete", auth, deleteBlog);
blogRouter.post("/toggle-publish", auth, togglePublish);

export default blogRouter;
