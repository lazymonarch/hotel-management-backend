const express = require("express");
const Order = require("../../models/order");
const router = express.Router();
const { authenticate, authorizeAdmin } = require("../../middleware/authMiddleware");


// Get all bookings (Admin View)  -  Assuming you want to treat 'Order' with type 'Room' as a Booking
router.get("/", authenticate, authorizeAdmin, async (req, res) => {
    try {
      const bookings = await Order.find({ orderType: "Room" }).populate("roomId"); // Only get Room bookings
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;