import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config"
import mongoose from "mongoose";
import UserModel, { User } from "../Models/UserModel";

export interface CustomJwt extends JwtPayload {
    id: string
}

export interface CustomUser extends User {
    name: string,
}
interface CustomReq extends Request {
    cookies: {
        access_token: string
    }
}
export const PerRequire = {
    isAdmin: async (req: CustomReq, res: Response, next: NextFunction) => {
        const decode = jwt.decode(req.cookies.access_token) as CustomJwt
        const user = await UserModel.findById(decode.id).populate<{ role: CustomUser }>("role")
        if (user?.role.name == "admin") {
            next()
        } else {
            res.json({ msg: "you're not allowed" })
        }
    },
    isSuperAdmin: async (req: CustomReq, res: Response, next: NextFunction) => {
        const decode = jwt.decode(req.cookies.access_token) as CustomJwt
        const user = await UserModel.findById(decode.id).populate<{ role: CustomUser }>("role")
        if (user?.role.name == "super_admin") {
            next()
        } else {
            res.json({ msg: "you're not allowed" })
        }
    }
}