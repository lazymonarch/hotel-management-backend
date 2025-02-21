const express = require("express");
const Order = require("../../models/order");
const router = express.Router();

// Get all orders (Admin View)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("roomId").populate("foodItems"); // Populate room and food details
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (e.g., Mark as Completed/Cancelled)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate("roomId").populate("foodItems");
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order status updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;