// ^--------------------Imports
import { Router } from "express";
import userControllers from "../controllers/auth.controller.js";
import userValidation from "../validation/auth.validation.js";
import validateRequestBody from "../middlewares/schemaValidation.middleware.js";

const authRouter = new Router();

//* user registeration
authRouter.post(
  "/register",
  validateRequestBody(userValidation.addUserValidation),
  userControllers.RegisterUser
);

//* email activation
authRouter.get("/email-activation/:token", userControllers.emailActivation);

//* user login
authRouter.post(
  "/login",
  validateRequestBody(userValidation.loginUserValidation),
  userControllers.signIn
);

export default authRouter;
