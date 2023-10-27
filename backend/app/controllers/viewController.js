const Product = require("../models/product");
exports.OverviewPage = async (req, res) => {
  // 1) Get tour data from collection
  const products = await Product.find();
  // 3) Render that template using tour data from 1)
  res.status(200).json({
    status: "success",
    products,
  });
};
