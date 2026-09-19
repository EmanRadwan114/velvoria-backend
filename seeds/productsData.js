// Import products from individual category files
import { sofasProducts } from "./products/sofas.js";
import { storageUnitsProducts } from "./products/storageUnits.js";
import { bedsProducts } from "./products/beds.js";
import { diningTablesProducts } from "./products/diningTables.js";
import { officeDesksProducts } from "./products/officeDesks.js";
import { chairsProducts } from "./products/chairs.js";
import { outdoorSetsProducts } from "./products/outdoorSets.js";
import { decorsProducts } from "./products/decors.js";
import { lightingProducts } from "./products/lighting.js";

// Product names organized by category (now imported from individual files)
export const productNames = {
  Sofas: sofasProducts.map((p) => p.name),
  "Storage Units": storageUnitsProducts.map((p) => p.name),
  Beds: bedsProducts.map((p) => p.name),
  "Dining Tables": diningTablesProducts.map((p) => p.name),
  "Office Desks": officeDesksProducts.map((p) => p.name),
  Chairs: chairsProducts.map((p) => p.name),
  "Outdoor Sets": outdoorSetsProducts.map((p) => p.name),
  Decors: decorsProducts.map((p) => p.name),
  Lighting: lightingProducts.map((p) => p.name),
};

// Available colors for products
export const colors = [
  "Black",
  "White",
  "Gray",
  "Brown",
  "Beige",
  "Navy",
  "Burgundy",
  "Gold",
];

// Materials (for product attributes and search)
export const materials = [
  "Wood",
  "Leather",
  "Metal",
  "Fabric",
  "Glass",
  "Plastic",
  "Ceramic",
];

// Product labels
export const labels = ["hot", "trendy", "new arrival"];

// Product descriptions
export const productDescriptions = [
  "Premium furniture crafted from finest materials. Modern design meets functionality with this elegant piece. Perfect for any home setting. Features durability and style combined. Limited stock available for this exclusive item. High quality finish and professional assembly included.",
  "Exquisite craftsmanship and attention to detail in every corner. This piece combines elegance with practicality. Designed for comfort and longevity. Beautiful silhouette that complements any interior. Manufactured using eco-friendly processes. Expert assembly service available.",
  "Top-tier quality furniture built to last generations. Sophisticated design with comfortable functionality. Premium materials sourced from trusted suppliers. Perfect investment for your home. Enhanced durability with protective coating. Quick and easy assembly instructions included.",
  "Contemporary design meets traditional comfort in this stunning piece. Superior construction using advanced techniques. Versatile style that fits any room aesthetic. Exceptional value for premium quality. Warranty coverage included with purchase. Free delivery and setup available.",
  "Elegantly designed furniture for modern living spaces. Premium grade materials ensure longevity. Seamless blend of form and function. Perfect focal point for any room. Professional curated selection. Installation support available.",
];

// Shipping addresses in Bahrain
export const addresses = [
  "123 Al Manama St, Manama, Bahrain",
  "456 Adliya Avenue, Adliya, Bahrain",
  "789 Budaiya Road, Budaiya, Bahrain",
  "321 Salmabad Lane, Salmabad, Bahrain",
  "654 Riffa Heights, Riffa, Bahrain",
  "987 Muharraq Square, Muharraq, Bahrain",
  "147 A'ali Complex, A'ali, Bahrain",
  "258 Isa Town Hub, Isa Town, Bahrain",
];

// Coupon codes
export const couponCodes = [
  "SAVE10",
  "WELCOME20",
  "SUMMER15",
  "FLASH25",
  "LUCKY30",
  "FURNITURE50",
  "SPRING35",
  "MEGA40",
  "WEEKEND10",
  "ROYAL25",
  "TOPSALE",
];

// Review descriptions
export const reviewDescriptions = [
  "Excellent quality product! Highly recommended.",
  "Great value for money. Very satisfied with my purchase.",
  "Premium finish and outstanding customer service.",
  "Beautiful design and very durable. Worth every penny.",
  "Exceeded my expectations. Will buy again.",
  "Amazing craftsmanship and attention to detail.",
  "Perfect fit for my home. Very happy!",
  "Highly recommend this product to everyone.",
  "Best purchase I've made. Top quality!",
  "Fantastic product with great features.",
  "Superb quality and fast delivery.",
  "Love it! Exactly what I was looking for.",
  "Great investment for long-term use.",
  "Impressive and well-made product.",
  "Perfect quality and design combination.",
];

// Payment methods
export const paymentMethods = ["cash", "online"];

// Order statuses
export const orderStatuses = ["paid", "waiting"];

// Shipping statuses
export const shippingStatuses = ["pending", "prepared", "shipped"];

// Export product collections by category
export const productCollections = {
  Sofas: sofasProducts,
  "Storage Units": storageUnitsProducts,
  Beds: bedsProducts,
  "Dining Tables": diningTablesProducts,
  "Office Desks": officeDesksProducts,
  Chairs: chairsProducts,
  "Outdoor Sets": outdoorSetsProducts,
  Decors: decorsProducts,
  Lighting: lightingProducts,
};
