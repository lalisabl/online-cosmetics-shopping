const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");
const Product = require("../models/product");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
let products_F = null;
const productsFilePath = `${__dirname}/../data/product.json`;
try {
  products_F = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));
} catch (error) {
  console.error("Error reading or parsing JSON:", error);
}
exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = "3";
  req.query.sort = "price";
  req.query.fields = "name,price,category,brand";
  next();
};
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    //1 build query
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // advanced query
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq)\b/g,
      (match) => `$${match}`
    );
    this.query = Product.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-dateAdded");
    }
    return this;
  }
  limiting() {
    if (this.queryString.fields) {
      const selectedFields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(selectedFields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginatinating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

// get all products
exports.getAllProducts = async (req, res) => {
  try {
    //4 excute query
    const features = new APIfeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limiting()
      .paginatinating();

    const Products = await features.query;
    res.status(200).json({
      status: "success",
      results: Products.length,
      data: {
        Products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
// getEachProduct
exports.getEachProduct = async (req, res) => {
  const ProductId = req.params.id;
  try {
    const product = await Product.findById(ProductId);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        product: product,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("images")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/products");
  },
  filename: function (req, file, cb) {
    const sanitizedFileName = sanitize(file.originalname);
    cb(null, sanitizedFileName);
    console.log;
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});
// exports.uploadProductImages = upload.fields({ name: "images", maxCount: 3 });
exports.uploadProductImages = upload.single("images");
// resizeTourImages
exports.resizeProductImages = catchAsync(async (req, res, next) => {
  // if (!req.files.images) return next();
  const images = [...req.body.images];
  req.body.images = [];
  await Promise.all(
    images.map(async (file, i) => {
      const filename = `product-${req.body.name}-{i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${filename}`);
      req.body.images.push(filename);
    })
  );
  next();
});
// createNewProduct
exports.createNewProduct = async (req, res, next) => {
  console.log(req.file);
  const imageUrl = req.file ? req.file.filename : "";
  //console.log(req.file)
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        Products: newProduct,
      },
    });
  } catch (err) {
    next(err);
  }
};
// deleteProduct
exports.deleteProduct = async (req, res, next) => {
  const ProductId = req.params.id;
  try {
    const product = await Product.findByIdAndRemove(ProductId);
    if (!product) {
      throw new Error(`There is no product with ${ProductId} _id`);
    } else {
      return res.status(204).json({
        status: "success",
        data: {
          product: {},
        },
      });
    }
  } catch (err) {
    next(err);
  }
};
// updateProduct
exports.updateProduct = async (req, res) => {
  const ProductId = req.params.id;
  const updatedData = req.body;
  try {
    const product = await Product.findByIdAndUpdate(ProductId, updatedData, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      status: "success",
      data: {
        product: product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
// get products statis...
exports.getProductStat = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4 } },
      },
      {
        $group: {
          _id: null,
          numProducts: { $sum: 1 },
          ratingSum: { $sum: "$ratingQuantity" },
          totalStock: { $sum: "$stockQuantity" },
          ratingsAve: { $avg: "$ratingsAverage" },
          totalPrice: { $sum: "$price" },
          avePrice: { $avg: "$price" },
          minprice: { $min: "$price" },
          maxprice: { $max: "$price" },
        },
      },
    ]);
    return res.status(200).json({
      status: "success",
      message: "Product statistics retrieved successfully",
      data: {
        product: stats,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};
exports.productsCategories = async (req, res) => {
  try {
    const category = req.params.category;
    const product = await Product.aggregate([
      { $match: { category: category } },
    ]);
    return res.status(200).json({
      status: "success",
      numProducts: product.length,
      data: {
        product: product,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};
// this one is products subcategories
exports.subcategories = async (req, res) => {
  try {
    const SubCategory = req.params.subcategory;
    const product = await Product.aggregate([
      { $match: { subcategory: SubCategory } },
    ]);
    if (product.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No products found for the given SubCategory.",
      });
    }
    return res.status(200).json({
      status: "success",
      numProducts: product.length,
      data: {
        product: product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
