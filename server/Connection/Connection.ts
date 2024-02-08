import "dotenv/config";
import mongoose from "mongoose";
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL!)

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})

mongoose.connection.on("error", () => {
    console.log("Error to MongoDB")
})
