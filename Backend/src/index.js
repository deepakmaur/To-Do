import { app } from "./app.js";
import dotenv from "dotenv";
import {connection } from "./db/index.js"
dotenv.config(
   { path:"./.env"}
)
console.log(process.env.PORT);
connection()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running on Port ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("Error in connecting :",err)
    process.exit(1)
})