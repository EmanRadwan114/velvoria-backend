// ^--------------------Imports
import { Router } from "express";
import isEmailExists from "./../middlewares/isEmailExists.middleware.js";
import auth from "./../middlewares/auth.middleware.js";
import userControllers from "../controllers/user.controller.js";
import userValidation from "../validation/user.validation.js";

const userRouter = new Router();

export default userRouter;
