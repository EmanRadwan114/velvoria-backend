// ^--------------------Imports
import { Router } from "express";
import userControllers from "../controllers/user.controller.js";
import userValidation from "../validation/user.validation.js";
import validateRequestBody from "../middlewares/schemaValidation.middleware.js";

const userRouter = new Router();

//* user registeration
userRouter.post(
  "/register",
  validateRequestBody(userValidation.addUserValidation),
  userControllers.RegisterUser
);

//* email activation
userRouter.get("/email-activation/:token", userControllers.emailActivation);

//* user login
userRouter.post(
  "/login",
  validateRequestBody(userValidation.loginUserValidation),
  userControllers.signIn
);

export default userRouter;
