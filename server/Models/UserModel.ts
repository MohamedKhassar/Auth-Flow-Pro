import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail";
import { isStrongPassword } from "validator";
export interface User {
    username: string,
    email: string,
    password: string,
    role: mongoose.ObjectId
}

const UserSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate: [isEmail, "Email not valid"],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: [isStrongPassword, "Password not valid"]
    },
    role:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }

})

UserSchema.pre("save", async function () {
    const salt = bcrypt.genSaltSync()
    this.password = bcrypt.hashSync(this.password, salt)
})

const UserModel = mongoose.model("User", UserSchema)

export default UserModel