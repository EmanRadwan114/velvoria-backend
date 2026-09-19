# Database Seed Data - Recovery Guide

This directory contains seed data to recover your Velvoria MongoDB database after the AWS Bahrain outage.

## 📋 What's Included

The seed files create **at least 30+ records** for each model:

- **35 Users** (1 admin, 34 regular users)
- **10 Categories** (All your furniture categories)
- **300 Products** (30 products per category with varied attributes)
- **35 Carts** (One per user with random items)
- **35 Orders** (Various order statuses and payment methods)
- **35 Coupons** (Active and expired coupons with discount codes)
- **35 Reviews** (Product reviews with ratings)

## 🚀 How to Use

### Option 1: Using npm script (Recommended)

1. **Update your `package.json`** - Add this script to the `"scripts"` section:

```json
{
  "scripts": {
    "seed": "node seeds/run-seed.js"
  }
}
```

2. **Run the seed command:**

```bash
npm run seed
```

### Option 2: Direct Node execution

```bash
node seeds/run-seed.js
```

## 🔧 Prerequisites

Ensure your `.env` file has the correct MongoDB connection:

```env
MONGO_URI=mongodb://your-new-db-url:27017/velvoria
```

If not set, it defaults to: `mongodb://localhost:27017/velvoria`

## 📊 Data Structure

### Users
- Emails: `user1@velvoria.com` to `user35@velvoria.com`
- Password: `password123` (pre-hashed)
- First user (`user1@velvoria.com`) is admin, others are regular users
- Random addresses and active email status

### Categories (10 total)
- All Furniture
- Sofas
- Storage Units
- Beds
- Dining Tables
- Office Desks
- Chairs
- Outdoor Sets
- Decors
- Lighting

### Products (300 total)
- 30 products per category
- Unique titles with color and material variations
- Random stock (10-110 units)
- Random prices (200-5200 BD)
- Various materials and colors
- Random ratings and review counts

### Orders
- Mixed cash and online payments
- Various order and shipping statuses
- Random order items and total prices
- Realistic Bahrain addresses

### Coupons
- Unique codes with variations
- 5-45% discounts
- 6-month expiration from now
- Max usage limits (50-550 uses)

### Reviews
- Realistic 5-star ratings
- Positive review descriptions
- Linked to random users and products

## ✅ Verification

After running the seed, check MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.countDocuments()      // Should be 35
db.products.countDocuments()   // Should be 300
db.categories.countDocuments() // Should be 10
db.carts.countDocuments()      // Should be 35
db.orders.countDocuments()     // Should be 35
db.coupons.countDocuments()    // Should be 35
db.reviews.countDocuments()    // Should be 35
```

## 🔄 Resetting Data

To clear and reseed:

```bash
npm run seed
```

The seed script automatically clears all existing data before seeding new data.

## 📝 Customization

To modify seed data, edit `seedData.js`:

- Change product counts in the loop: `for (let i = 0; i < 30; i++)`
- Modify user count: `for (let i = 1; i <= 35; i++)`
- Adjust price ranges: `Math.floor(Math.random() * 5000) + 200`
- Update product descriptions
- Modify password requirements
- Add more categories

## 🛠️ Troubleshooting

**Connection Error:**
- Verify MongoDB is running
- Check `MONGO_URI` in `.env`
- Ensure network connectivity to AWS replacement or local DB

**Duplicate Key Error:**
- Run seed again to clear and restart
- Check for unique constraints on emails and product titles

**Memory Issues:**
- Reduce the number of products/users in loops
- Run seed during low-traffic times

## 📞 Support

For issues, check:
1. MongoDB connection status
2. `.env` file configuration
3. Node.js dependencies installed (`npm install`)
4. File paths are correct
