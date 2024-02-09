import mongoose from "mongoose";

interface Permissions {
    name: string
}

const permissionSchema = new mongoose.Schema<Permissions>({
    name: {
        type: String,
        required: [true, "please enter a permission"],
        unique: true,
    }
});

export const Permission = mongoose.model('Permission', permissionSchema);
