import mongoose from "mongoose";
import User from "../db/models/user.model.js";
import Product from "../db/models/product.model.js";
import Category from "../db/models/category.model.js";
import Cart from "../db/models/cart.model.js";
import Order from "../db/models/order.model.js";
import Coupon from "../db/models/coupon.model.js";
import Review from "../db/models/review.model.js";
import bcrypt from "bcrypt";
import {
  colors,
  materials,
  labels,
  addresses,
  couponCodes,
  reviewDescriptions,
  paymentMethods,
  orderStatuses,
  shippingStatuses,
} from "./productsData.js";
import { allProductCollections } from "./products/index.js";

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});
    await Coupon.deleteMany({});
    await Review.deleteMany({});

    console.log("Cleared existing data...");

    // ========== CATEGORIES ==========
    const categoriesData = [
      {
        name: "Sofas",
        thumbnail:
          "https://i.pinimg.com/736x/68/6b/5a/686b5a921eade09050d3737ffe73c2ea.jpg",
      },
      {
        name: "Storage Units",
        thumbnail:
          "https://i.pinimg.com/736x/ac/59/c5/ac59c5dcdfcde3b0a24f4553a76718ff.jpg",
      },
      {
        name: "Beds",
        thumbnail:
          "https://i.pinimg.com/control1/1200x/a2/5a/25/a25a2573ece8d164dede5487a5b3e457.jpg",
      },
      {
        name: "Dining Tables",
        thumbnail:
          "https://i.pinimg.com/control1/1200x/57/8c/fd/578cfdcd88d84b4af5d1eba998c6a1c5.jpg",
      },
      {
        name: "Office Desks",
        thumbnail:
          "https://i.pinimg.com/736x/cf/7b/c1/cf7bc1f6f7c04d8b0b2961962f7c01d9.jpg",
      },
      {
        name: "Chairs",
        thumbnail:
          "https://i.pinimg.com/736x/09/50/52/09505279f1ea6c3fbd44d7ff66aea143.jpg",
      },
      {
        name: "Outdoor Sets",
        thumbnail:
          "https://i.pinimg.com/1200x/62/e6/99/62e6992d11e6cc45ee71272dc94ad758.jpg",
      },
      {
        name: "Decors",
        thumbnail:
          "https://i.pinimg.com/736x/9a/2a/61/9a2a610df68d0032e6b59500514738d2.jpg",
      },
      {
        name: "Lighting",
        thumbnail:
          "https://i.pinimg.com/control1/1200x/81/f6/ae/81f6ae11e222672611dfbecf33518a98.jpg",
      },
    ];

    const categories = await Category.insertMany(categoriesData);
    console.log(`✓ Created ${categories.length} categories`);

    // ========== USERS ==========
    const usersData = [];
    const firstNames = [
      "Ahmed",
      "Fatima",
      "Mohammed",
      "Aisha",
      "Hassan",
      "Leila",
      "Omar",
      "Noor",
      "Khalid",
      "Sara",
    ];
    const lastNames = [
      "Al-Rashid",
      "Al-Mansouri",
      "Al-Maktoum",
      "Al-Nuaimi",
      "Al-Qassimi",
      "Al-Rumaihi",
      "Al-Zaabi",
      "Al-Kaabi",
      "Al-Dosari",
      "Al-Enezi",
    ];

    for (let i = 1; i <= 35; i++) {
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const hashedPassword = await bcrypt.hash("password123", 10);

      usersData.push({
        name: `${firstName} ${lastName} ${i}`,
        email: `user${i}@velvoria.com`,
        password: hashedPassword,
        role: i === 1 ? "admin" : "user",
        isEmailActive: i % 3 !== 0 ? true : false,
        image: `https://i.pravatar.cc/150?img=${i}`,
        address: i <= 1 ? [] : [`${i} Street Name, Manama, Bahrain`],
        wishlist: [],
      });
    }

    const users = await User.insertMany(usersData);
    console.log(`✓ Created ${users.length} users`);

    // ========== PRODUCTS ==========
    const productsData = [];

    // Flatten and generate 30 variations per base product
    for (const [categoryName, productsList] of Object.entries(
      allProductCollections,
    )) {
      const category = categories.find((c) => c.name === categoryName);

      for (const baseProduct of productsList) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const material =
          materials[Math.floor(Math.random() * materials.length)];
        const priceVariation = Math.floor(Math.random() * 800) - 400;
        const finalPrice = Math.max(
          200,
          (baseProduct.basePrice || 1500) + priceVariation,
        );

        productsData.push({
          categoryID: category._id,
          title: baseProduct.name,
          description: baseProduct.description,
          thumbnail: baseProduct.thumbnail,
          images: baseProduct.images,
          price: finalPrice,
          avgRating: Math.floor(Math.random() * 5) + 1,
          numberOfReviews: Math.floor(Math.random() * 100),
          stock: Math.floor(Math.random() * 200) + 10,
          label: [labels[Math.floor(Math.random() * labels.length)]],
          orderCount: Math.floor(Math.random() * 150),
          color: color,
          material: material,
        });
      }
    }

    const products = await Product.insertMany(productsData);
    console.log(`✓ Created ${products.length} products`);

    // ========== CARTS ==========
    const cartsData = [];
    for (let i = 0; i < 35; i++) {
      const cartItems = [];
      const itemCount = Math.floor(Math.random() * 5) + 1;

      for (let j = 0; j < itemCount; j++) {
        cartItems.push({
          productId: products[Math.floor(Math.random() * products.length)]._id,
          quantity: Math.floor(Math.random() * 5) + 1,
        });
      }

      cartsData.push({
        userID: users[i]._id,
        cartItems: cartItems,
      });
    }

    const carts = await Cart.insertMany(cartsData);
    console.log(`✓ Created ${carts.length} carts`);

    // ========== ORDERS ==========
    const ordersData = [];

    for (let i = 0; i < 35; i++) {
      const orderItems = [];
      const itemCount = Math.floor(Math.random() * 5) + 1;
      let totalPrice = 0;

      for (let j = 0; j < itemCount; j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 5) + 1;
        totalPrice += product.price * quantity;

        orderItems.push({
          productId: product._id,
          quantity: quantity,
        });
      }

      ordersData.push({
        userID: users[Math.floor(Math.random() * users.length)]._id,
        totalPrice: totalPrice,
        orderItems: orderItems,
        shippingAddress:
          addresses[Math.floor(Math.random() * addresses.length)],
        paymentMethod:
          paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        orderStatus:
          orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
        shippingStatus:
          shippingStatuses[Math.floor(Math.random() * shippingStatuses.length)],
      });
    }

    const orders = await Order.insertMany(ordersData);
    console.log(`✓ Created ${orders.length} orders`);

    // ========== COUPONS ==========
    const couponsData = [];

    for (let i = 0; i < 35; i++) {
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 6);

      couponsData.push({
        CouponCode: `${couponCodes[i % couponCodes.length]}${i}`,
        CouponUsers: [],
        CouponPercentage: Math.floor(Math.random() * 40) + 5,
        expirationDate: expirationDate,
        maxUsageLimit: Math.floor(Math.random() * 500) + 50,
        isActive: Math.random() > 0.2 ? true : false,
      });
    }

    const coupons = await Coupon.insertMany(couponsData);
    console.log(`✓ Created ${coupons.length} coupons`);

    // ========== REVIEWS ==========
    const reviewsData = [];

    for (let i = 0; i < 35; i++) {
      reviewsData.push({
        userID: users[Math.floor(Math.random() * users.length)]._id,
        productID: products[Math.floor(Math.random() * products.length)]._id,
        description:
          reviewDescriptions[
            Math.floor(Math.random() * reviewDescriptions.length)
          ],
        rating: Math.floor(Math.random() * 5) + 1,
      });
    }

    const reviews = await Review.insertMany(reviewsData);
    console.log(`✓ Created ${reviews.length} reviews`);

    // ========== SUCCESS MESSAGE ==========
    console.log("\n✅ Database seeded successfully!");
    console.log(`
    📊 Summary:
    - Users: ${users.length}
    - Categories: ${categories.length}
    - Products: ${products.length}
    - Carts: ${carts.length}
    - Orders: ${orders.length}
    - Coupons: ${coupons.length}
    - Reviews: ${reviews.length}
    `);

    return {
      users: users.length,
      categories: categories.length,
      products: products.length,
      carts: carts.length,
      orders: orders.length,
      coupons: coupons.length,
      reviews: reviews.length,
    };
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    throw error;
  }
};

export default seedData;
