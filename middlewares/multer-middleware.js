const multer = require("multer");
const fs = require("fs");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "uploads";

    if (req.baseUrl.includes("products")) {
      dest = "uploads/products";
    } else if (req.baseUrl.includes("users") || req.baseUrl.includes("auth")) {
      dest = "uploads/users";
    }

    try {
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    } catch (err) {
      cb(err, null);
    }
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname;
    let extension = file.mimetype.split("/")[1];

    if (req.baseUrl.includes("products")) {
      fileName = `product-${Date.now()}.${extension}`;
    } else if (req.baseUrl.includes("users") || req.baseUrl.includes("auth")) {
      fileName = `user-${Date.now()}.${extension}`;
    }

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];
  if (fileType === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

let upload = multer({ storage: diskStorage, fileFilter });

module.exports = upload;
