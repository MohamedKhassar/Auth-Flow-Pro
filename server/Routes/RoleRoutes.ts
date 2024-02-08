import { Router } from "express"
import { addRole, deleteRole, updateRole } from "../Controllers/RoleController"

export const RoleRouter = Router()

RoleRouter.post("/roles", addRole)
RoleRouter.put("/roles/:id", updateRole)
RoleRouter.get("/roles/:id", deleteRole)