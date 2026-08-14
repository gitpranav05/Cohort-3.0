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

const app = express();

app.use(express.json());

app.post("/signup",async (req, res) => {
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
    res.status(411).json({
      message: "User already exists",
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
      id:user?.id,
    },
    JWT_SECRET,
  );

  res.json({
    token,
  });
});

app.post("/create-room", auth, (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  res.json({
    roomId: 123,
  });
});

app.get("/health", (req, res) => {
  res.send({
    message: "Healthy API",
  });
});

app.listen(3001);
