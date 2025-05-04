// ^--------------------Imports
import { Router } from "express";
import userControllers from "../controllers/user.controller.js";
import userValidation from "../validation/user.validation.js";

const userRouter = new Router();

userRouter.post("/register", userControllers.RegisterUser);
userRouter.get("/email-activation/:token", userControllers.emailActivation);
userRouter.post("/login", userControllers.signIn);

export default userRouter;
