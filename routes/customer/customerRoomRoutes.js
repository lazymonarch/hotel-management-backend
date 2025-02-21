const express = require("express");
const Room = require("../../models/room");
const router = express.Router();
const { authenticate, authorizeCustomer } = require("../../middleware/authMiddleware");

// Get all available rooms (Customer View)
router.get("/", authenticate, authorizeCustomer, async (req, res) => { // Added middleware
  try {
    const rooms = await Room.find({ booked: false }); // Only get available rooms
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific room by ID
router.get("/:id", authenticate, authorizeCustomer, async (req, res) => { // Added middleware
    try {
      const room = await Room.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      res.json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;