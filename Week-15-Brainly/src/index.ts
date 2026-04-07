import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { signIn, signUp } from "./routes/userRoutes.js";
import { userMiddleware } from "./middleware.js";
import {
  contentPost,
  delPost,
  getPost,
  share,
  shareLink,
} from "./routes/contenRoutes.js";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
if (!MONGO_URL) {
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log("Server listening on " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export enum Rescode {
  ok = 200,
  wrong = 403,
  notfound = 404,
  inperror = 411,
  serverror = 500,
}

app.get("/api/health", (req, res) => {
  try {
    res.status(Rescode.ok).json({
      health: "OK",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

app.post("/api/v1/signup", signUp);

app.post("/api/v1/signin", signIn);

app.post("/api/v1/content", userMiddleware, contentPost);

app.get("/api/v1/content", userMiddleware, getPost);

app.delete("/api/v1/content", userMiddleware, delPost);

app.post("/api/v1/brain/share", userMiddleware, share);

app.post("/api/v1/brain/:shareLink", userMiddleware, shareLink);
