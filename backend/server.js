import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

const server = express();

server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 3000;

server.use("/api/admin", adminRouter);
server.use("/api/blog", blogRouter);
server.use("/api/comment", commentRouter);
server.use("/uploads", express.static("uploads"));

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server Running on Port :", PORT);
  });
});

export default server;
