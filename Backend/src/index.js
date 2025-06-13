import express from "express"
import cors from "cors"
const app=express();
const port=process.env.PORT || 5000;

const corsOperation={
    origin:"*",
    optionsSuccessStatus: 200
} 

app.get("/",(req,res)=>{
    res.send("server is ready")
})

app.get("/api/jokes",cors(corsOperation),(req,res)=>{
    const jokes=[
        {
            id:1,
            title:"From Backend",
            content:"WOrked"
        },
        {
            id:2,
            title:"Done Backend",
            content:"WOrking "
        }
    ]
    res.send(jokes)
})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})

