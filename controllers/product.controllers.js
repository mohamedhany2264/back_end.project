const Product = require("../models/product-model");
const deleteUploadedFile = require("../utils/delete-uploaded-file");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      count: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error fetching products: ${error.message}`,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      imageUrl: req.file?.filename,
    });

    res.status(201).json({
      status: "success",
      message: "Product added",
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    if (req.file) {
      deleteUploadedFile("products", req.file.filename);
    }
    res.status(400).json({
      status: "error",
      message: `Error creating product: ${error.message}`,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        status: "error",
        message: "Invalid product ID",
      });
    }
    res.status(400).json({
      status: "error",
      message: `Error fetching product: ${error.message}`,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    if (req.file) {
      req.body.imageUrl = req.file.filename;
      if (product.imageUrl) deleteUploadedFile("products", product.imageUrl);
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    res.status(200).json({
      status: "success",
      message: "Product updated",
      data: {
        product: updatedProduct,
      },
    });
  } catch (error) {
    if (req.file) {
      deleteUploadedFile("products", req.file.filename);
    }
    if (error.name === "CastError") {
      return res.status(400).json({
        status: "error",
        message: "Invalid product ID",
      });
    }
    res.status(400).json({
      status: "error",
      message: `Error updating product: ${error.message}`,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
    if (deletedProduct.imageUrl) {
      deleteUploadedFile("products", deletedProduct.imageUrl);
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted",
      data: {
        product: deletedProduct,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        status: "error",
        message: "Invalid product ID",
      });
    }
    res.status(400).json({
      status: "error",
      message: `Error deleting product: ${error.message}`,
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
