import type { Request, Response } from "express";
import { Rescode } from "../index.js";
import crypto from "crypto";
import { ContentModel, LinkModel, UserModel } from "../db.js";

export async function contentPost(req: Request, res: Response) {
  try {
    const userId = (req as any).id;
    const { link, type, title } = (req as any).body;

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

    const content = await ContentModel.findById({
      _id: contentId,
    });



    if (content?.userId.toString() !== (req as any).id) {
      return res.status(Rescode.wrong).json({
        msg: "You don't own this document",
      });
    }

    await ContentModel.deleteOne({
      _id:contentId,
      userId: (req as any).id,
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
        userId: (req as any).id,
      });

      if (existingLink) {
        res.json({
          hash: existingLink.hash,
          msg: "Already existing shareable link",
        });
        return;
      }

      const hash = crypto.randomBytes(5).toString("hex");

      await LinkModel.create({
        userId: (req as any).id,
        hash: hash,
      });

      res.json({
        hash: `${hash}`,
        msg: "Created shareable link",
      });
    } else {
      await LinkModel.deleteOne({
        userId: (req as any).id,
      });

      res.json({
        message: "Removed link",
      });
    }
  } catch (error) {
    res.status(Rescode.serverror).json({
      msg: "Server Error",
      error: error,
    });
  }
}

export async function shareLink(req: Request, res: Response) {
  try {
    const hash = req.params.shareLink as string;

    const link = await LinkModel.findOne({
      hash: hash,
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
      error: error,
    });
  }
}
