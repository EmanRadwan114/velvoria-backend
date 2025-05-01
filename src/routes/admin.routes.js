import { Router } from "express";
import isEmailExists from "./../middlewares/isEmailExists.middleware.js";
import auth from "./../middlewares/auth.middleware.js";
import adminControllers from "../controllers/admin.controller.js";
import adminValidation from "../validation/admin.validation.js";

const adminRouter = new Router();

export default adminRouter;
