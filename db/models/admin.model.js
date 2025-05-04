import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?uid=R194767243&ga=GA1.1.1957810835.1742649565&semt=ais_hybrid&w=740",
    },
  },
  { timestamps: true, versionKey: false }
);

const Admin = model("Admin", adminSchema);
export default Admin;
