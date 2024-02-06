import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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

UserSchema.pre("save", async function () {
    const salt = bcrypt.genSaltSync()
    this.password = bcrypt.hashSync(this.password, salt)
})

const UserModel = mongoose.model<User>("User", UserSchema)

export default UserModel