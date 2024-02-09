import { Router } from "express";
import { logOut, signIn, signUp } from "../Controllers/AuthController";
import { authMiddleware } from "../Middlewares/AuthMiddleware";
import { deleteUser, updateUser, updateUserRole } from "../Controllers/UserController";
import { PerRequire } from "../Middlewares/PermissionMiddleware";

export const userRouter = Router();

userRouter.post("/signup", signUp)
userRouter.post("/signin", signIn)
userRouter.put("/userRole/:id", authMiddleware, PerRequire.isSuperAdmin, updateUserRole)
userRouter.put("/user/:id", authMiddleware, PerRequire.isSuperAdmin, PerRequire.isAdmin, updateUser)
userRouter.delete("/user/:id", authMiddleware, PerRequire.isSuperAdmin, deleteUser)
userRouter.get("/logout", authMiddleware, logOut)