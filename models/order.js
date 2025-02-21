const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  checkInDate: { type: Date },
  checkOutDate: { type: Date },
  totalAmount: { type: Number, required: true },
  foodItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodMenu" }], // Array of food items
  status: { type: String, enum: ["Booked", "Completed", "Cancelled"], default: "Booked" }, // Booking status
  orderType: { type: String, enum: ["Room", "Food"], default: "Room" } //  Differentiate room bookings from food orders
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);