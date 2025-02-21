const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // e.g., Single, Double, Suite, Deluxe, Family
  price: { type: Number, required: true },
  booked: { type: Boolean, default: false },
  amenities: { type: [String], default: [] }, // List of amenities
  description: {type: String}
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;