import mongoose from "mongoose";

interface Permission {
    name: string
}

const PermissionSchema = new mongoose.Schema<Permission>({
    name: {
        type: String,
        required: true
    }
})

const PermissionModel = mongoose.model<Permission>("Permission", PermissionSchema)
export default PermissionModel