// ^--------------------Imports
import { Router } from "express";
import auth from "./../middlewares/auth.middleware.js";
import reviewControllers from "../controllers/review.controller.js";
import reviewValidation from "../validation/review.validation.js";

const reviewRouter = new Router();

export default reviewRouter;
