import type { Request, Response } from "express";
import { Rescode } from "../index.js";
import crypto from "crypto";
import { ContentModel, LinkModel, UserModel } from "../db.js";

export async function contentPost(req: Request, res: Response) {
  try {
    const userId = (req as any).id;
    const { link, type, title } = (req as any).id;

    if (!link || !title) {
      return res.status(400).json({
        msg: "Missing required fields",
      });
    }

    await ContentModel.create({
      link,
      type,
      title,
      userId,
      tags: [],
    });

    res.status(Rescode.ok).json({
      msg: "Content added",
    });
  } catch (error) {
    res.status(Rescode.serverror).json({
      msg: "Server Error",
    });
  }
}

export async function getPost(req: Request, res: Response) {
  try {
    const userId = (req as any).id;
    const content = await ContentModel.find({
      userId: userId,
    }).populate("userId", "username");

    res.json({
      content,
    });
  } catch (error) {
    res.status(Rescode.serverror).json({
      msg: "Server Error",
    });
  }
}

export async function delPost(req: Request, res: Response) {
  try {
    const contentId = req.body.contentId;

    const content = await ContentModel.findOne({
      contentId,
    });

    if (content?.userId !== (req as any).userId) {
      return res.status(Rescode.wrong).json({
        msg: "You don't own this document",
      });
    }

    await ContentModel.deleteMany({
      contentId,
      userId: (req as any).userId,
    });

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(Rescode.serverror).json({
      msg: "Server Error",
    });
  }
}

export async function share(req: Request, res: Response) {
  try {
    const share = req.body.share;

    if (share) {
      const existingLink = await LinkModel.findOne({
        userId: (req as any).userId,
      });

      if (existingLink) {
        res.json({
          hash: existingLink.hash,
        });
        return;
      }

      const hash = crypto.randomBytes(5).toString("hex");
      await LinkModel.create({
        userId: (req as any).userId,
        hash: hash,
      });

      res.json({
        hash,
      });
    } else {
      await LinkModel.deleteOne({
        userId: (req as any).userId,
      });

      res.json({
        message: "Removed link",
      });
    }
  } catch (error) {
    res.status(Rescode.serverror).json({
      msg: "Server Error",
    });
  }
}

export async function shareLink(req: Request, res: Response) {
  try {
    const hash = req.params.shareLink as string;

    const link = await LinkModel.findOne({
      hash,
    });

    if (!link || !link.userId) {
      return res.status(404).json({
        msg: "Invalid link",
      });
    }
    // userId
    const content = await ContentModel.find({
      userId: link.userId,
    });

    console.log(link);
    const user = await UserModel.findOne({
      _id: link.userId,
    });

    if (!user) {
      res.status(411).json({
        message: "user not found, error should ideally not happen",
      });
      return;
    }

    res.json({
      username: user.username,
      content: content,
    });
  } catch (error) {
    res.status(Rescode.serverror).json({
      msg: "Server Error",
    });
  }
}
