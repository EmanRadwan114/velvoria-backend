// ^--------------------Imports
import { Router } from "express";
import orderControllers from "../controllers/order.controller.js";
import orderValidation from "../validation/order.validation.js";

const orderRouter = new Router();

export default orderRouter;
