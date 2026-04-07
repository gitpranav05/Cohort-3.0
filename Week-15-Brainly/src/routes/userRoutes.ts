import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { z } from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "../db.js";
import { Rescode } from "../index.js";
import type { Request, Response } from "express";
import { JWT_SECRET } from "../config.js";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const PORT = process.env.PORT;

if (!MONGO_URL) {
  process.exit(1);
}

export async function signUp(req: Request, res: Response) {
  try {
    const required = z.object({
      username: z.string().min(3).max(30),
      password: z.string().min(3).max(30),
    });

    const parsing = required.safeParse(req.body);

    if (!parsing.success) {
      return res.status(Rescode.inperror).json({
        msg: "Invalid Credentials",
        error: parsing.error.issues[0]?.message,
      });
    }

    const username = req.body.username;
    const password = req.body.password;

    const hashedPass = await bcrypt.hash(password, 10);
    await UserModel.create({
      username: username,
      password: hashedPass,
    });

    res.status(Rescode.ok).json({
      msg: "Signed Up Successfully",
    });
  } catch (error) {
    res.status(Rescode.serverror).json({
      msg: "User already exists",
    });
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const required = z.object({
      username: z.string().min(3).max(30),
      password: z.string().min(3).max(30),
    });

    const parsing = required.safeParse(req.body);

    if (!parsing.success) {
      return res.status(Rescode.inperror).json({
        msg: "Invalid Credentials",
        error: parsing.error.issues[0]?.message,
      });
    }

    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({
      username: username,
    });

    if (!user) {
      return res.status(Rescode.notfound).json({
        msg: "User not found",
      });
    }
    console.log(user);

    const passMatch = await bcrypt.compare(password, user.password);

    if (passMatch) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET!);
      res.status(Rescode.ok).json({
        msg: "Signed In Successfully",
        token: token,
      });
    } else {
      return res.status(411).json({
        msg: "Incorrect credentials",
      });
    }
  } catch (error) {
    res.status(Rescode.serverror).json({
      msg: "Server Error",
    });
  }
}
