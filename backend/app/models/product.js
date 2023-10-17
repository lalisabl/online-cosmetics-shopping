const mongoose = require("mongoose");
// Define the schema for the Product collection
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Product must have a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "A Product must have a description"],
  },
  brand: String,
  category: {
    type: String,
    required: [true, "A product must have a cateogry"],
  },
  subcategory: String,
  price: {
    type: Number,
    required: [true, "A Product must have a price"],
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: [0, "The stock quantity must be posative number"],
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be less than 5.0"],
    set: (val) => Math.round(val * 10) / 10,
  },
  images: [
    {
      type: String, // Assuming image URLs as strings
      required: [true, "A Product must have images"],
      unique: true,
    },
  ],
  sizeVolume: String,
  weightQuantity: Number,
  colors: [String],
  skinType: [String],
  promotionsDiscounts: {
    discountPercentage: Number,
    promoCode: String,
    startDate: Date,
    endDate: Date,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  relatedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  tagsKeywords: [String],
  availabilityStatus: String,
  productVariants: [
    {
      variantName: String,
      variantOptions: [String],
      variantPrice: [Number],
      variantStockQuantity: [Number],
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
