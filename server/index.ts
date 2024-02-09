import express from "express"
import "./Connection/Connection"
import "dotenv/config"
import { userRouter } from "./Routes/UserRoutes"
import cookieParser from 'cookie-parser';
import cors from "cors"
import { RoleRouter } from "./Routes/RoleRoutes";
import { PermissionRouter } from "./Routes/PermissionRoutes";
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api", userRouter)
app.use("/api", RoleRouter)
app.use("/api", PermissionRouter)
app.listen(PORT, () => {
    console.log("Server listening on port " + PORT)
})