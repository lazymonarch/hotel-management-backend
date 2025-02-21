const express = require("express");
const FoodMenu = require("../../models/foodMenu");
const router = express.Router();

// Add a new food item
router.post("/", async (req, res) => {
  try {
    const newFoodItem = new FoodMenu(req.body);
    await newFoodItem.save();
    res.status(201).json({ message: "Food item added successfully", foodItem: newFoodItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all food items (Admin View)
router.get("/", async (req, res) => {
  try {
    const foodItems = await FoodMenu.find();
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a food item
router.put("/:id", async (req, res) => {
  try {
    const updatedFoodItem = await FoodMenu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFoodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.json({ message: "Food item updated successfully", foodItem: updatedFoodItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a food item
router.delete("/:id", async (req, res) => {
  try {
    const deletedFoodItem = await FoodMenu.findByIdAndDelete(req.params.id);
    if (!deletedFoodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.json({ message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;