import type { NextFunction, Request, Response } from "express";
import { Rescode } from "./index.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.token as string;

    const decode = jwt.verify(token, JWT_SECRET!) as { id: string };

    if (decode) {
      (req as any).id = decode.id;
      next();
    } else {
      res.status(403).json({
        msg: "Incorrect credentials",
      });
    }
  } catch (error) {
    res.status(Rescode.serverror).json({
      msg: "Server Error",
    });
  }
}
