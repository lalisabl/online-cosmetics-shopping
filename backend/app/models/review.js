const mongoose = require("mongoose");
const Product = require("./product");
const User = require("./user");
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty!"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "name",
  }).populate({
    path: "user",
    select: "fullName",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.product);
});

// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   const review = await this.findOne();  this.constructor.calcAverageRatings(this.product);

//   this.review = review;
//   console.log(review);
//   next();
// });
reviewSchema.post(/^findOneAnd/, async function (doc) {
  const productId = doc.product._id; // Assuming 'product' is the field in your review document that stores the product ID
  console.log(productId);
  await this.constructor.calcAverageRatings(productId);
  // this.constructor.calcAverageRatings(this.product);
});

// reviewSchema.post(/^findOneAnd/, async function () {

//   await this.constructor.calcAverageRatings(this.review.product);
// });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
