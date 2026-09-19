import mongoose from "mongoose";
import seedData from "./seedData.js";
import dotenv from "dotenv";

dotenv.config();

const runSeed = async () => {
  try {
    const mongoURI = process.env.MONGODB_CONNECTION_URL;

    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(mongoURI);
    console.log("✓ Connected to MongoDB");

    console.log("\n🌱 Starting database seeding...\n");
    await seedData();

    console.log("\n✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

runSeed();
