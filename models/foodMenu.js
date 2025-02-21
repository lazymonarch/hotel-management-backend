const mongoose = require("mongoose");

const foodMenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., Appetizer, Main Course, Dessert, Drinks
  imageUrl: { type: String } // Optional image URL
});

const FoodMenu = mongoose.model("FoodMenu", foodMenuSchema);
module.exports = FoodMenu