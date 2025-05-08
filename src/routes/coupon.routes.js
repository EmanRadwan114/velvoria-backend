// ^--------------------Imports
import { Router } from "express";
import couponControllers from "../controllers/coupon.controller.js";
import couponValidation from "../validation/coupon.validation.js";
import authenticate from "./../middlewares/authentication.middleware.js";

const couponRouter = new Router();

couponRouter.get("/", authenticate(["admin"]), couponControllers.getAllCoupons);
couponRouter.post("/", authenticate(["admin"]), couponControllers.addNewCoupon);
couponRouter.get(
  "/:id",
  authenticate(["admin"]),
  couponControllers.getCouponById
);
couponRouter.put(
  "/:id",
  authenticate(["admin"]),
  couponControllers.updateCoupon
);
couponRouter.delete(
  "/:id",
  authenticate(["admin"]),
  couponControllers.deleteCoupon
);

couponRouter.post(
  "/apply-coupon",
  authenticate(["user", "admin"]),
  (req, res, next) => {
    const valid = couponValidation.applyCouponValidation(req.body);
    if (!valid) {
      return res
        .status(400)
        .json({ errors: couponValidation.applyCouponValidation.errors });
    }
    next();
  },
  couponControllers.applyCoupon
);

export default couponRouter;
