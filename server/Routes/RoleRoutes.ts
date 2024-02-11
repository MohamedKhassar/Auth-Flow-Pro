import { Router } from "express"
import { addRole, deleteRole, getRole, updateRole } from "../Controllers/RoleController"
import { authMiddleware } from "../Middlewares/AuthMiddleware"
import { PerRequire } from "../Middlewares/PermissionMiddleware"

export const RoleRouter = Router()

RoleRouter.post("/roles", authMiddleware, addRole)
RoleRouter.put("/roles/:id", updateRole)
RoleRouter.get("/roles/:id", deleteRole)
RoleRouter.get("/roles/", PerRequire.isAdmin, getRole)