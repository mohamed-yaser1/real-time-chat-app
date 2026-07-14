import mongoose from "mongoose"
import { Env } from "./env.config"

export const connectDb = async () => {
    try {
        const connection = await mongoose.connect(Env.MONGO_URI);
        console.log('connecting to db ')

    } catch (error) {
        console.log('error connecting to db ',error);
        process.exit(1);
    }
}