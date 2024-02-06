import express from "express"
import "./Connection/Connection"
import "dotenv/config"
import { router } from "./Routes/UserRoutes"
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use("/api", router)
app.listen(PORT, () => {
    console.log("Server listening on port " + PORT)
})