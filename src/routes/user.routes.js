// ^--------------------Imports
import { Router } from "express";
import isEmailExists from "./../middlewares/isEmailExists.middleware.js";
import userControllers from "../controllers/user.controller.js";
import userValidation from "../validation/user.validation.js";

const userRouter = new Router();

userRouter.post("/register", isEmailExists, userControllers.RegisterUser);

export default userRouter;
