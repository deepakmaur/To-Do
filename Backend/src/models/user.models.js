import mongoose, { Schema } from "mongoose"
import bcrypt from 'bcrypt';

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


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    console.log(password)
    console.log(this.password)
    return await bcrypt.compare(password,this.password);
}
export const User=mongoose.model("User",userSchema)