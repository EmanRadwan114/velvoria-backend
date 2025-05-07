import Category from "../../db/models/category.model.js";
import Product from "../../db/models/product.model.js";

const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find();
    if (products.length === 0) {
      res.status(404).json({ message: "no products found" });
    }
    res.status(200).json({ message: "success", data: products });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    let product = await Product.find({ _id: req.params.id });
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "success", data: product });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      name: { $regex: new RegExp(req.params.categoryName, "i") }, // 'i' for case-insensitive
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    //populate to get data of category with products
    const products = await Product.find({ categoryID: category._id }).populate("categoryID");
    if (products.length === 0) {
      res.status(404).json({ message: "no products found" });
    }
    res.status(200).json({ message: "success", data: products });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const getProductsByLabel = async (req, res) => {
  try {
    const validLabels = ["hot", "trendy", "new arrival"];
    if (!validLabels.includes(req.params.label)) {
      return res.status(404).json({ message: "invalid label type" });
    }
    const products = await Product.find({ label: req.params.label });
    if (products.length === 0) {
      res.status(404).json({ message: "no products found" });
    }
    res.status(200).json({ message: "success", data: products });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const addNewProduct = async (req, res) => {
  try {
    let product = await Product.create(req.body);
    res.status(200).json({ message: "product added successfully", data: product });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }
    //This for partial update
    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });
    await product.save();
    res.status(200).json({ message: "product updated successfully", data: product });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

export default {
  addNewProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  getProductsByCategory,
  getProductsByLabel,
};
