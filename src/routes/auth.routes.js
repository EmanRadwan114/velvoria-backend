// ^--------------------Imports
import { Router } from "express";
import userControllers from "../controllers/auth.controller.js";
import authValidation from "../validation/auth.validation.js";
import validateRequestBody from "../middlewares/schemaValidation.middleware.js";

const authRouter = new Router();

//* user registeration
authRouter.post(
  "/register",
  validateRequestBody(authValidation.addUserValidation),
  userControllers.RegisterUser
);

//* email activation
authRouter.get("/email-activation/:token", userControllers.emailActivation);

//* user login
authRouter.post(
  "/login",
  validateRequestBody(authValidation.loginUserValidation),
  userControllers.signIn
);

export default authRouter;
