import {asyncHandler} from "../utilis/asyncHandler.js"
import { ApiError } from "../utilis/ApiError.js"
import { ApiResponse } from "../utilis/ApiResponse.js"
import { User } from "../models/user.models.js"

const registerUser=asyncHandler(async(req,res)=>{
    
    
    if (!req.body) {
  throw new ApiError(400, "Request body is missing");
}

const { userName, email, password } = req.body;

    console.log(userName)

    if([userName,email,password].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are reuired")
    }

    const existedUser=await User.findOne(
        {
            $or:[{userName},{email}]
        }
    )

    if(existedUser){
        throw new ApiError(409,"UserName or email already exist")
    }

    const user=await User.create({
        userName:userName.toLowerCase(),
        email,
        password
    })

    const userCreated=await User.findById(user._id).
    select("-password")

    if(!userCreated){
        throw new ApiError(500,"Something went wront while Registering the User")
    }


    return res.status(201)
    .json(
        new ApiResponse(200,"user created Successfully")
    )
})


const loginUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body; 

    if ([userName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Invalid Credentials");
    }

    const user=await User.findOne(
        {
            $or:[{userName},{email}]
        }
    )

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Password Incorrect")
    }


    const loggedIn=await User.findById(user._id).select("-password")

    const options={
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedIn
            },
            "user logged in SuccessFully"
        )
    )
});


export {registerUser,loginUser};