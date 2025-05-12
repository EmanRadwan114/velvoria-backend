import Order from "../../db/models/order.model.js";

// * online payment using stripe
import Stripe from "stripe";
import Cart from "./../../db/models/cart.model.js";
import Product from "./../../db/models/product.model.js";
import Coupon from "../../db/models/coupon.model.js";

//^ ------------------------------------------ create order ------------------------------------------
export const createOrder = async (req, res) => {
  const { shippingAddress, paymentMethod, couponCode, totalPrice } = req.body;

  // ^ get order products from in cart
  const cart = await Cart.findOne({ userID: req.user.id });

  if (!cart) return res.status(404).json({ message: "cart is not found" });

  if (!cart.cartItems.length)
    return res.status(409).json({ message: "cart is empty" });

  const order = new Order({
    userID: req.user.id,
    orderItems: cart.cartItems,
    totalPrice,
    paymentMethod,
    orderStatus: paymentMethod === "cash" ? "waiting" : "paid",
    shippingAddress,
  });

  if (!order)
    return res.status(404).json({ message: "order does not created" });

  await order.save();

  // *push user ID in couponUsers
  if (req.body?.couponCode) {
    await Coupon.updateOne(
      { couponCode },
      { $push: { CouponUsers: req.user.id } }
    );
  }

  // *update product stock
  for (const product of orderItems) {
    await Product.findByIdAndUpdate(product.productId, {
      $inc: {
        stock: -product.quantity,
      },
    });
  }

  // *empty cartItems array
  cart.cartItems = [];
  await cart.save();

  // * send email with order info ====s====> add it

  if (paymentMethod === "card") {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: req.user.email,
      metadata: {
        orderId: order._id.toString(),
      },
      success_url: `${req.protocol}://${req.headers.host}/orders/success/${order._id}`,
      cancel_url: `${req.protocol}://${req.headers.host}/cart`,
      line_items: order.orderItems.map(async (item) => {
        const product = await Product.findById(item.productId);

        return {
          price_data: {
            currency: "egp",
            product_data: {
              name: product.title,
              images: [product.thumbnail],
            },
            unit_amount: product.price * 100,
          },
          quantity: item.quantity,
        };
      }),
    });
    return res.status(201).json({
      message: "success",
      session_url: session.url,
      data: order,
    });
  }

  res.status(201).json({ message: "success", data: order });
};

//^ --------------------------------------craete webhook---------------------------------------
export const createWebhook = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.ENDPOINT_SECRET
  );

  if (!event)
    return res
      .status(400)
      .json({ message: `error in webhook signature validation` });

  // Handle the event
  const { orderId } = event.data.object.metadata;

  if (event.type === "checkout.session.completed") {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        orderStatus: "paid",
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "order is paid and placed", data: order });
  }

  return res.status(200).json({ message: "order is not placed" });
};

// -----------------------------------------------

// // ^---------------------------Create Stripe Checkout Session--------------------
// const createCheckoutSession = async (req, res) => {
//   const { items } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: items.map((item) => ({
//         price_data: {
//           currency: "egp", // Assuming EGP is your currency
//           product_data: { name: item.title, images: [item.thumbnail] },
//           unit_amount: Math.round(item.price * 100), // Ensure integer value by multiplying price by 100
//         },
//         quantity: item.quantity,
//       })),
//       mode: "payment",
//       metadata: {
//         productData: JSON.stringify(items), // Store product data as a JSON string to be extracted after successful payment & order creation
//       },
//       success_url: `${process.env.BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.BASE_URL}/cart`,
//     });

//     res.status(201).json({
//       message: "Checkout session created successfully",
//       sessionId: session.id,
//     });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // ^----------------------------Verify Payment and Create New Order if Successful------------------------
// const verifyPayment = async (req, res) => {
//   const sig = req.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error("Webhook signature verification failed:", err.message);
//     return res
//       .status(400)
//       .send(`Webhook signature verification failed: ${err.message}`);
//   }

//   // * Handle different event types
//   switch (event.type) {
//     case "checkout.session.completed":
//       try {
//         const session = event.data.object;

//         // * Extract product data from session metadata
//         const productData = JSON.parse(session.metadata.productData);

//         // * Retrieve line items for the session (which may contain more detailed product info)
//         const lineItems = await stripe.checkout.sessions.listLineItems(
//           session.id
//         );

//         // * Construct order items based on line items and product data
//         const orderItems = lineItems.data.map((item) => {
//           const product = productData.find((p) => p.title === item.name); // Match the title from product data
//           return {
//             productId: product ? product.productId : null, // Get productId from productData
//             title: item.name,
//             quantity: item.quantity,
//             unitPrice: item.amount_total / item.quantity / 100, // Convert total amount to price per unit in main currency unit
//           };
//         });

//         // * Extract shipping address if available
//         const shippingAddress = session.shipping ? session.shipping : null;

//         // * Create a new order in the database
//         const newOrder = new Order({
//           orderStatus: "paid",
//           totalPrice: session.amount_total / 100, // Convert total amount to main currency unit
//           paymentMethod: "online",
//           orderItems,
//           shippingAddress,
//         });

//         await newOrder.save(); // Save the new order to the database

//         console.log(`Order ${session.id} successfully created`);

//         // Respond to acknowledge successful order creation
//         return res.status(201).json({
//           message: "Payment completed and order created successfully",
//           data: newOrder,
//         });
//       } catch (error) {
//         console.error("Error creating order:", error.message);
//         return res
//           .status(500)
//           .json({ error: "Internal server error. Error creating order" });
//       }

//     default:
//       // For unhandled events, return a 200 OK response to acknowledge receipt
//       console.log(`Unhandled event type: ${event.type}`);
//       return res
//         .status(200)
//         .json({ received: true, message: "Unhandled event type" });
//   }
// };

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
  createOrder,
  createWebhook,
  getCurrentOrder,
  getOrdersByMonth,
  cancelOrder,
};
