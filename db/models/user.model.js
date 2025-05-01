import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    wishlist: [{ type: Types.ObjectId, ref: "Product" }],
    isEmailActive: { type: Boolean, default: false },
    address: [{ type: String }],
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
