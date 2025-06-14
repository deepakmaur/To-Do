import { ApiError } from "../utilis/ApiError.js";
import { asyncHandler } from "../utilis/asyncHandler.js";


export const verify=asyncHandler(async(req,res,next)=>{
    try {

        const user_Id=req.cookies?.userId

        if(!user_Id){
            throw new ApiError(401,"Unauthorized Acess")
        }

        req.user=user_Id;

        next()
    } catch (error) {
        throw new ApiError(401,error?.message,"Invalid Access Token")
    }
})