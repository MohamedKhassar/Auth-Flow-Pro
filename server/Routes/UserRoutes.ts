import { Router } from "express";
import { logOut, signIn, signUp } from "../Controllers/AuthController";
import { authMiddleware } from "../Middlewares/AuthMiddleware";

export const userRouter = Router();

userRouter.post("/signup", signUp)
userRouter.post("/signin", signIn)
userRouter.get("/logout", authMiddleware, logOut)