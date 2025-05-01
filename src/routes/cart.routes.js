// ^--------------------Imports
import { Router } from "express";
import cartControllers from "../controllers/cart.controller.js";
import cartValidation from "../validation/cart.validation.js";

const cartRouter = new Router();

export default cartRouter;
