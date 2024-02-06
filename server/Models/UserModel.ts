import mongoose from "mongoose";

interface User {
    username: string,
    email: string,
    password: string,
    roles: mongoose.ObjectId[]
}

const UserSchema = new mongoose.Schema<User>({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
})

const UserModel = mongoose.model<User>("User", UserSchema)
export default UserModel