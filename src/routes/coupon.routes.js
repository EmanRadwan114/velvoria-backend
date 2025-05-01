// ^--------------------Imports
import { Router } from "express";
import couponControllers from "../controllers/coupon.controller.js";
import couponValidation from "../validation/coupon.validation.js";

const couponRouter = new Router();

export default couponRouter;
