// ^--------------------Imports
import { Router } from "express";
import reviewControllers from "../controllers/review.controller.js";
import reviewValidation from "../validation/review.validation.js";

const reviewRouter = new Router();

export default reviewRouter;
