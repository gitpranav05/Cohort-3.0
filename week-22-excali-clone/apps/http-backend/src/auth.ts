import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from '@repo/backend-common/config'



export const auth: any = (req: Request & { id?: string }, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token, JWT_SECRET) as { id?: string }

    if (decoded ) {
        req.id = decoded.id;
        next(); 
    }
    else {
        res.status(403).json({
            message: "Unauthorized"
        })
    }
}