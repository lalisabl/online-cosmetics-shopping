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
  images: [
    {
      type: String, // Assuming image URLs as strings
    },
  ],
  sizeVolume: String,
  weightQuantity: Number,
  colors: [String],
  skinType: [String],
  reviewQuantity: {
    type: String,
    default: 0,
  },
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
      ref: "Product", // Reference to other products
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

// Create and export the Product model
module.exports = mongoose.model("Product", productSchema);
