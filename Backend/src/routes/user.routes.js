import { Router } from "express";
import {registerUser,loginUser, logoutUser, write, getTodos, updateTodo, deleteTodo} from "../controllers/user.controller.js"
import { verify } from "../middlewares/auth.middleware.js";
const routers=Router()

routers.route("/register").post(registerUser)

routers.route("/login").post(
    loginUser
)

routers.route("/logout").post(
    verify,
    logoutUser
)

routers.route("/write").post(
    verify,
    write
)

routers.get("/todos", verify, getTodos);

routers.put("/todo/:todoId"
    ,verify
    ,updateTodo
)

routers.delete("/todo/:todoId", verify, deleteTodo);

export default routers;