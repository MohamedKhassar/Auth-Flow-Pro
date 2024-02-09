import { Request, Response } from "express";
import RoleModel from "../Models/RoleModel";
import { handelError } from "../Error/handelError";
import { Permission } from "../Models/PermissionModel";
import mongoose from "mongoose";

export const addRole = async (req: Request, res: Response) => {
    try {
        let permissions_id: mongoose.ObjectId[]
        if (req.body.name == "admin") {
            const permissions = ["create", "read", "delete"]
            permissions_id = await Permission.find({ name: { $in: permissions } }, { __v: 0, name: 0 })
        } else if (req.body.name == "super_admin") {
            const permissions = ["create", "read", "update", "delete"]
            permissions_id = await Permission.find({ name: { $in: permissions } }, { __v: 0, name: 0 })
        } else {
            const permissions = ["read"]
            permissions_id = await Permission.find({ name: { $in: permissions } }, { __v: 0, name: 0 })
        }
        await RoleModel.create({ name: req.body.name, permissions: permissions_id! })
        res.json({ message: "created successfully" })
    } catch (error) {
        const err = handelError(error)
        res.status(400).json(err)
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

export const getRole = async (req: Request, res: Response) => {
    try {
        const roles = await RoleModel.find()
        // res.json(roles)
    } catch (error) {
        const err = handelError(error)
        // res.status(400).json(err)
    }
}