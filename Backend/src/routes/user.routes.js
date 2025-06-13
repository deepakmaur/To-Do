import { Router } from "express";
import {registerUser,loginUser} from "../controllers/user.controller.js"
const routers=Router()

routers.route("/register").post(registerUser)

routers.route("/login").post(
    loginUser
)

export default routers;