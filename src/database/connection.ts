import mongoose from "mongoose";
import { env } from "../config/env.service";

export const connectionDB = async () =>{
    try {
        await mongoose.connect(env.mongo_url as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}