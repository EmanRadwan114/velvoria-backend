// ^--------------------Imports
import { Router } from "express";
import reviewControllers from "../controllers/review.controller.js";
import reviewValidation from "../validation/review.validation.js";

const reviewRouter = new Router({ mergeParams: true });

reviewRouter.route("/").get(reviewControllers.getAllProductReviews);

export default reviewRouter;
