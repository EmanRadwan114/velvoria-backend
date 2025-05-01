// ^--------------------Imports
import { Router } from "express";
import auth from "./../middlewares/auth.middleware.js";
import categoryControllers from "../controllers/category.controller.js";
import categoryValidation from "../validation/category.validation.js";

const categoryRouter = new Router();

export default categoryRouter;
