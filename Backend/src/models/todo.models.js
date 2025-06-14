import mongoose, {Schema} from "mongoose";

const todo=new Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        content:{
            type:String,
            required:true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },{timestamps:true}
)

export const Todo=mongoose.model("Todo",todo);