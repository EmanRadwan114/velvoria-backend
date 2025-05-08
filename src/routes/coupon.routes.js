import { Router } from "express";
import couponControllers from "../controllers/coupon.controller.js";
import couponValidation from "../validation/coupon.validation.js";
import authenticate from "../middlewares/authentication.middleware.js";
import validateRequestBody from "../middlewares/schemaValidation.middleware.js";

const couponRouter = new Router();

couponRouter
  .route("/")
  .get(authenticate(["admin"]), couponControllers.getAllCoupons)
  .post(
    authenticate(["admin"]),
    validateRequestBody(couponValidation.addCouponValidation),
    couponControllers.addNewCoupon
  );

couponRouter
  .route("/:id")
  .get(authenticate(["admin"]), couponControllers.getCouponById)
  .put(
    authenticate(["admin"]),
    validateRequestBody(couponValidation.updateCouponValidation),
    couponControllers.updateCoupon
  )
  .delete(authenticate(["admin"]), couponControllers.deleteCoupon);

couponRouter
  .route("/apply-coupon")
  .post(
    authenticate(["user"]),
    validateRequestBody(couponValidation.applyCouponValidation),
    (req, res) => {
      couponControllers.applyCoupon(req, res, req.user.id);
    }
  );

export default couponRouter;
