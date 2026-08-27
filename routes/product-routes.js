const express = require("express");
const productControllers = require("../controllers/product.controllers");
const upload = require("../middlewares/multer-middleware");

const router = express.Router();

router
  .route("/")
  .get(productControllers.getAllProducts)
  .post(upload.single("imageUrl"), productControllers.createProduct);

router
  .route("/:id")
  .get(productControllers.getProductById)
  .patch(upload.single("imageUrl"), productControllers.updateProduct)
  .delete(productControllers.deleteProduct);

module.exports = router;
