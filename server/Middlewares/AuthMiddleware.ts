import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config"
const JWT_SECRET = process.env.JWT_SECRET
interface CustomRequest extends Request {
    decoded?: string
}
export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const { access_token } = req.cookies || undefined
    if (access_token) {
        jwt.verify(access_token, JWT_SECRET!, (err: any, decoded: any) => {
            if (err) {
                res.status(401).json({ message: "Unauthorized" })
            } else {
                (req as CustomRequest).decoded = decoded;
                next()
            }
        })
    } else {
        res.status(401).json({ message: "Unauthorized" })
    }
}