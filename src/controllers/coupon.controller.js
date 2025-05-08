import Coupon from "../../db/models/coupon.model.js";

const addNewCoupon = async (req, res) => {
  try {
    let coupon = await Coupon.create(req.body);
    res
      .status(200)
      .json({ message: "coupon added successfully", data: coupon });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    let coupons = await Coupon.find();
    if (coupons.length === 0) {
      return res.status(404).json({ message: "no coupons found" });
    }
    res.status(200).json({ message: "success", data: coupons });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const getCouponById = async (req, res) => {
  try {
    let coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "coupon not found" });
    }
    res.status(200).json({ message: "success", data: coupon });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const updateCoupon = async (req, res) => {
  try {
    let coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "coupon not found" });
    }
    //This for partial update
    Object.keys(req.body).forEach((key) => {
      coupon[key] = req.body[key];
    });
    await coupon.save();
    res
      .status(200)
      .json({ message: "coupon updated successfully", data: coupon });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    let coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "coupon not found" });
    }
    res.status(200).json({ message: "coupon deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const applyCoupon = async (req, res) => {
  const { userId, couponCode } = req.body;

  try {
    const coupon = await Coupon.findOne({ CouponCode: couponCode });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ message: "Coupon is not active" });
    }

    if (new Date() > new Date(coupon.expirationDate)) {
      return res.status(400).json({ message: "Coupon has expired" });
    }

    if (coupon.CouponUsers.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Coupon already used by this user" });
    }

    if (coupon.CouponUsers.length >= coupon.maxUsageLimit) {
      return res.status(400).json({ message: "Coupon usage limit reached" });
    }

    // Apply coupon (record user usage)
    coupon.CouponUsers.push(userId);
    await coupon.save();

    res.status(200).json({
      message: "Coupon applied successfully",
      discount: coupon.CouponPercentage,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  addNewCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};
