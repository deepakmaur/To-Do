import mongoose from "mongoose"
import dotenv from "dotenv"
import { DB_NAME } from "../constants.js"

// dotenv.config({
//     path:"../../.env"
// })

export const connection=async()=>{
    try {
        console.log("MongoDB URI:", process.env.MONGODB_URI);
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDb Connected || DB Host ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log("Error in Connection: ",error);
        process.exit(1);
    }
}

