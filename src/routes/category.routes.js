// ^--------------------Imports
import { Router } from "express";
import categoryControllers from "../controllers/category.controller.js";
import categoryValidation from "../validation/category.validation.js";

const categoryRouter = new Router();

export default categoryRouter;
