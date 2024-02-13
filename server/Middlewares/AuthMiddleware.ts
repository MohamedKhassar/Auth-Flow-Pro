import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config"
const JWT_SECRET = process.env.JWT_SECRET
export interface CustomRequest extends Request {
    decoded?: string
}
export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1] || undefined
    if (token) {
        jwt.verify(token, JWT_SECRET!, (err: any, decoded: any) => {
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