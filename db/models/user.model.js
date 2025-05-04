import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is required"] },
    role: { type: String, default: "user" },
    wishlist: [{ type: Types.ObjectId, ref: "Product" }],
    isEmailActive: { type: Boolean, default: false },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?uid=R194767243&ga=GA1.1.1957810835.1742649565&semt=ais_hybrid&w=740",
    },
    address: [{ type: String }],
  },
  { timestamps: true, versionKey: false }
);

const User = model("User", userSchema);
export default User;
