const express = require("express");
const Room = require("../../models/room");
const router = express.Router();
const { authenticate, authorizeAdmin } = require("../../middleware/authMiddleware");

// Add a new room (Admin only)
router.post("/", authenticate, authorizeAdmin, async (req, res) => { // Added middleware
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json({ message: "Room added successfully", room: newRoom });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all rooms (Admin View)
router.get("/", authenticate, authorizeAdmin, async (req, res) => {  // Added middleware
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a room (Admin only)
router.put("/:id", authenticate, authorizeAdmin, async (req, res) => { // Added middleware
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room updated successfully", room: updatedRoom });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a room (Admin only)
router.delete("/:id", authenticate, authorizeAdmin, async (req, res) => { // Added middleware
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;