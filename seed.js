const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Product = require("./models/product-model");

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log("Database connection successful");

    const filePath = path.join(__dirname, "data", "products-data.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(rawData);

    const formattedProducts = products.map(({ id, image, ...rest }) => ({
      ...rest,
      imageUrl: image,
    }));

    await Product.deleteMany();
    console.log("Old products removed");

    await Product.insertMany(formattedProducts);
    console.log(`${formattedProducts.length} products added successfully`);

    process.exit(0);
  } catch (error) {
    console.log(`Error seeding products: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
