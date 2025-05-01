import { Schema, model, Types } from "mongoose";

const cartSchema = new Schema(
  {
    userID: { type: Types.ObjectId, ref: "User" },
    cartItems: [
      {
        productId: { type: Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Cart = model("Cart", cartSchema);
export default Cart;
