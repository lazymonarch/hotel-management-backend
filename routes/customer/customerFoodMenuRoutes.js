const express = require("express");
const FoodMenu = require("../../models/foodMenu");
const router = express.Router();

// Get all food items (Customer View)
router.get("/", async (req, res) => {
  try {
    const foodItems = await FoodMenu.find();
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific food item by ID
router.get("/:id", async (req, res) => {
    try {
      const foodItem = await FoodMenu.findById(req.params.id);
      if (!foodItem) {
        return res.status(404).json({ message: "Food item not found" });
      }
      res.json(foodItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;