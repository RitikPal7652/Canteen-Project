import mongoose from "mongoose";

const FoodItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  varients: {
    type: [String],
    required: true
  },
  Quantity: {
    type: [Number],
    required: true
  },
  Prices: {
    type: Array, // Array of objects
    required: true
  },
  image: {
    type: String,
    required: true
  },
  mealType: {
    type: String,
    required: true
  }
}, { timestamps: true });

const FoodItem = mongoose.models.FoodItem || mongoose.model('FoodItem', FoodItemSchema)
export default FoodItem;