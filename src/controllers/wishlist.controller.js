import User from "../../db/models/user.model.js";
import Product from "../../db/models/product.model.js"

const addToWishList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { pid } = req.params;

    const product = await Product.findById(pid);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.wishlist.includes(pid)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlist.push(pid);
    await user.save();

    res.status(200).json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const getWishList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
const deleteFromWishList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { pid } = req.params;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== pid
    );

    await user.save();

    return res.status(200).json({ message: "Removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error("❌ Wishlist Deletion Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



export default {
  addToWishList,
  getWishList,
  deleteFromWishList,
};
