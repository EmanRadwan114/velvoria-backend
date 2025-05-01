import { Schema, model, Types } from "mongoose";

const productSchema = new Schema(
  {
    categoryID: { type: Types.ObjectId, ref: "Category" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [{ type: String }],
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    material: { type: String },
    color: { type: String },
    avgRating: { type: Number, default: 0 },
    numberOfReviews: { type: Number, default: 0 },
    label: [{ type: String }],
    orderCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);
export default Product;
