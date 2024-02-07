import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import "dotenv/config"
import { Request, Response } from "express"
import UserModel from "../Models/UserModel"
import bcrypt from "bcryptjs"
const JWT_SECRET: any = process.env.JWT_SECRET
const createToken = (id: mongoose.Types.ObjectId) => {
    const token = jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "1d",
    });
    return token
}
export const signUp = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    const user = await UserModel.findOne({ email, username })
    try {
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        } else {
            const user = await UserModel.create({ username, email, password })
            const token = createToken(user._id)
            return res.status(201).json({ message: "User created", user, token })
        }
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (user) {
        const isPassword = bcrypt.compareSync(password, user.password)
        if (isPassword) {
            const token = createToken(user._id)
            res.cookie("access_token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 })
            res.status(200).json({ username: user.username, email, token })
        }
        else {
            return res.status(400).json({ message: "Invalid password" })
        }
    }
    else {
        return res.status(400).json({ message: "Invalid email" })
    }
}


