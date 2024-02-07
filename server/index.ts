import express from "express"
import "./Connection/Connection"
import "dotenv/config"
import { router } from "./Routes/UserRoutes"
import cookieParser from 'cookie-parser';
import cors from "cors"
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api", router)
app.listen(PORT, () => {
    console.log("Server listening on port " + PORT)
})