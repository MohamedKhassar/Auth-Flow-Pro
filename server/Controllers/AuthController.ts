import jwt, { JwtPayload } from "jsonwebtoken"
import mongoose from "mongoose"
import "dotenv/config"
import { Request, Response } from "express"
import UserModel, { User } from "../Models/UserModel"
import bcrypt from "bcryptjs"
import RoleModel from "../Models/RoleModel"
import { handelError } from "../Error/handelError"
import { CustomUser } from "../Middlewares/PermissionMiddleware"
const JWT_SECRET: any = process.env.JWT_SECRET
const createToken = (id: mongoose.Types.ObjectId) => {
    const token = jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "1d",
    });
    return token
}
export const signUp = async (req: Request, res: Response) => {
    const { username, email, role } = req.body
    const user = await UserModel.findOne({ email, username })
    try {
        if (user) {
            res.status(400).json({ message: "User already exists" })
        } else {

            const user = await UserModel.create(req.body)
            const role = await RoleModel.findById(user.role)
            const token = createToken(user._id)
            res.status(201).json({ message: "User created", username: user.username, email, role: role?.name, token })
        }
    } catch (error: any) {
        const errorMessage = handelError(error)
        res.status(400).json(errorMessage)
    }
}

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email }).populate<{ role: CustomUser }>("role")
    try {
        if (user) {
            const isPassword = bcrypt.compareSync(password, user.password)
            if (isPassword) {
                const token = createToken(user._id)
                res.status(200).json({ username: user.username, email, role: user.role?.name, token })
            }
            else {
                return res.status(400).json({ message: "Invalid password" })
            }
        }
        else {
            return res.status(400).json({ message: "email not found" })
        }
    } catch (error) {
        const err = handelError(error)
        res.status(400).json(err)
    }
}

export const logOut = (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "Logged out" })
    } catch (error) {
        console.log(error)
    }
}


export const getUser = async (req: Request, res: Response) => {
    try {
        const token: any = req.headers.authorization?.split(" ")[1] || undefined
        if (token) {
            const decode: any = jwt.decode(token)
            const user = await UserModel.findById(decode!.id, { __v: 0, password: 0 }).populate<{ role: CustomUser }>("role")
            if (user) {
                res.status(200).json({ email: user?.email, username: user?.username, role: user?.role.name })
            }
        }


    } catch (error) {
        const err = handelError(error)
        res.json(err)

    }
}