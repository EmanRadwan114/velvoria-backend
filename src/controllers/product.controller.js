import Category from "../../db/models/category.model.js";
import Product from "../../db/models/product.model.js";

const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find().sort({ createdAt: -1 });
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
    }).sort({ createdAt: -1 });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    //populate to get data of category with products
    const products = await Product.find({ categoryID: category._id }).populate(
      "categoryID"
    );
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
    const products = await Product.find({ label: req.params.label }).sort({
      createdAt: -1,
    });
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
    res
      .status(200)
      .json({ message: "product added successfully", data: product });
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
    res
      .status(200)
      .json({ message: "product updated successfully", data: product });
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

//^-------------------------------Search Product--------------------------------
const searchProduct = async (req, res) => {
  try {
    let query = req.query.q.toLowerCase();

    if (query.includes("-")) {
      query = query.split("-").join(" ");
    }

    const searchTerms = query
      .split(" ")
      .map((term) => term.trim())
      .filter((term) => term.length > 0);

    const searchQuery = searchTerms.map((term) => ({
      $or: [
        { title: { $regex: term, $options: "i" } },
        { description: { $regex: term, $options: "i" } },
        { material: { $regex: term, $options: "i" } },
        { color: { $regex: term, $options: "i" } },
      ],
    }));

    const searchedProducts = await Product.find({ $or: searchQuery })
      .populate("categoryID")
      .sort({ createdAt: -1 });

    if (searchedProducts.length === 0)
      return res
        .status(404)
        .json({ message: "no products found that match your search" });

    res.status(200).json({ message: "success", data: searchedProducts });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

//^-------------------------------Filter Product--------------------------------
const filterProducts = async (req, res) => {
  try {
    const query = req.query;

    const filterQuery = {};

    if (query.material) {
      const materialQuery = query.material.includes("-")
        ? query.material.split("-").join(" ")
        : query.material;
      filterQuery.material = { $regex: materialQuery, $options: "i" };
    }

    if (query.color) {
      filterQuery.color = { $regex: query.color, $options: "i" };
    }

    if (query.price) {
      filterQuery.price = { $lte: +query.price };
    }

    const filteredProducts = await Product.find(filterQuery).sort({
      createdAt: -1,
    });

    if (filteredProducts.length === 0)
      return res
        .status(404)
        .json({ message: "no products found that match your filteration" });

    res.status(200).json({ message: "success", data: filteredProducts });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

//^-------------------------------Get less ordered product to put sale on --------------------------------
const getLeastOrderedProduct = async (req, res) => {
  try {
    const leastOrderedProduct = await Product.findOne().sort({
      orderCount: 1,
    });

    if (!leastOrderedProduct)
      return res
        .status(404)
        .json({ message: "least ordered product is not found" });

    res.status(200).json({ message: "success", data: leastOrderedProduct });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

//^-------------------------------Get Best Selling Products --------------------------------
const getBestSellingProducts = async (req, res) => {
  try {
    let bestSellingProducts = await Product.find().populate("categoryID").sort({
      orderCount: -1,
    });

    if (bestSellingProducts.length === 0)
      return res
        .status(404)
        .json({ message: "no best selling products found" });

    bestSellingProducts = bestSellingProducts.slice(0, 5);

    res.status(200).json({ message: "success", data: bestSellingProducts });
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
  searchProduct,
  filterProducts,
  getLeastOrderedProduct,
  getBestSellingProducts,
};
