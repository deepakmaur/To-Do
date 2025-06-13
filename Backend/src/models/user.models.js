import mongoose, { Schema } from "mongoose"

const userSchema=new Schema(
    {
        userName:{
            type:String,
            lowercase:true,
            unique:true,
            required:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        lists:[
            {
                type:Schema.Types.ObjectId,
                ref:"Todo"
            }
        ]
    },{timestamps:true}
)

export const User=mongoose.model("User",userSchema)