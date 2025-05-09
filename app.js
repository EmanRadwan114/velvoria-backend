import "dotenv/config";

// ^-------------------import
import db from "./db/dbConnection.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import globalErrHandler from "./src/middlewares/globalErrHandler.middleware.js";
import authRouter from "./src/routes/auth.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import couponRouter from "./src/routes/coupon.routes.js";
import productRouter from "./src/routes/product.routes.js";
import cartRouter from "./src/routes/cart.routes.js";
import orderRouter from "./src/routes/order.routes.js";
import reviewRouter from "./src/routes/review.routes.js";
import userRouter from "./src/routes/user.routes.js";
import wishlistRouter from "./src/routes/wishlist.routes.js";

const PORT = process.env.PORT || 7500;

// ^------------------create server
const app = express();

// ^------------------global middlewares
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ?handle form submissions (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// ?parse incoming JSON payloads (application/json)
app.use(express.json());

// ^------------------main routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/coupons", couponRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);
app.use("/wishlist", wishlistRouter);

// ^------------------error handling
app.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found",
  });
});

app.use(globalErrHandler);

// ^------------------listen to requests
app.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT}`);
});
