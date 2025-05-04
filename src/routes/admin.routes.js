import { Router } from "express";
import adminControllers from "../controllers/admin.controller.js";
import adminValidation from "../validation/admin.validation.js";

const adminRouter = new Router();

export default adminRouter;
