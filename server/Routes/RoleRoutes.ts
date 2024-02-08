import { Router } from "express"
import { addRole, deleteRole, updateRole } from "../Controllers/RoleController"
import { authMiddleware } from "../Middlewares/AuthMiddleware"

export const RoleRouter = Router()

RoleRouter.post("/roles", authMiddleware, addRole)
RoleRouter.put("/roles/:id", updateRole)
RoleRouter.get("/roles/:id", deleteRole)