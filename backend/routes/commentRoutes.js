import express from "express";
import {
  addComment,
  getBlogComment,
} from "../controllers/commentControllers.js";

const commentRouter = express.Router();

commentRouter.post("/add-comment", addComment);
commentRouter.post("/comments", getBlogComment);

export default commentRouter;
