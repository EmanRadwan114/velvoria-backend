// ^--------------------Imports
import { Router } from "express";
import auth from "./../middlewares/auth.middleware.js";
import orderControllers from "../controllers/order.controller.js";
import orderValidation from "../validation/order.validation.js";

const orderRouter = new Router();

export default orderRouter;
