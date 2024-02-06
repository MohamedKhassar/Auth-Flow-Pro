import mongoose from "mongoose";

interface Role {
    name: string,
    permissions: mongoose.ObjectId[]
}

const RoleSchema = new mongoose.Schema<Role>({
    name: {
        type: String,
        required: true
    },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission"
        }
    ]
})

const RoleModel = mongoose.model<Role>("Role", RoleSchema)

export default RoleModel