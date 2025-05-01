// ^--------------------Imports
import { Router } from "express";
import auth from "./../middlewares/auth.middleware.js";
import productControllers from "../controllers/product.controller.js";
import productValidation from "../validation/product.validation.js";

const productRouter = new Router();

export default productRouter;
