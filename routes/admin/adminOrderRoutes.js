const express = require("express");
const Order = require("../../models/order");
const router = express.Router();

// Get all orders (Admin View)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("roomId")
      .populate("foodItems")
      .populate("customer", "username"); // Populate customer information
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update order status (e.g., Mark as Completed/Cancelled)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("roomId")
      .populate("foodItems")
      .populate("customer", "username"); // Populate customer information
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order status updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;