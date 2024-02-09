import { Router } from "express"
import { addPerm, getPerm, updatePerm } from "../Controllers/PermissionController"

export const PermissionRouter = Router()

PermissionRouter.get("/permissions", getPerm)
PermissionRouter.post("/permissions", addPerm)
PermissionRouter.put("/permissions/:id", updatePerm)