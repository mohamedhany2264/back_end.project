const fs = require("fs");
let products = JSON.parse(
  fs.readFileSync("./data/products-data.json", "utf-8")
);

const getAllProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    count: products.length,
    data: {
      products,
    },
  });
};

const createProduct = (req, res) => {
  const newId = products[products.length - 1].id + 1;

  const newProduct = {
    id: newId,
    ...req.body,
  };

  products.push(newProduct);

  fs.writeFile(
    "./data/products-data.json",
    JSON.stringify(products, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Error saving file",
        });
      }

      res.status(201).json({
        status: "success",
        message: "New product added",
        data: {
          product: newProduct,
        },
      });
    }
  );
};

const getProductById = (req, res) => {
  const productId = +req.params.id;

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

const updateProduct = (req, res) => {
  const productId = +req.params.id;

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  const updatedProduct = Object.assign(product, req.body);

  fs.writeFile(
    "./data/products-data.json",
    JSON.stringify(products, null, 2),
    () => {
      res.status(200).json({
        status: "success",
        message: "Product updated",
        data: {
          product: updatedProduct,
        },
      });
    }
  );
};

const deleteProduct = (req, res) => {
  const productId = +req.params.id;

  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  products.splice(index, 1);

  fs.writeFile(
    "./data/products-data.json",
    JSON.stringify(products, null, 2),
    () => {
      res.status(200).json({
        status: "success",
        message: "Product deleted",
      });
    }
  );
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
