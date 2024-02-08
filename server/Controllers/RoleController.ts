import { Request, Response } from "express";
import RoleModel from "../Models/RoleModel";

export const addRole = async (req: Request, res: Response) => {
    try {
        await RoleModel.create(req.body)
        res.json({ message: "created successfully" })
    } catch (error) {
        console.log(error)
    }
}

export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await RoleModel.findByIdAndUpdate(id, req.body);
        res.status(201).send("Updated Successfully")
    } catch (error) {
        console.log(error)
    }
}

export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        await RoleModel.findByIdAndDelete(id)
        res.status(201).send("Deleted Successfully")
    } catch (error) {
        console.log(error)
    }
} 