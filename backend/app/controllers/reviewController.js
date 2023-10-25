const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const Review = require("../models/review");
const Product = require("../models/product");
const product = require("../models/product");
const calcAverageRatings = async (productId) => {
  // Assuming there's a 'product' field in the Review model
  const ratingStats = await Review.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: null,
        ratingN: { $sum: 1 },
        avgRating: { $avg: "$rating" }, // Assuming 'rating' is the field containing the review rating
      },
    },
  ]);
  // 3. Update the Product model with the new average rating
  if (ratingStats.length > 0) {
    const newAvgRating = ratingStats[0].avgRating;
    const ratingNumber = ratingStats[0].ratingN;
    await Product.findByIdAndUpdate(
      productId,
      { ratingsAverage: newAvgRating, ratingQuantity: ratingNumber },
      {
        new: true,
        runValidators: true,
      }
    );
  }
};
exports.setProductUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.deleteReview = catchAsync(async (req, res, next) => {
  const deletedReview = await Review.findByIdAndDelete(req.params.id);
  const productId = deletedReview.product;
  if (!deletedReview) {
    return next(new AppError("No document found with that ID", 404));
  }
  calcAverageRatings(productId);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedReview) {
    return next(new AppError("No document found with that ID", 404));
  }
  const productId = updatedReview.product;
  calcAverageRatings(productId);
  res.status(200).json({
    status: "success",
    data: {
      data: updatedReview,
    },
  });
});

exports.createReview = catchAsync(async (req, res) => {
  const updatedReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: updatedReview,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  let query = Review.findById(req.params.id);
  // if (popOptions) query = query.populate(popOptions);
  const doc = await query;

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    reviews: {
      doc,
    },
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const doc = await Review.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      reviews: doc,
    },
  });
});
