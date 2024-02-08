import mongoose from "mongoose";
import bcrypt from "bcryptjs";
interface User {
    username: string,
    email: string,
    password: string,
    role: mongoose.ObjectId
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
    role:
    {
        type: mongoose.Schema.Types.ObjectId,
        default: "65c3941bf83cacbc62afb87e",
        ref: "Role"
    }

})

UserSchema.pre("save", async function () {
    const salt = bcrypt.genSaltSync()
    this.password = bcrypt.hashSync(this.password, salt)
})

const UserModel = mongoose.model("User", UserSchema)

export default UserModel