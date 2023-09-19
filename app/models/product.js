const mongoose = require("mongoose");
// Define the schema for the Product collection
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: String,
  category: String,
  subcategory: String,
  price: {
    type: Number,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  images: [
    {
      type: String, // Assuming image URLs as strings
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
