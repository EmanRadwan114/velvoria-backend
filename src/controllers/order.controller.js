import Order from "../../db/models/order.model.js";

// ^----------------------------------POST New Order--------------------------
const addNewOrder = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

// ^----------------------------------GET All Orders--------------------------
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userID", "name email image")
      .populate({
        path: "orderItems.productId",
        select: "title price thumbnail material color orderCount",
      });

    if (orders.length === 0)
      return res.status(404).json({ message: "no orders found" });

    const allOrders = orders.map((order) => {
      const { userID, orderItems, ...rest } = order.toObject();

      const populatedOrderItems = orderItems.map((item) => {
        return {
          _id: item._id,
          product: item.productId, // Populated product data
          quantity: item.quantity,
        };
      });

      return {
        ...rest,
        user: userID,
        orderItems: populatedOrderItems,
      };
    });

    res.status(200).json({ message: "success", data: allOrders });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

// ^----------------------------------GET All User Orders--------------------------
const getUserOrders = async (req, res) => {
  try {
    const userID = req.user.id;

    const orders = await Order.find({ userID })
      .populate("userID", "name email image")
      .populate({
        path: "orderItems.productId",
        select: "title price thumbnail material color orderCount",
      });

    if (orders.length === 0)
      return res.status(404).json({ message: "no orders found" });

    const allOrders = orders.map((order) => {
      const { userID, orderItems, ...rest } = order.toObject();

      const populatedOrderItems = orderItems.map((item) => {
        return {
          _id: item._id,
          product: item.productId, // Populated product data
          quantity: item.quantity,
        };
      });

      return {
        ...rest,
        user: userID,
        orderItems: populatedOrderItems,
      };
    });

    res.status(200).json({ message: "success", data: allOrders });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

// ^----------------------------------GET Order By ID--------------------------
const getOrderByID = async (req, res) => {
  try {
    const orderID = req.params.id;

    const order = await Order.findById(orderID)
      .populate("userID", "name email image")
      .populate({
        path: "orderItems.productId",
        select: "title price thumbnail material color orderCount",
      });

    if (!order) return res.status(404).json({ message: "order is not found" });

    const { userID, orderItems, ...rest } = order.toObject();

    const populatedOrderItems = orderItems.map((item) => {
      return {
        _id: item._id,
        product: item.productId, // Populated product data
        quantity: item.quantity,
      };
    });

    const orderDetails = {
      ...rest,
      user: userID,
      orderItems: populatedOrderItems,
    };

    res.status(200).json({ message: "success", data: orderDetails });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

// ^----------------------------------PUT Order By ID--------------------------
const updateOrderByID = async (req, res) => {
  try {
    const orderID = req.params.id;

    const { shippingStatus } = req.body;

    const order = await Order.findById(orderID)
      .populate("userID", "name email image")
      .populate({
        path: "orderItems.productId",
        select: "title price thumbnail material color orderCount",
      });

    if (!order) return res.status(404).json({ message: "order is not found" });

    if (shippingStatus === order.shippingStatus)
      return res.status(409).json({
        message: `shipping status is already ${order.shippingStatus}`,
      });

    if (shippingStatus !== "shipped") {
      order.shippingStatus = shippingStatus;
    } else if (shippingStatus === "shipped") {
      order.shippingStatus = shippingStatus;
      order.orderStatus = "paid";
    }

    await order.save();

    const { userID, orderItems, ...rest } = order.toObject();

    const populatedOrderItems = orderItems.map((item) => {
      return {
        _id: item._id,
        product: item.productId, // Populated product data
        quantity: item.quantity,
      };
    });

    const orderDetails = {
      ...rest,
      user: userID,
      orderItems: populatedOrderItems,
    };

    res.status(200).json({ message: "success", data: orderDetails });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
// ^----------------------------------DELETE Order By ID--------------------------
const deleteOrderByID = async (req, res) => {
  try {
    const orderID = req.params.id;

    const order = await Order.findByIdAndDelete(orderID)
      .populate("userID", "name email image")
      .populate({
        path: "orderItems.productId",
        select: "title price thumbnail material color orderCount",
      });

    if (!order) return res.status(404).json({ message: "order is not found" });

    const { userID, orderItems, ...rest } = order.toObject();

    const populatedOrderItems = orderItems.map((item) => {
      return {
        _id: item._id,
        product: item.productId, // Populated product data
        quantity: item.quantity,
      };
    });

    const orderDetails = {
      ...rest,
      user: userID,
      orderItems: populatedOrderItems,
    };

    res.status(200).json({ message: "success", data: orderDetails });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

// ^----------------------------------GET Current Order--------------------------
const getCurrentOrder = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

//^-------------------------------Get Orders Data in Each Month--------------------------------
const getOrdersByMonth = async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();

    let ordersByMonth = await Order.aggregate([
      //* 1 Match orders within the specified year
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
        },
      },

      //* 2 Group by month and year
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },

      //* 3: Sort by month in ascending order
      { $sort: { "_id.month": 1 } },
    ]);

    if (!ordersByMonth.length) {
      return res.status(404).json({ message: "No orders found for this year" });
    }

    ordersByMonth = ordersByMonth.map((order) => {
      const { _id, ...rest } = order;

      return {
        ...rest,
        month: _id.month,
      };
    });

    res.status(200).json({ message: "success", data: ordersByMonth });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Server error" });
  }
};

// ^----------------------------------Cancel Order--------------------------
const cancelOrder = async (req, res) => {}; //additional feature

export default {
  getAllOrders,
  getUserOrders,
  getOrderByID,
  updateOrderByID,
  deleteOrderByID,
  addNewOrder,
  getCurrentOrder,
  getOrdersByMonth,
  cancelOrder,
};
