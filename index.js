const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const productRouter = require("./routes/product-routes");
const dbConnect = require("./config/db-connect");
const path = require("path");

const app = express();

dbConnect();

app.use(express.json());

app.use("/api/v1/products", productRouter);

app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});