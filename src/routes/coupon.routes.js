// ^--------------------Imports
import { Router } from "express";
import auth from "./../middlewares/auth.middleware.js";
import couponControllers from "../controllers/coupon.controller.js";
import couponValidation from "../validation/coupon.validation.js";

const couponRouter = new Router();

export default couponRouter;
