import { Request, Response } from "express";
import { Permission } from "../Models/PermissionModel";
import { handelError } from "../Error/handelError";

export const addPerm = async (req: Request, res: Response) => {
    const { name } = req.body
    try {
        await Permission.create({ name })
        res.json({ message: "created successfully" })
    } catch (error) {
        const err = handelError(error)
        res.status(400).json(err)
    }
}
export const updatePerm = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await Permission.findByIdAndUpdate(id, req.body)
        res.json({ message: "updated successfully" })
    } catch (error) {
        const err = handelError(error)
        res.status(400).json(err)
    }
}
export const getPerm = async (req: Request, res: Response) => {
    try {
        const permissions = await Permission.find()
        res.json(permissions)
    } catch (error) {
        const err = handelError(error)
        res.status(400).json(err)
    }
}