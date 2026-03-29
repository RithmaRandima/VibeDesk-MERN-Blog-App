import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";

const server = express();

server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 3000;

server.get("/", (req, res) => {
  res.send("workind");
});

server.use("/api/admin", adminRouter);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server Running on Port :", PORT);
  });
});

export default server;
