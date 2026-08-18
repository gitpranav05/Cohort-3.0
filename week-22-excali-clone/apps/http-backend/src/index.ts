import "dotenv/config";
import express from "express";
import { auth } from "./auth";
import { JWT_SECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import {
  CreateUserSchema,
  SignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import e from "express";

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect input",
    });
    return;
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.username,
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });

    res.json({
      email: parsedData.data?.username,
      password: parsedData.data.password,
      name: parsedData.data.name,
    });
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SignInSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data?.username,
        password: parsedData.data.password,
      },
    });

    if (!user) {
      res.status(403).json({
        message: "Not authorized",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: user?.id,
      },
      JWT_SECRET,
    );

    res.json({
      token,
    });
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
});

app.post("/room", auth, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  const uid = req.id;
  if (!uid) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: uid,
      },
    });
    res.json({
      roomId: room.id,
    });
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
});

app.get("/health", (req, res) => {
  res.send({
    message: "Healthy API",
  });
});

app.listen(3001);
