const express = require("express");
const Order = require("../../models/order");
const router = express.Router();
const { authenticate, authorizeCustomer } = require("../../middleware/authMiddleware");

// Create Order (Room booking or Food Order)
router.post("/", authenticate, authorizeCustomer, async (req, res) => {
  try {
    const { customerName, roomId, checkInDate, checkOutDate, totalAmount, foodItems, orderType } = req.body;

    if ((orderType === "Room" && (!roomId || !checkInDate || !checkOutDate || !totalAmount)) ||
        (orderType === "Food" && (!customerName || !foodItems || !foodItems.length || !totalAmount))) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      customerName,
      roomId,
      checkInDate,
      checkOutDate,
      totalAmount,
      foodItems,
      orderType
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Order failed", error: error.message });
  }
});

// Get order history for a specific customer (You'd typically use user ID instead of name for security)
router.get("/:customerName", authenticate, authorizeCustomer, async (req, res) => {
  try {
    const orders = await Order.find({ customerName: req.params.customerName }).populate("roomId").populate("foodItems");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;