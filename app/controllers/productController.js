const fs = require("fs");
const Product = require("../models/product");
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
exports.getAllProducts = async (req, res) => {
  try {
    let query = Product.find();
    //1 build query
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // advanced query
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // const Products = await Product.find().where("category").equals("Makeup");//monogdb query sample
    query = Product.find(JSON.parse(queryStr));
    //2 sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-dateAdded");
    }
    //3 limiting fields
    if (req.query.fields) {
      const selectedFields = req.query.fields.split(",").join(" ");
      query = query.select(selectedFields);
      console.log(selectedFields);
    } else {
      query = query.select("-__v");
    }
    // pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numProducts = await Product.countDocuments();
      if (skip >= numProducts) throw new error("This page does not exist!");
    }
    //4 excute query
    const Products = await query;
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
exports.createNewProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        Products: newProduct,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  const ProductId = req.params.id;
  try {
    const product = await Product.findByIdAndRemove(ProductId);
    return res.status(204).json({
      status: "success",
      data: {
        product: {},
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
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
