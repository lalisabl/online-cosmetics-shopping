const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const Review = require("../models/review");
exports.setProductUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.deleteReview = catchAsync(async (req, res, next) => {
  const doc = await Review.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const doc = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.createReview = catchAsync(async (req, res) => {
  const doc = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
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
      reviews:doc,
    },
  });
});
