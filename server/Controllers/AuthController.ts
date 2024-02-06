import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import "dotenv/config"
const JWT_SECRET: any = process.env.JWT_SECRET
const createToken = (id: mongoose.ObjectId) => {
    const token = jwt.sign(id, JWT_SECRET, {
        expiresIn: "1d",
    });
    return token
}