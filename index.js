const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const productRouter = require("./routes/product-routes");

const dbConnect = require("./config/db-connect");

const app = express();
dbConnect();
app.use(express.json());

app.use("/api/v1/products", productRouter);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
