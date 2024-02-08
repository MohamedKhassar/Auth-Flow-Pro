import mongoose from "mongoose";

interface Role {
    name: string,
}

const RoleSchema = new mongoose.Schema<Role>({
    name: {
        type: String,
        required: true
    }
})

const RoleModel = mongoose.model<Role>("Role", RoleSchema)

export default RoleModel