import { Request, Response } from "express";
import UserModel from "../Models/UserModel";
import { handelError } from "../Error/handelError";
import RoleModel from "../Models/RoleModel";
import { CustomUser } from "../Middlewares/PermissionMiddleware";

export const updateUserRole = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    try {
        const role_id = await RoleModel.findOne({ name })
        const user = await UserModel.findByIdAndUpdate(id, { role: role_id?.id }, { new: true }).populate<{ role: CustomUser }>("role")
        res.status(200).json({ message: "Role updated", username: user?.username, email: user?.email, role: user?.role.name })
    } catch (error) {
        const err = handelError(error)
        res.status(400).json(err)
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await UserModel.findByIdAndDelete(id)
        res.status(200).json({ message: "User deleted" })
    } catch (error) {

    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true }).populate<{ role: CustomUser }>("role")
        res.status(200).json({ message: "User updated", username: user?.username, email: user?.email, role: user?.role.name })
    } catch (error) {
        const err = handelError(error)
        res.status(400).json(err)
    }
}