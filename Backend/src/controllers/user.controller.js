import {asyncHandler} from "../utilis/asyncHandler.js"
import { ApiError } from "../utilis/ApiError.js"
import { ApiResponse } from "../utilis/ApiResponse.js"
import { User } from "../models/user.models.js"
import { Todo } from "../models/todo.models.js"

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
    .cookie("userId",user._id.toString(),options)
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


const logoutUser = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    };

    res.clearCookie("userId", options);

    return res.status(200).json(
        new ApiResponse(200, {}, "User logged out successfully")
    );
});

 const write = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user;

    if (!title?.trim() || !content?.trim()) {
        throw new ApiError(400, "Title and content are required");
    }

    // 1. Create Todo
    const todo = await Todo.create({
        title,
        content,
        user: userId
    });

    // 2. Push todo._id to user's lists array
    const user = await User.findByIdAndUpdate(
        userId,
        { $push: { lists: todo._id } },
        { new: true } // return updated user
    ).select("-password");

    return res.status(201).json(
        new ApiResponse(201, { todo, user }, "Todo created and added to user")
    );
});


const getTodos = asyncHandler(async (req, res) => {
    const userId = req.user;

    const userWithTodos = await User.findById(userId)
        .populate("lists")
        .select("-password");

    return res.status(200).json(
        new ApiResponse(200, userWithTodos.lists, "Fetched all todos")
    );
});


const updateTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    const { title, content } = req.body;
    const userId = req.user;

    const todo = await Todo.findOne({ _id: todoId, user: userId });

    if (!todo) {
        throw new ApiError(404, "Todo not found or access denied");
    }

    todo.title = title ?? todo.title;
    todo.content = content ?? todo.content;

    await todo.save();

    return res.status(200).json(
        new ApiResponse(200, todo, "Todo updated successfully")
    );
});

const deleteTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    const userId = req.user;

    const todo = await Todo.findOne({ _id: todoId, user: userId });

    if (!todo) {
        throw new ApiError(404, "Todo not found or access denied");
    }

    // 1. Delete the todo
    await Todo.deleteOne({ _id: todoId });

    // 2. Remove from user's list
    await User.findByIdAndUpdate(userId, {
        $pull: { lists: todoId }
    });

    return res.status(200).json(
        new ApiResponse(200, null, "Todo deleted successfully")
    );
});




export {registerUser,loginUser,logoutUser,write,getTodos,updateTodo,deleteTodo};