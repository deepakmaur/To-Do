import { app } from "./app.js";
import dotenv from "dotenv";
import {connection } from "./db/index.js"
dotenv.config(
   { path:"./.env"}
)
console.log(process.env.PORT);
connection()
.then(()=>{
    const PORT = process.env.PORT || 8000;
    app.listen(PORT,()=>{
        console.log(`Server is running on Port ${PORT}`);
        
    })
})
.catch((err)=>{
    console.log("Error in connecting :",err)
    process.exit(1)
})



// app.get("/", (req, res) => {
//     res.send("Welcome to the Todo App API");
// });
app.on("error", (error) => {
    console.error("App encountered an error:", error);
    process.exit(1);
});

// app.listen(process.env.PORT, async () => {
//     try {
//         await connection();
//         console.log(`Server is running on Port ${process.env.PORT}`);
//     } catch (error) {
//         console.error("Error connecting to the database:", error);
//         process.exit(1);
//     }
// });